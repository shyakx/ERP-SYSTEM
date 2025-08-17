const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const KPI = sequelize.define('KPI', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  kpi_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  kpi_code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  kpi_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['financial', 'operational', 'customer', 'employee', 'quality', 'safety', 'other']]
    }
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  subcategory: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  measurement_unit: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  calculation_method: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  data_source: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  frequency: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['daily', 'weekly', 'monthly', 'quarterly', 'annually']]
    }
  },
  target_value: {
    type: DataTypes.DECIMAL(15, 4),
    allowNull: true
  },
  minimum_value: {
    type: DataTypes.DECIMAL(15, 4),
    allowNull: true
  },
  maximum_value: {
    type: DataTypes.DECIMAL(15, 4),
    allowNull: true
  },
  current_value: {
    type: DataTypes.DECIMAL(15, 4),
    defaultValue: 0
  },
  previous_value: {
    type: DataTypes.DECIMAL(15, 4),
    allowNull: true
  },
  change_percentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  trend: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      isIn: [['increasing', 'decreasing', 'stable', 'fluctuating']]
    }
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'on_track',
    validate: {
      isIn: [['on_track', 'at_risk', 'off_track', 'exceeded']]
    }
  },
  priority: {
    type: DataTypes.STRING(20),
    defaultValue: 'medium',
    validate: {
      isIn: [['low', 'medium', 'high', 'critical']]
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
  owner: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  stakeholders: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  last_updated: {
    type: DataTypes.DATE,
    allowNull: true
  },
  next_review_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  alert_threshold: {
    type: DataTypes.DECIMAL(15, 4),
    allowNull: true
  },
  alert_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  dashboard_visible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  reporting_frequency: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      isIn: [['daily', 'weekly', 'monthly', 'quarterly', 'annually']]
    }
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
  tableName: 'kpis',
  timestamps: true
});

module.exports = KPI; 