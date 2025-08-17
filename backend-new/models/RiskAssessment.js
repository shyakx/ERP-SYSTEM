const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RiskAssessment = sequelize.define('RiskAssessment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  assessment_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  risk_category: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  risk_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likelihood: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  impact: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  risk_score: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  mitigation_measures: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  assigned_to: {
    type: DataTypes.UUID,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(50),
    defaultValue: 'open'
  },
  assessment_date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'risk_assessments',
  timestamps: true,
  hooks: {
    beforeCreate: (assessment) => {
      if (assessment.likelihood && assessment.impact) {
        assessment.risk_score = assessment.likelihood * assessment.impact;
      }
    },
    beforeUpdate: (assessment) => {
      if (assessment.changed('likelihood') || assessment.changed('impact')) {
        assessment.risk_score = assessment.likelihood * assessment.impact;
      }
    }
  }
});

module.exports = RiskAssessment; 