const { sequelize } = require('./config/database');

// Import all models
const Department = require('./models/Department');
const User = require('./models/User');
const Employee = require('./models/Employee');
const SystemSetting = require('./models/SystemSetting');
const AuditLog = require('./models/AuditLog');
const Client = require('./models/Client');
const Contract = require('./models/Contract');
const FinancialAccount = require('./models/FinancialAccount');
const Transaction = require('./models/Transaction');
const Expense = require('./models/Expense');
const ITAsset = require('./models/ITAsset');
const ITSupportTicket = require('./models/ITSupportTicket');
const SecurityGuard = require('./models/SecurityGuard');
const SecurityIncident = require('./models/SecurityIncident');
const InventoryItem = require('./models/InventoryItem');
const Supplier = require('./models/Supplier');
const Lead = require('./models/Lead');
const RiskAssessment = require('./models/RiskAssessment');
const LeaveRequest = require('./models/LeaveRequest');
const AttendanceRecord = require('./models/AttendanceRecord');
const PayrollRecord = require('./models/PayrollRecord');
const PerformanceReview = require('./models/PerformanceReview');
const TrainingProgram = require('./models/TrainingProgram');
const TrainingEnrollment = require('./models/TrainingEnrollment');
const Benefit = require('./models/Benefit');
const Candidate = require('./models/Candidate');
const Interview = require('./models/Interview');
const Goal = require('./models/Goal');
const JobPosting = require('./models/JobPosting');
const Budget = require('./models/Budget');
const AccountsReceivable = require('./models/AccountsReceivable');
const AccountsPayable = require('./models/AccountsPayable');
const Invoice = require('./models/Invoice');
const FinancialReport = require('./models/FinancialReport');
const TaxRecord = require('./models/TaxRecord');
const CashFlow = require('./models/CashFlow');
const System = require('./models/System');
const NetworkDevice = require('./models/NetworkDevice');
const MaintenanceSchedule = require('./models/MaintenanceSchedule');
const SecurityAssignment = require('./models/SecurityAssignment');
const InventoryTransaction = require('./models/InventoryTransaction');
const PurchaseOrder = require('./models/PurchaseOrder');
const Warehouse = require('./models/Warehouse');
const Opportunity = require('./models/Opportunity');
const Quote = require('./models/Quote');
const MarketingCampaign = require('./models/MarketingCampaign');
const CompliancePolicy = require('./models/CompliancePolicy');
const RecoveryCase = require('./models/RecoveryCase');
const CustomerSurvey = require('./models/CustomerSurvey');
const SupportTicket = require('./models/SupportTicket');
const Project = require('./models/Project');
const Notification = require('./models/Notification');
const Report = require('./models/Report');
const KPI = require('./models/KPI');
const Workflow = require('./models/Workflow');
const Integration = require('./models/Integration');

