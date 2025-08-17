# 🚀 DICEL ERP - AWS ECS/Fargate Deployment Guide

## 📋 **Professional AWS ECS/Fargate Setup**

### **Prerequisites:**
1. ✅ AWS CLI installed and configured
2. ✅ Docker Desktop installed
3. ✅ AWS account with appropriate permissions

### **Step 1: Install Docker Desktop**
1. Download from: https://www.docker.com/products/docker-desktop/
2. Install and restart your computer
3. Verify installation: `docker --version`

### **Step 2: AWS Console Setup (Alternative to CLI)**

#### **Option A: AWS Console (Recommended for first deployment)**

1. **Go to AWS ECS Console**: https://console.aws.amazon.com/ecs/
2. **Create Cluster**:
   - Click "Create Cluster"
   - Name: `dicel-erp-cluster`
   - Type: "Networking only (powered by AWS Fargate)"
   - Click "Create"

3. **Create ECR Repository**:
   - Go to ECR Console: https://console.aws.amazon.com/ecr/
   - Click "Create repository"
   - Name: `dicel-erp-backend`
   - Click "Create repository"

4. **Push Docker Image**:
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

5. **Create Task Definition**:
   - Go back to ECS Console
   - Click "Task Definitions" → "Create new Task Definition"
   - Launch type: "Fargate"
   - Task Definition Name: `dicel-erp-backend`
   - Task Role: Create new role `dicel-erp-task-role`
   - Task execution role: Create new role `ecsTaskExecutionRole`
   - Task memory: 1 GB
   - Task CPU: 0.5 vCPU

6. **Add Container**:
   - Name: `dicel-erp-backend`
   - Image: `337909745823.dkr.ecr.us-east-1.amazonaws.com/dicel-erp-backend:latest`
   - Port mappings: 8080
   - Environment variables:
     ```
     NODE_ENV=production
     PORT=8080
     CORS_ORIGIN=https://d2iq65q7bkruv1.cloudfront.net
     MAX_FILE_SIZE=10485760
     UPLOAD_PATH=./uploads/documents
     ```

7. **Create Service**:
   - Click "Create Service"
   - Launch type: "Fargate"
   - Service name: `dicel-erp-backend`
   - Desired number of tasks: 1
   - VPC: Default VPC
   - Subnets: Select 2 subnets
   - Security groups: Create new (allow port 8080)
   - Load balancer: Application Load Balancer (optional)

### **Step 3: Environment Variables & Secrets**

#### **Option A: Environment Variables (Simple)**
Add these in the task definition:
```
NODE_ENV=production
PORT=8080
DB_HOST=your-rds-endpoint
DB_PORT=5432
DB_USER=postgres
DB_PASS=your-password
DB_NAME=dicel_erp_production
JWT_SECRET=5009d3bd3d3887a936f98af7952673cc7ffa787e50f2e6fbfdde840e23db717635ad62d7be98b7c0a2ecf249f124e58cd58b1cf2e78b87c88c68a9e2cbbb3068
CORS_ORIGIN=https://d2iq65q7bkruv1.cloudfront.net
OPENAI_API_KEY=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
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads/documents
```

#### **Option B: AWS Secrets Manager (Professional)**
1. Go to AWS Secrets Manager Console
2. Create secrets for sensitive data
3. Reference them in task definition

### **Step 4: Database Setup**

#### **Option A: AWS RDS (Recommended)**
1. Go to RDS Console: https://console.aws.amazon.com/rds/
2. Create PostgreSQL instance
3. Configure security groups
4. Update DB_HOST in environment variables

#### **Option B: External Database**
Use your existing PostgreSQL database

### **Step 5: Monitoring & Logging**

1. **CloudWatch Logs**: Automatically configured
2. **Application Load Balancer**: For high availability
3. **Auto Scaling**: Configure based on CPU/memory usage

### **Step 6: Update Frontend**

Once deployed, update `src/services/api.js`:
```javascript
const getApiUrl = () => {
  if (window.location.hostname.includes('cloudfront.net') || 
      window.location.hostname.includes('amazonaws.com')) {
    return 'https://your-alb-url.us-east-1.elb.amazonaws.com/api';
  }
  return 'http://localhost:5000/api';
};
```

## 🔧 **Professional Features**

### **Security:**
- ✅ VPC isolation
- ✅ Security groups
- ✅ IAM roles and policies
- ✅ Secrets Manager integration
- ✅ SSL/TLS encryption

### **Scalability:**
- ✅ Auto-scaling based on metrics
- ✅ Load balancer distribution
- ✅ Multi-AZ deployment
- ✅ Blue-green deployments

### **Monitoring:**
- ✅ CloudWatch metrics
- ✅ Application logs
- ✅ Health checks
- ✅ Performance monitoring

## 💰 **Cost Estimation**

**Development/Testing:**
- ECS Fargate: ~$15-30/month
- RDS PostgreSQL: ~$20-40/month
- ALB: ~$20/month
- **Total: ~$55-90/month**

**Production:**
- ECS Fargate: ~$50-150/month
- RDS PostgreSQL: ~$100-300/month
- ALB: ~$20/month
- CloudWatch: ~$10-30/month
- **Total: ~$180-500/month**

## 🎯 **Next Steps**

1. **Install Docker Desktop**
2. **Follow AWS Console setup**
3. **Deploy your backend**
4. **Configure database**
5. **Update frontend**
6. **Test the complete system**

---

**Ready to deploy? Start with installing Docker Desktop! 🚀** 