# 🚀 DICEL ERP - AWS Deployment Guide

## 📋 **Prerequisites**

### Required Tools
- AWS Account
- AWS CLI installed
- Domain name (optional but recommended)
- Git repository (optional)

### AWS Services We'll Use
- **S3** - Static file hosting
- **CloudFront** - CDN and HTTPS
- **Route 53** - DNS management (optional)
- **Certificate Manager** - SSL certificates

## 🔧 **Step 1: AWS CLI Setup**

### Install AWS CLI
```bash
# Windows (PowerShell)
Invoke-WebRequest -Uri "https://awscli.amazonaws.com/AWSCLIV2.msi" -OutFile "AWSCLIV2.msi"
Start-Process msiexec.exe -Wait -ArgumentList '/I AWSCLIV2.msi /quiet'

# macOS
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### Configure AWS CLI
```bash
# Configure your AWS credentials
aws configure

# Enter your:
# - AWS Access Key ID
# - AWS Secret Access Key
# - Default region (e.g., us-east-1)
# - Default output format (json)
```

## 🗂️ **Step 2: Create S3 Bucket**

### Create the Bucket
```bash
# Create S3 bucket (replace with your unique name)
aws s3 mb s3://dicel-erp-production

# Enable static website hosting
aws s3 website s3://dicel-erp-production \
  --index-document index.html \
  --error-document index.html
