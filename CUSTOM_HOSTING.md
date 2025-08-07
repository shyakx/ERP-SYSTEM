# 🌐 DICEL ERP - Custom Hosting Guide

## 🎯 Custom Hosting Options

### 1. **AWS S3 + CloudFront (Recommended)**

#### Prerequisites
- AWS Account
- AWS CLI installed
- Domain name (optional)

#### Setup Steps

##### Step 1: Create S3 Bucket
```bash
# Create bucket
aws s3 mb s3://dicel-erp-production

# Enable static website hosting
aws s3 website s3://dicel-erp-production --index-document index.html --error-document index.html
```

##### Step 2: Upload Build Files
```bash
# Sync build files to S3
aws s3 sync dist/ s3://dicel-erp-production --delete

# Set bucket policy for public read access
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

### 2. **Traditional VPS (Ubuntu/Debian)**

#### Server Setup

##### Step 1: Server Preparation
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Nginx
sudo apt install nginx -y

# Install Node.js (for future backend)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

##### Step 2: Configure Nginx
```bash
# Create nginx config
sudo nano /etc/nginx/sites-available/dicel-erp
```

**nginx configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/dicel-erp;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Handle React Router
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

##### Step 3: Deploy Application
```bash
# Create web directory
sudo mkdir -p /var/www/dicel-erp

# Upload build files
sudo cp -r dist/* /var/www/dicel-erp/

# Set permissions
sudo chown -R www-data:www-data /var/www/dicel-erp
sudo chmod -R 755 /var/www/dicel-erp

# Enable site
sudo ln -s /etc/nginx/sites-available/dicel-erp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3. **Docker Deployment**

#### Create Dockerfile
```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Deploy with Docker
```bash
# Build image
docker build -t dicel-erp .

# Run container
docker run -d -p 80:80 --name dicel-erp dicel-erp
```

## 🔧 Deployment Scripts

### Automated Deployment Script
```bash
#!/bin/bash
# deploy.sh

echo "🚀 Deploying DICEL ERP..."

# Build application
echo "📦 Building application..."
npm run build

# Upload to server
echo "📤 Uploading to server..."
rsync -avz --delete dist/ user@your-server:/var/www/dicel-erp/

# Restart services
echo "🔄 Restarting services..."
ssh user@your-server "sudo systemctl reload nginx"

echo "✅ Deployment complete!"
```

## 📊 Monitoring & Maintenance

### Health Checks
```bash
# Check application status
curl -I https://your-domain.com

# Check nginx status
sudo systemctl status nginx

# Check logs
sudo tail -f /var/log/nginx/access.log
```

### SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 🎯 **Which hosting option would you like to proceed with?**

1. **AWS S3 + CloudFront** (Scalable, managed)
2. **Traditional VPS** (Full control, cost-effective)
3. **Docker** (Containerized, portable)
4. **Other cloud provider** (Azure, GCP, DigitalOcean)

Let me know your preference and I'll guide you through the specific setup! 🚀 