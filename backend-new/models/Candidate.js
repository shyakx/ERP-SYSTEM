const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Candidate = sequelize.define('Candidate', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  gender: {
    type: DataTypes.STRING(10),
    allowNull: true,
    validate: {
      isIn: [['male', 'female', 'other']]
    }
  },
  nationality: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  postal_code: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  current_position: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  current_company: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  years_of_experience: {
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
  field_of_study: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  university: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  graduation_year: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  skills: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  languages: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  certifications: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  expected_salary: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  salary_currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  notice_period: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  availability_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  source: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      isIn: [['website', 'referral', 'job_board', 'social_media', 'recruitment_agency', 'other']]
    }
  },
  referred_by: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  resume_file: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  cover_letter: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  portfolio_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  linkedin_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'new',
    validate: {
      isIn: [['new', 'screening', 'interviewing', 'shortlisted', 'offered', 'hired', 'rejected', 'withdrawn']]
    }
  },
  assigned_to: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
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
  }
}, {
  tableName: 'candidates',
  timestamps: true
});

module.exports = Candidate; 