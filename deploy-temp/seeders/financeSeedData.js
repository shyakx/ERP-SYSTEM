import { 
  Transaction, 
  Account, 
  Vendor, 
  Customer, 
  Invoice, 
  Bill, 
  Expense, 
  Budget, 
  TaxRecord,
  User 
} from '../models/associations.js';

export const seedFinanceData = async () => {
  try {
    console.log('🌱 Seeding Finance data...');

    // Get a user for createdBy fields
    const user = await User.findOne();
    if (!user) {
      console.log('⚠️ No user found for Finance seeding. Skipping...');
      return;
    }

    // Seed Accounts
    const accounts = await seedAccounts(user.id);
    console.log(`✅ Seeded ${accounts.length} accounts`);

    // Seed Vendors
    const vendors = await seedVendors(user.id);
    console.log(`✅ Seeded ${vendors.length} vendors`);

    // Seed Customers
    const customers = await seedCustomers(user.id);
    console.log(`✅ Seeded ${customers.length} customers`);

    // Seed Transactions
    const transactions = await seedTransactions(user.id, accounts, vendors, customers);
    console.log(`✅ Seeded ${transactions.length} transactions`);

    // Seed Invoices
    const invoices = await seedInvoices(user.id, customers);
    console.log(`✅ Seeded ${invoices.length} invoices`);

    // Seed Bills
    const bills = await seedBills(user.id, vendors);
    console.log(`✅ Seeded ${bills.length} bills`);

    // Seed Expenses
    const expenses = await seedExpenses(user.id, vendors);
    console.log(`✅ Seeded ${expenses.length} expenses`);

    // Seed Budgets
    const budgets = await seedBudgets(user.id);
    console.log(`✅ Seeded ${budgets.length} budgets`);

    // Seed Tax Records
    const taxRecords = await seedTaxRecords(user.id);
    console.log(`✅ Seeded ${taxRecords.length} tax records`);

    console.log('✅ Finance data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding Finance data:', error);
    throw error;
  }
};

const seedAccounts = async (userId) => {
  const accountData = [
    {
      accountNumber: 'ACC001',
      name: 'Main Bank Account',
      type: 'bank',
      category: 'Operating Account',
      bankName: 'Bank of Kigali',
      bankBranch: 'Kigali Main Branch',
      swiftCode: 'BKIGRWRW',
      iban: 'RW12345678901234567890123456',
      currency: 'RWF',
      openingBalance: 50000000,
      currentBalance: 50000000,
      creditLimit: 100000000,
      interestRate: 2.5,
      accountHolder: 'DICEL Security Services Ltd',
      contactPerson: 'Finance Manager',
      phone: '+250788123456',
      email: 'finance@dicel.com',
      address: '123 Business District, Kigali, Rwanda',
      status: 'active',
      createdBy: userId
    },
    {
      accountNumber: 'ACC002',
      name: 'Cash Account',
      type: 'cash',
      category: 'Petty Cash',
      currency: 'RWF',
      openingBalance: 5000000,
      currentBalance: 5000000,
      accountHolder: 'DICEL Security Services Ltd',
      status: 'active',
      createdBy: userId
    },
    {
      accountNumber: 'ACC003',
      name: 'Accounts Receivable',
      type: 'receivable',
      category: 'Customer Invoices',
      currency: 'RWF',
      openingBalance: 25000000,
      currentBalance: 25000000,
      status: 'active',
      createdBy: userId
    },
    {
      accountNumber: 'ACC004',
      name: 'Accounts Payable',
      type: 'payable',
      category: 'Vendor Bills',
      currency: 'RWF',
      openingBalance: 15000000,
      currentBalance: 15000000,
      status: 'active',
      createdBy: userId
    },
    {
      accountNumber: 'ACC005',
      name: 'Revenue Account',
      type: 'revenue',
      category: 'Service Revenue',
      currency: 'RWF',
      openingBalance: 0,
      currentBalance: 0,
      status: 'active',
      createdBy: userId
    },
    {
      accountNumber: 'ACC006',
      name: 'Expense Account',
      type: 'expense',
      category: 'Operating Expenses',
      currency: 'RWF',
      openingBalance: 0,
      currentBalance: 0,
      status: 'active',
      createdBy: userId
    }
  ];

  const accounts = [];
  for (const data of accountData) {
    const [account] = await Account.findOrCreate({
      where: { name: data.name },
      defaults: data
    });
    accounts.push(account);
  }
  return accounts;
};

