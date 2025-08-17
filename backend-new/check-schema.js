const { sequelize } = require('./config/database');

const checkSchema = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    const [results] = await sequelize.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'job_postings' 
      ORDER BY ordinal_position;
    `);

    console.log('📋 Job Postings table schema:');
    console.log('================================');
    results.forEach(row => {
      console.log(`  - ${row.column_name} (${row.data_type}, nullable: ${row.is_nullable})`);
    });

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

checkSchema(); 