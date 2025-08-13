import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const endpoints = [
  { name: 'Health Check', url: '/health' },
  { name: 'Transactions', url: '/transactions/test' },
  { name: 'Accounts', url: '/accounts/test' },
  { name: 'Vendors', url: '/vendors/test' },
  { name: 'Customers', url: '/customers/test' },
  { name: 'Budgets', url: '/budgets/test' },
  { name: 'Expenses', url: '/expenses/test' },
  { name: 'Invoices', url: '/invoices/test' },
  { name: 'Bills', url: '/bills/test' },
  { name: 'Tax Records', url: '/tax-records/test' }
];

async function testEndpoint(endpoint) {
  try {
    console.log(`🔍 Testing ${endpoint.name}...`);
    const response = await axios.get(`${BASE_URL}${endpoint.url}`);
    
    if (response.status === 200) {
      const data = response.data;
      const itemCount = data.items ? data.items.length : 0;
      console.log(`✅ ${endpoint.name}: SUCCESS (${itemCount} items)`);
      
      if (itemCount > 0) {
        const sample = data.items[0];
        const sampleStr = JSON.stringify(sample).substring(0, 80);
        console.log(`   Sample: ${sampleStr}...`);
      }
    } else {
      console.log(`❌ ${endpoint.name}: HTTP ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      console.log(`❌ ${endpoint.name}: HTTP ${error.response.status} - ${error.response.data.error || 'Unknown error'}`);
    } else {
      console.log(`❌ ${endpoint.name}: ${error.message}`);
    }
  }
  console.log('');
}

async function testAllEndpoints() {
  console.log('🚀 Testing all Finance API endpoints...\n');
  
  for (const endpoint of endpoints) {
    await testEndpoint(endpoint);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('🎉 Testing complete!');
}

testAllEndpoints().catch(console.error); 