# 🚀 DICEL ERP - Complete Deployment Guide

## 📋 **Current Status**
- ✅ **Frontend:** Deployed to AWS S3 + CloudFront
- ✅ **Frontend URL:** https://d2iq65q7bkruv1.cloudfront.net
- ❌ **Backend:** Ready for deployment
- 🔄 **Database:** PostgreSQL (local)

## 🎯 **Environment Configuration**

### **Real Values (No Placeholders):**

#### **Frontend URLs:**
- **CloudFront:** https://d2iq65q7bkruv1.cloudfront.net
- **S3 Website:** http://dicel-erp-production.s3-website-us-east-1.amazonaws.com

#### **Backend Configuration:**
```bash
# Database Configuration
DB_HOST=localhost
DB_USER=postgres
DB_PASS=0123
DB_NAME=dicel_erp_development
DB_PORT=5434

# OpenAI Configuration
OPENAI_API_KEY=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

# JWT Configuration
JWT_SECRET=5009d3bd3d3887a936f98af7952673cc7ffa787e50f2e6fbfdde840e23db717635ad62d7be98b7c0a2ecf249f124e58cd58b1cf2e78b87c88c68a9e2cbbb3068

# Server Configuration
NODE_ENV=production
PORT=8080
CORS_ORIGIN=https://d2iq65q7bkruv1.cloudfront.net

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads/documents
```

## 🚀 **Backend Deployment Steps**

### **Step 1: Install EB CLI**
```bash
pip install awsebcli
```

### **Step 2: Navigate to Backend Directory**
```bash
cd backend
```

### **Step 3: Initialize Elastic Beanstalk**
```bash
eb init dicel-erp --region us-east-1 --platform "Node.js 18"
```

### **Step 4: Create Environment**
```bash
eb create dicel-erp-backend --instance-type t3.micro --single-instance
```

### **Step 5: Deploy**
```bash
eb deploy
```

### **Step 6: Get Backend URL**
```bash
eb status
```

## 🔧 **Automatic Deployment**

### **Run the Complete Deployment Script:**
```bash
./deploy-backend.ps1
```

This script will:
1. ✅ Check prerequisites (AWS CLI, EB CLI)
2. ✅ Install backend dependencies
3. ✅ Initialize EB application
4. ✅ Deploy to Elastic Beanstalk
5. ✅ Get the backend URL
6. ✅ Update frontend API configuration
7. ✅ Build and deploy updated frontend

## 🌐 **Updated API Configuration**

### **Frontend API Detection:**
```javascript
const getApiUrl = () => {
  // Production (AWS)
  if (window.location.hostname.includes('cloudfront.net') || 
      window.location.hostname.includes('s3-website') ||
      window.location.hostname.includes('amazonaws.com')) {
    return 'https://dicel-erp-backend.elasticbeanstalk.com/api';
  }
  // Development
  return 'http://localhost:5000/api';
};
```

### **Backend CORS Configuration:**
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:5174',
    'https://d2iq65q7bkruv1.cloudfront.net',
    'http://dicel-erp-production.s3-website-us-east-1.amazonaws.com'
  ],
  credentials: true
}));
```

## 📊 **AWS Resources**

### **Current Resources:**
- **S3 Bucket:** `dicel-erp-production`
- **CloudFront Distribution:** `E144DEXER1WRP0`
- **Region:** `us-east-1`

### **Resources to Create:**
- **Elastic Beanstalk Environment:** `dicel-erp-backend`
- **RDS Database:** `dicel-erp-db` (optional for production)

## 💰 **Cost Estimation**

### **Current Costs:**
- **S3 Storage:** ~$0.02/month
- **CloudFront:** ~$0.01/month
- **Total Frontend:** ~$0.03/month

### **After Backend Deployment:**
- **Elastic Beanstalk (t3.micro):** ~$8-12/month
- **RDS (t3.micro):** ~$15-20/month (optional)
- **Total:** ~$8-32/month

## 🔍 **Testing**

### **Test Frontend:**
```bash
# Build and deploy frontend
npm run build
aws s3 sync dist/ s3://dicel-erp-production --delete
aws cloudfront create-invalidation --distribution-id E144DEXER1WRP0 --paths "/*"
```

### **Test Backend:**
```bash
# Test local backend
cd backend
npm start

# Test deployed backend (after deployment)
curl https://your-backend-url.elasticbeanstalk.com/api/health
```

## 🎯 **Next Steps**

1. **Deploy Backend:** Run `./deploy-backend.ps1`
2. **Update Frontend:** The script will automatically update the API URL
3. **Test Integration:** Verify all APIs work in production
4. **Monitor:** Set up CloudWatch alerts

## 📞 **Support**

### **Common Issues:**
1. **CORS Errors:** Backend CORS is configured for production URLs
2. **Database Connection:** Using local database for now
3. **API Timeouts:** 10-second timeout configured

### **Files Updated:**
- ✅ `backend/.ebextensions/01_environment.config`
- ✅ `backend/server.js` (CORS)
- ✅ `src/services/api.js` (API URL detection)
- ✅ `deploy-backend.ps1` (deployment script)

---

**Ready to deploy? Run `./deploy-backend.ps1` to deploy the complete application! 🚀** 