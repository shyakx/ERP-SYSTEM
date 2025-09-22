const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MessageReaction = sequelize.define('MessageReaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  message_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'messages',
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
  reaction: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'message_reactions',
  timestamps: true,
  indexes: [
    {
      fields: ['message_id']
    },
    {
      fields: ['user_id']
    },
    {
      fields: ['message_id', 'user_id', 'reaction'],
      unique: true
    }
  ]
});

module.exports = MessageReaction;
