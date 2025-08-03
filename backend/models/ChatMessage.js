import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const ChatMessage = sequelize.define('ChatMessage', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  response: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tokens: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  model: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'gpt-3.5-turbo'
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'chat_messages',
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['createdAt']
    }
  ]
});