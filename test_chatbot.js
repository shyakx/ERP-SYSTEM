const chatbotService = require('./services/chatbotService');

async function testChatbot() {
  console.log('🧪 Testing chatbot service...');
  
  try {
    // Test 1: Working hours question (should use fallback)
    console.log('\n📝 Test 1: "What are the working hours?"');
    const result1 = await chatbotService.generateResponse('What are the working hours?', 'test-user');
    console.log('✅ Result:', result1.response);
    console.log('🎯 Intent:', result1.intent);
    
    // Test 2: Hello message (should use fallback)
    console.log('\n📝 Test 2: "hello"');
    const result2 = await chatbotService.generateResponse('hello', 'test-user');
    console.log('✅ Result:', result2.response);
    console.log('🎯 Intent:', result2.intent);
    
    // Test 3: Transport allowance (should use fallback)
    console.log('\n📝 Test 3: "What is the transport allowance?"');
    const result3 = await chatbotService.generateResponse('What is the transport allowance?', 'test-user');
    console.log('✅ Result:', result3.response);
    console.log('🎯 Intent:', result3.intent);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testChatbot(); 