# 🚀 DICEL ERP Deployment Guide

## 📋 Overview

This guide will help you deploy the DICEL ERP system to production. The system consists of:
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + PostgreSQL
- **Database**: PostgreSQL with Sequelize ORM

## 🎯 Quick Deployment Options

### Option 1: Vercel + Render (Recommended)
- **Frontend**: Vercel (Free tier available)
- **Backend**: Render (Free tier available)
- **Database**: Render PostgreSQL (Free tier available)

### Option 2: Netlify + Render
- **Frontend**: Netlify (Free tier available)
- **Backend**: Render (Free tier available)
- **Database**: Render PostgreSQL (Free tier available)

### Option 3: GitHub Pages + Heroku
- **Frontend**: GitHub Pages (Free)
- **Backend**: Heroku (Paid plans only)
- **Database**: Heroku PostgreSQL (Paid plans only)

## 🚀 Step-by-Step Deployment

### 1. Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard
VITE_API_URL=https://your-backend-url.com/api/v1
```

### 2. Backend Deployment (Render)

```bash
# 1. Connect your GitHub repository to Render
# 2. Create a new Web Service in Render
# 3. Configure the service:
#    - Build Command: npm install
#    - Start Command: npm start
#    - Environment: Node
#    - Region: Choose closest to your users

# 4. Set environment variables in Render dashboard:
PORT=5000
NODE_ENV=production
JWT_SECRET=your-secret-key
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
FRONTEND_URL=https://your-frontend-url.com
```

### 3. Database Setup

#### Option A: Render PostgreSQL
1. Create a new PostgreSQL service in Render
2. Copy the connection string
3. Set database environment variables in your backend

#### Option B: Supabase
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your database URL
3. Set the `DATABASE_URL` environment variable

### 4. Environment Variables

#### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api/v1
VITE_APP_TITLE=DICEL ERP
VITE_APP_VERSION=1.0.0
```

#### Backend (.env)
```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-2024
JWT_EXPIRES_IN=24h
DB_HOST=your-db-host
DB_PORT=5432
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
FRONTEND_URL=https://your-frontend-url.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
LOG_LEVEL=info
```

## 🔧 Configuration

### 1. Update API URLs

After deployment, update the frontend API configuration:

```typescript
// src/services/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend-url.com/api/v1';
```

### 2. CORS Configuration

Ensure your backend allows requests from your frontend domain:

```javascript
// backend-new/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://your-frontend-url.com',
  credentials: true
}));
```

### 3. Database Migration

Run database migrations on your production database:

```bash
# Connect to your production database
# Run the seed data script
node seeders/chatSeedData.js
```

## 🧪 Testing Deployment

### 1. Test Frontend
- Visit your frontend URL
- Try logging in with demo credentials
- Test navigation between departments

### 2. Test Backend
- Check health endpoint: `GET /health`
- Test authentication: `POST /api/auth/login`
- Test API endpoints: `GET /api/v1/hr/employees`

### 3. Test Database
- Verify database connection
- Check if tables are created
- Test data insertion and retrieval

## 📊 Monitoring

### 1. Frontend Monitoring
- Use Vercel Analytics (if using Vercel)
- Monitor Core Web Vitals
- Check for JavaScript errors

### 2. Backend Monitoring
- Use Render monitoring tools
- Monitor API response times
- Check error logs

### 3. Database Monitoring
- Monitor database performance
- Check connection pool usage
- Monitor query performance

## 🔒 Security

### 1. Environment Variables
- Never commit `.env` files
- Use strong JWT secrets
- Rotate secrets regularly

### 2. CORS
- Configure CORS properly
- Only allow trusted domains
- Use HTTPS in production

### 3. Rate Limiting
- Implement rate limiting
- Monitor for abuse
- Set appropriate limits

## 🚨 Troubleshooting

### Common Issues

#### 1. CORS Errors
```javascript
// Fix CORS configuration
app.use(cors({
  origin: ['https://your-frontend-url.com', 'https://www.your-frontend-url.com'],
  credentials: true
}));
```

#### 2. Database Connection Issues
- Check database URL format
- Verify database credentials
- Ensure database is accessible

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

## 📞 Support

If you encounter issues:
1. Check the deployment platform logs
2. Verify environment variables
3. Test locally first
4. Check network connectivity
5. Review error messages carefully

## 🎉 Success!

Once deployed, your DICEL ERP system will be available at:
- **Frontend**: https://your-frontend-url.com
- **Backend**: https://your-backend-url.com
- **API Docs**: https://your-backend-url.com/api-docs

Test with demo credentials:
- **Admin**: admin@dicel.co.rw / admin123
- **HR**: hr.manager@dicel.co.rw / hr123
- **Finance**: finance.manager@dicel.co.rw / finance123
