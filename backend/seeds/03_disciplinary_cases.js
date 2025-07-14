exports.seed = function(knex) {
  return knex('disciplinary_cases').del()
    .then(function () {
      return knex('disciplinary_cases').insert([
        {id: 1, employee_id: 'DIC001', case_type: 'Late Arrival', description: 'Arrived late to work.', status: 'closed', created_at: '2025-06-15 09:00:00'},
        {id: 2, employee_id: 'DIC002', case_type: 'Uniform Violation', description: 'Did not wear uniform.', status: 'open', created_at: '2025-06-20 10:00:00'},
        {id: 3, employee_id: 'DIC003', case_type: 'Absenteeism', description: 'Absent without notice.', status: 'pending', created_at: '2025-06-22 08:30:00'},
        {id: 4, employee_id: 'DIC004', case_type: 'Misconduct', description: 'Unprofessional behavior.', status: 'open', created_at: '2025-06-25 11:00:00'},
        {id: 5, employee_id: 'DIC005', case_type: 'Late Arrival', description: 'Arrived late to work.', status: 'closed', created_at: '2025-06-28 09:15:00'}
      ]);
    });
}; 