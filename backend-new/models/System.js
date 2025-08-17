const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const System = sequelize.define('System', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  system_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  system_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['application', 'database', 'server', 'network', 'cloud', 'mobile', 'desktop', 'other']]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  version: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  vendor: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  license_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['proprietary', 'open_source', 'freeware', 'shareware', 'subscription', 'perpetual']]
    }
  },
  license_expiry: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  installation_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  last_updated: {
    type: DataTypes.DATE,
    allowNull: true
  },
  system_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  admin_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  api_endpoint: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  database_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  server_location: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  backup_frequency: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['daily', 'weekly', 'monthly', 'quarterly', 'never']]
    }
  },
  last_backup: {
    type: DataTypes.DATE,
    allowNull: true
  },
  uptime_percentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  critical_level: {
    type: DataTypes.STRING(20),
    defaultValue: 'medium',
    validate: {
      isIn: [['low', 'medium', 'high', 'critical']]
    }
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'inactive', 'maintenance', 'deprecated', 'decommissioned']]
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
  responsible_person: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  technical_contact: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  support_contact: {
    type: DataTypes.STRING(200),
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
  }
}, {
  tableName: 'systems',
  timestamps: true
});

module.exports = System; 