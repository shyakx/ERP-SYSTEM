exports.seed = function(knex) {
  return knex('activity_log').del()
    .then(function () {
      const today = new Date();
      const activities = [];
      let id = 1;

      // Generate activity data for the last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        
        // Morning activities
        activities.push({
          id: id++,
          employee_id: 'DIC001',
          type: 'checkin',
          activity_type: 'checkin',
          description: 'Alice Uwimana checked in at 7:45 AM',
          timestamp: new Date(date.getTime() + 7 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString(),
          details: JSON.stringify({ location: 'Main Office', method: 'system' })
        });

        activities.push({
          id: id++,
          employee_id: 'DIC002',
          type: 'checkin',
          activity_type: 'checkin',
          description: 'Jeanine Mukeshimana checked in at 8:00 AM',
          timestamp: new Date(date.getTime() + 8 * 60 * 60 * 1000).toISOString(),
          details: JSON.stringify({ location: 'Main Office', method: 'system' })
        });

        activities.push({
          id: id++,
          employee_id: 'DIC003',
          type: 'checkin',
          activity_type: 'checkin',
          description: 'Eric Mugisha checked in at 8:05 AM',
          timestamp: new Date(date.getTime() + 8 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString(),
          details: JSON.stringify({ location: 'Main Office', method: 'system' })
        });

        // Afternoon activities
        activities.push({
          id: id++,
          employee_id: 'DIC004',
          type: 'shift_assignment',
          activity_type: 'shift_assignment',
          description: 'Eric Niyonshuti assigned to factory security shift',
          timestamp: new Date(date.getTime() + 14 * 60 * 60 * 1000).toISOString(),
          details: JSON.stringify({ shift_id: 3, location: 'Factory Site' })
        });

        activities.push({
          id: id++,
          employee_id: 'DIC005',
          type: 'shift_completion',
          activity_type: 'shift_completion',
          description: 'Chantal Mukamana completed mall security shift',
          timestamp: new Date(date.getTime() + 16 * 60 * 60 * 1000).toISOString(),
          details: JSON.stringify({ shift_id: 2, hours_worked: 8 })
        });

        // Evening activities
        activities.push({
          id: id++,
          employee_id: 'DIC006',
          type: 'checkout',
          activity_type: 'checkout',
          description: 'Jean Bosco Niyonzima checked out at 5:00 PM',
          timestamp: new Date(date.getTime() + 17 * 60 * 60 * 1000).toISOString(),
          details: JSON.stringify({ location: 'Main Office', hours_worked: 8 })
        });

        activities.push({
          id: id++,
          employee_id: 'DIC007',
          type: 'checkout',
          activity_type: 'checkout',
          description: 'Diane Uwase checked out at 5:15 PM',
          timestamp: new Date(date.getTime() + 17 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString(),
          details: JSON.stringify({ location: 'Main Office', hours_worked: 8.25 })
        });

        // HR activities (every other day)
        if (i % 2 === 0) {
          activities.push({
            id: id++,
            employee_id: 'DIC001',
            type: 'employee_registration',
            activity_type: 'employee_registration',
            description: 'New employee registered by HR Assistant',
            timestamp: new Date(date.getTime() + 9 * 60 * 60 * 1000).toISOString(),
            details: JSON.stringify({ new_employee_id: `DIC${(30 + i).toString().padStart(3, '0')}` })
          });
        }

        // Disciplinary activities (every 3 days)
        if (i % 3 === 0) {
          activities.push({
            id: id++,
            employee_id: 'DIC001',
            type: 'disciplinary_action',
            activity_type: 'disciplinary_action',
            description: 'Warning issued for late arrival',
            timestamp: new Date(date.getTime() + 10 * 60 * 60 * 1000).toISOString(),
            details: JSON.stringify({ case_type: 'Late Arrival', severity: 'warning' })
          });
        }

        // Payroll activities (weekly)
        if (i % 7 === 0) {
          activities.push({
            id: id++,
            employee_id: 'DIC007',
            type: 'payroll_processed',
            activity_type: 'payroll_processed',
            description: 'Monthly payroll processed for 30 employees',
            timestamp: new Date(date.getTime() + 15 * 60 * 60 * 1000).toISOString(),
            details: JSON.stringify({ total_amount: 45000, employee_count: 30 })
          });
        }
      }

      return knex('activity_log').insert(activities);
    });
}; 