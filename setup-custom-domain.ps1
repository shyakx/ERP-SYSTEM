# 🌐 DICEL ERP Custom Domain Setup Script (PowerShell)
# This script helps automate the AWS Route 53 custom domain setup for Windows

param(
    [string]$Domain = "dicel-erp.com",
    [string]$WWWDomain = "www.dicel-erp.com",
    [string]$CloudFrontDistributionId = "E144DEXER1WRP0",
    [string]$S3Bucket = "dicel-erp-production"
)

# Function to write colored output
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
function Test-AWSCLI {
    Write-Status "Checking AWS CLI installation..."
    try {
        $null = aws --version
        Write-Success "AWS CLI is installed"
    }
    catch {
        Write-Error "AWS CLI is not installed. Please install it first."
        Write-Host "Download from: https://aws.amazon.com/cli/" -ForegroundColor Cyan
        exit 1
    }
}

# Check AWS credentials
function Test-AWSCredentials {
    Write-Status "Checking AWS credentials..."
    try {
        $null = aws sts get-caller-identity
        Write-Success "AWS credentials are configured"
    }
    catch {
        Write-Error "AWS credentials not configured. Please run 'aws configure' first."
        exit 1
    }
}

# Check domain availability
function Test-DomainAvailability {
    Write-Status "Checking domain availability for $Domain..."
    Write-Host "Please manually check domain availability at:" -ForegroundColor Cyan
    Write-Host "https://console.aws.amazon.com/route53/home#DomainRegistration:" -ForegroundColor Cyan
    Write-Host ""
    Read-Host "Press Enter when you've registered the domain or confirmed it's available"
}

# Create hosted zone
function New-HostedZone {
    Write-Status "Creating hosted zone for $Domain..."
    Write-Host "Please create the hosted zone manually:" -ForegroundColor Cyan
    Write-Host "1. Go to AWS Console → Route 53 → Hosted zones" -ForegroundColor White
    Write-Host "2. Click 'Create hosted zone'" -ForegroundColor White
    Write-Host "3. Enter domain name: $Domain" -ForegroundColor White
    Write-Host "4. Click 'Create hosted zone'" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter when the hosted zone is created"
}

