import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const TaxRecord = sequelize.define('TaxRecord', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  taxNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('vat', 'income_tax', 'withholding_tax', 'corporate_tax', 'property_tax', 'other'),
    allowNull: false
  },
  period: {
    type: DataTypes.ENUM('monthly', 'quarterly', 'yearly'),
    defaultValue: 'monthly'
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  quarter: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  taxableAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  taxRate: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  taxAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  status: {
    type: DataTypes.ENUM('draft', 'calculated', 'filed', 'paid', 'overdue', 'cancelled'),
    defaultValue: 'draft'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  filedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  paidDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  referenceNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  paymentMethod: {
    type: DataTypes.ENUM('bank_transfer', 'check', 'cash', 'online'),
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  attachments: {
    type: DataTypes.JSON,
    allowNull: true
  },
  calculatedBy: {
    type: DataTypes.UUID,
    allowNull: false
  },
  filedBy: {
    type: DataTypes.UUID,
    allowNull: true
  },
  paidBy: {
    type: DataTypes.UUID,
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (taxRecord) => {
      if (!taxRecord.taxNumber) {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        taxRecord.taxNumber = `TAX-${year}${month}-${random}`;
      }
      // Calculate tax amount if not provided
      if (!taxRecord.taxAmount && taxRecord.taxableAmount && taxRecord.taxRate) {
        taxRecord.taxAmount = (taxRecord.taxableAmount * taxRecord.taxRate) / 100;
      }
    },
    beforeUpdate: (taxRecord) => {
      // Recalculate tax amount on update
      if (taxRecord.taxableAmount && taxRecord.taxRate) {
        taxRecord.taxAmount = (taxRecord.taxableAmount * taxRecord.taxRate) / 100;
      }
    }
  }
});

export default TaxRecord; 