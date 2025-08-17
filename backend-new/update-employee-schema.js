const { sequelize } = require('./config/database');
const Employee = require('./models/Employee');

const updateEmployeeSchema = async () => {
  try {
    console.log('🗄️ Updating employee table schema to add name fields...');

    // Sync the model to add the new fields
    await sequelize.sync({ alter: true });

    console.log('✅ Employee table schema updated successfully!');
    console.log('📋 Added fields: first_name, last_name');

    await sequelize.close();
    console.log('🔌 Database connection closed.');

  } catch (error) {
    console.error('❌ Error updating employee schema:', error);
    process.exit(1);
  }
};

// Run the update
updateEmployeeSchema(); 