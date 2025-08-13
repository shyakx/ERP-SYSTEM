import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllCandidates,
  getCandidateById,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  updateCandidateStatus,
  getCandidateStats
} from '../controllers/candidateController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', getAllCandidates);
router.get('/test/stats', getCandidateStats);

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all candidates with pagination and filtering
router.get('/', getAllCandidates);

// Get candidate statistics
router.get('/stats', getCandidateStats);

// Get candidate by ID with detailed information
router.get('/:id', getCandidateById);

// Create new candidate
router.post('/', createCandidate);

// Update candidate
router.put('/:id', updateCandidate);

// Delete candidate (soft delete)
router.delete('/:id', deleteCandidate);

// Update candidate status
router.patch('/:id/status', updateCandidateStatus);

export default router; 