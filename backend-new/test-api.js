const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/v1';

async function testAPI() {
  console.log('🧪 Testing DICEL ERP Backend API...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Health Check...');
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('✅ Health Check:', healthResponse.data);
    console.log('');

    // Test 2: Login
    console.log('2. Testing Login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@dicel.co.rw',
      password: 'admin123'
    });
    console.log('✅ Login Response:', loginResponse.data);
    const token = loginResponse.data.data.token;
    console.log('');

    // Test 3: Get Users
    console.log('3. Testing Get Users...');
    const usersResponse = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Users Response:', usersResponse.data);
    console.log('');

    // Test 4: Get HR Stats
    console.log('4. Testing HR Stats...');
    const hrStatsResponse = await axios.get(`${BASE_URL}/hr/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ HR Stats Response:', hrStatsResponse.data);
    console.log('');

    // Test 5: Get Finance Stats
    console.log('5. Testing Finance Stats...');
    const financeStatsResponse = await axios.get(`${BASE_URL}/finance/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Finance Stats Response:', financeStatsResponse.data);
    console.log('');

    // Test 6: Get Operations Stats
    console.log('6. Testing Operations Stats...');
    const operationsStatsResponse = await axios.get(`${BASE_URL}/operations/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Operations Stats Response:', operationsStatsResponse.data);
    console.log('');

    // Test 7: Get Sales Stats
    console.log('7. Testing Sales Stats...');
    const salesStatsResponse = await axios.get(`${BASE_URL}/sales/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Sales Stats Response:', salesStatsResponse.data);
    console.log('');

    // Test 8: Get IT Stats
    console.log('8. Testing IT Stats...');
    const itStatsResponse = await axios.get(`${BASE_URL}/it/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ IT Stats Response:', itStatsResponse.data);
    console.log('');

    // Test 9: Get Security Stats
    console.log('9. Testing Security Stats...');
    const securityStatsResponse = await axios.get(`${BASE_URL}/security/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Security Stats Response:', securityStatsResponse.data);
    console.log('');

    console.log('🎉 All API tests passed successfully!');

  } catch (error) {
    console.error('❌ API Test Failed:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the backend server is running:');
      console.log('   cd backend-new');
      console.log('   npm run dev');
    }
  }
}

// Run the test
testAPI();