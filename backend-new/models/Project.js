const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  project_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  project_code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  project_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['internal', 'client', 'research', 'development', 'maintenance', 'migration', 'other']]
    }
  },
  client_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'clients',
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
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  actual_start_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  actual_end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  budget: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  actual_cost: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'planning',
    validate: {
      isIn: [['planning', 'active', 'on_hold', 'completed', 'cancelled', 'suspended']]
    }
  },
  priority: {
    type: DataTypes.STRING(20),
    defaultValue: 'medium',
    validate: {
      isIn: [['low', 'medium', 'high', 'critical']]
    }
  },
  progress_percentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  project_manager: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  team_members: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  stakeholders: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  objectives: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  deliverables: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  risks: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  milestones: {
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
  tableName: 'projects',
  timestamps: true
});

module.exports = Project; 