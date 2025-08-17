const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Budget = sequelize.define('Budget', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  budget_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['department', 'project', 'operational', 'capital', 'revenue']]
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
  fiscal_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  period: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['monthly', 'quarterly', 'annual']]
    }
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  total_budget: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  allocated_amount: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  spent_amount: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  remaining_amount: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'active',
    validate: {
      isIn: [['draft', 'active', 'closed', 'cancelled']]
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
  tableName: 'budgets',
  timestamps: true
});

module.exports = Budget; 