# 🚀 DICEL ERP Backend - Simple AWS Deployment Script

param(
    [string]$EnvironmentName = "dicel-erp-backend",
    [string]$Region = "us-east-1",
    [string]$ApplicationName = "dicel-erp"
)

# Stop on any error
$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting DICEL ERP Backend deployment to AWS..." -ForegroundColor Cyan

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

# Create deployment package
function Create-DeploymentPackage {
    Write-Status "Creating deployment package..."
    
    # Create a temporary directory for deployment
    $deployDir = "deploy-temp"
    if (Test-Path $deployDir) {
        Remove-Item $deployDir -Recurse -Force
    }
    New-Item -ItemType Directory -Path $deployDir
    
    # Copy backend files
    Copy-Item "backend\*" $deployDir -Recurse -Force
    
    # Remove node_modules from deployment (will be installed on server)
    if (Test-Path "$deployDir\node_modules") {
        Remove-Item "$deployDir\node_modules" -Recurse -Force
    }
    
    # Create deployment zip
    $zipFile = "backend-deployment.zip"
    if (Test-Path $zipFile) {
        Remove-Item $zipFile -Force
    }
    
    # Use PowerShell to create zip
    Compress-Archive -Path "$deployDir\*" -DestinationPath $zipFile
    
    # Clean up temp directory
    Remove-Item $deployDir -Recurse -Force
    
    Write-Success "Deployment package created: $zipFile"
    return $zipFile
}

# Deploy using AWS CLI
function Deploy-ToAWS {
    param([string]$ZipFile)
    
    Write-Status "Deploying to AWS..."
    
    # Check if S3 bucket exists, create if not
    $bucketName = "dicel-erp-backend-deployments"
    try {
        aws s3 ls "s3://$bucketName" 2>$null
        Write-Status "S3 bucket exists"
    }
    catch {
        Write-Status "Creating S3 bucket for deployments..."
        aws s3 mb "s3://$bucketName" --region $REGION
    }
    
    # Upload deployment package
    Write-Status "Uploading deployment package..."
    aws s3 cp $ZipFile "s3://$bucketName/$ZipFile"
    
    # Create Elastic Beanstalk application if it doesn't exist
    try {
        aws elasticbeanstalk describe-applications --application-names $APP_NAME --region $REGION 2>$null
        Write-Status "Elastic Beanstalk application exists"
    }
    catch {
        Write-Status "Creating Elastic Beanstalk application..."
        aws elasticbeanstalk create-application --application-name $APP_NAME --region $REGION
    }
    
    # Create application version
    $versionLabel = "v$(Get-Date -Format 'yyyyMMdd-HHmmss')"
    Write-Status "Creating application version: $versionLabel"
    
    aws elasticbeanstalk create-application-version `
        --application-name $APP_NAME `
        --version-label $versionLabel `
        --source-bundle S3Bucket="$bucketName",S3Key="$ZipFile" `
        --region $REGION
    
    # Create environment if it doesn't exist
    try {
        aws elasticbeanstalk describe-environments --environment-names $ENV_NAME --region $REGION 2>$null
        Write-Status "Environment exists, updating..."
        aws elasticbeanstalk update-environment `
            --environment-name $ENV_NAME `
            --version-label $versionLabel `
            --region $REGION
    }
    catch {
        Write-Status "Creating new environment..."
        aws elasticbeanstalk create-environment `
            --application-name $APP_NAME `
            --environment-name $ENV_NAME `
            --solution-stack-name "64bit Amazon Linux 2 v5.8.0 running Node.js 18" `
            --option-settings "Namespace=aws:autoscaling:launchconfiguration,OptionName=IamInstanceProfile,Value=aws-elasticbeanstalk-ec2-role" `
            --region $REGION
    }
    
    Write-Success "Deployment initiated"
}

# Get environment URL
function Get-EnvironmentUrl {
    Write-Status "Getting environment URL..."
    
    # Wait for environment to be ready
    Write-Status "Waiting for environment to be ready..."
    do {
        Start-Sleep -Seconds 30
        $status = aws elasticbeanstalk describe-environments --environment-names $ENV_NAME --region $REGION --query 'Environments[0].Status' --output text
        Write-Status "Environment status: $status"
    } while ($status -eq "Launching")
    
    if ($status -eq "Ready") {
        $url = aws elasticbeanstalk describe-environments --environment-names $ENV_NAME --region $REGION --query 'Environments[0].CNAME' --output text
        Write-Success "Backend URL: http://$url"
        return $url
    }
    else {
        Write-Error "Environment failed to launch. Status: $status"
        return $null
    }
}

# Main deployment function
function Main {
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "🚀 DICEL ERP Backend - AWS Deployment" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    
    # Pre-flight checks
    Test-AwsCli
    Test-AwsCredentials
    
    # Deploy backend
    Install-Dependencies
    $zipFile = Create-DeploymentPackage
    Deploy-ToAWS $zipFile
    
    # Get backend URL
    $backendUrl = Get-EnvironmentUrl
    
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
    
    # Clean up
    if (Test-Path $zipFile) {
        Remove-Item $zipFile -Force
    }
}

# Run main function
Main 