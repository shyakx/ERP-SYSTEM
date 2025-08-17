const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const JobPosting = sequelize.define('JobPosting', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  job_title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  job_code: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  department_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'departments',
      key: 'id'
    }
  },
  position_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['full_time', 'part_time', 'contract', 'internship', 'temporary', 'freelance']]
    }
  },
  location: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  remote_option: {
    type: DataTypes.STRING(20),
    defaultValue: 'no',
    validate: {
      isIn: [['no', 'hybrid', 'fully_remote']]
    }
  },
  job_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  requirements: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  responsibilities: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  qualifications: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  skills_required: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  experience_level: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['entry', 'junior', 'mid_level', 'senior', 'lead', 'executive']]
    }
  },
  min_experience_years: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  max_experience_years: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  education_level: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['high_school', 'diploma', 'bachelor', 'master', 'phd', 'other']]
    }
  },
  salary_range_min: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  salary_range_max: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  benefits: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  posting_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  closing_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'active',
    validate: {
      isIn: [['draft', 'active', 'paused', 'closed', 'filled', 'cancelled']]
    }
  },
  priority: {
    type: DataTypes.STRING(20),
    defaultValue: 'normal',
    validate: {
      isIn: [['low', 'normal', 'high', 'urgent']]
    }
  },
  positions_available: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  positions_filled: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  applications_received: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  hiring_manager: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  recruiter: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  external_url: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  internal_only: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  tags: {
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
  tableName: 'job_postings',
  timestamps: true
});

module.exports = JobPosting; 