const seedVendors = async (userId) => {
  const vendorData = [
    {
      vendorCode: 'VEND001',
      name: 'Tech Solutions Ltd',
      companyName: 'Tech Solutions Ltd',
      category: 'IT Services',
      subcategory: 'Software',
      contactPerson: 'John Tech',
      phone: '+250788111111',
      email: 'john@techsolutions.rw',
      website: 'www.techsolutions.rw',
      address: '456 Tech Street, Kigali',
      city: 'Kigali',
      country: 'Rwanda',
      postalCode: '00001',
      taxId: 'TIN123456789',
      registrationNumber: 'REG123456',
      paymentTerms: 30,
      creditLimit: 10000000,
      currentBalance: 8500000,
      preferredPaymentMethod: 'bank_transfer',
      bankName: 'Bank of Kigali',
      bankAccount: '1234567890',
      swiftCode: 'BKIGRWRW',
      status: 'active',
      rating: 4,
      createdBy: userId
    },
    {
      vendorCode: 'VEND002',
      name: 'Office Supplies Co',
      companyName: 'Office Supplies Co',
      category: 'Supplies',
      subcategory: 'Office Equipment',
      contactPerson: 'Mary Supplies',
      phone: '+250788222222',
      email: 'mary@officesupplies.rw',
      website: 'www.officesupplies.rw',
      address: '789 Supply Avenue, Kigali',
      city: 'Kigali',
      country: 'Rwanda',
      postalCode: '00002',
      taxId: 'TIN987654321',
      registrationNumber: 'REG654321',
      paymentTerms: 15,
      creditLimit: 5000000,
      currentBalance: 3200000,
      preferredPaymentMethod: 'bank_transfer',
      bankName: 'Ecobank Rwanda',
      bankAccount: '0987654321',
      swiftCode: 'ECOCRWRW',
      status: 'active',
      rating: 5,
      createdBy: userId
    },
    {
      vendorCode: 'VEND003',
      name: 'Security Equipment',
      companyName: 'Security Equipment Ltd',
      category: 'Equipment',
      subcategory: 'Security Cameras',
      contactPerson: 'Peter Security',
      phone: '+250788333333',
      email: 'peter@securityequipment.rw',
      website: 'www.securityequipment.rw',
      address: '321 Security Road, Kigali',
      city: 'Kigali',
      country: 'Rwanda',
      postalCode: '00003',
      taxId: 'TIN456789123',
      registrationNumber: 'REG789123',
      paymentTerms: 45,
      creditLimit: 20000000,
      currentBalance: 15600000,
      preferredPaymentMethod: 'bank_transfer',
      bankName: 'I&M Bank Rwanda',
      bankAccount: '1122334455',
      swiftCode: 'IMRWRWRW',
      status: 'active',
      rating: 4,
      createdBy: userId
    },
    {
      vendorCode: 'VEND004',
      name: 'Maintenance Services',
      companyName: 'Maintenance Services Ltd',
      category: 'Services',
      subcategory: 'Building Maintenance',
      contactPerson: 'Sarah Maintenance',
      phone: '+250788444444',
      email: 'sarah@maintenance.rw',
      website: 'www.maintenance.rw',
      address: '654 Maintenance Lane, Kigali',
      city: 'Kigali',
      country: 'Rwanda',
      postalCode: '00004',
      taxId: 'TIN789123456',
      registrationNumber: 'REG123789',
      paymentTerms: 30,
      creditLimit: 8000000,
      currentBalance: 4200000,
      preferredPaymentMethod: 'bank_transfer',
      bankName: 'Bank of Kigali',
      bankAccount: '5566778899',
      swiftCode: 'BKIGRWRW',
      status: 'active',
      rating: 3,
      createdBy: userId
    },
    {
      vendorCode: 'VEND005',
      name: 'Marketing Agency',
      companyName: 'Marketing Agency Ltd',
      category: 'Marketing',
      subcategory: 'Digital Marketing',
      contactPerson: 'David Marketing',
      phone: '+250788555555',
      email: 'david@marketing.rw',
      website: 'www.marketing.rw',
      address: '987 Marketing Street, Kigali',
      city: 'Kigali',
      country: 'Rwanda',
      postalCode: '00005',
      taxId: 'TIN321654987',
      registrationNumber: 'REG321654',
      paymentTerms: 30,
      creditLimit: 12000000,
      currentBalance: 6800000,
      preferredPaymentMethod: 'bank_transfer',
      bankName: 'Ecobank Rwanda',
      bankAccount: '9988776655',
      swiftCode: 'ECOCRWRW',
      status: 'active',
      rating: 4,
      createdBy: userId
    }
  ];

  const vendors = [];
  for (const data of vendorData) {
    const [vendor] = await Vendor.findOrCreate({
      where: { name: data.name },
      defaults: data
    });
    vendors.push(vendor);
  }
  return vendors;
};

