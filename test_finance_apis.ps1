# Finance Backend API Test Script for PowerShell
# Run this script to test all Finance endpoints

$BaseUrl = "http://localhost:5000/api"

# Test configuration
$Tests = @(
    @{ Name = "Health Check"; Method = "GET"; Url = "/health" },
    
    # Transactions
    @{ Name = "Get All Transactions (Test)"; Method = "GET"; Url = "/transactions/test" },
    @{ Name = "Get Transaction Stats (Test)"; Method = "GET"; Url = "/transactions/test/stats" },
    
    # Accounts
    @{ Name = "Get All Accounts (Test)"; Method = "GET"; Url = "/accounts/test" },
    @{ Name = "Get Account Stats (Test)"; Method = "GET"; Url = "/accounts/test/stats" },
    
    # Vendors
    @{ Name = "Get All Vendors (Test)"; Method = "GET"; Url = "/vendors/test" },
    @{ Name = "Get Vendor Stats (Test)"; Method = "GET"; Url = "/vendors/test/stats" },
    
    # Customers
    @{ Name = "Get All Customers (Test)"; Method = "GET"; Url = "/customers/test" },
    @{ Name = "Get Customer Stats (Test)"; Method = "GET"; Url = "/customers/test/stats" },
    
    # Budgets
    @{ Name = "Get All Budgets (Test)"; Method = "GET"; Url = "/budgets/test" },
    @{ Name = "Get Budget Stats (Test)"; Method = "GET"; Url = "/budgets/test/stats" },
    
    # Expenses
    @{ Name = "Get All Expenses (Test)"; Method = "GET"; Url = "/expenses/test" },
    @{ Name = "Get Expense Stats (Test)"; Method = "GET"; Url = "/expenses/test/stats" },
    
    # Invoices
    @{ Name = "Get All Invoices (Test)"; Method = "GET"; Url = "/invoices/test" },
    @{ Name = "Get Invoice Stats (Test)"; Method = "GET"; Url = "/invoices/test/stats" },
    
    # Bills
    @{ Name = "Get All Bills (Test)"; Method = "GET"; Url = "/bills/test" },
    @{ Name = "Get Bill Stats (Test)"; Method = "GET"; Url = "/bills/test/stats" },
    
    # Tax Records
    @{ Name = "Get All Tax Records (Test)"; Method = "GET"; Url = "/tax-records/test" },
    @{ Name = "Get Tax Record Stats (Test)"; Method = "GET"; Url = "/tax-records/test/stats" }
)

function Test-Endpoint {
    param($Test)
    
    try {
        Write-Host "`n🧪 Testing: $($Test.Name)" -ForegroundColor Cyan
        Write-Host "📍 URL: $($Test.Method) $BaseUrl$($Test.Url)" -ForegroundColor Gray
        
        $Response = Invoke-WebRequest -Uri "$BaseUrl$($Test.Url)" -Method $Test.Method -TimeoutSec 10
        
        Write-Host "✅ Status: $($Response.StatusCode)" -ForegroundColor Green
        Write-Host "📊 Response Size: $($Response.Content.Length) characters" -ForegroundColor Gray
        
        # Parse JSON response
        $Data = $Response.Content | ConvertFrom-Json
        
        # Check if response has items array (for list endpoints)
        if ($Data.items) {
            Write-Host "📋 Items Count: $($Data.items.Count)" -ForegroundColor Yellow
            if ($Data.items.Count -gt 0) {
                Write-Host "📝 First Item ID: $($Data.items[0].id)" -ForegroundColor Gray
            }
        }
        
        # Check if response has total (for paginated endpoints)
        if ($Data.total -ne $null) {
            Write-Host "📈 Total Records: $($Data.total)" -ForegroundColor Yellow
        }
        
        return @{ Success = $true; Status = $Response.StatusCode; Data = $Data }
    }
    catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            Write-Host "📊 Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
        }
        return @{ Success = $false; Error = $_.Exception.Message }
    }
}

function Run-AllTests {
    Write-Host "🚀 Starting Finance Backend API Tests..." -ForegroundColor Green
    Write-Host ("=" * 60) -ForegroundColor Gray
    
    $Results = @()
    
    foreach ($Test in $Tests) {
        $Result = Test-Endpoint -Test $Test
        $Results += @{ Test = $Test; Result = $Result }
        
        # Small delay between tests
        Start-Sleep -Milliseconds 100
    }
    
    # Summary
    Write-Host "`n" + ("=" * 60) -ForegroundColor Gray
    Write-Host "📊 TEST SUMMARY" -ForegroundColor Green
    Write-Host ("=" * 60) -ForegroundColor Gray
    
    $Successful = ($Results | Where-Object { $_.Result.Success }).Count
    $Failed = ($Results | Where-Object { -not $_.Result.Success }).Count
    
    Write-Host "✅ Successful: $Successful" -ForegroundColor Green
    Write-Host "❌ Failed: $Failed" -ForegroundColor Red
    Write-Host "📈 Success Rate: $([math]::Round(($Successful / $Results.Count) * 100, 1))%" -ForegroundColor Yellow
    
    if ($Failed -gt 0) {
        Write-Host "`n❌ Failed Tests:" -ForegroundColor Red
        $Results | Where-Object { -not $_.Result.Success } | ForEach-Object {
            Write-Host "   - $($_.Test.Name): $($_.Result.Error)" -ForegroundColor Red
        }
    }
    
    Write-Host "`n🎉 Test completed!" -ForegroundColor Green
}

# Run the tests
Run-AllTests 