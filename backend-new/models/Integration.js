const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Integration = sequelize.define('Integration', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  integration_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  integration_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['api', 'webhook', 'database', 'file_transfer', 'email', 'messaging', 'other']]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  external_system: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  vendor: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  endpoint_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  api_key: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  api_secret: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  authentication_method: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['api_key', 'oauth2', 'basic_auth', 'bearer_token', 'none']]
    }
  },
  connection_string: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  data_format: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['json', 'xml', 'csv', 'soap', 'rest', 'other']]
    }
  },
  sync_direction: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      isIn: [['inbound', 'outbound', 'bidirectional']]
    }
  },
  sync_frequency: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      isIn: [['real_time', 'hourly', 'daily', 'weekly', 'monthly', 'on_demand']]
    }
  },
  last_sync: {
    type: DataTypes.DATE,
    allowNull: true
  },
  next_sync: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'inactive', 'error', 'maintenance']]
    }
  },
  health_status: {
    type: DataTypes.STRING(20),
    defaultValue: 'healthy',
    validate: {
      isIn: [['healthy', 'warning', 'error', 'unknown']]
    }
  },
  error_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  last_error: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  last_error_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  retry_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  max_retries: {
    type: DataTypes.INTEGER,
    defaultValue: 3
  },
  timeout_seconds: {
    type: DataTypes.INTEGER,
    defaultValue: 30
  },
  rate_limit: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  rate_limit_window: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  data_mapping: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  transformation_rules: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  webhook_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  webhook_secret: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  department_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'departments',
      key: 'id'
    }
  },
  responsible_person: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  vendor_contact: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  support_contact: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  documentation_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
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
  approved_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  approved_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'integrations',
  timestamps: true
});

module.exports = Integration; 