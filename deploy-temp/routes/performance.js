import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllPerformanceReviews,
  getPerformanceReviewById,
  createPerformanceReview,
  updatePerformanceReview,
  deletePerformanceReview,
  getPerformanceStats
} from '../controllers/performanceController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', getAllPerformanceReviews);
router.get('/test/stats', getPerformanceStats);

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all performance reviews with pagination and filtering
router.get('/', getAllPerformanceReviews);

// Get performance review by ID
router.get('/:id', getPerformanceReviewById);

// Create new performance review
router.post('/', createPerformanceReview);

// Update performance review
router.put('/:id', updatePerformanceReview);

// Delete performance review (soft delete)
router.delete('/:id', deletePerformanceReview);

// Get performance statistics
router.get('/stats', getPerformanceStats);

export default router; 