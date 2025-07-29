const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { Pool } = require('pg');
require('dotenv').config({ path: __dirname + '/.env' });
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const { authenticateToken, authorizeRoles } = require('./middleware/auth');
const { 
  validateEmployee, 
  validatePayroll, 
  validateAttendance, 
  validateDocument, 
  validateId, 
  sanitizeQuery 
} = require('./middleware/validation');
const chatbotService = require('./services/chatbotService');

const app = express();

// Enhanced logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`🚀 [${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log(`   📝 Query:`, req.query);
  console.log(`   📝 Body:`, req.body);
  console.log(`   📝 Headers:`, req.headers.authorization ? 'Authorization: Bearer ***' : 'No Auth');
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`✅ [${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  
  next();
});

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
app.use(limiter);

// Stricter rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Remove X-Powered-By header
app.disable('x-powered-by');

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.CORS_ORIGIN, 'https://your-production-frontend.com']
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:4173'],
  credentials: true
}));

// Warn if not using HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      console.warn('⚠️  Not using HTTPS!');
    }
    next();
  });
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads', 'documents');
fs.ensureDirSync(uploadsDir);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'jpg', 'jpeg', 'png', 'gif'];
    const fileExt = path.extname(file.originalname).toLowerCase().substring(1);
    if (allowedTypes.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, and image files are allowed.'), false);
    }
  }
});

// Database configuration using environment variables
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'dicel_erp_development',
  password: process.env.DB_PASS || '0123',
  port: process.env.DB_PORT || 5434,
});

// Enhanced database connection log
console.log('🔌 [DB] Attempting to connect to PostgreSQL...');
console.log(`   📝 Host: ${process.env.DB_HOST || 'localhost'}`);
console.log(`   📝 Database: ${process.env.DB_NAME || 'dicel_erp_development'}`);
console.log(`   📝 Port: ${process.env.DB_PORT || 5434}`);

pool.connect()
  .then(() => {
    console.log('✅ [DB] Successfully connected to PostgreSQL database!');
    console.log('   📝 Connection pool ready for queries');
  })
  .catch(err => {
    console.error('❌ [DB] Failed to connect to PostgreSQL database:');
    console.error('   📝 Error:', err.message);
    console.error('   📝 Code:', err.code);
    process.exit(1);
  });

// EMPLOYEES ENDPOINTS
app.get('/api/employees', authenticateToken, sanitizeQuery, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/employees/stats', async (req, res) => {
  console.log('➡️  [HIT] /api/employees/stats');
  try {
    const totalResult = await pool.query('SELECT COUNT(*) as total FROM employees');
    console.log('   ↪️ Total employees:', totalResult.rows[0].total);
    const newHiresResult = await pool.query(
      `SELECT COUNT(*) as new_hires FROM employees WHERE DATE_TRUNC('month', hire_date) = DATE_TRUNC('month', CURRENT_DATE)`
    );
    console.log('   ↪️ New hires this month:', newHiresResult.rows[0].new_hires);
    const expiringContractsResult = await pool.query(
      `SELECT COUNT(*) as expiring FROM employees WHERE contract_end_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'`
    );
    console.log('   ↪️ Expiring contracts:', expiringContractsResult.rows[0].expiring);
    res.json({
      total: parseInt(totalResult.rows[0].total) || 0,
      newHires: parseInt(newHiresResult.rows[0].new_hires) || 0,
      expiringContracts: parseInt(expiringContractsResult.rows[0].expiring) || 0
    });
  } catch (err) {
    console.error('❌ Error in /api/employees/stats:', err);
    res.status(500).json({ error: err.message });
  }
});

