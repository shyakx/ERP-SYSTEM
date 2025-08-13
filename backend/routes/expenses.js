import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpenseStats,
  testGetAllExpenses
} from '../controllers/expenseController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', testGetAllExpenses);
router.get('/test/stats', async (req, res) => {
  try {
    const { Expense } = await import('../models/associations.js');
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
    res.status(500).json({ error: 'Failed to fetch expense stats' });
  }
});

// Authenticated routes
router.get('/', authenticateToken, getAllExpenses);
router.get('/stats', authenticateToken, getExpenseStats);
router.get('/:id', authenticateToken, getExpenseById);
router.post('/', authenticateToken, createExpense);
router.put('/:id', authenticateToken, updateExpense);
router.delete('/:id', authenticateToken, deleteExpense);

export default router; 