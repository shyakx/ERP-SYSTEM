# 🚀 DICEL ERP - GitHub to AWS Deployment Guide

## 📋 **Repository Information**
- **GitHub Repository**: https://github.com/shyakx/ERP-SYSTEM.git
- **Branch**: main
- **Project**: DICEL ERP System

## 🎯 **Deployment Options**

### **Option 1: AWS App Runner (Recommended - Easiest)**

**Perfect for**: Backend deployment
**Setup Time**: 5 minutes
**Cost**: Pay-per-use (~$5-15/month)

#### **Step-by-Step Setup:**

1. **Go to AWS App Runner Console**
   - Visit: https://console.aws.amazon.com/apprunner/
   - Click "Create service"

2. **Connect GitHub Repository**
   - Choose "Source code repository"
   - Click "Connect your GitHub account"
   - Authorize AWS to access your repositories
   - Select repository: `shyakx/ERP-SYSTEM`
   - Select branch: `main`

3. **Configure Build Settings**
   - **Build command**: `cd backend && npm install`
   - **Start command**: `cd backend && npm start`
   - **Port**: 8080

4. **Configure Environment Variables**
   ```
   NODE_ENV=production
   PORT=8080
   DB_HOST=localhost
   DB_PORT=5434
   DB_USER=postgres
   DB_PASS=0123
   DB_NAME=dicel_erp_development
   JWT_SECRET=5009d3bd3d3887a936f98af7952673cc7ffa787e50f2e6fbfdde840e23db717635ad62d7be98b7c0a2ecf249f124e58cd58b1cf2e78b87c88c68a9e2cbbb3068
   CORS_ORIGIN=https://d2iq65q7bkruv1.cloudfront.net
   OPENAI_API_KEY=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
   MAX_FILE_SIZE=10485760
   UPLOAD_PATH=./uploads/documents
   ```

5. **Deploy**
   - Click "Create & deploy"
   - Wait for deployment to complete (~5-10 minutes)

6. **Get Your Backend URL**
   - Copy the App Runner URL (e.g., `https://abc123.apprunner.aws.com`)
   - Update frontend configuration with this URL

### **Option 2: AWS Amplify (Full-Stack)**

**Perfect for**: Frontend + Backend deployment
**Setup Time**: 10 minutes
**Cost**: Free tier + pay-per-use

#### **Step-by-Step Setup:**

1. **Go to AWS Amplify Console**
   - Visit: https://console.aws.amazon.com/amplify/
   - Click "New app" → "Host web app"

2. **Connect GitHub Repository**
   - Choose "GitHub"
   - Connect your GitHub account
   - Select repository: `shyakx/ERP-SYSTEM`
   - Select branch: `main`

3. **Configure Build Settings**
   - Choose "Create a new build configuration"
   - Use this buildspec.yml:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - echo "Installing frontend dependencies..."
        - npm ci
    build:
      commands:
        - echo "Building frontend..."
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*

backend:
  phases:
    preBuild:
      commands:
        - echo "Installing backend dependencies..."
        - cd backend
        - npm ci
    build:
      commands:
        - echo "Building backend..."
        - npm start
  artifacts:
    baseDirectory: backend
    files:
      - '**/*'
      - '!node_modules/**/*'
```

4. **Deploy**
   - Click "Save and deploy"
   - Wait for deployment to complete

### **Option 3: AWS CodePipeline + Elastic Beanstalk**

**Perfect for**: Enterprise-grade CI/CD
**Setup Time**: 15 minutes

#### **Step-by-Step Setup:**

1. **Create buildspec.yml in your repository root:**

```yaml
version: 0.2

phases:
  pre_build:
    commands:
      - echo "Installing backend dependencies..."
      - cd backend
      - npm install
  build:
    commands:
      - echo "Building backend..."
      - npm run build
  post_build:
    commands:
      - echo "Creating deployment package..."
      - cd ..
      - zip -r backend-deployment.zip backend/ -x "backend/node_modules/*"
