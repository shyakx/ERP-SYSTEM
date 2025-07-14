exports.seed = function(knex) {
  return knex('contracts').del()
    .then(function () {
      return knex('contracts').insert([
        {id: 1, employee_id: 'DIC001', start_date: '2025-01-01', end_date: '2026-01-01', status: 'active', file_url: 'https://dicel.rw/contracts/contract_dic001.pdf', created_at: '2025-01-01 09:00:00'},
        {id: 2, employee_id: 'DIC002', start_date: '2025-02-01', end_date: '2026-02-01', status: 'pending', file_url: 'https://dicel.rw/contracts/contract_dic002.pdf', created_at: '2025-02-01 09:00:00'},
        {id: 3, employee_id: 'DIC003', start_date: '2025-03-01', end_date: '2026-03-01', status: 'active', file_url: 'https://dicel.rw/contracts/contract_dic003.pdf', created_at: '2025-03-01 09:00:00'},
        {id: 4, employee_id: 'DIC004', start_date: '2025-04-01', end_date: '2026-04-01', status: 'terminated', file_url: 'https://dicel.rw/contracts/contract_dic004.pdf', created_at: '2025-04-01 09:00:00'},
        {id: 5, employee_id: 'DIC005', start_date: '2025-05-01', end_date: '2026-05-01', status: 'active', file_url: 'https://dicel.rw/contracts/contract_dic005.pdf', created_at: '2025-05-01 09:00:00'}
      ]);
    });
}; 