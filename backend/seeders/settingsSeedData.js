import Setting from '../models/Setting.js';

const settingsSeedData = [
  {
    id: '550e8400-e29b-41d4-a716-446655444001',
    category: 'General',
    name: 'Company Name',
    value: 'DICEL ERP',
    type: 'text',
    description: 'Display name for the organization',
    isEnabled: true,
    lastUpdated: '2024-01-15',
    updatedBy: 'System Administrator',
    options: null,
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444002',
    category: 'General',
    name: 'Default Timezone',
    value: 'Africa/Kigali',
    type: 'select',
    description: 'Default timezone for the system',
    isEnabled: true,
    lastUpdated: '2024-01-15',
    updatedBy: 'System Administrator',
    options: ['Africa/Kigali', 'UTC', 'America/New_York', 'Europe/London'],
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444003',
    category: 'Security',
    name: 'Password Policy',
    value: 'Strong',
    type: 'select',
    description: 'Password strength requirements',
    isEnabled: true,
    lastUpdated: '2024-01-10',
    updatedBy: 'Marie Claire Niyonsaba',
    options: ['Weak', 'Medium', 'Strong', 'Very Strong'],
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444004',
    category: 'Security',
    name: 'Session Timeout',
    value: '30 minutes',
    type: 'select',
    description: 'Automatic logout after inactivity',
    isEnabled: true,
    lastUpdated: '2024-01-10',
    updatedBy: 'Marie Claire Niyonsaba',
    options: ['15 minutes', '30 minutes', '1 hour', '2 hours', 'Never'],
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444005',
    category: 'Notifications',
    name: 'Email Notifications',
    value: 'Enabled',
    type: 'toggle',
    description: 'Send email notifications for important events',
    isEnabled: true,
    lastUpdated: '2024-01-12',
    updatedBy: 'Jean Pierre Uwimana',
    options: null,
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444006',
    category: 'Notifications',
    name: 'SMS Notifications',
    value: 'Disabled',
    type: 'toggle',
    description: 'Send SMS notifications for urgent matters',
    isEnabled: false,
    lastUpdated: '2024-01-12',
    updatedBy: 'Jean Pierre Uwimana',
    options: null,
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444007',
    category: 'Payroll',
    name: 'Auto Payroll Processing',
    value: 'Enabled',
    type: 'toggle',
    description: 'Automatically process payroll on schedule',
    isEnabled: true,
    lastUpdated: '2024-01-08',
    updatedBy: 'Ange Uwineza',
    options: null,
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444008',
    category: 'Payroll',
    name: 'Tax Calculation Method',
    value: 'Progressive',
    type: 'select',
    description: 'Method for calculating employee taxes',
    isEnabled: true,
    lastUpdated: '2024-01-08',
    updatedBy: 'Ange Uwineza',
    options: ['Flat Rate', 'Progressive', 'Marginal'],
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444009',
    category: 'HR',
    name: 'Leave Approval Required',
    value: 'Enabled',
    type: 'toggle',
    description: 'Require manager approval for leave requests',
    isEnabled: true,
    lastUpdated: '2024-01-14',
    updatedBy: 'Marie Claire Niyonsaba',
    options: null,
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444010',
    category: 'HR',
    name: 'Performance Review Frequency',
    value: 'Quarterly',
    type: 'select',
    description: 'How often performance reviews are conducted',
    isEnabled: true,
    lastUpdated: '2024-01-14',
    updatedBy: 'Marie Claire Niyonsaba',
    options: ['Monthly', 'Quarterly', 'Semi-annually', 'Annually'],
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444011',
    category: 'Attendance',
    name: 'Auto Clock Out',
    value: 'Enabled',
    type: 'toggle',
    description: 'Automatically clock out employees at end of day',
    isEnabled: true,
    lastUpdated: '2024-01-16',
    updatedBy: 'Jean Pierre Uwimana',
    options: null,
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444012',
    category: 'Attendance',
    name: 'Grace Period',
    value: '15 minutes',
    type: 'select',
    description: 'Grace period for late arrivals',
    isEnabled: true,
    lastUpdated: '2024-01-16',
    updatedBy: 'Jean Pierre Uwimana',
    options: ['5 minutes', '10 minutes', '15 minutes', '30 minutes'],
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444013',
    category: 'Training',
    name: 'Auto Training Reminders',
    value: 'Enabled',
    type: 'toggle',
    description: 'Send automatic reminders for training sessions',
    isEnabled: true,
    lastUpdated: '2024-01-18',
    updatedBy: 'Marie Claire Niyonsaba',
    options: null,
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444014',
    category: 'Training',
    name: 'Training Completion Deadline',
    value: '30 days',
    type: 'select',
    description: 'Deadline for completing assigned training',
    isEnabled: true,
    lastUpdated: '2024-01-18',
    updatedBy: 'Marie Claire Niyonsaba',
    options: ['7 days', '14 days', '30 days', '60 days', '90 days'],
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444015',
    category: 'Reports',
    name: 'Auto Report Generation',
    value: 'Enabled',
    type: 'toggle',
    description: 'Automatically generate monthly reports',
    isEnabled: true,
    lastUpdated: '2024-01-20',
    updatedBy: 'Marie Claire Niyonsaba',
    options: null,
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655444016',
    category: 'Reports',
    name: 'Report Retention Period',
    value: '2 years',
    type: 'select',
    description: 'How long to keep generated reports',
    isEnabled: true,
    lastUpdated: '2024-01-20',
    updatedBy: 'Marie Claire Niyonsaba',
    options: ['1 year', '2 years', '3 years', '5 years', 'Indefinitely'],
    isActive: true
  }
];

export const seedSettingsData = async () => {
  try {
    console.log('🌱 Seeding Settings data...');
    
    for (const setting of settingsSeedData) {
      await Setting.findOrCreate({
        where: { id: setting.id },
        defaults: setting
      });
    }
    
    console.log(`✅ Settings data seeded successfully!`);
    console.log(`📊 Created: ${settingsSeedData.length} Settings`);
  } catch (error) {
    console.error('❌ Error seeding settings data:', error);
  }
}; 