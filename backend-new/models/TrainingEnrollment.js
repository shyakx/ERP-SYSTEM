const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TrainingEnrollment = sequelize.define('TrainingEnrollment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  training_program_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'training_programs',
      key: 'id'
    }
  },
  employee_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'employees',
      key: 'id'
    }
  },
  enrollment_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  enrollment_status: {
    type: DataTypes.STRING(20),
    defaultValue: 'enrolled',
    validate: {
      isIn: [['enrolled', 'in_progress', 'completed', 'dropped', 'cancelled']]
    }
  },
  completion_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  attendance_percentage: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 0
  },
  score: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  grade: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  certificate_issued: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  certificate_number: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  certificate_issue_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  cost_paid: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  payment_status: {
    type: DataTypes.STRING(20),
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'paid', 'waived', 'refunded']]
    }
  },
  feedback_rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 5
    }
  },
  feedback_comments: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  enrolled_by: {
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
  tableName: 'training_enrollments',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['training_program_id', 'employee_id']
    }
  ]
});

module.exports = TrainingEnrollment; 