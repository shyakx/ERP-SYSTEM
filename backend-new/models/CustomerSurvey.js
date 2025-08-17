const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CustomerSurvey = sequelize.define('CustomerSurvey', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  survey_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  survey_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['satisfaction', 'feedback', 'nps', 'product', 'service', 'support', 'general']]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  client_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'clients',
      key: 'id'
    }
  },
  contact_person: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  contact_email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contact_phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  survey_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  overall_rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  service_quality_rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  communication_rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  value_for_money_rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  likelihood_to_recommend: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  },
  nps_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 10
    }
  },
  nps_category: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      isIn: [['detractor', 'passive', 'promoter']]
    }
  },
  strengths: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  areas_for_improvement: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  specific_feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  follow_up_required: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  follow_up_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  follow_up_notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  action_items: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'completed',
    validate: {
      isIn: [['pending', 'in_progress', 'completed', 'follow_up']]
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
  tableName: 'customer_surveys',
  timestamps: true
});

module.exports = CustomerSurvey; 