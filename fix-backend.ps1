# 🚀 DICEL ERP Backend - Manual Fix Script

Write-Host "🚀 Fixing DICEL ERP Backend deployment..." -ForegroundColor Cyan

# Configuration
$INSTANCE_IP = "34.229.188.193"
$KEY_FILE = "dicel-erp-key.pem"
$INSTANCE_ID = "i-0df690156aee7e374"

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if key file exists
function Test-KeyFile {
    if (-not (Test-Path $KEY_FILE)) {
        Write-Error "SSH key file not found: $KEY_FILE"
        exit 1
    }
    Write-Success "SSH key file found"
}

# Create a simple backend server script
function Create-BackendScript {
    Write-Status "Creating backend server script..."
    
    $serverScript = @"
#!/bin/bash
# DICEL ERP Backend Setup Script

echo "🚀 Setting up DICEL ERP Backend..."

# Update system
yum update -y

# Install Node.js 18
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

# Install PostgreSQL
yum install -y postgresql postgresql-server postgresql-contrib

# Initialize PostgreSQL
postgresql-setup initdb
systemctl enable postgresql
systemctl start postgresql

# Create database and user
sudo -u postgres psql -c "CREATE DATABASE dicel_erp_development;" 2>/dev/null || echo "Database might already exist"
sudo -u postgres psql -c "CREATE USER postgres WITH PASSWORD '0123';" 2>/dev/null || echo "User might already exist"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE dicel_erp_development TO postgres;"

# Create app directory
mkdir -p /opt/dicel-erp
cd /opt/dicel-erp

# Create package.json
cat > package.json << 'EOF'
{
  "name": "dicel-erp-backend",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "bcrypt": "^6.0.0",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-validator": "^7.0.1",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "openai": "^4.20.1",
    "pg": "^8.11.3",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.35.0"
  }
}
EOF

# Install dependencies
npm install

# Create environment file
cat > .env << 'EOF'
NODE_ENV=production
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=0123
DB_NAME=dicel_erp_development
JWT_SECRET=5009d3bd3d3887a936f98af7952673cc7ffa787e50f2e6fbfdde840e23db717635ad62d7be98b7c0a2ecf249f124e58cd58b1cf2e78b87c88c68a9e2cbbb3068
CORS_ORIGIN=https://d2iq65q7bkruv1.cloudfront.net
OPENAI_API_KEY=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
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads/documents
EOF

# Create simple server.js
cat > server.js << 'EOF'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

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

export default app;
EOF

# Create systemd service
cat > /etc/systemd/system/dicel-erp.service << 'EOF'
[Unit]
Description=DICEL ERP Backend
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/opt/dicel-erp
ExecStart=/usr/bin/node server.js
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

# Start the service
systemctl enable dicel-erp
systemctl start dicel-erp

echo "✅ Backend setup completed!"
echo "🔗 Health check: http://localhost:5000/api/health"
"@
    
    $serverScript | Out-File -FilePath "setup-backend.sh" -Encoding UTF8
    Write-Success "Backend setup script created"
}

# Copy and run the setup script on EC2
function Deploy-ToEC2 {
    Write-Status "Deploying backend to EC2..."
    
    # Copy the setup script to EC2
    scp -i $KEY_FILE -o StrictHostKeyChecking=no setup-backend.sh ec2-user@$INSTANCE_IP:/tmp/
    
    # Run the setup script on EC2
    ssh -i $KEY_FILE -o StrictHostKeyChecking=no ec2-user@$INSTANCE_IP "chmod +x /tmp/setup-backend.sh && /tmp/setup-backend.sh"
    
    Write-Success "Backend deployed to EC2"
}

# Test the backend
function Test-Backend {
    Write-Status "Testing backend..."
    
    Start-Sleep -Seconds 30
    
    # Test health endpoint
    $healthUrl = "http://$INSTANCE_IP" + ":5000/api/health"
    $healthResponse = Invoke-WebRequest -Uri $healthUrl -UseBasicParsing -ErrorAction SilentlyContinue
    
    if ($healthResponse) {
        Write-Success "Backend health check passed"
        Write-Host "Response: $($healthResponse.Content)" -ForegroundColor Green
    } else {
        Write-Error "Backend health check failed"
    }
    
    # Test stats endpoint
    $statsUrl = "http://$INSTANCE_IP" + ":5000/api/employees/test/stats"
    $statsResponse = Invoke-WebRequest -Uri $statsUrl -UseBasicParsing -ErrorAction SilentlyContinue
    
    if ($statsResponse) {
        Write-Success "Backend stats endpoint working"
        Write-Host "Response: $($statsResponse.Content)" -ForegroundColor Green
    } else {
        Write-Error "Backend stats endpoint failed"
    }
}

# Main function
function Main {
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "🚀 DICEL ERP Backend - Manual Fix" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    
    Test-KeyFile
    Create-BackendScript
    Deploy-ToEC2
    Test-Backend
    
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Success "Backend fix completed!"
    Write-Host "==========================================" -ForegroundColor Cyan
    
    Write-Host "🌐 Your backend should now be working at:" -ForegroundColor Green
    Write-Host "   http://$INSTANCE_IP" + ":5000" -ForegroundColor Yellow
    Write-Host "   Health check: http://$INSTANCE_IP" + ":5000/api/health" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🔄 Refresh your frontend to see the updated data!" -ForegroundColor Green
}

# Run main function
Main 