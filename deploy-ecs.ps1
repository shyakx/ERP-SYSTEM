# 🚀 DICEL ERP - AWS ECS/Fargate Deployment Script

param(
    [string]$Region = "us-east-1",
    [string]$AccountId = "337909745823",
    [string]$ClusterName = "dicel-erp-cluster",
    [string]$ServiceName = "dicel-erp-backend",
    [string]$ImageName = "dicel-erp-backend"
)

# Stop on any error
$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting DICEL ERP Backend deployment to AWS ECS/Fargate..." -ForegroundColor Cyan

# Configuration
$REGION = $Region
$ACCOUNT_ID = $AccountId
$CLUSTER_NAME = $ClusterName
$SERVICE_NAME = $ServiceName
$IMAGE_NAME = $ImageName
$ECR_REPO = "$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$IMAGE_NAME"

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

# Check AWS CLI
Write-Status "Checking AWS CLI..."
try {
    $null = aws --version
    Write-Success "AWS CLI is installed"
}
catch {
    Write-Error "AWS CLI not found. Please install it first."
    exit 1
}

# Check AWS credentials
Write-Status "Checking AWS credentials..."
try {
    $null = aws sts get-caller-identity
    Write-Success "AWS credentials are valid"
}
catch {
    Write-Error "AWS credentials not configured. Please run 'aws configure' first."
    exit 1
}

# Step 1: Create ECR repository
Write-Status "Creating ECR repository..."
try {
    aws ecr describe-repositories --repository-names $IMAGE_NAME --region $REGION 2>$null
    Write-Status "ECR repository exists"
}
catch {
    aws ecr create-repository --repository-name $IMAGE_NAME --region $REGION
    Write-Success "ECR repository created"
}

# Step 2: Login to ECR
Write-Status "Logging in to ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_REPO

# Step 3: Build Docker image
Write-Status "Building Docker image..."
docker build -t $IMAGE_NAME .
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to build Docker image"
    exit 1
}
Write-Success "Docker image built"

# Step 4: Tag and push image
Write-Status "Tagging and pushing Docker image..."
docker tag $IMAGE_NAME`:latest $ECR_REPO`:latest
docker push $ECR_REPO`:latest
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to push Docker image"
    exit 1
}
Write-Success "Docker image pushed to ECR"

# Step 5: Create ECS cluster
Write-Status "Creating ECS cluster..."
try {
    aws ecs describe-clusters --clusters $CLUSTER_NAME --region $REGION 2>$null
    Write-Status "ECS cluster exists"
}
catch {
    aws ecs create-cluster --cluster-name $CLUSTER_NAME --region $REGION
    Write-Success "ECS cluster created"
}

# Step 6: Create CloudWatch log group
Write-Status "Creating CloudWatch log group..."
try {
    aws logs describe-log-groups --log-group-name-prefix "/ecs/$SERVICE_NAME" --region $REGION 2>$null
    Write-Status "CloudWatch log group exists"
}
catch {
    aws logs create-log-group --log-group-name "/ecs/$SERVICE_NAME" --region $REGION
    Write-Success "CloudWatch log group created"
}

# Step 7: Create IAM roles
Write-Status "Creating IAM roles..."

# Create task execution role
try {
    aws iam get-role --role-name ecsTaskExecutionRole 2>$null
    Write-Status "ECS task execution role exists"
}
catch {
    # Create trust policy
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

# Step 8: Create Secrets Manager secrets
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

# Step 9: Update task definition
Write-Status "Updating task definition..."
$taskDefContent = Get-Content "ecs-task-definition.json" -Raw
$taskDefContent = $taskDefContent -replace "ACCOUNT_ID", $ACCOUNT_ID
$taskDefContent | Out-File -FilePath "ecs-task-definition-updated.json" -Encoding UTF8

aws ecs register-task-definition --cli-input-json file://ecs-task-definition-updated.json --region $REGION
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to register task definition"
    exit 1
}
Write-Success "Task definition registered"

# Step 10: Create ECS service
Write-Status "Creating ECS service..."
try {
    aws ecs describe-services --cluster $CLUSTER_NAME --services $SERVICE_NAME --region $REGION 2>$null
    Write-Status "ECS service exists, updating..."
    aws ecs update-service --cluster $CLUSTER_NAME --service $SERVICE_NAME --task-definition $SERVICE_NAME --region $REGION
}
catch {
    # Create default VPC and subnets if needed
    $vpc = aws ec2 describe-vpcs --filters "Name=is-default,Values=true" --query 'Vpcs[0].VpcId' --output text --region $REGION
    $subnets = aws ec2 describe-subnets --filters "Name=vpc-id,Values=$vpc" --query 'Subnets[0:2].SubnetId' --output text --region $REGION
    $subnetArray = $subnets -split "`t"
    
    aws ecs create-service `
        --cluster $CLUSTER_NAME `
        --service-name $SERVICE_NAME `
        --task-definition $SERVICE_NAME `
        --desired-count 1 `
        --launch-type FARGATE `
        --network-configuration "awsvpcConfiguration={subnets=[$($subnetArray[0]),$($subnetArray[1])],securityGroups=[sg-default],assignPublicIp=ENABLED}" `
        --region $REGION
    
    Write-Success "ECS service created"
}

Write-Success "Deployment completed successfully!"
Write-Host "🌐 Your ECS service is now running!" -ForegroundColor Green
Write-Host "📊 Monitor: https://console.aws.amazon.com/ecs/home" -ForegroundColor Yellow
Write-Host "📝 Logs: https://console.aws.amazon.com/cloudwatch/home" -ForegroundColor Yellow

# Clean up
Remove-Item "ecs-task-definition-updated.json" -Force -ErrorAction SilentlyContinue 