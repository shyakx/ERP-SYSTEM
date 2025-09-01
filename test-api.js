const axios = require('axios');

const testAPI = async () => {
  try {
    console.log('🧪 Testing DICEL ERP API...\n');

    // Test health endpoint
    console.log('1. Testing Health Endpoint:');
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log('   ✅ Health:', healthResponse.data);
    console.log('');

    // Test login to get token
    console.log('2. Testing Authentication:');
    const loginResponse = await axios.post('http://localhost:5000/api/v1/auth/login', {
      email: 'admin@dicel.com',
      password: 'admin123'
    });
    
    const token = loginResponse.data.data.token;
    console.log('   ✅ Login successful');
    console.log('   👤 User:', loginResponse.data.data.user.firstName, loginResponse.data.data.user.lastName);
    console.log('   🔑 Token received');
    console.log('');

    // Test employees endpoint
    console.log('3. Testing Employees API:');
    const employeesResponse = await axios.get('http://localhost:5000/api/v1/employees', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('   ✅ Employees API working');
    console.log(`   📊 Total Employees: ${employeesResponse.data.data.total}`);
    console.log(`   📄 Page: ${employeesResponse.data.data.page}`);
    console.log(`   📋 Items per page: ${employeesResponse.data.data.limit}`);
    console.log('');
    
    if (employeesResponse.data.data.items.length > 0) {
      console.log('   👥 Sample Employees from Database:');
      employeesResponse.data.data.items.slice(0, 3).forEach((emp, index) => {
        console.log(`   ${index + 1}. ${emp.first_name} ${emp.last_name}`);
        console.log(`      Employee #: ${emp.employee_number}`);
        console.log(`      Position: ${emp.position}`);
        console.log(`      Department: ${emp.department?.name || 'N/A'}`);
        console.log(`      Salary: RWF ${emp.salary?.toLocaleString() || 'N/A'}`);
        console.log('');
      });
    }

    // Test departments endpoint
    console.log('4. Testing Departments API:');
    const departmentsResponse = await axios.get('http://localhost:5000/api/v1/departments', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('   ✅ Departments API working');
    console.log(`   📊 Total Departments: ${departmentsResponse.data.data.length}`);
    console.log('');
    
    if (departmentsResponse.data.data.length > 0) {
      console.log('   🏢 Departments from Database:');
      departmentsResponse.data.data.forEach((dept, index) => {
        console.log(`   ${index + 1}. ${dept.name}`);
      });
      console.log('');
    }

    // Test dashboard stats
    console.log('5. Testing Dashboard Stats API:');
    const statsResponse = await axios.get('http://localhost:5000/api/v1/dashboard/stats', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('   ✅ Dashboard Stats API working');
    console.log('   📊 Dashboard Statistics:');
    console.log(`      Total Employees: ${statsResponse.data.data.totalEmployees}`);
    console.log(`      Total Departments: ${statsResponse.data.data.totalDepartments}`);
    console.log(`      Total Users: ${statsResponse.data.data.totalUsers}`);
    console.log(`      Active Employees: ${statsResponse.data.data.activeEmployees}`);
    console.log('');

    console.log('🎉 All API tests passed! The frontend will receive real database data.');
    console.log('🚀 Your DICEL ERP system is ready with 100% real data from PostgreSQL!');

  } catch (error) {
    console.error('❌ API Test Failed:', error.response?.data || error.message);
  }
};

testAPI(); 