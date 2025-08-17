const { sequelize } = require('./config/database');

const verifyDatabase = async () => {
  try {
    console.log('🔍 Verifying DICEL ERP Database...');
    console.log('');

    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful');

    // Get all table names
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    const tableNames = results.map(row => row.table_name);
    
    console.log('');
    console.log('📊 Database Tables Found:', tableNames.length);
    console.log('');

    // Group tables by department/function
    const tableGroups = {
      'Core System': ['departments', 'users', 'system_settings', 'audit_logs'],
      'HR': ['employees', 'leave_requests', 'attendance_records', 'payroll_records', 'performance_reviews', 'training_programs', 'training_enrollments', 'benefits', 'candidates', 'interviews', 'goals', 'job_postings'],
      'Finance': ['financial_accounts', 'transactions', 'expenses', 'budgets', 'accounts_receivable', 'accounts_payable', 'invoices', 'financial_reports', 'tax_records', 'cash_flows'],
      'IT': ['it_assets', 'it_support_tickets', 'systems', 'network_devices', 'maintenance_schedules'],
      'Security': ['security_guards', 'security_incidents', 'security_assignments'],
      'Operations': ['inventory_items', 'suppliers', 'inventory_transactions', 'purchase_orders', 'warehouses'],
      'Client Management': ['clients', 'contracts'],
      'Sales & Marketing': ['leads', 'opportunities', 'quotes', 'marketing_campaigns'],
      'Risk & Compliance': ['risk_assessments', 'compliance_policies'],
      'Recovery': ['recovery_cases'],
      'Customer Experience': ['customer_surveys', 'support_tickets'],
      'Project Management': ['projects'],
      'System Features': ['notifications', 'reports', 'kpis', 'workflows', 'integrations']
    };

    let totalTables = 0;
    let foundTables = 0;

    for (const [group, expectedTables] of Object.entries(tableGroups)) {
      console.log(`📋 ${group}:`);
      totalTables += expectedTables.length;
      
      for (const table of expectedTables) {
        if (tableNames.includes(table)) {
          console.log(`   ✅ ${table}`);
          foundTables++;
        } else {
          console.log(`   ❌ ${table} (MISSING)`);
        }
      }
      console.log('');
    }

    console.log('📈 Summary:');
    console.log(`   Total Expected Tables: ${totalTables}`);
    console.log(`   Found Tables: ${foundTables}`);
    console.log(`   Missing Tables: ${totalTables - foundTables}`);
    console.log(`   Coverage: ${((foundTables / totalTables) * 100).toFixed(1)}%`);

    if (foundTables === totalTables) {
      console.log('');
      console.log('🎉 ALL TABLES VERIFIED SUCCESSFULLY!');
      console.log('✅ Database is ready for development');
    } else {
      console.log('');
      console.log('⚠️ Some tables are missing. Please check the database setup.');
    }

    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error verifying database:', error);
    process.exit(1);
  }
};

// Run the verification
verifyDatabase(); 