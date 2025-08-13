import { Employee, User } from '../models/associations.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

// Test endpoint for development (no authentication required)
export const testGetAllEmployees = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = "",
      status = "all",
      department = "all"
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };

    if (search) {
      whereClause[Op.or] = [
        { employeeId: { [Op.iLike]: `%${search}%` } },
        { position: { [Op.iLike]: `%${search}%` } },
        { department: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (department !== 'all') {
      whereClause.department = department;
    }

    const employees = await Employee.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'userAccount',
          attributes: ['firstName', 'lastName', 'email', 'role']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      employees: employees.rows,
      total: employees.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(employees.count / limit)
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

// Get all employees with filtering and pagination
export const getAllEmployees = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = "",
      status = "all",
      department = "all"
    } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };

    if (search) {
      whereClause[Op.or] = [
        { employeeId: { [Op.iLike]: `%${search}%` } },
        { position: { [Op.iLike]: `%${search}%` } },
        { department: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (status !== 'all') {
      whereClause.status = status;
    }

    if (department !== 'all') {
      whereClause.department = department;
    }

    const employees = await Employee.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'userAccount',
          attributes: ['firstName', 'lastName', 'email', 'role']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      employees: employees.rows,
      total: employees.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(employees.count / limit)
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

// Get employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: User,
          as: 'userAccount',
          attributes: ['firstName', 'lastName', 'email', 'role']
        }
      ]
    });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
};

// Create new employee
export const createEmployee = async (req, res) => {
  try {
    const employeeData = req.body;

    const employee = await Employee.create(employeeData);

    res.status(201).json({
      message: 'Employee created successfully',
      employee
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

// Update employee
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const employee = await Employee.findOne({
      where: { id, isActive: true }
    });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await employee.update(updateData);

    res.json({
      message: 'Employee updated successfully',
      employee
    });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

// Delete employee (soft delete)
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({
      where: { id, isActive: true }
    });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await employee.update({ isActive: false });

    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};

// Get employee statistics
export const getEmployeeStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.count({
      where: { isActive: true }
    });

    const activeEmployees = await Employee.count({
      where: { status: 'Active', isActive: true }
    });

    const onLeaveEmployees = await Employee.count({
      where: { status: 'On Leave', isActive: true }
    });

    const departmentStats = await Employee.findAll({
      attributes: [
        'department',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { isActive: true },
      group: ['department']
    });

    const performanceStats = await Employee.findAll({
      attributes: [
        'performance',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: { isActive: true },
      group: ['performance']
    });

    res.json({
      totalEmployees,
      activeEmployees,
      onLeaveEmployees,
      departmentStats,
      performanceStats
    });
  } catch (error) {
    console.error('Error fetching employee stats:', error);
    res.status(500).json({ error: 'Failed to fetch employee statistics' });
  }
}; 