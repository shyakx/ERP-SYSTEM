const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// Database connection log
pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL database!'))
  .catch(err => console.error('❌ Failed to connect to PostgreSQL database:', err));

app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/employees/stats', async (req, res) => {
  console.log('➡️  [HIT] /api/employees/stats');
  try {
    const totalResult = await pool.query('SELECT COUNT(*) as total FROM employees');
    console.log('   ↪️ Total employees:', totalResult.rows[0].total);
    const newHiresResult = await pool.query(
      `SELECT COUNT(*) as new_hires FROM employees WHERE DATE_TRUNC('month', hire_date) = DATE_TRUNC('month', CURRENT_DATE)`
    );
    console.log('   ↪️ New hires this month:', newHiresResult.rows[0].new_hires);
    const expiringContractsResult = await pool.query(
      `SELECT COUNT(*) as expiring FROM employees WHERE contract_end_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'`
    );
    console.log('   ↪️ Expiring contracts:', expiringContractsResult.rows[0].expiring);
    res.json({
      total: parseInt(totalResult.rows[0].total) || 0,
      newHires: parseInt(newHiresResult.rows[0].new_hires) || 0,
      expiringContracts: parseInt(expiringContractsResult.rows[0].expiring) || 0
    });
  } catch (err) {
    console.error('❌ Error in /api/employees/stats:', err);
    res.status(500).json({ error: err.message });
  }
});