const comprehensiveSeedData = async () => {
  try {
    console.log('🌱 DICEL ERP - Comprehensive Seed Data Generation');
    console.log('================================================');
    console.log('');

    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    console.log('🚀 Starting comprehensive seed data generation...');
    console.log('');

    // Get existing data for references
    const departments = await Department.findAll();
    const users = await User.findAll();
    const employees = await Employee.findAll();
    const clients = await Client.findAll();
    const suppliers = await Supplier.findAll();

    console.log('📊 Found existing data:');
    console.log(`   - Departments: ${departments.length}`);
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Employees: ${employees.length}`);
    console.log(`   - Clients: ${clients.length}`);
    console.log(`   - Suppliers: ${suppliers.length}`);
    console.log('');

    // Rwanda-based data arrays
    const rwandanNames = {
      male: ['Jean', 'Pierre', 'Emmanuel', 'Alexandre', 'David', 'Joseph', 'Charles', 'Andre', 'Paul', 'Francois', 'Eric', 'Patrick', 'Vincent', 'Claude', 'Rene', 'Michel', 'Roger', 'Philippe', 'Bernard', 'Marc'],
      female: ['Marie', 'Jeanne', 'Claudine', 'Francoise', 'Therese', 'Louise', 'Madeleine', 'Catherine', 'Anne', 'Elisabeth', 'Monique', 'Suzanne', 'Christine', 'Nicole', 'Martine', 'Brigitte', 'Dominique', 'Isabelle', 'Caroline', 'Sophie']
    };

    const rwandanSurnames = ['Ndayisaba', 'Uwimana', 'Niyonsenga', 'Mukamana', 'Nkurunziza', 'Uwamahoro', 'Nshimiyimana', 'Mukamurenzi', 'Niyongabo', 'Uwineza', 'Ndayambaje', 'Mukandayisenga', 'Niyitegeka', 'Uwimana', 'Mukamana', 'Nkurunziza', 'Uwamahoro', 'Nshimiyimana', 'Mukamurenzi', 'Niyongabo'];

    const rwandanCities = ['Kigali', 'Butare', 'Gitarama', 'Ruhengeri', 'Gisenyi', 'Byumba', 'Cyangugu', 'Kibuye', 'Kibungo', 'Nyanza', 'Ruhango', 'Gikongoro', 'Kigali-Ngali', 'Kigali-Gasabo', 'Kigali-Kicukiro'];

    const rwandanCompanies = ['Rwanda Development Board', 'Bank of Kigali', 'Rwanda Revenue Authority', 'Rwanda Energy Group', 'Rwanda Transport Development Agency', 'Rwanda Information Society Authority', 'Rwanda Utilities Regulatory Authority', 'Rwanda Civil Aviation Authority', 'Rwanda Standards Board', 'Rwanda Environment Management Authority'];

    const rwandanBanks = ['Bank of Kigali', 'Ecobank Rwanda', 'I&M Bank Rwanda', 'GT Bank Rwanda', 'Access Bank Rwanda', 'KCB Bank Rwanda', 'BPR Bank Rwanda', 'Urwego Bank', 'Cogebanque', 'Development Bank of Rwanda'];

    console.log('🌱 Generating comprehensive seed data...');
    console.log('');

    // 1. AUDIT LOGS
    console.log('📋 Creating Audit Logs...');
    const auditLogs = [];
    for (let i = 1; i <= 50; i++) {
      auditLogs.push({
        user_id: users[Math.floor(Math.random() * users.length)].id,
        action: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'EXPORT', 'IMPORT'][Math.floor(Math.random() * 7)],
        entity_type: ['user', 'employee', 'client', 'transaction', 'invoice', 'report'][Math.floor(Math.random() * 6)],
        entity_id: require('crypto').randomUUID(),
        details: `Action performed on ${new Date().toISOString()}`,
        ip_address: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      });
    }
    await AuditLog.bulkCreate(auditLogs);
    console.log('   ✅ Created 50 audit logs');

    // 2. LEAVE REQUESTS (Fixed to match model)
    console.log('📋 Creating Leave Requests...');
    const leaveRequests = [];
    for (let i = 1; i <= 30; i++) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 14) + 1);
      const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      
      leaveRequests.push({
        employee_id: employees[Math.floor(Math.random() * employees.length)].id,
        leave_type: ['annual', 'sick', 'maternity', 'paternity', 'bereavement', 'unpaid'][Math.floor(Math.random() * 6)],
        start_date: startDate,
        end_date: endDate,
        total_days: totalDays,
        reason: ['Family vacation', 'Medical appointment', 'Personal emergency', 'Training course', 'Wedding', 'Conference'][Math.floor(Math.random() * 6)],
        status: ['pending', 'approved', 'rejected', 'cancelled'][Math.floor(Math.random() * 4)],
        approved_by: users[Math.floor(Math.random() * users.length)].id,
        notes: 'Leave request processed'
      });
    }
    await LeaveRequest.bulkCreate(leaveRequests);
    console.log('   ✅ Created 30 leave requests');

    // 3. ATTENDANCE RECORDS
    console.log('📋 Creating Attendance Records...');
    const attendanceRecords = [];
    for (let i = 1; i <= 200; i++) {
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      const checkIn = new Date(date);
      checkIn.setHours(8 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60));
      const checkOut = new Date(date);
      checkOut.setHours(17 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60));
      
      attendanceRecords.push({
        employee_id: employees[Math.floor(Math.random() * employees.length)].id,
        date: date,
        check_in_time: checkIn,
        check_out_time: checkOut,
        total_hours: Math.floor(Math.random() * 3) + 7,
        status: ['present', 'late', 'absent', 'half_day'][Math.floor(Math.random() * 4)],
        notes: 'Regular attendance'
      });
    }
    await AttendanceRecord.bulkCreate(attendanceRecords);
    console.log('   ✅ Created 200 attendance records');

    // 4. PAYROLL RECORDS
    console.log('📋 Creating Payroll Records...');
    const payrollRecords = [];
    for (let i = 1; i <= 100; i++) {
      const baseSalary = Math.floor(Math.random() * 500000) + 200000; // 200k - 700k RWF
      const allowances = Math.floor(Math.random() * 100000) + 50000;
      const deductions = Math.floor(Math.random() * 50000) + 20000;
      
      payrollRecords.push({
        employee_id: employees[Math.floor(Math.random() * employees.length)].id,
        pay_period: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05'][Math.floor(Math.random() * 5)],
        base_salary: baseSalary,
        allowances: allowances,
        deductions: deductions,
        net_salary: baseSalary + allowances - deductions,
        payment_date: new Date(),
        status: ['pending', 'paid', 'cancelled'][Math.floor(Math.random() * 3)],
        payment_method: ['bank_transfer', 'cash', 'mobile_money'][Math.floor(Math.random() * 3)],
        notes: 'Monthly payroll processing'
      });
    }
    await PayrollRecord.bulkCreate(payrollRecords);
    console.log('   ✅ Created 100 payroll records');

    // 5. PERFORMANCE REVIEWS
    console.log('📋 Creating Performance Reviews...');
    const performanceReviews = [];
    for (let i = 1; i <= 50; i++) {
      performanceReviews.push({
        employee_id: employees[Math.floor(Math.random() * employees.length)].id,
        reviewer_id: users[Math.floor(Math.random() * users.length)].id,
        review_period: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'][Math.floor(Math.random() * 4)],
        review_date: new Date(),
        overall_rating: Math.floor(Math.random() * 5) + 1,
        performance_score: Math.floor(Math.random() * 40) + 60, // 60-100
        strengths: 'Good communication skills, team player, meets deadlines',
        areas_for_improvement: 'Technical skills, time management',
        goals_for_next_period: 'Improve technical skills, take on more responsibilities',
        status: ['draft', 'submitted', 'approved', 'completed'][Math.floor(Math.random() * 4)],
        notes: 'Annual performance review'
      });
    }
    await PerformanceReview.bulkCreate(performanceReviews);
    console.log('   ✅ Created 50 performance reviews');

    // 6. TRAINING PROGRAMS
    console.log('📋 Creating Training Programs...');
    const trainingPrograms = [];
    const programNames = ['Leadership Development', 'Technical Skills', 'Customer Service', 'Project Management', 'Financial Management', 'IT Security', 'Communication Skills', 'Team Building', 'Sales Training', 'Quality Management'];
    
    for (let i = 1; i <= 20; i++) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 60));
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 7) + 1);
      
      trainingPrograms.push({
        program_name: programNames[Math.floor(Math.random() * programNames.length)],
        description: 'Comprehensive training program for employee development',
        department_id: departments[Math.floor(Math.random() * departments.length)].id,
        trainer: `${rwandanNames.male[Math.floor(Math.random() * rwandanNames.male.length)]} ${rwandanSurnames[Math.floor(Math.random() * rwandanSurnames.length)]}`,
        start_date: startDate,
        end_date: endDate,
        duration_hours: Math.floor(Math.random() * 40) + 8,
        max_participants: Math.floor(Math.random() * 20) + 10,
        cost_per_participant: Math.floor(Math.random() * 50000) + 10000,
        status: ['planned', 'active', 'completed', 'cancelled'][Math.floor(Math.random() * 4)],
        location: rwandanCities[Math.floor(Math.random() * rwandanCities.length)],
        notes: 'Professional development training'
      });
    }
    await TrainingProgram.bulkCreate(trainingPrograms);
    console.log('   ✅ Created 20 training programs');

    // 7. TRAINING ENROLLMENTS
    console.log('📋 Creating Training Enrollments...');
    const trainingEnrollments = [];
    for (let i = 1; i <= 100; i++) {
      trainingEnrollments.push({
        employee_id: employees[Math.floor(Math.random() * employees.length)].id,
        training_program_id: Math.floor(Math.random() * 20) + 1,
        enrollment_date: new Date(),
        status: ['enrolled', 'attending', 'completed', 'dropped'][Math.floor(Math.random() * 4)],
        completion_date: Math.random() > 0.5 ? new Date() : null,
        certificate_issued: Math.random() > 0.7,
        feedback_rating: Math.floor(Math.random() * 5) + 1,
        feedback_comments: 'Great training program, very informative',
        notes: 'Training enrollment processed'
      });
    }
    await TrainingEnrollment.bulkCreate(trainingEnrollments);
    console.log('   ✅ Created 100 training enrollments');

    // 8. BENEFITS
    console.log('📋 Creating Benefits...');
    const benefits = [];
    const benefitTypes = ['Health Insurance', 'Life Insurance', 'Retirement Plan', 'Transport Allowance', 'Housing Allowance', 'Education Allowance', 'Meal Allowance', 'Internet Allowance', 'Phone Allowance', 'Gym Membership'];
    
    for (let i = 1; i <= 30; i++) {
      benefits.push({
        employee_id: employees[Math.floor(Math.random() * employees.length)].id,
        benefit_type: benefitTypes[Math.floor(Math.random() * benefitTypes.length)],
        provider: ['RSSB', 'RAMA', 'Private Insurance', 'Company Fund'][Math.floor(Math.random() * 4)],
        start_date: new Date(),
        end_date: null,
        amount: Math.floor(Math.random() * 100000) + 10000,
        currency: 'RWF',
        status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)],
        description: 'Employee benefit package',
        notes: 'Standard employee benefit'
      });
    }
    await Benefit.bulkCreate(benefits);
    console.log('   ✅ Created 30 benefits');

    // 9. CANDIDATES
    console.log('📋 Creating Candidates...');
    const candidates = [];
    for (let i = 1; i <= 25; i++) {
      const isMale = Math.random() > 0.5;
      const firstName = isMale ? 
        rwandanNames.male[Math.floor(Math.random() * rwandanNames.male.length)] :
        rwandanNames.female[Math.floor(Math.random() * rwandanNames.female.length)];
      const lastName = rwandanSurnames[Math.floor(Math.random() * rwandanSurnames.length)];
      
      candidates.push({
        first_name: firstName,
        last_name: lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
        phone: `+250${Math.floor(Math.random() * 90000000) + 10000000}`,
        position_applied: ['Software Developer', 'Accountant', 'HR Manager', 'Sales Representative', 'IT Support', 'Security Guard', 'Project Manager', 'Marketing Specialist'][Math.floor(Math.random() * 8)],
        department_id: departments[Math.floor(Math.random() * departments.length)].id,
        experience_years: Math.floor(Math.random() * 10) + 1,
        education_level: ['high_school', 'diploma', 'bachelor', 'master', 'phd'][Math.floor(Math.random() * 5)],
        resume_file: `resume_${firstName}_${lastName}.pdf`,
        status: ['new', 'reviewed', 'shortlisted', 'interviewed', 'hired', 'rejected'][Math.floor(Math.random() * 6)],
        source: ['website', 'referral', 'job_board', 'social_media', 'recruitment_agency'][Math.floor(Math.random() * 5)],
        notes: 'Candidate application received'
      });
    }
    await Candidate.bulkCreate(candidates);
    console.log('   ✅ Created 25 candidates');

    // 10. INTERVIEWS
    console.log('📋 Creating Interviews...');
    const interviews = [];
    for (let i = 1; i <= 40; i++) {
      const interviewDate = new Date();
      interviewDate.setDate(interviewDate.getDate() + Math.floor(Math.random() * 30));
      
      interviews.push({
        candidate_id: Math.floor(Math.random() * 25) + 1,
        interviewer_id: users[Math.floor(Math.random() * users.length)].id,
        interview_date: interviewDate,
        interview_type: ['phone', 'video', 'in_person', 'panel'][Math.floor(Math.random() * 4)],
        duration_minutes: Math.floor(Math.random() * 60) + 30,
        location: rwandanCities[Math.floor(Math.random() * rwandanCities.length)],
        status: ['scheduled', 'completed', 'cancelled', 'rescheduled'][Math.floor(Math.random() * 4)],
        rating: Math.floor(Math.random() * 5) + 1,
        feedback: 'Good candidate, shows potential',
        notes: 'Interview conducted successfully'
      });
    }
    await Interview.bulkCreate(interviews);
    console.log('   ✅ Created 40 interviews');

    // 11. GOALS
    console.log('📋 Creating Goals...');
    const goals = [];
    for (let i = 1; i <= 80; i++) {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 365) + 30);
      
      goals.push({
        employee_id: employees[Math.floor(Math.random() * employees.length)].id,
        goal_title: ['Increase Sales', 'Improve Customer Satisfaction', 'Complete Project', 'Learn New Skills', 'Reduce Costs', 'Improve Efficiency', 'Team Leadership', 'Innovation'][Math.floor(Math.random() * 8)],
        goal_description: 'Specific, measurable, achievable goal for employee development',
        goal_type: ['performance', 'development', 'project', 'sales', 'quality', 'efficiency'][Math.floor(Math.random() * 6)],
        start_date: startDate,
        target_date: endDate,
        priority: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
        status: ['draft', 'active', 'in_progress', 'completed', 'cancelled'][Math.floor(Math.random() * 5)],
        progress_percentage: Math.floor(Math.random() * 100),
        target_value: Math.floor(Math.random() * 1000000) + 100000,
        current_value: Math.floor(Math.random() * 500000) + 50000,
        notes: 'Employee goal tracking'
      });
    }
    await Goal.bulkCreate(goals);
    console.log('   ✅ Created 80 goals');

    // 12. JOB POSTINGS
    console.log('📋 Creating Job Postings...');
    const jobPostings = [];
    for (let i = 1; i <= 15; i++) {
      const postingDate = new Date();
      postingDate.setDate(postingDate.getDate() - Math.floor(Math.random() * 30));
      const closingDate = new Date(postingDate);
      closingDate.setDate(closingDate.getDate() + Math.floor(Math.random() * 30) + 7);
      
      jobPostings.push({
        job_title: ['Software Developer', 'Accountant', 'HR Manager', 'Sales Representative', 'IT Support', 'Security Guard', 'Project Manager', 'Marketing Specialist', 'Customer Service', 'Operations Manager'][Math.floor(Math.random() * 10)],
        job_code: `JOB-${String(i).padStart(3, '0')}`,
        department_id: departments[Math.floor(Math.random() * departments.length)].id,
        position_type: ['full_time', 'part_time', 'contract', 'internship'][Math.floor(Math.random() * 4)],
        location: rwandanCities[Math.floor(Math.random() * rwandanCities.length)],
        job_description: 'Comprehensive job description with requirements and responsibilities',
        requirements: ['Bachelor degree', '3+ years experience', 'Good communication skills', 'Team player'],
        responsibilities: ['Manage daily operations', 'Meet targets', 'Collaborate with team', 'Report to manager'],
        experience_level: ['entry', 'junior', 'mid_level', 'senior'][Math.floor(Math.random() * 4)],
        salary_range_min: Math.floor(Math.random() * 500000) + 200000,
        salary_range_max: Math.floor(Math.random() * 1000000) + 700000,
        posting_date: postingDate,
        closing_date: closingDate,
        status: ['draft', 'active', 'paused', 'closed', 'filled'][Math.floor(Math.random() * 5)],
        positions_available: Math.floor(Math.random() * 3) + 1,
        applications_received: Math.floor(Math.random() * 20),
        notes: 'Job posting for recruitment'
      });
    }
    await JobPosting.bulkCreate(jobPostings);
    console.log('   ✅ Created 15 job postings');

    console.log('');
    console.log('🎉 COMPREHENSIVE SEED DATA GENERATION COMPLETED!');
    console.log('');
    console.log('📊 SUMMARY:');
    console.log('   ✅ Audit Logs: 50 records');
    console.log('   ✅ Leave Requests: 30 records');
    console.log('   ✅ Attendance Records: 200 records');
    console.log('   ✅ Payroll Records: 100 records');
    console.log('   ✅ Performance Reviews: 50 records');
    console.log('   ✅ Training Programs: 20 records');
    console.log('   ✅ Training Enrollments: 100 records');
    console.log('   ✅ Benefits: 30 records');
    console.log('   ✅ Candidates: 25 records');
    console.log('   ✅ Interviews: 40 records');
    console.log('   ✅ Goals: 80 records');
    console.log('   ✅ Job Postings: 15 records');
    console.log('');
    console.log('🚀 All HR-related tables now have comprehensive seed data!');
    console.log('📋 Ready for testing and development');

    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error generating seed data:', error);
    process.exit(1);
  }
};

// Run the comprehensive seed data generation
comprehensiveSeedData(); 