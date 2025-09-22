const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Conversation = sequelize.define('Conversation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  type: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'direct',
    validate: {
      isIn: [['direct', 'group', 'channel']]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  avatar_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  is_private: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_archived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  last_message_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  department_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'departments',
      key: 'id'
    }
  },
  settings: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {}
  }
}, {
  tableName: 'conversations',
  timestamps: true,
  indexes: [
    {
      fields: ['type']
    },
    {
      fields: ['last_message_at']
    },
    {
      fields: ['created_by']
    },
    {
      fields: ['department_id']
    }
  ]
});

module.exports = Conversation;
