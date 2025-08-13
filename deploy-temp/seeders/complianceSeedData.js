import Compliance from '../models/Compliance.js';

const complianceSeedData = [
  {
    id: '550e8400-e29b-41d4-a716-446655442001',
    title: 'Labor Law Compliance',
    category: 'Legal',
    status: 'Active',
    dueDate: '2024-12-31',
    priority: 'High',
    description: 'Ensure compliance with Rwanda labor laws and regulations',
    assignedTo: 'Marie Claire Niyonsaba',
    department: 'HR',
    completionRate: 85,
    lastUpdated: '2024-01-15',
    riskLevel: 'Medium',
    cost: 'RWF 500,000',
    impact: 'High',
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655442002',
    title: 'Health & Safety Standards',
    category: 'Safety',
    status: 'Active',
    dueDate: '2024-06-30',
    priority: 'High',
    description: 'Maintain workplace health and safety standards',
    assignedTo: 'Jean Pierre Uwimana',
    department: 'IT',
    completionRate: 92,
    lastUpdated: '2024-01-10',
    riskLevel: 'Low',
    cost: 'RWF 300,000',
    impact: 'Medium',
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655442003',
    title: 'Data Protection (GDPR)',
    category: 'Privacy',
    status: 'Pending',
    dueDate: '2024-03-31',
    priority: 'Critical',
    description: 'Ensure compliance with data protection regulations',
    assignedTo: 'Emmanuel Ndayisaba',
    department: 'IT',
    completionRate: 45,
    lastUpdated: '2024-01-05',
    riskLevel: 'High',
    cost: 'RWF 1,200,000',
    impact: 'Critical',
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655442004',
    title: 'Tax Compliance',
    category: 'Financial',
    status: 'Active',
    dueDate: '2024-04-15',
    priority: 'High',
    description: 'Ensure proper tax reporting and compliance',
    assignedTo: 'Ange Uwineza',
    department: 'Finance',
    completionRate: 78,
    lastUpdated: '2024-01-12',
    riskLevel: 'Medium',
    cost: 'RWF 800,000',
    impact: 'High',
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655442005',
    title: 'Environmental Regulations',
    category: 'Environmental',
    status: 'Active',
    dueDate: '2024-08-31',
    priority: 'Medium',
    description: 'Comply with environmental protection regulations',
    assignedTo: 'Patrick Nshimiyimana',
    department: 'Operations',
    completionRate: 65,
    lastUpdated: '2024-01-08',
    riskLevel: 'Low',
    cost: 'RWF 400,000',
    impact: 'Medium',
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655442006',
    title: 'ISO 27001 Certification',
    category: 'Security',
    status: 'In Progress',
    dueDate: '2024-09-30',
    priority: 'High',
    description: 'Achieve ISO 27001 information security certification',
    assignedTo: 'Jean Pierre Uwimana',
    department: 'IT',
    completionRate: 30,
    lastUpdated: '2024-01-20',
    riskLevel: 'High',
    cost: 'RWF 2,500,000',
    impact: 'High',
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655442007',
    title: 'Employee Benefits Compliance',
    category: 'Benefits',
    status: 'Active',
    dueDate: '2024-05-31',
    priority: 'Medium',
    description: 'Ensure employee benefits comply with regulations',
    assignedTo: 'Marie Claire Niyonsaba',
    department: 'HR',
    completionRate: 88,
    lastUpdated: '2024-01-18',
    riskLevel: 'Low',
    cost: 'RWF 150,000',
    impact: 'Medium',
    isActive: true
  },
  {
    id: '550e8400-e29b-41d4-a716-446655442008',
    title: 'Anti-Money Laundering (AML)',
    category: 'Financial',
    status: 'Active',
    dueDate: '2024-07-31',
    priority: 'Critical',
    description: 'Implement anti-money laundering procedures',
    assignedTo: 'Ange Uwineza',
    department: 'Finance',
    completionRate: 55,
    lastUpdated: '2024-01-14',
    riskLevel: 'High',
    cost: 'RWF 1,800,000',
    impact: 'Critical',
    isActive: true
  }
];

export const seedComplianceData = async () => {
  try {
    console.log('🌱 Seeding Compliance data...');
    
    for (const complianceItem of complianceSeedData) {
      await Compliance.findOrCreate({
        where: { id: complianceItem.id },
        defaults: complianceItem
      });
    }
    
    console.log(`✅ Compliance data seeded successfully!`);
    console.log(`📊 Created: ${complianceSeedData.length} Compliance items`);
  } catch (error) {
    console.error('❌ Error seeding compliance data:', error);
  }
}; 