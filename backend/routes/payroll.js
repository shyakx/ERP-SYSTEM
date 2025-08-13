import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllPayrollRecords,
  getPayrollRecordById,
  createPayrollRecord,
  updatePayrollRecord,
  deletePayrollRecord,
  processPayroll,
  updatePayrollStatus,
  getPayrollStats
} from '../controllers/payrollController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', getAllPayrollRecords);
router.get('/test/stats', getPayrollStats);

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all payroll records with pagination and filtering
router.get('/', getAllPayrollRecords);

// Get payroll record by ID
router.get('/:id', getPayrollRecordById);

// Create new payroll record
router.post('/', createPayrollRecord);

// Update payroll record
router.put('/:id', updatePayrollRecord);

// Delete payroll record (soft delete)
router.delete('/:id', deletePayrollRecord);

// Process payroll
router.post('/process', processPayroll);

// Update payroll status
router.patch('/:id/status', updatePayrollStatus);

// Get payroll statistics
router.get('/stats', getPayrollStats);

export default router; 