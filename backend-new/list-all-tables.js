const { sequelize } = require('./config/database');

const listAllTables = async () => {
  try {
    console.log('📋 DICEL ERP - Complete Database Tables List');
    console.log('============================================');
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
    
    console.log(`📊 Total Tables Found: ${tableNames.length}`);
    console.log('');

    // Group tables by department/function
    const tableGroups = {
      '🏗️ CORE SYSTEM': ['departments', 'users', 'system_settings', 'audit_logs'],
      '👥 HR DEPARTMENT': ['employees', 'leave_requests', 'attendance_records', 'payroll_records', 'performance_reviews', 'training_programs', 'training_enrollments', 'benefits', 'candidates', 'interviews', 'goals', 'job_postings'],
      '💰 FINANCE DEPARTMENT': ['financial_accounts', 'transactions', 'expenses', 'budgets', 'accounts_receivable', 'accounts_payable', 'invoices', 'financial_reports', 'tax_records', 'cash_flows'],
      '💻 IT DEPARTMENT': ['it_assets', 'it_support_tickets', 'systems', 'network_devices', 'maintenance_schedules'],
      '🛡️ SECURITY DEPARTMENT': ['security_guards', 'security_incidents', 'security_assignments'],
      '📦 OPERATIONS/INVENTORY': ['inventory_items', 'suppliers', 'inventory_transactions', 'purchase_orders', 'warehouses'],
      '👥 CLIENT MANAGEMENT': ['clients', 'contracts'],
      '📈 SALES & MARKETING': ['leads', 'opportunities', 'quotes', 'marketing_campaigns'],
      '⚠️ RISK & COMPLIANCE': ['risk_assessments', 'compliance_policies'],
      '🔄 RECOVERY DEPARTMENT': ['recovery_cases'],
      '🎧 CUSTOMER EXPERIENCE': ['customer_surveys', 'support_tickets'],
      '📋 PROJECT MANAGEMENT': ['projects'],
      '🔔 SYSTEM FEATURES': ['notifications', 'reports', 'kpis', 'workflows', 'integrations']
    };

    let totalExpected = 0;
    let foundTables = 0;
    let missingTables = [];

    console.log('📋 DETAILED TABLE BREAKDOWN:');
    console.log('');

    for (const [group, expectedTables] of Object.entries(tableGroups)) {
      console.log(`${group}:`);
      totalExpected += expectedTables.length;
      
      for (const table of expectedTables) {
        if (tableNames.includes(table)) {
          console.log(`   ✅ ${table}`);
          foundTables++;
        } else {
          console.log(`   ❌ ${table} (MISSING)`);
          missingTables.push(table);
        }
      }
      console.log('');
    }

    console.log('📈 SUMMARY STATISTICS:');
    console.log('======================');
    console.log(`   Total Expected Tables: ${totalExpected}`);
    console.log(`   Found Tables: ${foundTables}`);
    console.log(`   Missing Tables: ${missingTables.length}`);
    console.log(`   Coverage: ${((foundTables / totalExpected) * 100).toFixed(1)}%`);
    console.log('');

    if (missingTables.length > 0) {
      console.log('❌ MISSING TABLES:');
      missingTables.forEach(table => console.log(`   - ${table}`));
      console.log('');
    }

    console.log('🎯 DATABASE STATUS:');
    if (foundTables === totalExpected) {
      console.log('   ✅ 100% COMPLETE - All tables created successfully!');
      console.log('   🚀 Ready for API development');
      console.log('   🚀 Ready for frontend integration');
    } else {
      console.log('   ⚠️ PARTIALLY COMPLETE - Some tables missing');
      console.log('   📋 Please run missing table creation scripts');
    }

    console.log('');
    console.log('📊 DEPARTMENT COVERAGE:');
    console.log('=======================');
    for (const [group, expectedTables] of Object.entries(tableGroups)) {
      const found = expectedTables.filter(table => tableNames.includes(table)).length;
      const percentage = ((found / expectedTables.length) * 100).toFixed(1);
      console.log(`   ${group}: ${found}/${expectedTables.length} (${percentage}%)`);
    }

    await sequelize.close();
    console.log('');
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error listing tables:', error);
    process.exit(1);
  }
};

// Run the table listing
listAllTables(); 