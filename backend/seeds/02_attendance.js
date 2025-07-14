exports.seed = function(knex) {
  return knex('attendance').del()
    .then(function () {
      const today = new Date();
      const attendanceData = [];
      let id = 1;

      // Generate attendance data for the last 30 days
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        
        // Generate attendance for 20 employees each day
        for (let emp = 1; emp <= 20; emp++) {
          const employeeId = `DIC${emp.toString().padStart(3, '0')}`;
          const status = Math.random() > 0.1 ? 'present' : (Math.random() > 0.5 ? 'absent' : 'late');
          const checkIn = status === 'present' ? 
            `${dateStr} ${(8 + Math.floor(Math.random() * 2))}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:00` : 
            null;
          const checkOut = status === 'present' ? 
            `${dateStr} ${(17 + Math.floor(Math.random() * 2))}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:00` : 
            null;
          
          attendanceData.push({
            id: id++,
            employee_id: employeeId,
            date: dateStr,
            status: status,
            check_in: checkIn,
            check_out: checkOut,
            total_hours: status === 'present' ? 8 + Math.floor(Math.random() * 2) : 0,
            location: 'Main Office',
            notes: status === 'present' ? 'Regular attendance' : (status === 'late' ? 'Arrived late' : 'No show')
          });
        }
      }

      // Batch insert in chunks of 100
      const batchSize = 100;
      const batches = [];
      for (let i = 0; i < attendanceData.length; i += batchSize) {
        batches.push(attendanceData.slice(i, i + batchSize));
      }
      // Chain the batch inserts
      return batches.reduce((promise, batch) => {
        return promise.then(() => knex('attendance').insert(batch));
      }, Promise.resolve());
    });
}; 