const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  conversation_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'conversations',
      key: 'id'
    }
  },
  sender_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  message_type: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'text',
    validate: {
      isIn: [['text', 'image', 'file', 'system', 'emoji', 'gif', 'voice']]
    }
  },
  reply_to_message_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'messages',
      key: 'id'
    }
  },
  edited_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  is_edited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  },
  attachments: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  }
}, {
  tableName: 'messages',
  timestamps: true,
  indexes: [
    {
      fields: ['conversation_id']
    },
    {
      fields: ['sender_id']
    },
    {
      fields: ['created_at']
    },
    {
      fields: ['message_type']
    },
    {
      fields: ['reply_to_message_id']
    }
  ]
});

module.exports = Message;
