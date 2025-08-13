import { Transaction, Account, Vendor, Customer, User } from '../models/associations.js';
import { Op } from 'sequelize';

// Get all transactions with pagination and filtering
export const getAllTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, category, status, search } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };
    if (type) whereClause.type = type;
    if (category) whereClause.category = category;
    if (status) whereClause.status = status;
    if (search) {
      whereClause[Op.or] = [
        { description: { [Op.iLike]: `%${search}%` } },
        { transactionNumber: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: transactions } = await Transaction.findAndCountAll({
      where: whereClause,
      include: [
        { model: Account, as: 'account', attributes: ['name', 'accountNumber'] },
        { model: Vendor, as: 'vendor', attributes: ['name', 'vendorCode'] },
        { model: Customer, as: 'customer', attributes: ['name', 'customerCode'] },
        { model: User, as: 'transactionCreator', attributes: ['name'] }
      ],
      order: [['transactionDate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      transactions,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// Test endpoint for development
export const testGetAllTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: transactions } = await Transaction.findAndCountAll({
      where: { isActive: true },
      include: [
        { model: Account, as: 'account', attributes: ['name', 'accountNumber'] },
        { model: Vendor, as: 'vendor', attributes: ['name', 'vendorCode'] },
        { model: Customer, as: 'customer', attributes: ['name', 'customerCode'] }
      ],
      order: [['transactionDate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      items: transactions,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// Get transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({
      where: { id, isActive: true },
      include: [
        { model: Account, as: 'account' },
        { model: Vendor, as: 'vendor' },
        { model: Customer, as: 'customer' }
      ]
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ error: 'Failed to fetch transaction' });
  }
};

// Create new transaction
export const createTransaction = async (req, res) => {
  try {
    const transactionData = {
      ...req.body,
      createdBy: req.user.id
    };

    const transaction = await Transaction.create(transactionData);
    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

// Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({ where: { id, isActive: true } });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    await transaction.update(req.body);
    res.json(transaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(500).json({ error: 'Failed to update transaction' });
  }
};

// Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOne({ where: { id, isActive: true } });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    await transaction.update({ isActive: false });
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};

// Get transaction statistics
export const getTransactionStats = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ where: { isActive: true } });

    const stats = {
      total: transactions.length,
      totalAmount: transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0),
      income: transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0),
      expense: transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0),
      pending: transactions.filter(t => t.status === 'pending').length,
      completed: transactions.filter(t => t.status === 'completed').length,
      overdue: transactions.filter(t => t.status === 'overdue').length
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching transaction stats:', error);
    res.status(500).json({ error: 'Failed to fetch transaction statistics' });
  }
}; 