// Employee Distribution by Department
app.get('/api/employees/distribution', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT department, COUNT(*) as count FROM employees GROUP BY department ORDER BY count DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    const { name, position, department, email, phone } = req.body;
    
    // Generate new employee ID
    const idResult = await pool.query('SELECT COUNT(*) as count FROM employees');
    const nextId = `DIC${(parseInt(idResult.rows[0].count) + 1).toString().padStart(3, '0')}`;
    
    const result = await pool.query(
      'INSERT INTO employees (id, name, position, department, email, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nextId, name, position, department, email, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, department, email, phone } = req.body;
    
    const result = await pool.query(
      'UPDATE employees SET name = $1, position = $2, department = $3, email = $4, phone = $5 WHERE id = $6 RETURNING *',
      [name, position, department, email, phone, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/departments', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT department FROM employees WHERE department IS NOT NULL ORDER BY department');
    res.json(result.rows.map(row => row.department));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Attendance endpoints
app.get('/api/attendance', async (req, res) => {
  try {
    const { date, employeeId } = req.query;
    let query = `
      SELECT a.*, e.name as employee_name, e.department 
      FROM attendance a 
      JOIN employees e ON a.employee_id = e.id
    `;
    let params = [];
    let conditions = [];
    
    if (date) {
      conditions.push(`a.date = $${params.length + 1}`);
      params.push(date);
    }
    
    if (employeeId) {
      conditions.push(`a.employee_id = $${params.length + 1}`);
      params.push(employeeId);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY a.date DESC, a.clock_in ASC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/attendance/clock-in', async (req, res) => {
  try {
    const { employeeId, location, notes } = req.body;
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0];
    const today = now.toISOString().split('T')[0];
    
    // Check if already clocked in today
    const existingRecord = await pool.query(
      'SELECT * FROM attendance WHERE employee_id = $1 AND date = $2 AND clock_out IS NULL',
      [employeeId, today]
    );
    
    if (existingRecord.rows.length > 0) {
      return res.status(400).json({ error: 'Already clocked in today' });
    }
    
    const result = await pool.query(
      'INSERT INTO attendance (employee_id, date, clock_in, location, notes, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [employeeId, today, currentTime, location || 'Main Office', notes || 'Clock in via system', 'present']
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/attendance/clock-out', async (req, res) => {
  try {
    const { employeeId } = req.body;
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0];
    const today = now.toISOString().split('T')[0];
    
    const result = await pool.query(
      'UPDATE attendance SET clock_out = $1, total_hours = EXTRACT(EPOCH FROM (clock_out::time - clock_in::time))/3600 WHERE employee_id = $2 AND date = $3 AND clock_out IS NULL RETURNING *',
      [currentTime, employeeId, today]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No active clock-in record found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/attendance/stats', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const presentResult = await pool.query(
      'SELECT COUNT(*) as count FROM attendance WHERE date = $1 AND status = $2',
      [today, 'present']
    );
    
    const absentResult = await pool.query(
      'SELECT COUNT(*) as count FROM attendance WHERE date = $1 AND status = $3',
      [today, 'absent']
    );
    
    const lateResult = await pool.query(
      'SELECT COUNT(*) as count FROM attendance WHERE date = $1 AND status = $4',
      [today, 'late']
    );
    
    const totalHoursResult = await pool.query(
      'SELECT COALESCE(SUM(total_hours), 0) as total FROM attendance WHERE date = $1',
      [today]
    );
    
    res.json({
      present: parseInt(presentResult.rows[0].count),
      absent: parseInt(absentResult.rows[0].count),
      late: parseInt(lateResult.rows[0].count),
      totalHours: parseFloat(totalHoursResult.rows[0].total)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Payroll endpoints
app.get('/api/payroll', async (req, res) => {
  try {
    const { period, status, employeeId, department, paymentMethod, startDate, endDate, limit = 50, offset = 0 } = req.query;
    let query = `
      SELECT p.*, e.name as employee_name, e.department, e.position
      FROM payroll p 
      JOIN employees e ON p.employee_id = e.id
    `;
    let params = [];
    let conditions = [];
    
    if (period) {
      conditions.push(`p.period = $${params.length + 1}`);
      params.push(period);
    }
    
    if (status) {
      conditions.push(`p.status = $${params.length + 1}`);
      params.push(status);
    }
    
    if (employeeId) {
      conditions.push(`p.employee_id = $${params.length + 1}`);
      params.push(employeeId);
    }

    if (department) {
      conditions.push(`e.department = $${params.length + 1}`);
      params.push(department);
    }

    if (paymentMethod) {
      conditions.push(`p.payment_method = $${params.length + 1}`);
      params.push(paymentMethod);
    }

    if (startDate && endDate) {
      conditions.push(`p.period BETWEEN $${params.length + 1} AND $${params.length + 2}`);
      params.push(startDate, endDate);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY p.period DESC, p.created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(parseInt(limit), parseInt(offset));
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enhanced payroll creation with all new fields
app.post('/api/payroll', async (req, res) => {
  try {
    const { 
      employeeId, 
      period, 
      baseSalary, 
      hoursWorked, 
      hourlyRate, 
      overtimeHours, 
      overtimeRate,
      transportAllowance,
      housingAllowance,
      performanceBonus,
      nightShiftAllowance,
      taxDeduction,
      insuranceDeduction,
      loanDeduction,
      otherDeductions,
      paymentMethod, 
      notes 
    } = req.body;
    
    const totalAllowances = (transportAllowance || 0) + (housingAllowance || 0) + (performanceBonus || 0) + (nightShiftAllowance || 0);
    const totalDeductions = (taxDeduction || 0) + (insuranceDeduction || 0) + (loanDeduction || 0) + (otherDeductions || 0);
    const grossPay = (hoursWorked * hourlyRate) + (overtimeHours * overtimeRate) + totalAllowances;
    const netPay = grossPay - totalDeductions;
    
    const result = await pool.query(
      `INSERT INTO payroll (
        employee_id, period, base_salary, hours_worked, hourly_rate, 
        overtime_hours, overtime_rate, transport_allowance, housing_allowance,
        performance_bonus, night_shift_allowance, tax_deduction, insurance_deduction,
        loan_deduction, other_deductions, deductions, bonuses, gross_pay, 
        net_pay, status, payment_method, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *`,
      [
        employeeId, period, baseSalary, hoursWorked, hourlyRate, 
        overtimeHours, overtimeRate, transportAllowance || 0, housingAllowance || 0,
        performanceBonus || 0, nightShiftAllowance || 0, taxDeduction || 0, insuranceDeduction || 0,
        loanDeduction || 0, otherDeductions || 0, totalDeductions, totalAllowances, grossPay, 
        netPay, 'pending', paymentMethod, notes
      ]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bulk payroll actions
app.post('/api/payroll/bulk-action', async (req, res) => {
  try {
    const { action, payrollIds, processedBy } = req.body;
    
    if (!payrollIds || payrollIds.length === 0) {
      return res.status(400).json({ error: 'No payroll IDs provided' });
    }

    let updateQuery = '';
    let params = [];

    switch (action) {
      case 'process':
        updateQuery = `UPDATE payroll SET status = 'processed', processed_at = NOW(), processed_by = $1 WHERE id = ANY($2) RETURNING *`;
        params = [processedBy, payrollIds];
        break;
      case 'approve':
        updateQuery = `UPDATE payroll SET status = 'paid', paid_at = NOW(), paid_by = $1 WHERE id = ANY($2) RETURNING *`;
        params = [processedBy, payrollIds];
        break;
      case 'reject':
        updateQuery = `UPDATE payroll SET status = 'rejected', processed_at = NOW(), processed_by = $1 WHERE id = ANY($2) RETURNING *`;
        params = [processedBy, payrollIds];
        break;
      case 'cancel':
        updateQuery = `UPDATE payroll SET status = 'cancelled', processed_at = NOW(), processed_by = $1 WHERE id = ANY($2) RETURNING *`;
        params = [processedBy, payrollIds];
        break;
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }

    const result = await pool.query(updateQuery, params);
    res.json({ 
      message: `Successfully ${action}ed ${result.rows.length} payroll records`,
      updatedRecords: result.rows 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Individual payroll actions with audit trail
app.put('/api/payroll/:id/process', async (req, res) => {
  try {
    const { id } = req.params;
    const { processedBy } = req.body;
    
    const result = await pool.query(
      'UPDATE payroll SET status = $1, processed_at = NOW(), processed_by = $2 WHERE id = $3 RETURNING *',
      ['processed', processedBy, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/payroll/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { approvedBy } = req.body;
    
    const result = await pool.query(
      'UPDATE payroll SET status = $1, paid_at = NOW(), paid_by = $2 WHERE id = $3 RETURNING *',
      ['paid', approvedBy, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/payroll/:id/reject', async (req, res) => {
  try {
    const { id } = req.params;
    const { rejectedBy, reason } = req.body;
    
    const result = await pool.query(
      'UPDATE payroll SET status = $1, processed_at = NOW(), processed_by = $2, notes = COALESCE(notes, $3) WHERE id = $4 RETURNING *',
      ['rejected', rejectedBy, reason, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/payroll/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;
    const { cancelledBy, reason } = req.body;
    
    const result = await pool.query(
      'UPDATE payroll SET status = $1, processed_at = NOW(), processed_by = $2, notes = COALESCE(notes, $3) WHERE id = $4 RETURNING *',
      ['cancelled', cancelledBy, reason, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Payslip generation endpoint
app.get('/api/payroll/:id/payslip', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT p.*, e.name as employee_name, e.department, e.position, e.email
      FROM payroll p 
      JOIN employees e ON p.employee_id = e.id
      WHERE p.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    const payroll = result.rows[0];
    
    // Generate payslip data
    const payslip = {
      id: payroll.id,
      employee: {
        name: payroll.employee_name,
        id: payroll.employee_id,
        department: payroll.department,
        position: payroll.position,
        email: payroll.email
      },
      period: payroll.period,
      earnings: {
        baseSalary: payroll.base_salary,
        overtime: payroll.overtime_hours * payroll.overtime_rate,
        transportAllowance: payroll.transport_allowance,
        housingAllowance: payroll.housing_allowance,
        performanceBonus: payroll.performance_bonus,
        nightShiftAllowance: payroll.night_shift_allowance,
        total: payroll.gross_pay
      },
      deductions: {
        tax: payroll.tax_deduction,
        insurance: payroll.insurance_deduction,
        loan: payroll.loan_deduction,
        other: payroll.other_deductions,
        total: payroll.deductions
      },
      summary: {
        grossPay: payroll.gross_pay,
        netPay: payroll.net_pay,
        status: payroll.status,
        paymentMethod: payroll.payment_method
      },
      generatedAt: new Date().toISOString()
    };
    
    res.json(payslip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export payroll data
app.get('/api/payroll/export', async (req, res) => {
  try {
    const { period, status, format = 'json' } = req.query;
    
    let query = `
      SELECT p.*, e.name as employee_name, e.department, e.position
      FROM payroll p 
      JOIN employees e ON p.employee_id = e.id
    `;
    let params = [];
    let conditions = [];
    
    if (period) {
      conditions.push(`p.period = $${params.length + 1}`);
      params.push(period);
    }
    
    if (status) {
      conditions.push(`p.status = $${params.length + 1}`);
      params.push(status);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY p.period DESC, e.name ASC';
    
    const result = await pool.query(query, params);
    
    if (format === 'csv') {
      const csv = result.rows.map(row => 
        `${row.employee_name},${row.period},${row.base_salary},${row.net_pay},${row.status}`
      ).join('\n');
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=payroll-${period || 'all'}.csv`);
      res.send(`Employee,Period,Base Salary,Net Pay,Status\n${csv}`);
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Advanced payroll statistics
app.get('/api/payroll/advanced-stats', async (req, res) => {
  try {
    const { period } = req.query;
    
    let periodCondition = '';
    let params = [];
    
    if (period) {
      periodCondition = 'WHERE period = $1';
      params.push(period);
    }
    
    // Total payroll statistics
    const totalStats = await pool.query(`
      SELECT 
        COUNT(*) as total_records,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
        COUNT(CASE WHEN status = 'processed' THEN 1 END) as processed_count,
        COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid_count,
        COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_count,
        COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_count,
        COALESCE(SUM(CASE WHEN status = 'paid' THEN net_pay ELSE 0 END), 0) as total_paid_amount,
        COALESCE(SUM(CASE WHEN status = 'pending' THEN net_pay ELSE 0 END), 0) as total_pending_amount,
        COALESCE(AVG(net_pay), 0) as average_net_pay,
        COALESCE(MAX(net_pay), 0) as highest_pay,
        COALESCE(MIN(net_pay), 0) as lowest_pay
      FROM payroll ${periodCondition}
    `, params);
    
    // Department-wise statistics
    const deptStats = await pool.query(`
      SELECT 
        e.department,
        COUNT(*) as employee_count,
        COALESCE(SUM(CASE WHEN p.status = 'paid' THEN p.net_pay ELSE 0 END), 0) as total_paid,
        COALESCE(AVG(p.net_pay), 0) as avg_pay
      FROM payroll p
      JOIN employees e ON p.employee_id = e.id
      ${periodCondition}
      GROUP BY e.department
      ORDER BY total_paid DESC
    `, params);
    
    // Payment method distribution
    const paymentStats = await pool.query(`
      SELECT 
        payment_method,
        COUNT(*) as count,
        COALESCE(SUM(net_pay), 0) as total_amount
      FROM payroll ${periodCondition}
      GROUP BY payment_method
      ORDER BY count DESC
    `, params);
    
    // Monthly trend (last 6 months)
    const monthlyTrend = await pool.query(`
      SELECT 
        period,
        COUNT(*) as record_count,
        COALESCE(SUM(CASE WHEN status = 'paid' THEN net_pay ELSE 0 END), 0) as paid_amount,
        COALESCE(AVG(net_pay), 0) as avg_pay
      FROM payroll
      WHERE period >= (SELECT MIN(period) FROM payroll)
      GROUP BY period
      ORDER BY period DESC
      LIMIT 6
    `);
    
    res.json({
      summary: totalStats.rows[0],
      byDepartment: deptStats.rows,
      byPaymentMethod: paymentStats.rows,
      monthlyTrend: monthlyTrend.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Payroll audit trail
app.get('/api/payroll/:id/audit', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT 
        id,
        employee_id,
        period,
        status,
        created_at,
        processed_at,
        paid_at,
        processed_by,
        paid_by,
        notes
      FROM payroll 
      WHERE id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    const payroll = result.rows[0];
    const auditTrail = [];
    
    // Add creation event
    auditTrail.push({
      action: 'created',
      timestamp: payroll.created_at,
      status: 'pending',
      user: 'system'
    });
    
    // Add processing event if processed
    if (payroll.processed_at) {
      auditTrail.push({
        action: 'processed',
        timestamp: payroll.processed_at,
        status: payroll.status,
        user: payroll.processed_by || 'system'
      });
    }
    
    // Add payment event if paid
    if (payroll.paid_at) {
      auditTrail.push({
        action: 'paid',
        timestamp: payroll.paid_at,
        status: 'paid',
        user: payroll.paid_by || 'system'
      });
    }
    
    res.json({
      payrollId: id,
      auditTrail: auditTrail.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/payroll/stats', async (req, res) => {
  try {
    const totalResult = await pool.query('SELECT COUNT(*) as count FROM payroll');
    const pendingResult = await pool.query("SELECT COUNT(*) as count FROM payroll WHERE status = 'pending'");
    const processedResult = await pool.query("SELECT COUNT(*) as count FROM payroll WHERE status = 'processed'");
    const paidResult = await pool.query("SELECT COUNT(*) as count FROM payroll WHERE status = 'paid'");
    const totalAmountResult = await pool.query("SELECT COALESCE(SUM(net_pay), 0) as total FROM payroll WHERE status = 'paid'");
    
    res.json({
      total: parseInt(totalResult.rows[0].count),
      pending: parseInt(pendingResult.rows[0].count),
      processed: parseInt(processedResult.rows[0].count),
      paid: parseInt(paidResult.rows[0].count),
      totalAmount: parseFloat(totalAmountResult.rows[0].total)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Generate payroll for a specific period
app.post('/api/payroll/generate', async (req, res) => {
  try {
    const { period, employeeIds, generatedBy } = req.body;
    
    if (!period) {
      return res.status(400).json({ error: 'Period is required' });
    }
    
    // Get employees to generate payroll for
    let employeeQuery = 'SELECT id, name, department, position FROM employees WHERE status = \'active\'';
    let employeeParams = [];
    
    if (employeeIds && employeeIds.length > 0) {
      employeeQuery += ' AND id = ANY($1)';
      employeeParams.push(employeeIds);
    }
    
    const employeesResult = await pool.query(employeeQuery, employeeParams);
    const employees = employeesResult.rows;
    
    if (employees.length === 0) {
      return res.status(400).json({ error: 'No active employees found' });
    }
    
    const generatedPayrolls = [];
    
    for (const employee of employees) {
      // Check if payroll already exists for this employee and period
      const existingResult = await pool.query(
        'SELECT id FROM payroll WHERE employee_id = $1 AND period = $2',
        [employee.id, period]
      );
      
      if (existingResult.rows.length > 0) {
        continue; // Skip if payroll already exists
      }
      
      // Get attendance data for the period (simplified calculation)
      const attendanceResult = await pool.query(
        'SELECT COUNT(*) as days_worked, COALESCE(SUM(total_hours), 0) as total_hours FROM attendance WHERE employee_id = $1 AND date >= $2 AND date < $3',
        [employee.id, `${period}-01`, `${period}-32`] // Approximate month range
      );
      
      const attendance = attendanceResult.rows[0];
      const daysWorked = parseInt(attendance.days_worked) || 0;
      const hoursWorked = parseFloat(attendance.total_hours) || 160; // Default to 160 hours
      
      // Calculate payroll (simplified - in real system, you'd have salary structures)
      const baseSalary = 120000; // Default base salary
      const hourlyRate = baseSalary / 160;
      const overtimeHours = Math.max(0, hoursWorked - 160);
      const overtimeRate = hourlyRate * 1.5;
      
      // Allowances and deductions (simplified)
      const transportAllowance = 15000;
      const housingAllowance = baseSalary * 0.1;
      const performanceBonus = Math.floor(Math.random() * 50000);
      const nightShiftAllowance = Math.floor(Math.random() * 20000);
      
      const taxDeduction = baseSalary * 0.15;
      const insuranceDeduction = 10000;
      const loanDeduction = Math.floor(Math.random() * 30000);
      const otherDeductions = Math.floor(Math.random() * 15000);
      
      const totalAllowances = transportAllowance + housingAllowance + performanceBonus + nightShiftAllowance;
      const totalDeductions = taxDeduction + insuranceDeduction + loanDeduction + otherDeductions;
      
      const grossPay = baseSalary + (overtimeHours * overtimeRate) + totalAllowances;
      const netPay = grossPay - totalDeductions;
      
      // Insert payroll record
      const payrollResult = await pool.query(
        `INSERT INTO payroll (
          employee_id, period, base_salary, hours_worked, hourly_rate, 
          overtime_hours, overtime_rate, transport_allowance, housing_allowance,
          performance_bonus, night_shift_allowance, tax_deduction, insurance_deduction,
          loan_deduction, other_deductions, deductions, bonuses, gross_pay, 
          net_pay, status, payment_method, notes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *`,
        [
          employee.id, period, baseSalary, hoursWorked, hourlyRate, 
          overtimeHours, overtimeRate, transportAllowance, housingAllowance,
          performanceBonus, nightShiftAllowance, taxDeduction, insuranceDeduction,
          loanDeduction, otherDeductions, totalDeductions, totalAllowances, grossPay, 
          netPay, 'pending', 'direct_deposit', `Auto-generated payroll for ${period}`
        ]
      );
      
      generatedPayrolls.push(payrollResult.rows[0]);
    }
    
    res.json({
      message: `Successfully generated ${generatedPayrolls.length} payroll records for period ${period}`,
      generatedPayrolls,
      period,
      generatedBy
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get payroll periods
app.get('/api/payroll/periods', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT DISTINCT period FROM payroll ORDER BY period DESC'
    );
    
    res.json(result.rows.map(row => row.period));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get payment methods
app.get('/api/payroll/payment-methods', async (req, res) => {
  try {
    res.json(['direct_deposit', 'cash', 'check', 'mobile_money']);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get payroll statuses
app.get('/api/payroll/statuses', async (req, res) => {
  try {
    res.json(['pending', 'processed', 'paid', 'cancelled', 'rejected']);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update payroll record
app.put('/api/payroll/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      baseSalary, hoursWorked, hourlyRate, overtimeHours, overtimeRate,
      transportAllowance, housingAllowance, performanceBonus, nightShiftAllowance,
      taxDeduction, insuranceDeduction, loanDeduction, otherDeductions,
      paymentMethod, notes 
    } = req.body;
    
    // Recalculate totals
    const totalAllowances = (transportAllowance || 0) + (housingAllowance || 0) + (performanceBonus || 0) + (nightShiftAllowance || 0);
    const totalDeductions = (taxDeduction || 0) + (insuranceDeduction || 0) + (loanDeduction || 0) + (otherDeductions || 0);
    const grossPay = (hoursWorked * hourlyRate) + (overtimeHours * overtimeRate) + totalAllowances;
    const netPay = grossPay - totalDeductions;
    
    const result = await pool.query(
      `UPDATE payroll SET 
        base_salary = $1, hours_worked = $2, hourly_rate = $3, 
        overtime_hours = $4, overtime_rate = $5, transport_allowance = $6,
        housing_allowance = $7, performance_bonus = $8, night_shift_allowance = $9,
        tax_deduction = $10, insurance_deduction = $11, loan_deduction = $12,
        other_deductions = $13, deductions = $14, bonuses = $15,
        gross_pay = $16, net_pay = $17, payment_method = $18, notes = $19
      WHERE id = $20 RETURNING *`,
      [
        baseSalary, hoursWorked, hourlyRate, overtimeHours, overtimeRate,
        transportAllowance || 0, housingAllowance || 0, performanceBonus || 0, nightShiftAllowance || 0,
        taxDeduction || 0, insuranceDeduction || 0, loanDeduction || 0, otherDeductions || 0,
        totalDeductions, totalAllowances, grossPay, netPay, paymentMethod, notes, id
      ]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete payroll record
app.delete('/api/payroll/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM payroll WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json({ message: 'Payroll record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password });
  try {
    const result = await pool.query('SELECT * FROM employees WHERE email = $1', [email]);
    console.log('DB result:', result.rows);
    if (result.rows.length === 0) {
      console.log('No user found for email:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', valid);
    if (!valid) {
      console.log('Password mismatch for user:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // For demo, return user info and a token in the expected format
    res.json({
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
        department: user.department
      },
      token: 'demo-token'
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Shifts endpoints
app.get('/api/shifts', async (req, res) => {
  try {
    const { date, employeeId, status } = req.query;
    let query = `
      SELECT s.id, s.date, s.start_time, s.end_time, s.location, s.status, s.notes, e.name AS employeeName
      FROM shifts s
      JOIN employees e ON s.employee_id = e.id
    `;
    let params = [];
    let conditions = [];
    if (date) {
      conditions.push(`s.date = $${params.length + 1}`);
      params.push(date);
    }
    if (employeeId) {
      conditions.push(`s.employee_id = $${params.length + 1}`);
      params.push(employeeId);
    }
    if (status) {
      conditions.push(`s.status = $${params.length + 1}`);
      params.push(status);
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY s.date DESC, s.start_time ASC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch shifts' });
  }
});

app.get('/api/shifts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT s.*, e.name as employee_name FROM shifts s JOIN employees e ON s.employee_id = e.id WHERE s.id = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Shift not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/shifts', async (req, res) => {
  try {
    const { employeeId, date, startTime, endTime, location, clientName, status, notes, totalHours } = req.body;
    const result = await pool.query(
      `INSERT INTO shifts (employee_id, date, start_time, end_time, location, client_name, status, notes, total_hours) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [employeeId, date, startTime, endTime, location, clientName, status || 'scheduled', notes, totalHours]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/shifts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { employeeId, date, startTime, endTime, location, clientName, status, notes, totalHours } = req.body;
    const result = await pool.query(
      `UPDATE shifts SET employee_id = $1, date = $2, start_time = $3, end_time = $4, location = $5, client_name = $6, status = $7, notes = $8, total_hours = $9, updated_at = CURRENT_TIMESTAMP WHERE id = $10 RETURNING *`,
      [employeeId, date, startTime, endTime, location, clientName, status, notes, totalHours, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Shift not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/shifts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM shifts WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Shift not found' });
    }
    res.json({ message: 'Shift deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Attendance Trend (last 30 days)
app.get('/api/attendance/trend', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT date, 
        COUNT(*) FILTER (WHERE status = 'present') AS present,
        COUNT(*) FILTER (WHERE status = 'absent') AS absent,
        COUNT(*) FILTER (WHERE status = 'leave') AS leave
      FROM attendance
      WHERE date >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY date
      ORDER BY date
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Monthly Hiring vs. Attrition Trend (last 12 months)
app.get('/api/employees/hiring-attrition-trend', async (req, res) => {
  try {
    const result = await pool.query(`
      WITH months AS (
        SELECT to_char(date_trunc('month', CURRENT_DATE) - INTERVAL '1 month' * gs, 'YYYY-MM') AS month
        FROM generate_series(0, 11) AS gs
      )
      SELECT m.month,
        COALESCE(h.hired, 0) AS hired,
        COALESCE(a.left, 0) AS left
      FROM months m
      LEFT JOIN (
        SELECT to_char(hire_date, 'YYYY-MM') AS month, COUNT(*) AS hired
        FROM employees
        WHERE hire_date IS NOT NULL
        GROUP BY month
      ) h ON m.month = h.month
      LEFT JOIN (
        SELECT to_char(contract_end_date, 'YYYY-MM') AS month, COUNT(*) AS left
        FROM employees
        WHERE contract_end_date IS NOT NULL
        GROUP BY month
      ) a ON m.month = a.month
      ORDER BY m.month
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Top Reasons for Disciplinary Actions
app.get('/api/disciplinary-cases/top-reasons', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT reason, COUNT(*) as count FROM disciplinary_cases GROUP BY reason ORDER BY count DESC LIMIT 5`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Employees With Frequent Absences (last 30 days, >3 absences)
app.get('/api/attendance/frequent-absences', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.name, COUNT(*) as count
      FROM attendance a
      JOIN employees e ON a.employee_id = e.id
      WHERE a.status = 'absent' AND a.date >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY e.name
      HAVING COUNT(*) > 3
      ORDER BY count DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contracts Expiring in Next 30 Days
app.get('/api/employees/expiring-contracts', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT name, contract_end_date
      FROM employees
      WHERE contract_end_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
      ORDER BY contract_end_date
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Pending Leave/Time-Off Requests
app.get('/api/leave/pending', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT l.id, e.name, l.type, l.start_date, l.end_date
      FROM leave_requests l
      JOIN employees e ON l.employee_id = e.id
      WHERE l.status = 'pending'
      ORDER BY l.start_date
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Shifts Not Assigned for Next Week
app.get('/api/shifts/unassigned-next-week', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT date, COUNT(*) as unassigned
      FROM shifts
      WHERE date BETWEEN CURRENT_DATE + INTERVAL '1 day' AND CURRENT_DATE + INTERVAL '7 days'
        AND (employee_id IS NULL OR employee_id = '')
      GROUP BY date
      ORDER BY date
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contracts Status (pending/approved)
app.get('/api/contracts/status', async (req, res) => {
  try {
    const pending = await pool.query(`SELECT COUNT(*) as count FROM contracts WHERE status = 'pending'`);
    const approved = await pool.query(`SELECT COUNT(*) as count FROM contracts WHERE status = 'approved'`);
    res.json({ pending: parseInt(pending.rows[0].count), approved: parseInt(approved.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Expired IDs
app.get('/api/documents/expired-ids', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.name, d.type as id_type, d.expiry_date as expired_on
      FROM documents d
      JOIN employees e ON d.employee_id = e.id
      WHERE d.expiry_date < CURRENT_DATE
      ORDER BY d.expiry_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Missing Documentation
app.get('/api/documents/missing', async (req, res) => {
  try {
    // Example: required_docs = ['ID Card', 'Contract', 'Photo']
    const requiredDocs = ['ID Card', 'Contract', 'Photo'];
    const result = await pool.query(`
      SELECT e.name, array_agg(d.type) as docs
      FROM employees e
      LEFT JOIN documents d ON d.employee_id = e.id
      GROUP BY e.id
    `);
    const missing = result.rows.map(row => {
      const docs = row.docs.filter(Boolean);
      const missing_docs = requiredDocs.filter(doc => !docs.includes(doc));
      return missing_docs.length > 0 ? { employee: row.name, missing_docs } : null;
    }).filter(Boolean);
    res.json(missing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Top 5 Employees This Month (by attendance)
app.get('/api/employees/top-this-month', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.name, 
        ROUND(100.0 * SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) / NULLIF(COUNT(a.*), 0), 1) AS attendance
      FROM employees e
      JOIN attendance a ON a.employee_id = e.id
      WHERE DATE_TRUNC('month', a.date) = DATE_TRUNC('month', CURRENT_DATE)
      GROUP BY e.id
      ORDER BY attendance DESC NULLS LAST
      LIMIT 5
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Employees on Leave Today
app.get('/api/leave/on-leave-today', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const result = await pool.query(`
      SELECT e.name, l.type, l.start_date, l.end_date
      FROM leave_requests l
      JOIN employees e ON l.employee_id = e.id
      WHERE l.status = 'approved' AND $1 BETWEEN l.start_date AND l.end_date
    `, [today]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leave Balances
app.get('/api/leave/balances', async (req, res) => {
  try {
    // Example: assume leave_balance column in employees table
    const result = await pool.query(`
      SELECT name, leave_balance as balance
      FROM employees
      ORDER BY name
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all demo users (for dev/testing)
app.get('/api/demo-users', async (req, res) => {
  try {
    const result = await pool.query('SELECT email, role FROM employees ORDER BY role');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/disciplinary-cases/stats', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) as count FROM disciplinary_cases WHERE status = 'open' OR status = 'pending'"
    );
    res.json({ open: parseInt(result.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Announcements endpoints
app.get('/api/announcements', async (req, res) => {
  try {
    const { type, priority } = req.query;
    let query = 'SELECT * FROM announcements WHERE status = $1';
    let params = ['active'];
    
    if (type) {
      query += ' AND type = $2';
      params.push(type);
    }
    
    if (priority) {
      query += ' AND priority = $3';
      params.push(priority);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/announcements', async (req, res) => {
  try {
    const { title, content, type, priority, created_by, expires_at } = req.body;
    const result = await pool.query(
      `INSERT INTO announcements (title, content, type, priority, created_by, expires_at, status) 
       VALUES ($1, $2, $3, $4, $5, $6, 'active') RETURNING *`,
      [title, content, type, priority, created_by, expires_at]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Enhanced activity feed with real data
app.get('/api/activity/recent', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT al.*, e.name as employee_name 
      FROM activity_log al
      JOIN employees e ON al.employee_id = e.id
      ORDER BY al.timestamp DESC
      LIMIT 10
    `);
    
    const activities = result.rows.map(row => ({
      timestamp: row.timestamp,
      type: row.activity_type,
      description: row.description,
      employee_name: row.employee_name
    }));
    
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Shifts statistics
app.get('/api/shifts/stats', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const totalResult = await pool.query('SELECT COUNT(*) as count FROM shifts');
    const todayResult = await pool.query('SELECT COUNT(*) as count FROM shifts WHERE date = $1', [today]);
    const completedResult = await pool.query("SELECT COUNT(*) as count FROM shifts WHERE status = 'completed'");
    const inProgressResult = await pool.query("SELECT COUNT(*) as count FROM shifts WHERE status = 'in_progress'");
    
    res.json({
      total: parseInt(totalResult.rows[0].count),
      today: parseInt(todayResult.rows[0].count),
      completed: parseInt(completedResult.rows[0].count),
      inProgress: parseInt(inProgressResult.rows[0].count)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Quick actions data
app.get('/api/quick-actions', async (req, res) => {
  try {
    const actions = [
      {
        id: 1,
        title: 'Add Employee',
        description: 'Register new employee',
        icon: 'users',
        route: '/hr/employees/add',
        permissions: ['hr_manager', 'hr_assistant', 'system_admin']
      },
      {
        id: 2,
        title: 'Schedule Shift',
        description: 'Assign work schedules',
        icon: 'calendar',
        route: '/operations/shifts',
        permissions: ['operations_supervisor', 'system_admin']
      },
      {
        id: 3,
        title: 'Create Invoice',
        description: 'Generate billing invoice',
        icon: 'dollar-sign',
        route: '/finance/invoicing',
        permissions: ['finance_manager', 'accountant', 'system_admin']
      },
      {
        id: 4,
        title: 'Generate Report',
        description: 'Create HR report',
        icon: 'file-text',
        route: '/finance/reports',
        permissions: ['hr_manager', 'finance_manager', 'system_admin']
      },
      {
        id: 5,
        title: 'Asset Management',
        description: 'Manage security equipment',
        icon: 'shield',
        route: '/inventory/assets',
        permissions: ['asset_manager', 'system_admin']
      },
      {
        id: 6,
        title: 'Client Management',
        description: 'Manage client relationships',
        icon: 'users',
        route: '/clients',
        permissions: ['client_relationship_manager', 'system_admin']
      }
    ];
    
    res.json(actions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard overview statistics
app.get('/api/dashboard/overview', async (req, res) => {
  try {
    // Get employee stats
    const employeeStats = await pool.query('SELECT COUNT(*) as total FROM employees');
    
    // Get attendance stats for today
    const today = new Date().toISOString().split('T')[0];
    const attendanceStats = await pool.query(
      'SELECT COUNT(*) as present FROM attendance WHERE date = $1 AND status = $2',
      [today, 'present']
    );
    
    // Get payroll stats for current month
    const currentMonth = new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0');
    const payrollStats = await pool.query(
      "SELECT COALESCE(SUM(net_pay), 0) as total FROM payroll WHERE period = $1 AND status = 'paid'",
      [currentMonth]
    );
    
    // Get incidents stats
    const incidentsStats = await pool.query(
      "SELECT COUNT(*) as count FROM disciplinary_cases WHERE status = 'open' OR status = 'pending'"
    );
    
    res.json({
      employees: parseInt(employeeStats.rows[0].total),
      onDuty: parseInt(attendanceStats.rows[0].present),
      payroll: parseFloat(payrollStats.rows[0].total),
      incidents: parseInt(incidentsStats.rows[0].count)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Department-wise employee distribution
app.get('/api/dashboard/department-distribution', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT department, COUNT(*) as count 
      FROM employees 
      GROUP BY department 
      ORDER BY count DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Recent system activities
app.get('/api/dashboard/recent-activities', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT al.activity_type, al.description, al.timestamp, e.name as employee_name
      FROM activity_log al
      JOIN employees e ON al.employee_id = e.id
      ORDER BY al.timestamp DESC
      LIMIT 5
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('🚀 Server running on port 5000')); 