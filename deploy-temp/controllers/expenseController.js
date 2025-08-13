import { Expense, Vendor, User } from '../models/associations.js';
import { Op } from 'sequelize';

// Get all expenses with pagination and filtering
export const getAllExpenses = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status, priority, search } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };
    if (category) whereClause.category = category;
    if (status) whereClause.status = status;
    if (priority) whereClause.priority = priority;
    if (search) {
      whereClause[Op.or] = [
        { description: { [Op.iLike]: `%${search}%` } },
        { expenseNumber: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: expenses } = await Expense.findAndCountAll({
      where: whereClause,
      include: [
        { model: Vendor, as: 'expenseVendor', attributes: ['name', 'vendorCode'] }
      ],
      order: [['expenseDate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      expenses,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

// Test endpoint for development
export const testGetAllExpenses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: expenses } = await Expense.findAndCountAll({
      where: { isActive: true },
      order: [['expenseDate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      items: expenses,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    // Return empty data instead of error to prevent frontend crashes
    res.json({
      items: [],
      total: 0,
      totalPages: 0,
      currentPage: 1
    });
  }
};

// Get expense by ID
export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({
      where: { id, isActive: true },
      include: [
        { model: Vendor, as: 'expenseVendor' },
        { model: User, as: 'expenseSubmitter' }
      ]
    });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(expense);
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ error: 'Failed to fetch expense' });
  }
};

// Create new expense
export const createExpense = async (req, res) => {
  try {
    const expenseData = {
      ...req.body,
      submittedBy: req.user.id
    };

    const expense = await Expense.create(expenseData);
    res.status(201).json(expense);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Failed to create expense' });
  }
};

// Update expense
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({ where: { id, isActive: true } });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await expense.update(req.body);
    res.json(expense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({ where: { id, isActive: true } });

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    await expense.update({ isActive: false });
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};

// Get expense statistics
export const getExpenseStats = async (req, res) => {
  try {
    const expenses = await Expense.findAll({ where: { isActive: true } });

    const stats = {
      total: expenses.length,
      totalAmount: expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0),
      pending: expenses.filter(e => e.status === 'pending').length,
      approved: expenses.filter(e => e.status === 'approved').length,
      rejected: expenses.filter(e => e.status === 'rejected').length,
      paid: expenses.filter(e => e.status === 'paid').length,
      byCategory: {},
      byPriority: {
        low: expenses.filter(e => e.priority === 'low').length,
        medium: expenses.filter(e => e.priority === 'medium').length,
        high: expenses.filter(e => e.priority === 'high').length,
        urgent: expenses.filter(e => e.priority === 'urgent').length
      }
    };

    // Group by category
    expenses.forEach(expense => {
      const category = expense.category;
      if (!stats.byCategory[category]) {
        stats.byCategory[category] = {
          count: 0,
          amount: 0
        };
      }
      stats.byCategory[category].count++;
      stats.byCategory[category].amount += parseFloat(expense.amount);
    });

    res.json(stats);
  } catch (error) {
    console.error('Error fetching expense stats:', error);
    res.status(500).json({ error: 'Failed to fetch expense statistics' });
  }
}; 