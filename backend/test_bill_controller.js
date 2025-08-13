import { sequelize } from './config/database.js';
import './models/associations.js';
import { Bill } from './models/associations.js';

async function testBillController() {
  try {
    console.log('🔍 Testing Bill controller logic directly...');
    
    // Simulate the controller logic
    const { page = 1, limit = 10 } = { page: 1, limit: 10 };
    const offset = (page - 1) * limit;

    console.log('📊 Querying Bill model...');
    const { count, rows: bills } = await Bill.findAndCountAll({
      order: [['issueDate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    console.log(`📊 Found ${count} bills in database`);
    console.log(`📊 Bills data length:`, bills.length);
    
    if (bills.length > 0) {
      console.log('📋 First bill:', JSON.stringify(bills[0].toJSON(), null, 2));
    }

    const result = {
      items: bills,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    };

    console.log('📋 Result:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sequelize.close();
  }
}

testBillController(); 