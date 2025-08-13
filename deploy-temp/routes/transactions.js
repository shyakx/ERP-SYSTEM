import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionStats,
  testGetAllTransactions
} from '../controllers/transactionController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', testGetAllTransactions);
router.get('/test/stats', async (req, res) => {
  try {
    const { Transaction } = await import('../models/associations.js');
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
    res.status(500).json({ error: 'Failed to fetch transaction stats' });
  }
});

// Authenticated routes
router.get('/', authenticateToken, getAllTransactions);
router.get('/stats', authenticateToken, getTransactionStats);
router.get('/:id', authenticateToken, getTransactionById);
router.post('/', authenticateToken, createTransaction);
router.put('/:id', authenticateToken, updateTransaction);
router.delete('/:id', authenticateToken, deleteTransaction);

export default router; 