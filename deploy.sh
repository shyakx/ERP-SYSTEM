#!/bin/bash

# 🚀 DICEL ERP - AWS Deployment Script
# This script builds and deploys the DICEL ERP application to AWS S3 + CloudFront

set -e  # Exit on any error

echo "🚀 Starting DICEL ERP deployment to AWS..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BUCKET_NAME="dicel-erp-production"
REGION="us-east-1"
DISTRIBUTION_COMMENT="DICEL ERP Production"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if AWS CLI is installed
check_aws_cli() {
    print_status "Checking AWS CLI installation..."
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install it first."
        print_status "Installation guide: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
        exit 1
    fi
    print_success "AWS CLI is installed"
}

# Check AWS credentials
check_aws_credentials() {
    print_status "Checking AWS credentials..."
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "AWS credentials not configured. Please run 'aws configure' first."
        exit 1
    fi
    print_success "AWS credentials are valid"
}

# Build the application
build_app() {
    print_status "Building DICEL ERP application..."
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        print_status "Installing dependencies..."
        npm install
    fi
    
    # Build for production
    npm run build
    
    if [ ! -d "dist" ]; then
        print_error "Build failed - dist directory not found"
        exit 1
    fi
    
    print_success "Application built successfully"
}

# Create S3 bucket if it doesn't exist
create_s3_bucket() {
    print_status "Checking S3 bucket: $BUCKET_NAME"
    
    if aws s3 ls "s3://$BUCKET_NAME" 2>&1 | grep -q 'NoSuchBucket'; then
        print_status "Creating S3 bucket: $BUCKET_NAME"
        aws s3 mb "s3://$BUCKET_NAME" --region "$REGION"
        
        # Enable static website hosting
        aws s3 website "s3://$BUCKET_NAME" \
            --index-document index.html \
            --error-document index.html
        
        # Set bucket policy for public read access
        aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy '{
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "PublicReadGetObject",
                    "Effect": "Allow",
                    "Principal": "*",
                    "Action": "s3:GetObject",
                    "Resource": "arn:aws:s3:::'$BUCKET_NAME'/*"
                }
            ]
        }'
        
        print_success "S3 bucket created and configured"
    else
        print_success "S3 bucket already exists"
    fi
}

# Upload files to S3
upload_to_s3() {
    print_status "Uploading files to S3..."
    aws s3 sync dist/ "s3://$BUCKET_NAME" --delete
    
    # Verify upload
    FILE_COUNT=$(aws s3 ls "s3://$BUCKET_NAME" --recursive | wc -l)
    print_success "Uploaded $FILE_COUNT files to S3"
}

# Get or create CloudFront distribution
setup_cloudfront() {
    print_status "Setting up CloudFront distribution..."
    
    # Check if distribution already exists
    DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='$DISTRIBUTION_COMMENT'].Id" --output text)
    
    if [ -z "$DISTRIBUTION_ID" ] || [ "$DISTRIBUTION_ID" == "None" ]; then
        print_status "Creating new CloudFront distribution..."
        
        # Create distribution configuration
        cat > cloudfront-config.json << EOF
{
    "CallerReference": "dicel-erp-$(date +%s)",
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
EOF
        
        # Create distribution
        DISTRIBUTION_ID=$(aws cloudfront create-distribution --distribution-config file://cloudfront-config.json --query 'Distribution.Id' --output text)
        print_success "CloudFront distribution created: $DISTRIBUTION_ID"
        
        # Clean up config file
        rm cloudfront-config.json
    else
        print_success "CloudFront distribution already exists: $DISTRIBUTION_ID"
    fi
    
    # Store distribution ID for later use
    echo "$DISTRIBUTION_ID" > .cloudfront-id
}

# Invalidate CloudFront cache
invalidate_cache() {
    print_status "Invalidating CloudFront cache..."
    
    if [ -f ".cloudfront-id" ]; then
        DISTRIBUTION_ID=$(cat .cloudfront-id)
        aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"
        print_success "Cache invalidation initiated"
    else
        print_warning "Could not find CloudFront distribution ID"
    fi
}

# Get deployment URLs
get_urls() {
    print_status "Getting deployment URLs..."
    
    # S3 website URL
    S3_URL=$(aws s3api get-bucket-website --bucket "$BUCKET_NAME" --query 'WebsiteEndpoint' --output text)
    if [ "$S3_URL" != "None" ]; then
        print_success "S3 Website URL: http://$S3_URL"
    fi
    
    # CloudFront URL
    if [ -f ".cloudfront-id" ]; then
        DISTRIBUTION_ID=$(cat .cloudfront-id)
        CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution --id "$DISTRIBUTION_ID" --query 'Distribution.DomainName' --output text)
        print_success "CloudFront URL: https://$CLOUDFRONT_DOMAIN"
    fi
}

# Main deployment function
main() {
    echo "=========================================="
    echo "🚀 DICEL ERP - AWS Deployment"
    echo "=========================================="
    
    # Pre-flight checks
    check_aws_cli
    check_aws_credentials
    
    # Build and deploy
    build_app
    create_s3_bucket
    upload_to_s3
    setup_cloudfront
    invalidate_cache
    get_urls
    
    echo "=========================================="
    print_success "Deployment completed successfully!"
    echo "=========================================="
    
    if [ -f ".cloudfront-id" ]; then
        DISTRIBUTION_ID=$(cat .cloudfront-id)
        CLOUDFRONT_DOMAIN=$(aws cloudfront get-distribution --id "$DISTRIBUTION_ID" --query 'Distribution.DomainName' --output text)
        echo "🌐 Your DICEL ERP is now live at:"
        echo "   https://$CLOUDFRONT_DOMAIN"
        echo ""
        echo "📊 Monitor your deployment:"
        echo "   https://console.aws.amazon.com/cloudfront/home"
        echo ""
        echo "🔄 To update your deployment, run this script again."
    fi
}

# Run main function
main "$@" 