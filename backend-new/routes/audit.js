const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middlewares/auth');
const { AuditLog, User, Employee, Department } = require('../models');
const { Op } = require('sequelize');

// Get audit logs with filtering and pagination
router.get('/logs', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search, 
      action, 
      table_name, 
      user_id, 
      start_date, 
      end_date,
      sort_by = 'created_at',
      sort_order = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = {};

    // Build where clause based on filters
    if (search) {
      whereClause[Op.or] = [
        { action: { [Op.iLike]: `%${search}%` } },
        { table_name: { [Op.iLike]: `%${search}%` } },
        { '$User.first_name$': { [Op.iLike]: `%${search}%` } },
        { '$User.last_name$': { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (action) {
      whereClause.action = { [Op.iLike]: `%${action}%` };
    }

    if (table_name) {
      whereClause.table_name = { [Op.iLike]: `%${table_name}%` };
    }

    if (user_id) {
      whereClause.user_id = user_id;
    }

    if (start_date || end_date) {
      whereClause.created_at = {};
      if (start_date) {
        whereClause.created_at[Op.gte] = new Date(start_date);
      }
      if (end_date) {
        whereClause.created_at[Op.lte] = new Date(end_date);
      }
    }

    const { count, rows: auditLogs } = await AuditLog.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'first_name', 'last_name', 'email'],
          include: [
            {
              model: Employee,
              as: 'employee',
              attributes: ['employee_number', 'position'],
              include: [
                {
                  model: Department,
                  as: 'department',
                  attributes: ['name']
                }
              ]
            }
          ]
        }
      ],
      order: [[sort_by, sort_order.toUpperCase()]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    // Format the response
    const formattedLogs = auditLogs.map(log => ({
      id: log.id,
      timestamp: log.created_at,
      user: log.user ? `${log.user.first_name} ${log.user.last_name}` : 'System',
      department: log.user?.employee?.department?.name || 'N/A',
      action: log.action,
      resource: log.table_name || 'System',
      details: `${log.action} on ${log.table_name || 'system'}`,
      ipAddress: log.ip_address || 'N/A',
      userAgent: log.user_agent || 'N/A',
      severity: getSeverityLevel(log.action),
      oldValues: log.old_values,
      newValues: log.new_values
    }));

    res.json({
      success: true,
      data: {
        items: formattedLogs,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      }
    });

  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get audit log statistics
router.get('/stats', authenticateToken, requireRole(['admin']), async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    
    const whereClause = {};
    if (start_date || end_date) {
      whereClause.created_at = {};
      if (start_date) {
        whereClause.created_at[Op.gte] = new Date(start_date);
      }
      if (end_date) {
        whereClause.created_at[Op.lte] = new Date(end_date);
      }
    }

    const totalLogs = await AuditLog.count({ where: whereClause });
    
    const actionStats = await AuditLog.findAll({
      where: whereClause,
      attributes: [
        'action',
        [AuditLog.sequelize.fn('COUNT', AuditLog.sequelize.col('id')), 'count']
      ],
      group: ['action'],
      order: [[AuditLog.sequelize.fn('COUNT', AuditLog.sequelize.col('id')), 'DESC']]
    });

    const userStats = await AuditLog.findAll({
      where: whereClause,
      attributes: [
        'user_id',
        [AuditLog.sequelize.fn('COUNT', AuditLog.sequelize.col('id')), 'count']
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['first_name', 'last_name']
        }
      ],
      group: ['user_id', 'User.id'],
      order: [[AuditLog.sequelize.fn('COUNT', AuditLog.sequelize.col('id')), 'DESC']],
      limit: 10
    });

    res.json({
      success: true,
      data: {
        total: totalLogs,
        actionStats: actionStats.map(stat => ({
          action: stat.action,
          count: parseInt(stat.dataValues.count)
        })),
        topUsers: userStats.map(stat => ({
          user: stat.user ? `${stat.user.first_name} ${stat.user.last_name}` : 'System',
          count: parseInt(stat.dataValues.count)
        }))
      }
    });

  } catch (error) {
    console.error('Error fetching audit stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Helper function to determine severity level
function getSeverityLevel(action) {
  const criticalActions = ['DELETE', 'DROP', 'TRUNCATE', 'SYSTEM_CONFIG', 'SECURITY_CHANGE'];
  const highActions = ['UPDATE', 'CREATE', 'APPROVE', 'REJECT', 'PAYMENT'];
  const mediumActions = ['LOGIN', 'LOGOUT', 'VIEW', 'EXPORT'];
  
  if (criticalActions.some(critical => action.toUpperCase().includes(critical))) {
    return 'critical';
  } else if (highActions.some(high => action.toUpperCase().includes(high))) {
    return 'high';
  } else if (mediumActions.some(medium => action.toUpperCase().includes(medium))) {
    return 'medium';
  } else {
    return 'low';
  }
}

module.exports = router;
