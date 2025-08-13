import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentStats,
  getDepartmentEmployees
} from '../controllers/departmentController.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all departments with pagination and filtering
router.get('/', getAllDepartments);

// Get department statistics
router.get('/stats', getDepartmentStats);

// Get department by ID with detailed information
router.get('/:id', getDepartmentById);

// Get department employees
router.get('/:id/employees', getDepartmentEmployees);

// Create new department
router.post('/', createDepartment);

// Update department
router.put('/:id', updateDepartment);

// Delete department (soft delete)
router.delete('/:id', deleteDepartment);

export default router; 