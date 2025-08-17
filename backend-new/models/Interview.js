const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Interview = sequelize.define('Interview', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  candidate_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'candidates',
      key: 'id'
    }
  },
  job_posting_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'job_postings',
      key: 'id'
    }
  },
  interview_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['phone', 'video', 'in_person', 'technical', 'panel', 'final']]
    }
  },
  interview_round: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  scheduled_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duration_minutes: {
    type: DataTypes.INTEGER,
    defaultValue: 60
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  meeting_link: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  interviewers: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  primary_interviewer: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'scheduled',
    validate: {
      isIn: [['scheduled', 'in_progress', 'completed', 'cancelled', 'rescheduled', 'no_show']]
    }
  },
  candidate_feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  interviewer_feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  technical_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  communication_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  cultural_fit_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  overall_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  strengths: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  weaknesses: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  recommendation: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      isIn: [['strong_hire', 'hire', 'maybe', 'no_hire', 'strong_no_hire']]
    }
  },
  next_steps: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  next_interview_date: {
    type: DataTypes.DATE,
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
  tableName: 'interviews',
  timestamps: true
});

module.exports = Interview; 