# 🚀 DICEL ERP Backend - GitHub to AWS Deployment Script

param(
    [string]$EnvironmentName = "dicel-erp-backend",
    [string]$Region = "us-east-1",
    [string]$ApplicationName = "dicel-erp",
    [string]$GitHubRepo = "shyakx/ERP-SYSTEM",
    [string]$GitHubBranch = "main"
)

# Stop on any error
$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting DICEL ERP Backend deployment from GitHub to AWS..." -ForegroundColor Cyan

# Configuration
$ENV_NAME = $EnvironmentName
$REGION = $Region
$APP_NAME = $ApplicationName
$GITHUB_REPO = $GitHubRepo
$GITHUB_BRANCH = $GitHubBranch

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

# Create Elastic Beanstalk application with GitHub source
function Create-EbAppWithGitHub {
    Write-Status "Creating Elastic Beanstalk application with GitHub source..."
    
    # Create application if it doesn't exist
    try {
        aws elasticbeanstalk describe-applications --application-names $APP_NAME --region $REGION 2>$null
        Write-Status "Elastic Beanstalk application exists"
    }
    catch {
        Write-Status "Creating Elastic Beanstalk application..."
        aws elasticbeanstalk create-application --application-name $APP_NAME --region $REGION
    }
    
    # Create environment with GitHub source
    Write-Status "Creating environment with GitHub source..."
    
    # Create environment configuration
    $envConfig = @{
        ApplicationName = $APP_NAME
        EnvironmentName = $ENV_NAME
        SolutionStackName = "64bit Amazon Linux 2023 v6.6.3 running Node.js 20"
        SourceConfiguration = @{
            ApplicationName = $APP_NAME
            TemplateName = "default"
        }
        OptionSettings = @(
            @{
                Namespace = "aws:elasticbeanstalk:application:environment"
                OptionName = "NODE_ENV"
                Value = "production"
            },
            @{
                Namespace = "aws:elasticbeanstalk:application:environment"
                OptionName = "PORT"
                Value = "8080"
            },
            @{
                Namespace = "aws:elasticbeanstalk:application:environment"
                OptionName = "DB_HOST"
                Value = "localhost"
            },
            @{
                Namespace = "aws:elasticbeanstalk:application:environment"
                OptionName = "DB_PORT"
                Value = "5434"
            },
            @{
                Namespace = "aws:elasticbeanstalk:application:environment"
                OptionName = "DB_USER"
                Value = "postgres"
            },
            @{
                Namespace = "aws:elasticbeanstalk:application:environment"
                OptionName = "DB_PASS"
                Value = "0123"
            },
            @{
                Namespace = "aws:elasticbeanstalk:application:environment"
                OptionName = "DB_NAME"
                Value = "dicel_erp_development"
            },
            @{
                Namespace = "aws:elasticbeanstalk:application:environment"
                OptionName = "JWT_SECRET"
                Value = "5009d3bd3d3887a936f98af7952673cc7ffa787e50f2e6fbfdde840e23db717635ad62d7be98b7c0a2ecf249f124e58cd58b1cf2e78b87c88c68a9e2cbbb3068"
            },
            @{
                Namespace = "aws:elasticbeanstalk:application:environment"
                OptionName = "CORS_ORIGIN"
                Value = "https://d2iq65q7bkruv1.cloudfront.net"
            },
            @{
                Namespace = "aws:elasticbeanstalk:container:nodejs"
                OptionName = "NodeCommand"
                Value = "cd backend && npm start"
            }
        )
    }
    
    # Convert to JSON and create environment
    $envConfigJson = $envConfig | ConvertTo-Json -Depth 10
    $envConfigJson | Out-File -FilePath "env-config.json" -Encoding UTF8
    
    Write-Status "Creating environment with configuration..."
    aws elasticbeanstalk create-environment --cli-input-json file://env-config.json --region $REGION
    
    # Clean up config file
    Remove-Item "env-config.json" -Force -ErrorAction SilentlyContinue
    
    Write-Success "Environment created with GitHub source"
}

# Setup GitHub integration
function Setup-GitHubIntegration {
    Write-Status "Setting up GitHub integration..."
    
    Write-Host "To connect your GitHub repository to AWS:" -ForegroundColor Yellow
    Write-Host "1. Go to AWS CodePipeline: https://console.aws.amazon.com/codepipeline/" -ForegroundColor Cyan
    Write-Host "2. Create a new pipeline:" -ForegroundColor Cyan
    Write-Host "   - Source: GitHub (version 2)" -ForegroundColor Cyan
    Write-Host "   - Repository: $GITHUB_REPO" -ForegroundColor Cyan
    Write-Host "   - Branch: $GITHUB_BRANCH" -ForegroundColor Cyan
    Write-Host "3. Build: AWS CodeBuild" -ForegroundColor Cyan
    Write-Host "4. Deploy: AWS Elastic Beanstalk" -ForegroundColor Cyan
    Write-Host "   - Application: $APP_NAME" -ForegroundColor Cyan
    Write-Host "   - Environment: $ENV_NAME" -ForegroundColor Cyan
    
    Write-Success "GitHub integration instructions provided"
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
    Write-Host "🚀 DICEL ERP Backend - GitHub to AWS" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    
    # Pre-flight checks
    Test-AwsCli
    Test-AwsCredentials
    
    # Create environment with GitHub source
    Create-EbAppWithGitHub
    
    # Setup GitHub integration
    Setup-GitHubIntegration
    
    # Get backend URL
    $backendUrl = Get-EnvironmentUrl
    
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Success "GitHub integration setup completed!"
    Write-Host "==========================================" -ForegroundColor Cyan
    
    if ($backendUrl) {
        Write-Host "🌐 Your backend is now live at:" -ForegroundColor Green
        Write-Host "   http://$backendUrl" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📊 Monitor your deployment:" -ForegroundColor Green
        Write-Host "   https://console.aws.amazon.com/elasticbeanstalk/home" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "🔄 Next steps:" -ForegroundColor Green
        Write-Host "   1. Set up CodePipeline for automatic deployments" -ForegroundColor Yellow
        Write-Host "   2. Push changes to GitHub to trigger deployment" -ForegroundColor Yellow
        Write-Host "   3. Monitor deployment status in AWS Console" -ForegroundColor Yellow
    }
}

# Run main function
Main 