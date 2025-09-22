const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();

// Import models
const Transaction = require('../models/Transaction');
const FinancialAccount = require('../models/FinancialAccount');
const Expense = require('../models/Expense');
const Budget = require('../models/Budget');
const AccountsReceivable = require('../models/AccountsReceivable');
const AccountsPayable = require('../models/AccountsPayable');
const Invoice = require('../models/Invoice');
const FinancialReport = require('../models/FinancialReport');
const TaxRecord = require('../models/TaxRecord');
const CashFlow = require('../models/CashFlow');

// Import middleware
const { authenticateToken, requireRole } = require('../middlewares/auth');

// ==================== TRANSACTIONS ====================

// Get all transactions
router.get('/transactions', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const { page = 1, limit = 10, type, account_id, date_from, date_to, amount_min, amount_max } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    
    if (type) whereClause.type = type;
    if (account_id) whereClause.account_id = account_id;
    
    if (date_from && date_to) {
      whereClause.transaction_date = {
        [Op.between]: [date_from, date_to]
      };
    }
    
    if (amount_min || amount_max) {
      whereClause.amount = {};
      if (amount_min) whereClause.amount[Op.gte] = parseFloat(amount_min);
      if (amount_max) whereClause.amount[Op.lte] = parseFloat(amount_max);
    }

    const { count, rows: transactions } = await Transaction.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: FinancialAccount,
          as: 'account',
          attributes: ['id', 'account_name', 'account_type']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['transaction_date', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: transactions,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create transaction
router.post('/transactions', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const {
      account_id,
      type,
      amount,
      description,
      transaction_date,
      reference_number,
      category,
      tags
    } = req.body;

    if (!account_id || !type || !amount || !description || !transaction_date) {
      return res.status(400).json({
        success: false,
        message: 'Account ID, type, amount, description, and date are required'
      });
    }

    const transaction = await Transaction.create({
      account_id,
      type,
      amount: parseFloat(amount),
      description,
      transaction_date,
      reference_number,
      category,
      tags,
      created_by: req.user.id
    });

    // Update account balance
    const account = await FinancialAccount.findByPk(account_id);
    if (account) {
      const newBalance = type === 'credit' 
        ? account.balance + parseFloat(amount)
        : account.balance - parseFloat(amount);
      
      await account.update({ balance: newBalance });
    }

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction
    });

  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== FINANCIAL ACCOUNTS ====================

// Get all financial accounts
router.get('/accounts', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const { page = 1, limit = 10, type, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (type) whereClause.account_type = type;
    if (status) whereClause.status = status;

    const { count, rows: accounts } = await FinancialAccount.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['account_name', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        items: accounts,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get accounts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create financial account
router.post('/accounts', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const {
      account_name,
      account_type,
      account_number,
      bank_name,
      initial_balance,
      currency,
      description
    } = req.body;

    if (!account_name || !account_type || !account_number) {
      return res.status(400).json({
        success: false,
        message: 'Account name, type, and number are required'
      });
    }

    const account = await FinancialAccount.create({
      account_name,
      account_type,
      account_number,
      bank_name,
      balance: initial_balance || 0,
      currency: currency || 'RWF',
      description,
      status: 'active',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Financial account created successfully',
      data: account
    });

  } catch (error) {
    console.error('Create account error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== EXPENSES ====================

// Get all expenses
router.get('/expenses', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const { page = 1, limit = 10, category, status, date_from, date_to } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (category) whereClause.category = category;
    if (status) whereClause.status = status;
    
    if (date_from && date_to) {
      whereClause.expense_date = {
        [Op.between]: [date_from, date_to]
      };
    }

    const { count, rows: expenses } = await Expense.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['expense_date', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: expenses,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create expense
router.post('/expenses', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const {
      amount,
      category,
      description,
      expense_date,
      vendor,
      receipt_url,
      account_id,
      approved_by
    } = req.body;

    if (!amount || !category || !description || !expense_date) {
      return res.status(400).json({
        success: false,
        message: 'Amount, category, description, and date are required'
      });
    }

    const expense = await Expense.create({
      amount: parseFloat(amount),
      category,
      description,
      expense_date,
      vendor,
      receipt_url,
      account_id,
      status: 'pending',
      submitted_by: req.user.id,
      approved_by
    });

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: expense
    });

  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Approve expense
router.put('/expenses/:id/approve', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const { id } = req.params;
    const { comments } = req.body;

    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    await expense.update({
      status: 'approved',
      approved_by: req.user.id,
      approved_at: new Date(),
      comments
    });

    res.json({
      success: true,
      message: 'Expense approved successfully',
      data: expense
    });

  } catch (error) {
    console.error('Approve expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== BUDGETS ====================

// Get all budgets
router.get('/budgets', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const { page = 1, limit = 10, year, department_id, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (year) whereClause.year = year;
    if (department_id) whereClause.department_id = department_id;
    if (status) whereClause.status = status;

    const { count, rows: budgets } = await Budget.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['year', 'DESC'], ['department_id', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        items: budgets,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get budgets error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create budget
router.post('/budgets', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const {
      department_id,
      year,
      category,
      allocated_amount,
      spent_amount,
      description
    } = req.body;

    if (!department_id || !year || !category || !allocated_amount) {
      return res.status(400).json({
        success: false,
        message: 'Department, year, category, and allocated amount are required'
      });
    }

    const budget = await Budget.create({
      department_id,
      year,
      category,
      allocated_amount: parseFloat(allocated_amount),
      spent_amount: parseFloat(spent_amount) || 0,
      description,
      status: 'active',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Budget created successfully',
      data: budget
    });

  } catch (error) {
    console.error('Create budget error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== INVOICES ====================

// Get all invoices
router.get('/invoices', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const { page = 1, limit = 10, status, client_id, date_from, date_to } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (status) whereClause.status = status;
    if (client_id) whereClause.client_id = client_id;
    
    if (date_from && date_to) {
      whereClause.invoice_date = {
        [Op.between]: [date_from, date_to]
      };
    }

    const { count, rows: invoices } = await Invoice.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['invoice_date', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        items: invoices,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create invoice
router.post('/invoices', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const {
      client_id,
      invoice_number,
      invoice_date,
      due_date,
      items,
      subtotal,
      tax_amount,
      total_amount,
      description,
      terms
    } = req.body;

    if (!client_id || !invoice_number || !invoice_date || !due_date || !total_amount) {
      return res.status(400).json({
        success: false,
        message: 'Client, invoice number, dates, and total amount are required'
      });
    }

    const invoice = await Invoice.create({
      client_id,
      invoice_number,
      invoice_date,
      due_date,
      items: items || [],
      subtotal: parseFloat(subtotal) || 0,
      tax_amount: parseFloat(tax_amount) || 0,
      total_amount: parseFloat(total_amount),
      description,
      terms,
      status: 'draft',
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Invoice created successfully',
      data: invoice
    });

  } catch (error) {
    console.error('Create invoice error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== ACCOUNTS RECEIVABLE ====================

// Get accounts receivable
router.get('/accounts-receivable', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const { page = 1, limit = 10, status, client_id } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (status) whereClause.status = status;
    if (client_id) whereClause.client_id = client_id;

    const { count, rows: receivables } = await AccountsReceivable.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['due_date', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        items: receivables,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get accounts receivable error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Record payment
router.post('/accounts-receivable/:id/payment', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, payment_date, payment_method, reference } = req.body;

    if (!amount || !payment_date) {
      return res.status(400).json({
        success: false,
        message: 'Amount and payment date are required'
      });
    }

    const receivable = await AccountsReceivable.findByPk(id);
    if (!receivable) {
      return res.status(404).json({
        success: false,
        message: 'Account receivable not found'
      });
    }

    const paymentAmount = parseFloat(amount);
    const newPaidAmount = receivable.paid_amount + paymentAmount;
    const newStatus = newPaidAmount >= receivable.total_amount ? 'paid' : 'partial';

    await receivable.update({
      paid_amount: newPaidAmount,
      status: newStatus,
      last_payment_date: payment_date
    });

    // Create transaction record
    await Transaction.create({
      account_id: receivable.account_id,
      type: 'credit',
      amount: paymentAmount,
      description: `Payment received for invoice ${receivable.invoice_number}`,
      transaction_date: payment_date,
      reference_number: reference,
      category: 'payment_received',
      created_by: req.user.id
    });

    res.json({
      success: true,
      message: 'Payment recorded successfully',
      data: receivable
    });

  } catch (error) {
    console.error('Record payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== ACCOUNTS PAYABLE ====================

// Get accounts payable
router.get('/accounts-payable', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const { page = 1, limit = 10, status, vendor } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {};
    if (status) whereClause.status = status;
    if (vendor) whereClause.vendor = { [Op.iLike]: `%${vendor}%` };

    const { count, rows: payables } = await AccountsPayable.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['due_date', 'ASC']]
    });

    res.json({
      success: true,
      data: {
        items: payables,
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    });

  } catch (error) {
    console.error('Get accounts payable error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Record payment
router.post('/accounts-payable/:id/payment', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, payment_date, payment_method, reference } = req.body;

    if (!amount || !payment_date) {
      return res.status(400).json({
        success: false,
        message: 'Amount and payment date are required'
      });
    }

    const payable = await AccountsPayable.findByPk(id);
    if (!payable) {
      return res.status(404).json({
        success: false,
        message: 'Account payable not found'
      });
    }

    const paymentAmount = parseFloat(amount);
    const newPaidAmount = payable.paid_amount + paymentAmount;
    const newStatus = newPaidAmount >= payable.total_amount ? 'paid' : 'partial';

    await payable.update({
      paid_amount: newPaidAmount,
      status: newStatus,
      last_payment_date: payment_date
    });

    // Create transaction record
    await Transaction.create({
      account_id: payable.account_id,
      type: 'debit',
      amount: paymentAmount,
      description: `Payment made to ${payable.vendor}`,
      transaction_date: payment_date,
      reference_number: reference,
      category: 'payment_made',
      created_by: req.user.id
    });

    res.json({
      success: true,
      message: 'Payment recorded successfully',
      data: payable
    });

  } catch (error) {
    console.error('Record payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== FINANCIAL REPORTS ====================

// Generate financial report
router.post('/reports/generate', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const { report_type, start_date, end_date, department_id } = req.body;

    if (!report_type || !start_date || !end_date) {
      return res.status(400).json({
        success: false,
        message: 'Report type, start date, and end date are required'
      });
    }

    let reportData = {};

    switch (report_type) {
      case 'income_statement':
        // Calculate revenue, expenses, and net income
        const revenue = await Transaction.sum('amount', {
          where: {
            type: 'credit',
            transaction_date: { [Op.between]: [start_date, end_date] }
          }
        });

        const expenses = await Transaction.sum('amount', {
          where: {
            type: 'debit',
            transaction_date: { [Op.between]: [start_date, end_date] }
          }
        });

        reportData = {
          revenue: revenue || 0,
          expenses: expenses || 0,
          net_income: (revenue || 0) - (expenses || 0)
        };
        break;

      case 'balance_sheet':
        // Get account balances
        const accounts = await FinancialAccount.findAll({
          attributes: ['account_type', 'balance']
        });

        const assets = accounts
          .filter(acc => acc.account_type === 'asset')
          .reduce((sum, acc) => sum + acc.balance, 0);

        const liabilities = accounts
          .filter(acc => acc.account_type === 'liability')
          .reduce((sum, acc) => sum + acc.balance, 0);

        const equity = accounts
          .filter(acc => acc.account_type === 'equity')
          .reduce((sum, acc) => sum + acc.balance, 0);

        reportData = {
          assets,
          liabilities,
          equity,
          total_assets: assets
        };
        break;

      case 'cash_flow':
        // Calculate cash flow from operations, investing, and financing
        const operatingCashFlow = await Transaction.sum('amount', {
          where: {
            category: { [Op.in]: ['revenue', 'expense'] },
            transaction_date: { [Op.between]: [start_date, end_date] }
          }
        });

        reportData = {
          operating_cash_flow: operatingCashFlow || 0,
          investing_cash_flow: 0, // Placeholder
          financing_cash_flow: 0, // Placeholder
          net_cash_flow: operatingCashFlow || 0
        };
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid report type'
        });
    }

    // Save report
    const report = await FinancialReport.create({
      report_type,
      start_date,
      end_date,
      department_id,
      data: reportData,
      generated_by: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Financial report generated successfully',
      data: {
        report,
        reportData
      }
    });

  } catch (error) {
    console.error('Generate report error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ==================== FINANCE STATISTICS ====================

// Get finance dashboard statistics
router.get('/stats', authenticateToken, requireRole(['admin', 'finance']), async (req, res) => {
  try {
    const currentMonth = new Date();
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    // Total revenue this month
    const monthlyRevenue = await Transaction.sum('amount', {
      where: {
        type: 'credit',
        transaction_date: { [Op.between]: [startOfMonth, endOfMonth] }
      }
    });

    // Total expenses this month
    const monthlyExpenses = await Transaction.sum('amount', {
      where: {
        type: 'debit',
        transaction_date: { [Op.between]: [startOfMonth, endOfMonth] }
      }
    });

    // Total accounts receivable
    const totalReceivables = await AccountsReceivable.sum('total_amount', {
      where: { status: { [Op.in]: ['pending', 'partial'] } }
    });

    // Total accounts payable
    const totalPayables = await AccountsPayable.sum('total_amount', {
      where: { status: { [Op.in]: ['pending', 'partial'] } }
    });

    // Number of pending invoices
    const pendingInvoices = await Invoice.count({
      where: { status: 'pending' }
    });

    // Number of pending expenses
    const pendingExpenses = await Expense.count({
      where: { status: 'pending' }
    });

    // Recent transactions
    const recentTransactions = await Transaction.findAll({
      limit: 10,
      order: [['transaction_date', 'DESC']],
      include: [
        {
          model: FinancialAccount,
          as: 'account',
          attributes: ['account_name']
        }
      ]
    });

    // Top expense categories
    const expenseCategories = await Expense.findAll({
      attributes: [
        'category',
        [Transaction.sequelize.fn('SUM', Transaction.sequelize.col('amount')), 'total']
      ],
      group: ['category'],
      order: [[Transaction.sequelize.fn('SUM', Transaction.sequelize.col('amount')), 'DESC']],
      limit: 5
    });

    res.json({
      success: true,
      data: {
        monthlyRevenue: monthlyRevenue || 0,
        monthlyExpenses: monthlyExpenses || 0,
        monthlyProfit: (monthlyRevenue || 0) - (monthlyExpenses || 0),
        totalReceivables: totalReceivables || 0,
        totalPayables: totalPayables || 0,
        pendingInvoices,
        pendingExpenses,
        recentTransactions,
        expenseCategories
      }
    });

  } catch (error) {
    console.error('Get finance stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
