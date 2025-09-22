const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import database connection
const { sequelize, testConnection } = require('./config/database');

// Import models
const User = require('./models/User');
const Employee = require('./models/Employee');
const Department = require('./models/Department');

// Import chat models
const Conversation = require('./models/Conversation');
const Message = require('./models/Message');
const ConversationMember = require('./models/ConversationMember');
const MessageReaction = require('./models/MessageReaction');
const TypingIndicator = require('./models/TypingIndicator');

// Import and define associations
const { defineAssociations } = require('./models/associations');
defineAssociations();

// Import routes
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const auditRoutes = require('./routes/audit');
const hrRoutes = require('./routes/hr');
const financeRoutes = require('./routes/finance');
const operationsRoutes = require('./routes/operations');
const salesRoutes = require('./routes/sales');
const itRoutes = require('./routes/it');
const securityRoutes = require('./routes/security');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'dicel-erp-secret-key-2024';

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const dbStatus = await testConnection();
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: dbStatus ? 'connected' : 'disconnected',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Access token required' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};

// Role-based access control middleware
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Insufficient permissions' 
      });
    }

    next();
  };
};

// API Routes

// Auth routes
app.use('/api/auth', authRoutes);

// Chat routes
app.use('/api/chat', chatRoutes);

// Audit routes
app.use('/api/audit', auditRoutes);

// Department routes
app.use('/api/v1/hr', hrRoutes);
app.use('/api/v1/finance', financeRoutes);
app.use('/api/v1/operations', operationsRoutes);
app.use('/api/v1/sales', salesRoutes);
app.use('/api/v1/it', itRoutes);
app.use('/api/v1/security', securityRoutes);

// Users routes
app.get('/api/v1/users', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 50, search, role, department } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = { is_active: true };
    
    if (search) {
      whereClause = {
        ...whereClause,
        [sequelize.Op.or]: [
          { first_name: { [sequelize.Op.iLike]: `%${search}%` } },
          { last_name: { [sequelize.Op.iLike]: `%${search}%` } },
          { email: { [sequelize.Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (role) {
      whereClause.role = role;
    }

    if (department) {
      whereClause.department_id = department;
    }

    const { count, rows: users } = await User.findAndCountAll({
      where: whereClause,
      attributes: [
        'id', 
        'email', 
        'first_name', 
        'last_name', 
        'role', 
        'department_id', 
        'position',
        'phone',
        'profile_image',
        'is_active',
        'created_at'
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['first_name', 'ASC']]
    });

    // Transform the data to camelCase for frontend
    const transformedUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      department_id: user.department_id,
      position: user.position,
      phone: user.phone,
      avatar_url: user.profile_image,
      isActive: user.is_active,
      createdAt: user.created_at
    }));

    res.json({
      success: true,
      data: transformedUsers,
      meta: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Authentication routes
app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Update last login
    await user.update({ last_login: new Date() });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          department: user.department_id,
          phone: user.phone,
          isActive: user.is_active
        }
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.post('/api/v1/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role, department } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create user (password will be automatically hashed by the model hook)
    const user = await User.create({
      email,
      password_hash: password, // This will be hashed automatically
      first_name: firstName,
      last_name: lastName,
      role: role || 'employee',
      is_active: true
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role,
          department: user.department_id
        }
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Employee routes
app.get('/api/v1/employees', authenticateToken, requireRole(['admin', 'hr']), async (req, res) => {
  try {
    const { page = 1, limit = 10, search, department } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (search) {
      whereClause = {
        [sequelize.Op.or]: [
          { first_name: { [sequelize.Op.iLike]: `%${search}%` } },
          { last_name: { [sequelize.Op.iLike]: `%${search}%` } },
          { employee_number: { [sequelize.Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (department) {
      whereClause.department_id = department;
    }

    const { count, rows: employees } = await Employee.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['id', 'name']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'role']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: employees,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.get('/api/v1/employees/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id, {
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['id', 'name']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'role']
        }
      ]
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.json({
      success: true,
      data: employee
    });

  } catch (error) {
    console.error('Get employee error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.post('/api/v1/employees', authenticateToken, requireRole(['admin', 'hr']), async (req, res) => {
  try {
    const {
      employee_number,
      first_name,
      last_name,
      department_id,
      position,
      hire_date,
      salary,
      email,
      phone,
      address
    } = req.body;

    // Validate required fields
    if (!employee_number || !first_name || !last_name || !department_id || !position || !hire_date || !salary) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Check if employee number already exists
    const existingEmployee = await Employee.findOne({ where: { employee_number } });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'Employee number already exists'
      });
    }

    // Create employee
    const employee = await Employee.create({
      employee_number,
      first_name,
      last_name,
      department_id,
      position,
      hire_date,
      salary,
      email,
      phone,
      address,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee
    });

  } catch (error) {
    console.error('Create employee error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Department routes
app.get('/api/v1/departments', authenticateToken, async (req, res) => {
  try {
    const departments = await Department.findAll({
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: departments
    });

  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Dashboard statistics
app.get('/api/v1/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const employeeCount = await Employee.count();
    const departmentCount = await Department.count();
    const userCount = await User.count();

    res.json({
      success: true,
      data: {
        totalEmployees: employeeCount,
        totalDepartments: departmentCount,
        totalUsers: userCount,
        activeEmployees: await Employee.count({ where: { is_active: true } })
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
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
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('❌ Database connection failed. Server will not start.');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`🚀 DICEL ERP Server running on port ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error);
    process.exit(1);
  }
};

startServer(); 