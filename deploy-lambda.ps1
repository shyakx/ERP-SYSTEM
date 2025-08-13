# 🚀 DICEL ERP Backend - Lambda Deployment

Write-Host "🚀 Deploying DICEL ERP Backend to AWS Lambda..." -ForegroundColor Cyan

# Configuration
$FUNCTION_NAME = "dicel-erp-backend"
$REGION = "us-east-1"

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

# Create Lambda function
function Create-LambdaFunction {
    Write-Status "Creating Lambda function..."
    
    # Create deployment package
    Write-Status "Creating deployment package..."
    
    # Create a simple Lambda handler
    $lambdaCode = @"
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(cors({
  origin: [
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

module.exports.handler = serverless(app);
"@
    
    $lambdaCode | Out-File -FilePath "lambda-handler.js" -Encoding UTF8
    
    # Create package.json for Lambda
    $packageJson = @"
{
  "name": "dicel-erp-lambda",
  "version": "1.0.0",
  "main": "lambda-handler.js",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "serverless-http": "^3.2.0"
  }
}
"@
    
    $packageJson | Out-File -FilePath "lambda-package.json" -Encoding UTF8
    
    # Install dependencies
    Write-Status "Installing dependencies..."
    npm install --prefix . --package-lock-only
    npm ci --prefix . --production
    
    # Create ZIP file
    Write-Status "Creating deployment package..."
    Compress-Archive -Path "lambda-handler.js", "node_modules", "lambda-package.json" -DestinationPath "lambda-deployment.zip" -Force
    
    # Create Lambda function
    try {
        aws lambda create-function `
            --function-name $FUNCTION_NAME `
            --runtime nodejs18.x `
            --role arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/lambda-execution-role `
            --handler lambda-handler.handler `
            --zip-file fileb://lambda-deployment.zip `
            --region $REGION
        
        Write-Success "Lambda function created"
    }
    catch {
        Write-Warning "Lambda function might already exist, updating..."
        aws lambda update-function-code `
            --function-name $FUNCTION_NAME `
            --zip-file fileb://lambda-deployment.zip `
            --region $REGION
        
        Write-Success "Lambda function updated"
    }
}

# Create API Gateway
function Create-APIGateway {
    Write-Status "Creating API Gateway..."
    
    # Create REST API
    $apiId = aws apigateway create-rest-api `
        --name "dicel-erp-api" `
        --description "DICEL ERP Backend API" `
        --region $REGION `
        --query 'id' `
        --output text
    
    Write-Success "API Gateway created: $apiId"
    
    # Get root resource ID
    $rootId = aws apigateway get-resources `
        --rest-api-id $apiId `
        --region $REGION `
        --query 'items[?path==`/`].id' `
        --output text
    
    # Create API resource
    $resourceId = aws apigateway create-resource `
        --rest-api-id $apiId `
        --parent-id $rootId `
        --path-part "{proxy+}" `
        --region $REGION `
        --query 'id' `
        --output text
    
    # Create ANY method
    aws apigateway put-method `
        --rest-api-id $apiId `
        --resource-id $resourceId `
        --http-method ANY `
        --authorization-type NONE `
        --region $REGION
    
    # Create integration
    $lambdaArn = aws lambda get-function `
        --function-name $FUNCTION_NAME `
        --region $REGION `
        --query 'Configuration.FunctionArn' `
        --output text
    
    aws apigateway put-integration `
        --rest-api-id $apiId `
        --resource-id $resourceId `
        --http-method ANY `
        --type AWS_PROXY `
        --integration-http-method POST `
        --uri "arn:aws:apigateway:$REGION`:lambda:path/2015-03-31/functions/$lambdaArn/invocations" `
        --region $REGION
    
    # Add Lambda permission
    aws lambda add-permission `
        --function-name $FUNCTION_NAME `
        --statement-id apigateway-access `
        --action lambda:InvokeFunction `
        --principal apigateway.amazonaws.com `
        --source-arn "arn:aws:execute-api:$REGION`:$(aws sts get-caller-identity --query Account --output text):$apiId/*/*" `
        --region $REGION
    
    # Deploy API
    aws apigateway create-deployment `
        --rest-api-id $apiId `
        --stage-name prod `
        --region $REGION
    
    Write-Success "API Gateway deployed"
    
    # Get API URL
    $apiUrl = "https://$apiId.execute-api.$REGION.amazonaws.com/prod"
    Write-Success "API URL: $apiUrl"
    
    return $apiUrl
}

# Update frontend configuration
function Update-FrontendConfig {
    param([string]$ApiUrl)
    
    if ($ApiUrl) {
        Write-Status "Updating frontend API configuration..."
        
        # Update the API configuration file
        $apiFile = "src/services/api.js"
        $apiContent = Get-Content $apiFile -Raw
        
        # Replace the backend URL with the Lambda API Gateway URL
        $apiContent = $apiContent -replace 'http://34\.229\.188\.193:5000/api', "$ApiUrl/api"
        
        $apiContent | Out-File -FilePath $apiFile -Encoding UTF8
        Write-Success "Frontend API configuration updated with Lambda URL: $ApiUrl/api"
    }
}

# Test the API
function Test-API {
    param([string]$ApiUrl)
    
    Write-Status "Testing API..."
    
    Start-Sleep -Seconds 10
    
    # Test health endpoint
    $healthUrl = "$ApiUrl/api/health"
    $healthResponse = Invoke-WebRequest -Uri $healthUrl -UseBasicParsing -ErrorAction SilentlyContinue
    
    if ($healthResponse) {
        Write-Success "API health check passed"
        Write-Host "Response: $($healthResponse.Content)" -ForegroundColor Green
    } else {
        Write-Error "API health check failed"
    }
    
    # Test stats endpoint
    $statsUrl = "$ApiUrl/api/employees/test/stats"
    $statsResponse = Invoke-WebRequest -Uri $statsUrl -UseBasicParsing -ErrorAction SilentlyContinue
    
    if ($statsResponse) {
        Write-Success "API stats endpoint working"
        Write-Host "Response: $($statsResponse.Content)" -ForegroundColor Green
    } else {
        Write-Error "API stats endpoint failed"
    }
}

# Main function
function Main {
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "🚀 DICEL ERP Backend - Lambda Deployment" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    
    # Pre-flight checks
    Test-AwsCli
    Test-AwsCredentials
    
    # Deploy backend
    Create-LambdaFunction
    $apiUrl = Create-APIGateway
    
    # Update frontend config
    Update-FrontendConfig $apiUrl
    
    # Test API
    Test-API $apiUrl
    
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Success "Lambda deployment completed!"
    Write-Host "==========================================" -ForegroundColor Cyan
    
    if ($apiUrl) {
        Write-Host "🌐 Your backend is now live at:" -ForegroundColor Green
        Write-Host "   $apiUrl" -ForegroundColor Yellow
        Write-Host "   Health check: $apiUrl/api/health" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📊 Monitor your deployment:" -ForegroundColor Green
        Write-Host "   https://console.aws.amazon.com/lambda/home" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "🔄 Refresh your frontend to see the updated data!" -ForegroundColor Green
    }
}

# Run main function
Main 