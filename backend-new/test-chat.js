const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testChatAPI() {
  console.log('🧪 Testing DICEL ERP Chat API...\n');

  try {
    // Test 1: Login
    console.log('1. Testing Login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@dicel.co.rw',
      password: 'admin123'
    });
    console.log('✅ Login Response:', loginResponse.data);
    const token = loginResponse.data.data.token;
    console.log('');

    // Test 2: Get Conversations
    console.log('2. Testing Get Conversations...');
    const conversationsResponse = await axios.get(`${BASE_URL}/chat/conversations`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Conversations Response:', conversationsResponse.data);
    console.log('');

    // Test 3: Create Conversation
    console.log('3. Testing Create Conversation...');
    const createConversationResponse = await axios.post(`${BASE_URL}/chat/conversations`, {
      type: 'direct',
      participantIds: ['2'] // Assuming user ID 2 exists
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Create Conversation Response:', createConversationResponse.data);
    const conversationId = createConversationResponse.data.data.id;
    console.log('');

    // Test 4: Send Message
    console.log('4. Testing Send Message...');
    const sendMessageResponse = await axios.post(`${BASE_URL}/chat/conversations/${conversationId}/messages`, {
      content: 'Hello! This is a test message from the chat API.',
      message_type: 'text'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Send Message Response:', sendMessageResponse.data);
    console.log('');

    // Test 5: Get Messages
    console.log('5. Testing Get Messages...');
    const messagesResponse = await axios.get(`${BASE_URL}/chat/conversations/${conversationId}/messages`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Get Messages Response:', messagesResponse.data);
    console.log('');

    // Test 6: Get Online Users
    console.log('6. Testing Get Online Users...');
    const onlineUsersResponse = await axios.get(`${BASE_URL}/chat/users/online`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Online Users Response:', onlineUsersResponse.data);
    console.log('');

    // Test 7: Search Messages
    console.log('7. Testing Search Messages...');
    const searchResponse = await axios.get(`${BASE_URL}/chat/search?q=test`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Search Messages Response:', searchResponse.data);
    console.log('');

    console.log('🎉 All Chat API tests passed successfully!');

  } catch (error) {
    console.error('❌ Chat API Test Failed:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the backend server is running:');
      console.log('   cd backend-new');
      console.log('   npm run dev');
    }
  }
}

// Run the test
testChatAPI();
