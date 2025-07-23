# DICEL ERP Chatbot Setup Guide

## Overview
The DICEL ERP system now includes a hybrid AI chatbot that can:
- Answer company-specific questions using trained knowledge
- Handle general questions using OpenAI GPT
- Learn and adapt to your company's policies and procedures

## Prerequisites

### 1. OpenAI API Key
You need an OpenAI API key to use the chatbot:

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to "API Keys" in your dashboard
4. Create a new API key
5. Copy the key (it starts with `sk-`)

### 2. Environment Setup

Add the following to your `backend/.env` file:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-your_openai_api_key_here
```

## Installation

The chatbot dependencies are already installed. If you need to reinstall:

```bash
cd backend
npm install langchain @langchain/openai @langchain/community weaviate axios --legacy-peer-deps
```

## Usage

### 1. Starting the Chatbot
1. Start your backend server: `npm run dev` (in backend directory)
2. Start your frontend: `npm start` (in frontend directory)
3. Log in to the ERP system
4. Look for the floating chat button in the bottom-right corner

### 2. Using the Chat Widget
- Click the chat button to open the conversation
- Type your questions in natural language
- The chatbot will automatically:
  - Classify if your question is company-specific or general
  - Use appropriate knowledge sources to answer
  - Maintain conversation history

### 3. Training the Chatbot (Admin Only)

#### Access Training Interface
1. Log in as a system admin
2. Go to Admin → Chatbot Training
3. Add company knowledge in structured JSON format

#### Example Knowledge Categories

**HR Policies:**
```json
{
  "working_hours": "8 AM to 5 PM, Monday to Friday",
  "leave_policy": "20 days annual leave per year",
  "sick_leave": "10 days paid sick leave",
  "overtime": "Overtime is paid at 1.5x hourly rate"
}
```

**Payroll Information:**
```json
{
  "salary_structure": "Base salary + allowances + bonuses - deductions",
  "transport_allowance": "50,000 RWF per month",
  "housing_allowance": "100,000 RWF per month",
  "payment_schedule": "Monthly on the 25th",
  "tax_rate": "Progressive tax rates apply"
}
```

**Company Structure:**
```json
{
  "departments": ["HR", "Finance", "IT", "Operations", "Sales"],
  "locations": ["Main Office", "Branch 1", "Branch 2"],
  "management": {
    "ceo": "John Doe",
    "hr_manager": "Jane Smith",
    "finance_manager": "Bob Johnson"
  }
}
```

## Features

### Hybrid Intelligence
- **Company-Specific Questions**: Uses trained knowledge + OpenAI
- **General Questions**: Uses OpenAI GPT directly
- **Intent Classification**: Automatically determines question type

### Conversation Management
- Persistent conversation history per user
- Automatic context awareness
- Memory management (keeps last 10 messages)

### Admin Features
- Add/remove company knowledge
- View all trained data
- Real-time training updates

## Example Questions

### Company-Specific (will use trained knowledge):
- "What are the working hours?"
- "How much is the transport allowance?"
- "When is payroll processed?"
- "What departments do we have?"

### General (will use OpenAI):
- "What's the weather like?"
- "How do I calculate compound interest?"
- "Write a professional email"
- "Explain machine learning"

## Troubleshooting

### Common Issues

1. **"Failed to send message"**
   - Check if OpenAI API key is set correctly
   - Verify backend server is running
   - Check browser console for errors

2. **"Authentication required"**
   - Make sure you're logged in
   - Check if auth token is valid

3. **Chatbot not responding**
   - Check OpenAI API quota/limits
   - Verify internet connection
   - Check backend logs for errors

### Debug Mode
Enable detailed logging by adding to backend:

```javascript
// In chatbotService.js
console.log('Intent:', intent);
console.log('Company context:', companyContext);
```

## Security Considerations

- OpenAI API key is stored server-side only
- User conversations are stored in memory (not persistent)
- Admin-only access to training interface
- All requests require authentication

## Future Enhancements

- Vector database integration (Pinecone/Weaviate)
- File upload for training data
- Conversation analytics
- Multi-language support
- Integration with ERP data sources

## Support

For issues or questions:
1. Check the browser console for errors
2. Review backend server logs
3. Verify environment variables
4. Test with simple questions first

The chatbot is designed to be self-improving - the more you train it with company knowledge, the better it will serve your organization! 