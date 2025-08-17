const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Goal = sequelize.define('Goal', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  employee_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'employees',
      key: 'id'
    }
  },
  goal_title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  goal_description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  goal_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['performance', 'development', 'project', 'sales', 'quality', 'efficiency', 'other']]
    }
  },
  goal_category: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['individual', 'team', 'department', 'company']]
    }
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  target_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  completion_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  priority: {
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
      isIn: [['draft', 'active', 'in_progress', 'completed', 'cancelled', 'overdue']]
    }
  },
  progress_percentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  target_value: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  current_value: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  unit_of_measure: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  success_criteria: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  key_activities: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  milestones: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  resources_required: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  challenges: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  support_needed: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  manager_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  reviewer_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  review_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  review_comments: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
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
  completed_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'goals',
  timestamps: true
});

module.exports = Goal; 