# Request SSL certificate
function Request-SSLCertificate {
    Write-Status "Requesting SSL certificate for $Domain..."
    
    try {
        $certArn = aws acm request-certificate `
            --domain-names $Domain "*.$Domain" `
            --validation-method DNS `
            --region us-east-1 `
            --query 'CertificateArn' `
            --output text
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "SSL certificate requested: $certArn"
            Write-Host "Certificate ARN: $certArn" -ForegroundColor Cyan
            Write-Host "Please wait 5-10 minutes for the certificate to be issued." -ForegroundColor Yellow
            Write-Host ""
            Read-Host "Press Enter when the certificate status is 'Issued'"
        }
        else {
            Write-Error "Failed to request SSL certificate"
            exit 1
        }
    }
    catch {
        Write-Error "Failed to request SSL certificate: $_"
        exit 1
    }
}

# Update CloudFront distribution
function Update-CloudFrontDistribution {
    Write-Status "Updating CloudFront distribution..."
    
    Write-Host "Please update CloudFront distribution manually:" -ForegroundColor Cyan
    Write-Host "1. Go to AWS Console → CloudFront → Distributions" -ForegroundColor White
    Write-Host "2. Select distribution: $CloudFrontDistributionId" -ForegroundColor White
    Write-Host "3. Click 'Edit'" -ForegroundColor White
    Write-Host "4. Add alternate domain names:" -ForegroundColor White
    Write-Host "   - $WWWDomain" -ForegroundColor White
    Write-Host "   - $Domain" -ForegroundColor White
    Write-Host "5. Select your SSL certificate" -ForegroundColor White
    Write-Host "6. Save changes" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter when CloudFront is updated"
}

# Create DNS records
function New-DNSRecords {
    Write-Status "Creating DNS records..."
    
    try {
        # Get hosted zone ID
        $hostedZoneId = aws route53 list-hosted-zones --query "HostedZones[?Name=='$Domain.'].Id" --output text
        
        if (-not $hostedZoneId) {
            Write-Error "Hosted zone not found for $Domain"
            exit 1
        }
        
        # Remove the /hostedzone/ prefix
        $hostedZoneId = $hostedZoneId -replace '/hostedzone/', ''
        
        Write-Success "Found hosted zone: $hostedZoneId"
        
        # Create A record for root domain
        $rootRecord = @{
            Changes = @(
                @{
                    Action = "CREATE"
                    ResourceRecordSet = @{
                        Name = $Domain
                        Type = "A"
                        AliasTarget = @{
                            HostedZoneId = "Z2FDTNDATAQYW2"
                            DNSName = "d2iq65q7bkruv1.cloudfront.net"
                            EvaluateTargetHealth = $false
                        }
                    }
                }
            )
        }
        
        $rootRecordJson = $rootRecord | ConvertTo-Json -Depth 10
        $rootRecordJson | Out-File -FilePath "$env:TEMP\root-record.json" -Encoding UTF8
        
        aws route53 change-resource-record-sets `
            --hosted-zone-id $hostedZoneId `
            --change-batch file://"$env:TEMP\root-record.json"
        
        # Create CNAME record for www
        $wwwRecord = @{
            Changes = @(
                @{
                    Action = "CREATE"
                    ResourceRecordSet = @{
                        Name = $WWWDomain
                        Type = "CNAME"
                        TTL = 300
                        ResourceRecords = @(
                            @{
                                Value = "d2iq65q7bkruv1.cloudfront.net"
                            }
                        )
                    }
                }
            )
        }
        
        $wwwRecordJson = $wwwRecord | ConvertTo-Json -Depth 10
        $wwwRecordJson | Out-File -FilePath "$env:TEMP\www-record.json" -Encoding UTF8
        
        aws route53 change-resource-record-sets `
            --hosted-zone-id $hostedZoneId `
            --change-batch file://"$env:TEMP\www-record.json"
        
        Write-Success "DNS records created successfully"
    }
    catch {
        Write-Error "Failed to create DNS records: $_"
        exit 1
    }
}

# Test domain resolution
function Test-DomainResolution {
    Write-Status "Testing domain resolution..."
    
    Write-Host "Testing $WWWDomain..." -ForegroundColor Cyan
    try {
        $null = nslookup $WWWDomain 2>$null
        Write-Success "$WWWDomain resolves correctly"
    }
    catch {
        Write-Warning "$WWWDomain not yet resolving (DNS propagation may take time)"
    }
    
    Write-Host "Testing $Domain..." -ForegroundColor Cyan
    try {
        $null = nslookup $Domain 2>$null
        Write-Success "$Domain resolves correctly"
    }
    catch {
        Write-Warning "$Domain not yet resolving (DNS propagation may take time)"
    }
}

# Invalidate CloudFront cache
function Invoke-CloudFrontInvalidation {
    Write-Status "Invalidating CloudFront cache..."
    
    try {
        $invalidationId = aws cloudfront create-invalidation `
            --distribution-id $CloudFrontDistributionId `
            --paths "/*" `
            --query 'Invalidation.Id' `
            --output text
        
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Cache invalidation created: $invalidationId"
        }
        else {
            Write-Error "Failed to create cache invalidation"
        }
    }
    catch {
        Write-Error "Failed to create cache invalidation: $_"
    }
}

# Main execution
function Start-CustomDomainSetup {
    Write-Host "🌐 DICEL ERP Custom Domain Setup" -ForegroundColor Green
    Write-Host "==================================" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "Starting DICEL ERP custom domain setup..." -ForegroundColor Cyan
    Write-Host ""
    
    Test-AWSCLI
    Test-AWSCredentials
    Test-DomainAvailability
    New-HostedZone
    Request-SSLCertificate
    Update-CloudFrontDistribution
    New-DNSRecords
    Test-DomainResolution
    Invoke-CloudFrontInvalidation
    
    Write-Host ""
    Write-Success "Setup completed!"
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Wait for DNS propagation (24-48 hours, usually 1-2 hours)" -ForegroundColor White
    Write-Host "2. Test your domain: https://$WWWDomain" -ForegroundColor White
    Write-Host "3. Test SSL certificate: https://$Domain" -ForegroundColor White
    Write-Host "4. Monitor for any issues" -ForegroundColor White
    Write-Host ""
    Write-Host "Your DICEL ERP application will be available at:" -ForegroundColor Cyan
    Write-Host "  🌐 https://$WWWDomain" -ForegroundColor Green
    Write-Host "  🌐 https://$Domain" -ForegroundColor Green
}

# Run the setup
Start-CustomDomainSetup 