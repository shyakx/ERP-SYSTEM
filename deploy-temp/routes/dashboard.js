import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getDashboardStats,
  getRecentActivities,
  getDepartmentAnalytics,
  getProjectAnalytics,
  getAssetAnalytics
} from '../controllers/dashboardController.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get overall dashboard statistics
router.get('/stats', getDashboardStats);

// Get recent activities
router.get('/activities', getRecentActivities);
      
// Get department performance analytics
router.get('/analytics/departments', getDepartmentAnalytics);

// Get project performance analytics
router.get('/analytics/projects', getProjectAnalytics);

// Get asset analytics
router.get('/analytics/assets', getAssetAnalytics);

export default router;