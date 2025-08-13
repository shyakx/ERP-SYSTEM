import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
  testGetAllEmployees
} from '../controllers/employeeController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', testGetAllEmployees);
router.get('/test/stats', async (req, res) => {
  try {
    const { Employee, User } = await import('../models/associations.js');
    const employees = await Employee.count({ where: { isActive: true } });
    const activeEmployees = await Employee.count({ where: { isActive: true, status: 'Active' } });
    const onLeaveEmployees = await Employee.count({ where: { isActive: true, status: 'On Leave' } });
    const inactiveEmployees = await Employee.count({ where: { isActive: true, status: 'Inactive' } });
    
    res.json({
      total: employees,
      active: activeEmployees,
      onLeave: onLeaveEmployees,
      inactive: inactiveEmployees
    });
  } catch (error) {
    console.error('Error fetching employee stats:', error);
    res.status(500).json({ error: 'Failed to fetch employee stats' });
  }
});

// Get all employees with pagination and filtering (requires authentication)
router.get('/', authenticateToken, getAllEmployees);

// Get employee statistics (requires authentication)
router.get('/stats', authenticateToken, getEmployeeStats);

// Get employee by ID with detailed information (requires authentication)
router.get('/:id', authenticateToken, getEmployeeById);

// Create new employee (requires authentication)
router.post('/', authenticateToken, createEmployee);

// Update employee (requires authentication)
router.put('/:id', authenticateToken, updateEmployee);

// Delete employee (requires authentication)
router.delete('/:id', authenticateToken, deleteEmployee);

export default router; 