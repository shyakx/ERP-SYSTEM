import { Customer, Invoice, Transaction, User } from '../models/associations.js';
import { Op } from 'sequelize';

// Get all customers with pagination and filtering
export const getAllCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, category, status, search } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = { isActive: true };
    if (type) whereClause.type = type;
    if (category) whereClause.category = category;
    if (status) whereClause.status = status;
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { companyName: { [Op.iLike]: `%${search}%` } },
        { customerCode: { [Op.iLike]: `%${search}%` } },
        { contactPerson: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: customers } = await Customer.findAndCountAll({
      where: whereClause,
      include: [
        { model: User, as: 'customerCreator', attributes: ['name'] }
      ],
      order: [['name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      customers,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};

// Test endpoint for development
export const testGetAllCustomers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const { count, rows: customers } = await Customer.findAndCountAll({
      where: { isActive: true },
      order: [['name', 'ASC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      items: customers,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.json({
      items: [],
      total: 0,
      totalPages: 0,
      currentPage: 1
    });
  }
};

// Get customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findOne({
      where: { id, isActive: true },
      include: [
        { model: User, as: 'customerCreator' },
        { model: Invoice, as: 'customerInvoices', limit: 10, order: [['issueDate', 'DESC']] },
        { model: Transaction, as: 'customerTransactions', limit: 10, order: [['transactionDate', 'DESC']] }
      ]
    });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
};

// Create new customer
export const createCustomer = async (req, res) => {
  try {
    const customerData = {
      ...req.body,
      createdBy: req.user.id
    };

    const customer = await Customer.create(customerData);
    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
};

// Update customer
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findOne({ where: { id, isActive: true } });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    await customer.update(req.body);
    res.json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Failed to update customer' });
  }
};

// Delete customer
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findOne({ where: { id, isActive: true } });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    await customer.update({ isActive: false });
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};

// Get customer statistics
export const getCustomerStats = async (req, res) => {
  try {
    const customers = await Customer.findAll({ where: { isActive: true } });

    const stats = {
      total: customers.length,
      totalBalance: customers.reduce((sum, c) => sum + parseFloat(c.currentBalance), 0),
      individual: customers.filter(c => c.type === 'individual').length,
      business: customers.filter(c => c.type === 'business').length,
      government: customers.filter(c => c.type === 'government').length,
      nonProfit: customers.filter(c => c.type === 'non_profit').length,
      active: customers.filter(c => c.status === 'active').length,
      inactive: customers.filter(c => c.status === 'inactive').length,
      suspended: customers.filter(c => c.status === 'suspended').length,
      blacklisted: customers.filter(c => c.status === 'blacklisted').length,
      byCategory: {}
    };

    // Group by category
    customers.forEach(customer => {
      const category = customer.category;
      if (!stats.byCategory[category]) {
        stats.byCategory[category] = {
          count: 0,
          balance: 0
        };
      }
      stats.byCategory[category].count++;
      stats.byCategory[category].balance += parseFloat(customer.currentBalance);
    });

    res.json(stats);
  } catch (error) {
    console.error('Error fetching customer stats:', error);
    res.status(500).json({ error: 'Failed to fetch customer statistics' });
  }
}; 