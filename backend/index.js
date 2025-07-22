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

app.get('/api/departments', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT department FROM employees WHERE department IS NOT NULL ORDER BY department');
    res.json(result.rows.map(row => row.department));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Attendance endpoints
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
    
    query += ' ORDER BY a.date DESC, a.clock_in ASC';
    
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
        a.clock_in,
        a.clock_out
      FROM employees e
      LEFT JOIN attendance a ON e.id = a.employee_id AND a.date = $1::DATE AND a.clock_out IS NULL
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
        employee_id, date, clock_in, location, notes, status, check_in
      ) VALUES ($1, $2::DATE, $3, $4, $5, $6, NOW()) 
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
        a.clock_in,
        a.check_in
      FROM employees e
      LEFT JOIN attendance a ON e.id = a.employee_id AND a.date = $1::DATE AND a.clock_out IS NULL
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
    
    // Calculate total hours using PostgreSQL's time functions
    const result = await pool.query(`
      UPDATE attendance 
      SET 
        clock_out = $1, 
        check_out = NOW(),
        total_hours = EXTRACT(EPOCH FROM (NOW() - check_in))/3600
      WHERE id = $2 AND clock_out IS NULL 
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
        COUNT(*) FILTER (WHERE clock_in IS NOT NULL AND clock_out IS NULL) as present,
        COUNT(*) FILTER (WHERE status = 'absent') as absent,
        COUNT(*) FILTER (WHERE status = 'late') as late,
        COALESCE(SUM(total_hours), 0) as total_hours
      FROM attendance 
      WHERE date = $1::DATE
    `, [today]);
    
    const stats = statsResult.rows[0];
    console.log('   ↪️ Stats calculated:', stats);
    
    const response = {
      present: parseInt(stats.present),
      absent: parseInt(stats.absent),
      late: parseInt(stats.late),
      totalHours: parseFloat(stats.total_hours)
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

// Payroll endpoints
app.get('/api/payroll', authenticateToken, authorizeRoles('hr_manager', 'finance_manager', 'system_admin'), sanitizeQuery, async (req, res) => {
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
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enhanced payroll creation with all new fields
app.post('/api/payroll', authenticateToken, authorizeRoles('hr_manager', 'finance_manager', 'system_admin'), validatePayroll, async (req, res) => {
  try {
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
    
    const totalAllowances = (transportAllowance || 0) + (housingAllowance || 0) + (performanceBonus || 0) + (nightShiftAllowance || 0);
    const totalDeductions = (taxDeduction || 0) + (insuranceDeduction || 0) + (loanDeduction || 0) + (otherDeductions || 0);
    const grossPay = (hoursWorked * hourlyRate) + (overtimeHours * overtimeRate) + totalAllowances;
    const netPay = grossPay - totalDeductions;
    
    const result = await pool.query(
      `INSERT INTO payroll (
        employee_id, period, base_salary, hours_worked, hourly_rate, 
        overtime_hours, overtime_rate, transport_allowance, housing_allowance,
        performance_bonus, night_shift_allowance, tax_deduction, insurance_deduction,
        loan_deduction, other_deductions, deductions, bonuses, gross_pay, 
        net_pay, status, payment_method, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *`,
      [
        employeeId, period, baseSalary, hoursWorked, hourlyRate, 
        overtimeHours, overtimeRate, transportAllowance || 0, housingAllowance || 0,
        performanceBonus || 0, nightShiftAllowance || 0, taxDeduction || 0, insuranceDeduction || 0,
        loanDeduction || 0, otherDeductions || 0, totalDeductions, totalAllowances, grossPay, 
        netPay, 'pending', paymentMethod, notes
      ]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
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

    let updateQuery = '';
    let params = [];

    switch (action) {
      case 'process':
        updateQuery = `UPDATE payroll SET status = 'processed', processed_at = NOW(), processed_by = $1 WHERE id = ANY($2) RETURNING *`;
        params = [processedBy, payrollIds];
        break;
      case 'approve':
        updateQuery = `UPDATE payroll SET status = 'paid', paid_at = NOW(), paid_by = $1 WHERE id = ANY($2) RETURNING *`;
        params = [processedBy, payrollIds];
        break;
      case 'reject':
        updateQuery = `UPDATE payroll SET status = 'rejected', processed_at = NOW(), processed_by = $1 WHERE id = ANY($2) RETURNING *`;
        params = [processedBy, payrollIds];
        break;
      case 'cancel':
        updateQuery = `UPDATE payroll SET status = 'cancelled', processed_at = NOW(), processed_by = $1 WHERE id = ANY($2) RETURNING *`;
        params = [processedBy, payrollIds];
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    const result = await pool.query(updateQuery, params);
    res.json({ 
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
    const { approvedBy } = req.body;
    
    const result = await pool.query(
      'UPDATE payroll SET status = $1, paid_at = NOW(), paid_by = $2 WHERE id = $3 RETURNING *',
      ['paid', approvedBy, id]
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
    const { rejectedBy, reason } = req.body;
    
    const result = await pool.query(
      'UPDATE payroll SET status = $1, processed_at = NOW(), processed_by = $2, notes = COALESCE(notes, $3) WHERE id = $4 RETURNING *',
      ['rejected', rejectedBy, reason, id]
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
    const { cancelledBy, reason } = req.body;
    
    const result = await pool.query(
      'UPDATE payroll SET status = $1, processed_at = NOW(), processed_by = $2, notes = COALESCE(notes, $3) WHERE id = $4 RETURNING *',
      ['cancelled', cancelledBy, reason, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Payslip generation endpoint
app.get('/api/payroll/:id/payslip', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT p.*, e.name as employee_name, e.department, e.position, e.email
      FROM payroll p 
      JOIN employees e ON p.employee_id = e.id
      WHERE p.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    const payroll = result.rows[0];
    
    // Generate payslip data
    const payslip = {
      id: payroll.id,
      employee: {
        name: payroll.employee_name,
        id: payroll.employee_id,
        department: payroll.department,
        position: payroll.position,
        email: payroll.email
      },
      period: payroll.period,
      earnings: {
        baseSalary: payroll.base_salary,
        overtime: payroll.overtime_hours * payroll.overtime_rate,
        transportAllowance: payroll.transport_allowance,
        housingAllowance: payroll.housing_allowance,
        performanceBonus: payroll.performance_bonus,
        nightShiftAllowance: payroll.night_shift_allowance,
        total: payroll.gross_pay
      },
      deductions: {
        tax: payroll.tax_deduction,
        insurance: payroll.insurance_deduction,
        loan: payroll.loan_deduction,
        other: payroll.other_deductions,
        total: payroll.deductions
      },
      summary: {
        grossPay: payroll.gross_pay,
        netPay: payroll.net_pay,
        status: payroll.status,
        paymentMethod: payroll.payment_method
      },
      generatedAt: new Date().toISOString()
    };
    
    res.json(payslip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export payroll data
app.get('/api/payroll/export', async (req, res) => {
  try {
    const { period, status, format = 'json' } = req.query;
    
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
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY p.period DESC, e.name ASC';
    
    const result = await pool.query(query, params);
    
    if (format === 'csv') {
      const csv = result.rows.map(row => 
        `${row.employee_name},${row.period},${row.base_salary},${row.net_pay},${row.status}`
      ).join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=payroll-${period || 'all'}.csv`);
      res.send(`Employee,Period,Base Salary,Net Pay,Status\n${csv}`);
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Advanced payroll statistics
app.get('/api/payroll/advanced-stats', async (req, res) => {
  try {
    const { period } = req.query;
    
    let periodCondition = '';
    let params = [];
    
    if (period) {
      periodCondition = 'WHERE period = $1';
      params.push(period);
    }
    
    // Total payroll statistics
    const totalStats = await pool.query(`
      SELECT 
        COUNT(*) as total_records,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
        COUNT(CASE WHEN status = 'processed' THEN 1 END) as processed_count,
        COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid_count,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_count,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_count,
        COALESCE(SUM(CASE WHEN status = 'paid' THEN net_pay ELSE 0 END), 0) as total_paid_amount,
        COALESCE(SUM(CASE WHEN status = 'pending' THEN net_pay ELSE 0 END), 0) as total_pending_amount,
        COALESCE(AVG(net_pay), 0) as average_net_pay,
        COALESCE(MAX(net_pay), 0) as highest_pay,
        COALESCE(MIN(net_pay), 0) as lowest_pay
      FROM payroll ${periodCondition}
    `, params);
    
    // Department-wise statistics
    const deptStats = await pool.query(`
      SELECT 
        e.department,
        COUNT(*) as employee_count,
        COALESCE(SUM(CASE WHEN p.status = 'paid' THEN p.net_pay ELSE 0 END), 0) as total_paid,
        COALESCE(AVG(p.net_pay), 0) as avg_pay
      FROM payroll p
      JOIN employees e ON p.employee_id = e.id
      ${periodCondition}
      GROUP BY e.department
      ORDER BY total_paid DESC
    `, params);
    
    // Payment method distribution
    const paymentStats = await pool.query(`
      SELECT 
        payment_method,
        COUNT(*) as count,
        COALESCE(SUM(net_pay), 0) as total_amount
      FROM payroll ${periodCondition}
      GROUP BY payment_method
      ORDER BY count DESC
    `, params);
    
    // Monthly trend (last 6 months)
    const monthlyTrend = await pool.query(`
      SELECT 
        period,
        COUNT(*) as record_count,
        COALESCE(SUM(CASE WHEN status = 'paid' THEN net_pay ELSE 0 END), 0) as paid_amount,
        COALESCE(AVG(net_pay), 0) as avg_pay
      FROM payroll
      WHERE period >= (SELECT MIN(period) FROM payroll)
      GROUP BY period
      ORDER BY period DESC
      LIMIT 6
    `);
    
    res.json({
      summary: totalStats.rows[0],
      byDepartment: deptStats.rows,
      byPaymentMethod: paymentStats.rows,
      monthlyTrend: monthlyTrend.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Payroll audit trail
app.get('/api/payroll/:id/audit', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT 
        id,
        employee_id,
        period,
        status,
        created_at,
        processed_at,
        paid_at,
        processed_by,
        paid_by,
        notes
      FROM payroll 
      WHERE id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    const payroll = result.rows[0];
    const auditTrail = [];
    
    // Add creation event
    auditTrail.push({
      action: 'created',
      timestamp: payroll.created_at,
      status: 'pending',
      user: 'system'
    });
    
    // Add processing event if processed
    if (payroll.processed_at) {
      auditTrail.push({
        action: 'processed',
        timestamp: payroll.processed_at,
        status: payroll.status,
        user: payroll.processed_by || 'system'
      });
    }
    
    // Add payment event if paid
    if (payroll.paid_at) {
      auditTrail.push({
        action: 'paid',
        timestamp: payroll.paid_at,
        status: 'paid',
        user: payroll.paid_by || 'system'
      });
    }
    
    res.json({
      payrollId: id,
      auditTrail: auditTrail.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/payroll/stats', async (req, res) => {
  try {
    const totalResult = await pool.query('SELECT COUNT(*) as count FROM payroll');
    const pendingResult = await pool.query("SELECT COUNT(*) as count FROM payroll WHERE status = 'pending'");
    const processedResult = await pool.query("SELECT COUNT(*) as count FROM payroll WHERE status = 'processed'");
    const paidResult = await pool.query("SELECT COUNT(*) as count FROM payroll WHERE status = 'paid'");
    const totalAmountResult = await pool.query("SELECT COALESCE(SUM(net_pay), 0) as total FROM payroll WHERE status = 'paid'");
    
    res.json({
      total: parseInt(totalResult.rows[0].count),
      pending: parseInt(pendingResult.rows[0].count),
      processed: parseInt(processedResult.rows[0].count),
      paid: parseInt(paidResult.rows[0].count),
      totalAmount: parseFloat(totalAmountResult.rows[0].total)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate payroll for a specific period
app.post('/api/payroll/generate', async (req, res) => {
  try {
    const { period, employeeIds, generatedBy } = req.body;
    
    if (!period) {
      return res.status(400).json({ error: 'Period is required' });
    }
    
    // Get employees to generate payroll for
    let employeeQuery = 'SELECT id, name, department, position FROM employees WHERE status = \'active\'';
    let employeeParams = [];
    
    if (employeeIds && employeeIds.length > 0) {
      employeeQuery += ' AND id = ANY($1)';
      employeeParams.push(employeeIds);
    }
    
    const employeesResult = await pool.query(employeeQuery, employeeParams);
    const employees = employeesResult.rows;
    
    if (employees.length === 0) {
      return res.status(400).json({ error: 'No active employees found' });
    }
    
    const generatedPayrolls = [];
    
    for (const employee of employees) {
      // Check if payroll already exists for this employee and period
      const existingResult = await pool.query(
        'SELECT id FROM payroll WHERE employee_id = $1 AND period = $2',
        [employee.id, period]
      );
      
      if (existingResult.rows.length > 0) {
        continue; // Skip if payroll already exists
      }
      
      // Get attendance data for the period (simplified calculation)
      const attendanceResult = await pool.query(
        'SELECT COUNT(*) as days_worked, COALESCE(SUM(total_hours), 0) as total_hours FROM attendance WHERE employee_id = $1 AND date >= $2 AND date < $3',
        [employee.id, `${period}-01`, `${period}-32`] // Approximate month range
      );
      
      const attendance = attendanceResult.rows[0];
      const daysWorked = parseInt(attendance.days_worked) || 0;
      const hoursWorked = parseFloat(attendance.total_hours) || 160; // Default to 160 hours
      
      // Calculate payroll (simplified - in real system, you'd have salary structures)
      const baseSalary = 120000; // Default base salary
      const hourlyRate = baseSalary / 160;
      const overtimeHours = Math.max(0, hoursWorked - 160);
      const overtimeRate = hourlyRate * 1.5;
      
      // Allowances and deductions (simplified)
      const transportAllowance = 15000;
      const housingAllowance = baseSalary * 0.1;
      const performanceBonus = Math.floor(Math.random() * 50000);
      const nightShiftAllowance = Math.floor(Math.random() * 20000);
      
      const taxDeduction = baseSalary * 0.15;
      const insuranceDeduction = 10000;
      const loanDeduction = Math.floor(Math.random() * 30000);
      const otherDeductions = Math.floor(Math.random() * 15000);
      
      const totalAllowances = transportAllowance + housingAllowance + performanceBonus + nightShiftAllowance;
      const totalDeductions = taxDeduction + insuranceDeduction + loanDeduction + otherDeductions;
      
      const grossPay = baseSalary + (overtimeHours * overtimeRate) + totalAllowances;
      const netPay = grossPay - totalDeductions;
      
      // Insert payroll record
      const payrollResult = await pool.query(
        `INSERT INTO payroll (
          employee_id, period, base_salary, hours_worked, hourly_rate, 
          overtime_hours, overtime_rate, deductions, bonuses, gross_pay, 
          net_pay, status, payment_method, notes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
        [
          employee.id, period, baseSalary, hoursWorked, hourlyRate, 
          overtimeHours, overtimeRate, totalDeductions, totalAllowances, grossPay, 
          netPay, 'pending', 'direct_deposit', `Auto-generated payroll for ${period}`
        ]
      );
      
      generatedPayrolls.push(payrollResult.rows[0]);
    }
    
    res.json({
      message: `Successfully generated ${generatedPayrolls.length} payroll records for period ${period}`,
      generatedPayrolls,
      period,
      generatedBy
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get payroll periods
app.get('/api/payroll/periods', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT period FROM payroll ORDER BY period DESC'
    );
    
    res.json(result.rows.map(row => row.period));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get payment methods
app.get('/api/payroll/payment-methods', async (req, res) => {
  try {
    res.json(['direct_deposit', 'cash', 'check', 'mobile_money']);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get payroll statuses
app.get('/api/payroll/statuses', async (req, res) => {
  try {
    res.json(['pending', 'processed', 'paid', 'cancelled', 'rejected']);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update payroll record
app.put('/api/payroll/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      baseSalary, hoursWorked, hourlyRate, overtimeHours, overtimeRate,
      transportAllowance, housingAllowance, performanceBonus, nightShiftAllowance,
      taxDeduction, insuranceDeduction, loanDeduction, otherDeductions,
      paymentMethod, notes 
    } = req.body;
    
    // Recalculate totals
    const totalAllowances = (transportAllowance || 0) + (housingAllowance || 0) + (performanceBonus || 0) + (nightShiftAllowance || 0);
    const totalDeductions = (taxDeduction || 0) + (insuranceDeduction || 0) + (loanDeduction || 0) + (otherDeductions || 0);
    const grossPay = (hoursWorked * hourlyRate) + (overtimeHours * overtimeRate) + totalAllowances;
    const netPay = grossPay - totalDeductions;
    
    const result = await pool.query(
      `UPDATE payroll SET 
        base_salary = $1, hours_worked = $2, hourly_rate = $3, 
        overtime_hours = $4, overtime_rate = $5, deductions = $6,
        bonuses = $7, gross_pay = $8, net_pay = $9, payment_method = $10, notes = $11
      WHERE id = $12 RETURNING *`,
      [
        baseSalary, hoursWorked, hourlyRate, overtimeHours, overtimeRate,
        totalDeductions, totalAllowances, grossPay, netPay, paymentMethod, notes, id
      ]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete payroll record
app.delete('/api/payroll/:id', async (req, res) => {
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

// Shifts endpoints
app.get('/api/shifts', async (req, res) => {
  try {
    const { date, employeeId, status } = req.query;
    let query = `
      SELECT s.id, s.date, s.start_time, s.end_time, s.location, s.status, s.notes, e.name AS employeeName
      FROM shifts s
      JOIN employees e ON s.employee_id = e.id
    `;
    let params = [];
    let conditions = [];
    if (date) {
      conditions.push(`s.date = $${params.length + 1}`);
      params.push(date);
    }
    if (employeeId) {
      conditions.push(`s.employee_id = $${params.length + 1}`);
      params.push(employeeId);
    }
    if (status) {
      conditions.push(`s.status = $${params.length + 1}`);
      params.push(status);
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY s.date DESC, s.start_time ASC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch shifts' });
  }
});

app.get('/api/shifts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT s.*, e.name as employee_name FROM shifts s JOIN employees e ON s.employee_id = e.id WHERE s.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Shift not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/shifts', async (req, res) => {
  try {
    const { employeeId, date, startTime, endTime, location, clientName, status, notes, totalHours } = req.body;
    const result = await pool.query(
      `INSERT INTO shifts (employee_id, date, start_time, end_time, location, client_name, status, notes, total_hours) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [employeeId, date, startTime, endTime, location, clientName, status || 'scheduled', notes, totalHours]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/shifts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId, date, startTime, endTime, location, clientName, status, notes, totalHours } = req.body;
    const result = await pool.query(
      `UPDATE shifts SET employee_id = $1, date = $2, start_time = $3, end_time = $4, location = $5, client_name = $6, status = $7, notes = $8, total_hours = $9, updated_at = CURRENT_TIMESTAMP WHERE id = $10 RETURNING *`,
      [employeeId, date, startTime, endTime, location, clientName, status, notes, totalHours, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Shift not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/shifts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM shifts WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Shift not found' });
    }
    res.json({ message: 'Shift deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Attendance Trend (last 30 days)
app.get('/api/attendance/trend', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT date, 
        COUNT(*) FILTER (WHERE status = 'present') AS present,
        COUNT(*) FILTER (WHERE status = 'absent') AS absent,
        COUNT(*) FILTER (WHERE status = 'leave') AS leave
      FROM attendance
      WHERE date >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY date
      ORDER BY date
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Monthly Hiring vs. Attrition Trend (last 12 months)
app.get('/api/employees/hiring-attrition-trend', async (req, res) => {
  try {
    const result = await pool.query(`
      WITH months AS (
        SELECT to_char(date_trunc('month', CURRENT_DATE) - INTERVAL '1 month' * gs, 'YYYY-MM') AS month
        FROM generate_series(0, 11) AS gs
      )
      SELECT m.month,
        COALESCE(h.hired, 0) AS hired,
        COALESCE(a.left, 0) AS left
      FROM months m
      LEFT JOIN (
        SELECT to_char(hire_date, 'YYYY-MM') AS month, COUNT(*) AS hired
        FROM employees
        WHERE hire_date IS NOT NULL
        GROUP BY month
      ) h ON m.month = h.month
      LEFT JOIN (
        SELECT to_char(contract_end_date, 'YYYY-MM') AS month, COUNT(*) AS left
        FROM employees
        WHERE contract_end_date IS NOT NULL
        GROUP BY month
      ) a ON m.month = a.month
      ORDER BY m.month
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Top Reasons for Disciplinary Actions
app.get('/api/disciplinary-cases/top-reasons', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT reason, COUNT(*) as count FROM disciplinary_cases GROUP BY reason ORDER BY count DESC LIMIT 5`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Employees With Frequent Absences (last 30 days, >3 absences)
app.get('/api/attendance/frequent-absences', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.name, COUNT(*) as count
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      WHERE a.status = 'absent' AND a.date >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY e.name
      HAVING COUNT(*) > 3
      ORDER BY count DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contracts Expiring in Next 30 Days
app.get('/api/employees/expiring-contracts', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT name, contract_end_date
      FROM employees
      WHERE contract_end_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
      ORDER BY contract_end_date
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Pending Leave/Time-Off Requests
app.get('/api/leave/pending', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT l.id, e.name, l.type, l.start_date, l.end_date
      FROM leave_requests l
      JOIN employees e ON l.employee_id = e.id
      WHERE l.status = 'pending'
      ORDER BY l.start_date
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Shifts Not Assigned for Next Week
app.get('/api/shifts/unassigned-next-week', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT date, COUNT(*) as unassigned
      FROM shifts
      WHERE date BETWEEN CURRENT_DATE + INTERVAL '1 day' AND CURRENT_DATE + INTERVAL '7 days'
        AND (employee_id IS NULL OR employee_id = '')
      GROUP BY date
      ORDER BY date
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contracts Status (pending/approved)
app.get('/api/contracts/status', async (req, res) => {
  try {
    const pending = await pool.query(`SELECT COUNT(*) as count FROM contracts WHERE status = 'pending'`);
    const approved = await pool.query(`SELECT COUNT(*) as count FROM contracts WHERE status = 'approved'`);
    res.json({ pending: parseInt(pending.rows[0].count), approved: parseInt(approved.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Expired IDs
app.get('/api/documents/expired-ids', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.name, d.type as id_type, d.expiry_date as expired_on
      FROM documents d
      JOIN employees e ON d.employee_id = e.id
      WHERE d.expiry_date < CURRENT_DATE
      ORDER BY d.expiry_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Missing Documentation
app.get('/api/documents/missing', async (req, res) => {
  try {
    // Example: required_docs = ['ID Card', 'Contract', 'Photo']
    const requiredDocs = ['ID Card', 'Contract', 'Photo'];
    const result = await pool.query(`
      SELECT e.name, array_agg(d.type) as docs
      FROM employees e
      LEFT JOIN documents d ON d.employee_id = e.id
      GROUP BY e.id
    `);
    const missing = result.rows.map(row => {
      const docs = row.docs.filter(Boolean);
      const missing_docs = requiredDocs.filter(doc => !docs.includes(doc));
      return missing_docs.length > 0 ? { employee: row.name, missing_docs } : null;
    }).filter(Boolean);
    res.json(missing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Top 5 Employees This Month (by attendance)
app.get('/api/employees/top-this-month', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.name, 
        ROUND(100.0 * SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) / NULLIF(COUNT(a.*), 0), 1) AS attendance
      FROM employees e
      JOIN attendance a ON a.employee_id = e.id
      WHERE DATE_TRUNC('month', a.date) = DATE_TRUNC('month', CURRENT_DATE)
      GROUP BY e.id
      ORDER BY attendance DESC NULLS LAST
      LIMIT 5
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Employees on Leave Today
app.get('/api/leave/on-leave-today', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const result = await pool.query(`
      SELECT e.name, l.type, l.start_date, l.end_date
      FROM leave_requests l
      JOIN employees e ON l.employee_id = e.id
      WHERE l.status = 'approved' AND $1 BETWEEN l.start_date AND l.end_date
    `, [today]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leave Balances
app.get('/api/leave/balances', async (req, res) => {
  try {
    // Example: assume leave_balance column in employees table
    const result = await pool.query(`
      SELECT name, leave_balance as balance
      FROM employees
      ORDER BY name
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all demo users (for dev/testing)
app.get('/api/demo-users', async (req, res) => {
  try {
    const result = await pool.query('SELECT email, role, name, position FROM employees ORDER BY role, name');
    
    const demoUsers = result.rows.map(user => ({
      email: user.email,
      role: user.role,
      name: user.name,
      position: user.position
    }));
    
    res.json(demoUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/disciplinary-cases/stats', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) as count FROM disciplinary_cases WHERE status = 'open' OR status = 'pending'"
    );
    res.json({ open: parseInt(result.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Announcements endpoints
app.get('/api/announcements', async (req, res) => {
  try {
    const { type, priority } = req.query;
    let query = 'SELECT * FROM announcements WHERE status = $1';
    let params = ['active'];
    
    if (type) {
      query += ' AND type = $2';
      params.push(type);
    }
    
    if (priority) {
      query += ' AND priority = $3';
      params.push(priority);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/announcements', async (req, res) => {
  try {
    const { title, content, type, priority, created_by, expires_at } = req.body;
    const result = await pool.query(
      `INSERT INTO announcements (title, content, type, priority, created_by, expires_at, status) 
       VALUES ($1, $2, $3, $4, $5, $6, 'active') RETURNING *`,
      [title, content, type, priority, created_by, expires_at]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enhanced activity feed with real data
app.get('/api/activity/recent', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT al.*, e.name as employee_name 
      FROM activity_log al
      JOIN employees e ON al.employee_id = e.id
      ORDER BY al.timestamp DESC
      LIMIT 10
    `);
    
    const activities = result.rows.map(row => ({
      timestamp: row.timestamp,
      type: row.activity_type,
      description: row.description,
      employee_name: row.employee_name
    }));
    
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Shifts statistics
app.get('/api/shifts/stats', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const totalResult = await pool.query('SELECT COUNT(*) as count FROM shifts');
    const todayResult = await pool.query('SELECT COUNT(*) as count FROM shifts WHERE date = $1', [today]);
    const completedResult = await pool.query("SELECT COUNT(*) as count FROM shifts WHERE status = 'completed'");
    const inProgressResult = await pool.query("SELECT COUNT(*) as count FROM shifts WHERE status = 'in_progress'");
    
    res.json({
      total: parseInt(totalResult.rows[0].count),
      today: parseInt(todayResult.rows[0].count),
      completed: parseInt(completedResult.rows[0].count),
      inProgress: parseInt(inProgressResult.rows[0].count)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Quick actions data
app.get('/api/quick-actions', async (req, res) => {
  try {
    const actions = [
      {
        id: 1,
        title: 'Add Employee',
        description: 'Register new employee',
        icon: 'users',
        route: '/hr/employees/add',
        permissions: ['hr_manager', 'hr_assistant', 'system_admin']
      },
      {
        id: 2,
        title: 'Schedule Shift',
        description: 'Assign work schedules',
        icon: 'calendar',
        route: '/operations/shifts',
        permissions: ['operations_supervisor', 'system_admin']
      },
      {
        id: 3,
        title: 'Create Invoice',
        description: 'Generate billing invoice',
        icon: 'dollar-sign',
        route: '/finance/invoicing',
        permissions: ['finance_manager', 'accountant', 'system_admin']
      },
      {
        id: 4,
        title: 'Generate Report',
        description: 'Create HR report',
        icon: 'file-text',
        route: '/finance/reports',
        permissions: ['hr_manager', 'finance_manager', 'system_admin']
      },
      {
        id: 5,
        title: 'Asset Management',
        description: 'Manage security equipment',
        icon: 'shield',
        route: '/inventory/assets',
        permissions: ['asset_manager', 'system_admin']
      },
      {
        id: 6,
        title: 'Client Management',
        description: 'Manage client relationships',
        icon: 'users',
        route: '/clients',
        permissions: ['client_relationship_manager', 'system_admin']
      }
    ];
    
    res.json(actions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard overview statistics
app.get('/api/dashboard/overview', async (req, res) => {
  try {
    // Get employee stats
    const employeeStats = await pool.query('SELECT COUNT(*) as total FROM employees');
    
    // Get attendance stats for today
    const today = new Date().toISOString().split('T')[0];
    const attendanceStats = await pool.query(
      'SELECT COUNT(*) as present FROM attendance WHERE date = $1 AND status = $2',
      [today, 'present']
    );
    
    // Get payroll stats for current month
    const currentMonth = new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0');
    const payrollStats = await pool.query(
      "SELECT COALESCE(SUM(net_pay), 0) as total FROM payroll WHERE period = $1 AND status = 'paid'",
      [currentMonth]
    );
    
    // Get incidents stats
    const incidentsStats = await pool.query(
      "SELECT COUNT(*) as count FROM disciplinary_cases WHERE status = 'open' OR status = 'pending'"
    );
    
    res.json({
      employees: parseInt(employeeStats.rows[0].total),
      onDuty: parseInt(attendanceStats.rows[0].present),
      payroll: parseFloat(payrollStats.rows[0].total),
      incidents: parseInt(incidentsStats.rows[0].count)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Department-wise employee distribution
app.get('/api/dashboard/department-distribution', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT department, COUNT(*) as count 
      FROM employees 
      GROUP BY department 
      ORDER BY count DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Recent system activities
app.get('/api/dashboard/recent-activities', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT al.activity_type, al.description, al.timestamp, e.name as employee_name
      FROM activity_log al
      JOIN employees e ON al.employee_id = e.id
      ORDER BY al.timestamp DESC
      LIMIT 5
    `);
    res.json(result.rows);
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

// Enhanced server startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('🚀 [SERVER] ERP Security Company API Server Started!');
  console.log(`   📝 Port: ${PORT}`);
  console.log(`   📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   📝 Base URL: http://localhost:${PORT}`);
  console.log('   📝 Available endpoints:');
  console.log('      - POST /api/login');
  console.log('      - GET /api/employees (protected)');
  console.log('      - GET /api/payroll (protected)');
  console.log('      - GET /api/attendance (protected)');
  console.log('      - GET /api/documents (protected)');
  console.log('      - GET /api/demo-users');
  console.log('      - GET /api/test-auth (protected)');
  console.log('   📝 Security features active:');
  console.log('      - Authentication middleware');
  console.log('      - Role-based authorization');
  console.log('      - Rate limiting');
  console.log('      - Security headers');
  console.log('      - Input validation');
  console.log('🎯 [SERVER] Ready to handle requests!');
});

// Approve selected attendance logs
app.post('/api/attendance/approve', async (req, res) => {
  try {
    const { ids, approvedBy } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'No attendance IDs provided' });
    }
    await pool.query(
      'UPDATE attendance SET approval_status = $1, approved_by = $2 WHERE id = ANY($3)',
      ['approved', approvedBy || 'system', ids]
    );
    res.json({ message: 'Attendance approved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reject/flag attendance logs
app.post('/api/attendance/reject', async (req, res) => {
  try {
    const { ids, rejectedBy, reason } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'No attendance IDs provided' });
    }
    await pool.query(
      'UPDATE attendance SET approval_status = $1, approved_by = $2, notes = COALESCE(notes, $3) WHERE id = ANY($4)',
      ['rejected', rejectedBy || 'system', reason || 'Rejected', ids]
    );
    res.json({ message: 'Attendance rejected' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit attendance log
app.put('/api/attendance/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { check_in, check_out, status, notes, approvedBy } = req.body;
    const result = await pool.query(
      'UPDATE attendance SET check_in = $1, check_out = $2, status = $3, notes = $4, approval_status = $5, approved_by = $6 WHERE id = $7 RETURNING *',
      [check_in, check_out, status, notes, 'approved', approvedBy || 'system', id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export attendance report
app.get('/api/attendance/export', async (req, res) => {
  try {
    const { week, month, format = 'csv' } = req.query;
    let query = 'SELECT a.*, e.name as employee_name, e.department FROM attendance a JOIN employees e ON a.employee_id = e.id';
    let params = [];
    let conditions = [];
    if (week) {
      conditions.push('EXTRACT(WEEK FROM a.date) = $' + (params.length + 1));
      params.push(week);
    }
    if (month) {
      conditions.push('EXTRACT(MONTH FROM a.date) = $' + (params.length + 1));
      params.push(month);
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY a.date DESC, a.check_in ASC';
    const result = await pool.query(query, params);
    if (format === 'csv') {
      const csv = result.rows.map(row =>
        `${row.date},${row.employee_name},${row.department},${row.status},${row.check_in || ''},${row.check_out || ''},${row.approval_status}`
      ).join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=attendance-${week || month || 'all'}.csv`);
      res.send('Date,Employee,Department,Status,Check In,Check Out,Approval Status\n' + csv);
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch own logs
app.get('/api/attendance/self/:employee_id', async (req, res) => {
  try {
    const { employee_id } = req.params;
    const result = await pool.query(
      'SELECT * FROM attendance WHERE employee_id = $1 ORDER BY date DESC',
      [employee_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// By-date alias
app.get('/api/attendance/by-date', async (req, res) => {
  try {
    const { date } = req.query;
    const result = await pool.query(
      'SELECT a.*, e.name as employee_name, e.department FROM attendance a JOIN employees e ON a.employee_id = e.id WHERE a.date = $1',
      [date]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 

// =====================================================
// DOCUMENT MANAGEMENT API ENDPOINTS
// =====================================================

// Get all documents with filtering and pagination
app.get('/api/documents', authenticateToken, sanitizeQuery, async (req, res) => {
  console.log('➡️  [HIT] /api/documents');
  console.log('   ↪️ Query params:', req.query);
  
  try {
    const { 
      search, 
      category, 
      status, 
      access_level, 
      page = 1, 
      limit = 10,
      sort_by = 'created_at',
      sort_order = 'DESC'
    } = req.query;
    
    let query = `
      SELECT d.*, e.name as employee_name
      FROM documents d
      LEFT JOIN employees e ON d.employee_id = e.id
    `;
    let params = [];
    let conditions = [];
    
    if (search) {
      conditions.push(`(d.type ILIKE $${params.length + 1} OR e.name ILIKE $${params.length + 1})`);
      params.push(`%${search}%`);
    }
    
    if (status && status !== 'all') {
      conditions.push(`d.status = $${params.length + 1}`);
      params.push(status);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    // Add sorting
    query += ` ORDER BY d.${sort_by} ${sort_order}`;
    
    // Add pagination
    const offset = (page - 1) * limit;
    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit), offset);
    
    console.log('   ↪️ Final query:', query);
    console.log('   ↪️ Query params:', params);
    
    const result = await pool.query(query, params);
    console.log('   ↪️ Documents found:', result.rows.length);
    
    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total FROM documents d
      LEFT JOIN employees e ON d.employee_id = e.id
    `;
    let countParams = [];
    let countConditions = [];
    
    if (search) {
      countConditions.push(`(d.type ILIKE $${countParams.length + 1} OR e.name ILIKE $${countParams.length + 1})`);
      countParams.push(`%${search}%`);
    }
    
    if (status && status !== 'all') {
      countConditions.push(`d.status = $${countParams.length + 1}`);
      countParams.push(status);
    }
    
    if (countConditions.length > 0) {
      countQuery += ' WHERE ' + countConditions.join(' AND ');
    }
    
    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].total);
    
    res.json({
      documents: result.rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('❌ Error in /api/documents:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get document statistics
app.get('/api/documents/stats', async (req, res) => {
  console.log('➡️  [HIT] /api/documents/stats');
  
  try {
    const totalResult = await pool.query('SELECT COUNT(*) as total FROM documents');
    const approvedResult = await pool.query("SELECT COUNT(*) as approved FROM documents WHERE status = 'approved'");
    const pendingResult = await pool.query("SELECT COUNT(*) as pending FROM documents WHERE status = 'pending'");
    const expiringResult = await pool.query("SELECT COUNT(*) as expiring FROM documents WHERE expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'");
    
    res.json({
      total: parseInt(totalResult.rows[0].total),
      approved: parseInt(approvedResult.rows[0].approved),
      pending: parseInt(pendingResult.rows[0].pending),
      expiringSoon: parseInt(expiringResult.rows[0].expiring),
      totalFileSize: 0 // Not available in current schema
    });
  } catch (err) {
    console.error('❌ Error in /api/documents/stats:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get single document by ID
app.get('/api/documents/:id', async (req, res) => {
  console.log('➡️  [HIT] /api/documents/:id');
  console.log('   ↪️ Document ID:', req.params.id);
  
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT d.*, e.name as employee_name
      FROM documents d
      LEFT JOIN employees e ON d.employee_id = e.id
      WHERE d.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    // Log access (if document_access_log table exists)
    try {
      await pool.query(
        'INSERT INTO document_access_log (document_id, employee_id, action, ip_address, user_agent, notes) VALUES ($1, $2, $3, $4, $5, $6)',
        [id, 'DIC001', 'view', req.ip, req.get('User-Agent'), 'Viewed document details']
      );
    } catch (logError) {
      console.log('   ↪️ Could not log access (table may not exist):', logError.message);
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error in /api/documents/:id:', err);
    res.status(500).json({ error: err.message });
  }
});

// Upload new document
app.post('/api/documents', authenticateToken, authorizeRoles('system_admin', 'compliance_manager'), validateDocument, upload.single('file'), async (req, res) => {
  console.log('➡️  [HIT] /api/documents (POST)');
  console.log('   ↪️ Request body:', req.body);
  console.log('   ↪️ File:', req.file);
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const {
      title,
      description,
      category,
      access_level = 'restricted',
      assigned_to,
      expiry_date,
      review_date,
      tags,
      notes,
      created_by = 'DIC001' // Default for now
    } = req.body;
    
    // Validate required fields
    if (!title || !category) {
      return res.status(400).json({ error: 'Title and category are required' });
    }
    
    // Generate document number
    const countResult = await pool.query('SELECT COUNT(*) as count FROM documents');
    const nextNumber = `DOC-${new Date().getFullYear()}-${(parseInt(countResult.rows[0].count) + 1).toString().padStart(3, '0')}`;
    
    // Determine file type from extension
    const fileExt = path.extname(req.file.originalname).toLowerCase().substring(1);
    const fileType = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExt) ? fileExt : 
                    fileExt === 'pdf' ? 'pdf' : 
                    fileExt === 'txt' ? 'txt' : 'image';
    
    // Insert document
    const result = await pool.query(`
      INSERT INTO documents (
        document_number, title, description, category, file_type, file_name, file_path, 
        file_size, version, status, access_level, created_by, assigned_to, expiry_date, 
        review_date, tags, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *
    `, [
      nextNumber, title, description, category, fileType, req.file.originalname, 
      req.file.path, req.file.size, '1.0', 'draft', access_level, created_by,
      assigned_to, expiry_date || null, review_date || null, 
      tags ? tags.split(',').map(tag => tag.trim()) : [], notes
    ]);
    
    // Insert version record
    await pool.query(`
      INSERT INTO document_versions (document_id, version, file_name, file_path, file_size, created_by, change_notes, is_current)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
      result.rows[0].id, '1.0', req.file.originalname, req.file.path, req.file.size,
      created_by, 'Initial upload', true
    ]);
    
    // Log access
    await pool.query(
      'INSERT INTO document_access_log (document_id, employee_id, action, ip_address, user_agent, notes) VALUES ($1, $2, $3, $4, $5, $6)',
      [result.rows[0].id, created_by, 'upload', req.ip, req.get('User-Agent'), 'Uploaded new document']
    );
    
    console.log('   ↪️ Document created:', result.rows[0].document_number);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error in /api/documents (POST):', err);
    res.status(500).json({ error: err.message });
  }
});

// Update document
app.put('/api/documents/:id', async (req, res) => {
  console.log('➡️  [HIT] /api/documents/:id (PUT)');
  console.log('   ↪️ Document ID:', req.params.id);
  console.log('   ↪️ Request body:', req.body);
  
  try {
    const { id } = req.params;
    const {
      title,
      description,
      category,
      status,
      access_level,
      assigned_to,
      expiry_date,
      review_date,
      tags,
      notes,
      modified_by = 'DIC001'
    } = req.body;
    
    const result = await pool.query(`
      UPDATE documents SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        category = COALESCE($3, category),
        status = COALESCE($4, status),
        access_level = COALESCE($5, access_level),
        assigned_to = COALESCE($6, assigned_to),
        expiry_date = COALESCE($7, expiry_date),
        review_date = COALESCE($8, review_date),
        tags = COALESCE($9, tags),
        notes = COALESCE($10, notes),
        last_modified = CURRENT_TIMESTAMP,
        last_modified_by = $11
      WHERE id = $12 AND is_active = true
      RETURNING *
    `, [
      title, description, category, status, access_level, assigned_to,
      expiry_date, review_date, tags ? tags.split(',').map(tag => tag.trim()) : null,
      notes, modified_by, id
    ]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    // Log access
    await pool.query(
      'INSERT INTO document_access_log (document_id, employee_id, action, ip_address, user_agent, notes) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, modified_by, 'edit', req.ip, req.get('User-Agent'), 'Updated document']
    );
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Error in /api/documents/:id (PUT):', err);
    res.status(500).json({ error: err.message });
  }
});

// Delete document (soft delete)
app.delete('/api/documents/:id', async (req, res) => {
  console.log('➡️  [HIT] /api/documents/:id (DELETE)');
  console.log('   ↪️ Document ID:', req.params.id);
  
  try {
    const { id } = req.params;
    const { deleted_by = 'DIC001' } = req.body;
    
    const result = await pool.query(
      'UPDATE documents SET is_active = false WHERE id = $1 AND is_active = true RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    // Log access
    await pool.query(
      'INSERT INTO document_access_log (document_id, employee_id, action, ip_address, user_agent, notes) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, deleted_by, 'delete', req.ip, req.get('User-Agent'), 'Deleted document']
    );
    
    res.json({ message: 'Document deleted successfully' });
  } catch (err) {
    console.error('❌ Error in /api/documents/:id (DELETE):', err);
    res.status(500).json({ error: err.message });
  }
});

// Download document
app.get('/api/documents/:id/download', async (req, res) => {
  console.log('➡️  [HIT] /api/documents/:id/download');
  console.log('   ↪️ Document ID:', req.params.id);
  
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT file_path, file_name, title FROM documents WHERE id = $1 AND is_active = true',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    const document = result.rows[0];
    const filePath = document.file_path;
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found on server' });
    }
    
    // Update download count
    await pool.query(
      'UPDATE documents SET download_count = download_count + 1 WHERE id = $1',
      [id]
    );
    
    // Log download
    await pool.query(
      'INSERT INTO document_access_log (document_id, employee_id, action, ip_address, user_agent, notes) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, 'DIC001', 'download', req.ip, req.get('User-Agent'), 'Downloaded document']
    );
    
    // Send file
    res.download(filePath, document.file_name);
  } catch (err) {
    console.error('❌ Error in /api/documents/:id/download:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get document version history
app.get('/api/documents/:id/versions', async (req, res) => {
  console.log('➡️  [HIT] /api/documents/:id/versions');
  console.log('   ↪️ Document ID:', req.params.id);
  
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT dv.*, e.name as created_by_name
      FROM document_versions dv
      LEFT JOIN employees e ON dv.created_by = e.id
      WHERE dv.document_id = $1
      ORDER BY dv.created_date DESC
    `, [id]);
    
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error in /api/documents/:id/versions:', err);
    res.status(500).json({ error: err.message });
  }
});

// Upload new version of document
app.post('/api/documents/:id/versions', upload.single('file'), async (req, res) => {
  console.log('➡️  [HIT] /api/documents/:id/versions (POST)');
  console.log('   ↪️ Document ID:', req.params.id);
  console.log('   ↪️ File:', req.file);
  
  try {
    const { id } = req.params;
    const { version, change_notes, uploaded_by = 'DIC001' } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Get current document
    const docResult = await pool.query(
      'SELECT * FROM documents WHERE id = $1 AND is_active = true',
      [id]
    );
    
    if (docResult.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }
    
    const document = docResult.rows[0];
    
    // Update current version to not current
    await pool.query(
      'UPDATE document_versions SET is_current = false WHERE document_id = $1',
      [id]
    );
    
    // Insert new version
    await pool.query(`
      INSERT INTO document_versions (document_id, version, file_name, file_path, file_size, created_by, change_notes, is_current)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `, [
      id, version, req.file.originalname, req.file.path, req.file.size,
      uploaded_by, change_notes, true
    ]);
    
    // Update document with new file info
    const fileExt = path.extname(req.file.originalname).toLowerCase().substring(1);
    const fileType = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExt) ? fileExt : 
                    fileExt === 'pdf' ? 'pdf' : 
                    fileExt === 'txt' ? 'txt' : 'image';
    
    await pool.query(`
      UPDATE documents SET 
        file_name = $1, file_path = $2, file_size = $3, file_type = $4,
        version = $5, last_modified = CURRENT_TIMESTAMP, last_modified_by = $6
      WHERE id = $7
    `, [req.file.originalname, req.file.path, req.file.size, fileType, version, uploaded_by, id]);
    
    // Log access
    await pool.query(
      'INSERT INTO document_access_log (document_id, employee_id, action, ip_address, user_agent, notes) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, uploaded_by, 'upload', req.ip, req.get('User-Agent'), `Uploaded new version ${version}`]
    );
    
    res.json({ message: 'New version uploaded successfully' });
  } catch (err) {
    console.error('❌ Error in /api/documents/:id/versions (POST):', err);
    res.status(500).json({ error: err.message });
  }
}); 

// Test endpoint for authentication
app.get('/api/test-auth', authenticateToken, async (req, res) => {
  res.json({
    message: 'Authentication successful!',
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

// Test endpoint for role-based access
app.get('/api/test-hr-access', authenticateToken, authorizeRoles('hr_manager', 'system_admin'), async (req, res) => {
  res.json({
    message: 'HR access granted!',
    user: req.user,
    timestamp: new Date().toISOString()
  });
});

// =====================================================
// FINANCE DEPARTMENT API ENDPOINTS
// =====================================================

// Finance Dashboard Statistics
app.get('/api/finance/dashboard', authenticateToken, authorizeRoles('finance_manager', 'accountant', 'system_admin'), async (req, res) => {
  try {
    // Step 1: Find the latest month with financial activity to make the dashboard dynamic
    const latestActivityMonthResult = await pool.query(`
      SELECT DATE_TRUNC('month', MAX(activity_date)) as latest_month
      FROM (
        SELECT issue_date as activity_date FROM invoices WHERE issue_date IS NOT NULL
        UNION ALL
        SELECT expense_date as activity_date FROM expenses WHERE expense_date IS NOT NULL
      ) as all_activity
    `);

    // Use the latest month of activity, or default to the current month if no data exists
    const latestMonth = latestActivityMonthResult.rows[0]?.latest_month || new Date();
    
    // Using Promise.all to fetch all data in parallel for better performance
    const [
      revenueResult,
      trendResult,
      topClientsResult,
      expensesResult,
      bankResult,
      recentInvoicesResult,
      recentExpensesResult,
      recentBankTransactionsResult,
      topVendorsResult,
      expenseBreakdownResult
    ] = await Promise.all([
      // 1. Get total revenue stats for the latest activity month
      pool.query(`
        SELECT 
          COALESCE(SUM(total_amount), 0) as total_revenue,
          COALESCE(SUM(paid_amount), 0) as total_paid,
          COALESCE(SUM(balance_amount), 0) as outstanding_amount,
          COUNT(*) as total_invoices,
          COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid_invoices,
          COUNT(CASE WHEN status = 'overdue' THEN 1 END) as overdue_invoices
        FROM invoices 
        WHERE DATE_TRUNC('month', issue_date) = $1
      `, [latestMonth]),

      // 2. Get monthly revenue trend for the 6 months leading up to the latest activity month
      pool.query(`
        SELECT 
          to_char(DATE_TRUNC('month', issue_date), 'Mon') as month,
          SUM(total_amount) as revenue,
          SUM(paid_amount) as paid
        FROM invoices 
        WHERE issue_date >= $1::DATE - INTERVAL '5 months' AND issue_date < $1::DATE + INTERVAL '1 month'
        GROUP BY DATE_TRUNC('month', issue_date)
        ORDER BY DATE_TRUNC('month', issue_date) ASC
      `, [latestMonth]),

      // 3. Get top 5 clients by revenue for the latest activity month
      pool.query(`
        SELECT 
          c.company_name,
          SUM(i.total_amount) as total_revenue
        FROM clients c
        JOIN invoices i ON c.id = i.client_id
        WHERE DATE_TRUNC('month', i.issue_date) = $1
        GROUP BY c.id, c.company_name
        ORDER BY total_revenue DESC
        LIMIT 5
      `, [latestMonth]),

      // 4. Get total expense stats for the latest activity month
      pool.query(`
        SELECT 
          COALESCE(SUM(amount), 0) as total_expenses,
          COUNT(*) as expense_count
        FROM expenses 
        WHERE DATE_TRUNC('month', expense_date) = $1 AND status = 'approved'
      `, [latestMonth]),

      // 5. Get bank account balances
      pool.query(`
        SELECT 
          account_name,
          current_balance,
          currency
        FROM bank_accounts 
        WHERE status = 'active'
        ORDER BY current_balance DESC
      `),
      
      // 6. Get recent invoices (not month-dependent, shows latest overall)
      pool.query(`
        SELECT i.id, i.invoice_number, c.company_name, i.total_amount, i.status, i.due_date
        FROM invoices i
        JOIN clients c ON i.client_id = c.id
        ORDER BY i.issue_date DESC
        LIMIT 5
      `),

      // 7. Get recent expenses (not month-dependent, shows latest overall)
      pool.query(`
        SELECT id, expense_number, vendor_name, category, amount, status, expense_date
        FROM expenses
        WHERE status = 'approved'
        ORDER BY expense_date DESC
        LIMIT 5
      `),

      // 8. Get recent bank transactions (not month-dependent, shows latest overall)
      pool.query(`
        SELECT id, transaction_date, description, amount, transaction_type, balance_after
        FROM bank_transactions
        ORDER BY transaction_date DESC
        LIMIT 5
      `),

      // 9. Get top vendors by expense amount (overall, not just for one month)
      pool.query(`
        SELECT vendor_name, SUM(amount) as total_spent
        FROM expenses
        WHERE vendor_name IS NOT NULL AND vendor_name <> '' AND status = 'approved'
        GROUP BY vendor_name
        ORDER BY total_spent DESC
        LIMIT 5
      `),

      // 10. Get expense breakdown by category for the latest activity month
      pool.query(`
        SELECT category, SUM(amount) as total_amount
        FROM expenses
        WHERE DATE_TRUNC('month', expense_date) = $1 AND status = 'approved'
        GROUP BY category
        ORDER BY total_amount DESC
      `, [latestMonth])
    ]);

    res.json({
      revenue: revenueResult.rows[0],
      trend: trendResult.rows,
      top_clients: topClientsResult.rows,
      expenses: expensesResult.rows[0],
      bank_accounts: bankResult.rows,
      recent_invoices: recentInvoicesResult.rows,
      recent_expenses: recentExpensesResult.rows,
      recent_bank_transactions: recentBankTransactionsResult.rows,
      top_vendors: topVendorsResult.rows,
      expense_breakdown_by_category: expenseBreakdownResult.rows
    });
  } catch (err) {
    console.error('❌ Error in /api/finance/dashboard:', err);
    res.status(500).json({ error: err.message });
  }
});

// CLIENTS ENDPOINTS
app.get('/api/finance/clients', authenticateToken, authorizeRoles('finance_manager', 'accountant', 'system_admin'), sanitizeQuery, async (req, res) => {
  try {
    const { search, status, limit = 50, offset = 0 } = req.query;
    let query = 'SELECT * FROM clients';
    let params = [];
    let conditions = [];
    
    if (search) {
      conditions.push(`(company_name ILIKE $${params.length + 1} OR contact_person ILIKE $${params.length + 1} OR client_code ILIKE $${params.length + 1})`);
      params.push(`%${search}%`);
    }
    
    if (status) {
      conditions.push(`status = $${params.length + 1}`);
      params.push(status);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY company_name LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(parseInt(limit), parseInt(offset));
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/finance/clients', authenticateToken, authorizeRoles('finance_manager', 'system_admin'), async (req, res) => {
  try {
    const { 
      client_code, company_name, contact_person, email, phone, address, city, 
      tax_id, registration_number, contract_start_date, contract_end_date, 
      contract_value, payment_terms, credit_limit, notes 
    } = req.body;
    
    const result = await pool.query(
      `INSERT INTO clients (
        client_code, company_name, contact_person, email, phone, address, city,
        tax_id, registration_number, contract_start_date, contract_end_date,
        contract_value, payment_terms, credit_limit, notes, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
      [
        client_code, company_name, contact_person, email, phone, address, city,
        tax_id, registration_number, contract_start_date, contract_end_date,
        contract_value, payment_terms, credit_limit, notes, req.user.id
      ]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// INVOICES ENDPOINTS
app.get('/api/finance/invoices', authenticateToken, authorizeRoles('finance_manager', 'accountant', 'system_admin'), sanitizeQuery, async (req, res) => {
  try {
    const { 
      search, status, client_id, start_date, end_date, limit = 50, offset = 0 
    } = req.query;
    
    let query = `
      SELECT i.*, c.company_name, c.contact_person
      FROM invoices i
      JOIN clients c ON i.client_id = c.id
    `;
    let params = [];
    let conditions = [];
    
    if (search) {
      conditions.push(`(i.invoice_number ILIKE $${params.length + 1} OR c.company_name ILIKE $${params.length + 1})`);
      params.push(`%${search}%`);
    }
    
    if (status) {
      conditions.push(`i.status = $${params.length + 1}`);
      params.push(status);
    }
    
    if (client_id) {
      conditions.push(`i.client_id = $${params.length + 1}`);
      params.push(client_id);
    }
    
    if (start_date && end_date) {
      conditions.push(`i.issue_date BETWEEN $${params.length + 1} AND $${params.length + 2}`);
      params.push(start_date, end_date);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY i.issue_date DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(parseInt(limit), parseInt(offset));
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/finance/invoices/:id', authenticateToken, authorizeRoles('finance_manager', 'accountant', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get invoice with client details
    const invoiceResult = await pool.query(`
      SELECT i.*, c.company_name, c.contact_person, c.email, c.phone, c.address
      FROM invoices i
      JOIN clients c ON i.client_id = c.id
      WHERE i.id = $1
    `, [id]);
    
    if (invoiceResult.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    // Get invoice items
    const itemsResult = await pool.query(`
      SELECT * FROM invoice_items WHERE invoice_id = $1
    `, [id]);
    
    // Get payments
    const paymentsResult = await pool.query(`
      SELECT * FROM payments WHERE invoice_id = $1 ORDER BY payment_date DESC
    `, [id]);
    
    const invoice = invoiceResult.rows[0];
    invoice.items = itemsResult.rows;
    invoice.payments = paymentsResult.rows;
    
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/finance/invoices', authenticateToken, authorizeRoles('finance_manager', 'accountant', 'system_admin'), async (req, res) => {
  try {
    const { 
      client_id, issue_date, due_date, subtotal, tax_rate, tax_amount, 
      discount_amount, total_amount, payment_terms, notes, terms_conditions, items 
    } = req.body;
    
    // Generate invoice number
    const invoiceNumberResult = await pool.query(`
      SELECT COUNT(*) + 1 as next_number FROM invoices WHERE DATE_TRUNC('year', issue_date) = DATE_TRUNC('year', CURRENT_DATE)
    `);
    const invoiceNumber = `INV-${new Date(issue_date).getFullYear()}-${invoiceNumberResult.rows[0].next_number.toString().padStart(3, '0')}`;
    
    // Insert invoice
    const invoiceResult = await pool.query(
      `INSERT INTO invoices (
        invoice_number, client_id, issue_date, due_date, subtotal, tax_rate, 
        tax_amount, discount_amount, total_amount, payment_terms, notes, 
        terms_conditions, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        invoiceNumber, client_id, issue_date, due_date, subtotal, tax_rate,
        tax_amount, discount_amount, total_amount, payment_terms, notes,
        terms_conditions, req.user.id
      ]
    );
    
    const invoice = invoiceResult.rows[0];
    
    // Insert invoice items
    if (items && items.length > 0) {
      for (const item of items) {
        await pool.query(
          `INSERT INTO invoice_items (
            invoice_id, description, quantity, unit_price, amount, 
            tax_rate, tax_amount, total_amount, service_period_start, service_period_end
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [
            invoice.id, item.description, item.quantity, item.unit_price, item.amount,
            item.tax_rate || 18.00, item.tax_amount || 0, item.total_amount,
            item.service_period_start, item.service_period_end
          ]
        );
      }
    }
    
    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/finance/invoices/:id/status', authenticateToken, authorizeRoles('finance_manager', 'accountant', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const result = await pool.query(
      'UPDATE invoices SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PAYMENTS ENDPOINTS
app.get('/api/finance/payments', authenticateToken, authorizeRoles('finance_manager', 'accountant', 'system_admin'), sanitizeQuery, async (req, res) => {
  try {
    const { 
      search, status, client_id, payment_method, start_date, end_date, limit = 50, offset = 0 
    } = req.query;
    
    let query = `
      SELECT p.*, c.company_name, i.invoice_number
      FROM payments p
      JOIN clients c ON p.client_id = c.id
      LEFT JOIN invoices i ON p.invoice_id = i.id
    `;
    let params = [];
    let conditions = [];
    
    if (search) {
      conditions.push(`(p.payment_number ILIKE $${params.length + 1} OR c.company_name ILIKE $${params.length + 1})`);
      params.push(`%${search}%`);
    }
    
    if (status) {
      conditions.push(`p.status = $${params.length + 1}`);
      params.push(status);
    }
    
    if (client_id) {
      conditions.push(`p.client_id = $${params.length + 1}`);
      params.push(client_id);
    }
    
    if (payment_method) {
      conditions.push(`p.payment_method = $${params.length + 1}`);
      params.push(payment_method);
    }
    
    if (start_date && end_date) {
      conditions.push(`p.payment_date BETWEEN $${params.length + 1} AND $${params.length + 2}`);
      params.push(start_date, end_date);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY p.payment_date DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(parseInt(limit), parseInt(offset));
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/finance/payments', authenticateToken, authorizeRoles('finance_manager', 'accountant', 'system_admin'), async (req, res) => {
  try {
    const { 
      invoice_id, client_id, payment_date, amount, payment_method, 
      reference_number, bank_name, account_number, notes 
    } = req.body;
    
    // Generate payment number
    const paymentNumberResult = await pool.query(`
      SELECT COUNT(*) + 1 as next_number FROM payments WHERE DATE_TRUNC('year', payment_date) = DATE_TRUNC('year', CURRENT_DATE)
    `);
    const paymentNumber = `PAY-${new Date(payment_date).getFullYear()}-${paymentNumberResult.rows[0].next_number.toString().padStart(3, '0')}`;
    
    const result = await pool.query(
      `INSERT INTO payments (
        payment_number, invoice_id, client_id, payment_date, amount, 
        payment_method, reference_number, bank_name, account_number, 
        notes, received_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        paymentNumber, invoice_id, client_id, payment_date, amount,
        payment_method, reference_number, bank_name, account_number,
        notes, req.user.id
      ]
    );
    
    // Update invoice paid amount
    if (invoice_id) {
      await pool.query(
        `UPDATE invoices 
         SET paid_amount = paid_amount + $1, 
             balance_amount = total_amount - (paid_amount + $1),
             status = CASE 
               WHEN (paid_amount + $1) >= total_amount THEN 'paid'
               WHEN (paid_amount + $1) > 0 THEN 'partially_paid'
               ELSE status
             END
         WHERE id = $2`,
        [amount, invoice_id]
      );
    }
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// EXPENSES ENDPOINTS
app.get('/api/finance/expenses', authenticateToken, authorizeRoles('finance_manager', 'accountant', 'system_admin'), sanitizeQuery, async (req, res) => {
  try {
    const { 
      search, status, category, start_date, end_date, limit = 50, offset = 0 
    } = req.query;
    
    let query = `
      SELECT e.*, 
             e1.name as submitted_by_name,
             e2.name as approved_by_name
      FROM expenses e
      LEFT JOIN employees e1 ON e.submitted_by = e1.id
      LEFT JOIN employees e2 ON e.approved_by = e2.id
    `;
    let params = [];
    let conditions = [];
    
    if (search) {
      conditions.push(`(e.expense_number ILIKE $${params.length + 1} OR e.description ILIKE $${params.length + 1} OR e.vendor_name ILIKE $${params.length + 1})`);
      params.push(`%${search}%`);
    }
    
    if (status) {
      conditions.push(`e.status = $${params.length + 1}`);
      params.push(status);
    }
    
    if (category) {
      conditions.push(`e.category = $${params.length + 1}`);
      params.push(category);
    }
    
    if (start_date && end_date) {
      conditions.push(`e.expense_date BETWEEN $${params.length + 1} AND $${params.length + 2}`);
      params.push(start_date, end_date);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY e.expense_date DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(parseInt(limit), parseInt(offset));
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/finance/expenses', authenticateToken, authorizeRoles('finance_manager', 'accountant', 'system_admin'), async (req, res) => {
  try {
    const { 
      category, subcategory, description, amount, expense_date, vendor_name,
      vendor_contact, payment_method, reference_number, notes 
    } = req.body;
    
    // Generate expense number
    const expenseNumberResult = await pool.query(`
      SELECT COUNT(*) + 1 as next_number FROM expenses WHERE DATE_TRUNC('year', expense_date) = DATE_TRUNC('year', CURRENT_DATE)
    `);
    const expenseNumber = `EXP-${new Date(expense_date).getFullYear()}-${expenseNumberResult.rows[0].next_number.toString().padStart(3, '0')}`;
    
    const result = await pool.query(
      `INSERT INTO expenses (
        expense_number, category, subcategory, description, amount, expense_date,
        vendor_name, vendor_contact, payment_method, reference_number, notes, submitted_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        expenseNumber, category, subcategory, description, amount, expense_date,
        vendor_name, vendor_contact, payment_method, reference_number, notes, req.user.id
      ]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/finance/expenses/:id/approve', authenticateToken, authorizeRoles('finance_manager', 'system_admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const result = await pool.query(
      `UPDATE expenses 
       SET status = $1, approved_by = $2, approved_at = NOW(), updated_at = NOW() 
       WHERE id = $3 RETURNING *`,
      [status, req.user.id, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =====================================================