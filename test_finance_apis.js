import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// Test configuration
const tests = [
  // Health Check
  { name: 'Health Check', method: 'GET', url: '/health' },
  
  // Transactions
  { name: 'Get All Transactions (Test)', method: 'GET', url: '/transactions/test' },
  { name: 'Get Transaction Stats (Test)', method: 'GET', url: '/transactions/test/stats' },
  
  // Accounts
  { name: 'Get All Accounts (Test)', method: 'GET', url: '/accounts/test' },
  { name: 'Get Account Stats (Test)', method: 'GET', url: '/accounts/test/stats' },
  
  // Vendors
  { name: 'Get All Vendors (Test)', method: 'GET', url: '/vendors/test' },
  { name: 'Get Vendor Stats (Test)', method: 'GET', url: '/vendors/test/stats' },
  
  // Customers
  { name: 'Get All Customers (Test)', method: 'GET', url: '/customers/test' },
  { name: 'Get Customer Stats (Test)', method: 'GET', url: '/customers/test/stats' },
  
  // Budgets
  { name: 'Get All Budgets (Test)', method: 'GET', url: '/budgets/test' },
  { name: 'Get Budget Stats (Test)', method: 'GET', url: '/budgets/test/stats' },
  
  // Expenses
  { name: 'Get All Expenses (Test)', method: 'GET', url: '/expenses/test' },
  { name: 'Get Expense Stats (Test)', method: 'GET', url: '/expenses/test/stats' },
  
  // Invoices
  { name: 'Get All Invoices (Test)', method: 'GET', url: '/invoices/test' },
  { name: 'Get Invoice Stats (Test)', method: 'GET', url: '/invoices/test/stats' },
  
  // Bills
  { name: 'Get All Bills (Test)', method: 'GET', url: '/bills/test' },
  { name: 'Get Bill Stats (Test)', method: 'GET', url: '/bills/test/stats' },
  
  // Tax Records
  { name: 'Get All Tax Records (Test)', method: 'GET', url: '/tax-records/test' },
  { name: 'Get Tax Record Stats (Test)', method: 'GET', url: '/tax-records/test/stats' }
];

async function testEndpoint(test) {
  try {
    console.log(`\n🧪 Testing: ${test.name}`);
    console.log(`📍 URL: ${test.method} ${BASE_URL}${test.url}`);
    
    const response = await axios({
      method: test.method,
      url: `${BASE_URL}${test.url}`,
      timeout: 5000
    });
    
    console.log(`✅ Status: ${response.status}`);
    console.log(`📊 Response Size: ${JSON.stringify(response.data).length} characters`);
    
    // Check if response has items array (for list endpoints)
    if (response.data.items) {
      console.log(`📋 Items Count: ${response.data.items.length}`);
      if (response.data.items.length > 0) {
        console.log(`📝 First Item ID: ${response.data.items[0].id}`);
      }
    }
    
    // Check if response has total (for paginated endpoints)
    if (response.data.total !== undefined) {
      console.log(`📈 Total Records: ${response.data.total}`);
    }
    
    return { success: true, status: response.status, data: response.data };
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    if (error.response) {
      console.log(`📊 Status: ${error.response.status}`);
      console.log(`📝 Response: ${JSON.stringify(error.response.data)}`);
    }
    return { success: false, error: error.message };
  }
}

async function runAllTests() {
  console.log('🚀 Starting Finance Backend API Tests...\n');
  console.log('=' .repeat(60));
  
  const results = [];
  
  for (const test of tests) {
    const result = await testEndpoint(test);
    results.push({ ...test, result });
    
    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Summary
  console.log('\n' + '=' .repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('=' .repeat(60));
  
  const successful = results.filter(r => r.result.success).length;
  const failed = results.filter(r => !r.result.success).length;
  
  console.log(`✅ Successful: ${successful}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((successful / results.length) * 100).toFixed(1)}%`);
  
  if (failed > 0) {
    console.log('\n❌ Failed Tests:');
    results.filter(r => !r.result.success).forEach(r => {
      console.log(`   - ${r.name}: ${r.result.error}`);
    });
  }
  
  console.log('\n🎉 Test completed!');
}

// Run the tests
runAllTests().catch(console.error); 