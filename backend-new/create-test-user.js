const { sequelize } = require('./config/database');
const User = require('./models/User');

const createTestUser = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Check if test user already exists
    const existingUser = await User.findOne({ where: { email: 'admin@dicel.com' } });
    
    if (existingUser) {
      console.log('ℹ️ Test user already exists');
      console.log('📧 Email: admin@dicel.com');
      console.log('🔑 Password: admin123');
      console.log('👤 Role: admin');
      await sequelize.close();
      return;
    }

    // Create test user (password will be automatically hashed by the model hook)
    const testUser = await User.create({
      email: 'admin@dicel.com',
      password_hash: 'admin123', // This will be hashed automatically
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin',
      phone: '+250 788 123 456',
      is_active: true
    });

    console.log('✅ Test user created successfully!');
    console.log('📧 Email: admin@dicel.com');
    console.log('🔑 Password: admin123');
    console.log('👤 Role: admin');
    console.log('🆔 User ID:', testUser.id);

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser(); 