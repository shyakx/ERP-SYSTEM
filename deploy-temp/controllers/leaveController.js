import { LeaveRequest, LeaveType, Employee } from '../models/associations.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

// Get all leave requests with filtering and pagination
export const getAllLeaveRequests = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status = 'all',
      department = 'all',
      employeeId = null
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (department !== 'all') {
      whereClause.department = department;
    }

    if (employeeId) {
      whereClause.employeeId = employeeId;
    }

    const leaveRequests = await LeaveRequest.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: LeaveType,
          as: 'leaveType',
          attributes: ['name', 'color', 'daysAllocated']
        },
        {
          model: Employee,
          as: 'leaveEmployee',
          attributes: ['employeeId', 'position', 'department', 'phone', 'email']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['submittedDate', 'DESC']]
    });

    res.json({
      leaveRequests: leaveRequests.rows,
      total: leaveRequests.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(leaveRequests.count / limit)
    });
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    res.status(500).json({ error: 'Failed to fetch leave requests' });
  }
};

// Get leave request by ID
export const getLeaveRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const leaveRequest = await LeaveRequest.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: LeaveType,
          as: 'leaveType',
          attributes: ['name', 'color', 'daysAllocated', 'daysUsed', 'daysRemaining']
        },
        {
          model: Employee,
          as: 'leaveEmployee',
          attributes: ['employeeId', 'position', 'department', 'phone', 'email']
        }
      ]
    });

    if (!leaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    res.json(leaveRequest);
  } catch (error) {
    console.error('Error fetching leave request:', error);
    res.status(500).json({ error: 'Failed to fetch leave request' });
  }
};

// Create new leave request
export const createLeaveRequest = async (req, res) => {
  try {
    const leaveRequestData = req.body;

    // Calculate days between start and end date
    const startDate = new Date(leaveRequestData.startDate);
    const endDate = new Date(leaveRequestData.endDate);
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    const leaveRequest = await LeaveRequest.create({
      ...leaveRequestData,
      days,
      submittedDate: new Date().toISOString().split('T')[0]
    });

    res.status(201).json({
      message: 'Leave request created successfully',
      leaveRequest
    });
  } catch (error) {
    console.error('Error creating leave request:', error);
    res.status(500).json({ error: 'Failed to create leave request' });
  }
};

// Update leave request
export const updateLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const leaveRequest = await LeaveRequest.findOne({
      where: { id, isActive: true }
    });

    if (!leaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    // Recalculate days if dates are updated
    if (updateData.startDate && updateData.endDate) {
      const startDate = new Date(updateData.startDate);
      const endDate = new Date(updateData.endDate);
      updateData.days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    }

    await leaveRequest.update(updateData);

    res.json({
      message: 'Leave request updated successfully',
      leaveRequest
    });
  } catch (error) {
    console.error('Error updating leave request:', error);
    res.status(500).json({ error: 'Failed to update leave request' });
  }
};

// Approve/Reject leave request
export const updateLeaveRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comments } = req.body;

    const leaveRequest = await LeaveRequest.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: LeaveType,
          as: 'leaveType'
        }
      ]
    });

    if (!leaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    const updateData = { 
      status,
      comments,
      approvedDate: status === 'Approved' ? new Date().toISOString().split('T')[0] : null
    };

    await leaveRequest.update(updateData);

    // Update leave type usage if approved
    if (status === 'Approved' && leaveRequest.leaveType) {
      const leaveType = leaveRequest.leaveType;
      await leaveType.update({
        daysUsed: leaveType.daysUsed + leaveRequest.days,
        daysRemaining: leaveType.daysRemaining - leaveRequest.days
      });
    }

    res.json({
      message: `Leave request ${status.toLowerCase()} successfully`,
      leaveRequest
    });
  } catch (error) {
    console.error('Error updating leave request status:', error);
    res.status(500).json({ error: 'Failed to update leave request status' });
  }
};

// Delete leave request (soft delete)
export const deleteLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const leaveRequest = await LeaveRequest.findOne({
      where: { id, isActive: true }
    });

    if (!leaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    await leaveRequest.update({ isActive: false });

    res.json({ message: 'Leave request deleted successfully' });
  } catch (error) {
    console.error('Error deleting leave request:', error);
    res.status(500).json({ error: 'Failed to delete leave request' });
  }
};

// Get leave types
export const getLeaveTypes = async (req, res) => {
  try {
    const leaveTypes = await LeaveType.findAll({
      where: { isActive: true },
      order: [['name', 'ASC']]
    });

    res.json(leaveTypes);
  } catch (error) {
    console.error('Error fetching leave types:', error);
    res.status(500).json({ error: 'Failed to fetch leave types' });
  }
};

// Create leave type
export const createLeaveType = async (req, res) => {
  try {
    const leaveTypeData = req.body;

    const leaveType = await LeaveType.create(leaveTypeData);

    res.status(201).json({
      message: 'Leave type created successfully',
      leaveType
    });
  } catch (error) {
    console.error('Error creating leave type:', error);
    res.status(500).json({ error: 'Failed to create leave type' });
  }
};

// Update leave type
export const updateLeaveType = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const leaveType = await LeaveType.findOne({
      where: { id, isActive: true }
    });

    if (!leaveType) {
      return res.status(404).json({ error: 'Leave type not found' });
    }

    await leaveType.update(updateData);

    res.json({
      message: 'Leave type updated successfully',
      leaveType
    });
  } catch (error) {
    console.error('Error updating leave type:', error);
    res.status(500).json({ error: 'Failed to update leave type' });
  }
};

// Get leave statistics
export const getLeaveStats = async (req, res) => {
  try {
    const totalRequests = await LeaveRequest.count({ where: { isActive: true } });
    const approvedRequests = await LeaveRequest.count({ where: { status: 'Approved', isActive: true } });
    const pendingRequests = await LeaveRequest.count({ where: { status: 'Pending', isActive: true } });
    const rejectedRequests = await LeaveRequest.count({ where: { status: 'Rejected', isActive: true } });

    const statusStats = await LeaveRequest.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { isActive: true },
      group: ['status']
    });

    const departmentStats = await LeaveRequest.findAll({
      attributes: [
        'department',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { isActive: true },
      group: ['department']
    });

    const leaveTypeStats = await LeaveRequest.findAll({
      attributes: [
        'leaveTypeId',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { isActive: true },
      group: ['leaveTypeId']
    });

    res.json({
      totalRequests,
      approvedRequests,
      pendingRequests,
      rejectedRequests,
      statusStats,
      departmentStats,
      leaveTypeStats
    });
  } catch (error) {
    console.error('Error fetching leave stats:', error);
    res.status(500).json({ error: 'Failed to fetch leave statistics' });
  }
}; 