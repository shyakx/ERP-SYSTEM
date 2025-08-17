const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  notification_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['info', 'success', 'warning', 'error', 'alert', 'reminder', 'update']]
    }
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['system', 'hr', 'finance', 'operations', 'sales', 'security', 'it', 'general']]
    }
  },
  priority: {
    type: DataTypes.STRING(20),
    defaultValue: 'normal',
    validate: {
      isIn: [['low', 'normal', 'high', 'urgent']]
    }
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'unread',
    validate: {
      isIn: [['unread', 'read', 'archived', 'deleted']]
    }
  },
  read_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  action_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  action_data: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  sent_via: {
    type: DataTypes.JSONB,
    allowNull: true,
    validate: {
      isIn: [['email', 'sms', 'push', 'in_app', 'all']]
    }
  },
  email_sent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  email_sent_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  sms_sent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  sms_sent_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  push_sent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  push_sent_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  related_entity_type: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  related_entity_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  system_generated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'notifications',
  timestamps: true
});

module.exports = Notification; 