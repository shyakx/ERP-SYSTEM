# 🚀 DICEL ERP - AWS Console Setup Guide

## ✅ **Infrastructure Ready!**

Your AWS infrastructure has been successfully created:
- ✅ ECR Repository: `dicel-erp-backend`
- ✅ ECS Cluster: `dicel-erp-cluster`
- ✅ CloudWatch Log Group: `/ecs/dicel-erp-backend`
- ✅ IAM Roles: `ecsTaskExecutionRole`, `dicel-erp-task-role`
- ✅ Secrets Manager: All secrets created

## 🎯 **Next Steps: AWS Console Setup**

### **Step 1: Build and Push Docker Image**

Since Docker isn't installed locally, we'll use AWS CodeBuild:

1. **Go to AWS CodeBuild Console**: https://console.aws.amazon.com/codesuite/codebuild/home
2. **Click "Create build project"**
3. **Configure:**
   - **Project name**: `dicel-erp-backend-build`
   - **Source**: GitHub (connect your repository: `shyakx/ERP-SYSTEM`)
   - **Environment**: Use a managed image, Ubuntu, Standard, aws/codebuild/standard:7.0
   - **Service role**: Create new service role
   - **Buildspec**: Use a buildspec file
4. **Click "Create build project"**

### **Step 2: Create Task Definition**

1. **Go to ECS Console**: https://console.aws.amazon.com/ecs/
2. **Click "Task Definitions" → "Create new Task Definition"**
3. **Configure:**
   - **Launch type compatibility**: FARGATE
   - **Task Definition Name**: `dicel-erp-backend`
   - **Task Role**: `dicel-erp-task-role`
   - **Task execution role**: `ecsTaskExecutionRole`
   - **Task memory**: 1 GB
   - **Task CPU**: 0.5 vCPU

4. **Add Container:**
   - **Container name**: `dicel-erp-backend`
   - **Image**: `337909745823.dkr.ecr.us-east-1.amazonaws.com/dicel-erp-backend:latest`
   - **Port mappings**: 8080
   - **Environment variables**:
     ```
     NODE_ENV=production
     PORT=8080
     CORS_ORIGIN=https://d2iq65q7bkruv1.cloudfront.net
     MAX_FILE_SIZE=10485760
     UPLOAD_PATH=./uploads/documents
     ```
   - **Secrets** (from Secrets Manager):
     ```
     DB_HOST=dicel-erp/db-host
     DB_PORT=dicel-erp/db-port
     DB_USER=dicel-erp/db-user
     DB_PASS=dicel-erp/db-pass
     DB_NAME=dicel-erp/db-name
     JWT_SECRET=dicel-erp/jwt-secret
     OPENAI_API_KEY=dicel-erp/openai-api-key
     ```
   - **Log configuration**: awslogs
   - **Log group**: `/ecs/dicel-erp-backend`
   - **Log stream prefix**: `ecs`

5. **Click "Create"**

### **Step 3: Create ECS Service**

1. **Go to your cluster**: `dicel-erp-cluster`
2. **Click "Create Service"**
3. **Configure:**
   - **Launch type**: FARGATE
   - **Task Definition**: `dicel-erp-backend`
   - **Service name**: `dicel-erp-backend`
   - **Desired number of tasks**: 1
   - **VPC**: Default VPC
   - **Subnets**: Select 2 subnets
   - **Security groups**: Create new (allow port 8080)
   - **Load balancer**: Application Load Balancer (optional)

4. **Click "Create Service"**

### **Step 4: Alternative - Use AWS CodePipeline**

For automated deployment from GitHub:

1. **Go to CodePipeline Console**: https://console.aws.amazon.com/codepipeline/
2. **Click "Create pipeline"**
3. **Configure:**
   - **Pipeline name**: `dicel-erp-backend-pipeline`
   - **Source**: GitHub (Version 2)
   - **Build**: AWS CodeBuild
   - **Deploy**: Amazon ECS

## 🔧 **Manual Docker Build (If Docker is installed)**

If you install Docker Desktop later:

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 337909745823.dkr.ecr.us-east-1.amazonaws.com

# Build image
docker build -t dicel-erp-backend .

# Tag image
docker tag dicel-erp-backend:latest 337909745823.dkr.ecr.us-east-1.amazonaws.com/dicel-erp-backend:latest

# Push image
docker push 337909745823.dkr.ecr.us-east-1.amazonaws.com/dicel-erp-backend:latest
```

## 📊 **Monitoring Your Deployment**

1. **ECS Console**: Monitor service health and logs
2. **CloudWatch**: View application logs and metrics
3. **ECR Console**: Manage Docker images

## 🌐 **Access Your Application**

Once deployed, your backend will be available at:
- **ECS Service URL**: `http://your-service-url:8080`
- **Health Check**: `http://your-service-url:8080/api/health`

## 🔄 **Update Frontend**

Update `src/services/api.js`:
```javascript
const getApiUrl = () => {
  if (window.location.hostname.includes('cloudfront.net') || 
      window.location.hostname.includes('amazonaws.com')) {
    return 'http://your-ecs-service-url:8080/api';
  }
  return 'http://localhost:5000/api';
};
```

## 🎯 **Quick Start Options**

### **Option A: Use AWS CodeBuild (Recommended)**
1. Follow Step 1 above
2. Connect your GitHub repository
3. Build will automatically create and push Docker image

### **Option B: Manual Console Setup**
1. Follow Steps 2-3 above
2. Use a pre-built image or build manually

### **Option C: Install Docker Desktop**
1. Download from: https://www.docker.com/products/docker-desktop/
2. Follow the manual Docker build steps

---

**🚀 Ready to deploy? Choose your preferred option and let's get your DICEL ERP backend running!** 