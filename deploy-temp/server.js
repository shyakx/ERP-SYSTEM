import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'http';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import documentRoutes from './routes/documents.js';
import chatRoutes from './routes/chat.js';
import dashboardRoutes from './routes/dashboard.js';
import departmentRoutes from './routes/departments.js';
import projectRoutes from './routes/projects.js';
import assetRoutes from './routes/assets.js';
import employeeRoutes from './routes/employees.js';
import jobPostingRoutes from './routes/jobPostings.js';
import candidateRoutes from './routes/candidates.js';
import trainingRoutes from './routes/training.js';
import leaveRoutes from './routes/leave.js';
import attendanceRoutes from './routes/attendance.js';
import performanceRoutes from './routes/performance.js';
import payrollRoutes from './routes/payroll.js';
import benefitsRoutes from './routes/benefits.js';
import complianceRoutes from './routes/compliance.js';
import reportsRoutes from './routes/reports.js';
import settingsRoutes from './routes/settings.js';

// Finance Routes
import transactionRoutes from './routes/transactions.js';
import accountRoutes from './routes/accounts.js';
import vendorRoutes from './routes/vendors.js';
import customerRoutes from './routes/customers.js';
import invoiceRoutes from './routes/invoices.js';
import billRoutes from './routes/bills.js';
import taxRoutes from './routes/taxRecords.js';
import expenseRoutes from './routes/expenses.js';
import budgetRoutes from './routes/budgets.js';

// Inventory Routes
import inventoryItemRoutes from './routes/inventoryItems.js';

// Import seed data
import { seedHRData } from './seeders/hrSeedData.js';
import { seedInventoryData } from './seeders/inventorySeedData.js';

// Import database
import { sequelize } from './config/database.js';
import './models/associations.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',
    'https://d2iq65q7bkruv1.cloudfront.net',
    'http://dicel-erp-production.s3-website-us-east-1.amazonaws.com'
  ],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files for uploads
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/employees', employeeRoutes);

// HR Routes
app.use('/api/job-postings', jobPostingRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/benefits', benefitsRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/settings', settingsRoutes);

// Finance Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/tax-records', taxRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/budgets', budgetRoutes);

// Inventory Routes
app.use('/api/inventory-items', inventoryItemRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'DICEL ERP Backend is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: [
      '/api/auth',
      '/api/users',
      '/api/departments',
      '/api/projects',
      '/api/assets',
      '/api/documents',
      '/api/chat',
      '/api/dashboard',
      '/api/employees',
      '/api/job-postings',
      '/api/candidates',
      '/api/training',
      '/api/leave',
      '/api/attendance',
      '/api/performance',
      '/api/payroll',
      '/api/benefits',
      '/api/compliance',
      '/api/reports',
      '/api/settings',
      // Finance endpoints
      '/api/transactions',
      '/api/accounts',
      '/api/vendors',
      '/api/customers',
      '/api/expenses',
      '/api/budgets',
      // Inventory endpoints
      '/api/inventory-items'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Database connection and server start
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    
    // Use alter: true instead of force: true to preserve data
    await sequelize.sync({ alter: true });
    console.log('✅ Database models synchronized.');
    
    // Seed HR data only if tables are empty
    try {
      await seedHRData();
      console.log('✅ HR data seeded successfully.');
    } catch (seedError) {
      console.warn('⚠️ Seed data already exists or seeding failed:', seedError.message);
    }

    // Seed Inventory data only if tables are empty
    try {
      await seedInventoryData();
      console.log('✅ Inventory data seeded successfully.');
    } catch (seedError) {
      console.warn('⚠️ Seed data already exists or seeding failed:', seedError.message);
    }
    
    const server = createServer(app);
    server.listen(PORT, () => {
      console.log(`🚀 DICEL ERP Backend running on port ${PORT}`);
      console.log(`📱 CORS enabled for: ${process.env.CORS_ORIGIN}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
      console.log(`📊 Available endpoints:`);
      console.log(`   - Authentication: /api/auth`);
      console.log(`   - Users: /api/users`);
      console.log(`   - Departments: /api/departments`);
      console.log(`   - Projects: /api/projects`);
      console.log(`   - Assets: /api/assets`);
      console.log(`   - Documents: /api/documents`);
      console.log(`   - Chat: /api/chat`);
      console.log(`   - Dashboard: /api/dashboard`);
      console.log(`   - Employees: /api/employees`);
      console.log(`   - Job Postings: /api/job-postings`);
      console.log(`   - Candidates: /api/candidates`);
      console.log(`   - Training: /api/training`);
      console.log(`   - Leave: /api/leave`);
      console.log(`   - Attendance: /api/attendance`);
      console.log(`   - Performance: /api/performance`);
      console.log(`   - Payroll: /api/payroll`);
      console.log(`   - Benefits: /api/benefits`);
      console.log(`   - Compliance: /api/compliance`);
      console.log(`   - Reports: /api/reports`);
      console.log(`   - Settings: /api/settings`);
      // Finance endpoints
      console.log(`   - Transactions: /api/transactions`);
      console.log(`   - Accounts: /api/accounts`);
      console.log(`   - Vendors: /api/vendors`);
      console.log(`   - Customers: /api/customers`);
      console.log(`   - Expenses: /api/expenses`);
      console.log(`   - Budgets: /api/budgets`);
      // Inventory endpoints
      console.log(`   - Inventory Items: /api/inventory-items`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
}

startServer();

// Export for AWS Lambda
export const handler = async (event, context) => {
  // For Lambda, we need to handle the event differently
  if (event.httpMethod) {
    // API Gateway event
    const { method, path, headers, body, queryStringParameters } = event;
    
    // Create a mock request object
    const req = {
      method: method,
      url: path,
      headers: headers || {},
      body: body ? JSON.parse(body) : {},
      query: queryStringParameters || {}
    };
    
    // Create a mock response object
    const res = {
      statusCode: 200,
      headers: {},
      body: '',
      setHeader: (name, value) => {
        res.headers[name] = value;
      },
      json: (data) => {
        res.body = JSON.stringify(data);
        res.headers['Content-Type'] = 'application/json';
      },
      send: (data) => {
        res.body = typeof data === 'string' ? data : JSON.stringify(data);
      }
    };
    
    // Handle the request
    try {
      // Route the request to the appropriate handler
      if (path.startsWith('/api/health')) {
        res.json({ 
          status: 'OK', 
          message: 'DICEL ERP Backend is running',
          version: '1.0.0',
          timestamp: new Date().toISOString()
        });
      } else {
        res.statusCode = 404;
        res.json({ success: false, message: 'Route not found' });
      }
    } catch (error) {
      res.statusCode = 500;
      res.json({ success: false, message: 'Internal Server Error' });
    }
    
    return res;
  }
  
  // For non-API Gateway events, start the server normally
  if (!app.listening) {
    await startServer();
  }
  
  return { statusCode: 200, body: 'Server started' };
};