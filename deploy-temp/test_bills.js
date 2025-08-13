import { sequelize } from './config/database.js';
import './models/associations.js';
import { Bill } from './models/associations.js';

async function testBills() {
  try {
    console.log('🔍 Testing Bill model directly...');
    
    // Test 1: Count all bills
    const totalBills = await Bill.count();
    console.log(`📊 Total bills in database: ${totalBills}`);
    
    // Test 2: Count active bills
    const activeBills = await Bill.count({ where: { isActive: true } });
    console.log(`📊 Active bills: ${activeBills}`);
    
    // Test 3: Get all bills without any conditions
    const allBills = await Bill.findAll({ limit: 5 });
    console.log(`📊 All bills (first 5): ${allBills.length}`);
    
    if (allBills.length > 0) {
      console.log('📋 Sample bill data:');
      console.log(JSON.stringify(allBills[0].toJSON(), null, 2));
    }
    
    // Test 4: Check if isActive field exists
    const sampleBill = await Bill.findOne();
    if (sampleBill) {
      console.log('📋 Bill fields:');
      console.log(Object.keys(sampleBill.toJSON()));
    }
    
  } catch (error) {
    console.error('❌ Error testing bills:', error);
  } finally {
    await sequelize.close();
  }
}

testBills(); 