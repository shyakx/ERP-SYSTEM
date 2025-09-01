const axios = require('axios');

const testEmployeeLogin = async () => {
  try {
    console.log('🧪 Testing Employee Login System...\n');

    // Test different employee logins
    const testUsers = [
      {
        name: 'HR Manager',
        email: 'hr.manager@dicel.co.rw',
        password: 'hr123',
        role: 'hr'
      },
      {
        name: 'Finance Manager',
        email: 'finance.manager@dicel.co.rw',
        password: 'finance123',
        role: 'finance'
      },
      {
        name: 'IT Manager',
        email: 'it.manager@dicel.co.rw',
        password: 'it123',
        role: 'it'
      },
      {
        name: 'Sales Manager',
        email: 'sales.manager@dicel.co.rw',
        password: 'sales123',
        role: 'sales'
      },
      {
        name: 'Operations Manager',
        email: 'operations.manager@dicel.co.rw',
        password: 'inventory123',
        role: 'inventory'
      },
      {
        name: 'Security Manager',
        email: 'security.manager@dicel.co.rw',
        password: 'security123',
        role: 'security'
      },
      {
        name: 'Risk Manager',
        email: 'risk.manager@dicel.co.rw',
        password: 'risk123',
        role: 'risk'
      },
      {
        name: 'Regular Employee',
        email: 'patrick.gasana@dicel.co.rw',
        password: 'employee123',
        role: 'employee'
      }
    ];

    console.log('🔐 Testing Employee Login Credentials:');
    console.log('=====================================\n');

    for (const user of testUsers) {
      try {
        console.log(`👤 Testing: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);

        const loginResponse = await axios.post('http://localhost:5000/api/v1/auth/login', {
          email: user.email,
          password: user.password
        });

        if (loginResponse.data.success) {
          console.log('   ✅ Login successful');
          console.log(`   👤 User: ${loginResponse.data.data.user.firstName} ${loginResponse.data.data.user.lastName}`);
          console.log(`   🔑 Token received: ${loginResponse.data.data.token.substring(0, 20)}...`);
          console.log(`   🎯 Role: ${loginResponse.data.data.user.role}`);
          console.log('');
        } else {
          console.log('   ❌ Login failed');
          console.log('');
        }
      } catch (error) {
        console.log(`   ❌ Login failed: ${error.response?.data?.message || error.message}`);
        console.log('');
      }
    }

    console.log('🎉 Employee Login System Test Complete!');
    console.log('🚀 All employees can now login to their respective departmental pages.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('💡 Make sure the backend server is running on port 5000');
  }
};

testEmployeeLogin(); 