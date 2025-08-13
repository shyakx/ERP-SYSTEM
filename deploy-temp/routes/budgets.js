import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllBudgets,
  getBudgetById,
  createBudget,
  updateBudget,
  deleteBudget,
  getBudgetStats,
  testGetAllBudgets
} from '../controllers/budgetController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', testGetAllBudgets);
router.get('/test/stats', async (req, res) => {
  try {
    const { Budget } = await import('../models/associations.js');
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
    res.status(500).json({ error: 'Failed to fetch budget stats' });
  }
});

// Authenticated routes
router.get('/', authenticateToken, getAllBudgets);
router.get('/stats', authenticateToken, getBudgetStats);
router.get('/:id', authenticateToken, getBudgetById);
router.post('/', authenticateToken, createBudget);
router.put('/:id', authenticateToken, updateBudget);
router.delete('/:id', authenticateToken, deleteBudget);

export default router; 