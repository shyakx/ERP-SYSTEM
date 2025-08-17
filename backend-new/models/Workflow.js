const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Workflow = sequelize.define('Workflow', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  workflow_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  workflow_code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  workflow_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['approval', 'review', 'notification', 'escalation', 'automation', 'custom']]
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
  trigger_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['manual', 'automatic', 'scheduled', 'event_based']]
    }
  },
  trigger_conditions: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  steps: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  current_step: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  total_steps: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'inactive', 'draft', 'archived']]
    }
  },
  priority: {
    type: DataTypes.STRING(20),
    defaultValue: 'normal',
    validate: {
      isIn: [['low', 'normal', 'high', 'urgent']]
    }
  },
  timeout_days: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  escalation_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  escalation_rules: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  notification_settings: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  approval_required: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  auto_approve: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  parallel_processing: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  rollback_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  version: {
    type: DataTypes.STRING(20),
    defaultValue: '1.0'
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
  tableName: 'workflows',
  timestamps: true
});

module.exports = Workflow; 