# 🚀 AWS Quick Start - DICEL ERP

## ⚡ **5-Minute Deployment**

### **Step 1: Install AWS CLI**
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

### **Step 2: Configure AWS**
```bash
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key  
# Enter your region (e.g., us-east-1)
# Enter output format (json)
```

### **Step 3: Deploy with One Command**

#### **Windows (PowerShell):**
```powershell
.\deploy.ps1
```

#### **Linux/macOS:**
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🎯 **What the Script Does**

1. ✅ **Checks AWS CLI** and credentials
2. ✅ **Builds** your React application
3. ✅ **Creates S3 bucket** with website hosting
4. ✅ **Uploads** all files to S3
5. ✅ **Creates CloudFront** distribution for CDN
6. ✅ **Invalidates cache** for instant updates
7. ✅ **Provides live URL** for your application

## 🌐 **Your Application Will Be Live At:**

```
https://[random-id].cloudfront.net
```

## 📊 **Monitor Your Deployment:**

- **CloudFront Console:** https://console.aws.amazon.com/cloudfront/home
- **S3 Console:** https://console.aws.amazon.com/s3/home
- **Cost Monitor:** https://console.aws.amazon.com/billing/home

## 💰 **Estimated Monthly Cost:**

- **S3 Storage:** ~$0.02/month
- **CloudFront:** ~$0.50-2.00/month
- **Total:** ~$1-5/month

## 🔄 **Update Your Deployment:**

Simply run the same command again:
```bash
./deploy.sh  # or .\deploy.ps1 on Windows
```

## 🆘 **Need Help?**

### **Common Issues:**

1. **"AWS CLI not found"**
   - Install AWS CLI from: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

2. **"Credentials not configured"**
   - Run: `aws configure`
   - Get credentials from: https://console.aws.amazon.com/iam/home

3. **"Bucket name already exists"**
   - Edit the script to use a different bucket name
   - Or delete the existing bucket

4. **"Build failed"**
   - Run: `npm install && npm run build`
   - Check for TypeScript errors

### **Get AWS Credentials:**

1. Go to [AWS Console](https://console.aws.amazon.com)
2. Click your username → "Security credentials"
3. Create new access key
4. Copy Access Key ID and Secret Access Key

---

## 🚀 **Ready to Deploy?**

**Just run one command:**

```bash
# Windows
.\deploy.ps1

# Linux/macOS  
./deploy.sh
```

**Your DICEL ERP will be live in 5 minutes!** 🎉 