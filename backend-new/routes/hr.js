const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

// Import models
const Employee = require('../models/Employee');
const User = require('../models/User');
const Department = require('../models/Department');
const LeaveRequest = require('../models/LeaveRequest');
const AttendanceRecord = require('../models/AttendanceRecord');
const PayrollRecord = require('../models/PayrollRecord');
const PerformanceReview = require('../models/PerformanceReview');
const TrainingProgram = require('../models/TrainingProgram');
const TrainingEnrollment = require('../models/TrainingEnrollment');
const Benefit = require('../models/Benefit');
const Candidate = require('../models/Candidate');
const Interview = require('../models/Interview');
const Goal = require('../models/Goal');
const JobPosting = require('../models/JobPosting');

// Import middleware
const { authenticateToken, requireRole } = require('../middlewares/auth');

// ==================== EMPLOYEES ====================

// Get all employees with pagination and search
router.get('/employees', authenticateToken, requireRole(['admin', 'hr']), async (req, res) => {
  try {
    const { page = 1, limit = 10, search, department, position, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    if (search) {
      whereClause = {
        [Op.or]: [
          { first_name: { [Op.iLike]: `%${search}%` } },
          { last_name: { [Op.iLike]: `%${search}%` } },
          { employee_number: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (department) whereClause.department_id = department;
    if (position) whereClause.position = { [Op.iLike]: `%${position}%` };
    if (status) whereClause.is_active = status === 'active';

    const { count, rows: employees } = await Employee.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['id', 'name']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'role', 'is_active']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: employees,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get employee by ID
router.get('/employees/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id, {
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['id', 'name']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'role', 'is_active']
        }
      ]
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.json({
      success: true,
      data: employee
    });

  } catch (error) {
    console.error('Get employee error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new employee
router.post('/employees', authenticateToken, requireRole(['admin', 'hr']), async (req, res) => {
  try {
    const {
      employee_number,
      first_name,
      last_name,
      department_id,
      position,
      hire_date,
      salary,
      email,
      phone,
      address,
      emergency_contact,
      bank_details
    } = req.body;

    // Validate required fields
    if (!employee_number || !first_name || !last_name || !department_id || !position || !hire_date || !salary) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Check if employee number already exists
    const existingEmployee = await Employee.findOne({ where: { employee_number } });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'Employee number already exists'
      });
    }

    // Create employee
    const employee = await Employee.create({
      employee_number,
      first_name,
      last_name,
      department_id,
      position,
      hire_date,
      salary,
      email,
      phone,
      address,
      emergency_contact,
      bank_details,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Employee created successfully',
      data: employee
    });

  } catch (error) {
    console.error('Create employee error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update employee
router.put('/employees/:id', authenticateToken, requireRole(['admin', 'hr']), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    await employee.update(updateData);

    res.json({
      success: true,
      message: 'Employee updated successfully',
      data: employee
    });

  } catch (error) {
    console.error('Update employee error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete employee
router.delete('/employees/:id', authenticateToken, requireRole(['admin', 'hr']), async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    await employee.destroy();

    res.json({
      success: true,
      message: 'Employee deleted successfully'
    });

  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== LEAVE REQUESTS ====================

// Get all leave requests
router.get('/leave-requests', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, employee_id, type } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (status) whereClause.status = status;
    if (employee_id) whereClause.employee_id = employee_id;
    if (type) whereClause.leave_type = type;

    const { count, rows: leaveRequests } = await LeaveRequest.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Employee,
          as: 'employee',
          attributes: ['id', 'first_name', 'last_name', 'employee_number', 'department_id'],
          include: [
            {
              model: Department,
              as: 'department',
              attributes: ['id', 'name']
            }
          ]
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: leaveRequests,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get leave requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create leave request
router.post('/leave-requests', authenticateToken, async (req, res) => {
  try {
    const {
      employee_id,
      leave_type,
      start_date,
      end_date,
      reason,
      emergency_contact
    } = req.body;

    if (!employee_id || !leave_type || !start_date || !end_date || !reason) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    const leaveRequest = await LeaveRequest.create({
      employee_id,
      leave_type,
      start_date,
      end_date,
      reason,
      emergency_contact,
      status: 'pending',
      requested_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Leave request created successfully',
      data: leaveRequest
    });

  } catch (error) {
    console.error('Create leave request error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update leave request status
router.put('/leave-requests/:id/status', authenticateToken, requireRole(['admin', 'hr']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comments } = req.body;

    const leaveRequest = await LeaveRequest.findByPk(id);
    if (!leaveRequest) {
      return res.status(404).json({
        success: false,
        message: 'Leave request not found'
      });
    }

    await leaveRequest.update({
      status,
      comments,
      reviewed_by: req.user.id,
      reviewed_at: new Date()
    });

    res.json({
      success: true,
      message: 'Leave request status updated successfully',
      data: leaveRequest
    });

  } catch (error) {
    console.error('Update leave request error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== ATTENDANCE ====================

// Get attendance records
router.get('/attendance', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, employee_id, date_from, date_to } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (employee_id) whereClause.employee_id = employee_id;
    
    if (date_from && date_to) {
      whereClause.date = {
        [Op.between]: [date_from, date_to]
      };
    }

    const { count, rows: attendanceRecords } = await AttendanceRecord.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Employee,
          as: 'employee',
          attributes: ['id', 'first_name', 'last_name', 'employee_number']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['date', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: attendanceRecords,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Record attendance
router.post('/attendance', authenticateToken, async (req, res) => {
  try {
    const { employee_id, date, clock_in, clock_out, break_duration, overtime_hours } = req.body;

    if (!employee_id || !date || !clock_in) {
      return res.status(400).json({
        success: false,
        message: 'Employee ID, date, and clock-in time are required'
      });
    }

    // Check if attendance already exists for this date
    const existingAttendance = await AttendanceRecord.findOne({
      where: { employee_id, date }
    });

    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: 'Attendance already recorded for this date'
      });
    }

    const attendanceRecord = await AttendanceRecord.create({
      employee_id,
      date,
      clock_in,
      clock_out,
      break_duration,
      overtime_hours,
      recorded_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Attendance recorded successfully',
      data: attendanceRecord
    });

  } catch (error) {
    console.error('Record attendance error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== PAYROLL ====================

// Get payroll records
router.get('/payroll', authenticateToken, requireRole(['admin', 'hr', 'finance']), async (req, res) => {
  try {
    const { page = 1, limit = 10, employee_id, month, year } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (employee_id) whereClause.employee_id = employee_id;
    if (month) whereClause.month = month;
    if (year) whereClause.year = year;

    const { count, rows: payrollRecords } = await PayrollRecord.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Employee,
          as: 'employee',
          attributes: ['id', 'first_name', 'last_name', 'employee_number', 'salary']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['year', 'DESC'], ['month', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: payrollRecords,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get payroll error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Generate payroll
router.post('/payroll/generate', authenticateToken, requireRole(['admin', 'hr', 'finance']), async (req, res) => {
  try {
    const { month, year, employee_ids } = req.body;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: 'Month and year are required'
      });
    }

    // Get employees for payroll generation
    let whereClause = { is_active: true };
    if (employee_ids && employee_ids.length > 0) {
      whereClause.id = { [Op.in]: employee_ids };
    }

    const employees = await Employee.findAll({
      where: whereClause,
      include: [
        {
          model: AttendanceRecord,
          as: 'attendanceRecords',
          where: {
            date: {
              [Op.and]: [
                { [Op.gte]: new Date(year, month - 1, 1) },
                { [Op.lt]: new Date(year, month, 1) }
              ]
            }
          },
          required: false
        }
      ]
    });

    const payrollRecords = [];

    for (const employee of employees) {
      // Calculate basic salary, deductions, and net pay
      const basicSalary = employee.salary;
      const totalHours = employee.attendanceRecords.reduce((sum, record) => {
        const clockIn = new Date(record.clock_in);
        const clockOut = record.clock_out ? new Date(record.clock_out) : new Date();
        const hours = (clockOut - clockIn) / (1000 * 60 * 60);
        return sum + Math.max(0, hours - (record.break_duration || 0));
      }, 0);

      const overtimeHours = employee.attendanceRecords.reduce((sum, record) => {
        return sum + (record.overtime_hours || 0);
      }, 0);

      const overtimePay = overtimeHours * (basicSalary / 160) * 1.5; // 1.5x rate for overtime
      const grossPay = basicSalary + overtimePay;
      
      // Calculate deductions (simplified)
      const tax = grossPay * 0.1; // 10% tax
      const socialSecurity = grossPay * 0.05; // 5% social security
      const totalDeductions = tax + socialSecurity;
      const netPay = grossPay - totalDeductions;

      const payrollRecord = await PayrollRecord.create({
        employee_id: employee.id,
        month,
        year,
        basic_salary: basicSalary,
        overtime_pay: overtimePay,
        gross_pay: grossPay,
        tax_deduction: tax,
        social_security_deduction: socialSecurity,
        total_deductions: totalDeductions,
        net_pay: netPay,
        total_hours: totalHours,
        overtime_hours: overtimeHours,
        generated_by: req.user.id
      });

      payrollRecords.push(payrollRecord);
    }

    res.status(201).json({
      success: true,
      message: `Payroll generated successfully for ${payrollRecords.length} employees`,
      data: payrollRecords
    });

  } catch (error) {
    console.error('Generate payroll error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== PERFORMANCE REVIEWS ====================

// Get performance reviews
router.get('/performance-reviews', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, employee_id, year, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (employee_id) whereClause.employee_id = employee_id;
    if (year) whereClause.year = year;
    if (status) whereClause.status = status;

    const { count, rows: reviews } = await PerformanceReview.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Employee,
          as: 'employee',
          attributes: ['id', 'first_name', 'last_name', 'employee_number', 'position']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['year', 'DESC'], ['quarter', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: reviews,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get performance reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create performance review
router.post('/performance-reviews', authenticateToken, requireRole(['admin', 'hr']), async (req, res) => {
  try {
    const {
      employee_id,
      year,
      quarter,
      goals_achieved,
      goals_total,
      rating,
      strengths,
      areas_for_improvement,
      comments,
      reviewer_id
    } = req.body;

    if (!employee_id || !year || !quarter || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Employee ID, year, quarter, and rating are required'
      });
    }

    const review = await PerformanceReview.create({
      employee_id,
      year,
      quarter,
      goals_achieved: goals_achieved || 0,
      goals_total: goals_total || 0,
      rating,
      strengths,
      areas_for_improvement,
      comments,
      reviewer_id: reviewer_id || req.user.id,
      status: 'completed'
    });

    res.status(201).json({
      success: true,
      message: 'Performance review created successfully',
      data: review
    });

  } catch (error) {
    console.error('Create performance review error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== TRAINING ====================

// Get training programs
router.get('/training-programs', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, category } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (status) whereClause.status = status;
    if (category) whereClause.category = category;

    const { count, rows: programs } = await TrainingProgram.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: programs,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get training programs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create training program
router.post('/training-programs', authenticateToken, requireRole(['admin', 'hr']), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      duration_hours,
      start_date,
      end_date,
      max_participants,
      instructor,
      location,
      cost
    } = req.body;

    if (!title || !description || !category || !duration_hours) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, category, and duration are required'
      });
    }

    const program = await TrainingProgram.create({
      title,
      description,
      category,
      duration_hours,
      start_date,
      end_date,
      max_participants,
      instructor,
      location,
      cost,
      status: 'scheduled',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Training program created successfully',
      data: program
    });

  } catch (error) {
    console.error('Create training program error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Enroll in training
router.post('/training-enrollments', authenticateToken, async (req, res) => {
  try {
    const { training_program_id, employee_id } = req.body;

    if (!training_program_id || !employee_id) {
      return res.status(400).json({
        success: false,
        message: 'Training program ID and employee ID are required'
      });
    }

    // Check if already enrolled
    const existingEnrollment = await TrainingEnrollment.findOne({
      where: { training_program_id, employee_id }
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Employee is already enrolled in this training program'
      });
    }

    const enrollment = await TrainingEnrollment.create({
      training_program_id,
      employee_id,
      enrollment_date: new Date(),
      status: 'enrolled'
    });

    res.status(201).json({
      success: true,
      message: 'Enrolled in training program successfully',
      data: enrollment
    });

  } catch (error) {
    console.error('Training enrollment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== RECRUITMENT ====================

// Get job postings
router.get('/job-postings', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, department } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (status) whereClause.status = status;
    if (department) whereClause.department_id = department;

    const { count, rows: jobPostings } = await JobPosting.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Department,
          as: 'department',
          attributes: ['id', 'name']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: jobPostings,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get job postings error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create job posting
router.post('/job-postings', authenticateToken, requireRole(['admin', 'hr']), async (req, res) => {
  try {
    const {
      title,
      description,
      department_id,
      position,
      requirements,
      responsibilities,
      salary_range,
      location,
      employment_type,
      experience_level
    } = req.body;

    if (!title || !description || !department_id || !position) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, department, and position are required'
      });
    }

    const jobPosting = await JobPosting.create({
      title,
      description,
      department_id,
      position,
      requirements,
      responsibilities,
      salary_range,
      location,
      employment_type,
      experience_level,
      status: 'active',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Job posting created successfully',
      data: jobPosting
    });

  } catch (error) {
    console.error('Create job posting error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get candidates
router.get('/candidates', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, job_posting_id, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (job_posting_id) whereClause.job_posting_id = job_posting_id;
    if (status) whereClause.status = status;

    const { count, rows: candidates } = await Candidate.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: JobPosting,
          as: 'jobPosting',
          attributes: ['id', 'title', 'position']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: candidates,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get candidates error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create candidate
router.post('/candidates', authenticateToken, async (req, res) => {
  try {
    const {
      job_posting_id,
      first_name,
      last_name,
      email,
      phone,
      resume_url,
      cover_letter,
      experience_years,
      education,
      skills
    } = req.body;

    if (!job_posting_id || !first_name || !last_name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Job posting ID, name, and email are required'
      });
    }

    const candidate = await Candidate.create({
      job_posting_id,
      first_name,
      last_name,
      email,
      phone,
      resume_url,
      cover_letter,
      experience_years,
      education,
      skills,
      status: 'applied'
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: candidate
    });

  } catch (error) {
    console.error('Create candidate error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== HR STATISTICS ====================

// Get HR dashboard statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const totalEmployees = await Employee.count();
    const activeEmployees = await Employee.count({ where: { is_active: true } });
    const pendingLeaveRequests = await LeaveRequest.count({ where: { status: 'pending' } });
    const activeJobPostings = await JobPosting.count({ where: { status: 'active' } });
    const totalCandidates = await Candidate.count();
    const activeTrainingPrograms = await TrainingProgram.count({ where: { status: 'active' } });

    // Get recent activities
    const recentLeaveRequests = await LeaveRequest.findAll({
      limit: 5,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Employee,
          as: 'employee',
          attributes: ['first_name', 'last_name']
        }
      ]
    });

    const recentHires = await Employee.findAll({
      limit: 5,
      where: {
        hire_date: {
          [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      },
      order: [['hire_date', 'DESC']],
      attributes: ['first_name', 'last_name', 'position', 'hire_date']
    });

    res.json({
      success: true,
      data: {
        totalEmployees,
        activeEmployees,
        pendingLeaveRequests,
        activeJobPostings,
        totalCandidates,
        activeTrainingPrograms,
        recentLeaveRequests,
        recentHires
      }
    });

  } catch (error) {
    console.error('Get HR stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
