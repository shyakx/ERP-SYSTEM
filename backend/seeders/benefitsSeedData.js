import { Benefit } from '../models/associations.js';

export const seedBenefitsData = async () => {
  try {
    const benefits = [
      {
        name: 'Health Insurance',
        type: 'Medical',
        description: 'Comprehensive health coverage for employees and dependents',
        coverage: 'Family',
        cost: 'RWF 50,000/month',
        status: 'Active',
        enrollmentDate: '2024-01-15',
        provider: 'Rwanda Health Insurance',
        category: 'Insurance',
        employeeCount: 120,
        totalCost: 'RWF 6,000,000',
        coveragePercentage: 95,
        monthlyCost: 50000,
        enrollmentRate: 95.0
      },
      {
        name: 'Life Insurance',
        type: 'Insurance',
        description: 'Life insurance coverage for all employees',
        coverage: 'Individual',
        cost: 'RWF 15,000/month',
        status: 'Active',
        enrollmentDate: '2024-01-15',
        provider: 'Rwanda Life Insurance',
        category: 'Insurance',
        employeeCount: 127,
        totalCost: 'RWF 1,905,000',
        coveragePercentage: 100,
        monthlyCost: 15000,
        enrollmentRate: 100.0
      },
      {
        name: 'Retirement Plan',
        type: 'Pension',
        description: 'Company-sponsored retirement savings plan',
        coverage: 'Individual',
        cost: 'RWF 25,000/month',
        status: 'Active',
        enrollmentDate: '2024-01-15',
        provider: 'Rwanda Pension Fund',
        category: 'Retirement',
        employeeCount: 108,
        totalCost: 'RWF 2,700,000',
        coveragePercentage: 85,
        monthlyCost: 25000,
        enrollmentRate: 85.0
      },
      {
        name: 'Transportation Allowance',
        type: 'Allowance',
        description: 'Monthly transportation allowance for employees',
        coverage: 'Individual',
        cost: 'RWF 30,000/month',
        status: 'Active',
        enrollmentDate: '2024-01-15',
        provider: 'Internal',
        category: 'Allowance',
        employeeCount: 127,
        totalCost: 'RWF 3,810,000',
        coveragePercentage: 100,
        monthlyCost: 30000,
        enrollmentRate: 100.0
      },
      {
        name: 'Meal Allowance',
        type: 'Allowance',
        description: 'Daily meal allowance for employees',
        coverage: 'Individual',
        cost: 'RWF 2,000/day',
        status: 'Active',
        enrollmentDate: '2024-01-15',
        provider: 'Internal',
        category: 'Allowance',
        employeeCount: 127,
        totalCost: 'RWF 254,000',
        coveragePercentage: 100,
        monthlyCost: 60000,
        enrollmentRate: 100.0
      }
    ];

    for (const benefit of benefits) {
      await Benefit.findOrCreate({
        where: { name: benefit.name },
        defaults: benefit
      });
    }

    console.log('✅ Benefits data seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding benefits data:', error);
  }
}; 