const seedCustomers = async (userId) => {
  const customerData = [
    {
      customerCode: 'CUST001',
      name: 'ABC Corporation',
      companyName: 'ABC Corporation Ltd',
      type: 'business',
      category: 'Corporate',
      subcategory: 'Large Business',
      contactPerson: 'Alice Corporate',
      phone: '+250788666666',
      email: 'alice@abc.com',
      website: 'www.abc.com',
      address: '123 Corporate Plaza, Kigali',
      city: 'Kigali',
      country: 'Rwanda',
      postalCode: '00006',
      taxId: 'TIN111222333',
      registrationNumber: 'REG111222',
      paymentTerms: 30,
      creditLimit: 50000000,
      currentBalance: 25000000,
      preferredPaymentMethod: 'bank_transfer',
      bankName: 'Bank of Kigali',
      bankAccount: '111122223333',
      swiftCode: 'BKIGRWRW',
      status: 'active',
      rating: 5,
      source: 'referral',
      createdBy: userId
    },
    {
      customerCode: 'CUST002',
      name: 'XYZ Business',
      companyName: 'XYZ Business Ltd',
      type: 'business',
      category: 'Corporate',
      subcategory: 'Medium Business',
      contactPerson: 'Bob Business',
      phone: '+250788777777',
      email: 'bob@xyz.com',
      website: 'www.xyz.com',
      address: '456 Business Center, Kigali',
      city: 'Kigali',
      country: 'Rwanda',
      postalCode: '00007',
      taxId: 'TIN444555666',
      registrationNumber: 'REG444555',
      paymentTerms: 30,
      creditLimit: 30000000,
      currentBalance: 18000000,
      preferredPaymentMethod: 'bank_transfer',
      bankName: 'Ecobank Rwanda',
      bankAccount: '444455556666',
      swiftCode: 'ECOCRWRW',
      status: 'active',
      rating: 4,
      source: 'website',
      createdBy: userId
    },
    {
      customerCode: 'CUST003',
      name: 'Kigali Business Center',
      companyName: 'Kigali Business Center Ltd',
      type: 'business',
      category: 'Retail',
      subcategory: 'Shopping Center',
      contactPerson: 'Carol Center',
      phone: '+250788888888',
      email: 'carol@kbc.com',
      website: 'www.kbc.com',
      address: '789 Shopping District, Kigali',
      city: 'Kigali',
      country: 'Rwanda',
      postalCode: '00008',
      taxId: 'TIN777888999',
      registrationNumber: 'REG777888',
      paymentTerms: 30,
      creditLimit: 40000000,
      currentBalance: 32000000,
      preferredPaymentMethod: 'bank_transfer',
      bankName: 'I&M Bank Rwanda',
      bankAccount: '777788889999',
      swiftCode: 'IMRWRWRW',
      status: 'active',
      rating: 4,
      source: 'advertisement',
      createdBy: userId
    },
    {
      customerCode: 'CUST004',
      name: 'Government Ministry',
      companyName: 'Ministry of Security',
      type: 'government',
      category: 'Government',
      subcategory: 'Ministry',
      contactPerson: 'David Government',
      phone: '+250788999999',
      email: 'david@government.rw',
      website: 'www.government.rw',
      address: 'Government Building, Kigali',
      city: 'Kigali',
      country: 'Rwanda',
      postalCode: '00009',
      taxId: 'TIN000111222',
      registrationNumber: 'REG000111',
      paymentTerms: 60,
      creditLimit: 100000000,
      currentBalance: 45000000,
      preferredPaymentMethod: 'bank_transfer',
      bankName: 'Bank of Kigali',
      bankAccount: '000011112222',
      swiftCode: 'BKIGRWRW',
      status: 'active',
      rating: 5,
      source: 'referral',
      createdBy: userId
    },
    {
      customerCode: 'CUST005',
      name: 'John Smith',
      companyName: null,
      type: 'individual',
      category: 'Individual',
      subcategory: 'Residential',
      contactPerson: 'John Smith',
      phone: '+250788000000',
      email: 'john.smith@email.com',
      website: null,
      address: '123 Residential Street, Kigali',
      city: 'Kigali',
      country: 'Rwanda',
      postalCode: '00010',
      taxId: 'TIN333444555',
      registrationNumber: null,
      paymentTerms: 15,
      creditLimit: 5000000,
      currentBalance: 2500000,
      preferredPaymentMethod: 'mobile_money',
      bankName: null,
      bankAccount: null,
      swiftCode: null,
      status: 'active',
      rating: 4,
      source: 'website',
      createdBy: userId
    }
  ];

  const customers = [];
  for (const data of customerData) {
    const [customer] = await Customer.findOrCreate({
      where: { name: data.name },
      defaults: data
    });
    customers.push(customer);
  }
  return customers;
};

