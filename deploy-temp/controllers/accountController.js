import { Account, Transaction, User } from '../models/associations.js';
import { Op } from 'sequelize';

// Get all accounts with pagination and filtering
export const getAllAccounts = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, status, search } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };
    if (type) whereClause.type = type;
    if (status) whereClause.status = status;
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { accountNumber: { [Op.iLike]: `%${search}%` } },
        { bankName: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: accounts } = await Account.findAndCountAll({
      where: whereClause,
      include: [
        { model: User, as: 'accountCreator', attributes: ['name'] }
      ],
      order: [['name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      accounts,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
};

// Test endpoint for development
export const testGetAllAccounts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: accounts } = await Account.findAndCountAll({
      where: { isActive: true },
      order: [['name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      items: accounts,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
};

// Get account by ID
export const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findOne({
      where: { id, isActive: true },
      include: [
        { model: Transaction, as: 'transactions', limit: 10, order: [['transactionDate', 'DESC']] }
      ]
    });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json(account);
  } catch (error) {
    console.error('Error fetching account:', error);
    res.status(500).json({ error: 'Failed to fetch account' });
  }
};

// Create new account
export const createAccount = async (req, res) => {
  try {
    const accountData = {
      ...req.body,
      createdBy: req.user.id
    };

    const account = await Account.create(accountData);
    res.status(201).json(account);
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
};

// Update account
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findOne({ where: { id, isActive: true } });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    await account.update(req.body);
    res.json(account);
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ error: 'Failed to update account' });
  }
};

// Delete account
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findOne({ where: { id, isActive: true } });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    await account.update({ isActive: false });
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: 'Failed to delete account' });
  }
};

// Get account statistics
export const getAccountStats = async (req, res) => {
  try {
    const accounts = await Account.findAll({ where: { isActive: true } });

    const stats = {
      total: accounts.length,
      totalBalance: accounts.reduce((sum, a) => sum + parseFloat(a.currentBalance), 0),
      bank: accounts.filter(a => a.type === 'bank').length,
      cash: accounts.filter(a => a.type === 'cash').length,
      receivable: accounts.filter(a => a.type === 'receivable').length,
      payable: accounts.filter(a => a.type === 'payable').length,
      active: accounts.filter(a => a.status === 'active').length,
      inactive: accounts.filter(a => a.status === 'inactive').length
    };

    res.json(stats);
  } catch (error) {
    console.error('Error fetching account stats:', error);
    res.status(500).json({ error: 'Failed to fetch account statistics' });
  }
}; 