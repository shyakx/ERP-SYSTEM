import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoiceStats,
  testGetAllInvoices
} from '../controllers/invoiceController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', testGetAllInvoices);
router.get('/test/stats', async (req, res) => {
  try {
    const { Invoice } = await import('../models/associations.js');
    const invoices = await Invoice.count({ where: { isActive: true } });
    const paid = await Invoice.count({ where: { isActive: true, status: 'paid' } });
    const pending = await Invoice.count({ where: { isActive: true, status: 'pending' } });
    const overdue = await Invoice.count({ where: { isActive: true, status: 'overdue' } });
    
    res.json({
      total: invoices,
      paid,
      pending,
      overdue
    });
  } catch (error) {
    console.error('Error fetching invoice stats:', error);
    res.status(500).json({ error: 'Failed to fetch invoice stats' });
  }
});

// Get all invoices with pagination and filtering (requires authentication)
router.get('/', authenticateToken, getAllInvoices);

// Get invoice statistics (requires authentication)
router.get('/stats', authenticateToken, getInvoiceStats);

// Get invoice by ID with detailed information (requires authentication)
router.get('/:id', authenticateToken, getInvoiceById);

// Create new invoice (requires authentication)
router.post('/', authenticateToken, createInvoice);

// Update invoice (requires authentication)
router.put('/:id', authenticateToken, updateInvoice);

// Delete invoice (requires authentication)
router.delete('/:id', authenticateToken, deleteInvoice);

export default router; 