const seedTransactions = async (userId, accounts, vendors, customers) => {
  const transactionData = [
    {
      transactionNumber: 'TXN001',
      type: 'income',
      category: 'Service Revenue',
      subcategory: 'Security Services',
      description: 'Security Service Payment - ABC Corp',
      amount: 25000000,
      currency: 'RWF',
      accountId: accounts[0].id, // Main Bank Account
      customerId: customers[0].id,
      transactionDate: new Date('2024-01-15'),
      status: 'completed',
      paymentMethod: 'bank_transfer',
      referenceNumber: 'REF001',
      notes: 'Monthly security service payment',
      createdBy: userId
    },
    {
      transactionNumber: 'TXN002',
      type: 'expense',
      category: 'Equipment & Technology',
      subcategory: 'Security Cameras',
      description: 'Equipment Purchase - Security Cameras',
      amount: 12500000,
      currency: 'RWF',
      accountId: accounts[0].id, // Main Bank Account
      vendorId: vendors[2].id,
      transactionDate: new Date('2024-01-14'),
      status: 'completed',
      paymentMethod: 'bank_transfer',
      referenceNumber: 'REF002',
      notes: 'Purchase of security camera system',
      createdBy: userId
    },
    {
      transactionNumber: 'TXN003',
      type: 'income',
      category: 'Service Revenue',
      subcategory: 'Security Services',
      description: 'Monthly Contract - XYZ Business',
      amount: 18750000,
      currency: 'RWF',
      accountId: accounts[0].id, // Main Bank Account
      customerId: customers[1].id,
      transactionDate: new Date('2024-01-13'),
      status: 'pending',
      paymentMethod: 'bank_transfer',
      referenceNumber: 'REF003',
      notes: 'Monthly security contract payment',
      createdBy: userId
    },
    {
      transactionNumber: 'TXN004',
      type: 'expense',
      category: 'Personnel & Salaries',
      subcategory: 'Employee Payroll',
      description: 'Employee Payroll',
      amount: 125000000,
      currency: 'RWF',
      accountId: accounts[0].id, // Main Bank Account
      transactionDate: new Date('2024-01-12'),
      status: 'completed',
      paymentMethod: 'bank_transfer',
      referenceNumber: 'REF004',
      notes: 'Monthly employee payroll',
      createdBy: userId
    },
    {
      transactionNumber: 'TXN005',
      type: 'expense',
      category: 'Operations & Maintenance',
      subcategory: 'Office Supplies',
      description: 'Office Supplies Purchase',
      amount: 850000,
      currency: 'RWF',
      accountId: accounts[0].id, // Main Bank Account
      vendorId: vendors[1].id,
      transactionDate: new Date('2024-01-11'),
      status: 'completed',
      paymentMethod: 'bank_transfer',
      referenceNumber: 'REF005',
      notes: 'Office supplies for the month',
      createdBy: userId
    }
  ];

  const transactions = [];
  for (const data of transactionData) {
    const [transaction] = await Transaction.findOrCreate({
      where: { 
        description: data.description,
        transactionDate: data.transactionDate
      },
      defaults: data
    });
    transactions.push(transaction);
  }
  return transactions;
};

