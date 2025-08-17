# 🚀 DICEL ERP - AWS ECS Console Setup Script

param(
    [string]$Region = "us-east-1",
    [string]$AccountId = "337909745823"
)

Write-Host "🚀 Setting up AWS infrastructure for DICEL ERP ECS deployment..." -ForegroundColor Cyan

# Configuration
$REGION = $Region
$ACCOUNT_ID = $AccountId

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Step 1: Create ECR repository
Write-Status "Creating ECR repository..."
try {
    aws ecr describe-repositories --repository-names dicel-erp-backend --region $REGION 2>$null
    Write-Status "ECR repository exists"
}
catch {
    aws ecr create-repository --repository-name dicel-erp-backend --region $REGION
    Write-Success "ECR repository created"
}

# Step 2: Create ECS cluster
Write-Status "Creating ECS cluster..."
try {
    aws ecs describe-clusters --clusters dicel-erp-cluster --region $REGION 2>$null
    Write-Status "ECS cluster exists"
}
catch {
    aws ecs create-cluster --cluster-name dicel-erp-cluster --region $REGION
    Write-Success "ECS cluster created"
}

# Step 3: Create CloudWatch log group
Write-Status "Creating CloudWatch log group..."
try {
    aws logs describe-log-groups --log-group-name-prefix "/ecs/dicel-erp-backend" --region $REGION 2>$null
    Write-Status "CloudWatch log group exists"
}
catch {
    aws logs create-log-group --log-group-name "/ecs/dicel-erp-backend" --region $REGION
    Write-Success "CloudWatch log group created"
}

# Step 4: Create IAM roles
Write-Status "Creating IAM roles..."

# Create task execution role
try {
    aws iam get-role --role-name ecsTaskExecutionRole 2>$null
    Write-Status "ECS task execution role exists"
}
catch {
    $trustPolicy = @{
        Version = "2012-10-17"
        Statement = @(
            @{
                Effect = "Allow"
                Principal = @{
                    Service = "ecs-tasks.amazonaws.com"
                }
                Action = "sts:AssumeRole"
            }
        )
    } | ConvertTo-Json -Depth 10

    $trustPolicy | Out-File -FilePath "trust-policy-ecs.json" -Encoding UTF8
    aws iam create-role --role-name ecsTaskExecutionRole --assume-role-policy-document file://trust-policy-ecs.json
    aws iam attach-role-policy --role-name ecsTaskExecutionRole --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
    Remove-Item "trust-policy-ecs.json" -Force
    Write-Success "ECS task execution role created"
}

# Create task role
try {
    aws iam get-role --role-name dicel-erp-task-role 2>$null
    Write-Status "DICEL ERP task role exists"
}
catch {
    $trustPolicy = @{
        Version = "2012-10-17"
        Statement = @(
            @{
                Effect = "Allow"
                Principal = @{
                    Service = "ecs-tasks.amazonaws.com"
                }
                Action = "sts:AssumeRole"
            }
        )
    } | ConvertTo-Json -Depth 10

    $trustPolicy | Out-File -FilePath "trust-policy-task.json" -Encoding UTF8
    aws iam create-role --role-name dicel-erp-task-role --assume-role-policy-document file://trust-policy-task.json
    Remove-Item "trust-policy-task.json" -Force
    Write-Success "DICEL ERP task role created"
}

# Step 5: Create Secrets Manager secrets
Write-Status "Creating Secrets Manager secrets..."

$secrets = @(
    "dicel-erp/db-host",
    "dicel-erp/db-port", 
    "dicel-erp/db-user",
    "dicel-erp/db-pass",
    "dicel-erp/db-name",
    "dicel-erp/jwt-secret",
    "dicel-erp/openai-api-key"
)

foreach ($secret in $secrets) {
    try {
        aws secretsmanager describe-secret --secret-id $secret --region $REGION 2>$null
        Write-Status "Secret $secret exists"
    }
    catch {
        $secretValue = switch ($secret) {
            "dicel-erp/db-host" { "localhost" }
            "dicel-erp/db-port" { "5432" }
            "dicel-erp/db-user" { "postgres" }
            "dicel-erp/db-pass" { "0123" }
            "dicel-erp/db-name" { "dicel_erp_production" }
            "dicel-erp/jwt-secret" { "5009d3bd3d3887a936f98af7952673cc7ffa787e50f2e6fbfdde840e23db717635ad62d7be98b7c0a2ecf249f124e58cd58b1cf2e78b87c88c68a9e2cbbb3068" }
            "dicel-erp/openai-api-key" { "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" }
        }
        
        $secretJson = @{
            SecretString = $secretValue
        } | ConvertTo-Json -Depth 10
        
        $secretJson | Out-File -FilePath "secret-value.json" -Encoding UTF8
        aws secretsmanager create-secret --name $secret --secret-string file://secret-value.json --region $REGION
        Remove-Item "secret-value.json" -Force
        Write-Success "Secret $secret created"
    }
}

Write-Success "AWS infrastructure setup completed!"
Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to AWS ECS Console: https://console.aws.amazon.com/ecs/" -ForegroundColor White
Write-Host "2. Select cluster: dicel-erp-cluster" -ForegroundColor White
Write-Host "3. Create Task Definition with the following settings:" -ForegroundColor White
Write-Host "   - Family: dicel-erp-backend" -ForegroundColor White
Write-Host "   - Launch type: FARGATE" -ForegroundColor White
Write-Host "   - Task memory: 1 GB" -ForegroundColor White
Write-Host "   - Task CPU: 0.5 vCPU" -ForegroundColor White
Write-Host "4. Add container with image: $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/dicel-erp-backend:latest" -ForegroundColor White
Write-Host "5. Create service from task definition" -ForegroundColor White
Write-Host ""
Write-Host "📚 See AWS-ECS-DEPLOYMENT-GUIDE.md for detailed steps" -ForegroundColor Cyan 