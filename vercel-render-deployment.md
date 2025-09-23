# 🚀 DICEL ERP - Vercel + Render Deployment Guide

## 📋 Overview

This guide will help you deploy the DICEL ERP system using:
- **Frontend**: Vercel (Free tier available)
- **Backend**: Render (Free tier available)
- **Database**: Render PostgreSQL (Free tier available)

## 🎯 Prerequisites

1. GitHub repository with your code
2. Vercel account (free)
3. Render account (free)
4. Node.js 16+ installed locally

## 🚀 Step-by-Step Deployment

### 1. Frontend Deployment (Vercel)

#### Option A: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel --prod

# Set environment variables
vercel env add VITE_API_URL
# Enter: https://your-render-backend-url.onrender.com/api/v1
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables:
   - `VITE_API_URL`: `https://your-render-backend-url.onrender.com/api/v1`

### 2. Backend Deployment (Render)

#### Step 1: Create Web Service
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `dicel-erp-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend-new`

#### Step 2: Set Environment Variables
In Render dashboard, add these environment variables:
```
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-2024
JWT_EXPIRES_IN=24h
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
LOG_LEVEL=info
```

### 3. Database Setup (Render PostgreSQL)

#### Step 1: Create PostgreSQL Service
1. In Render dashboard, click "New +" → "PostgreSQL"
2. Configure the database:
   - **Name**: `dicel-erp-database`
   - **Database**: `dicel_erp`
   - **User**: `dicel_user`
   - **Region**: Choose closest to your users

#### Step 2: Get Database Connection Details
1. Go to your PostgreSQL service
2. Copy the connection details:
   - **Host**: `dpg-xxxxx-a.oregon-postgres.render.com`
   - **Port**: `5432`
   - **Database**: `dicel_erp`
   - **User**: `dicel_user`
   - **Password**: `your-password`

#### Step 3: Update Backend Environment Variables
Add these to your backend service in Render:
```
DB_HOST=dpg-xxxxx-a.oregon-postgres.render.com
DB_PORT=5432
DB_NAME=dicel_erp
DB_USER=dicel_user
DB_PASSWORD=your-password
```

### 4. Database Migration

#### Option A: Using Render Shell
1. Go to your backend service in Render
2. Click "Shell"
3. Run the seed data script:
```bash
node seeders/chatSeedData.js
```

#### Option B: Local Migration
1. Set up local environment with production database
2. Run migration locally:
```bash
cd backend-new
node seeders/chatSeedData.js
```

## 🔧 Configuration Updates

### 1. Update Frontend API URL
After backend deployment, update your frontend environment variable:
```
VITE_API_URL=https://dicel-erp-backend.onrender.com/api/v1
```

### 2. Update Backend CORS
Ensure your backend allows requests from Vercel:
```javascript
// backend-new/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://your-vercel-app.vercel.app',
  credentials: true
}));
```

## 🧪 Testing Deployment

### 1. Test Frontend
- Visit your Vercel URL
- Try logging in with demo credentials
- Test navigation between departments

### 2. Test Backend
- Check health endpoint: `GET https://your-backend.onrender.com/health`
- Test authentication: `POST https://your-backend.onrender.com/api/auth/login`
- Test API endpoints: `GET https://your-backend.onrender.com/api/v1/hr/employees`

### 3. Test Database
- Verify database connection in backend logs
- Check if tables are created
- Test data insertion and retrieval

## 📊 Monitoring

### Frontend (Vercel)
- Use Vercel Analytics
- Monitor Core Web Vitals
- Check for JavaScript errors

### Backend (Render)
- Use Render monitoring dashboard
- Monitor API response times
- Check error logs

### Database (Render)
- Monitor database performance
- Check connection pool usage
- Monitor query performance

## 🔒 Security

### Environment Variables
- Never commit `.env` files
- Use strong JWT secrets
- Rotate secrets regularly

### CORS
- Configure CORS properly
- Only allow trusted domains
- Use HTTPS in production

### Rate Limiting
- Implement rate limiting
- Monitor for abuse
- Set appropriate limits

## 🚨 Troubleshooting

### Common Issues

#### 1. CORS Errors
```javascript
// Fix CORS configuration
app.use(cors({
  origin: [
    'https://your-vercel-app.vercel.app',
    'https://www.your-vercel-app.vercel.app'
  ],
  credentials: true
}));
```

#### 2. Database Connection Issues
- Check database URL format
- Verify database credentials
- Ensure database is accessible from Render

#### 3. Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 4. Environment Variables Not Loading
- Check variable names (case-sensitive)
- Ensure variables are set in deployment platform
- Restart the application after setting variables

## 🎉 Success!

Once deployed, your DICEL ERP system will be available at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **API Docs**: `https://your-backend.onrender.com/api-docs`

### Demo Credentials
- **Admin**: `admin@dicel.co.rw` / `admin123`
- **HR**: `hr.manager@dicel.co.rw` / `hr123`
- **Finance**: `finance.manager@dicel.co.rw` / `finance123`

## 📞 Support

If you encounter issues:
1. Check the deployment platform logs
2. Verify environment variables
3. Test locally first
4. Check network connectivity
5. Review error messages carefully

## 💰 Cost Estimation

### Free Tier Limits
- **Vercel**: 100GB bandwidth/month, unlimited deployments
- **Render**: 750 hours/month, 512MB RAM
- **Render PostgreSQL**: 1GB storage, 1 connection

### Paid Plans (if needed)
- **Vercel Pro**: $20/month
- **Render Starter**: $7/month
- **Render PostgreSQL**: $7/month

Total estimated cost for production: **$34/month**
