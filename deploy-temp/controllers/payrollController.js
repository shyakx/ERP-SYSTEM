import { PayrollRecord, Employee } from '../models/associations.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

// Get all payroll records with filtering and pagination
export const getAllPayrollRecords = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      month = null,
      year = null,
      status = 'all',
      department = 'all',
      employeeId = null
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };

    if (month) {
      whereClause.month = month;
    }

    if (year) {
      whereClause.year = year;
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

    const payrollRecords = await PayrollRecord.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Employee,
          as: 'payrollEmployee',
          attributes: ['employeeId', 'position', 'department', 'phone', 'email']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['year', 'DESC'], ['month', 'DESC']]
    });

    res.json({
      payrollRecords: payrollRecords.rows,
      total: payrollRecords.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(payrollRecords.count / limit)
    });
  } catch (error) {
    console.error('Error fetching payroll records:', error);
    res.status(500).json({ error: 'Failed to fetch payroll records' });
  }
};

// Get payroll record by ID
export const getPayrollRecordById = async (req, res) => {
  try {
    const { id } = req.params;

    const payrollRecord = await PayrollRecord.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: Employee,
          as: 'payrollEmployee',
          attributes: ['employeeId', 'position', 'department', 'phone', 'email']
        }
      ]
    });

    if (!payrollRecord) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }

    res.json(payrollRecord);
  } catch (error) {
    console.error('Error fetching payroll record:', error);
    res.status(500).json({ error: 'Failed to fetch payroll record' });
  }
};

// Create new payroll record
export const createPayrollRecord = async (req, res) => {
  try {
    const payrollData = req.body;

    // Check if record already exists for this employee and month/year
    const existingRecord = await PayrollRecord.findOne({
      where: {
        employeeId: payrollData.employeeId,
        month: payrollData.month,
        year: payrollData.year,
        isActive: true
      }
    });

    if (existingRecord) {
      return res.status(400).json({ error: 'Payroll record already exists for this employee and month/year' });
    }

    const payrollRecord = await PayrollRecord.create(payrollData);

    res.status(201).json({
      message: 'Payroll record created successfully',
      payrollRecord
    });
  } catch (error) {
    console.error('Error creating payroll record:', error);
    res.status(500).json({ error: 'Failed to create payroll record' });
  }
};

// Update payroll record
export const updatePayrollRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const payrollRecord = await PayrollRecord.findOne({
      where: { id, isActive: true }
    });

    if (!payrollRecord) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }

    await payrollRecord.update(updateData);

    res.json({
      message: 'Payroll record updated successfully',
      payrollRecord
    });
  } catch (error) {
    console.error('Error updating payroll record:', error);
    res.status(500).json({ error: 'Failed to update payroll record' });
  }
};

// Delete payroll record (soft delete)
export const deletePayrollRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const payrollRecord = await PayrollRecord.findOne({
      where: { id, isActive: true }
    });

    if (!payrollRecord) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }

    await payrollRecord.update({ isActive: false });

    res.json({ message: 'Payroll record deleted successfully' });
  } catch (error) {
    console.error('Error deleting payroll record:', error);
    res.status(500).json({ error: 'Failed to delete payroll record' });
  }
};

// Process payroll for all employees
export const processPayroll = async (req, res) => {
  try {
    const { month, year } = req.body;

    // Get all active employees
    const employees = await Employee.findAll({
      where: { isActive: true }
    });

    const processedRecords = [];

    for (const employee of employees) {
      // Check if payroll already exists for this employee and month/year
      const existingRecord = await PayrollRecord.findOne({
        where: {
          employeeId: employee.id,
          month,
          year,
          isActive: true
        }
      });

      if (!existingRecord) {
        // Calculate payroll based on employee salary
        const basicSalary = parseFloat(employee.salary);
        const allowances = basicSalary * 0.1; // 10% allowances
        const deductions = basicSalary * 0.15; // 15% deductions (tax, insurance, etc.)
        const netSalary = basicSalary + allowances - deductions;

        const payrollRecord = await PayrollRecord.create({
          employeeId: employee.id,
          month,
          year,
          basicSalary: `RWF ${basicSalary.toLocaleString()}`,
          allowances: `RWF ${allowances.toLocaleString()}`,
          deductions: `RWF ${deductions.toLocaleString()}`,
          netSalary: `RWF ${netSalary.toLocaleString()}`,
          status: 'Pending',
          paymentMethod: 'Bank Transfer',
          department: employee.department,
          position: employee.position,
          location: employee.location
        });

        processedRecords.push(payrollRecord);
      }
    }

    res.json({
      message: `Payroll processed for ${processedRecords.length} employees`,
      processedRecords
    });
  } catch (error) {
    console.error('Error processing payroll:', error);
    res.status(500).json({ error: 'Failed to process payroll' });
  }
};

// Update payroll status
export const updatePayrollStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentDate } = req.body;

    const payrollRecord = await PayrollRecord.findOne({
      where: { id, isActive: true }
    });

    if (!payrollRecord) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }

    const updateData = { status };
    if (paymentDate) updateData.paymentDate = paymentDate;

    await payrollRecord.update(updateData);

    res.json({
      message: 'Payroll status updated successfully',
      payrollRecord
    });
  } catch (error) {
    console.error('Error updating payroll status:', error);
    res.status(500).json({ error: 'Failed to update payroll status' });
  }
};

// Get payroll statistics
export const getPayrollStats = async (req, res) => {
  try {
    const { month = new Date().getMonth() + 1, year = new Date().getFullYear() } = req.query;

    const totalPayroll = await PayrollRecord.count({
      where: { month: month.toString(), year: parseInt(year), isActive: true }
    });

    const paidPayroll = await PayrollRecord.count({
      where: { 
        month: month.toString(), 
        year: parseInt(year), 
        status: 'Paid', 
        isActive: true 
      }
    });

    const pendingPayroll = await PayrollRecord.count({
      where: { 
        month: month.toString(), 
        year: parseInt(year), 
        status: 'Pending', 
        isActive: true 
      }
    });

    const departmentStats = await PayrollRecord.findAll({
      attributes: [
        'department',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { 
        month: month.toString(), 
        year: parseInt(year), 
        isActive: true 
      },
      group: ['department']
    });

    const statusStats = await PayrollRecord.findAll({
      attributes: [
        'status',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { 
        month: month.toString(), 
        year: parseInt(year), 
        isActive: true 
      },
      group: ['status']
    });

    res.json({
      month,
      year,
      totalPayroll,
      paidPayroll,
      pendingPayroll,
      departmentStats,
      statusStats
    });
  } catch (error) {
    console.error('Error fetching payroll stats:', error);
    res.status(500).json({ error: 'Failed to fetch payroll statistics' });
  }
}; 