# 🚀 DICEL ERP Backend - AWS Deployment Guide

## 📋 **Current Status**
- ✅ **Frontend:** Deployed to AWS S3 + CloudFront
- ❌ **Backend:** Running locally only
- 🔄 **Database:** PostgreSQL (local)

## 🎯 **Deployment Options**

### **Option 1: AWS Elastic Beanstalk (Recommended)**
**Best for:** Full control, easy scaling, cost-effective

#### **Prerequisites:**
1. AWS CLI installed
2. EB CLI installed: `pip install awsebcli`
3. AWS credentials configured

#### **Quick Deploy:**
```bash
# 1. Install EB CLI
pip install awsebcli

# 2. Navigate to backend directory
cd backend

# 3. Initialize EB application
eb init dicel-erp --region us-east-1 --platform "Node.js 18"

# 4. Create environment
eb create dicel-erp-backend --instance-type t3.micro --single-instance

# 5. Deploy
eb deploy
```

#### **Manual Setup:**
1. **Create RDS Database:**
   ```bash
   aws rds create-db-instance \
     --db-instance-identifier dicel-erp-db \
     --db-instance-class db.t3.micro \
     --engine postgres \
     --master-username postgres \
     --master-user-password your-password \
     --allocated-storage 20
   ```

2. **Update Environment Variables:**
   - Edit `.ebextensions/01_environment.config`
   - Update database credentials
   - Set JWT secret

3. **Deploy:**
   ```bash
   eb deploy
   ```

### **Option 2: AWS Lambda + API Gateway (Serverless)**
**Best for:** Pay-per-use, automatic scaling

#### **Setup:**
1. **Install Serverless Framework:**
   ```bash
   npm install -g serverless
   ```

2. **Create serverless.yml:**
   ```yaml
   service: dicel-erp-backend
   
   provider:
     name: aws
     runtime: nodejs18.x
     region: us-east-1
     environment:
       DB_HOST: ${ssm:/dicel-erp/db-host}
       DB_USER: ${ssm:/dicel-erp/db-user}
       DB_PASS: ${ssm:/dicel-erp/db-pass}
       DB_NAME: ${ssm:/dicel-erp/db-name}
   
   functions:
     api:
       handler: server.handler
       events:
         - http:
             path: /{proxy+}
             method: ANY
   ```

3. **Deploy:**
   ```bash
   serverless deploy
   ```

### **Option 3: AWS App Runner (Fully Managed)**
**Best for:** Zero infrastructure management

#### **Setup:**
1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 8080
   CMD ["npm", "start"]
   ```

2. **Deploy via AWS Console:**
   - Go to AWS App Runner
   - Connect GitHub repository
   - Configure environment variables
   - Deploy

## 🔧 **Database Setup**

### **Option A: AWS RDS PostgreSQL**
```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier dicel-erp-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username postgres \
  --master-user-password your-secure-password \
  --allocated-storage 20 \
  --vpc-security-group-ids sg-xxxxxxxxx \
  --db-subnet-group-name your-subnet-group
```

### **Option B: AWS Aurora Serverless**
```bash
# Create Aurora cluster
aws rds create-db-cluster \
  --db-cluster-identifier dicel-erp-aurora \
  --engine aurora-postgresql \
  --master-username postgres \
  --master-user-password your-password \
  --serverless-v2-scaling-configuration MinCapacity=0.5,MaxCapacity=1
```

## 🌐 **Environment Configuration**

### **Production Environment Variables:**
```bash
NODE_ENV=production
PORT=8080
DB_HOST=your-rds-endpoint.amazonaws.com
DB_PORT=5432
DB_USER=postgres
DB_PASS=your-secure-password
DB_NAME=dicel_erp_production
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=https://d2iq65q7bkruv1.cloudfront.net
```

### **Update Frontend API URL:**
After deploying the backend, update `src/services/api.js`:
```javascript
const getApiUrl = () => {
  if (window.location.hostname.includes('cloudfront.net')) {
    return 'https://your-backend-url.elasticbeanstalk.com/api';
  }
  return 'http://localhost:5000/api';
};
```

## 🚀 **Quick Deploy Script**

### **For Elastic Beanstalk:**
```bash
# Run the deployment script
./deploy-backend.ps1
```

### **For Lambda:**
```bash
# Install dependencies
cd backend
npm install

# Deploy
serverless deploy
```

## 📊 **Cost Estimation**

### **Elastic Beanstalk:**
- **t3.micro instance:** ~$8-12/month
- **RDS t3.micro:** ~$15-20/month
- **Total:** ~$25-35/month

### **Lambda + API Gateway:**
- **Lambda:** ~$1-5/month (pay-per-use)
- **API Gateway:** ~$1-3/month
- **RDS t3.micro:** ~$15-20/month
- **Total:** ~$20-30/month

### **App Runner:**
- **1 vCPU, 2 GB RAM:** ~$30-40/month
- **RDS t3.micro:** ~$15-20/month
- **Total:** ~$45-60/month

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **CORS Errors:**
   ```javascript
   // Update CORS configuration in server.js
   app.use(cors({
     origin: ['https://d2iq65q7bkruv1.cloudfront.net'],
     credentials: true
   }));
   ```

2. **Database Connection:**
   - Check security groups
   - Verify credentials
   - Ensure RDS is publicly accessible (for testing)

3. **Environment Variables:**
   - Verify all variables are set
   - Check for typos
   - Restart environment after changes

## 🎯 **Recommended Next Steps**

1. **Deploy Backend:** Choose Elastic Beanstalk for simplicity
2. **Set up Database:** Create RDS PostgreSQL instance
3. **Update Frontend:** Point to new backend URL
4. **Test Integration:** Verify all APIs work
5. **Monitor:** Set up CloudWatch alerts

## 📞 **Need Help?**

- **AWS Documentation:** https://docs.aws.amazon.com/elasticbeanstalk/
- **EB CLI Guide:** https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html
- **RDS Setup:** https://docs.aws.amazon.com/rds/

---

**Ready to deploy? Choose your preferred option and follow the steps above! 🚀** 