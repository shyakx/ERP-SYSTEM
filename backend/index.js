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

// Rate limiting - TEMPORARILY DISABLED FOR DEVELOPMENT
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: 'Too many requests from this IP, please try again later.',
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// Apply rate limiting to all routes
// app.use(limiter);

// Stricter rate limiting for login attempts - TEMPORARILY DISABLED FOR DEVELOPMENT
// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // limit each IP to 5 login attempts per windowMs
//   message: 'Too many login attempts, please try again later.',
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// Remove X-Powered-By header
app.disable('x-powered-by');

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.CORS_ORIGIN, 'https://your-production-frontend.com']
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173'],
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

// Mock authentication middleware for development
const mockAuthenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // Check if it's a mock token (for development)
  if (token.startsWith('mock-jwt-token-')) {
    // Mock user for development
    req.user = {
      id: '6',
      email: 'inventory@dicelsecurity.com',
      name: 'Inventory Manager',
      role: 'inventory_manager',
      department: 'Inventory'
    };
    return next();
  }

  // Use real authentication for non-mock tokens
  return authenticateToken(req, res, next);
};

// EMPLOYEES ENDPOINTS
app.get('/api/employees', mockAuthenticateToken, sanitizeQuery, async (req, res) => {
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

app.get('/api/employees/:id', mockAuthenticateToken, validateId, async (req, res) => {
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

app.post('/api/employees', mockAuthenticateToken, authorizeRoles('hr_manager', 'system_admin'), validateEmployee, async (req, res) => {
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

app.put('/api/employees/:id', mockAuthenticateToken, authorizeRoles('hr_manager', 'system_admin'), validateId, validateEmployee, async (req, res) => {
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

app.delete('/api/employees/:id', mockAuthenticateToken, authorizeRoles('hr_manager', 'system_admin'), validateId, async (req, res) => {
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
app.get('/api/attendance', mockAuthenticateToken, sanitizeQuery, async (req, res) => {
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

app.post('/api/attendance/clock-in', mockAuthenticateToken, validateAttendance, async (req, res) => {
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

app.post('/api/attendance/clock-out', mockAuthenticateToken, validateAttendance, async (req, res) => {
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
app.post('/api/payroll', mockAuthenticateToken, authorizeRoles('hr_manager', 'finance_manager', 'system_admin'), validatePayroll, async (req, res) => {
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
app.put('/api/payroll/:id', mockAuthenticateToken, authorizeRoles('hr_manager', 'finance_manager', 'system_admin'), async (req, res) => {
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
app.delete('/api/payroll/:id', mockAuthenticateToken, authorizeRoles('hr_manager', 'finance_manager', 'system_admin'), async (req, res) => {
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
app.post('/api/login', async (req, res) => {
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
app.get('/api/compliance/stats', mockAuthenticateToken, async (req, res) => {
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

app.get('/api/compliance/alerts', mockAuthenticateToken, async (req, res) => {
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

app.get('/api/compliance/recent-audits', mockAuthenticateToken, async (req, res) => {
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

app.get('/api/compliance/policies', mockAuthenticateToken, async (req, res) => {
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

// =====================================================
// SALES & MARKETING API ENDPOINTS
// =====================================================

// SALES DASHBOARD STATS
app.get('/api/sales/stats', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(DISTINCT l.id) as total_leads,
        COUNT(DISTINCT o.id) as total_opportunities,
        COUNT(DISTINCT c.id) as total_customers,
        COUNT(DISTINCT q.id) as total_quotes,
        COUNT(DISTINCT ord.id) as total_orders,
        SUM(o.estimated_value) as pipeline_value,
        SUM(CASE WHEN o.stage = 'closed_won' THEN o.actual_value ELSE 0 END) as won_revenue,
        COUNT(DISTINCT CASE WHEN l.status = 'qualified' THEN l.id END) as qualified_leads,
        COUNT(DISTINCT CASE WHEN o.stage = 'proposal' THEN o.id END) as proposals_sent
      FROM leads l
      FULL OUTER JOIN opportunities o ON l.id = o.lead_id
      FULL OUTER JOIN customers c ON o.customer_id = c.id
      FULL OUTER JOIN quotes q ON o.id = q.opportunity_id
      FULL OUTER JOIN orders ord ON q.id = ord.quote_id
    `);
    
    const stats = result.rows[0] || {
      total_leads: 0,
      total_opportunities: 0,
      total_customers: 0,
      total_quotes: 0,
      total_orders: 0,
      pipeline_value: 0,
      won_revenue: 0,
      qualified_leads: 0,
      proposals_sent: 0
    };
    
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PRODUCTS ENDPOINTS
app.get('/api/sales/products', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sales/products', authenticateToken, authorizeRoles('sales_manager', 'system_admin'), async (req, res) => {
  try {
    const { name, description, sku, category, price, cost, stock_quantity, min_stock_level, supplier } = req.body;
    
    const result = await pool.query(
      'INSERT INTO products (name, description, sku, category, price, cost, stock_quantity, min_stock_level, supplier) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [name, description, sku, category, price, cost, stock_quantity, min_stock_level, supplier]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/sales/products/:id', authenticateToken, authorizeRoles('sales_manager', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, sku, category, price, cost, stock_quantity, min_stock_level, supplier } = req.body;
    
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, sku = $3, category = $4, price = $5, cost = $6, stock_quantity = $7, min_stock_level = $8, supplier = $9, updated_at = CURRENT_TIMESTAMP WHERE id = $10 RETURNING *',
      [name, description, sku, category, price, cost, stock_quantity, min_stock_level, supplier, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/sales/products/:id', authenticateToken, authorizeRoles('sales_manager', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CUSTOMERS ENDPOINTS
app.get('/api/sales/customers', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers ORDER BY company_name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sales/customers', authenticateToken, authorizeRoles('sales_manager', 'sales_representative', 'system_admin'), async (req, res) => {
  try {
    const { company_name, contact_name, email, phone, address, city, state, country, postal_code, industry, company_size, website, source, notes } = req.body;
    
    const result = await pool.query(
      'INSERT INTO customers (company_name, contact_name, email, phone, address, city, state, country, postal_code, industry, company_size, website, source, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
      [company_name, contact_name, email, phone, address, city, state, country, postal_code, industry, company_size, website, source, notes]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/sales/customers/:id', authenticateToken, authorizeRoles('sales_manager', 'sales_representative', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { company_name, contact_name, email, phone, address, city, state, country, postal_code, industry, company_size, website, source, status, notes } = req.body;
    
    const result = await pool.query(
      'UPDATE customers SET company_name = $1, contact_name = $2, email = $3, phone = $4, address = $5, city = $6, state = $7, country = $8, postal_code = $9, industry = $10, company_size = $11, website = $12, source = $13, status = $14, notes = $15, updated_at = CURRENT_TIMESTAMP WHERE id = $16 RETURNING *',
      [company_name, contact_name, email, phone, address, city, state, country, postal_code, industry, company_size, website, source, status, notes, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/sales/customers/:id', authenticateToken, authorizeRoles('sales_manager', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    
    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LEADS ENDPOINTS
app.get('/api/sales/leads', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT l.*, e.name as assigned_to_name 
      FROM leads l 
      LEFT JOIN employees e ON l.assigned_to = e.id 
      ORDER BY l.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sales/leads', authenticateToken, authorizeRoles('sales_manager', 'sales_representative', 'system_admin'), async (req, res) => {
  try {
    const { first_name, last_name, email, phone, company, job_title, industry, source, status, priority, assigned_to, estimated_value, notes } = req.body;
    
    const result = await pool.query(
      'INSERT INTO leads (first_name, last_name, email, phone, company, job_title, industry, source, status, priority, assigned_to, estimated_value, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
      [first_name, last_name, email, phone, company, job_title, industry, source, status, priority, assigned_to, estimated_value, notes]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/sales/leads/:id', authenticateToken, authorizeRoles('sales_manager', 'sales_representative', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone, company, job_title, industry, source, status, priority, assigned_to, estimated_value, notes } = req.body;
    
    const result = await pool.query(
      'UPDATE leads SET first_name = $1, last_name = $2, email = $3, phone = $4, company = $5, job_title = $6, industry = $7, source = $8, status = $9, priority = $10, assigned_to = $11, estimated_value = $12, notes = $13, updated_at = CURRENT_TIMESTAMP WHERE id = $14 RETURNING *',
      [first_name, last_name, email, phone, company, job_title, industry, source, status, priority, assigned_to, estimated_value, notes, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/sales/leads/:id', authenticateToken, authorizeRoles('sales_manager', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM leads WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    res.json({ message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// OPPORTUNITIES ENDPOINTS
app.get('/api/sales/opportunities', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.*, c.company_name as customer_name, e.name as assigned_to_name 
      FROM opportunities o 
      LEFT JOIN customers c ON o.customer_id = c.id 
      LEFT JOIN employees e ON o.assigned_to = e.id 
      ORDER BY o.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sales/opportunities', authenticateToken, authorizeRoles('sales_manager', 'sales_representative', 'system_admin'), async (req, res) => {
  try {
    const { title, customer_id, lead_id, assigned_to, stage, probability, estimated_value, actual_value, expected_close_date, close_date, source, description, notes } = req.body;
    
    const result = await pool.query(
      'INSERT INTO opportunities (title, customer_id, lead_id, assigned_to, stage, probability, estimated_value, actual_value, expected_close_date, close_date, source, description, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
      [title, customer_id, lead_id, assigned_to, stage, probability, estimated_value, actual_value, expected_close_date, close_date, source, description, notes]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/sales/opportunities/:id', authenticateToken, authorizeRoles('sales_manager', 'sales_representative', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, customer_id, lead_id, assigned_to, stage, probability, estimated_value, actual_value, expected_close_date, close_date, source, description, notes } = req.body;
    
    const result = await pool.query(
      'UPDATE opportunities SET title = $1, customer_id = $2, lead_id = $3, assigned_to = $4, stage = $5, probability = $6, estimated_value = $7, actual_value = $8, expected_close_date = $9, close_date = $10, source = $11, description = $12, notes = $13, updated_at = CURRENT_TIMESTAMP WHERE id = $14 RETURNING *',
      [title, customer_id, lead_id, assigned_to, stage, probability, estimated_value, actual_value, expected_close_date, close_date, source, description, notes, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/sales/opportunities/:id', authenticateToken, authorizeRoles('sales_manager', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM opportunities WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    
    res.json({ message: 'Opportunity deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CAMPAIGNS ENDPOINTS
app.get('/api/sales/campaigns', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, e.name as created_by_name 
      FROM campaigns c 
      LEFT JOIN employees e ON c.created_by = e.id 
      ORDER BY c.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sales/campaigns', authenticateToken, authorizeRoles('sales_manager', 'marketing_manager', 'system_admin'), async (req, res) => {
  try {
    const { name, description, type, status, start_date, end_date, budget, actual_cost, target_audience, goals, created_by } = req.body;
    
    const result = await pool.query(
      'INSERT INTO campaigns (name, description, type, status, start_date, end_date, budget, actual_cost, target_audience, goals, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [name, description, type, status, start_date, end_date, budget, actual_cost, target_audience, goals, created_by]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/sales/campaigns/:id', authenticateToken, authorizeRoles('sales_manager', 'marketing_manager', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, type, status, start_date, end_date, budget, actual_cost, target_audience, goals } = req.body;
    
    const result = await pool.query(
      'UPDATE campaigns SET name = $1, description = $2, type = $3, status = $4, start_date = $5, end_date = $6, budget = $7, actual_cost = $8, target_audience = $9, goals = $10, updated_at = CURRENT_TIMESTAMP WHERE id = $11 RETURNING *',
      [name, description, type, status, start_date, end_date, budget, actual_cost, target_audience, goals, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/sales/campaigns/:id', authenticateToken, authorizeRoles('sales_manager', 'marketing_manager', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM campaigns WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json({ message: 'Campaign deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SALES ACTIVITIES ENDPOINTS
app.get('/api/sales/activities', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT sa.*, c.company_name as customer_name, e.name as assigned_to_name 
      FROM sales_activities sa 
      LEFT JOIN customers c ON sa.customer_id = c.id 
      LEFT JOIN employees e ON sa.assigned_to = e.id 
      ORDER BY sa.due_date ASC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sales/activities', authenticateToken, authorizeRoles('sales_manager', 'sales_representative', 'system_admin'), async (req, res) => {
  try {
    const { title, description, type, status, priority, assigned_to, customer_id, opportunity_id, lead_id, due_date, notes } = req.body;
    
    const result = await pool.query(
      'INSERT INTO sales_activities (title, description, type, status, priority, assigned_to, customer_id, opportunity_id, lead_id, due_date, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [title, description, type, status, priority, assigned_to, customer_id, opportunity_id, lead_id, due_date, notes]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/sales/activities/:id', authenticateToken, authorizeRoles('sales_manager', 'sales_representative', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, status, priority, assigned_to, customer_id, opportunity_id, lead_id, due_date, completed_date, notes } = req.body;
    
    const result = await pool.query(
      'UPDATE sales_activities SET title = $1, description = $2, type = $3, status = $4, priority = $5, assigned_to = $6, customer_id = $7, opportunity_id = $8, lead_id = $9, due_date = $10, completed_date = $11, notes = $12, updated_at = CURRENT_TIMESTAMP WHERE id = $13 RETURNING *',
      [title, description, type, status, priority, assigned_to, customer_id, opportunity_id, lead_id, due_date, completed_date, notes, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sales activity not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/sales/activities/:id', authenticateToken, authorizeRoles('sales_manager', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM sales_activities WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sales activity not found' });
    }
    
    res.json({ message: 'Sales activity deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// QUOTES ENDPOINTS
app.get('/api/sales/quotes', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT q.*, c.company_name as customer_name, e.name as assigned_to_name 
      FROM quotes q 
      LEFT JOIN customers c ON q.customer_id = c.id 
      LEFT JOIN employees e ON q.assigned_to = e.id 
      ORDER BY q.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sales/quotes', authenticateToken, authorizeRoles('sales_manager', 'sales_representative', 'system_admin'), async (req, res) => {
  try {
    const { quote_number, customer_id, opportunity_id, assigned_to, status, total_amount, tax_amount, discount_amount, final_amount, valid_until, notes } = req.body;
    
    const result = await pool.query(
      'INSERT INTO quotes (quote_number, customer_id, opportunity_id, assigned_to, status, total_amount, tax_amount, discount_amount, final_amount, valid_until, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [quote_number, customer_id, opportunity_id, assigned_to, status, total_amount, tax_amount, discount_amount, final_amount, valid_until, notes]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/sales/quotes/:id', authenticateToken, authorizeRoles('sales_manager', 'sales_representative', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { quote_number, customer_id, opportunity_id, assigned_to, status, total_amount, tax_amount, discount_amount, final_amount, valid_until, notes } = req.body;
    
    const result = await pool.query(
      'UPDATE quotes SET quote_number = $1, customer_id = $2, opportunity_id = $3, assigned_to = $4, status = $5, total_amount = $6, tax_amount = $7, discount_amount = $8, final_amount = $9, valid_until = $10, notes = $11, updated_at = CURRENT_TIMESTAMP WHERE id = $12 RETURNING *',
      [quote_number, customer_id, opportunity_id, assigned_to, status, total_amount, tax_amount, discount_amount, final_amount, valid_until, notes, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/sales/quotes/:id', authenticateToken, authorizeRoles('sales_manager', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM quotes WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    
    res.json({ message: 'Quote deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ORDERS ENDPOINTS
app.get('/api/sales/orders', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT o.*, c.company_name as customer_name, e.name as assigned_to_name 
      FROM orders o 
      LEFT JOIN customers c ON o.customer_id = c.id 
      LEFT JOIN employees e ON o.assigned_to = e.id 
      ORDER BY o.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sales/orders', authenticateToken, authorizeRoles('sales_manager', 'sales_representative', 'system_admin'), async (req, res) => {
  try {
    const { order_number, customer_id, quote_id, assigned_to, status, order_date, delivery_date, total_amount, tax_amount, discount_amount, final_amount, payment_status, shipping_address, billing_address, notes } = req.body;
    
    const result = await pool.query(
      'INSERT INTO orders (order_number, customer_id, quote_id, assigned_to, status, order_date, delivery_date, total_amount, tax_amount, discount_amount, final_amount, payment_status, shipping_address, billing_address, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',
      [order_number, customer_id, quote_id, assigned_to, status, order_date, delivery_date, total_amount, tax_amount, discount_amount, final_amount, payment_status, shipping_address, billing_address, notes]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/sales/orders/:id', authenticateToken, authorizeRoles('sales_manager', 'sales_representative', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { order_number, customer_id, quote_id, assigned_to, status, order_date, delivery_date, total_amount, tax_amount, discount_amount, final_amount, payment_status, shipping_address, billing_address, notes } = req.body;
    
    const result = await pool.query(
      'UPDATE orders SET order_number = $1, customer_id = $2, quote_id = $3, assigned_to = $4, status = $5, order_date = $6, delivery_date = $7, total_amount = $8, tax_amount = $9, discount_amount = $10, final_amount = $11, payment_status = $12, shipping_address = $13, billing_address = $14, notes = $15, updated_at = CURRENT_TIMESTAMP WHERE id = $16 RETURNING *',
      [order_number, customer_id, quote_id, assigned_to, status, order_date, delivery_date, total_amount, tax_amount, discount_amount, final_amount, payment_status, shipping_address, billing_address, notes, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/sales/orders/:id', authenticateToken, authorizeRoles('sales_manager', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SALES REPORTS ENDPOINTS
app.get('/api/sales/reports', authenticateToken, async (req, res) => {
  try {
    // First, check if the table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'sales_reports'
      );
    `);
    
    if (!tableCheck.rows[0].exists) {
      // Create the table if it doesn't exist
      await pool.query(`
        CREATE TABLE IF NOT EXISTS sales_reports (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          report_type VARCHAR(50) NOT NULL,
          period VARCHAR(50) NOT NULL,
          total_revenue DECIMAL(15,2) DEFAULT 0,
          total_orders INTEGER DEFAULT 0,
          total_customers INTEGER DEFAULT 0,
          average_order_value DECIMAL(15,2) DEFAULT 0,
          conversion_rate DECIMAL(5,2) DEFAULT 0,
          data JSONB,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      
      // Insert sample data
      await pool.query(`
        INSERT INTO sales_reports (report_type, period, total_revenue, total_orders, total_customers, average_order_value, conversion_rate, data) VALUES
        ('sales_summary', 'this_month', 125000.00, 45, 28, 2777.78, 15.5, '{"top_products": [{"name": "Security System A", "revenue": 45000, "quantity": 15}, {"name": "CCTV Package", "revenue": 38000, "quantity": 12}], "top_customers": [{"name": "TechCorp Ltd", "revenue": 25000, "orders": 3}, {"name": "SecureNet Inc", "revenue": 22000, "orders": 2}]}'),
        ('product_performance', 'this_month', 125000.00, 45, 28, 2777.78, 15.5, '{"product_breakdown": [{"name": "Security System A", "revenue": 45000, "percentage": 36}, {"name": "CCTV Package", "revenue": 38000, "percentage": 30.4}, {"name": "Access Control", "revenue": 42000, "percentage": 33.6}]}'),
        ('customer_analysis', 'this_month', 125000.00, 45, 28, 2777.78, 15.5, '{"customer_segments": [{"segment": "Enterprise", "revenue": 75000, "customers": 8}, {"segment": "SMB", "revenue": 35000, "customers": 12}, {"segment": "Individual", "revenue": 15000, "customers": 8}]}'),
        ('campaign_effectiveness', 'this_month', 125000.00, 45, 28, 2777.78, 15.5, '{"campaigns": [{"name": "Q4 Security Push", "leads": 120, "conversions": 18, "roi": 250}, {"name": "Holiday Special", "leads": 85, "conversions": 12, "roi": 180}]}'),
        ('revenue_forecast', 'next_quarter', 180000.00, 65, 35, 2769.23, 18.2, '{"forecast": [{"month": "January", "projected": 60000}, {"month": "February", "projected": 65000}, {"month": "March", "projected": 55000}]}')
        ON CONFLICT DO NOTHING;
      `);
    }
    
    const result = await pool.query(`
      SELECT * FROM sales_reports 
      ORDER BY created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error in /api/sales/reports:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/sales/reports', authenticateToken, authorizeRoles('sales_manager', 'marketing_officer', 'system_admin'), async (req, res) => {
  try {
    const { report_type, period, total_revenue, total_orders, total_customers, average_order_value, conversion_rate, data } = req.body;
    
    const result = await pool.query(
      'INSERT INTO sales_reports (report_type, period, total_revenue, total_orders, total_customers, average_order_value, conversion_rate, data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [report_type, period, total_revenue, total_orders, total_customers, average_order_value, conversion_rate, JSON.stringify(data)]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/sales/reports/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('SELECT * FROM sales_reports WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/sales/reports/:id', authenticateToken, authorizeRoles('sales_manager', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM sales_reports WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    res.json({ message: 'Report deleted successfully' });
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
  console.log(`   📝 CORS Origins: ${process.env.NODE_ENV === 'production' ? 'Production URLs' : 'http://localhost:3000, http://localhost:5173, http://localhost:5174, http://localhost:4173'}`);
}); 

// =====================================================
// INVENTORY MANAGEMENT API ENDPOINTS
// =====================================================

// INVENTORY STATS
app.get('/api/inventory/stats', mockAuthenticateToken, async (req, res) => {
  try {
    // Check if tables exist and create them if they don't
    await pool.query(`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `);
    
    // Drop existing tables if they exist (for development)
    await pool.query('DROP TABLE IF EXISTS inventory_items CASCADE');
    await pool.query('DROP TABLE IF EXISTS suppliers CASCADE');
    await pool.query('DROP TABLE IF EXISTS warehouses CASCADE');
    await pool.query('DROP TABLE IF EXISTS purchase_orders CASCADE');
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS inventory_items (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        sku VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        subcategory VARCHAR(100),
        brand VARCHAR(100),
        model VARCHAR(100),
        unit_of_measure VARCHAR(50),
        cost_price DECIMAL(10,2) DEFAULT 0,
        selling_price DECIMAL(10,2) DEFAULT 0,
        min_stock_level INTEGER DEFAULT 0,
        max_stock_level INTEGER DEFAULT 0,
        current_stock INTEGER DEFAULT 0,
        reserved_stock INTEGER DEFAULT 0,
        available_stock INTEGER DEFAULT 0,
        reorder_point INTEGER DEFAULT 0,
        reorder_quantity INTEGER DEFAULT 0,
        supplier_id UUID,
        location_id UUID,
        status VARCHAR(50) DEFAULT 'active',
        barcode VARCHAR(100),
        weight DECIMAL(8,2),
        dimensions VARCHAR(100),
        expiry_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        contact_person VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        country VARCHAR(100),
        postal_code VARCHAR(20),
        website VARCHAR(255),
        tax_id VARCHAR(100),
        payment_terms VARCHAR(100),
        credit_limit DECIMAL(12,2) DEFAULT 0,
        current_balance DECIMAL(12,2) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'active',
        rating INTEGER DEFAULT 0,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS warehouses (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name VARCHAR(255) NOT NULL,
        code VARCHAR(50) UNIQUE NOT NULL,
        address TEXT,
        city VARCHAR(100),
        state VARCHAR(100),
        country VARCHAR(100),
        postal_code VARCHAR(20),
        contact_person VARCHAR(255),
        phone VARCHAR(50),
        email VARCHAR(255),
        manager_id UUID,
        capacity INTEGER DEFAULT 0,
        used_capacity INTEGER DEFAULT 0,
        status VARCHAR(50) DEFAULT 'active',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS purchase_orders (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        order_number VARCHAR(50) UNIQUE NOT NULL,
        supplier_id UUID REFERENCES suppliers(id),
        order_date DATE NOT NULL,
        expected_delivery_date DATE,
        total_amount DECIMAL(12,2) DEFAULT 0,
        status VARCHAR(50) DEFAULT 'pending',
        description TEXT,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Check if inventory_items table is empty and insert sample data
    const itemsCheck = await pool.query('SELECT COUNT(*) as count FROM inventory_items');
    if (parseInt(itemsCheck.rows[0].count) === 0) {
      console.log('📦 Inserting sample inventory data...');
      
      // Insert sample suppliers
      const supplier1 = await pool.query(`
        INSERT INTO suppliers (name, contact_person, email, phone, city, country, status, rating)
        VALUES ('Tech Supplies Co.', 'John Smith', 'john@techsupplies.com', '+250788123456', 'Kigali', 'Rwanda', 'active', 4)
        RETURNING id
      `);
      
      const supplier2 = await pool.query(`
        INSERT INTO suppliers (name, contact_person, email, phone, city, country, status, rating)
        VALUES ('Security Equipment Ltd.', 'Mary Johnson', 'mary@securityequipment.com', '+250788234567', 'Kigali', 'Rwanda', 'active', 5)
        RETURNING id
      `);
      
      const supplier3 = await pool.query(`
        INSERT INTO suppliers (name, contact_person, email, phone, city, country, status, rating)
        VALUES ('Office Solutions', 'David Wilson', 'david@officesolutions.com', '+250788345678', 'Kigali', 'Rwanda', 'active', 3)
        RETURNING id
      `);
      
      // Insert sample warehouses
      const warehouse1 = await pool.query(`
        INSERT INTO warehouses (name, code, address, city, country, contact_person, phone, capacity, status)
        VALUES ('Main Warehouse', 'WH-001', '123 Main Street, Kigali', 'Kigali', 'Rwanda', 'Manager One', '+250788456789', 1000, 'active')
        RETURNING id
      `);
      
      const warehouse2 = await pool.query(`
        INSERT INTO warehouses (name, code, address, city, country, contact_person, phone, capacity, status)
        VALUES ('Secondary Storage', 'WH-002', '456 Secondary Road, Kigali', 'Kigali', 'Rwanda', 'Manager Two', '+250788567890', 500, 'active')
        RETURNING id
      `);
      
      // Insert sample inventory items
      await pool.query(`
        INSERT INTO inventory_items (sku, name, description, category, subcategory, brand, model, unit_of_measure, cost_price, selling_price, min_stock_level, max_stock_level, current_stock, reorder_point, reorder_quantity, supplier_id, location_id, status)
        VALUES ('LAP-001', 'Dell Latitude Laptop', 'Business laptop with 16GB RAM, 512GB SSD', 'Electronics', 'Computers', 'Dell', 'Latitude 5520', 'piece', 800000, 1200000, 5, 15, 8, 5, 10, $1, $2, 'active')
      `, [supplier1.rows[0].id, warehouse1.rows[0].id]);
      
      await pool.query(`
        INSERT INTO inventory_items (sku, name, description, category, subcategory, brand, model, unit_of_measure, cost_price, selling_price, min_stock_level, max_stock_level, current_stock, reorder_point, reorder_quantity, supplier_id, location_id, status)
        VALUES ('MON-001', '24-inch LED Monitor', 'Full HD monitor for office use', 'Electronics', 'Displays', 'Samsung', 'LS24R350', 'piece', 150000, 250000, 3, 8, 5, 3, 5, $1, $2, 'active')
      `, [supplier1.rows[0].id, warehouse1.rows[0].id]);
      
      await pool.query(`
        INSERT INTO inventory_items (sku, name, description, category, subcategory, brand, model, unit_of_measure, cost_price, selling_price, min_stock_level, max_stock_level, current_stock, reorder_point, reorder_quantity, supplier_id, location_id, status)
        VALUES ('SEC-001', 'Security Camera System', '4-channel CCTV system with night vision', 'Security', 'Cameras', 'Hikvision', 'DS-7604NI-K1', 'piece', 500000, 750000, 2, 5, 3, 2, 3, $1, $2, 'active')
      `, [supplier2.rows[0].id, warehouse2.rows[0].id]);
      
      await pool.query(`
        INSERT INTO inventory_items (sku, name, description, category, subcategory, brand, model, unit_of_measure, cost_price, selling_price, min_stock_level, max_stock_level, current_stock, reorder_point, reorder_quantity, supplier_id, location_id, status)
        VALUES ('OFF-001', 'Office Chair', 'Ergonomic office chair with armrests', 'Furniture', 'Chairs', 'IKEA', 'MARKUS', 'piece', 80000, 120000, 10, 25, 15, 10, 15, $1, $2, 'active')
      `, [supplier3.rows[0].id, warehouse1.rows[0].id]);
      
      await pool.query(`
        INSERT INTO inventory_items (sku, name, description, category, subcategory, brand, model, unit_of_measure, cost_price, selling_price, min_stock_level, max_stock_level, current_stock, reorder_point, reorder_quantity, supplier_id, location_id, status)
        VALUES ('NET-001', 'Network Switch', '24-port managed network switch', 'Electronics', 'Networking', 'Cisco', 'Catalyst 2960', 'piece', 300000, 450000, 2, 3, 1, 2, 2, $1, $2, 'active')
      `, [supplier1.rows[0].id, warehouse2.rows[0].id]);
      
      // Insert sample purchase orders
      await pool.query(`
        INSERT INTO purchase_orders (order_number, supplier_id, order_date, expected_delivery_date, total_amount, status, description)
        VALUES ('PO-2024-001', $1, '2024-01-15', '2024-01-30', 2500000, 'approved', 'Laptop and monitor order for new office setup')
      `, [supplier1.rows[0].id]);
      
      await pool.query(`
        INSERT INTO purchase_orders (order_number, supplier_id, order_date, expected_delivery_date, total_amount, status, description)
        VALUES ('PO-2024-002', $1, '2024-01-20', '2024-02-05', 1500000, 'pending', 'Security camera system for warehouse')
      `, [supplier2.rows[0].id]);
      
      await pool.query(`
        INSERT INTO purchase_orders (order_number, supplier_id, order_date, expected_delivery_date, total_amount, status, description)
        VALUES ('PO-2024-003', $1, '2024-01-25', '2024-02-10', 800000, 'delivered', 'Office furniture for new employees')
      `, [supplier3.rows[0].id]);
    }
    
    // Get actual statistics from the database
    const [itemsResult, suppliersResult, warehousesResult] = await Promise.all([
      pool.query('SELECT COUNT(*) as count, SUM(cost_price * current_stock) as total_value FROM inventory_items'),
      pool.query('SELECT COUNT(*) as count FROM suppliers WHERE status = \'active\''),
      pool.query('SELECT COUNT(*) as count FROM warehouses WHERE status = \'active\'')
    ]);
    
    const lowStockResult = await pool.query(`
      SELECT COUNT(*) as count 
      FROM inventory_items 
      WHERE current_stock <= min_stock_level AND status = 'active'
    `);
    
    const outOfStockResult = await pool.query(`
      SELECT COUNT(*) as count 
      FROM inventory_items 
      WHERE current_stock = 0 AND status = 'active'
    `);
    
    const stats = {
      total_items: parseInt(itemsResult.rows[0].count) || 0,
      total_inventory_value: parseFloat(itemsResult.rows[0].total_value) || 0,
      total_suppliers: parseInt(suppliersResult.rows[0].count) || 0,
      total_warehouses: parseInt(warehousesResult.rows[0].count) || 0,
      low_stock_items: parseInt(lowStockResult.rows[0].count) || 0,
      out_of_stock_items: parseInt(outOfStockResult.rows[0].count) || 0
    };
    
    res.json(stats);
  } catch (err) {
    console.error('Error in /api/inventory/stats:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// INVENTORY ITEMS
app.get('/api/inventory/items', mockAuthenticateToken, async (req, res) => {
  try {
    const { search, category, status, supplier, warehouse } = req.query;
    
    let query = `
      SELECT 
        i.*,
        s.name as supplier_name,
        s.contact_person as supplier_contact,
        s.phone as supplier_phone,
        s.email as supplier_email,
        w.name as warehouse_name,
        w.code as warehouse_code
      FROM inventory_items i
      LEFT JOIN suppliers s ON i.supplier_id = s.id
      LEFT JOIN warehouses w ON i.location_id = w.id
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (search) {
      paramCount++;
      query += ` AND (i.name ILIKE $${paramCount} OR i.sku ILIKE $${paramCount} OR i.description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }
    
    if (category) {
      paramCount++;
      query += ` AND i.category = $${paramCount}`;
      params.push(category);
    }
    
    if (status) {
      paramCount++;
      query += ` AND i.status = $${paramCount}`;
      params.push(status);
    }
    
    if (supplier) {
      paramCount++;
      query += ` AND s.name ILIKE $${paramCount}`;
      params.push(`%${supplier}%`);
    }
    
    if (warehouse) {
      paramCount++;
      query += ` AND w.name ILIKE $${paramCount}`;
      params.push(`%${warehouse}%`);
    }
    
    query += ` ORDER BY i.created_at DESC`;
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error in /api/inventory/items:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/inventory/items', mockAuthenticateToken, async (req, res) => {
  try {
    const {
      sku, name, description, category, subcategory, brand, model,
      unit_of_measure, cost_price, selling_price, min_stock_level,
      max_stock_level, current_stock, reorder_point, reorder_quantity,
      supplier_id, location_id, barcode, weight, dimensions, expiry_date
    } = req.body;
    
    const query = `
      INSERT INTO inventory_items (
        sku, name, description, category, subcategory, brand, model,
        unit_of_measure, cost_price, selling_price, min_stock_level,
        max_stock_level, current_stock, reorder_point, reorder_quantity,
        supplier_id, location_id, barcode, weight, dimensions, expiry_date,
        available_stock
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $13)
      RETURNING *
    `;
    
    const values = [
      sku, name, description, category, subcategory, brand, model,
      unit_of_measure, cost_price, selling_price, min_stock_level,
      max_stock_level, current_stock, reorder_point, reorder_quantity,
      supplier_id, location_id, barcode, weight, dimensions, expiry_date
    ];
    
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error in POST /api/inventory/items:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/inventory/items/:id', mockAuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT 
        i.*,
        s.name as supplier_name,
        s.contact_person as supplier_contact,
        s.phone as supplier_phone,
        s.email as supplier_email,
        w.name as warehouse_name,
        w.code as warehouse_code
      FROM inventory_items i
      LEFT JOIN suppliers s ON i.supplier_id = s.id
      LEFT JOIN warehouses w ON i.location_id = w.id
      WHERE i.id = $1
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error in GET /api/inventory/items/:id:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/inventory/items/:id', mockAuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      sku, name, description, category, subcategory, brand, model,
      unit_of_measure, cost_price, selling_price, min_stock_level,
      max_stock_level, current_stock, reorder_point, reorder_quantity,
      supplier_id, location_id, barcode, weight, dimensions, expiry_date, status
    } = req.body;
    
    const query = `
      UPDATE inventory_items SET
        sku = $1, name = $2, description = $3, category = $4, subcategory = $5,
        brand = $6, model = $7, unit_of_measure = $8, cost_price = $9,
        selling_price = $10, min_stock_level = $11, max_stock_level = $12,
        current_stock = $13, reorder_point = $14, reorder_quantity = $15,
        supplier_id = $16, location_id = $17, barcode = $18, weight = $19,
        dimensions = $20, expiry_date = $21, status = $22, available_stock = $13,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $23
      RETURNING *
    `;
    
    const values = [
      sku, name, description, category, subcategory, brand, model,
      unit_of_measure, cost_price, selling_price, min_stock_level,
      max_stock_level, current_stock, reorder_point, reorder_quantity,
      supplier_id, location_id, barcode, weight, dimensions, expiry_date, status, id
    ];
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error in PUT /api/inventory/items/:id:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/inventory/items/:id', mockAuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM inventory_items WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Error in DELETE /api/inventory/items/:id:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get categories for filter dropdown
app.get('/api/inventory/categories', mockAuthenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT category FROM inventory_items WHERE category IS NOT NULL ORDER BY category');
    res.json(result.rows.map(row => row.category));
  } catch (err) {
    console.error('Error in /api/inventory/categories:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get suppliers for filter dropdown
app.get('/api/inventory/suppliers', mockAuthenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name FROM suppliers WHERE status = \'active\' ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error('Error in /api/inventory/suppliers:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get warehouses for filter dropdown
app.get('/api/inventory/warehouses', mockAuthenticateToken, async (req, res) => {
  try {
    const { search, status, city, country } = req.query;
    
    let query = `
      SELECT 
        w.*,
        COUNT(i.id) as item_count,
        SUM(i.current_stock * i.cost_price) as total_inventory_value,
        AVG(i.cost_price) as avg_item_cost
      FROM warehouses w
      LEFT JOIN inventory_items i ON w.id = i.location_id
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (search) {
      paramCount++;
      query += ` AND (w.name ILIKE $${paramCount} OR w.code ILIKE $${paramCount} OR w.contact_person ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }
    
    if (status) {
      paramCount++;
      query += ` AND w.status = $${paramCount}`;
      params.push(status);
    }
    
    if (city) {
      paramCount++;
      query += ` AND w.city ILIKE $${paramCount}`;
      params.push(`%${city}%`);
    }
    
    if (country) {
      paramCount++;
      query += ` AND w.country ILIKE $${paramCount}`;
      params.push(`%${country}%`);
    }
    
    query += ` GROUP BY w.id ORDER BY w.created_at DESC`;
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error in /api/inventory/warehouses:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/inventory/warehouses', mockAuthenticateToken, async (req, res) => {
  try {
    const {
      name, code, address, city, state, country, postal_code,
      contact_person, phone, email, manager_id, capacity, notes
    } = req.body;
    
    const query = `
      INSERT INTO warehouses (
        name, code, address, city, state, country, postal_code,
        contact_person, phone, email, manager_id, capacity, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `;
    
    const values = [
      name, code, address, city, state, country, postal_code,
      contact_person, phone, email, manager_id, capacity, notes
    ];
    
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error in POST /api/inventory/warehouses:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/inventory/warehouses/:id', mockAuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT 
        w.*,
        COUNT(i.id) as item_count,
        SUM(i.current_stock * i.cost_price) as total_inventory_value,
        AVG(i.cost_price) as avg_item_cost
      FROM warehouses w
      LEFT JOIN inventory_items i ON w.id = i.location_id
      WHERE w.id = $1
      GROUP BY w.id, e.name, e.email, e.phone
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error in GET /api/inventory/warehouses/:id:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/inventory/warehouses/:id', mockAuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, code, address, city, state, country, postal_code,
      contact_person, phone, email, manager_id, capacity, used_capacity, status, notes
    } = req.body;
    
    const query = `
      UPDATE warehouses SET
        name = $1, code = $2, address = $3, city = $4, state = $5, country = $6,
        postal_code = $7, contact_person = $8, phone = $9, email = $10,
        manager_id = $11, capacity = $12, used_capacity = $13, status = $14,
        notes = $15, updated_at = CURRENT_TIMESTAMP
      WHERE id = $16
      RETURNING *
    `;
    
    const values = [
      name, code, address, city, state, country, postal_code,
      contact_person, phone, email, manager_id, capacity, used_capacity, status, notes, id
    ];
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error in PUT /api/inventory/warehouses/:id:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/inventory/warehouses/:id', mockAuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if warehouse has associated items
    const itemsCheck = await pool.query('SELECT COUNT(*) as count FROM inventory_items WHERE location_id = $1', [id]);
    
    if (parseInt(itemsCheck.rows[0].count) > 0) {
      return res.status(400).json({ error: 'Cannot delete warehouse with associated inventory items' });
    }
    
    const result = await pool.query('DELETE FROM warehouses WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    
    res.json({ message: 'Warehouse deleted successfully' });
  } catch (err) {
    console.error('Error in DELETE /api/inventory/warehouses/:id:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get warehouse cities for filter dropdown
app.get('/api/inventory/warehouse-cities', mockAuthenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT city FROM warehouses WHERE city IS NOT NULL ORDER BY city');
    res.json(result.rows.map(row => row.city));
  } catch (err) {
    console.error('Error in /api/inventory/warehouse-cities:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get warehouse countries for filter dropdown
app.get('/api/inventory/warehouse-countries', mockAuthenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT country FROM warehouses WHERE country IS NOT NULL ORDER BY country');
    res.json(result.rows.map(row => row.country));
  } catch (err) {
    console.error('Error in /api/inventory/warehouse-countries:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get employees for manager dropdown
app.get('/api/inventory/employees', mockAuthenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, phone FROM employees WHERE status = \'active\' ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    console.error('Error in /api/inventory/employees:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// LOW STOCK ALERTS
app.get('/api/inventory/low-stock-alerts', mockAuthenticateToken, async (req, res) => {
  try {
    res.json([]);
  } catch (err) {
    console.error('Error in /api/inventory/low-stock-alerts:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// =====================================================
// OPERATIONS API ENDPOINTS
// =====================================================

// OPERATIONS DASHBOARD STATS
app.get('/api/operations/stats', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(DISTINCT e.id) as total_employees,
        COUNT(DISTINCT CASE WHEN e.department = 'Operations' THEN e.id END) as operations_staff,
        COUNT(DISTINCT CASE WHEN s.status = 'in_progress' THEN s.id END) as active_shifts,
        COUNT(DISTINCT CASE WHEN i.status = 'open' THEN i.id END) as open_incidents,
        COUNT(DISTINCT CASE WHEN i.status = 'investigating' THEN i.id END) as investigating_incidents,
        COUNT(DISTINCT CASE WHEN i.severity = 'high' OR i.severity = 'critical' THEN i.id END) as high_priority_incidents
      FROM employees e
      FULL OUTER JOIN shifts s ON s.status = 'in_progress'
      FULL OUTER JOIN incidents i ON i.status IN ('open', 'investigating')
    `);
    
    const stats = result.rows[0] || {
      total_employees: 0,
      operations_staff: 0,
      active_shifts: 0,
      open_incidents: 0,
      investigating_incidents: 0,
      high_priority_incidents: 0
    };
    
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// OPERATIONS RECENT ACTIVITIES
app.get('/api/operations/recent-activities', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        'incident' as type,
        i.title as title,
        i.description as description,
        i.reported_at as timestamp,
        i.severity as priority,
        i.status as status,
        i.reported_by as user
      FROM incidents i
      WHERE i.reported_at >= CURRENT_DATE - INTERVAL '7 days'
      UNION ALL
      SELECT 
        'shift' as type,
        CONCAT(e.name, ' - ', s.location) as title,
        CONCAT(s.start_time, ' to ', s.end_time) as description,
        s.date as timestamp,
        'normal' as priority,
        s.status as status,
        e.name as user
      FROM shifts s
      JOIN employees e ON s.employee_id = e.id
      WHERE s.date >= CURRENT_DATE - INTERVAL '7 days'
      ORDER BY timestamp DESC
      LIMIT 10
    `);
    
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 

// SUPPLIERS CRUD ENDPOINTS
app.get('/api/inventory/suppliers', mockAuthenticateToken, async (req, res) => {
  try {
    const { search, status, country, city } = req.query;
    
    let query = `
      SELECT 
        s.*,
        COUNT(i.id) as item_count,
        SUM(i.current_stock * i.cost_price) as total_inventory_value
      FROM suppliers s
      LEFT JOIN inventory_items i ON s.id = i.supplier_id
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (search) {
      paramCount++;
      query += ` AND (s.name ILIKE $${paramCount} OR s.contact_person ILIKE $${paramCount} OR s.email ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }
    
    if (status) {
      paramCount++;
      query += ` AND s.status = $${paramCount}`;
      params.push(status);
    }
    
    if (country) {
      paramCount++;
      query += ` AND s.country ILIKE $${paramCount}`;
      params.push(`%${country}%`);
    }
    
    if (city) {
      paramCount++;
      query += ` AND s.city ILIKE $${paramCount}`;
      params.push(`%${city}%`);
    }
    
    query += ` GROUP BY s.id ORDER BY s.created_at DESC`;
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error in /api/inventory/suppliers:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/inventory/suppliers', mockAuthenticateToken, async (req, res) => {
  try {
    const {
      name, contact_person, email, phone, address, city, state, country,
      postal_code, website, tax_id, payment_terms, credit_limit, notes
    } = req.body;
    
    const query = `
      INSERT INTO suppliers (
        name, contact_person, email, phone, address, city, state, country,
        postal_code, website, tax_id, payment_terms, credit_limit, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `;
    
    const values = [
      name, contact_person, email, phone, address, city, state, country,
      postal_code, website, tax_id, payment_terms, credit_limit, notes
    ];
    
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error in POST /api/inventory/suppliers:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/inventory/suppliers/:id', mockAuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT 
        s.*,
        COUNT(i.id) as item_count,
        SUM(i.current_stock * i.cost_price) as total_inventory_value,
        AVG(i.cost_price) as avg_item_cost
      FROM suppliers s
      LEFT JOIN inventory_items i ON s.id = i.supplier_id
      WHERE s.id = $1
      GROUP BY s.id
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error in GET /api/inventory/suppliers/:id:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/inventory/suppliers/:id', mockAuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, contact_person, email, phone, address, city, state, country,
      postal_code, website, tax_id, payment_terms, credit_limit, current_balance, status, notes
    } = req.body;
    
    const query = `
      UPDATE suppliers SET
        name = $1, contact_person = $2, email = $3, phone = $4, address = $5,
        city = $6, state = $7, country = $8, postal_code = $9, website = $10,
        tax_id = $11, payment_terms = $12, credit_limit = $13, current_balance = $14,
        status = $15, notes = $16, updated_at = CURRENT_TIMESTAMP
      WHERE id = $17
      RETURNING *
    `;
    
    const values = [
      name, contact_person, email, phone, address, city, state, country,
      postal_code, website, tax_id, payment_terms, credit_limit, current_balance, status, notes, id
    ];
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error in PUT /api/inventory/suppliers/:id:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/inventory/suppliers/:id', mockAuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if supplier has associated items
    const itemsCheck = await pool.query('SELECT COUNT(*) as count FROM inventory_items WHERE supplier_id = $1', [id]);
    
    if (parseInt(itemsCheck.rows[0].count) > 0) {
      return res.status(400).json({ error: 'Cannot delete supplier with associated inventory items' });
    }
    
    const result = await pool.query('DELETE FROM suppliers WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    
    res.json({ message: 'Supplier deleted successfully' });
  } catch (err) {
    console.error('Error in DELETE /api/inventory/suppliers/:id:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get countries for filter dropdown
app.get('/api/inventory/countries', mockAuthenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT country FROM suppliers WHERE country IS NOT NULL ORDER BY country');
    res.json(result.rows.map(row => row.country));
  } catch (err) {
    console.error('Error in /api/inventory/countries:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get cities for filter dropdown
app.get('/api/inventory/cities', mockAuthenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT city FROM suppliers WHERE city IS NOT NULL ORDER BY city');
    res.json(result.rows.map(row => row.city));
  } catch (err) {
    console.error('Error in /api/inventory/cities:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get cities for suppliers filter dropdown
app.get('/api/inventory/suppliers/cities', mockAuthenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT city FROM suppliers WHERE city IS NOT NULL ORDER BY city');
    res.json(result.rows.map(row => row.city));
  } catch (err) {
    console.error('Error in /api/inventory/suppliers/cities:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get countries for suppliers filter dropdown
app.get('/api/inventory/suppliers/countries', mockAuthenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT country FROM suppliers WHERE country IS NOT NULL ORDER BY country');
    res.json(result.rows.map(row => row.country));
  } catch (err) {
    console.error('Error in /api/inventory/suppliers/countries:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// =====================================================
// PURCHASE ORDERS API ENDPOINTS
// =====================================================

// Get all purchase orders
app.get('/api/inventory/purchase-orders', mockAuthenticateToken, async (req, res) => {
  try {
    const { search, status, supplier, date_from, date_to } = req.query;
    
    let query = `
      SELECT 
        po.*,
        s.name as supplier_name,
        s.contact_person as supplier_contact,
        s.phone as supplier_phone,
        s.email as supplier_email
      FROM purchase_orders po
      LEFT JOIN suppliers s ON po.supplier_id = s.id
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 0;
    
    if (search) {
      paramCount++;
      query += ` AND (po.order_number ILIKE $${paramCount} OR po.description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
    }
    
    if (status) {
      paramCount++;
      query += ` AND po.status = $${paramCount}`;
      params.push(status);
    }
    
    if (supplier) {
      paramCount++;
      query += ` AND po.supplier_id = $${paramCount}::uuid`;
      params.push(supplier);
    }
    
    if (date_from) {
      paramCount++;
      query += ` AND po.order_date >= $${paramCount}`;
      params.push(date_from);
    }
    
    if (date_to) {
      paramCount++;
      query += ` AND po.order_date <= $${paramCount}`;
      params.push(date_to);
    }
    
    query += ' ORDER BY po.created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('Error in GET /api/inventory/purchase-orders:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Get purchase order by ID
app.get('/api/inventory/purchase-orders/:id', mockAuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = `
      SELECT 
        po.*,
        s.name as supplier_name,
        s.contact_person as supplier_contact,
        s.phone as supplier_phone,
        s.email as supplier_email
      FROM purchase_orders po
      LEFT JOIN suppliers s ON po.supplier_id = s.id
      WHERE po.id = $1
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Purchase order not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error in GET /api/inventory/purchase-orders/:id:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Create new purchase order
app.post('/api/inventory/purchase-orders', mockAuthenticateToken, async (req, res) => {
  try {
    const {
      order_number, supplier_id, order_date, expected_delivery_date,
      total_amount, status, description, notes
    } = req.body;
    
    const query = `
      INSERT INTO purchase_orders (
        order_number, supplier_id, order_date, expected_delivery_date,
        total_amount, status, description, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    
    const values = [
      order_number, supplier_id, order_date, expected_delivery_date,
      total_amount, status, description, notes
    ];
    
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error in POST /api/inventory/purchase-orders:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update purchase order
app.put('/api/inventory/purchase-orders/:id', mockAuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      order_number, supplier_id, order_date, expected_delivery_date,
      total_amount, status, description, notes
    } = req.body;
    
    const query = `
      UPDATE purchase_orders SET
        order_number = $1, supplier_id = $2, order_date = $3, expected_delivery_date = $4,
        total_amount = $5, status = $6, description = $7, notes = $8, updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *
    `;
    
    const values = [
      order_number, supplier_id, order_date, expected_delivery_date,
      total_amount, status, description, notes, id
    ];
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Purchase order not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error in PUT /api/inventory/purchase-orders/:id:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete purchase order
app.delete('/api/inventory/purchase-orders/:id', mockAuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM purchase_orders WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Purchase order not found' });
    }
    
    res.json({ message: 'Purchase order deleted successfully' });
  } catch (err) {
    console.error('Error in DELETE /api/inventory/purchase-orders/:id:', err.message);
    res.status(500).json({ error: err.message });
  }
});