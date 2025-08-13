# 🚀 DICEL ERP Backend - AWS App Runner Deployment Script

Write-Host "🚀 Starting DICEL ERP Backend deployment to AWS App Runner..." -ForegroundColor Cyan

# Configuration
$SERVICE_NAME = "dicel-erp-backend"
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

# Create ECR repository
function Create-EcrRepository {
    Write-Status "Creating ECR repository..."
    try {
        aws ecr create-repository --repository-name $SERVICE_NAME --region $REGION
        Write-Success "ECR repository created"
    }
    catch {
        Write-Warning "ECR repository might already exist"
    }
}

# Get ECR login token
function Get-EcrLoginToken {
    Write-Status "Getting ECR login token..."
    $loginToken = aws ecr get-login-password --region $REGION
    $accountId = aws sts get-caller-identity --query Account --output text
    
    Write-Success "ECR login token obtained"
    return $loginToken, $accountId
}

# Build and push Docker image
function Build-And-Push-Image {
    param([string]$LoginToken, [string]$AccountId)
    
    Write-Status "Building Docker image..."
    
    # Navigate to backend directory
    Set-Location "backend"
    
    # Build image
    docker build -t $SERVICE_NAME .
    
    # Tag image
    $imageUri = "$AccountId.dkr.ecr.$REGION.amazonaws.com/$SERVICE_NAME"
    docker tag $SERVICE_NAME`:latest $imageUri`:latest
    
    # Login to ECR
    echo $LoginToken | docker login --username AWS --password-stdin $AccountId.dkr.ecr.$REGION.amazonaws.com
    
    # Push image
    docker push $imageUri`:latest
    
    Set-Location ".."
    
    Write-Success "Docker image pushed to ECR"
    return $imageUri
}

# Create App Runner service
function Create-AppRunnerService {
    param([string]$ImageUri)
    
    Write-Status "Creating App Runner service..."
    
    # Create service configuration
    $config = @"
{
    "ServiceName": "$SERVICE_NAME",
    "SourceConfiguration": {
        "ImageRepository": {
            "ImageIdentifier": "$ImageUri",
            "ImageConfiguration": {
                "Port": "8080",
                "RuntimeEnvironmentVariables": {
                    "NODE_ENV": "production",
                    "PORT": "8080",
                    "DB_HOST": "localhost",
                    "DB_PORT": "5434",
                    "DB_USER": "postgres",
                    "DB_PASS": "0123",
                    "DB_NAME": "dicel_erp_development",
                    "JWT_SECRET": "5009d3bd3d3887a936f98af7952673cc7ffa787e50f2e6fbfdde840e23db717635ad62d7be98b7c0a2ecf249f124e58cd58b1cf2e78b87c88c68a9e2cbbb3068",
                    "CORS_ORIGIN": "https://d2iq65q7bkruv1.cloudfront.net",
                    "OPENAI_API_KEY": "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",
                    "MAX_FILE_SIZE": "10485760",
                    "UPLOAD_PATH": "./uploads/documents"
                }
            },
            "ImageRepositoryType": "ECR"
        }
    },
    "InstanceConfiguration": {
        "Cpu": "1024",
        "Memory": "2048"
    }
}
"@
    
    $config | Out-File -FilePath "apprunner-config.json" -Encoding UTF8
    
    # Create service
    aws apprunner create-service --cli-input-json file://apprunner-config.json --region $REGION
    
    # Clean up
    Remove-Item "apprunner-config.json" -ErrorAction SilentlyContinue
    
    Write-Success "App Runner service created"
}

# Get service URL
function Get-ServiceUrl {
    Write-Status "Getting service URL..."
    
    $service = aws apprunner describe-service --service-name $SERVICE_NAME --region $REGION --query 'Service.ServiceUrl' --output text
    
    if ($service) {
        Write-Success "Service URL: https://$service"
        return $service
    }
    else {
        Write-Warning "Could not get service URL"
        return $null
    }
}

# Update frontend configuration
function Update-FrontendConfig {
    param([string]$ServiceUrl)
    
    if ($ServiceUrl) {
        Write-Status "Updating frontend API configuration..."
        
        # Update the API configuration file
        $apiFile = "src/services/api.js"
        $apiContent = Get-Content $apiFile -Raw
        
        # Replace the placeholder backend URL with the actual URL
        $apiContent = $apiContent -replace 'https://dicel-erp-backend\.elasticbeanstalk\.com/api', "https://$ServiceUrl/api"
        
        $apiContent | Out-File -FilePath $apiFile -Encoding UTF8
        Write-Success "Frontend API configuration updated with backend URL: https://$ServiceUrl/api"
    }
}

# Main deployment function
function Main {
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "🚀 DICEL ERP Backend - AWS App Runner Deployment" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    
    # Pre-flight checks
    Test-AwsCli
    Test-AwsCredentials
    
    # Deploy backend
    Create-EcrRepository
    $loginToken, $accountId = Get-EcrLoginToken
    $imageUri = Build-And-Push-Image $loginToken $accountId
    Create-AppRunnerService $imageUri
    
    # Wait for service to be ready
    Write-Status "Waiting for service to be ready..."
    Start-Sleep -Seconds 30
    
    # Get service URL
    $serviceUrl = Get-ServiceUrl
    
    # Update frontend config
    Update-FrontendConfig $serviceUrl
    
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Success "Backend deployment completed!"
    Write-Host "==========================================" -ForegroundColor Cyan
    
    if ($serviceUrl) {
        Write-Host "🌐 Your backend is now live at:" -ForegroundColor Green
        Write-Host "   https://$serviceUrl" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📊 Monitor your deployment:" -ForegroundColor Green
        Write-Host "   https://console.aws.amazon.com/apprunner/home" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "🔄 To update your backend, run this script again." -ForegroundColor Green
    }
}

# Run main function
Main 