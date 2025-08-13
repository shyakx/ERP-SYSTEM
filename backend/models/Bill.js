import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Bill = sequelize.define('Bill', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  billNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  vendorId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  vendorName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vendorInvoiceNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('service', 'product', 'subscription', 'one_time'),
    defaultValue: 'service'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  taxAmount: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  discountAmount: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  totalAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING(3),
    defaultValue: 'RWF'
  },
  issueDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  paymentTerms: {
    type: DataTypes.INTEGER,
    defaultValue: 30
  },
  status: {
    type: DataTypes.ENUM('draft', 'received', 'paid', 'overdue', 'cancelled', 'partially_paid'),
    defaultValue: 'draft'
  },
  paidAmount: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0
  },
  remainingAmount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.ENUM('bank_transfer', 'check', 'cash', 'credit_card'),
    allowNull: true
  },
  referenceNumber: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  terms: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  attachments: {
    type: DataTypes.JSON,
    allowNull: true
  },
  receivedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  paidAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  approvedBy: {
    type: DataTypes.UUID,
    allowNull: true
  },
  approvedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  hooks: {
    beforeCreate: (bill) => {
      if (!bill.billNumber) {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        bill.billNumber = `BILL-${year}${month}-${random}`;
      }
      // Calculate remaining amount
      bill.remainingAmount = bill.totalAmount - (bill.paidAmount || 0);
    },
    beforeUpdate: (bill) => {
      // Recalculate remaining amount on update
      bill.remainingAmount = bill.totalAmount - (bill.paidAmount || 0);
    }
  }
});

export default Bill; 