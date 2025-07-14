exports.seed = function(knex) {
  return knex('documents').del()
    .then(function () {
      return knex('documents').insert([
        {id: 1, employee_id: 'DIC001', type: 'ID Card', file_url: 'https://dicel.rw/docs/id_dic001.pdf', expiry_date: '2027-01-01', status: 'approved', created_at: '2025-01-01 09:00:00'},
        {id: 2, employee_id: 'DIC002', type: 'Contract', file_url: 'https://dicel.rw/docs/contract_dic002.pdf', expiry_date: '2026-12-31', status: 'pending', created_at: '2025-01-02 09:00:00'},
        {id: 3, employee_id: 'DIC003', type: 'ID Card', file_url: 'https://dicel.rw/docs/id_dic003.pdf', expiry_date: '2027-01-01', status: 'approved', created_at: '2025-01-03 09:00:00'},
        {id: 4, employee_id: 'DIC004', type: 'Contract', file_url: 'https://dicel.rw/docs/contract_dic004.pdf', expiry_date: '2026-12-31', status: 'approved', created_at: '2025-01-04 09:00:00'},
        {id: 5, employee_id: 'DIC005', type: 'ID Card', file_url: 'https://dicel.rw/docs/id_dic005.pdf', expiry_date: '2027-01-01', status: 'pending', created_at: '2025-01-05 09:00:00'}
      ]);
    });
}; 