const seedInvoices = async (userId, customers) => {
  const invoiceData = [
    {
      customerId: customers[0].id,
      customerName: customers[0].name,
      type: 'service',
      description: 'Security Services - January 2024',
      subtotal: 25000000,
      taxAmount: 2500000,
      discountAmount: 0,
      totalAmount: 27500000,
      currency: 'RWF',
      issueDate: new Date('2024-01-01'),
      dueDate: new Date('2024-01-31'),
      paymentTerms: 30,
      status: 'paid',
      paidAmount: 27500000,
      remainingAmount: 0,
      paymentMethod: 'bank_transfer',
      referenceNumber: 'INV001',
      notes: 'Monthly security services invoice',
      createdBy: userId
    },
    {
      customerId: customers[1].id,
      customerName: customers[1].name,
      type: 'service',
      description: 'Security Services - January 2024',
      subtotal: 18750000,
      taxAmount: 1875000,
      discountAmount: 0,
      totalAmount: 20625000,
      currency: 'RWF',
      issueDate: new Date('2024-01-01'),
      dueDate: new Date('2024-01-31'),
      paymentTerms: 30,
      status: 'sent',
      paidAmount: 0,
      remainingAmount: 20625000,
      paymentMethod: null,
      referenceNumber: 'INV002',
      notes: 'Monthly security services invoice',
      createdBy: userId
    },
    {
      customerId: customers[2].id,
      customerName: customers[2].name,
      type: 'service',
      description: 'Security Services - January 2024',
      subtotal: 32000000,
      taxAmount: 3200000,
      discountAmount: 0,
      totalAmount: 35200000,
      currency: 'RWF',
      issueDate: new Date('2024-01-01'),
      dueDate: new Date('2024-01-31'),
      paymentTerms: 30,
      status: 'overdue',
      paidAmount: 0,
      remainingAmount: 35200000,
      paymentMethod: null,
      referenceNumber: 'INV003',
      notes: 'Monthly security services invoice',
      createdBy: userId
    }
  ];

  const invoices = [];
  for (const data of invoiceData) {
    const [invoice] = await Invoice.findOrCreate({
      where: { 
        invoiceNumber: data.referenceNumber
      },
      defaults: data
    });
    invoices.push(invoice);
  }
  return invoices;
};

