const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Benefit = sequelize.define('Benefit', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  benefit_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  benefit_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['health_insurance', 'life_insurance', 'retirement', 'transportation', 'housing', 'education', 'meal', 'gym', 'other']]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  coverage_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['individual', 'family', 'employee_plus_spouse', 'employee_plus_children', 'full_family']]
    }
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  percentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  frequency: {
    type: DataTypes.STRING(20),
    defaultValue: 'monthly',
    validate: {
      isIn: [['monthly', 'quarterly', 'annually', 'one_time']]
    }
  },
  provider: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  policy_number: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  waiting_period_days: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  max_coverage: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true
  },
  deductible: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  co_pay: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  eligibility_criteria: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  documents_required: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'inactive', 'suspended', 'terminated']]
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
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'benefits',
  timestamps: true
});

module.exports = Benefit; 