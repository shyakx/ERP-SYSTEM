const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TypingIndicator = sequelize.define('TypingIndicator', {
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
  is_typing: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'typing_indicators',
  timestamps: true,
  indexes: [
    {
      fields: ['conversation_id']
    },
    {
      fields: ['user_id']
    },
    {
      fields: ['expires_at']
    }
  ]
});

module.exports = TypingIndicator;
