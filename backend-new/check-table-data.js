const { sequelize } = require('./config/database');

const checkTableData = async () => {
  try {
    console.log('📊 DICEL ERP - Database Data Status Check');
    console.log('=========================================');
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

    let totalTables = 0;
    let tablesWithData = 0;
    let emptyTables = 0;
    let tablesWithSeedData = 0;

    console.log('📋 DATA STATUS BY DEPARTMENT:');
    console.log('');

    for (const [group, expectedTables] of Object.entries(tableGroups)) {
      console.log(`${group}:`);
      totalTables += expectedTables.length;
      
      for (const table of expectedTables) {
        if (tableNames.includes(table)) {
          try {
            // Check row count for each table
            const [countResult] = await sequelize.query(`SELECT COUNT(*) as count FROM "${table}"`);
            const rowCount = parseInt(countResult[0].count);
            
            if (rowCount > 0) {
              console.log(`   ✅ ${table} - ${rowCount} records`);
              tablesWithData++;
              
              // Check if it's likely seed data (more than 5 records)
              if (rowCount > 5) {
                tablesWithSeedData++;
              }
            } else {
              console.log(`   ⚪ ${table} - EMPTY (0 records)`);
              emptyTables++;
            }
          } catch (error) {
            console.log(`   ❌ ${table} - ERROR checking data`);
          }
        } else {
          console.log(`   ❌ ${table} - TABLE NOT FOUND`);
        }
      }
      console.log('');
    }

    console.log('📈 DATA STATUS SUMMARY:');
    console.log('=======================');
    console.log(`   Total Tables: ${totalTables}`);
    console.log(`   Tables with Data: ${tablesWithData}`);
    console.log(`   Empty Tables: ${emptyTables}`);
    console.log(`   Tables with Seed Data: ${tablesWithSeedData}`);
    console.log(`   Data Coverage: ${((tablesWithData / totalTables) * 100).toFixed(1)}%`);
    console.log('');

    if (emptyTables > 0) {
      console.log('📋 EMPTY TABLES (Need Data):');
      console.log('============================');
      
      for (const [group, expectedTables] of Object.entries(tableGroups)) {
        for (const table of expectedTables) {
          if (tableNames.includes(table)) {
            try {
              const [countResult] = await sequelize.query(`SELECT COUNT(*) as count FROM "${table}"`);
              const rowCount = parseInt(countResult[0].count);
              
              if (rowCount === 0) {
                console.log(`   - ${table} (${group})`);
              }
            } catch (error) {
              // Ignore errors
            }
          }
        }
      }
      console.log('');
    }

    console.log('🎯 RECOMMENDATIONS:');
    console.log('===================');
    if (emptyTables === 0) {
      console.log('   ✅ All tables have data!');
      console.log('   🚀 System is ready for full operation');
    } else if (tablesWithSeedData > 0) {
      console.log('   📊 Some tables have seed data');
      console.log('   📋 Consider adding data to empty tables');
      console.log('   🚀 System can be tested with existing data');
    } else {
      console.log('   ⚠️ Most tables are empty');
      console.log('   📋 Need to add seed data for testing');
      console.log('   🚀 Run seed data scripts');
    }

    await sequelize.close();
    console.log('');
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error checking table data:', error);
    process.exit(1);
  }
};

// Run the data check
checkTableData(); 