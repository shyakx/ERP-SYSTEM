import { 
  User, 
  Employee, 
  JobPosting, 
  Candidate, 
  TrainingCourse, 
  TrainingEnrollment,
  LeaveType,
  LeaveRequest,
  AttendanceRecord,
  PerformanceReview,
  PayrollRecord
} from '../models/associations.js';
import { seedBenefitsData } from './benefitsSeedData.js';
import { seedComplianceData } from './complianceSeedData.js';
import { seedReportsData } from './reportsSeedData.js';
import { seedSettingsData } from './settingsSeedData.js';
import { seedFinanceData } from './financeSeedData.js';

export const seedHRData = async () => {
  try {
    console.log('🌱 Seeding HR data...');

    // Create Users first
    const users = await User.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        username: 'jean.uwimana',
        email: 'jean.uwimana@dicel.co.rw',
        password: '$2b$10$rQZ9K8mN2pL1vX3yU7wA5eR6tY9uI0oP1qS2aB3cD4eF5gH6iJ7kL8mN9oP0',
        role: 'employee',
        firstName: 'Jean Pierre',
        lastName: 'Uwimana',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        username: 'marie.niyonsaba',
        email: 'marie.niyonsaba@dicel.co.rw',
        password: '$2b$10$rQZ9K8mN2pL1vX3yU7wA5eR6tY9uI0oP1qS2aB3cD4eF5gH6iJ7kL8mN9oP0',
        role: 'hr',
        firstName: 'Marie Claire',
        lastName: 'Niyonsaba',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        username: 'emmanuel.ndayisaba',
        email: 'emmanuel.ndayisaba@dicel.co.rw',
        password: '$2b$10$rQZ9K8mN2pL1vX3yU7wA5eR6tY9uI0oP1qS2aB3cD4eF5gH6iJ7kL8mN9oP0',
        role: 'employee',
        firstName: 'Emmanuel',
        lastName: 'Ndayisaba',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        username: 'ange.uwineza',
        email: 'ange.uwineza@dicel.co.rw',
        password: '$2b$10$rQZ9K8mN2pL1vX3yU7wA5eR6tY9uI0oP1qS2aB3cD4eF5gH6iJ7kL8mN9oP0',
        role: 'finance',
        firstName: 'Ange',
        lastName: 'Uwineza',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        username: 'patrick.nshimiyimana',
        email: 'patrick.nshimiyimana@dicel.co.rw',
        password: '$2b$10$rQZ9K8mN2pL1vX3yU7wA5eR6tY9uI0oP1qS2aB3cD4eF5gH6iJ7kL8mN9oP0',
        role: 'employee',
        firstName: 'Patrick',
        lastName: 'Nshimiyimana',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440006',
        username: 'admin',
        email: 'admin@dicel.co.rw',
        password: '$2b$10$rQZ9K8mN2pL1vX3yU7wA5eR6tY9uI0oP1qS2aB3cD4eF5gH6iJ7kL8mN9oP0',
        role: 'admin',
        firstName: 'System',
        lastName: 'Administrator',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440007',
        username: 'inventory.manager',
        email: 'inventory@dicel.co.rw',
        password: '$2b$10$rQZ9K8mN2pL1vX3yU7wA5eR6tY9uI0oP1qS2aB3cD4eF5gH6iJ7kL8mN9oP0',
        role: 'inventory',
        firstName: 'Inventory',
        lastName: 'Manager',
        isActive: true
      }
    ]);

    // Create Employees
    const employees = await Employee.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440101',
        employeeId: 'EMP001',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        position: 'Software Developer',
        department: 'IT',
        location: 'Kigali',
        phone: '+250788123456',
        email: 'jean.uwimana@dicel.co.rw',
        status: 'Active',
        hireDate: '2023-01-15',
        salary: 2500000,
        performance: 'Excellent',
        supervisor: 'Marie Claire Niyonsaba',
        emergencyContact: {
          name: 'Alice Uwimana',
          phone: '+250788123457',
          relationship: 'Spouse'
        },
        address: 'Kigali, Rwanda',
        dateOfBirth: '1990-05-15',
        gender: 'Male',
        nationality: 'Rwandan',
        idNumber: '1234567890123456',
        bankAccount: {
          bank: 'Bank of Kigali',
          accountNumber: '1234567890',
          accountName: 'Jean Pierre Uwimana'
        },
        skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL'],
        certifications: ['AWS Certified Developer', 'Microsoft Azure'],
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440102',
        employeeId: 'EMP002',
        userId: '550e8400-e29b-41d4-a716-446655440002',
        position: 'HR Manager',
        department: 'HR',
        location: 'Kigali',
        phone: '+250788123458',
        email: 'marie.niyonsaba@dicel.co.rw',
        status: 'Active',
        hireDate: '2022-03-10',
        salary: 3000000,
        performance: 'Outstanding',
        supervisor: 'System Administrator',
        emergencyContact: {
          name: 'John Niyonsaba',
          phone: '+250788123459',
          relationship: 'Spouse'
        },
        address: 'Kigali, Rwanda',
        dateOfBirth: '1988-08-20',
        gender: 'Female',
        nationality: 'Rwandan',
        idNumber: '1234567890123457',
        bankAccount: {
          bank: 'Bank of Kigali',
          accountNumber: '1234567891',
          accountName: 'Marie Claire Niyonsaba'
        },
        skills: ['HR Management', 'Recruitment', 'Employee Relations', 'Training'],
        certifications: ['PHR Certification', 'SHRM-CP'],
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440103',
        employeeId: 'EMP003',
        userId: '550e8400-e29b-41d4-a716-446655440003',
        position: 'Marketing Specialist',
        department: 'Marketing',
        location: 'Kigali',
        phone: '+250788123460',
        email: 'emmanuel.ndayisaba@dicel.co.rw',
        status: 'Active',
        hireDate: '2023-06-20',
        salary: 2000000,
        performance: 'Good',
        supervisor: 'Marie Claire Niyonsaba',
        emergencyContact: {
          name: 'Grace Ndayisaba',
          phone: '+250788123461',
          relationship: 'Spouse'
        },
        address: 'Kigali, Rwanda',
        dateOfBirth: '1992-12-10',
        gender: 'Male',
        nationality: 'Rwandan',
        idNumber: '1234567890123458',
        bankAccount: {
          bank: 'Bank of Kigali',
          accountNumber: '1234567892',
          accountName: 'Emmanuel Ndayisaba'
        },
        skills: ['Digital Marketing', 'Social Media', 'Content Creation', 'SEO'],
        certifications: ['Google Ads Certification', 'Facebook Blueprint'],
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440104',
        employeeId: 'EMP004',
        userId: '550e8400-e29b-41d4-a716-446655440004',
        position: 'Finance Manager',
        department: 'Finance',
        location: 'Kigali',
        phone: '+250788123462',
        email: 'ange.uwineza@dicel.co.rw',
        status: 'Active',
        hireDate: '2022-09-15',
        salary: 2800000,
        performance: 'Excellent',
        supervisor: 'System Administrator',
        emergencyContact: {
          name: 'Paul Uwineza',
          phone: '+250788123463',
          relationship: 'Spouse'
        },
        address: 'Kigali, Rwanda',
        dateOfBirth: '1985-03-25',
        gender: 'Female',
        nationality: 'Rwandan',
        idNumber: '1234567890123459',
        bankAccount: {
          bank: 'Bank of Kigali',
          accountNumber: '1234567893',
          accountName: 'Ange Uwineza'
        },
        skills: ['Financial Analysis', 'Budgeting', 'Accounting', 'QuickBooks'],
        certifications: ['CPA', 'CFA Level 1'],
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440105',
        employeeId: 'EMP005',
        userId: '550e8400-e29b-41d4-a716-446655440005',
        position: 'Sales Representative',
        department: 'Sales',
        location: 'Kigali',
        phone: '+250788123464',
        email: 'patrick.nshimiyimana@dicel.co.rw',
        status: 'Active',
        hireDate: '2023-04-10',
        salary: 1800000,
        performance: 'Good',
        supervisor: 'Marie Claire Niyonsaba',
        emergencyContact: {
          name: 'Sarah Nshimiyimana',
          phone: '+250788123465',
          relationship: 'Spouse'
        },
        address: 'Kigali, Rwanda',
        dateOfBirth: '1991-07-18',
        gender: 'Male',
        nationality: 'Rwandan',
        idNumber: '1234567890123460',
        bankAccount: {
          bank: 'Bank of Kigali',
          accountNumber: '1234567894',
          accountName: 'Patrick Nshimiyimana'
        },
        skills: ['Sales', 'Customer Relations', 'CRM', 'Negotiation'],
        certifications: ['Salesforce Certification'],
        isActive: true
      }
    ]);

    // Create Job Postings
    const jobPostings = await JobPosting.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440201',
        title: 'Senior Software Developer',
        department: 'IT',
        location: 'Kigali',
        type: 'Full-time',
        salary: 'RWF 3,500,000 - 4,500,000',
        status: 'Active',
        applications: 15,
        postedDate: '2024-01-15',
        deadline: '2024-02-15',
        requirements: [
          '5+ years experience in software development',
          'Strong knowledge of JavaScript, React, Node.js',
          'Experience with PostgreSQL and MongoDB',
          'Excellent problem-solving skills'
        ],
        description: 'We are looking for a Senior Software Developer to join our dynamic team and help build innovative solutions.',
        responsibilities: [
          'Develop and maintain web applications',
          'Collaborate with cross-functional teams',
          'Mentor junior developers',
          'Participate in code reviews'
        ],
        benefits: [
          'Competitive salary',
          'Health insurance',
          'Professional development opportunities',
          'Flexible working hours'
        ],
        experience: '5+ years',
        education: 'Bachelor\'s degree in Computer Science or related field',
        skills: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'MongoDB'],
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440202',
        title: 'Marketing Manager',
        department: 'Marketing',
        location: 'Kigali',
        type: 'Full-time',
        salary: 'RWF 2,800,000 - 3,500,000',
        status: 'Active',
        applications: 8,
        postedDate: '2024-01-20',
        deadline: '2024-02-20',
        requirements: [
          '3+ years experience in marketing',
          'Strong digital marketing skills',
          'Experience with social media campaigns',
          'Excellent communication skills'
        ],
        description: 'Join our marketing team to develop and execute innovative marketing strategies.',
        responsibilities: [
          'Develop marketing strategies',
          'Manage social media campaigns',
          'Analyze market trends',
          'Coordinate with sales team'
        ],
        benefits: [
          'Competitive salary',
          'Health insurance',
          'Performance bonuses',
          'Professional development'
        ],
        experience: '3+ years',
        education: 'Bachelor\'s degree in Marketing or related field',
        skills: ['Digital Marketing', 'Social Media', 'SEO', 'Content Marketing'],
        isActive: true
      }
    ]);

    // Create Candidates
    const candidates = await Candidate.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440301',
        name: 'Alice Mukamana',
        position: 'Senior Software Developer',
        department: 'IT',
        location: 'Kigali',
        phone: '+250788123466',
        email: 'alice.mukamana@email.com',
        status: 'Shortlisted',
        jobPostingId: '550e8400-e29b-41d4-a716-446655440201',
        resume: 'alice_mukamana_resume.pdf',
        coverLetter: 'Experienced developer with 6 years in web development...',
        experience: 6,
        education: 'Bachelor\'s in Computer Science',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Django'],
        interviewDate: '2024-02-10T10:00:00Z',
        interviewNotes: 'Strong technical skills, good communication',
        salary: 'RWF 4,000,000',
        appliedDate: '2024-01-25',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440302',
        name: 'John Bizimana',
        position: 'Marketing Manager',
        department: 'Marketing',
        location: 'Kigali',
        phone: '+250788123467',
        email: 'john.bizimana@email.com',
        status: 'Applied',
        jobPostingId: '550e8400-e29b-41d4-a716-446655440202',
        resume: 'john_bizimana_resume.pdf',
        coverLetter: 'Passionate marketer with 4 years experience...',
        experience: 4,
        education: 'Bachelor\'s in Marketing',
        skills: ['Digital Marketing', 'Social Media', 'Google Ads', 'Analytics'],
        appliedDate: '2024-01-28',
        isActive: true
      }
    ]);

    // Create Leave Types
    const leaveTypes = await LeaveType.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440401',
        name: 'Annual Leave',
        daysAllocated: 25,
        daysUsed: 8,
        daysRemaining: 17,
        color: '#3B82F6',
        description: 'Standard annual leave entitlement',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440402',
        name: 'Sick Leave',
        daysAllocated: 15,
        daysUsed: 3,
        daysRemaining: 12,
        color: '#EF4444',
        description: 'Medical leave for health issues',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440403',
        name: 'Maternity Leave',
        daysAllocated: 90,
        daysUsed: 0,
        daysRemaining: 90,
        color: '#EC4899',
        description: 'Maternity leave for expecting mothers',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440404',
        name: 'Paternity Leave',
        daysAllocated: 10,
        daysUsed: 0,
        daysRemaining: 10,
        color: '#8B5CF6',
        description: 'Paternity leave for new fathers',
        isActive: true
      }
    ]);

    // Create Leave Requests
    const leaveRequests = await LeaveRequest.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440501',
        employeeId: '550e8400-e29b-41d4-a716-446655440101',
        leaveTypeId: '550e8400-e29b-41d4-a716-446655440401',
        startDate: '2024-02-15',
        endDate: '2024-02-20',
        days: 6,
        reason: 'Family vacation',
        status: 'Approved',
        approver: 'Marie Claire Niyonsaba',
        submittedDate: '2024-01-20',
        approvedDate: '2024-01-25',
        comments: 'Approved - enjoy your vacation!',
        department: 'IT',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440502',
        employeeId: '550e8400-e29b-41d4-a716-446655440102',
        leaveTypeId: '550e8400-e29b-41d4-a716-446655440402',
        startDate: '2024-02-10',
        endDate: '2024-02-12',
        days: 3,
        reason: 'Medical appointment',
        status: 'Pending',
        submittedDate: '2024-01-30',
        department: 'HR',
        isActive: true
      }
    ]);

    // Create Training Courses
    const trainingCourses = await TrainingCourse.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440601',
        title: 'Advanced JavaScript Development',
        department: 'IT',
        instructor: 'Jean Pierre Uwimana',
        location: 'Conference Room A',
        duration: '3 days',
        capacity: 20,
        enrolled: 15,
        status: 'Active',
        startDate: '2024-03-01',
        endDate: '2024-03-03',
        cost: 'RWF 150,000',
        description: 'Advanced JavaScript concepts and modern development practices',
        modules: [
          'ES6+ Features',
          'Async Programming',
          'Design Patterns',
          'Testing Strategies'
        ],
        objectives: [
          'Master advanced JavaScript concepts',
          'Learn modern development practices',
          'Improve code quality and testing'
        ],
        prerequisites: ['Basic JavaScript knowledge', '1+ year development experience'],
        materials: ['Course handbook', 'Online resources', 'Practice exercises'],
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440602',
        title: 'Leadership Skills Workshop',
        department: 'HR',
        instructor: 'Marie Claire Niyonsaba',
        location: 'Training Room B',
        duration: '2 days',
        capacity: 15,
        enrolled: 12,
        status: 'Active',
        startDate: '2024-03-15',
        endDate: '2024-03-16',
        cost: 'RWF 200,000',
        description: 'Develop essential leadership and management skills',
        modules: [
          'Communication Skills',
          'Team Management',
          'Conflict Resolution',
          'Strategic Thinking'
        ],
        objectives: [
          'Improve leadership capabilities',
          'Enhance communication skills',
          'Learn effective team management'
        ],
        prerequisites: ['Managerial position', '2+ years work experience'],
        materials: ['Leadership handbook', 'Case studies', 'Assessment tools'],
        isActive: true
      }
    ]);

    // Create Training Enrollments
    const trainingEnrollments = await TrainingEnrollment.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440701',
        employeeId: '550e8400-e29b-41d4-a716-446655440101',
        courseId: '550e8400-e29b-41d4-a716-446655440601',
        status: 'Enrolled',
        enrollmentDate: '2024-01-15',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440702',
        employeeId: '550e8400-e29b-41d4-a716-446655440102',
        courseId: '550e8400-e29b-41d4-a716-446655440602',
        status: 'Enrolled',
        enrollmentDate: '2024-01-20',
        isActive: true
      }
    ]);

    // Create Attendance Records
    const attendanceRecords = await AttendanceRecord.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440801',
        employeeId: '550e8400-e29b-41d4-a716-446655440101',
        date: '2024-02-08',
        checkIn: '08:30:00',
        checkOut: '17:30:00',
        totalHours: '9h 0m',
        status: 'Present',
        location: 'Office',
        overtime: '1h 0m',
        lateMinutes: 0,
        department: 'IT',
        notes: 'Regular day',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440802',
        employeeId: '550e8400-e29b-41d4-a716-446655440102',
        date: '2024-02-08',
        checkIn: '08:00:00',
        checkOut: '17:00:00',
        totalHours: '9h 0m',
        status: 'Present',
        location: 'Office',
        overtime: '0h 0m',
        lateMinutes: 0,
        department: 'HR',
        notes: 'Regular day',
        isActive: true
      }
    ]);

    // Create Performance Reviews
    const performanceReviews = await PerformanceReview.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655440901',
        employeeId: '550e8400-e29b-41d4-a716-446655440101',
        reviewDate: '2024-01-15',
        nextReview: '2024-07-15',
        rating: 4.5,
        status: 'Completed',
        supervisor: 'Marie Claire Niyonsaba',
        strengths: [
          'Excellent technical skills',
          'Strong problem-solving abilities',
          'Good team collaboration'
        ],
        areas: [
          'Could improve documentation',
          'Need more mentoring of junior developers'
        ],
        salary: 'RWF 2,500,000',
        bonus: 'RWF 500,000',
        goals: [
          'Improve code documentation',
          'Mentor 2 junior developers',
          'Complete AWS certification'
        ],
        comments: 'Excellent performance overall. Continue the great work!',
        department: 'IT',
        position: 'Software Developer',
        location: 'Kigali',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440902',
        employeeId: '550e8400-e29b-41d4-a716-446655440102',
        reviewDate: '2024-01-20',
        nextReview: '2024-07-20',
        rating: 5.0,
        status: 'Completed',
        supervisor: 'System Administrator',
        strengths: [
          'Outstanding leadership skills',
          'Excellent communication',
          'Strong strategic thinking'
        ],
        areas: [
          'Could delegate more tasks',
          'Need to balance work and personal time'
        ],
        salary: 'RWF 3,000,000',
        bonus: 'RWF 750,000',
        goals: [
          'Implement new HR policies',
          'Improve employee satisfaction',
          'Develop training programs'
        ],
        comments: 'Exceptional performance. You are a valuable asset to the company.',
        department: 'HR',
        position: 'HR Manager',
        location: 'Kigali',
        isActive: true
      }
    ]);

    // Create Payroll Records
    const payrollRecords = await PayrollRecord.bulkCreate([
      {
        id: '550e8400-e29b-41d4-a716-446655441001',
        employeeId: '550e8400-e29b-41d4-a716-446655440101',
        month: '1',
        year: 2024,
        basicSalary: 'RWF 2,500,000',
        allowances: 'RWF 250,000',
        deductions: 'RWF 375,000',
        netSalary: 'RWF 2,375,000',
        status: 'Paid',
        paymentDate: '2024-01-31',
        paymentMethod: 'Bank Transfer',
        accountNumber: '1234567890',
        bank: 'Bank of Kigali',
        department: 'IT',
        position: 'Software Developer',
        location: 'Kigali',
        overtime: 'RWF 100,000',
        bonuses: 'RWF 0',
        taxes: 'RWF 300,000',
        insurance: 'RWF 75,000',
        isActive: true
      },
      {
        id: '550e8400-e29b-41d4-a716-446655441002',
        employeeId: '550e8400-e29b-41d4-a716-446655440102',
        month: '1',
        year: 2024,
        basicSalary: 'RWF 3,000,000',
        allowances: 'RWF 300,000',
        deductions: 'RWF 450,000',
        netSalary: 'RWF 2,850,000',
        status: 'Paid',
        paymentDate: '2024-01-31',
        paymentMethod: 'Bank Transfer',
        accountNumber: '1234567891',
        bank: 'Bank of Kigali',
        department: 'HR',
        position: 'HR Manager',
        location: 'Kigali',
        overtime: 'RWF 0',
        bonuses: 'RWF 750,000',
        taxes: 'RWF 360,000',
        insurance: 'RWF 90,000',
        isActive: true
      }
    ]);

    console.log('✅ HR data seeded successfully!');
    console.log(`📊 Created: ${users.length} Users`);
    console.log(`📊 Created: ${employees.length} Employees`);
    console.log(`📊 Created: ${jobPostings.length} Job Postings`);
    console.log(`📊 Created: ${candidates.length} Candidates`);
    console.log(`📊 Created: ${leaveTypes.length} Leave Types`);
    console.log(`📊 Created: ${leaveRequests.length} Leave Requests`);
    console.log(`📊 Created: ${trainingCourses.length} Training Courses`);
    console.log(`📊 Created: ${trainingEnrollments.length} Training Enrollments`);
    console.log(`📊 Created: ${attendanceRecords.length} Attendance Records`);
    console.log(`📊 Created: ${performanceReviews.length} Performance Reviews`);
    console.log(`📊 Created: ${payrollRecords.length} Payroll Records`);

    // Seed benefits data
    await seedBenefitsData();
    await seedComplianceData();
    await seedReportsData();
    await seedSettingsData();
    
    // Seed Finance data
    await seedFinanceData();

  } catch (error) {
    console.error('❌ Error seeding HR data:', error);
    throw error;
  }
}; 