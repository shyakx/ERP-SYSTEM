const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TrainingProgram = sequelize.define('TrainingProgram', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isIn: [['technical', 'soft_skills', 'compliance', 'leadership', 'safety', 'product', 'other']]
    }
  },
  training_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['online', 'classroom', 'workshop', 'seminar', 'certification', 'on_the_job']]
    }
  },
  duration_hours: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  instructor: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  max_participants: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  current_participants: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  cost_per_participant: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  total_budget: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  materials_required: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  prerequisites: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  learning_objectives: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  assessment_method: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  certificate_provided: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'planned',
    validate: {
      isIn: [['planned', 'active', 'completed', 'cancelled', 'postponed']]
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
  created_by: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'training_programs',
  timestamps: true
});

module.exports = TrainingProgram; 