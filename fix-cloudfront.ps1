# 🚀 Fix CloudFront Distribution

Write-Host "🚀 Fixing CloudFront distribution..." -ForegroundColor Cyan

# Configuration
$BUCKET_NAME = "dicel-erp-production"
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

# Create new CloudFront distribution
function Create-NewDistribution {
    Write-Status "Creating new CloudFront distribution..."
    
    # Create distribution configuration
    $config = @"
{
    "CallerReference": "dicel-erp-fix-$(Get-Date -Format 'yyyyMMdd-HHmmss')",
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-dicel-erp-production-website",
                "DomainName": "dicel-erp-production.s3-website-us-east-1.amazonaws.com",
                "OriginPath": "",
                "CustomHeaders": {
                    "Quantity": 0
                },
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only",
                    "OriginSslProtocols": {
                        "Quantity": 1,
                        "Items": ["TLSv1.2"]
                    },
                    "OriginReadTimeout": 30,
                    "OriginKeepaliveTimeout": 5
                },
                "ConnectionAttempts": 3,
                "ConnectionTimeout": 10,
                "OriginShield": {
                    "Enabled": false
                }
            }
        ]
    },
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-dicel-erp-production-website",
        "ViewerProtocolPolicy": "redirect-to-https",
        "TrustedSigners": {
            "Enabled": false,
            "Quantity": 0
        },
        "TrustedKeyGroups": {
            "Enabled": false,
            "Quantity": 0
        },
        "ForwardedValues": {
            "QueryString": false,
            "Cookies": {
                "Forward": "none"
            },
            "Headers": {
                "Quantity": 0
            },
            "QueryStringCacheKeys": {
                "Quantity": 0
            }
        },
        "MinTTL": 0,
        "AllowedMethods": {
            "Quantity": 7,
            "Items": ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        },
        "SmoothStreaming": false,
        "DefaultTTL": 86400,
        "MaxTTL": 31536000,
        "Compress": true,
        "LambdaFunctionAssociations": {
            "Quantity": 0
        },
        "FunctionAssociations": {
            "Quantity": 0
        },
        "FieldLevelEncryptionId": ""
    },
    "CacheBehaviors": {
        "Quantity": 0
    },
    "CustomErrorResponses": {
        "Quantity": 0
    },
    "Comment": "DICEL ERP Frontend Distribution",
    "Logging": {
        "Enabled": false,
        "IncludeCookies": false,
        "Bucket": "",
        "Prefix": ""
    },
    "PriceClass": "PriceClass_100",
    "Enabled": true,
    "ViewerCertificate": {
        "CloudFrontDefaultCertificate": true,
        "MinimumProtocolVersion": "TLSv1",
        "CertificateSource": "cloudfront"
    },
    "Restrictions": {
        "GeoRestriction": {
            "RestrictionType": "none",
            "Quantity": 0
        }
    },
    "WebACLId": "",
    "HttpVersion": "http2",
    "IsIPV6Enabled": true
}
"@
    
    $config | Out-File -FilePath "new-distribution-config.json" -Encoding UTF8
    
    # Create new distribution
    $newDistribution = aws cloudfront create-distribution --distribution-config file://new-distribution-config.json --query 'Distribution.Id' --output text
    
    Write-Success "New CloudFront distribution created: $newDistribution"
    
    # Get the domain name
    $domainName = aws cloudfront get-distribution --id $newDistribution --query 'Distribution.DomainName' --output text
    
    Write-Success "New CloudFront domain: $domainName"
    
    # Clean up
    Remove-Item "new-distribution-config.json" -ErrorAction SilentlyContinue
    
    return $newDistribution, $domainName
}

# Main function
function Main {
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "🚀 Fix CloudFront Distribution" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    
    $distributionId, $domainName = Create-NewDistribution
    
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Success "CloudFront distribution fixed!"
    Write-Host "==========================================" -ForegroundColor Cyan
    
    Write-Host "🌐 Your new CloudFront URL:" -ForegroundColor Green
    Write-Host "   https://$domainName" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📊 Distribution ID: $distributionId" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔄 Wait a few minutes for the distribution to deploy..." -ForegroundColor Green
}

# Run main function
Main 