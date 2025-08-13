import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectStats,
  getProjectsByDepartment
} from '../controllers/projectController.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all projects with pagination and filtering
router.get('/', getAllProjects);

// Get project statistics
router.get('/stats', getProjectStats);

// Get projects by department
router.get('/department/:departmentId', getProjectsByDepartment);

// Get project by ID with detailed information
router.get('/:id', getProjectById);

// Create new project
router.post('/', createProject);

// Update project
router.put('/:id', updateProject);

// Delete project (soft delete)
router.delete('/:id', deleteProject);

export default router; 