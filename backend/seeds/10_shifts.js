exports.seed = function(knex) {
  return knex('shifts').del()
    .then(function () {
      const today = new Date();
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      const dayAfterTomorrow = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
      
      return knex('shifts').insert([
        {
          id: 1,
          employee_id: 'DIC006',
          date: today.toISOString().split('T')[0],
          start_time: '08:00:00',
          end_time: '16:00:00',
          location: 'Main Office',
          client_name: 'ABC Corporation',
          status: 'completed',
          notes: 'Regular security shift',
          total_hours: 8,
          created_at: new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          employee_id: 'DIC005',
          date: today.toISOString().split('T')[0],
          start_time: '16:00:00',
          end_time: '00:00:00',
          location: 'Mall Security',
          client_name: 'Mall Security LLC',
          status: 'in_progress',
          notes: 'Night shift at mall',
          total_hours: 8,
          created_at: new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 3,
          employee_id: 'DIC004',
          date: tomorrow.toISOString().split('T')[0],
          start_time: '08:00:00',
          end_time: '16:00:00',
          location: 'Factory Site',
          client_name: 'Industrial Security Inc',
          status: 'scheduled',
          notes: 'Factory security shift',
          total_hours: 8,
          created_at: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 4,
          employee_id: 'DIC006',
          date: tomorrow.toISOString().split('T')[0],
          start_time: '16:00:00',
          end_time: '00:00:00',
          location: 'Tech Campus',
          client_name: 'Tech Corp',
          status: 'scheduled',
          notes: 'Night shift at tech campus',
          total_hours: 8,
          created_at: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 5,
          employee_id: 'DIC005',
          date: dayAfterTomorrow.toISOString().split('T')[0],
          start_time: '08:00:00',
          end_time: '16:00:00',
          location: 'Event Center',
          client_name: 'Event Security Services',
          status: 'scheduled',
          notes: 'Event security coverage',
          total_hours: 8,
          created_at: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 6,
          employee_id: 'DIC004',
          date: dayAfterTomorrow.toISOString().split('T')[0],
          start_time: '16:00:00',
          end_time: '00:00:00',
          location: 'Residential Complex',
          client_name: 'Residential Security',
          status: 'scheduled',
          notes: 'Residential security shift',
          total_hours: 8,
          created_at: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]);
    });
}; 