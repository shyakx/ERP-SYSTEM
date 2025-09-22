const { Conversation, Message, ConversationMember, MessageReaction, TypingIndicator } = require('../models');
const { User } = require('../models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');

// Get all conversations for a user
const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const conversations = await Conversation.findAll({
      include: [
        {
          model: ConversationMember,
          where: { user_id: userId, is_active: true },
          required: true
        },
        {
          model: Message,
          as: 'lastMessage',
          limit: 1,
          order: [['created_at', 'DESC']],
          include: [{
            model: User,
            as: 'sender',
            attributes: ['id', 'firstName', 'lastName', 'avatar_url']
          }]
        }
      ],
      order: [['last_message_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: conversations
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get conversations',
      error: error.message
    });
  }
};

// Get conversation by ID
const getConversationById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const conversation = await Conversation.findOne({
      where: { id },
      include: [
        {
          model: ConversationMember,
          where: { user_id: userId, is_active: true },
          required: true
        },
        {
          model: ConversationMember,
          as: 'members',
          include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'avatar_url', 'email', 'department_id']
          }]
        }
      ]
    });

    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: 'Conversation not found'
      });
    }

    res.json({
      success: true,
      data: conversation
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get conversation',
      error: error.message
    });
  }
};

// Create new conversation
const createConversation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, type = 'direct', member_ids, description, is_private = false } = req.body;
    const userId = req.user.id;

    // Create conversation
    const conversation = await Conversation.create({
      name,
      type,
      description,
      is_private,
      created_by: userId
    });

    // Add creator as member
    await ConversationMember.create({
      conversation_id: conversation.id,
      user_id: userId,
      role: 'admin'
    });

    // Add other members if provided
    if (member_ids && member_ids.length > 0) {
      const memberPromises = member_ids.map(memberId => 
        ConversationMember.create({
          conversation_id: conversation.id,
          user_id: memberId,
          role: 'member'
        })
      );
      await Promise.all(memberPromises);
    }

    // Fetch the complete conversation with members
    const completeConversation = await Conversation.findByPk(conversation.id, {
      include: [
        {
          model: ConversationMember,
          as: 'members',
          include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName', 'avatar_url', 'email']
          }]
        }
      ]
    });

    res.status(201).json({
      success: true,
      data: completeConversation
    });
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create conversation',
      error: error.message
    });
  }
};

// Get messages for a conversation
const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { page = 1, limit = 50, before } = req.query;
    const userId = req.user.id;
    const offset = (page - 1) * limit;

    // Check if user is member of conversation
    const member = await ConversationMember.findOne({
      where: { conversation_id: conversationId, user_id: userId, is_active: true }
    });

    if (!member) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this conversation'
      });
    }

    // Build where clause
    let whereClause = { conversation_id: conversationId };
    if (before) {
      whereClause.created_at = { [Op.lt]: new Date(before) };
    }

    const messages = await Message.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'firstName', 'lastName', 'avatar_url']
        },
        {
          model: Message,
          as: 'replyTo',
          include: [{
            model: User,
            as: 'sender',
            attributes: ['id', 'firstName', 'lastName']
          }]
        }
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    // Update last read timestamp
    await ConversationMember.update(
      { last_read_at: new Date() },
      { where: { conversation_id: conversationId, user_id: userId } }
    );

    res.json({
      success: true,
      data: messages.reverse() // Reverse to show oldest first
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get messages',
      error: error.message
    });
  }
};

// Send message
const sendMessage = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { conversationId } = req.params;
    const { content, message_type = 'text', reply_to_message_id, attachments } = req.body;
    const userId = req.user.id;

    // Check if user is member of conversation
    const member = await ConversationMember.findOne({
      where: { conversation_id: conversationId, user_id: userId, is_active: true }
    });

    if (!member) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this conversation'
      });
    }

    // Create message
    const message = await Message.create({
      conversation_id: conversationId,
      sender_id: userId,
      content,
      message_type,
      reply_to_message_id,
      attachments: attachments || []
    });

    // Update conversation last message timestamp
    await Conversation.update(
      { last_message_at: new Date() },
      { where: { id: conversationId } }
    );

    // Fetch complete message with sender info
    const completeMessage = await Message.findByPk(message.id, {
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'firstName', 'lastName', 'avatar_url']
        },
        {
          model: Message,
          as: 'replyTo',
          include: [{
            model: User,
            as: 'sender',
            attributes: ['id', 'firstName', 'lastName']
          }]
        }
      ]
    });

    res.status(201).json({
      success: true,
      data: completeMessage
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
};

// Add reaction to message
const addReaction = async (req, res) => {
  try {
    const { conversationId, messageId } = req.params;
    const { reaction } = req.body;
    const userId = req.user.id;

    // Check if user is member of conversation
    const member = await ConversationMember.findOne({
      where: { conversation_id: conversationId, user_id: userId, is_active: true }
    });

    if (!member) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this conversation'
      });
    }

    // Add or update reaction
    const [messageReaction, created] = await MessageReaction.findOrCreate({
      where: {
        message_id: messageId,
        user_id: userId,
        reaction
      },
      defaults: {
        message_id: messageId,
        user_id: userId,
        reaction
      }
    });

    res.json({
      success: true,
      data: messageReaction,
      created
    });
  } catch (error) {
    console.error('Add reaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add reaction',
      error: error.message
    });
  }
};