// Employee Distribution by Department
app.get('/api/employees/distribution', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT department, COUNT(*) as count FROM employees GROUP BY department ORDER BY count DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/employees/:id', authenticateToken, validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/employees', authenticateToken, authorizeRoles('hr_manager', 'system_admin'), validateEmployee, async (req, res) => {
  try {
    const { name, position, department, email, phone } = req.body;
    
    // Generate new employee ID
    const idResult = await pool.query('SELECT COUNT(*) as count FROM employees');
    const nextId = `DIC${(parseInt(idResult.rows[0].count) + 1).toString().padStart(3, '0')}`;
    
    const result = await pool.query(
      'INSERT INTO employees (id, name, position, department, email, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nextId, name, position, department, email, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/employees/:id', authenticateToken, authorizeRoles('hr_manager', 'system_admin'), validateId, validateEmployee, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, department, email, phone } = req.body;
    
    const result = await pool.query(
      'UPDATE employees SET name = $1, position = $2, department = $3, email = $4, phone = $5 WHERE id = $6 RETURNING *',
      [name, position, department, email, phone, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/employees/:id', authenticateToken, authorizeRoles('hr_manager', 'system_admin'), validateId, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ATTENDANCE ENDPOINTS - FIXED VERSION
app.get('/api/attendance', authenticateToken, sanitizeQuery, async (req, res) => {
  console.log('➡️  [HIT] /api/attendance');
  console.log('   ↪️ Query params:', req.query);
  
  try {
    const { date, employeeId } = req.query;
    let query = `
      SELECT a.*, e.name as employee_name, e.department 
      FROM attendance a 
      JOIN employees e ON a.employee_id = e.id
    `;
    let params = [];
    let conditions = [];
    
    if (date) {
      conditions.push(`a.date = $${params.length + 1}`);
      params.push(date);
    }
    
    if (employeeId) {
      conditions.push(`a.employee_id = $${params.length + 1}`);
      params.push(employeeId);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY a.date DESC, a.check_in ASC';
    
    console.log('   ↪️ Final query:', query);
    console.log('   ↪️ Query params:', params);
    
    const result = await pool.query(query, params);
    console.log('   ↪️ Records found:', result.rows.length);
    
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error in /api/attendance:', err);
    console.error('   ↪️ Error message:', err.message);
    console.error('   ↪️ Error stack:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/attendance/clock-in', authenticateToken, validateAttendance, async (req, res) => {
  console.log('➡️  [HIT] /api/attendance/clock-in');
  console.log('   ↪️ Request body:', req.body);
  
  try {
    const { employeeId, location, notes } = req.body;
    
    // Validate required fields
    if (!employeeId) {
      console.error('   ↪️ Error: employeeId is required');
      return res.status(400).json({ error: 'employeeId is required' });
    }
    
    console.log('   ↪️ Employee ID:', employeeId);
    console.log('   ↪️ Location:', location);
    console.log('   ↪️ Notes:', notes);
    
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0];
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    console.log('   ↪️ Current time:', currentTime);
    console.log('   ↪️ Today\'s date:', today);
    
    // Single query to check employee existence and existing attendance in one go
    console.log('   ↪️ Checking employee and existing attendance...');
    const checkResult = await pool.query(`
      SELECT 
        e.id as employee_id,
        e.name as employee_name,
        a.id as attendance_id,
        a.check_in,
        a.check_out
      FROM employees e
      LEFT JOIN attendance a ON e.id = a.employee_id AND a.date = $1::DATE AND a.check_out IS NULL
      WHERE e.id = $2
    `, [today, employeeId]);
    
    if (checkResult.rows.length === 0) {
      console.error('   ↪️ Error: Employee not found:', employeeId);
      return res.status(400).json({ error: 'Employee not found' });
    }
    
    const employee = checkResult.rows[0];
    console.log('   ↪️ Employee found:', employee.employee_name);
    
    // Check if already clocked in today
    if (employee.attendance_id) {
      console.error('   ↪️ Error: Already clocked in today');
      return res.status(400).json({ error: 'Already clocked in today' });
    }
    
    console.log('   ↪️ Inserting new attendance record...');
    const result = await pool.query(`
      INSERT INTO attendance (
        employee_id, date, check_in, location, notes, status
      ) VALUES ($1, $2::DATE, $3, $4, $5, $6) 
      RETURNING *
    `, [
      employeeId, 
      today, 
      currentTime, 
      location || 'Main Office', 
      notes || 'Clock in via system', 
      'present'
    ]);
    
    console.log('   ↪️ Successfully created attendance record:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error in /api/attendance/clock-in:', err);
    console.error('   ↪️ Error message:', err.message);
    console.error('   ↪️ Error stack:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/attendance/clock-out', authenticateToken, validateAttendance, async (req, res) => {
  console.log('➡️  [HIT] /api/attendance/clock-out');
  console.log('   ↪️ Request body:', req.body);
  
  try {
    const { employeeId } = req.body;
    
    // Validate required fields
    if (!employeeId) {
      console.error('   ↪️ Error: employeeId is required');
      return res.status(400).json({ error: 'employeeId is required' });
    }
    
    console.log('   ↪️ Employee ID:', employeeId);
    
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0];
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    
    console.log('   ↪️ Current time:', currentTime);
    console.log('   ↪️ Today\'s date:', today);
    
    // Single query to check employee and get active attendance record
    console.log('   ↪️ Checking employee and active attendance...');
    const checkResult = await pool.query(`
      SELECT 
        e.id as employee_id,
        e.name as employee_name,
        a.id as attendance_id,
        a.check_in,
        a.check_out
      FROM employees e
      LEFT JOIN attendance a ON e.id = a.employee_id AND a.date = $1::DATE AND a.check_out IS NULL
      WHERE e.id = $2
    `, [today, employeeId]);
    
    if (checkResult.rows.length === 0) {
      console.error('   ↪️ Error: Employee not found:', employeeId);
      return res.status(400).json({ error: 'Employee not found' });
    }
    
    const employee = checkResult.rows[0];
    console.log('   ↪️ Employee found:', employee.employee_name);
    
    // Check if there's an active clock-in record
    if (!employee.attendance_id) {
      console.error('   ↪️ Error: No active clock-in record found');
      return res.status(404).json({ error: 'No active clock-in record found' });
    }
    
    console.log('   ↪️ Updating attendance record...');
    
    // Update attendance record
    const result = await pool.query(`
      UPDATE attendance 
      SET 
        check_out = $1
      WHERE id = $2 AND check_out IS NULL 
      RETURNING *
    `, [currentTime, employee.attendance_id]);
    
    if (result.rows.length === 0) {
      console.error('   ↪️ Error: Failed to update attendance record');
      return res.status(500).json({ error: 'Failed to update attendance record' });
    }
    
    console.log('   ↪️ Successfully updated attendance record:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error in /api/attendance/clock-out:', err);
    console.error('   ↪️ Error message:', err.message);
    console.error('   ↪️ Error stack:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/attendance/stats', async (req, res) => {
  console.log('➡️  [HIT] /api/attendance/stats');
  try {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    console.log('   ↪️ Today\'s date:', today);
    
    // Single optimized query to get all stats at once
    console.log('   ↪️ Querying attendance statistics...');
    const statsResult = await pool.query(`
      SELECT 
        COUNT(*) FILTER (WHERE check_in IS NOT NULL AND check_out IS NULL) as present,
        COUNT(*) FILTER (WHERE status = 'absent') as absent,
        COUNT(*) FILTER (WHERE status = 'late') as late
      FROM attendance 
      WHERE date = $1::DATE
    `, [today]);
    
    const stats = statsResult.rows[0];
    console.log('   ↪️ Stats calculated:', stats);
    
    const response = {
      present: parseInt(stats.present),
      absent: parseInt(stats.absent),
      late: parseInt(stats.late),
      totalHours: 0 // Default value since total_hours column doesn't exist
    };
    
    console.log('   ↪️ Sending response:', response);
    res.json(response);
  } catch (err) {
    console.error('❌ Error in /api/attendance/stats:', err);
    console.error('   ↪️ Error message:', err.message);
    console.error('   ↪️ Error stack:', err.stack);
    res.status(500).json({ error: err.message });
  }
});

// DOCUMENTS ENDPOINTS
app.get('/api/documents', sanitizeQuery, async (req, res) => {
  console.log('➡️  [HIT] /api/documents');
  console.log('   ↪️ Query params:', req.query);
  
  try {
    // Mock documents data that matches the frontend Document interface
    const mockDocuments = [
      {
        id: '1',
        title: 'Employee Handbook 2024',
        type: 'policy',
        category: 'HR Policies',
        fileName: 'employee_handbook_2024.pdf',
        fileSize: '2048576',
        fileType: 'pdf',
        uploadedBy: 'HR Manager',
        uploadedDate: '2024-01-15T10:30:00Z',
        lastModified: '2024-01-15T10:30:00Z',
        status: 'active',
        version: '1.0',
        description: 'Comprehensive employee handbook covering company policies and procedures',
        tags: ['handbook', 'policies', 'hr', 'employee'],
        isPublic: true,
        requiresSignature: true,
        expiryDate: '2025-12-31',
        downloadCount: 45
      },
      {
        id: '2',
        title: 'Employment Contract Template',
        type: 'contract',
        category: 'Contracts',
        fileName: 'employment_contract_template.docx',
        fileSize: '512000',
        fileType: 'docx',
        uploadedBy: 'Legal Team',
        uploadedDate: '2024-01-20T14:15:00Z',
        lastModified: '2024-01-20T14:15:00Z',
        status: 'active',
        version: '2.1',
        description: 'Standard employment contract template for new hires',
        tags: ['contract', 'employment', 'template', 'legal'],
        isPublic: false,
        requiresSignature: true,
        expiryDate: null,
        downloadCount: 23
      },
      {
        id: '3',
        title: 'Leave Request Form',
        type: 'form',
        category: 'Forms',
        fileName: 'leave_request_form.pdf',
        fileSize: '256000',
        fileType: 'pdf',
        uploadedBy: 'HR Assistant',
        uploadedDate: '2024-01-25T09:45:00Z',
        lastModified: '2024-01-25T09:45:00Z',
        status: 'active',
        version: '1.2',
        description: 'Standard form for submitting leave requests',
        tags: ['form', 'leave', 'request', 'hr'],
        isPublic: true,
        requiresSignature: false,
        expiryDate: null,
        downloadCount: 67
      },
      {
        id: '4',
        title: 'Safety Training Manual',
        type: 'manual',
        category: 'Training',
        fileName: 'safety_training_manual.pdf',
        fileSize: '1536000',
        fileType: 'pdf',
        uploadedBy: 'Safety Officer',
        uploadedDate: '2024-01-30T16:20:00Z',
        lastModified: '2024-01-30T16:20:00Z',
        status: 'active',
        version: '3.0',
        description: 'Comprehensive safety training manual for all employees',
        tags: ['safety', 'training', 'manual', 'compliance'],
        isPublic: true,
        requiresSignature: false,
        expiryDate: '2025-06-30',
        downloadCount: 89
      },
      {
        id: '5',
        title: 'Performance Review Procedure',
        type: 'procedure',
        category: 'HR Procedures',
        fileName: 'performance_review_procedure.pdf',
        fileSize: '768000',
        fileType: 'pdf',
        uploadedBy: 'HR Manager',
        uploadedDate: '2024-02-01T11:10:00Z',
        lastModified: '2024-02-01T11:10:00Z',
        status: 'draft',
        version: '1.0',
        description: 'Step-by-step procedure for conducting performance reviews',
        tags: ['performance', 'review', 'procedure', 'hr'],
        isPublic: false,
        requiresSignature: false,
        expiryDate: null,
        downloadCount: 12
      }
    ];

    const { search, status, category, type } = req.query;
    
    // Filter documents based on search and filters
    let filteredDocuments = mockDocuments;
    
    if (search) {
      filteredDocuments = filteredDocuments.filter(doc =>
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.description.toLowerCase().includes(search.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    if (status && status !== 'all') {
      filteredDocuments = filteredDocuments.filter(doc => doc.status === status);
    }
    
    if (category && category !== 'all') {
      filteredDocuments = filteredDocuments.filter(doc => doc.category === category);
    }
    
    if (type && type !== 'all') {
      filteredDocuments = filteredDocuments.filter(doc => doc.type === type);
    }
    
    console.log('   ↪️ Documents found:', filteredDocuments.length);
    
    res.json(filteredDocuments);
  } catch (err) {
    console.error('❌ Error in /api/documents:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/document-categories', async (req, res) => {
  try {
    const categories = [
      { id: '1', name: 'HR Policies', description: 'Human Resources policies and procedures', documentCount: 12, color: 'blue' },
      { id: '2', name: 'Contracts', description: 'Employment and service contracts', documentCount: 8, color: 'green' },
      { id: '3', name: 'Forms', description: 'Standard forms and templates', documentCount: 15, color: 'purple' },
      { id: '4', name: 'Training', description: 'Training materials and manuals', documentCount: 6, color: 'orange' },
      { id: '5', name: 'HR Procedures', description: 'HR operational procedures', documentCount: 10, color: 'red' }
    ];
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LEAVE ENDPOINTS
app.get('/api/leave-requests', async (req, res) => {
  try {
    // Mock leave requests data
    const leaveRequests = [
      {
        id: '1',
        employeeId: 'DIC001',
        employeeName: 'John Doe',
        leaveType: 'annual',
        startDate: '2024-02-15',
        endDate: '2024-02-20',
        duration: 5,
        reason: 'Family vacation',
        status: 'approved',
        submittedDate: '2024-01-20T10:30:00Z',
        approvedBy: 'HR Manager',
        approvedDate: '2024-01-22T14:15:00Z'
      },
      {
        id: '2',
        employeeId: 'DIC002',
        employeeName: 'Jane Smith',
        leaveType: 'sick',
        startDate: '2024-02-10',
        endDate: '2024-02-12',
        duration: 3,
        reason: 'Medical appointment',
        status: 'pending',
        submittedDate: '2024-02-08T09:00:00Z',
        approvedBy: null,
        approvedDate: null
      }
    ];
    res.json(leaveRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/leave-balances', async (req, res) => {
  try {
    // Mock leave balances data
    const leaveBalances = [
      {
        employeeId: 'DIC001',
        employeeName: 'John Doe',
        leaveType: 'annual',
        balance: 15
      },
      {
        employeeId: 'DIC001',
        employeeName: 'John Doe',
        leaveType: 'sick',
        balance: 10
      },
      {
        employeeId: 'DIC002',
        employeeName: 'Jane Smith',
        leaveType: 'annual',
        balance: 12
      },
      {
        employeeId: 'DIC002',
        employeeName: 'Jane Smith',
        leaveType: 'sick',
        balance: 8
      }
    ];
    res.json(leaveBalances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SHIFTS ENDPOINTS
app.get('/api/shifts', async (req, res) => {
  try {
    // Mock shifts data
    const shifts = [
      {
        id: '1',
        guardId: '1',
        guardName: 'Eric Niyonshuti',
        siteId: '1',
        siteName: 'Site A',
        shiftType: 'morning',
        startTime: '08:00',
        endTime: '16:00',
        date: '2024-01-29',
        status: 'scheduled',
        vehicleId: '1',
        vehicleName: 'Truck #1',
        equipment: ['Body Camera', 'Radio'],
        notes: 'Regular morning shift',
        checkInTime: null,
        checkOutTime: null,
        totalHours: 8
      },
      {
        id: '2',
        guardId: '2',
        guardName: 'John Doe',
        siteId: '2',
        siteName: 'Site B',
        shiftType: 'night',
        startTime: '16:00',
        endTime: '00:00',
        date: '2024-01-29',
        status: 'in_progress',
        vehicleId: '2',
        vehicleName: 'Truck #2',
        equipment: ['Body Camera', 'Radio', 'Flashlight'],
        notes: 'Night shift duty',
        checkInTime: '16:00',
        checkOutTime: null,
        totalHours: 8
      }
    ];
    res.json(shifts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Payroll endpoints
app.get('/api/payroll', sanitizeQuery, async (req, res) => {
  try {
    const { period, status, employeeId, department, paymentMethod, startDate, endDate, limit = 50, offset = 0 } = req.query;
    let query = `
      SELECT p.*, e.name as employee_name, e.department, e.position
      FROM payroll p 
      JOIN employees e ON p.employee_id = e.id
    `;
    let params = [];
    let conditions = [];
    
    if (period) {
      conditions.push(`p.period = $${params.length + 1}`);
      params.push(period);
    }
    
    if (status) {
      conditions.push(`p.status = $${params.length + 1}`);
      params.push(status);
    }
    
    if (employeeId) {
      conditions.push(`p.employee_id = $${params.length + 1}`);
      params.push(employeeId);
    }

    if (department) {
      conditions.push(`e.department = $${params.length + 1}`);
      params.push(department);
    }

    if (paymentMethod) {
      conditions.push(`p.payment_method = $${params.length + 1}`);
      params.push(paymentMethod);
    }

    if (startDate && endDate) {
      conditions.push(`p.period BETWEEN $${params.length + 1} AND $${params.length + 2}`);
      params.push(startDate, endDate);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY p.period DESC, p.created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(parseInt(limit), parseInt(offset));
    
    const result = await pool.query(query, params);
    // Convert net_pay and deductions to numbers for each row
    const rows = result.rows.map(row => ({
      ...row,
      net_pay: row.net_pay !== undefined && row.net_pay !== null ? Number(row.net_pay) : 0,
      deductions: row.deductions !== undefined && row.deductions !== null ? Number(row.deductions) : 0,
    }));
    res.json(rows);
  } catch (err) {
    console.error('Error fetching payroll data:', err);
    // Return mock data if database error occurs
    res.json([
      {
        id: '1',
        employee_id: '1',
        employee_name: 'John Doe',
        department: 'Security',
        position: 'Security Guard',
        period: '2024-01',
        base_salary: 500000,
        gross_pay: 550000,
        net_pay: 480000,
        deductions: 70000,
        status: 'paid',
        payment_method: 'bank_transfer',
        created_at: '2024-01-25T10:00:00Z'
      },
      {
        id: '2',
        employee_id: '2',
        employee_name: 'Jane Smith',
        department: 'Operations',
        position: 'Operations Manager',
        period: '2024-01',
        base_salary: 800000,
        gross_pay: 850000,
        net_pay: 750000,
        deductions: 100000,
        status: 'pending',
        payment_method: 'bank_transfer',
        created_at: '2024-01-25T10:00:00Z'
      }
    ]);
  }
});

// Payroll summary endpoint for dashboard cards
app.get('/api/payroll/summary', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COALESCE(SUM(gross_pay), 0) AS total_gross_pay,
        COALESCE(SUM(net_pay), 0) AS total_net_pay,
        COALESCE(SUM(tax_deduction), 0) AS total_tax,
        COUNT(*) FILTER (WHERE status = 'submitted') AS pending_approval
      FROM payroll
    `);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching payroll summary:', err);
    // Return mock data if database error occurs
    res.json({
      total_gross_pay: 0,
      total_net_pay: 0,
      total_tax: 0,
      pending_approval: 0
    });
  }
});

// Enhanced payroll creation with all new fields
app.post('/api/payroll', authenticateToken, authorizeRoles('hr_manager', 'finance_manager', 'system_admin'), validatePayroll, async (req, res) => {
  try {
    console.log('--- Incoming payroll POST request ---');
    console.log('Request body:', req.body);
    const requiredFields = [
      'employeeId', 'period', 'baseSalary', 'hoursWorked', 'hourlyRate', 'overtimeHours', 'overtimeRate',
      'transportAllowance', 'housingAllowance', 'performanceBonus', 'nightShiftAllowance',
      'taxDeduction', 'insuranceDeduction', 'loanDeduction', 'otherDeductions',
      'grossPay', 'netPay', 'deductions', 'bonuses', 'paymentMethod', 'status'
    ];
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        console.error('Missing required field:', field);
      }
    }
    const { 
      employeeId, 
      period, 
      baseSalary, 
      hoursWorked, 
      hourlyRate, 
      overtimeHours, 
      overtimeRate,
      transportAllowance,
      housingAllowance,
      performanceBonus,
      nightShiftAllowance,
      taxDeduction,
      insuranceDeduction,
      loanDeduction,
      otherDeductions,
      paymentMethod, 
      notes 
    } = req.body;

    const grossPay = baseSalary + (overtimeHours * overtimeRate) + transportAllowance + housingAllowance + performanceBonus + nightShiftAllowance;
    const deductions = taxDeduction + insuranceDeduction + loanDeduction + otherDeductions;
    const netPay = grossPay - deductions;

    const result = await pool.query(`
      INSERT INTO payroll (
        employee_id, period, base_salary, hours_worked, hourly_rate, overtime_hours, overtime_rate,
        transport_allowance, housing_allowance, performance_bonus, night_shift_allowance,
        tax_deduction, insurance_deduction, loan_deduction, other_deductions,
        gross_pay, net_pay, deductions, payment_method, status, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
      RETURNING *
    `, [
      employeeId, period, baseSalary, hoursWorked, hourlyRate, overtimeHours, overtimeRate,
      transportAllowance, housingAllowance, performanceBonus, nightShiftAllowance,
      taxDeduction, insuranceDeduction, loanDeduction, otherDeductions,
      grossPay, netPay, deductions, paymentMethod, 'submitted', notes
    ]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating payroll:', err);
    res.status(500).json({ error: err.message });
  }
});

// Bulk payroll actions
app.post('/api/payroll/bulk-action', async (req, res) => {
  try {
    const { action, payrollIds, processedBy } = req.body;
    
    if (!payrollIds || payrollIds.length === 0) {
      return res.status(400).json({ error: 'No payroll IDs provided' });
    }

    let updateQuery, params;
    
    if (action === 'process') {
      updateQuery = `UPDATE payroll SET status = 'processed', processed_at = NOW(), processed_by = $1 WHERE id = ANY($2) RETURNING *`;
      params = [processedBy, payrollIds];
    } else if (action === 'pay') {
      updateQuery = `UPDATE payroll SET status = 'paid', paid_at = NOW(), paid_by = $1 WHERE id = ANY($2) RETURNING *`;
      params = [processedBy, payrollIds];
    } else if (action === 'reject') {
      updateQuery = `UPDATE payroll SET status = 'rejected', processed_at = NOW(), processed_by = $1 WHERE id = ANY($2) RETURNING *`;
      params = [processedBy, payrollIds];
    } else if (action === 'cancel') {
      updateQuery = `UPDATE payroll SET status = 'cancelled', processed_at = NOW(), processed_by = $1 WHERE id = ANY($2) RETURNING *`;
      params = [processedBy, payrollIds];
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }

    const result = await pool.query(updateQuery, params);
    
    res.json({
      success: true,
      message: `Successfully ${action}ed ${result.rows.length} payroll records`,
      updatedRecords: result.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Individual payroll actions with audit trail
app.put('/api/payroll/:id/process', async (req, res) => {
  try {
    const { id } = req.params;
    const { processedBy } = req.body;
    
    const result = await pool.query(
      'UPDATE payroll SET status = $1, processed_at = NOW(), processed_by = $2 WHERE id = $3 RETURNING *',
      ['processed', processedBy, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/payroll/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { paidBy } = req.body;
    
    const result = await pool.query(
      'UPDATE payroll SET status = $1, paid_at = NOW(), paid_by = $2 WHERE id = $3 RETURNING *',
      ['paid', paidBy, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/payroll/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { processedBy, notes } = req.body;
    
    const result = await pool.query(
      'UPDATE payroll SET status = $1, processed_at = NOW(), processed_by = $2, notes = COALESCE(notes, $3) WHERE id = $4 RETURNING *',
      ['rejected', processedBy, notes, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/payroll/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;
    const { processedBy, notes } = req.body;
    
    const result = await pool.query(
      'UPDATE payroll SET status = $1, processed_at = NOW(), processed_by = $2, notes = COALESCE(notes, $3) WHERE id = $4 RETURNING *',
      ['cancelled', processedBy, notes, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE INDIVIDUAL PAYROLL RECORD
app.put('/api/payroll/:id', authenticateToken, authorizeRoles('hr_manager', 'finance_manager', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { gross_pay, net_pay, deductions, bonuses, notes, status } = req.body;
    
    const result = await pool.query(
      'UPDATE payroll SET gross_pay = $1, net_pay = $2, deductions = $3, bonuses = $4, notes = $5, status = $6 WHERE id = $7 RETURNING *',
      [gross_pay, net_pay, deductions, bonuses, notes, status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE INDIVIDUAL PAYROLL RECORD
app.delete('/api/payroll/:id', authenticateToken, authorizeRoles('hr_manager', 'finance_manager', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM payroll WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json({ message: 'Payroll record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DEMO USERS ENDPOINT
app.get('/api/demo-users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role, department, position FROM employees ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN ENDPOINT
app.post('/api/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body;
  
  try {
    console.log('➡️  [LOGIN ATTEMPT] Email:', email);
    
    const result = await pool.query('SELECT * FROM employees WHERE email = $1', [email]);
    
    if (result.rows.length === 0) {
      console.log('   ↪️ User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    console.log('   ↪️ User found:', user.name, 'Role:', user.role);
    
    // For demo purposes, accept any password (in production, use bcrypt.compare)
    // const valid = await bcrypt.compare(password, user.password);
    const valid = true; // Demo mode - accept any password
    
    if (!valid) {
      console.log('   ↪️ Invalid password for user:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('   ↪️ Login successful for:', user.name);
    
    // Return user info and a token
    res.json({
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
        department: user.department,
        position: user.position
      },
      token: 'demo-token'
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

// COMPLIANCE ENDPOINTS
app.get('/api/compliance/stats', authenticateToken, async (req, res) => {
  try {
    // Mock compliance statistics
    const stats = {
      totalPolicies: 15,
      activePolicies: 12,
      expiredPolicies: 3,
      complianceRate: 85,
      pendingReviews: 8,
      completedAudits: 24,
      upcomingAudits: 5,
      criticalAlerts: 2,
      resolvedIncidents: 18,
      openIncidents: 3
    };
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/compliance/alerts', authenticateToken, async (req, res) => {
  try {
    // Mock compliance alerts
    const alerts = [
      {
        id: '1',
        type: 'critical',
        title: 'Policy Expiration Warning',
        message: 'Employee Handbook expires in 30 days',
        category: 'policy',
        severity: 'high',
        status: 'active',
        createdAt: '2024-01-15T10:30:00Z',
        assignedTo: 'HR Manager',
        dueDate: '2024-02-15T00:00:00Z'
      },
      {
        id: '2',
        type: 'warning',
        title: 'Training Compliance Alert',
        message: '5 employees need safety training renewal',
        category: 'training',
        severity: 'medium',
        status: 'active',
        createdAt: '2024-01-20T14:15:00Z',
        assignedTo: 'Training Coordinator',
        dueDate: '2024-02-20T00:00:00Z'
      },
      {
        id: '3',
        type: 'info',
        title: 'Audit Schedule Reminder',
        message: 'Monthly compliance audit due next week',
        category: 'audit',
        severity: 'low',
        status: 'active',
        createdAt: '2024-01-25T09:45:00Z',
        assignedTo: 'Compliance Officer',
        dueDate: '2024-02-05T00:00:00Z'
      }
    ];
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/compliance/recent-audits', authenticateToken, async (req, res) => {
  try {
    // Mock recent audits
    const audits = [
      {
        id: '1',
        title: 'Q4 2023 Compliance Audit',
        type: 'quarterly',
        status: 'completed',
        auditor: 'External Audit Team',
        startDate: '2023-10-01',
        endDate: '2023-12-31',
        score: 92,
        findings: 3,
        recommendations: 5,
        completedAt: '2024-01-15T16:30:00Z'
      },
      {
        id: '2',
        title: 'Safety Protocol Review',
        type: 'special',
        status: 'in_progress',
        auditor: 'Internal Safety Team',
        startDate: '2024-01-20',
        endDate: '2024-02-20',
        score: null,
        findings: 1,
        recommendations: 2,
        completedAt: null
      },
      {
        id: '3',
        title: 'Data Protection Assessment',
        type: 'annual',
        status: 'completed',
        auditor: 'IT Security Team',
        startDate: '2023-12-01',
        endDate: '2023-12-15',
        score: 88,
        findings: 2,
        recommendations: 3,
        completedAt: '2023-12-20T14:15:00Z'
      }
    ];
    res.json(audits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/compliance/policies', authenticateToken, async (req, res) => {
  try {
    // Mock compliance policies
    const policies = [
      {
        id: '1',
        title: 'Employee Handbook',
        category: 'HR',
        status: 'active',
        version: '2024.1',
        lastUpdated: '2024-01-15T10:30:00Z',
        expiryDate: '2025-01-15T00:00:00Z',
        complianceRate: 95,
        assignedTo: 'HR Manager',
        priority: 'high'
      },
      {
        id: '2',
        title: 'Safety Procedures Manual',
        category: 'Safety',
        status: 'active',
        version: '2023.2',
        lastUpdated: '2023-12-01T14:20:00Z',
        expiryDate: '2024-12-01T00:00:00Z',
        complianceRate: 87,
        assignedTo: 'Safety Officer',
        priority: 'high'
      },
      {
        id: '3',
        title: 'Data Protection Policy',
        category: 'IT',
        status: 'active',
        version: '2024.0',
        lastUpdated: '2024-01-10T09:15:00Z',
        expiryDate: '2025-01-10T00:00:00Z',
        complianceRate: 92,
        assignedTo: 'IT Manager',
        priority: 'medium'
      },
      {
        id: '4',
        title: 'Code of Conduct',
        category: 'General',
        status: 'expired',
        version: '2022.1',
        lastUpdated: '2022-06-15T11:45:00Z',
        expiryDate: '2023-06-15T00:00:00Z',
        complianceRate: 78,
        assignedTo: 'Legal Team',
        priority: 'high'
      }
    ];
    res.json(policies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/compliance/reports', authenticateToken, async (req, res) => {
  try {
    // Mock compliance reports
    const reports = [
      {
        id: '1',
        title: 'Annual Compliance Report 2023',
        type: 'annual',
        status: 'completed',
        generatedBy: 'Compliance Officer',
        generatedAt: '2024-01-15T16:30:00Z',
        period: '2023-01-01 to 2023-12-31',
        summary: 'Overall compliance rate of 89% with 15 recommendations for improvement',
        fileSize: '2.5MB',
        downloadCount: 12
      },
      {
        id: '2',
        title: 'Q4 Safety Compliance Review',
        type: 'quarterly',
        status: 'completed',
        generatedBy: 'Safety Manager',
        generatedAt: '2024-01-10T14:20:00Z',
        period: '2023-10-01 to 2023-12-31',
        summary: 'Safety compliance improved by 5% with 3 new safety protocols implemented',
        fileSize: '1.8MB',
        downloadCount: 8
      },
      {
        id: '3',
        title: 'Data Protection Audit Report',
        type: 'special',
        status: 'draft',
        generatedBy: 'IT Security Team',
        generatedAt: '2024-01-25T11:15:00Z',
        period: '2023-12-01 to 2023-12-15',
        summary: 'Data protection compliance at 92% with minor recommendations',
        fileSize: '3.2MB',
        downloadCount: 5
      }
    ];
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/compliance/incidents', authenticateToken, async (req, res) => {
  try {
    // Mock compliance incidents
    const incidents = [
      {
        id: '1',
        title: 'Policy Violation - Late Training Completion',
        type: 'policy_violation',
        severity: 'medium',
        status: 'resolved',
        reportedBy: 'HR Manager',
        reportedAt: '2024-01-20T09:30:00Z',
        assignedTo: 'Training Coordinator',
        description: '5 employees failed to complete mandatory safety training within deadline',
        resolution: 'Training completed and disciplinary action taken',
        resolvedAt: '2024-01-25T16:45:00Z'
      },
      {
        id: '2',
        title: 'Safety Incident - Equipment Malfunction',
        type: 'safety_incident',
        severity: 'high',
        status: 'investigating',
        reportedBy: 'Site Supervisor',
        reportedAt: '2024-01-22T14:15:00Z',
        assignedTo: 'Safety Officer',
        description: 'Security equipment malfunction at Site A requiring immediate attention',
        resolution: null,
        resolvedAt: null
      },
      {
        id: '3',
        title: 'Data Breach Attempt',
        type: 'security_incident',
        severity: 'critical',
        status: 'resolved',
        reportedBy: 'IT Security',
        reportedAt: '2024-01-18T11:20:00Z',
        assignedTo: 'IT Manager',
        description: 'Unauthorized access attempt to employee database detected and blocked',
        resolution: 'Security protocols updated and additional monitoring implemented',
        resolvedAt: '2024-01-19T15:30:00Z'
      }
    ];
    res.json(incidents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Centralized error handler with enhanced logging
app.use((err, req, res, next) => {
  console.error('💥 [ERROR] Unhandled error:');
  console.error('   📝 Path:', req.path);
  console.error('   📝 Method:', req.method);
  console.error('   📝 Error:', err.message);
  console.error('   📝 Stack:', err.stack);
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`   📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   📝 Database: ${process.env.DB_NAME || 'dicel_erp_development'}`);
  console.log(`   📝 CORS Origins: ${process.env.NODE_ENV === 'production' ? 'Production URLs' : 'http://localhost:3000, http://localhost:5173, http://localhost:4173'}`);
}); 