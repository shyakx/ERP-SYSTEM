import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const InventoryTransaction = sequelize.define('InventoryTransaction', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  transactionNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  itemId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('in', 'out', 'adjustment', 'transfer', 'return', 'damage'),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unitCost: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0
  },
  totalCost: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Reference to purchase order, sales order, etc.'
  },
  referenceType: {
    type: DataTypes.ENUM('purchase_order', 'sales_order', 'transfer_order', 'adjustment', 'return', 'other'),
    allowNull: true
  },
  fromLocation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  toLocation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  transactionDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'completed'
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
    beforeCreate: (transaction) => {
      if (!transaction.transactionNumber) {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        transaction.transactionNumber = `ITXN-${year}${month}-${random}`;
      }
      // Calculate total cost
      transaction.totalCost = transaction.quantity * transaction.unitCost;
    },
    beforeUpdate: (transaction) => {
      // Recalculate total cost on update
      transaction.totalCost = transaction.quantity * transaction.unitCost;
    }
  }
});

export default InventoryTransaction; 