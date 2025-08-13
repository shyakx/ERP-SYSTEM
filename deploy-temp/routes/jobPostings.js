import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllJobPostings,
  getJobPostingById,
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
  getJobPostingStats
} from '../controllers/jobPostingController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', getAllJobPostings);
router.get('/test/stats', getJobPostingStats);

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all job postings with pagination and filtering
router.get('/', getAllJobPostings);

// Get job posting statistics
router.get('/stats', getJobPostingStats);

// Get job posting by ID with detailed information
router.get('/:id', getJobPostingById);

// Create new job posting
router.post('/', createJobPosting);

// Update job posting
router.put('/:id', updateJobPosting);

// Delete job posting (soft delete)
router.delete('/:id', deleteJobPosting);

export default router; 