const seedBills = async (userId, vendors) => {
  const billData = [
    {
      vendorId: vendors[0].id,
      vendorName: vendors[0].name,
      vendorInvoiceNumber: 'VIN001',
      type: 'service',
      description: 'Software License - Annual',
      subtotal: 2500000,
      taxAmount: 250000,
      discountAmount: 0,
      totalAmount: 2750000,
      currency: 'RWF',
      issueDate: new Date('2024-01-15'),
      dueDate: new Date('2024-02-28'),
      paymentTerms: 30,
      status: 'received',
      paidAmount: 0,
      remainingAmount: 2750000,
      paymentMethod: null,
      referenceNumber: 'BILL001',
      notes: 'Annual software license renewal',
      createdBy: userId
    },
    {
      vendorId: vendors[1].id,
      vendorName: vendors[1].name,
      vendorInvoiceNumber: 'VIN002',
      type: 'product',
      description: 'Office Supplies - January',
      subtotal: 850000,
      taxAmount: 85000,
      discountAmount: 0,
      totalAmount: 935000,
      currency: 'RWF',
      issueDate: new Date('2024-01-20'),
      dueDate: new Date('2024-02-25'),
      paymentTerms: 15,
      status: 'overdue',
      paidAmount: 0,
      remainingAmount: 935000,
      paymentMethod: null,
      referenceNumber: 'BILL002',
      notes: 'Office supplies for January',
      createdBy: userId
    },
    {
      vendorId: vendors[2].id,
      vendorName: vendors[2].name,
      vendorInvoiceNumber: 'VIN003',
      type: 'product',
      description: 'Security Camera System',
      subtotal: 4200000,
      taxAmount: 420000,
      discountAmount: 0,
      totalAmount: 4620000,
      currency: 'RWF',
      issueDate: new Date('2024-01-25'),
      dueDate: new Date('2024-03-05'),
      paymentTerms: 45,
      status: 'received',
      paidAmount: 0,
      remainingAmount: 4620000,
      paymentMethod: null,
      referenceNumber: 'BILL003',
      notes: 'Security camera system installation',
      createdBy: userId
    }
  ];

  const bills = [];
  for (const data of billData) {
    const [bill] = await Bill.findOrCreate({
      where: { 
        billNumber: data.referenceNumber
      },
      defaults: data
    });
    bills.push(bill);
  }
  return bills;
};

const seedExpenses = async (userId, vendors) => {
  const expenseData = [
    {
      category: 'Equipment & Technology',
      subcategory: 'Security Equipment',
      description: 'Security Equipment Purchase',
      amount: 850000,
      currency: 'RWF',
      expenseDate: new Date('2024-02-15'),
      receiptNumber: 'REC-2024-001',
      vendorId: vendors[2].id,
      vendorName: vendors[2].name,
      employeeName: 'John Doe',
      department: 'Operations',
      status: 'approved',
      priority: 'medium',
      paymentMethod: 'bank_transfer',
      referenceNumber: 'EXP001',
      notes: 'Security equipment for new client',
      submittedBy: userId,
      approvedBy: userId,
      approvedAt: new Date('2024-02-16')
    },
    {
      category: 'Operations & Maintenance',
      subcategory: 'Office Supplies',
      description: 'Office Supplies',
      amount: 125000,
      currency: 'RWF',
      expenseDate: new Date('2024-02-14'),
      receiptNumber: 'REC-2024-002',
      vendorId: vendors[1].id,
      vendorName: vendors[1].name,
      employeeName: 'Jane Smith',
      department: 'Administration',
      status: 'submitted',
      priority: 'low',
      paymentMethod: null,
      referenceNumber: 'EXP002',
      notes: 'Office supplies for daily operations',
      submittedBy: userId
    },
    {
      category: 'Utilities & Rent',
      subcategory: 'Internet & Phone',
      description: 'Monthly Internet & Phone',
      amount: 45000,
      currency: 'RWF',
      expenseDate: new Date('2024-02-13'),
      receiptNumber: 'REC-2024-003',
      vendorName: 'Internet Provider',
      employeeName: 'Mike Johnson',
      department: 'IT',
      status: 'approved',
      priority: 'medium',
      paymentMethod: 'bank_transfer',
      referenceNumber: 'EXP003',
      notes: 'Monthly internet and phone services',
      submittedBy: userId,
      approvedBy: userId,
      approvedAt: new Date('2024-02-14')
    }
  ];

  const expenses = [];
  for (const data of expenseData) {
    const [expense] = await Expense.findOrCreate({
      where: { 
        expenseNumber: data.referenceNumber
      },
      defaults: data
    });
    expenses.push(expense);
  }
  return expenses;
};