artifacts:
  files:
    - backend-deployment.zip
```

2. **Go to AWS CodePipeline**
   - Visit: https://console.aws.amazon.com/codepipeline/
   - Click "Create pipeline"

3. **Configure Pipeline**
   - **Source**: GitHub (version 2)
     - Repository: `shyakx/ERP-SYSTEM`
     - Branch: `main`
   - **Build**: AWS CodeBuild
     - Use buildspec.yml
   - **Deploy**: AWS Elastic Beanstalk
     - Application: `dicel-erp`
     - Environment: `dicel-erp-backend`

## 🔧 **Frontend Configuration Update**

After deploying your backend, update the API configuration:

1. **Get your backend URL** from the deployment
2. **Update `src/services/api.js`**:

```javascript
const getApiUrl = () => {
  // Production (AWS App Runner or Elastic Beanstalk)
  if (window.location.hostname.includes('cloudfront.net') || 
      window.location.hostname.includes('s3-website') ||
      window.location.hostname.includes('amazonaws.com') ||
      window.location.hostname.includes('apprunner.aws') ||
      window.location.hostname.includes('elasticbeanstalk.com')) {
    // Replace with your actual backend URL
    return 'https://your-backend-url.apprunner.aws.com/api';
  }
  // Development
  return 'http://localhost:5000/api';
};
```

3. **Deploy updated frontend**:
   ```bash
   npm run build
   aws s3 sync dist/ s3://dicel-erp-production --delete
   aws cloudfront create-invalidation --distribution-id E144DEXER1WRP0 --paths "/*"
   ```

## 🚀 **Automatic Deployment**

Once set up, your deployment will be automatic:

1. **Push changes to GitHub** → `git push origin main`
2. **AWS automatically detects changes**
3. **Builds and deploys automatically**
4. **Your app is updated in minutes**

## 📊 **Monitoring & Management**

### **AWS App Runner**
- **Console**: https://console.aws.amazon.com/apprunner/
- **Logs**: Available in the console
- **Metrics**: CPU, memory, requests

### **AWS Amplify**
- **Console**: https://console.aws.amazon.com/amplify/
- **Build logs**: Available for each deployment
- **Branch management**: Multiple environments

### **AWS CodePipeline**
- **Console**: https://console.aws.amazon.com/codepipeline/
- **Pipeline status**: Real-time monitoring
- **Deployment history**: Complete audit trail

## 💰 **Cost Estimation**

### **AWS App Runner**
- **Free tier**: 750 hours/month
- **After free tier**: ~$0.064/hour
- **Monthly cost**: ~$5-15 (depending on usage)

### **AWS Amplify**
- **Free tier**: 1,000 build minutes/month
- **After free tier**: $0.01/build minute
- **Monthly cost**: ~$2-10

### **AWS CodePipeline + Elastic Beanstalk**
- **Pipeline**: $1/month per active pipeline
- **Elastic Beanstalk**: ~$8-12/month (t3.micro)
- **Total**: ~$9-13/month

## 🎯 **Recommended Approach**

For your DICEL ERP project, I recommend **AWS App Runner** because:

✅ **Simple Setup**: 5-minute deployment
✅ **Automatic Scaling**: Handles traffic spikes
✅ **GitHub Integration**: Automatic deployments
✅ **Cost Effective**: Pay only for what you use
✅ **Managed Service**: No server management

## 🔄 **Next Steps**

1. **Choose your deployment method** (App Runner recommended)
2. **Follow the step-by-step guide above**
3. **Update frontend configuration with backend URL**
4. **Test the complete system**
5. **Monitor and optimize**

## 📞 **Support**

If you encounter any issues:
1. Check AWS Console logs
2. Verify environment variables
3. Test backend locally first
4. Check GitHub repository permissions

---

**Ready to deploy? Choose your preferred method and follow the guide above! 🚀** 