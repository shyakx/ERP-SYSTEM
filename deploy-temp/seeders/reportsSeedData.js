import Report from '../models/Report.js';

const reportsSeedData = [
  {
    id: '550e8400-e29b-41d4-a716-446655443001',
    title: 'Employee Performance Report',
    type: 'Performance',
    status: 'Generated',
    generatedDate: '2024-02-08',
    period: 'January 2024',
    department: 'HR',
    generatedBy: 'Marie Claire Niyonsaba',
    fileSize: '2.5 MB',
    downloadCount: 15,
    description: 'Comprehensive performance analysis for all employees',
    priority: 'High',
    format: 'PDF',
    filePath: '/reports/performance/january-2024.pdf',
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655443002',
    title: 'Payroll Summary Report',
    type: 'Payroll',
    status: 'Generated',
    generatedDate: '2024-02-01',
    period: 'January 2024',
    department: 'Finance',
    generatedBy: 'Ange Uwineza',
    fileSize: '1.8 MB',
    downloadCount: 8,
    description: 'Monthly payroll summary and analysis',
    priority: 'High',
    format: 'Excel',
    filePath: '/reports/payroll/january-2024.xlsx',
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655443003',
    title: 'Attendance Analysis Report',
    type: 'Attendance',
    status: 'Pending',
    generatedDate: '2024-02-08',
    period: 'January 2024',
    department: 'HR',
    generatedBy: 'Jean Pierre Uwimana',
    fileSize: '3.2 MB',
    downloadCount: 12,
    description: 'Detailed attendance patterns and trends',
    priority: 'Medium',
    format: 'PDF',
    filePath: '/reports/attendance/january-2024.pdf',
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655443004',
    title: 'Training Completion Report',
    type: 'Training',
    status: 'Generated',
    generatedDate: '2024-02-05',
    period: 'Q4 2023',
    department: 'HR',
    generatedBy: 'Marie Claire Niyonsaba',
    fileSize: '1.5 MB',
    downloadCount: 6,
    description: 'Training program completion rates and outcomes',
    priority: 'Medium',
    format: 'PDF',
    filePath: '/reports/training/q4-2023.pdf',
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655443005',
    title: 'Benefits Enrollment Report',
    type: 'Benefits',
    status: 'Generated',
    generatedDate: '2024-02-03',
    period: 'January 2024',
    department: 'HR',
    generatedBy: 'Marie Claire Niyonsaba',
    fileSize: '2.1 MB',
    downloadCount: 10,
    description: 'Employee benefits enrollment and coverage analysis',
    priority: 'High',
    format: 'Excel',
    filePath: '/reports/benefits/january-2024.xlsx',
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655443006',
    title: 'Compliance Status Report',
    type: 'Compliance',
    status: 'Generated',
    generatedDate: '2024-02-10',
    period: 'Q1 2024',
    department: 'Legal',
    generatedBy: 'Emmanuel Ndayisaba',
    fileSize: '4.2 MB',
    downloadCount: 3,
    description: 'Comprehensive compliance status and risk assessment',
    priority: 'Critical',
    format: 'PDF',
    filePath: '/reports/compliance/q1-2024.pdf',
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655443007',
    title: 'Employee Turnover Report',
    type: 'Performance',
    status: 'In Progress',
    generatedDate: '2024-02-12',
    period: 'Q4 2023',
    department: 'HR',
    generatedBy: 'Marie Claire Niyonsaba',
    fileSize: '1.9 MB',
    downloadCount: 7,
    description: 'Employee retention and turnover analysis',
    priority: 'Medium',
    format: 'PDF',
    filePath: '/reports/turnover/q4-2023.pdf',
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655443008',
    title: 'Budget vs Actual Report',
    type: 'Payroll',
    status: 'Generated',
    generatedDate: '2024-02-15',
    period: 'January 2024',
    department: 'Finance',
    generatedBy: 'Ange Uwineza',
    fileSize: '3.8 MB',
    downloadCount: 5,
    description: 'Budget comparison with actual payroll expenses',
    priority: 'High',
    format: 'Excel',
    filePath: '/reports/budget/january-2024.xlsx',
    isActive: true
  }
];

export const seedReportsData = async () => {
  try {
    console.log('🌱 Seeding Reports data...');
    
    for (const report of reportsSeedData) {
      await Report.findOrCreate({
        where: { id: report.id },
        defaults: report
      });
    }
    
    console.log(`✅ Reports data seeded successfully!`);
    console.log(`📊 Created: ${reportsSeedData.length} Reports`);
  } catch (error) {
    console.error('❌ Error seeding reports data:', error);
  }
}; 