const seedBudgets = async (userId) => {
  const budgetData = [
    {
      budgetNumber: 'BUD001',
      name: 'Personnel & Salaries Budget 2024',
      category: 'Personnel & Salaries',
      subcategory: 'Employee Salaries',
      type: 'expense',
      period: 'yearly',
      year: 2024,
      allocatedAmount: 85000000,
      spentAmount: 72000000,
      remainingAmount: 13000000,
      currency: 'RWF',
      department: 'HR',
      status: 'active',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      notes: 'Annual budget for employee salaries',
      createdBy: userId,
      approvedBy: userId,
      approvedAt: new Date('2024-01-01')
    },
    {
      budgetNumber: 'BUD002',
      name: 'Operations & Maintenance Budget 2024',
      category: 'Operations & Maintenance',
      subcategory: 'General Operations',
      type: 'expense',
      period: 'yearly',
      year: 2024,
      allocatedAmount: 45000000,
      spentAmount: 38000000,
      remainingAmount: 7000000,
      currency: 'RWF',
      department: 'Operations',
      status: 'active',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      notes: 'Annual budget for operations and maintenance',
      createdBy: userId,
      approvedBy: userId,
      approvedAt: new Date('2024-01-01')
    },
    {
      budgetNumber: 'BUD003',
      name: 'Equipment & Technology Budget 2024',
      category: 'Equipment & Technology',
      subcategory: 'IT Equipment',
      type: 'expense',
      period: 'yearly',
      year: 2024,
      allocatedAmount: 25000000,
      spentAmount: 28000000,
      remainingAmount: -3000000,
      currency: 'RWF',
      department: 'IT',
      status: 'active',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      notes: 'Annual budget for equipment and technology',
      createdBy: userId,
      approvedBy: userId,
      approvedAt: new Date('2024-01-01')
    }
  ];

  const budgets = [];
  for (const data of budgetData) {
    const [budget] = await Budget.findOrCreate({
      where: { 
        name: data.name,
        year: data.year
      },
      defaults: data
    });
    budgets.push(budget);
  }
  return budgets;
};

const seedTaxRecords = async (userId) => {
  const taxRecordData = [
    {
      type: 'vat',
      period: 'monthly',
      year: 2024,
      month: 1,
      taxableAmount: 50000000,
      taxRate: 18.0,
      taxAmount: 9000000,
      currency: 'RWF',
      status: 'filed',
      dueDate: new Date('2024-02-20'),
      filedDate: new Date('2024-02-15'),
      paidDate: new Date('2024-02-18'),
      paymentMethod: 'bank_transfer',
      referenceNumber: 'TAX001',
      notes: 'VAT for January 2024',
      calculatedBy: userId,
      filedBy: userId,
      paidBy: userId
    },
    {
      type: 'income_tax',
      period: 'monthly',
      year: 2024,
      month: 1,
      taxableAmount: 150000000,
      taxRate: 30.0,
      taxAmount: 45000000,
      currency: 'RWF',
      status: 'calculated',
      dueDate: new Date('2024-03-15'),
      filedDate: null,
      paidDate: null,
      paymentMethod: null,
      referenceNumber: 'TAX002',
      notes: 'Income tax for January 2024',
      calculatedBy: userId
    },
    {
      type: 'withholding_tax',
      period: 'monthly',
      year: 2024,
      month: 1,
      taxableAmount: 25000000,
      taxRate: 15.0,
      taxAmount: 3750000,
      currency: 'RWF',
      status: 'paid',
      dueDate: new Date('2024-02-15'),
      filedDate: new Date('2024-02-10'),
      paidDate: new Date('2024-02-12'),
      paymentMethod: 'bank_transfer',
      referenceNumber: 'TAX003',
      notes: 'Withholding tax for January 2024',
      calculatedBy: userId,
      filedBy: userId,
      paidBy: userId
    }
  ];

  const taxRecords = [];
  for (const data of taxRecordData) {
    const [taxRecord] = await TaxRecord.findOrCreate({
      where: { 
        taxNumber: data.referenceNumber
      },
      defaults: data
    });
    taxRecords.push(taxRecord);
  }
  return taxRecords;
}; 