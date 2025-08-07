# 🚀 DICEL ERP - AWS Deployment Script (PowerShell)
# This script builds and deploys the DICEL ERP application to AWS S3 + CloudFront

param(
    [string]$BucketName = "dicel-erp-production",
    [string]$Region = "us-east-1",
    [string]$DistributionComment = "DICEL ERP Production"
)

# Stop on any error
$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting DICEL ERP deployment to AWS..." -ForegroundColor Cyan

# Configuration
$BUCKET_NAME = $BucketName
$REGION = $Region
$DISTRIBUTION_COMMENT = $DistributionComment

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
        Write-Status "Installation guide: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
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

# Build the application
function Build-App {
    Write-Status "Building DICEL ERP application..."
    
    # Install dependencies if needed
    if (-not (Test-Path "node_modules")) {
        Write-Status "Installing dependencies..."
        npm install
    }
    
    # Build for production
    npm run build
    
    if (-not (Test-Path "dist")) {
        Write-Error "Build failed - dist directory not found"
        exit 1
    }
    
    Write-Success "Application built successfully"
}

# Create S3 bucket if it doesn't exist
function New-S3Bucket {
    Write-Status "Checking S3 bucket: $BUCKET_NAME"
    
    try {
        $null = aws s3 ls "s3://$BUCKET_NAME" 2>$null
        Write-Success "S3 bucket already exists"
    }
    catch {
        Write-Status "Creating S3 bucket: $BUCKET_NAME"
        aws s3 mb "s3://$BUCKET_NAME" --region "$REGION"
        
        # Enable static website hosting
        aws s3 website "s3://$BUCKET_NAME" --index-document index.html --error-document index.html
        
        # Set bucket policy for public read access
        $policy = @"
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
"@
        
        aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy $policy
        
        Write-Success "S3 bucket created and configured"
    }
}

# Upload files to S3
function Upload-ToS3 {
    Write-Status "Uploading files to S3..."
    aws s3 sync dist/ "s3://$BUCKET_NAME" --delete
    
    # Count uploaded files
    $fileCount = (aws s3 ls "s3://$BUCKET_NAME" --recursive | Measure-Object -Line).Lines
    Write-Success "Uploaded $fileCount files to S3"
}

# Get or create CloudFront distribution
function Setup-CloudFront {
    Write-Status "Setting up CloudFront distribution..."
    
    # Check if distribution already exists
    $distributionId = aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='$DISTRIBUTION_COMMENT'].Id" --output text
    
    if ([string]::IsNullOrEmpty($distributionId) -or $distributionId -eq "None") {
        Write-Status "Creating new CloudFront distribution..."
        
        # Create distribution configuration
        $config = @"
{
    "CallerReference": "dicel-erp-$(Get-Date -UFormat %s)",
    "Comment": "$DISTRIBUTION_COMMENT",
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-$BUCKET_NAME",
        "ViewerProtocolPolicy": "redirect-to-https",
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            }
        },
        "MinTTL": 0,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000,
        "Compress": true
    },
    "Enabled": true,
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-$BUCKET_NAME",
                "DomainName": "$BUCKET_NAME.s3.amazonaws.com",
                "S3OriginConfig": {
                    "OriginAccessIdentity": ""
                }
            }
        ]
    },
    "PriceClass": "PriceClass_100"
}
"@
        
        $config | Out-File -FilePath "cloudfront-config.json" -Encoding UTF8
        
        # Create distribution
        $distributionId = aws cloudfront create-distribution --distribution-config file://cloudfront-config.json --query 'Distribution.Id' --output text
        Write-Success "CloudFront distribution created: $distributionId"
        
        # Clean up config file
        Remove-Item "cloudfront-config.json" -ErrorAction SilentlyContinue
    }
    else {
        Write-Success "CloudFront distribution already exists: $distributionId"
    }
    
    # Store distribution ID for later use
    $distributionId | Out-File -FilePath ".cloudfront-id" -Encoding UTF8
}

# Invalidate CloudFront cache
function Invalidate-Cache {
    Write-Status "Invalidating CloudFront cache..."
    
    if (Test-Path ".cloudfront-id") {
        $distributionId = Get-Content ".cloudfront-id"
        aws cloudfront create-invalidation --distribution-id "$distributionId" --paths "/*"
        Write-Success "Cache invalidation initiated"
    }
    else {
        Write-Warning "Could not find CloudFront distribution ID"
    }
}

# Get deployment URLs
function Get-Urls {
    Write-Status "Getting deployment URLs..."
    
    # S3 website URL
    try {
        $s3Url = aws s3api get-bucket-website --bucket "$BUCKET_NAME" --query 'WebsiteEndpoint' --output text
        if ($s3Url -ne "None") {
            Write-Success "S3 Website URL: http://$s3Url"
        }
    }
    catch {
        Write-Warning "Could not get S3 website URL"
    }
    
    # CloudFront URL
    if (Test-Path ".cloudfront-id") {
        $distributionId = Get-Content ".cloudfront-id"
        $cloudfrontDomain = aws cloudfront get-distribution --id "$distributionId" --query 'Distribution.DomainName' --output text
        Write-Success "CloudFront URL: https://$cloudfrontDomain"
    }
}

# Main deployment function
function Main {
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "🚀 DICEL ERP - AWS Deployment" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    
    # Pre-flight checks
    Test-AwsCli
    Test-AwsCredentials
    
    # Build and deploy
    Build-App
    New-S3Bucket
    Upload-ToS3
    Setup-CloudFront
    Invalidate-Cache
    Get-Urls
    
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Success "Deployment completed successfully!"
    Write-Host "==========================================" -ForegroundColor Cyan
    
    if (Test-Path ".cloudfront-id") {
        $distributionId = Get-Content ".cloudfront-id"
        $cloudfrontDomain = aws cloudfront get-distribution --id "$distributionId" --query 'Distribution.DomainName' --output text
        Write-Host "🌐 Your DICEL ERP is now live at:" -ForegroundColor Green
        Write-Host "   https://$cloudfrontDomain" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📊 Monitor your deployment:" -ForegroundColor Green
        Write-Host "   https://console.aws.amazon.com/cloudfront/home" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "🔄 To update your deployment, run this script again." -ForegroundColor Green
    }
}

# Run main function
Main 