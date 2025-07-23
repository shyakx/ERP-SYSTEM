const axios = require('axios');

class ChatbotService {
  constructor() {
    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY not found in environment variables');
      console.log('💡 Please add your OpenAI API key to the .env file:');
      console.log('OPENAI_API_KEY=sk-your-api-key-here');
    } else {
      console.log('✅ OpenAI API key found and configured');
    }

    this.apiKey = process.env.OPENAI_API_KEY;
    
    // In-memory storage for company knowledge (we'll upgrade to vector DB later)
    this.companyKnowledge = new Map();
    this.conversationHistory = new Map();
    
    // Initialize with some basic company knowledge
    this.initializeCompanyKnowledge();
  }

  initializeCompanyKnowledge() {
    // Add company-specific knowledge
    this.addCompanyKnowledge('company_info', {
      name: 'DICEL ERP System',
      description: 'A comprehensive ERP system for managing employees, payroll, finance, and business operations.',
      departments: ['HR', 'Finance', 'IT', 'Operations'],
      features: ['Employee Management', 'Payroll Processing', 'Financial Tracking', 'Document Management']
    });

    this.addCompanyKnowledge('hr_policies', {
      working_hours: 'Standard working hours are 8 AM to 5 PM, Monday to Friday',
      leave_policy: 'Employees get 20 days annual leave per year',
      payroll_schedule: 'Payroll is processed monthly on the 25th',
      benefits: 'Health insurance, transport allowance, and housing allowance are provided'
    });

    this.addCompanyKnowledge('payroll_info', {
      salary_structure: 'Base salary + allowances + bonuses - deductions',
      allowances: 'Transport allowance: 50,000 RWF, Housing allowance: 100,000 RWF',
      deductions: 'Tax, insurance, and loan deductions are applied',
      payment_method: 'Direct deposit to employee bank accounts'
    });

    console.log('✅ Company knowledge initialized with', this.companyKnowledge.size, 'categories');
  }

  addCompanyKnowledge(category, data) {
    this.companyKnowledge.set(category, data);
    console.log(`📚 Added knowledge for category: ${category}`);
  }

  async classifyIntent(userMessage) {
    try {
      console.log('🤖 Classifying intent for:', userMessage.substring(0, 50) + '...');
      
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Classify the user\'s intent into one of these categories: company_specific (for questions about the company, HR policies, payroll, employees, etc.) or general (for general questions, math, writing, coding, etc.). Respond with only: company_specific or general'
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.3,
        max_tokens: 10
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const intent = response.data.choices[0].message.content.trim().toLowerCase();
      console.log('🎯 Intent classified as:', intent);
      return intent;
    } catch (error) {
      console.error('❌ Intent classification failed:', error.message);
      if (error.response?.status === 429) {
        console.log('⚠️ Rate limit hit, using fallback classification');
        // Simple keyword-based fallback
        const keywords = userMessage.toLowerCase();
        if (keywords.includes('working') || keywords.includes('hours') || 
            keywords.includes('payroll') || keywords.includes('salary') ||
            keywords.includes('company') || keywords.includes('hr') ||
            keywords.includes('employee') || keywords.includes('policy')) {
          return 'company_specific';
        }
      }
      return 'general'; // Fallback to general
    }
  }

  async getCompanyContext(userMessage) {
    // Simple keyword-based retrieval (we'll upgrade to semantic search later)
    const keywords = userMessage.toLowerCase().split(' ');
    const relevantContext = [];

    for (const [category, data] of this.companyKnowledge) {
      const dataStr = JSON.stringify(data).toLowerCase();
      if (keywords.some(keyword => dataStr.includes(keyword))) {
        relevantContext.push(`${category}: ${JSON.stringify(data)}`);
      }
    }

    const context = relevantContext.join('\n');
    console.log('📖 Found relevant context:', context ? 'Yes' : 'No');
    return context;
  }

  async generateResponse(userMessage, userId) {
    try {
      console.log('💬 Processing message from user:', userId);
      console.log('📝 User message:', userMessage);
      
      // Get conversation history
      const history = this.conversationHistory.get(userId) || [];
      
      // Simple keyword-based fallback for rate limit situations
      const keywords = userMessage.toLowerCase();
      
      // Check for company-specific keywords first
      if (keywords.includes('working') || keywords.includes('hours') || 
          keywords.includes('payroll') || keywords.includes('salary') ||
          keywords.includes('company') || keywords.includes('hr') ||
          keywords.includes('employee') || keywords.includes('policy') ||
          keywords.includes('transport') || keywords.includes('housing') ||
          keywords.includes('allowance') || keywords.includes('benefit')) {
        
        // Provide direct answers for common company questions
        if (keywords.includes('working') && keywords.includes('hours')) {
          const response = "Based on our company policies, standard working hours are 8 AM to 5 PM, Monday to Friday.";
          this.updateConversationHistory(userId, userMessage, response);
          return {
            response,
            intent: 'company_specific',
            timestamp: new Date().toISOString()
          };
        }
        
        if (keywords.includes('transport') || keywords.includes('allowance')) {
          const response = "Transport allowance is 50,000 RWF per month, and housing allowance is 100,000 RWF per month.";
          this.updateConversationHistory(userId, userMessage, response);
          return {
            response,
            intent: 'company_specific',
            timestamp: new Date().toISOString()
          };
        }
        
        if (keywords.includes('payroll') || keywords.includes('salary')) {
          const response = "Payroll is processed monthly on the 25th. The salary structure is: Base salary + allowances + bonuses - deductions.";
          this.updateConversationHistory(userId, userMessage, response);
          return {
            response,
            intent: 'company_specific',
            timestamp: new Date().toISOString()
          };
        }
      }
      
      // Try OpenAI API first
      try {
        // Classify intent
        const intent = await this.classifyIntent(userMessage);
        
        let systemPrompt;
        if (intent === 'company_specific') {
          // Get relevant company context
          const companyContext = await this.getCompanyContext(userMessage);
          
          systemPrompt = `You are a helpful AI assistant for DICEL ERP System. You have access to the following company information:

${companyContext}

Use this information to answer questions about the company, HR policies, payroll, employees, etc. If you don't have specific information, say so and suggest contacting HR.

Current conversation history:
${history.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Be friendly and helpful in your responses.`;
        } else {
          systemPrompt = `You are a helpful AI assistant. Answer the user's question in a friendly and informative way.

Current conversation history:
${history.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Be friendly and helpful in your responses.`;
        }

        console.log('🧠 Generating response with intent:', intent);
        console.log('📝 System prompt length:', systemPrompt.length);
        
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        }, {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('📡 OpenAI response status:', response.status);
        console.log('📡 OpenAI response data:', JSON.stringify(response.data, null, 2));

        const aiResponse = response.data.choices[0].message.content.trim();
        console.log('✅ Response generated successfully:', aiResponse.substring(0, 100) + '...');

        this.updateConversationHistory(userId, userMessage, aiResponse);

        const result = {
          response: aiResponse,
          intent,
          timestamp: new Date().toISOString()
        };

        console.log('📤 Returning result:', JSON.stringify(result, null, 2));
        return result;

      } catch (openaiError) {
        console.error('❌ OpenAI API error:', openaiError.message);
        
        if (openaiError.response?.status === 429) {
          console.log('⚠️ Rate limit hit, using fallback response');
          
          // Provide helpful fallback responses
          let fallbackResponse = "I'm currently experiencing high traffic. Here are some quick answers:\n\n";
          
          if (keywords.includes('hello') || keywords.includes('hi')) {
            fallbackResponse = "Hello! I'm your DICEL AI assistant. I can help you with company policies, payroll questions, and general information. What would you like to know?";
          } else if (keywords.includes('working') || keywords.includes('hours')) {
            fallbackResponse = "Working hours are 8 AM to 5 PM, Monday to Friday.";
          } else if (keywords.includes('payroll')) {
            fallbackResponse = "Payroll is processed monthly on the 25th. For specific questions, please contact HR.";
          } else {
            fallbackResponse = "I'm temporarily unavailable due to high traffic. Please try again in a few minutes or contact HR for immediate assistance.";
          }
          
          this.updateConversationHistory(userId, userMessage, fallbackResponse);
          
          return {
            response: fallbackResponse,
            intent: 'company_specific',
            timestamp: new Date().toISOString()
          };
        }
        
        throw openaiError; // Re-throw other errors
      }

    } catch (error) {
      console.error('❌ Chatbot error:', error.message);
      console.error('❌ Error details:', error.response?.data || error.stack);
      
      const errorResponse = "I apologize, but I encountered an error. Please try again or contact support.";
      this.updateConversationHistory(userId, userMessage, errorResponse);
      
      return {
        response: errorResponse,
        intent: 'error',
        timestamp: new Date().toISOString()
      };
    }
  }

  updateConversationHistory(userId, userMessage, aiResponse) {
    const history = this.conversationHistory.get(userId) || [];
    history.push({ role: 'user', content: userMessage });
    history.push({ role: 'assistant', content: aiResponse });
    
    // Keep only last 10 messages to manage memory
    if (history.length > 10) {
      history.splice(0, 2);
    }
    
    this.conversationHistory.set(userId, history);
  }

  async trainWithData(category, data) {
    this.addCompanyKnowledge(category, data);
    return { success: true, message: `Knowledge updated for category: ${category}` };
  }

  getCompanyKnowledge() {
    return Object.fromEntries(this.companyKnowledge);
  }

  clearConversationHistory(userId) {
    this.conversationHistory.delete(userId);
    return { success: true, message: 'Conversation history cleared' };
  }
}

module.exports = new ChatbotService(); 