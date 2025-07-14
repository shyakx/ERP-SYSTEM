exports.seed = function(knex) {
  return knex('payroll').del()
    .then(function () {
      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const period = `${year}-${month}`;
      return knex('payroll').insert([
        {id: 1, employee_id: 'DIC001', period, base_salary: 800, hours_worked: 160, hourly_rate: 5, overtime_hours: 8, overtime_rate: 7.5, deductions: 50, bonuses: 100, gross_pay: 900, net_pay: 850, status: 'paid', payment_method: 'direct_deposit', notes: 'July payroll'},
        {id: 2, employee_id: 'DIC002', period, base_salary: 900, hours_worked: 160, hourly_rate: 5.5, overtime_hours: 10, overtime_rate: 8, deductions: 60, bonuses: 120, gross_pay: 1020, net_pay: 960, status: 'paid', payment_method: 'direct_deposit', notes: 'July payroll'},
        {id: 3, employee_id: 'DIC003', period, base_salary: 850, hours_worked: 160, hourly_rate: 5.2, overtime_hours: 6, overtime_rate: 7, deductions: 55, bonuses: 110, gross_pay: 950, net_pay: 895, status: 'paid', payment_method: 'direct_deposit', notes: 'July payroll'},
        {id: 4, employee_id: 'DIC004', period, base_salary: 950, hours_worked: 160, hourly_rate: 6, overtime_hours: 12, overtime_rate: 9, deductions: 70, bonuses: 130, gross_pay: 1150, net_pay: 1080, status: 'paid', payment_method: 'direct_deposit', notes: 'July payroll'},
        {id: 5, employee_id: 'DIC005', period, base_salary: 1000, hours_worked: 160, hourly_rate: 6.5, overtime_hours: 15, overtime_rate: 10, deductions: 80, bonuses: 150, gross_pay: 1300, net_pay: 1220, status: 'paid', payment_method: 'direct_deposit', notes: 'July payroll'}
      ]);
    });
}; 