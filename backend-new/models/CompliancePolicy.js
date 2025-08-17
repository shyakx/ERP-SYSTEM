const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const CompliancePolicy = sequelize.define('CompliancePolicy', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  policy_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  policy_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['data_protection', 'financial', 'operational', 'security', 'hr', 'environmental', 'quality', 'other']]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  policy_content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  version: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  effective_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  review_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  expiry_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  regulatory_framework: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  compliance_level: {
    type: DataTypes.STRING(20),
    defaultValue: 'mandatory',
    validate: {
      isIn: [['mandatory', 'recommended', 'optional']]
    }
  },
  risk_level: {
    type: DataTypes.STRING(20),
    defaultValue: 'medium',
    validate: {
      isIn: [['low', 'medium', 'high', 'critical']]
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
  responsible_person: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'draft',
    validate: {
      isIn: [['draft', 'review', 'approved', 'active', 'archived']]
    }
  },
  approval_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  approved_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  document_file: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  training_required: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  training_frequency: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['annually', 'biannually', 'quarterly', 'monthly', 'on_hire']]
    }
  },
  audit_frequency: {
    type: DataTypes.STRING(50),
    allowNull: true,
    validate: {
      isIn: [['annually', 'biannually', 'quarterly', 'monthly', 'continuous']]
    }
  },
  last_audit_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  next_audit_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  compliance_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 100
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
  tableName: 'compliance_policies',
  timestamps: true
});

module.exports = CompliancePolicy; 