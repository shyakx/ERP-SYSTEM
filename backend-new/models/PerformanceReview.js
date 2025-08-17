const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PerformanceReview = sequelize.define('PerformanceReview', {
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
  reviewer_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  review_period_start: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  review_period_end: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  review_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  review_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['annual', 'quarterly', 'monthly', 'probation', 'project']]
    }
  },
  overall_rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  performance_goals: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  achievements: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  areas_for_improvement: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  strengths: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  weaknesses: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  goals_for_next_period: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  training_needs: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  salary_recommendation: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['increase', 'decrease', 'maintain', 'bonus']]
    }
  },
  promotion_recommendation: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['promote', 'maintain', 'demote', 'terminate']]
    }
  },
  employee_comments: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  manager_comments: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  hr_comments: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'draft',
    validate: {
      isIn: [['draft', 'submitted', 'reviewed', 'approved', 'completed']]
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
  },
  next_review_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  tableName: 'performance_reviews',
  timestamps: true
});

module.exports = PerformanceReview; 