// Remove reaction from message
const removeReaction = async (req, res) => {
  try {
    const { conversationId, messageId, reaction } = req.params;
    const userId = req.user.id;

    // Check if user is member of conversation
    const member = await ConversationMember.findOne({
      where: { conversation_id: conversationId, user_id: userId, is_active: true }
    });

    if (!member) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this conversation'
      });
    }

    // Remove reaction
    const deleted = await MessageReaction.destroy({
      where: {
        message_id: messageId,
        user_id: userId,
        reaction
      }
    });

    res.json({
      success: true,
      deleted: deleted > 0
    });
  } catch (error) {
    console.error('Remove reaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove reaction',
      error: error.message
    });
  }
};

// Update typing indicator
const updateTypingIndicator = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { is_typing } = req.body;
    const userId = req.user.id;

    // Check if user is member of conversation
    const member = await ConversationMember.findOne({
      where: { conversation_id: conversationId, user_id: userId, is_active: true }
    });

    if (!member) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this conversation'
      });
    }

    if (is_typing) {
      // Create or update typing indicator
      const expiresAt = new Date(Date.now() + 3000); // 3 seconds
      await TypingIndicator.upsert({
        conversation_id: conversationId,
        user_id: userId,
        is_typing: true,
        expires_at: expiresAt
      });
    } else {
      // Remove typing indicator
      await TypingIndicator.destroy({
        where: {
          conversation_id: conversationId,
          user_id: userId
        }
      });
    }

    res.json({
      success: true,
      data: { is_typing }
    });
  } catch (error) {
    console.error('Update typing indicator error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update typing indicator',
      error: error.message
    });
  }
};

// Get online users for a conversation
const getTypingUsers = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user.id;

    // Check if user is member of conversation
    const member = await ConversationMember.findOne({
      where: { conversation_id: conversationId, user_id: userId, is_active: true }
    });

    if (!member) {
      return res.status(403).json({
        success: false,
        message: 'Access denied to this conversation'
      });
    }

    // Get active typing indicators
    const typingUsers = await TypingIndicator.findAll({
      where: {
        conversation_id: conversationId,
        is_typing: true,
        expires_at: { [Op.gt]: new Date() },
        user_id: { [Op.ne]: userId } // Exclude current user
      },
      include: [{
        model: User,
        attributes: ['id', 'firstName', 'lastName']
      }]
    });

    res.json({
      success: true,
      data: typingUsers
    });
  } catch (error) {
    console.error('Get typing users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get typing users',
      error: error.message
    });
  }
};

// Search messages
const searchMessages = async (req, res) => {
  try {
    const { q: query } = req.query;
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    if (!query || query.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    // Get conversations user is member of
    const userConversations = await ConversationMember.findAll({
      where: { user_id: userId, is_active: true },
      attributes: ['conversation_id']
    });

    const conversationIds = userConversations.map(uc => uc.conversation_id);

    // Search messages
    const messages = await Message.findAll({
      where: {
        conversation_id: { [Op.in]: conversationIds },
        content: { [Op.iLike]: `%${query}%` },
        is_deleted: false
      },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'firstName', 'lastName', 'avatar_url']
        },
        {
          model: Conversation,
          attributes: ['id', 'name', 'type']
        }
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('Search messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search messages',
      error: error.message
    });
  }
};

module.exports = {
  getConversations,
  getConversationById,
  createConversation,
  getMessages,
  sendMessage,
  addReaction,
  removeReaction,
  updateTypingIndicator,
  getTypingUsers,
  searchMessages
};
