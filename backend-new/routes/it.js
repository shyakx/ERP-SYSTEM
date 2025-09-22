const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

// Import models
const ITAsset = require('../models/ITAsset');
const ITSupportTicket = require('../models/ITSupportTicket');
const System = require('../models/System');
const NetworkDevice = require('../models/NetworkDevice');
const MaintenanceSchedule = require('../models/MaintenanceSchedule');

// Import middleware
const { authenticateToken, requireRole } = require('../middlewares/auth');

// ==================== IT ASSETS ====================

// Get all IT assets
router.get('/assets', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category, status, assigned_to } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { serial_number: { [Op.iLike]: `%${search}%` } },
          { model: { [Op.iLike]: `%${search}%` } },
          { manufacturer: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (category) whereClause.category = category;
    if (status) whereClause.status = status;
    if (assigned_to) whereClause.assigned_to = assigned_to;

    const { count, rows: assets } = await ITAsset.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        items: assets,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get IT assets error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get IT asset by ID
router.get('/assets/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const asset = await ITAsset.findByPk(id);
    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'IT asset not found'
      });
    }

    res.json({
      success: true,
      data: asset
    });

  } catch (error) {
    console.error('Get IT asset error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create IT asset
router.post('/assets', authenticateToken, requireRole(['admin', 'it']), async (req, res) => {
  try {
    const {
      name,
      category,
      manufacturer,
      model,
      serial_number,
      purchase_date,
      purchase_price,
      warranty_expiry,
      assigned_to,
      location,
      status,
      specifications,
      notes
    } = req.body;

    if (!name || !category || !manufacturer || !model) {
      return res.status(400).json({
        success: false,
        message: 'Name, category, manufacturer, and model are required'
      });
    }

    const asset = await ITAsset.create({
      name,
      category,
      manufacturer,
      model,
      serial_number,
      purchase_date,
      purchase_price: parseFloat(purchase_price) || 0,
      warranty_expiry,
      assigned_to,
      location,
      status: status || 'active',
      specifications,
      notes,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'IT asset created successfully',
      data: asset
    });

  } catch (error) {
    console.error('Create IT asset error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update IT asset
router.put('/assets/:id', authenticateToken, requireRole(['admin', 'it']), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const asset = await ITAsset.findByPk(id);
    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'IT asset not found'
      });
    }

    await asset.update(updateData);

    res.json({
      success: true,
      message: 'IT asset updated successfully',
      data: asset
    });

  } catch (error) {
    console.error('Update IT asset error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== SUPPORT TICKETS ====================

// Get all support tickets
router.get('/support-tickets', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, category, assigned_to } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (status) whereClause.status = status;
    if (priority) whereClause.priority = priority;
    if (category) whereClause.category = category;
    if (assigned_to) whereClause.assigned_to = assigned_to;

    const { count, rows: tickets } = await ITSupportTicket.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: tickets,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get support tickets error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get support ticket by ID
router.get('/support-tickets/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await ITSupportTicket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Support ticket not found'
      });
    }

    res.json({
      success: true,
      data: ticket
    });

  } catch (error) {
    console.error('Get support ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create support ticket
router.post('/support-tickets', authenticateToken, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      priority,
      asset_id,
      user_id,
      contact_method,
      attachments
    } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and category are required'
      });
    }

    const ticket = await ITSupportTicket.create({
      title,
      description,
      category,
      priority: priority || 'medium',
      asset_id,
      user_id: user_id || req.user.id,
      contact_method,
      attachments: attachments || [],
      status: 'open',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Support ticket created successfully',
      data: ticket
    });

  } catch (error) {
    console.error('Create support ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update support ticket
router.put('/support-tickets/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const ticket = await ITSupportTicket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Support ticket not found'
      });
    }

    // Check if user can update this ticket
    if (ticket.user_id !== req.user.id && !['admin', 'it'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own tickets'
      });
    }

    await ticket.update(updateData);

    res.json({
      success: true,
      message: 'Support ticket updated successfully',
      data: ticket
    });

  } catch (error) {
    console.error('Update support ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Assign support ticket
router.put('/support-tickets/:id/assign', authenticateToken, requireRole(['admin', 'it']), async (req, res) => {
  try {
    const { id } = req.params;
    const { assigned_to, notes } = req.body;

    const ticket = await ITSupportTicket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Support ticket not found'
      });
    }

    await ticket.update({
      assigned_to,
      status: 'in_progress',
      notes: notes || ticket.notes,
      assigned_by: req.user.id,
      assigned_at: new Date()
    });

    res.json({
      success: true,
      message: 'Support ticket assigned successfully',
      data: ticket
    });

  } catch (error) {
    console.error('Assign support ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Close support ticket
router.put('/support-tickets/:id/close', authenticateToken, requireRole(['admin', 'it']), async (req, res) => {
  try {
    const { id } = req.params;
    const { resolution, notes } = req.body;

    const ticket = await ITSupportTicket.findByPk(id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Support ticket not found'
      });
    }

    await ticket.update({
      status: 'closed',
      resolution,
      notes: notes || ticket.notes,
      closed_by: req.user.id,
      closed_at: new Date()
    });

    res.json({
      success: true,
      message: 'Support ticket closed successfully',
      data: ticket
    });

  } catch (error) {
    console.error('Close support ticket error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== SYSTEMS ====================

// Get all systems
router.get('/systems', authenticateToken, requireRole(['admin', 'it']), async (req, res) => {
  try {
    const { page = 1, limit = 10, search, type, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (type) whereClause.type = type;
    if (status) whereClause.status = status;

    const { count, rows: systems } = await System.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        items: systems,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get systems error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create system
router.post('/systems', authenticateToken, requireRole(['admin', 'it']), async (req, res) => {
  try {
    const {
      name,
      type,
      description,
      version,
      vendor,
      installation_date,
      last_update,
      status,
      dependencies,
      configuration
    } = req.body;

    if (!name || !type || !description) {
      return res.status(400).json({
        success: false,
        message: 'Name, type, and description are required'
      });
    }

    const system = await System.create({
      name,
      type,
      description,
      version,
      vendor,
      installation_date,
      last_update,
      status: status || 'active',
      dependencies: dependencies || [],
      configuration: configuration || {},
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'System created successfully',
      data: system
    });

  } catch (error) {
    console.error('Create system error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== NETWORK DEVICES ====================

// Get all network devices
router.get('/network-devices', authenticateToken, requireRole(['admin', 'it']), async (req, res) => {
  try {
    const { page = 1, limit = 10, search, type, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    if (search) {
      whereClause = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { ip_address: { [Op.iLike]: `%${search}%` } },
          { mac_address: { [Op.iLike]: `%${search}%` } }
        ]
      };
    }

    if (type) whereClause.type = type;
    if (status) whereClause.status = status;

    const { count, rows: devices } = await NetworkDevice.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['name', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        items: devices,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get network devices error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create network device
router.post('/network-devices', authenticateToken, requireRole(['admin', 'it']), async (req, res) => {
  try {
    const {
      name,
      type,
      ip_address,
      mac_address,
      location,
      manufacturer,
      model,
      firmware_version,
      status,
      configuration
    } = req.body;

    if (!name || !type || !ip_address) {
      return res.status(400).json({
        success: false,
        message: 'Name, type, and IP address are required'
      });
    }

    const device = await NetworkDevice.create({
      name,
      type,
      ip_address,
      mac_address,
      location,
      manufacturer,
      model,
      firmware_version,
      status: status || 'active',
      configuration: configuration || {},
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Network device created successfully',
      data: device
    });

  } catch (error) {
    console.error('Create network device error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== MAINTENANCE SCHEDULES ====================

// Get all maintenance schedules
router.get('/maintenance-schedules', authenticateToken, requireRole(['admin', 'it']), async (req, res) => {
  try {
    const { page = 1, limit = 10, asset_id, status, due_date_from, due_date_to } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (asset_id) whereClause.asset_id = asset_id;
    if (status) whereClause.status = status;
    
    if (due_date_from && due_date_to) {
      whereClause.due_date = {
        [Op.between]: [due_date_from, due_date_to]
      };
    }

    const { count, rows: schedules } = await MaintenanceSchedule.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: ITAsset,
          as: 'asset',
          attributes: ['id', 'name', 'category', 'serial_number']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['due_date', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        items: schedules,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get maintenance schedules error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create maintenance schedule
router.post('/maintenance-schedules', authenticateToken, requireRole(['admin', 'it']), async (req, res) => {
  try {
    const {
      asset_id,
      maintenance_type,
      description,
      due_date,
      frequency,
      assigned_to,
      priority,
      estimated_duration,
      notes
    } = req.body;

    if (!asset_id || !maintenance_type || !due_date) {
      return res.status(400).json({
        success: false,
        message: 'Asset ID, maintenance type, and due date are required'
      });
    }

    const schedule = await MaintenanceSchedule.create({
      asset_id,
      maintenance_type,
      description,
      due_date,
      frequency,
      assigned_to,
      priority: priority || 'medium',
      estimated_duration,
      notes,
      status: 'scheduled',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Maintenance schedule created successfully',
      data: schedule
    });

  } catch (error) {
    console.error('Create maintenance schedule error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update maintenance schedule status
router.put('/maintenance-schedules/:id/status', authenticateToken, requireRole(['admin', 'it']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, completion_notes, actual_duration } = req.body;

    const schedule = await MaintenanceSchedule.findByPk(id);
    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance schedule not found'
      });
    }

    await schedule.update({
      status,
      completion_notes,
      actual_duration,
      completed_by: req.user.id,
      completed_at: status === 'completed' ? new Date() : null
    });

    res.json({
      success: true,
      message: 'Maintenance schedule status updated successfully',
      data: schedule
    });

  } catch (error) {
    console.error('Update maintenance schedule error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== IT STATISTICS ====================

// Get IT dashboard statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const totalAssets = await ITAsset.count();
    const activeAssets = await ITAsset.count({ where: { status: 'active' } });
    const totalTickets = await ITSupportTicket.count();
    const openTickets = await ITSupportTicket.count({ where: { status: 'open' } });
    const inProgressTickets = await ITSupportTicket.count({ where: { status: 'in_progress' } });
    const totalSystems = await System.count();
    const activeSystems = await System.count({ where: { status: 'active' } });
    const totalNetworkDevices = await NetworkDevice.count();
    const activeNetworkDevices = await NetworkDevice.count({ where: { status: 'active' } });

    // Pending maintenance
    const pendingMaintenance = await MaintenanceSchedule.count({
      where: {
        status: 'scheduled',
        due_date: { [Op.lte]: new Date() }
      }
    });

    // Recent tickets
    const recentTickets = await ITSupportTicket.findAll({
      limit: 5,
      order: [['created_at', 'DESC']],
      attributes: ['id', 'title', 'status', 'priority', 'category', 'created_at']
    });

    // Asset categories breakdown
    const assetCategories = await ITAsset.findAll({
      attributes: [
        'category',
        [ITAsset.sequelize.fn('COUNT', ITAsset.sequelize.col('id')), 'count']
      ],
      group: ['category'],
      order: [[ITAsset.sequelize.fn('COUNT', ITAsset.sequelize.col('id')), 'DESC']]
    });

    // Ticket categories breakdown
    const ticketCategories = await ITSupportTicket.findAll({
      attributes: [
        'category',
        [ITSupportTicket.sequelize.fn('COUNT', ITSupportTicket.sequelize.col('id')), 'count']
      ],
      group: ['category'],
      order: [[ITSupportTicket.sequelize.fn('COUNT', ITSupportTicket.sequelize.col('id')), 'DESC']]
    });

    // Upcoming maintenance
    const upcomingMaintenance = await MaintenanceSchedule.findAll({
      where: {
        status: 'scheduled',
        due_date: { [Op.gte]: new Date() }
      },
      limit: 5,
      order: [['due_date', 'ASC']],
      include: [
        {
          model: ITAsset,
          as: 'asset',
          attributes: ['name', 'category']
        }
      ]
    });

    res.json({
      success: true,
      data: {
        totalAssets,
        activeAssets,
        totalTickets,
        openTickets,
        inProgressTickets,
        totalSystems,
        activeSystems,
        totalNetworkDevices,
        activeNetworkDevices,
        pendingMaintenance,
        recentTickets,
        assetCategories,
        ticketCategories,
        upcomingMaintenance
      }
    });

  } catch (error) {
    console.error('Get IT stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
