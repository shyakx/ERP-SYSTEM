import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllAttendanceRecords,
  getAttendanceRecordById,
  createAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord,
  checkIn,
  checkOut,
  getAttendanceStats
} from '../controllers/attendanceController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/test', getAllAttendanceRecords);
router.get('/test/stats', getAttendanceStats);

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Get all attendance records with pagination and filtering
router.get('/', getAllAttendanceRecords);

// Get attendance record by ID
router.get('/:id', getAttendanceRecordById);

// Create new attendance record
router.post('/', createAttendanceRecord);

// Update attendance record
router.put('/:id', updateAttendanceRecord);

// Delete attendance record (soft delete)
router.delete('/:id', deleteAttendanceRecord);

// Check in employee
router.post('/checkin', checkIn);

// Check out employee
router.post('/checkout', checkOut);

// Get attendance statistics
router.get('/stats', getAttendanceStats);

export default router; 