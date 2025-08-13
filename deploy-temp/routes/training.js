import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
import {
  getAllTrainingCourses,
  getTrainingCourseById,
  createTrainingCourse,
  updateTrainingCourse,
  deleteTrainingCourse,
  getTrainingEnrollments,
  enrollEmployee,
  updateEnrollmentStatus,
  getTrainingStats
} from '../controllers/trainingController.js';

const router = express.Router();

// Test endpoints for development (no authentication required)
router.get('/courses/test', getAllTrainingCourses);
router.get('/enrollments/test', getTrainingEnrollments);
router.get('/test/stats', getTrainingStats);

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Course routes
router.get('/courses', getAllTrainingCourses);
router.get('/courses/:id', getTrainingCourseById);
router.post('/courses', createTrainingCourse);
router.put('/courses/:id', updateTrainingCourse);
router.delete('/courses/:id', deleteTrainingCourse);

// Enrollment routes
router.get('/enrollments', getTrainingEnrollments);
router.post('/enroll', enrollEmployee);
router.patch('/enrollments/:id/status', updateEnrollmentStatus);

// Statistics
router.get('/stats', getTrainingStats);

export default router; 