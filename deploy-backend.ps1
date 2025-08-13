# 🚀 DICEL ERP Backend - AWS Elastic Beanstalk Deployment Script

param(
    [string]$EnvironmentName = "dicel-erp-backend",
    [string]$Region = "us-east-1",
    [string]$ApplicationName = "dicel-erp"
)

# Stop on any error
$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting DICEL ERP Backend deployment to AWS Elastic Beanstalk..." -ForegroundColor Cyan

# Configuration
$ENV_NAME = $EnvironmentName
$REGION = $Region
$APP_NAME = $ApplicationName

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

# Check if EB CLI is installed
function Test-EbCli {
    Write-Status "Checking Elastic Beanstalk CLI installation..."
    try {
        $null = eb --version
        Write-Success "EB CLI is installed"
    }
    catch {
        Write-Error "EB CLI is not installed. Please install it first:"
        Write-Status "pip install awsebcli"
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

# Install backend dependencies
function Install-Dependencies {
    Write-Status "Installing backend dependencies..."
    Set-Location "backend"
    npm install
    Set-Location ".."
    Write-Success "Dependencies installed"
}

# Initialize Elastic Beanstalk application
function Initialize-EbApp {
    Write-Status "Initializing Elastic Beanstalk application..."
    Set-Location "backend"
    
    # Check if .elasticbeanstalk directory exists
    if (-not (Test-Path ".elasticbeanstalk")) {
        Write-Status "Creating new EB application..."
        eb init $APP_NAME --region $REGION --platform "Node.js 18" --source codecommit/repository/dicel-erp-backend
    }
    
    Set-Location ".."
    Write-Success "EB application initialized"
}

# Create or update environment
function Deploy-Environment {
    Write-Status "Deploying to Elastic Beanstalk environment..."
    Set-Location "backend"
    
    # Check if environment exists
    $envExists = eb status $ENV_NAME 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Status "Environment exists, updating..."
        eb deploy $ENV_NAME
    }
    else {
        Write-Status "Creating new environment..."
        eb create $ENV_NAME --instance-type t3.micro --single-instance
    }
    
    Set-Location ".."
    Write-Success "Environment deployed"
}

# Get environment URL
function Get-EnvironmentUrl {
    Write-Status "Getting environment URL..."
    Set-Location "backend"
    $url = eb status $ENV_NAME --output json | ConvertFrom-Json
    $environmentUrl = $url.Environment.CNAME
    Set-Location ".."
    
    if ($environmentUrl) {
        Write-Success "Backend URL: http://$environmentUrl"
        return $environmentUrl
    }
    else {
        Write-Warning "Could not get environment URL"
        return $null
    }
}

# Update frontend API configuration
function Update-FrontendConfig {
    param([string]$BackendUrl)
    
    if ($BackendUrl) {
        Write-Status "Updating frontend API configuration..."
        
        # Update the API configuration file directly
        $apiFile = "src/services/api.js"
        $apiContent = Get-Content $apiFile -Raw
        
        # Replace the placeholder backend URL with the actual URL
        $apiContent = $apiContent -replace 'https://dicel-erp-backend\.elasticbeanstalk\.com/api', "https://$BackendUrl/api"
        
        $apiContent | Out-File -FilePath $apiFile -Encoding UTF8
        Write-Success "Frontend API configuration updated with backend URL: https://$BackendUrl/api"
    }
}

# Main deployment function
function Main {
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "🚀 DICEL ERP Backend - AWS Deployment" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    
    # Pre-flight checks
    Test-AwsCli
    Test-EbCli
    Test-AwsCredentials
    
    # Deploy backend
    Install-Dependencies
    Initialize-EbApp
    Deploy-Environment
    
    # Get backend URL
    $backendUrl = Get-EnvironmentUrl
    
    # Update frontend config
    Update-FrontendConfig $backendUrl
    
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Success "Backend deployment completed!"
    Write-Host "==========================================" -ForegroundColor Cyan
    
    if ($backendUrl) {
        Write-Host "🌐 Your backend is now live at:" -ForegroundColor Green
        Write-Host "   http://$backendUrl" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📊 Monitor your deployment:" -ForegroundColor Green
        Write-Host "   https://console.aws.amazon.com/elasticbeanstalk/home" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "🔄 To update your backend, run this script again." -ForegroundColor Green
    }
}

# Run main function
Main 