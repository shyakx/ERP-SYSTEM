const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middlewares/auth');
const { Conversation, Message, User, ConversationParticipant, MessageReaction } = require('../models');
const { Op } = require('sequelize');

// Get all conversations for the current user
router.get('/conversations', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ],
      };
    }

    const conversations = await Conversation.findAll({
      where: whereClause,
      include: [
        {
          model: ConversationParticipant,
          as: 'participants',
          where: { user_id: req.user.id },
          required: true,
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
            }
          ]
        },
        {
          model: Message,
          as: 'lastMessage',
          include: [
            {
              model: User,
              as: 'sender',
              attributes: ['id', 'first_name', 'last_name']
            }
          ],
          order: [['created_at', 'DESC']],
          limit: 1
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['updated_at', 'DESC']],
    });

    // Transform conversations to include participant info
    const transformedConversations = conversations.map(conv => {
      const convData = conv.toJSON();
      const otherParticipants = convData.participants.filter(p => p.user_id !== req.user.id);
      
      return {
        id: convData.id,
        name: convData.name || (convData.type === 'direct' && otherParticipants.length > 0 
          ? `${otherParticipants[0].user.first_name} ${otherParticipants[0].user.last_name}`
          : convData.name),
        type: convData.type,
        description: convData.description,
        lastMessage: convData.lastMessage?.[0] || null,
        participants: convData.participants,
        unreadCount: 0,
        createdAt: convData.created_at,
        updatedAt: convData.updated_at
      };
    });

    res.json({
      success: true,
      data: {
        items: transformedConversations,
        total: transformedConversations.length,
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get conversation by ID
router.get('/conversations/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findByPk(id, {
      include: [
        {
          model: ConversationParticipant,
          as: 'participants',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
            }
          ]
        }
      ]
    });

    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    // Check if user is a participant
    const isParticipant = conversation.participants.some(p => p.user_id === req.user.id);
    if (!isParticipant) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, data: conversation });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Create new conversation
router.post('/conversations', authenticateToken, async (req, res) => {
  try {
    const { name, type = 'direct', description, participantIds } = req.body;

    if (!participantIds || participantIds.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one participant is required' });
    }

    // For direct messages, ensure only 2 participants
    if (type === 'direct' && participantIds.length !== 1) {
      return res.status(400).json({ success: false, message: 'Direct messages must have exactly one other participant' });
    }

    // Check if direct conversation already exists
    if (type === 'direct') {
      const existingConversation = await Conversation.findOne({
        where: { type: 'direct' },
        include: [
          {
            model: ConversationParticipant,
            as: 'participants',
            where: {
              user_id: {
                [Op.in]: [req.user.id, participantIds[0]]
              }
            }
          }
        ]
      });

      if (existingConversation) {
        return res.json({ success: true, data: existingConversation, message: 'Conversation already exists' });
      }
    }

    const conversation = await Conversation.create({
      name,
      type,
      description,
      created_by: req.user.id
    });

    // Add participants
    const participants = [req.user.id, ...participantIds];
    for (const userId of participants) {
      await ConversationParticipant.create({
        conversation_id: conversation.id,
        user_id: userId,
        joined_at: new Date()
      });
    }

    // Fetch the created conversation with participants
    const createdConversation = await Conversation.findByPk(conversation.id, {
      include: [
        {
          model: ConversationParticipant,
          as: 'participants',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'first_name', 'last_name', 'email', 'avatar_url']
            }
          ]
        }
      ]
    });

    res.status(201).json({ success: true, data: createdConversation, message: 'Conversation created successfully' });
  } catch (error) {
    console.error('Create conversation error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get messages for a conversation
router.get('/conversations/:id/messages', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 50, before } = req.query;
    const offset = (page - 1) * limit;

    // Check if user is a participant
    const participant = await ConversationParticipant.findOne({
      where: { conversation_id: id, user_id: req.user.id }
    });

    if (!participant) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    let whereClause = { conversation_id: id };
    if (before) {
      whereClause.created_at = { [Op.lt]: new Date(before) };
    }

    const { count, rows: messages } = await Message.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'first_name', 'last_name', 'avatar_url']
        },
        {
          model: Message,
          as: 'replyTo',
          include: [
            {
              model: User,
              as: 'sender',
              attributes: ['id', 'first_name', 'last_name']
            }
          ]
        },
        {
          model: MessageReaction,
          as: 'reactions',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'first_name', 'last_name']
            }
          ]
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']],
    });

    res.json({
      success: true,
      data: {
        items: messages.reverse(), // Reverse to show oldest first
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        hasMore: count > offset + messages.length
      }
    });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Send message to conversation
router.post('/conversations/:id/messages', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { content, message_type = 'text', reply_to_message_id, attachments } = req.body;

    if (!content && (!attachments || attachments.length === 0)) {
      return res.status(400).json({ success: false, message: 'Message content or attachments required' });
    }

    // Check if user is a participant
    const participant = await ConversationParticipant.findOne({
      where: { conversation_id: id, user_id: req.user.id }
    });

    if (!participant) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    const message = await Message.create({
      conversation_id: id,
      sender_id: req.user.id,
      content,
      message_type,
      reply_to_message_id,
      attachments: attachments || []
    });

    // Update conversation's updated_at timestamp
    await Conversation.update(
      { updated_at: new Date() },
      { where: { id } }
    );

    // Fetch the created message with all relations
    const createdMessage = await Message.findByPk(message.id, {
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'first_name', 'last_name', 'avatar_url']
        },
        {
          model: Message,
          as: 'replyTo',
          include: [
            {
              model: User,
              as: 'sender',
              attributes: ['id', 'first_name', 'last_name']
            }
          ]
        },
        {
          model: MessageReaction,
          as: 'reactions',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'first_name', 'last_name']
            }
          ]
        }
      ]
    });

    res.status(201).json({ success: true, data: createdMessage, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
