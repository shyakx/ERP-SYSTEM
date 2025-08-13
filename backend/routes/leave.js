import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllLeaveRequests,
  getLeaveRequestById,
  createLeaveRequest,
  updateLeaveRequest,
  deleteLeaveRequest,
  updateLeaveRequestStatus,
  getLeaveTypes,
  createLeaveType,
  updateLeaveType,
  getLeaveStats
} from '../controllers/leaveController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/requests/test', getAllLeaveRequests);
router.get('/test/stats', getLeaveStats);

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Leave request routes
router.get('/requests', getAllLeaveRequests);
router.get('/requests/:id', getLeaveRequestById);
router.post('/requests', createLeaveRequest);
router.put('/requests/:id', updateLeaveRequest);
router.delete('/requests/:id', deleteLeaveRequest);
router.patch('/requests/:id/status', updateLeaveRequestStatus);

// Leave type routes
router.get('/types', getLeaveTypes);
router.post('/types', createLeaveType);
router.put('/types/:id', updateLeaveType);

// Statistics
router.get('/stats', getLeaveStats);

export default router; 