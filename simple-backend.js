const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'DICEL ERP Backend is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend is working!',
    data: []
  });
});

// Mock data endpoints for frontend
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

app.get('/api/job-postings/test/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      total: 2,
      active: 2,
      applications: 23,
      filled: 0
    }
  });
});

app.get('/api/candidates/test/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      total: 2,
      shortlisted: 1,
      interviewed: 1,
      hired: 0
    }
  });
});

app.get('/api/training/test/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      courses: 2,
      enrollments: 2,
      completed: 0,
      ongoing: 2
    }
  });
});

app.get('/api/leave/test/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      requests: 2,
      approved: 1,
      pending: 1,
      rejected: 0
    }
  });
});

app.get('/api/attendance/test/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      present: 2,
      absent: 0,
      late: 0,
      overtime: 1
    }
  });
});

app.get('/api/performance/test/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      reviews: 2,
      average: 4.75,
      excellent: 1,
      good: 1
    }
  });
});

app.get('/api/payroll/test/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      total: 2,
      paid: 2,
      pending: 0,
      amount: 5225000
    }
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 DICEL ERP Backend running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app; 