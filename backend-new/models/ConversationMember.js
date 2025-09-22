const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ConversationMember = sequelize.define('ConversationMember', {
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
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'member',
    validate: {
      isIn: [['admin', 'moderator', 'member']]
    }
  },
  joined_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  left_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  last_read_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  notifications_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  mute_until: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'conversation_members',
  timestamps: true,
  indexes: [
    {
      fields: ['conversation_id', 'user_id'],
      unique: true
    },
    {
      fields: ['user_id']
    },
    {
      fields: ['is_active']
    }
  ]
});

module.exports = ConversationMember;
