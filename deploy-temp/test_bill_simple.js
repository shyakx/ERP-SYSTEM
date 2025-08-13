import { sequelize } from './config/database.js';
import './models/associations.js';
import { Bill } from './models/associations.js';

async function testBillSimple() {
  try {
    console.log('🔍 Testing Bill model import...');
    console.log('📊 Bill model type:', typeof Bill);
    console.log('📊 Bill model:', Bill);
    
    // Test basic count
    const count = await Bill.count();
    console.log('📊 Total bills:', count);
    
    // Test findOne
    const oneBill = await Bill.findOne();
    console.log('📊 One bill:', oneBill ? 'Found' : 'Not found');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sequelize.close();
  }
}

testBillSimple(); 