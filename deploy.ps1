# DICEL ERP Deployment Script
# This script helps deploy the DICEL ERP system to various platforms

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("vercel", "netlify", "render", "heroku")]
    [string]$Platform,
    
    [Parameter(Mandatory=$false)]
    [string]$Environment = "production"
)

Write-Host "🚀 DICEL ERP Deployment Script" -ForegroundColor Green
Write-Host "Platform: $Platform" -ForegroundColor Yellow
Write-Host "Environment: $Environment" -ForegroundColor Yellow

# Build frontend
Write-Host "📦 Building frontend..." -ForegroundColor Blue
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Frontend build successful!" -ForegroundColor Green

# Deploy based on platform
switch ($Platform) {
    "vercel" {
        Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Blue
        Write-Host "1. Install Vercel CLI: npm i -g vercel" -ForegroundColor Yellow
        Write-Host "2. Run: vercel --prod" -ForegroundColor Yellow
        Write-Host "3. Set environment variables in Vercel dashboard" -ForegroundColor Yellow
    }
    "netlify" {
        Write-Host "🌐 Deploying to Netlify..." -ForegroundColor Blue
        Write-Host "1. Install Netlify CLI: npm i -g netlify-cli" -ForegroundColor Yellow
        Write-Host "2. Run: netlify deploy --prod --dir=dist" -ForegroundColor Yellow
        Write-Host "3. Set environment variables in Netlify dashboard" -ForegroundColor Yellow
    }
    "render" {
        Write-Host "🎨 Deploying to Render..." -ForegroundColor Blue
        Write-Host "1. Connect your GitHub repository to Render" -ForegroundColor Yellow
        Write-Host "2. Create a new Web Service" -ForegroundColor Yellow
        Write-Host "3. Set build command: npm install" -ForegroundColor Yellow
        Write-Host "4. Set start command: npm start" -ForegroundColor Yellow
        Write-Host "5. Set environment variables in Render dashboard" -ForegroundColor Yellow
    }
    "heroku" {
        Write-Host "🟣 Deploying to Heroku..." -ForegroundColor Blue
        Write-Host "1. Install Heroku CLI" -ForegroundColor Yellow
        Write-Host "2. Run: heroku create your-app-name" -ForegroundColor Yellow
        Write-Host "3. Run: git push heroku main" -ForegroundColor Yellow
        Write-Host "4. Set environment variables: heroku config:set VAR=value" -ForegroundColor Yellow
    }
}

Write-Host "📋 Next Steps:" -ForegroundColor Green
Write-Host "1. Deploy backend to: $Platform" -ForegroundColor White
Write-Host "2. Set up database (PostgreSQL)" -ForegroundColor White
Write-Host "3. Configure environment variables" -ForegroundColor White
Write-Host "4. Test the deployment" -ForegroundColor White
Write-Host "5. Update frontend API URLs" -ForegroundColor White

Write-Host "✅ Deployment preparation complete!" -ForegroundColor Green
