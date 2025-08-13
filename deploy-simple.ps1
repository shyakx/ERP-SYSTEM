# 🚀 DICEL ERP Backend - Simple EC2 Deployment

Write-Host "🚀 Starting DICEL ERP Backend deployment to EC2..." -ForegroundColor Cyan

# Configuration
$INSTANCE_NAME = "dicel-erp-backend"
$REGION = "us-east-1"
$INSTANCE_TYPE = "t3.micro"
$KEY_NAME = "dicel-erp-key"

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

# Check if AWS CLI is installed
function Test-AwsCli {
    Write-Status "Checking AWS CLI installation..."
    try {
        $null = aws --version
        Write-Success "AWS CLI is installed"
    }
    catch {
        Write-Error "AWS CLI is not installed. Please install it first."
        exit 1
    }
}

# Check AWS credentials
function Test-AwsCredentials {
    Write-Status "Checking AWS credentials..."
    try {
        $null = aws sts get-caller-identity
        Write-Success "AWS credentials are valid"
    }
    catch {
        Write-Error "AWS credentials not configured. Please run 'aws configure' first."
        exit 1
    }
}

# Create key pair
function Create-KeyPair {
    Write-Status "Creating key pair..."
    try {
        aws ec2 create-key-pair --key-name $KEY_NAME --query 'KeyMaterial' --output text > "$KEY_NAME.pem"
        Write-Success "Key pair created: $KEY_NAME.pem"
    }
    catch {
        Write-Warning "Key pair might already exist"
    }
}

# Create security group
function Create-SecurityGroup {
    Write-Status "Creating security group..."
    try {
        $groupId = aws ec2 create-security-group --group-name "dicel-erp-sg" --description "DICEL ERP Backend Security Group" --query 'GroupId' --output text
        
        # Allow SSH
        aws ec2 authorize-security-group-ingress --group-id $groupId --protocol tcp --port 22 --cidr 0.0.0.0/0
        
        # Allow HTTP
        aws ec2 authorize-security-group-ingress --group-id $groupId --protocol tcp --port 80 --cidr 0.0.0.0/0
        
        # Allow HTTPS
        aws ec2 authorize-security-group-ingress --group-id $groupId --protocol tcp --port 443 --cidr 0.0.0.0/0
        
        # Allow custom port
        aws ec2 authorize-security-group-ingress --group-id $groupId --protocol tcp --port 5000 --cidr 0.0.0.0/0
        
        Write-Success "Security group created: $groupId"
        return $groupId
    }
    catch {
        Write-Warning "Security group might already exist"
        $groupId = aws ec2 describe-security-groups --group-names "dicel-erp-sg" --query 'SecurityGroups[0].GroupId' --output text
        return $groupId
    }
}

# Create EC2 instance
function Create-EC2Instance {
    param([string]$SecurityGroupId)
    
    Write-Status "Creating EC2 instance..."
    
    # User data script to install and run the backend
    $userData = @"
#!/bin/bash
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
sudo -u postgres psql -c "CREATE DATABASE dicel_erp_development;"
sudo -u postgres psql -c "CREATE USER postgres WITH PASSWORD '0123';"
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

// Start server
app.listen(PORT, () => {
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

# Install nginx for reverse proxy
yum install -y nginx
systemctl enable nginx
systemctl start nginx

# Configure nginx
cat > /etc/nginx/conf.d/dicel-erp.conf << 'EOF'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Restart nginx
systemctl restart nginx
"@
    
    # Create instance
    $instanceId = aws ec2 run-instances `
        --image-id ami-0c02fb55956c7d316 `
        --count 1 `
        --instance-type $INSTANCE_TYPE `
        --key-name $KEY_NAME `
        --security-group-ids $SecurityGroupId `
        --user-data $userData `
        --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$INSTANCE_NAME}]" `
        --query 'Instances[0].InstanceId' `
        --output text
    
    Write-Success "EC2 instance created: $instanceId"
    return $instanceId
}

# Get instance public IP
function Get-InstanceIP {
    param([string]$InstanceId)
    
    Write-Status "Getting instance public IP..."
    
    # Wait for instance to be running
    aws ec2 wait instance-running --instance-ids $InstanceId
    
    $publicIp = aws ec2 describe-instances `
        --instance-ids $InstanceId `
        --query 'Reservations[0].Instances[0].PublicIpAddress' `
        --output text
    
    Write-Success "Instance public IP: $publicIp"
    return $publicIp
}

# Update frontend configuration
function Update-FrontendConfig {
    param([string]$InstanceIP)
    
    if ($InstanceIP) {
        Write-Status "Updating frontend API configuration..."
        
        # Update the API configuration file
        $apiFile = "src/services/api.js"
        $apiContent = Get-Content $apiFile -Raw
        
        # Replace the placeholder backend URL with the actual URL
        $apiContent = $apiContent -replace 'https://dicel-erp-backend\.elasticbeanstalk\.com/api', "http://$InstanceIP/api"
        
        $apiContent | Out-File -FilePath $apiFile -Encoding UTF8
        Write-Success "Frontend API configuration updated with backend URL: http://$InstanceIP/api"
    }
}

# Main deployment function
function Main {
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "🚀 DICEL ERP Backend - EC2 Deployment" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    
    # Pre-flight checks
    Test-AwsCli
    Test-AwsCredentials
    
    # Deploy backend
    Create-KeyPair
    $securityGroupId = Create-SecurityGroup
    $instanceId = Create-EC2Instance $securityGroupId
    
    # Wait for instance to be ready
    Write-Status "Waiting for instance to be ready..."
    Start-Sleep -Seconds 60
    
    # Get instance IP
    $instanceIP = Get-InstanceIP $instanceId
    
    # Update frontend config
    Update-FrontendConfig $instanceIP
    
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Success "Backend deployment completed!"
    Write-Host "==========================================" -ForegroundColor Cyan
    
    if ($instanceIP) {
        Write-Host "🌐 Your backend is now live at:" -ForegroundColor Green
        Write-Host "   http://$instanceIP" -ForegroundColor Yellow
        Write-Host "   Health check: http://$instanceIP/api/health" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📊 Monitor your deployment:" -ForegroundColor Green
        Write-Host "   https://console.aws.amazon.com/ec2/home" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "🔑 SSH Key: $KEY_NAME.pem" -ForegroundColor Green
        Write-Host "🔄 To update your backend, run this script again." -ForegroundColor Green
    }
}

# Run main function
Main 