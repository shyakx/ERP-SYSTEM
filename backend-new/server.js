const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'DICEL ERP Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Authentication routes
app.post('/api/auth/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { username, password } = req.body;
  
  // Simple mock authentication - accept any credentials
  const token = jwt.sign(
    { id: 1, username: username, role: 'admin' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        id: 1,
        username: username,
        email: `${username}@dicel.com`,
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User'
      }
    }
  });
});

app.post('/api/auth/register', [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('role').notEmpty().withMessage('Role is required')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { username, email, firstName, lastName, role } = req.body;
  
  // Simple mock registration - accept any valid data
  const token = jwt.sign(
    { id: 2, username: username, role: role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      token,
      user: {
        id: 2,
        username: username,
        email: email,
        role: role,
        firstName: firstName,
        lastName: lastName
      }
    }
  });
});

// Employee routes
app.get('/api/employees/test', authenticateToken, (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query;
  const offset = (page - 1) * limit;

  res.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: parseInt(page),
      limit: parseInt(limit)
    }
  });
});

app.get('/api/employees/test/stats', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      total: 0,
      active: 0,
      new: 0,
      turnover: 0
    }
  });
});

// Job Postings routes
app.get('/api/job-postings/test', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      limit: 10
    }
  });
});

app.get('/api/job-postings/test/stats', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      total: 0,
      active: 0,
      applications: 0,
      filled: 0
    }
  });
});

// Candidates routes
app.get('/api/candidates/test', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      limit: 10
    }
  });
});

app.get('/api/candidates/test/stats', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      total: 0,
      shortlisted: 0,
      interviewed: 0,
      hired: 0
    }
  });
});

// Training routes
app.get('/api/training/courses/test', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      limit: 10
    }
  });
});

app.get('/api/training/test/stats', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      courses: 0,
      enrollments: 0,
      completed: 0,
      ongoing: 0
    }
  });
});

// Leave routes
app.get('/api/leave/requests/test', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      limit: 10
    }
  });
});

app.get('/api/leave/test/stats', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      requests: 0,
      approved: 0,
      pending: 0,
      rejected: 0
    }
  });
});

// Attendance routes
app.get('/api/attendance/test', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      limit: 10
    }
  });
});

app.get('/api/attendance/test/stats', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      present: 0,
      absent: 0,
      late: 0,
      overtime: 0
    }
  });
});

// Performance routes
app.get('/api/performance/test', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      limit: 10
    }
  });
});

app.get('/api/performance/test/stats', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      reviews: 0,
      average: 0,
      excellent: 0,
      good: 0
    }
  });
});

// Payroll routes
app.get('/api/payroll/test', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      limit: 10
    }
  });
});

app.get('/api/payroll/test/stats', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      total: 0,
      paid: 0,
      pending: 0,
      amount: 0
    }
  });
});

// Benefits routes
app.get('/api/benefits/test/stats', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      total: 0,
      active: 0,
      pending: 0,
      expired: 0
    }
  });
});

// Compliance routes
app.get('/api/compliance/test/stats', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      total: 0,
      compliant: 0,
      pending: 0,
      violations: 0
    }
  });
});

// Reports routes
app.get('/api/reports/test/stats', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      total: 0,
      generated: 0,
      pending: 0,
      archived: 0
    }
  });
});

// Settings routes
app.get('/api/settings/test/stats', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      total: 0,
      active: 0,
      inactive: 0,
      pending: 0
    }
  });
});

// Chat/Messaging routes
app.get('/api/chat/conversations', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      limit: 20
    }
  });
});

app.get('/api/chat/stats', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      totalConversations: 0,
      totalMessages: 0,
      unreadMessages: 0,
      activeUsers: 0,
      totalChannels: 0,
      totalContacts: 0
    }
  });
});

// Finance routes
app.get('/api/transactions/test', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      limit: 10
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 DICEL ERP Backend server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Login endpoint: http://localhost:${PORT}/api/auth/login`);
});

module.exports = app; 