```

### Set Bucket Policy for Public Access
```bash
# Create bucket policy
aws s3api put-bucket-policy --bucket dicel-erp-production --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::dicel-erp-production/*"
    }
  ]
}'
```

### Configure CORS (for future API calls)
```bash
# Create CORS configuration
aws s3api put-bucket-cors --bucket dicel-erp-production --cors-configuration '{
  "CORSRules": [
    {
      "AllowedHeaders": ["*"],
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedOrigins": ["*"],
      "ExposeHeaders": []
    }
  ]
}'
```

## 📦 **Step 3: Build and Upload Application**

### Build the Application
```bash
# Build for production
npm run build

# Verify build output
ls -la dist/
```

### Upload to S3
```bash
# Sync build files to S3
aws s3 sync dist/ s3://dicel-erp-production --delete

# Verify upload
aws s3 ls s3://dicel-erp-production --recursive
```

### Test S3 Website
```bash
# Get the S3 website URL
aws s3api get-bucket-website --bucket dicel-erp-production

# The URL will be: http://dicel-erp-production.s3-website-[region].amazonaws.com
```

## 🌐 **Step 4: Setup CloudFront Distribution**

### Create CloudFront Distribution
```bash
# Create distribution configuration
cat > cloudfront-config.json << 'EOF'
{
  "CallerReference": "dicel-erp-$(date +%s)",
  "Comment": "DICEL ERP Production",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-dicel-erp-production",
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
        "Id": "S3-dicel-erp-production",
        "DomainName": "dicel-erp-production.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "PriceClass": "PriceClass_100"
}
EOF

# Create CloudFront distribution
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

### Configure Custom Error Pages
```bash
# Get your distribution ID
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query 'DistributionList.Items[?Comment==`DICEL ERP Production`].Id' --output text)

# Create custom error configuration
aws cloudfront create-distribution --distribution-config '{
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 0
      }
    ]
  }
}'
```

## 🔒 **Step 5: SSL Certificate (Optional but Recommended)**

### Request SSL Certificate
```bash
# Request certificate (replace with your domain)
aws acm request-certificate \
  --domain-name your-domain.com \
  --subject-alternative-names www.your-domain.com \
  --validation-method DNS
```

### Update CloudFront with SSL
```bash
# Get certificate ARN
CERT_ARN=$(aws acm list-certificates --query 'CertificateSummaryList[?DomainName==`your-domain.com`].CertificateArn' --output text)

# Update CloudFront distribution with SSL
aws cloudfront update-distribution --id $DISTRIBUTION_ID --distribution-config '{
  "Aliases": {
    "Quantity": 2,
    "Items": ["your-domain.com", "www.your-domain.com"]
  },
  "ViewerCertificate": {
    "ACMCertificateArn": "'$CERT_ARN'",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  }
}'
```

## 🚀 **Step 6: Automated Deployment Script**

### Create Deployment Script
```bash
# Create deploy.sh script
cat > deploy.sh << 'EOF'
#!/bin/bash

echo "🚀 Deploying DICEL ERP to AWS..."

# Build application
echo "📦 Building application..."
npm run build

# Upload to S3
echo "📤 Uploading to S3..."
aws s3 sync dist/ s3://dicel-erp-production --delete

# Invalidate CloudFront cache
echo "🔄 Invalidating CloudFront cache..."
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query 'DistributionList.Items[?Comment==`DICEL ERP Production`].Id' --output text)
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"

echo "✅ Deployment complete!"
echo "🌐 Your app is available at: https://your-cloudfront-domain.cloudfront.net"
EOF

# Make script executable
chmod +x deploy.sh
```

### Run Deployment
```bash
# Deploy to AWS
./deploy.sh
```

## 📊 **Step 7: Monitoring and Maintenance**

### CloudWatch Monitoring
```bash
# Create CloudWatch dashboard
aws cloudwatch put-dashboard --dashboard-name "DICEL-ERP-Monitoring" --dashboard-body '{
  "widgets": [
    {
      "type": "metric",
      "properties": {
        "metrics": [
          ["AWS/CloudFront", "Requests", "DistributionId", "YOUR_DISTRIBUTION_ID"]
        ],
        "period": 300,
        "stat": "Sum",
        "region": "us-east-1",
        "title": "CloudFront Requests"
      }
    }
  ]
}'
```

### Set Up Alerts
```bash
# Create SNS topic for alerts
aws sns create-topic --name "DICEL-ERP-Alerts"

# Create CloudWatch alarm
aws cloudwatch put-metric-alarm \
  --alarm-name "DICEL-ERP-Error-Rate" \
  --alarm-description "High error rate on DICEL ERP" \
  --metric-name "5xxError" \
  --namespace "AWS/CloudFront" \
  --statistic "Sum" \
  --period 300 \
  --threshold 10 \
  --comparison-operator "GreaterThanThreshold"
```

## 🔧 **Step 8: Environment Variables**

### Create Environment Configuration
```bash
# Create .env.production file
cat > .env.production << 'EOF'
VITE_APP_TITLE=DICEL ERP
VITE_APP_VERSION=1.0.0
VITE_API_URL=https://your-api-domain.com
VITE_CLOUDFRONT_URL=https://your-cloudfront-domain.cloudfront.net
EOF
```

## 📋 **Step 9: Post-Deployment Checklist**

### ✅ Verification Steps
```bash
# Test S3 website
curl -I http://dicel-erp-production.s3-website-[region].amazonaws.com

# Test CloudFront
curl -I https://your-cloudfront-domain.cloudfront.net

# Check SSL certificate
openssl s_client -connect your-domain.com:443 -servername your-domain.com

# Test all routes
curl -I https://your-domain.com/login
curl -I https://your-domain.com/hr
curl -I https://your-domain.com/finance
```

### ✅ Performance Testing
```bash
# Test with curl
curl -w "@curl-format.txt" -o /dev/null -s "https://your-domain.com"

# Create curl-format.txt
cat > curl-format.txt << 'EOF'
     time_namelookup:  %{time_namelookup}\n
        time_connect:  %{time_connect}\n
     time_appconnect:  %{time_appconnect}\n
    time_pretransfer:  %{time_pretransfer}\n
       time_redirect:  %{time_redirect}\n
  time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
          time_total:  %{time_total}\n
EOF
```

## 💰 **Cost Estimation**

### Monthly Costs (US East)
- **S3 Storage:** ~$0.023/GB/month
- **S3 Requests:** ~$0.0004/1,000 requests
- **CloudFront Data Transfer:** ~$0.085/GB
- **CloudFront Requests:** ~$0.0075/10,000 requests
- **Route 53:** ~$0.50/month per hosted zone
- **Certificate Manager:** Free

**Estimated Total:** $1-5/month for typical usage

## 🎯 **Next Steps**

### Phase 2: Backend Integration
1. **API Gateway** - REST API endpoints
2. **Lambda Functions** - Serverless backend
3. **DynamoDB** - Database
4. **Cognito** - User authentication

### Phase 3: Advanced Features
1. **CloudWatch Logs** - Application logging
2. **X-Ray** - Distributed tracing
3. **SES** - Email notifications
4. **SNS** - Push notifications

---

## 🚀 **Ready to Deploy?**

**Run these commands to deploy:**

```bash
# 1. Build the application
npm run build

# 2. Create S3 bucket and upload
aws s3 mb s3://dicel-erp-production
aws s3 sync dist/ s3://dicel-erp-production --delete

# 3. Create CloudFront distribution
# (Use the cloudfront-config.json from above)

# 4. Deploy with one command
./deploy.sh
```

**Your DICEL ERP will be live at:** `https://your-cloudfront-domain.cloudfront.net`

Need help with any specific step? 🚀 