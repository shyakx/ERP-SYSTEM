const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

// Import models
const SecurityGuard = require('../models/SecurityGuard');
const SecurityIncident = require('../models/SecurityIncident');
const SecurityAssignment = require('../models/SecurityAssignment');

// Import middleware
const { authenticateToken, requireRole } = require('../middlewares/auth');

// ==================== SECURITY GUARDS ====================

// Get all security guards
router.get('/guards', authenticateToken, requireRole(['admin', 'security-guard-management']), async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, shift } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    if (search) {
      whereClause = {
        [Op.or]: [
          { first_name: { [Op.iLike]: `%${search}%` } },
          { last_name: { [Op.iLike]: `%${search}%` } },
          { employee_id: { [Op.iLike]: `%${search}%` } },
          { badge_number: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (status) whereClause.status = status;
    if (shift) whereClause.current_shift = shift;

    const { count, rows: guards } = await SecurityGuard.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['first_name', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        items: guards,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get security guards error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get security guard by ID
router.get('/guards/:id', authenticateToken, requireRole(['admin', 'security-guard-management']), async (req, res) => {
  try {
    const { id } = req.params;

    const guard = await SecurityGuard.findByPk(id);
    if (!guard) {
      return res.status(404).json({
        success: false,
        message: 'Security guard not found'
      });
    }

    res.json({
      success: true,
      data: guard
    });

  } catch (error) {
    console.error('Get security guard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create security guard
router.post('/guards', authenticateToken, requireRole(['admin', 'security-guard-management']), async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      employee_id,
      badge_number,
      phone,
      email,
      hire_date,
      shift,
      status,
      certifications,
      emergency_contact,
      address,
      notes
    } = req.body;

    if (!first_name || !last_name || !employee_id || !badge_number) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, employee ID, and badge number are required'
      });
    }

    // Check if employee ID or badge number already exists
    const existingGuard = await SecurityGuard.findOne({
      where: {
        [Op.or]: [
          { employee_id },
          { badge_number }
        ]
      }
    });

    if (existingGuard) {
      return res.status(400).json({
        success: false,
        message: 'Employee ID or badge number already exists'
      });
    }

    const guard = await SecurityGuard.create({
      first_name,
      last_name,
      employee_id,
      badge_number,
      phone,
      email,
      hire_date,
      current_shift: shift,
      status: status || 'active',
      certifications: certifications || [],
      emergency_contact,
      address,
      notes,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Security guard created successfully',
      data: guard
    });

  } catch (error) {
    console.error('Create security guard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update security guard
router.put('/guards/:id', authenticateToken, requireRole(['admin', 'security-guard-management']), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const guard = await SecurityGuard.findByPk(id);
    if (!guard) {
      return res.status(404).json({
        success: false,
        message: 'Security guard not found'
      });
    }

    await guard.update(updateData);

    res.json({
      success: true,
      message: 'Security guard updated successfully',
      data: guard
    });

  } catch (error) {
    console.error('Update security guard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== SECURITY INCIDENTS ====================

// Get all security incidents
router.get('/incidents', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, severity, status, date_from, date_to } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    if (search) {
      whereClause = {
        [Op.or]: [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
          { location: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (severity) whereClause.severity = severity;
    if (status) whereClause.status = status;
    
    if (date_from && date_to) {
      whereClause.incident_date = {
        [Op.between]: [date_from, date_to]
      };
    }

    const { count, rows: incidents } = await SecurityIncident.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: SecurityGuard,
          as: 'reported_by_guard',
          attributes: ['id', 'first_name', 'last_name', 'badge_number']
        },
        {
          model: SecurityGuard,
          as: 'assigned_guard',
          attributes: ['id', 'first_name', 'last_name', 'badge_number']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['incident_date', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: incidents,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get security incidents error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get security incident by ID
router.get('/incidents/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const incident = await SecurityIncident.findByPk(id, {
      include: [
        {
          model: SecurityGuard,
          as: 'reported_by_guard',
          attributes: ['id', 'first_name', 'last_name', 'badge_number', 'phone']
        },
        {
          model: SecurityGuard,
          as: 'assigned_guard',
          attributes: ['id', 'first_name', 'last_name', 'badge_number', 'phone']
        }
      ]
    });

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Security incident not found'
      });
    }

    res.json({
      success: true,
      data: incident
    });

  } catch (error) {
    console.error('Get security incident error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create security incident
router.post('/incidents', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      description,
      incident_type,
      severity,
      location,
      incident_date,
      reported_by_guard_id,
      witnesses,
      evidence,
      immediate_actions_taken,
      status
    } = req.body;

    if (!title || !description || !incident_type || !severity || !location || !incident_date) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, type, severity, location, and date are required'
      });
    }

    const incident = await SecurityIncident.create({
      title,
      description,
      incident_type,
      severity,
      location,
      incident_date,
      reported_by_guard_id,
      witnesses: witnesses || [],
      evidence: evidence || [],
      immediate_actions_taken,
      status: status || 'open',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Security incident created successfully',
      data: incident
    });

  } catch (error) {
    console.error('Create security incident error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update security incident
router.put('/incidents/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const incident = await SecurityIncident.findByPk(id);
    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Security incident not found'
      });
    }

    await incident.update(updateData);

    res.json({
      success: true,
      message: 'Security incident updated successfully',
      data: incident
    });

  } catch (error) {
    console.error('Update security incident error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Assign incident to guard
router.put('/incidents/:id/assign', authenticateToken, requireRole(['admin', 'security-guard-management']), async (req, res) => {
  try {
    const { id } = req.params;
    const { assigned_guard_id, notes } = req.body;

    const incident = await SecurityIncident.findByPk(id);
    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Security incident not found'
      });
    }

    await incident.update({
      assigned_guard_id,
      status: 'assigned',
      notes: notes || incident.notes,
      assigned_by: req.user.id,
      assigned_at: new Date()
    });

    res.json({
      success: true,
      message: 'Security incident assigned successfully',
      data: incident
    });

  } catch (error) {
    console.error('Assign security incident error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Close security incident
router.put('/incidents/:id/close', authenticateToken, requireRole(['admin', 'security-guard-management']), async (req, res) => {
  try {
    const { id } = req.params;
    const { resolution, follow_up_actions, lessons_learned } = req.body;

    const incident = await SecurityIncident.findByPk(id);
    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Security incident not found'
      });
    }

    await incident.update({
      status: 'closed',
      resolution,
      follow_up_actions,
      lessons_learned,
      closed_by: req.user.id,
      closed_at: new Date()
    });

    res.json({
      success: true,
      message: 'Security incident closed successfully',
      data: incident
    });

  } catch (error) {
    console.error('Close security incident error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== SECURITY ASSIGNMENTS ====================

// Get all security assignments
router.get('/assignments', authenticateToken, requireRole(['admin', 'security-guard-management']), async (req, res) => {
  try {
    const { page = 1, limit = 10, guard_id, location, shift, status, date_from, date_to } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (guard_id) whereClause.guard_id = guard_id;
    if (location) whereClause.location = { [Op.iLike]: `%${location}%` };
    if (shift) whereClause.shift = shift;
    if (status) whereClause.status = status;
    
    if (date_from && date_to) {
      whereClause.assignment_date = {
        [Op.between]: [date_from, date_to]
      };
    }

    const { count, rows: assignments } = await SecurityAssignment.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: SecurityGuard,
          as: 'guard',
          attributes: ['id', 'first_name', 'last_name', 'badge_number', 'phone']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['assignment_date', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: assignments,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get security assignments error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create security assignment
router.post('/assignments', authenticateToken, requireRole(['admin', 'security-guard-management']), async (req, res) => {
  try {
    const {
      guard_id,
      location,
      shift,
      assignment_date,
      start_time,
      end_time,
      duties,
      special_instructions,
      status
    } = req.body;

    if (!guard_id || !location || !shift || !assignment_date || !start_time || !end_time) {
      return res.status(400).json({
        success: false,
        message: 'Guard, location, shift, date, start time, and end time are required'
      });
    }

    // Check if guard is already assigned for this shift
    const existingAssignment = await SecurityAssignment.findOne({
      where: {
        guard_id,
        assignment_date,
        shift,
        status: { [Op.in]: ['scheduled', 'in_progress'] }
      }
    });

    if (existingAssignment) {
      return res.status(400).json({
        success: false,
        message: 'Guard is already assigned for this shift'
      });
    }

    const assignment = await SecurityAssignment.create({
      guard_id,
      location,
      shift,
      assignment_date,
      start_time,
      end_time,
      duties: duties || [],
      special_instructions,
      status: status || 'scheduled',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Security assignment created successfully',
      data: assignment
    });

  } catch (error) {
    console.error('Create security assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update security assignment
router.put('/assignments/:id', authenticateToken, requireRole(['admin', 'security-guard-management']), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const assignment = await SecurityAssignment.findByPk(id);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Security assignment not found'
      });
    }

    await assignment.update(updateData);

    res.json({
      success: true,
      message: 'Security assignment updated successfully',
      data: assignment
    });

  } catch (error) {
    console.error('Update security assignment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update assignment status
router.put('/assignments/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const assignment = await SecurityAssignment.findByPk(id);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        message: 'Security assignment not found'
      });
    }

    await assignment.update({
      status,
      notes: notes || assignment.notes,
      updated_by: req.user.id
    });

    res.json({
      success: true,
      message: 'Security assignment status updated successfully',
      data: assignment
    });

  } catch (error) {
    console.error('Update assignment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== SECURITY STATISTICS ====================

// Get security dashboard statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const totalGuards = await SecurityGuard.count();
    const activeGuards = await SecurityGuard.count({ where: { status: 'active' } });
    const totalIncidents = await SecurityIncident.count();
    const openIncidents = await SecurityIncident.count({ where: { status: 'open' } });
    const assignedIncidents = await SecurityIncident.count({ where: { status: 'assigned' } });
    const totalAssignments = await SecurityAssignment.count();
    const activeAssignments = await SecurityAssignment.count({ where: { status: 'in_progress' } });

    // Recent incidents
    const recentIncidents = await SecurityIncident.findAll({
      limit: 5,
      order: [['incident_date', 'DESC']],
      attributes: ['id', 'title', 'severity', 'status', 'location', 'incident_date']
    });

    // Incident severity breakdown
    const incidentSeverity = await SecurityIncident.findAll({
      attributes: [
        'severity',
        [SecurityIncident.sequelize.fn('COUNT', SecurityIncident.sequelize.col('id')), 'count']
      ],
      group: ['severity'],
      order: [[SecurityIncident.sequelize.fn('COUNT', SecurityIncident.sequelize.col('id')), 'DESC']]
    });

    // Incident types breakdown
    const incidentTypes = await SecurityIncident.findAll({
      attributes: [
        'incident_type',
        [SecurityIncident.sequelize.fn('COUNT', SecurityIncident.sequelize.col('id')), 'count']
      ],
      group: ['incident_type'],
      order: [[SecurityIncident.sequelize.fn('COUNT', SecurityIncident.sequelize.col('id')), 'DESC']]
    });

    // Today's assignments
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todaysAssignments = await SecurityAssignment.findAll({
      where: {
        assignment_date: {
          [Op.between]: [today, tomorrow]
        }
      },
      include: [
        {
          model: SecurityGuard,
          as: 'guard',
          attributes: ['first_name', 'last_name', 'badge_number']
        }
      ],
      order: [['start_time', 'ASC']]
    });

    // Guard shift distribution
    const guardShifts = await SecurityGuard.findAll({
      attributes: [
        'current_shift',
        [SecurityGuard.sequelize.fn('COUNT', SecurityGuard.sequelize.col('id')), 'count']
      ],
      where: { status: 'active' },
      group: ['current_shift'],
      order: [[SecurityGuard.sequelize.fn('COUNT', SecurityGuard.sequelize.col('id')), 'DESC']]
    });

    res.json({
      success: true,
      data: {
        totalGuards,
        activeGuards,
        totalIncidents,
        openIncidents,
        assignedIncidents,
        totalAssignments,
        activeAssignments,
        recentIncidents,
        incidentSeverity,
        incidentTypes,
        todaysAssignments,
        guardShifts
      }
    });

  } catch (error) {
    console.error('Get security stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
