import { Budget, Project, User } from '../models/associations.js';
import { Op } from 'sequelize';

// Get all budgets with pagination and filtering
export const getAllBudgets = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, type, status, period, year, search } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };
    if (category) whereClause.category = category;
    if (type) whereClause.type = type;
    if (status) whereClause.status = status;
    if (period) whereClause.period = period;
    if (year) whereClause.year = year;
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { budgetNumber: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: budgets } = await Budget.findAndCountAll({
      where: whereClause,
      include: [
        { model: Project, as: 'budgetProject', attributes: ['name'] },
        { model: User, as: 'budgetCreator', attributes: ['name'] }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      budgets,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
};

// Test endpoint for development
export const testGetAllBudgets = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: budgets } = await Budget.findAndCountAll({
      where: { isActive: true },
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      items: budgets,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching budgets:', error);
    res.json({
      items: [],
      total: 0,
      totalPages: 0,
      currentPage: 1
    });
  }
};

// Get budget by ID
export const getBudgetById = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findOne({
      where: { id, isActive: true },
      include: [
        { model: Project, as: 'budgetProject' }
      ]
    });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.json(budget);
  } catch (error) {
    console.error('Error fetching budget:', error);
    res.status(500).json({ error: 'Failed to fetch budget' });
  }
};

// Create new budget
export const createBudget = async (req, res) => {
  try {
    const budgetData = {
      ...req.body,
      createdBy: req.user.id
    };

    const budget = await Budget.create(budgetData);
    res.status(201).json(budget);
  } catch (error) {
    console.error('Error creating budget:', error);
    res.status(500).json({ error: 'Failed to create budget' });
  }
};

// Update budget
export const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findOne({ where: { id, isActive: true } });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    await budget.update(req.body);
    res.json(budget);
  } catch (error) {
    console.error('Error updating budget:', error);
    res.status(500).json({ error: 'Failed to update budget' });
  }
};

// Delete budget
export const deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findOne({ where: { id, isActive: true } });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    await budget.update({ isActive: false });
    res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    console.error('Error deleting budget:', error);
    res.status(500).json({ error: 'Failed to delete budget' });
  }
};

// Get budget statistics
export const getBudgetStats = async (req, res) => {
  try {
    const budgets = await Budget.findAll({ where: { isActive: true } });

    const stats = {
      total: budgets.length,
      totalAllocated: budgets.reduce((sum, b) => sum + parseFloat(b.allocatedAmount), 0),
      totalSpent: budgets.reduce((sum, b) => sum + parseFloat(b.spentAmount), 0),
      totalRemaining: budgets.reduce((sum, b) => sum + parseFloat(b.remainingAmount), 0),
      active: budgets.filter(b => b.status === 'active').length,
      completed: budgets.filter(b => b.status === 'completed').length,
      draft: budgets.filter(b => b.status === 'draft').length,
      cancelled: budgets.filter(b => b.status === 'cancelled').length,
      byType: {
        income: budgets.filter(b => b.type === 'income').length,
        expense: budgets.filter(b => b.type === 'expense').length,
        capital: budgets.filter(b => b.type === 'capital').length
      },
      byPeriod: {
        monthly: budgets.filter(b => b.period === 'monthly').length,
        quarterly: budgets.filter(b => b.period === 'quarterly').length,
        yearly: budgets.filter(b => b.period === 'yearly').length
      },
      byCategory: {}
    };

    // Group by category
    budgets.forEach(budget => {
      const category = budget.category;
      if (!stats.byCategory[category]) {
        stats.byCategory[category] = {
          count: 0,
          allocated: 0,
          spent: 0,
          remaining: 0
        };
      }
      stats.byCategory[category].count++;
      stats.byCategory[category].allocated += parseFloat(budget.allocatedAmount);
      stats.byCategory[category].spent += parseFloat(budget.spentAmount);
      stats.byCategory[category].remaining += parseFloat(budget.remainingAmount);
    });

    res.json(stats);
  } catch (error) {
    console.error('Error fetching budget stats:', error);
    res.status(500).json({ error: 'Failed to fetch budget statistics' });
  }
}; 