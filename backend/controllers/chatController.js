import OpenAI from 'openai';
import { ChatMessage } from '../models/ChatMessage.js';
import { body, validationResult } from 'express-validator';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const chatValidation = [
  body('message').trim().isLength({ min: 1, max: 2000 })
];

export const sendMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { message } = req.body;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for DICEL ERP system. You help users with business processes, document management, and general office tasks. Be professional and concise."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    const tokens = completion.usage.total_tokens;

    // Save to database
    const chatMessage = await ChatMessage.create({
      message,
      response,
      tokens,
      model: 'gpt-3.5-turbo',
      userId: req.user.id
    });

    res.json({
      success: true,
      data: {
        message: chatMessage.message,
        response: chatMessage.response,
        timestamp: chatMessage.createdAt
      }
    });
  } catch (error) {
    console.error('Chat error:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(402).json({
        success: false,
        message: 'OpenAI API quota exceeded. Please try again later.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Chat service temporarily unavailable',
      error: error.message
    });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: messages } = await ChatMessage.findAndCountAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        messages,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get chat history',
      error: error.message
    });
  }
};