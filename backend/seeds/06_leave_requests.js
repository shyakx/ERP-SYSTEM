exports.seed = function(knex) {
  return knex('leave_requests').del()
    .then(function () {
      return knex('leave_requests').insert([
        {id: 1, employee_id: 'DIC001', type: 'Annual', start_date: '2025-08-01', end_date: '2025-08-10', status: 'approved', created_at: '2025-07-01 09:00:00'},
        {id: 2, employee_id: 'DIC002', type: 'Sick', start_date: '2025-09-05', end_date: '2025-09-07', status: 'pending', created_at: '2025-09-01 09:00:00'},
        {id: 3, employee_id: 'DIC003', type: 'Maternity', start_date: '2025-10-01', end_date: '2025-12-31', status: 'approved', created_at: '2025-09-15 09:00:00'},
        {id: 4, employee_id: 'DIC004', type: 'Annual', start_date: '2025-11-01', end_date: '2025-11-10', status: 'rejected', created_at: '2025-10-01 09:00:00'},
        {id: 5, employee_id: 'DIC005', type: 'Sick', start_date: '2025-12-01', end_date: '2025-12-03', status: 'approved', created_at: '2025-11-20 09:00:00'}
      ]);
    });
}; 