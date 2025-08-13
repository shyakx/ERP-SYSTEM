import { AttendanceRecord, Employee } from '../models/associations.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

// Get all attendance records with filtering and pagination
export const getAllAttendanceRecords = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      date = null,
      status = 'all',
      department = 'all',
      employeeId = null
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };

    if (date) {
      whereClause.date = date;
    }

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (department !== 'all') {
      whereClause.department = department;
    }

    if (employeeId) {
      whereClause.employeeId = employeeId;
    }

    const attendanceRecords = await AttendanceRecord.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Employee,
          as: 'attendanceEmployee',
          attributes: ['employeeId', 'position', 'department', 'phone', 'email']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['date', 'DESC'], ['checkIn', 'ASC']]
    });

    res.json({
      attendanceRecords: attendanceRecords.rows,
      total: attendanceRecords.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(attendanceRecords.count / limit)
    });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
};

// Get attendance record by ID
export const getAttendanceRecordById = async (req, res) => {
  try {
    const { id } = req.params;

    const attendanceRecord = await AttendanceRecord.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: Employee,
          as: 'attendanceEmployee',
          attributes: ['employeeId', 'position', 'department', 'phone', 'email']
        }
      ]
    });

    if (!attendanceRecord) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    res.json(attendanceRecord);
  } catch (error) {
    console.error('Error fetching attendance record:', error);
    res.status(500).json({ error: 'Failed to fetch attendance record' });
  }
};

// Create new attendance record
export const createAttendanceRecord = async (req, res) => {
  try {
    const attendanceData = req.body;

    // Check if record already exists for this employee and date
    const existingRecord = await AttendanceRecord.findOne({
      where: {
        employeeId: attendanceData.employeeId,
        date: attendanceData.date,
        isActive: true
      }
    });

    if (existingRecord) {
      return res.status(400).json({ error: 'Attendance record already exists for this employee and date' });
    }

    const attendanceRecord = await AttendanceRecord.create(attendanceData);

    res.status(201).json({
      message: 'Attendance record created successfully',
      attendanceRecord
    });
  } catch (error) {
    console.error('Error creating attendance record:', error);
    res.status(500).json({ error: 'Failed to create attendance record' });
  }
};

// Update attendance record
export const updateAttendanceRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const attendanceRecord = await AttendanceRecord.findOne({
      where: { id, isActive: true }
    });

    if (!attendanceRecord) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    await attendanceRecord.update(updateData);

    res.json({
      message: 'Attendance record updated successfully',
      attendanceRecord
    });
  } catch (error) {
    console.error('Error updating attendance record:', error);
    res.status(500).json({ error: 'Failed to update attendance record' });
  }
};

// Delete attendance record (soft delete)
export const deleteAttendanceRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const attendanceRecord = await AttendanceRecord.findOne({
      where: { id, isActive: true }
    });

    if (!attendanceRecord) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    await attendanceRecord.update({ isActive: false });

    res.json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting attendance record:', error);
    res.status(500).json({ error: 'Failed to delete attendance record' });
  }
};

// Check in employee
export const checkIn = async (req, res) => {
  try {
    const { employeeId, location } = req.body;
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toTimeString().split(' ')[0];

    // Check if already checked in today
    const existingRecord = await AttendanceRecord.findOne({
      where: {
        employeeId,
        date: today,
        isActive: true
      }
    });

    if (existingRecord && existingRecord.checkIn) {
      return res.status(400).json({ error: 'Employee already checked in today' });
    }

    let attendanceRecord;
    if (existingRecord) {
      // Update existing record
      attendanceRecord = existingRecord;
      await attendanceRecord.update({
        checkIn: currentTime,
        status: 'Present'
      });
    } else {
      // Create new record
      attendanceRecord = await AttendanceRecord.create({
        employeeId,
        date: today,
        checkIn: currentTime,
        status: 'Present',
        location: location || 'Office',
        department: (await Employee.findByPk(employeeId))?.department || 'Unknown'
      });
    }

    res.json({
      message: 'Check-in successful',
      attendanceRecord
    });
  } catch (error) {
    console.error('Error checking in:', error);
    res.status(500).json({ error: 'Failed to check in' });
  }
};

// Check out employee
export const checkOut = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toTimeString().split(' ')[0];

    const attendanceRecord = await AttendanceRecord.findOne({
      where: {
        employeeId,
        date: today,
        isActive: true
      }
    });

    if (!attendanceRecord) {
      return res.status(404).json({ error: 'No check-in record found for today' });
    }

    if (attendanceRecord.checkOut) {
      return res.status(400).json({ error: 'Employee already checked out today' });
    }

    // Calculate total hours
    const checkInTime = new Date(`2000-01-01T${attendanceRecord.checkIn}`);
    const checkOutTime = new Date(`2000-01-01T${currentTime}`);
    const totalHours = (checkOutTime - checkInTime) / (1000 * 60 * 60);
    const hours = Math.floor(totalHours);
    const minutes = Math.floor((totalHours - hours) * 60);
    const totalHoursString = `${hours}h ${minutes}m`;

    // Calculate overtime (assuming 8-hour workday)
    let overtime = '';
    if (totalHours > 8) {
      const overtimeHours = totalHours - 8;
      const overtimeH = Math.floor(overtimeHours);
      const overtimeM = Math.floor((overtimeHours - overtimeH) * 60);
      overtime = `${overtimeH}h ${overtimeM}m`;
    }

    await attendanceRecord.update({
      checkOut: currentTime,
      totalHours: totalHoursString,
      overtime: overtime
    });

    res.json({
      message: 'Check-out successful',
      attendanceRecord
    });
  } catch (error) {
    console.error('Error checking out:', error);
    res.status(500).json({ error: 'Failed to check out' });
  }
};

// Get attendance statistics
export const getAttendanceStats = async (req, res) => {
  try {
    const { date = new Date().toISOString().split('T')[0] } = req.query;

    const totalEmployees = await Employee.count({ where: { isActive: true } });
    const presentToday = await AttendanceRecord.count({
      where: {
        date,
        status: 'Present',
        isActive: true
      }
    });
    const absentToday = await AttendanceRecord.count({
      where: {
        date,
        status: 'Absent',
        isActive: true
      }
    });
    const lateToday = await AttendanceRecord.count({
      where: {
        date,
        status: 'Late',
        isActive: true
      }
    });
    const onLeaveToday = await AttendanceRecord.count({
      where: {
        date,
        status: 'On Leave',
        isActive: true
      }
    });

    const departmentStats = await AttendanceRecord.findAll({
      attributes: [
        'department',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: {
        date,
        isActive: true
      },
      group: ['department']
    });

    const statusStats = await AttendanceRecord.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: {
        date,
        isActive: true
      },
      group: ['status']
    });

    res.json({
      date,
      totalEmployees,
      presentToday,
      absentToday,
      lateToday,
      onLeaveToday,
      departmentStats,
      statusStats
    });
  } catch (error) {
    console.error('Error fetching attendance stats:', error);
    res.status(500).json({ error: 'Failed to fetch attendance statistics' });
  }
}; 