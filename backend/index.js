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

app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees ORDER BY name');
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

app.get('/api/employees/stats', async (req, res) => {
  try {
    const totalResult = await pool.query('SELECT COUNT(*) as total FROM employees');
    const deptResult = await pool.query('SELECT department, COUNT(*) as count FROM employees GROUP BY department');
    
    res.json({
      total: parseInt(totalResult.rows[0].total),
      byDepartment: deptResult.rows
    });
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
    const { period, status, employeeId } = req.query;
    let query = `
      SELECT p.*, e.name as employee_name, e.department 
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
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY p.period DESC, p.created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
      deductions, 
      bonuses, 
      paymentMethod, 
      notes 
    } = req.body;
    
    const grossPay = (hoursWorked * hourlyRate) + (overtimeHours * overtimeRate) + bonuses;
    const netPay = grossPay - deductions;
    
    const result = await pool.query(
      `INSERT INTO payroll (
        employee_id, period, base_salary, hours_worked, hourly_rate, 
        overtime_hours, overtime_rate, deductions, bonuses, gross_pay, 
        net_pay, status, payment_method, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
      [employeeId, period, baseSalary, hoursWorked, hourlyRate, overtimeHours, overtimeRate, deductions, bonuses, grossPay, netPay, 'pending', paymentMethod, notes]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/payroll/:id/process', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE payroll SET status = $1, processed_at = NOW() WHERE id = $2 RETURNING *',
      ['processed', id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/payroll/:id/pay', async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentDate } = req.body;
    const result = await pool.query(
      'UPDATE payroll SET status = $1, payment_date = $2, paid_at = NOW() WHERE id = $3 RETURNING *',
      ['paid', paymentDate, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payroll record not found' });
    }
    
    res.json(result.rows[0]);
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

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email, password);
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    console.log('User from DB:', user);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    console.log('Password valid:', valid);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const { password: _, ...userData } = user;
    res.json({ user: userData, token: 'dummy-token' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Shifts endpoints
app.get('/api/shifts', async (req, res) => {
  try {
    const { date, employeeId, status } = req.query;
    let query = `
      SELECT s.*, e.name as employee_name
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
    res.status(500).json({ error: err.message });
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

// Add more endpoints as needed

app.listen(5000, () => console.log('Server running on port 5000')); 