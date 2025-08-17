const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  report_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  report_code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  report_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['analytical', 'operational', 'financial', 'compliance', 'performance', 'custom']]
    }
  },
  category: {
    type: DataTypes.STRING(100),
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
  data_source: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  query_sql: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  parameters: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  frequency: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      isIn: [['on_demand', 'daily', 'weekly', 'monthly', 'quarterly', 'annually']]
    }
  },
  last_generated: {
    type: DataTypes.DATE,
    allowNull: true
  },
  next_generation: {
    type: DataTypes.DATE,
    allowNull: true
  },
  output_format: {
    type: DataTypes.JSONB,
    allowNull: true,
    validate: {
      isIn: [['pdf', 'excel', 'csv', 'json', 'html']]
    }
  },
  file_path: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  file_size: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'inactive', 'archived']]
    }
  },
  is_public: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  access_level: {
    type: DataTypes.STRING(20),
    defaultValue: 'department',
    validate: {
      isIn: [['public', 'department', 'role_based', 'user_specific']]
    }
  },
  authorized_roles: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  authorized_users: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  schedule_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  schedule_config: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  email_recipients: {
    type: DataTypes.JSONB,
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
  tableName: 'reports',
  timestamps: true
});

module.exports = Report; 