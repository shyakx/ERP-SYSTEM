import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',
    'https://d2iq65q7bkruv1.cloudfront.net',
    'http://dicel-erp-production.s3-website-us-east-1.amazonaws.com',
    'https://d2iq65q7bkruv1.cloudfront.net'
  ],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'DICEL ERP Backend is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is working!',
    data: {
      employees: 5,
      departments: 8,
      projects: 12
    }
  });
});

// Mock data endpoints for testing
app.get('/api/employees/test/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      total: 5,
      active: 5,
      new: 2,
      turnover: 0
    }
  });
});

app.get('/api/employees/test', (req, res) => {
  res.json({
    success: true,
    items: [
      {
        id: '1',
        employeeId: 'EMP001',
        firstName: 'Jean Pierre',
        lastName: 'Uwimana',
        position: 'Software Developer',
        department: 'IT',
        location: 'Kigali',
        status: 'Active'
      },
      {
        id: '2',
        employeeId: 'EMP002',
        firstName: 'Marie Claire',
        lastName: 'Niyonsaba',
        position: 'HR Manager',
        department: 'HR',
        location: 'Kigali',
        status: 'Active'
      }
    ],
    total: 2,
    page: 1,
    limit: 10
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'DICEL ERP Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      test: '/api/test',
      employees: '/api/employees/test'
    }
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 DICEL ERP Backend running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});

export default app; 