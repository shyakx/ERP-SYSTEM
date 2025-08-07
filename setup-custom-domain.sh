#!/bin/bash

# 🌐 DICEL ERP Custom Domain Setup Script
# This script helps automate the AWS Route 53 custom domain setup

set -e

echo "🌐 DICEL ERP Custom Domain Setup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="dicel-erp.com"
WWW_DOMAIN="www.dicel-erp.com"
CLOUDFRONT_DISTRIBUTION_ID="E144DEXER1WRP0"
S3_BUCKET="dicel-erp-production"

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
        echo "Download from: https://aws.amazon.com/cli/"
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
    print_success "AWS credentials are configured"
}

# Check if domain is available
check_domain_availability() {
    print_status "Checking domain availability for $DOMAIN..."
    
    # This is a simplified check - in practice, you'd need to use Route 53 API
    echo "Please manually check domain availability at:"
    echo "https://console.aws.amazon.com/route53/home#DomainRegistration:"
    echo ""
    read -p "Press Enter when you've registered the domain or confirmed it's available..."
}

# Create hosted zone
create_hosted_zone() {
    print_status "Creating hosted zone for $DOMAIN..."
    
    # Note: This requires manual creation in AWS Console
    echo "Please create the hosted zone manually:"
    echo "1. Go to AWS Console → Route 53 → Hosted zones"
    echo "2. Click 'Create hosted zone'"
    echo "3. Enter domain name: $DOMAIN"
    echo "4. Click 'Create hosted zone'"
    echo ""
    read -p "Press Enter when the hosted zone is created..."
}

# Request SSL certificate
request_ssl_certificate() {
    print_status "Requesting SSL certificate for $DOMAIN..."
    
    # Request certificate via AWS CLI
    CERT_ARN=$(aws acm request-certificate \
        --domain-names "$DOMAIN" "*.$DOMAIN" \
        --validation-method DNS \
        --region us-east-1 \
        --query 'CertificateArn' \
        --output text)
    
    if [ $? -eq 0 ]; then
        print_success "SSL certificate requested: $CERT_ARN"
        echo "Certificate ARN: $CERT_ARN"
        echo "Please wait 5-10 minutes for the certificate to be issued."
        echo ""
        read -p "Press Enter when the certificate status is 'Issued'..."
    else
        print_error "Failed to request SSL certificate"
        exit 1
    fi
}

# Update CloudFront distribution
update_cloudfront() {
    print_status "Updating CloudFront distribution..."
    
    echo "Please update CloudFront distribution manually:"
    echo "1. Go to AWS Console → CloudFront → Distributions"
    echo "2. Select distribution: $CLOUDFRONT_DISTRIBUTION_ID"
    echo "3. Click 'Edit'"
    echo "4. Add alternate domain names:"
    echo "   - $WWW_DOMAIN"
    echo "   - $DOMAIN"
    echo "5. Select your SSL certificate"
    echo "6. Save changes"
    echo ""
    read -p "Press Enter when CloudFront is updated..."
}

# Create DNS records
create_dns_records() {
    print_status "Creating DNS records..."
    
    # Get hosted zone ID
    HOSTED_ZONE_ID=$(aws route53 list-hosted-zones --query "HostedZones[?Name=='$DOMAIN.'].Id" --output text)
    
    if [ -z "$HOSTED_ZONE_ID" ]; then
        print_error "Hosted zone not found for $DOMAIN"
        exit 1
    fi
    
    # Remove the /hostedzone/ prefix
    HOSTED_ZONE_ID=${HOSTED_ZONE_ID#/hostedzone/}
    
    print_success "Found hosted zone: $HOSTED_ZONE_ID"
    
    # Create A record for root domain
    cat > /tmp/root-record.json << EOF
{
    "Changes": [
        {
            "Action": "CREATE",
            "ResourceRecordSet": {
                "Name": "$DOMAIN",
                "Type": "A",
                "AliasTarget": {
                    "HostedZoneId": "Z2FDTNDATAQYW2",
                    "DNSName": "d2iq65q7bkruv1.cloudfront.net",
                    "EvaluateTargetHealth": false
                }
            }
        }
    ]
}
EOF
    
    aws route53 change-resource-record-sets \
        --hosted-zone-id "$HOSTED_ZONE_ID" \
        --change-batch file:///tmp/root-record.json
    
    # Create CNAME record for www
    cat > /tmp/www-record.json << EOF
{
    "Changes": [
        {
            "Action": "CREATE",
            "ResourceRecordSet": {
                "Name": "$WWW_DOMAIN",
                "Type": "CNAME",
                "TTL": 300,
                "ResourceRecords": [
                    {
                        "Value": "d2iq65q7bkruv1.cloudfront.net"
                    }
                ]
            }
        }
    ]
}
EOF
    
    aws route53 change-resource-record-sets \
        --hosted-zone-id "$HOSTED_ZONE_ID" \
        --change-batch file:///tmp/www-record.json
    
    print_success "DNS records created successfully"
}

# Test domain resolution
test_domain() {
    print_status "Testing domain resolution..."
    
    echo "Testing $WWW_DOMAIN..."
    if nslookup "$WWW_DOMAIN" &> /dev/null; then
        print_success "$WWW_DOMAIN resolves correctly"
    else
        print_warning "$WWW_DOMAIN not yet resolving (DNS propagation may take time)"
    fi
    
    echo "Testing $DOMAIN..."
    if nslookup "$DOMAIN" &> /dev/null; then
        print_success "$DOMAIN resolves correctly"
    else
        print_warning "$DOMAIN not yet resolving (DNS propagation may take time)"
    fi
}

# Invalidate CloudFront cache
invalidate_cache() {
    print_status "Invalidating CloudFront cache..."
    
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
        --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
        --paths "/*" \
        --query 'Invalidation.Id' \
        --output text)
    
    if [ $? -eq 0 ]; then
        print_success "Cache invalidation created: $INVALIDATION_ID"
    else
        print_error "Failed to create cache invalidation"
    fi
}

# Main execution
main() {
    echo "Starting DICEL ERP custom domain setup..."
    echo ""
    
    check_aws_cli
    check_aws_credentials
    check_domain_availability
    create_hosted_zone
    request_ssl_certificate
    update_cloudfront
    create_dns_records
    test_domain
    invalidate_cache
    
    echo ""
    print_success "Setup completed!"
    echo ""
    echo "Next steps:"
    echo "1. Wait for DNS propagation (24-48 hours, usually 1-2 hours)"
    echo "2. Test your domain: https://$WWW_DOMAIN"
    echo "3. Test SSL certificate: https://$DOMAIN"
    echo "4. Monitor for any issues"
    echo ""
    echo "Your DICEL ERP application will be available at:"
    echo "  🌐 https://$WWW_DOMAIN"
    echo "  🌐 https://$DOMAIN"
}

# Run main function
main "$@" 