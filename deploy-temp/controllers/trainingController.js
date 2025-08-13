import { TrainingCourse, TrainingEnrollment, Employee } from '../models/associations.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

// Get all training courses with filtering and pagination
export const getAllTrainingCourses = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      status = 'all',
      department = 'all'
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { department: { [Op.iLike]: `%${search}%` } },
        { instructor: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (department !== 'all') {
      whereClause.department = department;
    }

    const courses = await TrainingCourse.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: TrainingEnrollment,
          as: 'courseEnrollments',
          attributes: ['id', 'status', 'enrollmentDate'],
          where: { isActive: true },
          required: false
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['startDate', 'DESC']]
    });

    res.json({
      courses: courses.rows,
      total: courses.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(courses.count / limit)
    });
  } catch (error) {
    console.error('Error fetching training courses:', error);
    res.status(500).json({ error: 'Failed to fetch training courses' });
  }
};

// Get training course by ID
export const getTrainingCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await TrainingCourse.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: TrainingEnrollment,
          as: 'courseEnrollments',
          include: [
            {
              model: Employee,
              as: 'enrolledEmployee',
              attributes: ['employeeId', 'position', 'department']
            }
          ],
          where: { isActive: true },
          required: false
        }
      ]
    });

    if (!course) {
      return res.status(404).json({ error: 'Training course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error fetching training course:', error);
    res.status(500).json({ error: 'Failed to fetch training course' });
  }
};

// Create new training course
export const createTrainingCourse = async (req, res) => {
  try {
    const courseData = req.body;

    const course = await TrainingCourse.create(courseData);

    res.status(201).json({
      message: 'Training course created successfully',
      course
    });
  } catch (error) {
    console.error('Error creating training course:', error);
    res.status(500).json({ error: 'Failed to create training course' });
  }
};

// Update training course
export const updateTrainingCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const course = await TrainingCourse.findOne({
      where: { id, isActive: true }
    });

    if (!course) {
      return res.status(404).json({ error: 'Training course not found' });
    }

    await course.update(updateData);

    res.json({
      message: 'Training course updated successfully',
      course
    });
  } catch (error) {
    console.error('Error updating training course:', error);
    res.status(500).json({ error: 'Failed to update training course' });
  }
};

// Delete training course (soft delete)
export const deleteTrainingCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await TrainingCourse.findOne({
      where: { id, isActive: true }
    });

    if (!course) {
      return res.status(404).json({ error: 'Training course not found' });
    }

    await course.update({ isActive: false });

    res.json({ message: 'Training course deleted successfully' });
  } catch (error) {
    console.error('Error deleting training course:', error);
    res.status(500).json({ error: 'Failed to delete training course' });
  }
};

// Get training enrollments
export const getTrainingEnrollments = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status = 'all',
      courseId = null
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (courseId) {
      whereClause.courseId = courseId;
    }

    const enrollments = await TrainingEnrollment.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: TrainingCourse,
          as: 'course',
          attributes: ['title', 'department', 'instructor', 'startDate', 'endDate']
        },
        {
          model: Employee,
          as: 'enrolledEmployee',
          attributes: ['employeeId', 'position', 'department', 'phone', 'email']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['enrollmentDate', 'DESC']]
    });

    res.json({
      enrollments: enrollments.rows,
      total: enrollments.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(enrollments.count / limit)
    });
  } catch (error) {
    console.error('Error fetching training enrollments:', error);
    res.status(500).json({ error: 'Failed to fetch training enrollments' });
  }
};

// Enroll employee in training course
export const enrollEmployee = async (req, res) => {
  try {
    const { courseId, employeeId } = req.body;

    // Check if course exists
    const course = await TrainingCourse.findOne({
      where: { id: courseId, isActive: true }
    });

    if (!course) {
      return res.status(404).json({ error: 'Training course not found' });
    }

    // Check if employee exists
    const employee = await Employee.findOne({
      where: { id: employeeId, isActive: true }
    });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await TrainingEnrollment.findOne({
      where: { courseId, employeeId, isActive: true }
    });

    if (existingEnrollment) {
      return res.status(400).json({ error: 'Employee already enrolled in this course' });
    }

    // Create enrollment
    const enrollment = await TrainingEnrollment.create({
      courseId,
      employeeId,
      status: 'Enrolled',
      enrollmentDate: new Date().toISOString().split('T')[0]
    });

    // Update course enrollment count
    await course.update({
      enrolled: course.enrolled + 1
    });

    res.status(201).json({
      message: 'Employee enrolled successfully',
      enrollment
    });
  } catch (error) {
    console.error('Error enrolling employee:', error);
    res.status(500).json({ error: 'Failed to enroll employee' });
  }
};

// Update enrollment status
export const updateEnrollmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, grade, feedback, completionDate } = req.body;

    const enrollment = await TrainingEnrollment.findOne({
      where: { id, isActive: true }
    });

    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    const updateData = { status };
    if (grade) updateData.grade = grade;
    if (feedback) updateData.feedback = feedback;
    if (completionDate) updateData.completionDate = completionDate;

    await enrollment.update(updateData);

    res.json({
      message: 'Enrollment status updated successfully',
      enrollment
    });
  } catch (error) {
    console.error('Error updating enrollment status:', error);
    res.status(500).json({ error: 'Failed to update enrollment status' });
  }
};

// Get training statistics
export const getTrainingStats = async (req, res) => {
  try {
    const totalCourses = await TrainingCourse.count({ where: { isActive: true } });
    const activeCourses = await TrainingCourse.count({ where: { status: 'Active', isActive: true } });
    const completedCourses = await TrainingCourse.count({ where: { status: 'Completed', isActive: true } });
    const totalEnrollments = await TrainingEnrollment.count({ where: { isActive: true } });
    const completedEnrollments = await TrainingEnrollment.count({ where: { status: 'Completed', isActive: true } });

    const departmentStats = await TrainingCourse.findAll({
      attributes: [
        'department',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { isActive: true },
      group: ['department']
    });

    const enrollmentStats = await TrainingEnrollment.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { isActive: true },
      group: ['status']
    });

    res.json({
      totalCourses,
      activeCourses,
      completedCourses,
      totalEnrollments,
      completedEnrollments,
      departmentStats,
      enrollmentStats
    });
  } catch (error) {
    console.error('Error fetching training stats:', error);
    res.status(500).json({ error: 'Failed to fetch training statistics' });
  }
}; 