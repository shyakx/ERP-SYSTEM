exports.seed = function(knex) {
  return knex('announcements').del()
    .then(function () {
      const today = new Date();
      return knex('announcements').insert([
        {
          id: 1,
          title: 'Company Meeting on Friday',
          content: 'All employees are required to attend the monthly company meeting on Friday at 10:00 AM in the main conference room.',
          type: 'general',
          priority: 'high',
          created_by: 'DIC001',
          created_at: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          expires_at: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        },
        {
          id: 2,
          title: 'Submit Timesheets by End of Week',
          content: 'Please ensure all timesheets are submitted by Friday 5:00 PM for payroll processing.',
          type: 'hr',
          priority: 'medium',
          created_by: 'DIC001',
          created_at: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          expires_at: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        },
        {
          id: 3,
          title: 'New Security Protocols',
          content: 'Updated security protocols will be implemented starting next week. All guards must review the new procedures.',
          type: 'operations',
          priority: 'high',
          created_by: 'DIC004',
          created_at: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          expires_at: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        },
        {
          id: 4,
          title: 'Quarterly Performance Review',
          content: 'Quarterly performance reviews will begin next month. Managers should prepare evaluation forms.',
          type: 'hr',
          priority: 'medium',
          created_by: 'DIC001',
          created_at: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          expires_at: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        },
        {
          id: 5,
          title: 'Equipment Maintenance Schedule',
          content: 'Scheduled maintenance for security equipment will be conducted this weekend. Some systems may be temporarily unavailable.',
          type: 'operations',
          priority: 'low',
          created_by: 'DIC010',
          created_at: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          expires_at: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        }
      ]);
    });
}; 