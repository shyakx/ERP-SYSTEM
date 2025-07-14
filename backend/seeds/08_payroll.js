exports.seed = async function(knex) {
  // Truncate payroll table and reset id sequence
  await knex.raw('TRUNCATE TABLE payroll RESTART IDENTITY CASCADE');
  
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  
  // Generate data for multiple periods (last 6 months)
  const periods = [];
  for (let i = 5; i >= 0; i--) {
    const month = currentMonth - i;
    const year = currentYear + Math.floor((month - 1) / 12);
    const adjustedMonth = ((month - 1 + 12) % 12) + 1;
    periods.push(`${year}-${adjustedMonth.toString().padStart(2, '0')}`);
  }

  // Employee data with realistic salaries and roles
  const employees = [
    { id: 'DIC001', name: 'John Doe', base_salary: 120000, role: 'Security Guard' },
    { id: 'DIC002', name: 'Jane Smith', base_salary: 150000, role: 'Senior Guard' },
    { id: 'DIC003', name: 'Mike Johnson', base_salary: 180000, role: 'Supervisor' },
    { id: 'DIC004', name: 'Sarah Wilson', base_salary: 200000, role: 'Team Leader' },
    { id: 'DIC005', name: 'David Brown', base_salary: 250000, role: 'Manager' },
    { id: 'DIC006', name: 'Lisa Davis', base_salary: 110000, role: 'Security Guard' },
    { id: 'DIC007', name: 'Robert Miller', base_salary: 140000, role: 'Senior Guard' },
    { id: 'DIC008', name: 'Emma Wilson', base_salary: 170000, role: 'Supervisor' },
    { id: 'DIC009', name: 'James Taylor', base_salary: 220000, role: 'Team Leader' },
    { id: 'DIC010', name: 'Maria Garcia', base_salary: 280000, role: 'Manager' }
  ];

  const paymentMethods = ['direct_deposit', 'cash', 'check', 'mobile_money'];
  const statuses = ['pending', 'processed', 'paid', 'cancelled', 'rejected'];
  
  const rows = [];

  // Generate payroll data for each employee and period
  for (const period of periods) {
    for (const employee of employees) {
      // Vary hours worked (140-180 hours per month)
      const hoursWorked = 140 + Math.floor(Math.random() * 40);
      const hourlyRate = employee.base_salary / 160; // Based on 160 hours standard
      
      // Overtime varies by role and period
      const overtimeHours = Math.floor(Math.random() * 20);
      const overtimeRate = hourlyRate * 1.5;
      
      // Allowances and bonuses
      const transportAllowance = 15000;
      const housingAllowance = employee.base_salary * 0.1;
      const performanceBonus = Math.floor(Math.random() * 50000);
      const nightShiftAllowance = Math.floor(Math.random() * 20000);
      
      // Deductions
      const taxDeduction = employee.base_salary * 0.15;
      const insuranceDeduction = 10000;
      const loanDeduction = Math.floor(Math.random() * 30000);
      const otherDeductions = Math.floor(Math.random() * 15000);
      
      const totalAllowances = transportAllowance + housingAllowance + performanceBonus + nightShiftAllowance;
      const totalDeductions = taxDeduction + insuranceDeduction + loanDeduction + otherDeductions;
      
      const grossPay = employee.base_salary + (overtimeHours * overtimeRate) + totalAllowances;
      const netPay = grossPay - totalDeductions;
      
      // Status distribution: 40% paid, 30% pending, 20% processed, 5% cancelled, 5% rejected
      const statusRandom = Math.random();
      let status;
      if (statusRandom < 0.4) status = 'paid';
      else if (statusRandom < 0.7) status = 'pending';
      else if (statusRandom < 0.9) status = 'processed';
      else if (statusRandom < 0.95) status = 'cancelled';
      else status = 'rejected';
      
      // Payment method varies
      const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
      
      rows.push({
        employee_id: employee.id,
        period,
        base_salary: employee.base_salary,
        hours_worked: hoursWorked,
        hourly_rate: hourlyRate,
        overtime_hours: overtimeHours,
        overtime_rate: overtimeRate,
        transport_allowance: transportAllowance,
        housing_allowance: housingAllowance,
        performance_bonus: performanceBonus,
        night_shift_allowance: nightShiftAllowance,
        tax_deduction: taxDeduction,
        insurance_deduction: insuranceDeduction,
        loan_deduction: loanDeduction,
        other_deductions: otherDeductions,
        deductions: totalDeductions,
        bonuses: totalAllowances,
        gross_pay: grossPay,
        net_pay: netPay,
        status,
        payment_method: paymentMethod,
        notes: `${employee.role} - ${period} payroll. ${status === 'paid' ? 'Payment completed' : status === 'pending' ? 'Awaiting approval' : status === 'processed' ? 'Ready for payment' : status === 'cancelled' ? 'Cancelled by HR' : 'Rejected due to issues'}.`
      });
    }
  }

  // Insert rows in batches to avoid parameter limits
  const batchSize = 50;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    try {
      await knex('payroll').insert(batch);
      console.log(`Inserted batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(rows.length / batchSize)}`);
    } catch (err) {
      console.error('Error inserting batch:', err.message);
      // Try inserting one by one if batch fails
      for (const row of batch) {
        try {
          await knex('payroll').insert(row);
        } catch (singleErr) {
          console.error('Error inserting row:', row.employee_id, row.period, singleErr.message);
        }
      }
    }
  }
  
  console.log(`Payroll seed completed. Inserted ${rows.length} records across ${periods.length} periods for ${employees.length} employees.`);
}; 