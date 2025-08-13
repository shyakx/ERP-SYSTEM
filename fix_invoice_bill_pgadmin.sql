-- Fix Invoice and Bill Tables - pgAdmin SQL Script
-- Run this in pgAdmin to fix the missing tables and data

-- 1. Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('Invoices', 'Bills');

-- 2. Create Invoices table if it doesn't exist
CREATE TABLE IF NOT EXISTS "Invoices" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "invoiceNumber" VARCHAR(255) UNIQUE NOT NULL,
    "customerId" UUID NOT NULL,
    "customerName" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) DEFAULT 'service',
    "description" TEXT NOT NULL,
    "subtotal" DECIMAL(15,2) NOT NULL,
    "taxAmount" DECIMAL(15,2) DEFAULT 0,
    "discountAmount" DECIMAL(15,2) DEFAULT 0,
    "totalAmount" DECIMAL(15,2) NOT NULL,
    "currency" VARCHAR(3) DEFAULT 'RWF',
    "issueDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP NOT NULL,
    "paymentTerms" INTEGER DEFAULT 30,
    "status" VARCHAR(50) DEFAULT 'draft',
    "paidAmount" DECIMAL(15,2) DEFAULT 0,
    "remainingAmount" DECIMAL(15,2) NOT NULL,
    "paymentMethod" VARCHAR(50),
    "referenceNumber" VARCHAR(255),
    "notes" TEXT,
    "terms" TEXT,
    "attachments" JSONB,
    "sentAt" TIMESTAMP,
    "paidAt" TIMESTAMP,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create Bills table if it doesn't exist
CREATE TABLE IF NOT EXISTS "Bills" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "billNumber" VARCHAR(255) UNIQUE NOT NULL,
    "vendorId" UUID NOT NULL,
    "vendorName" VARCHAR(255) NOT NULL,
    "vendorInvoiceNumber" VARCHAR(255),
    "type" VARCHAR(50) DEFAULT 'service',
    "description" TEXT NOT NULL,
    "subtotal" DECIMAL(15,2) NOT NULL,
    "taxAmount" DECIMAL(15,2) DEFAULT 0,
    "discountAmount" DECIMAL(15,2) DEFAULT 0,
    "totalAmount" DECIMAL(15,2) NOT NULL,
    "currency" VARCHAR(3) DEFAULT 'RWF',
    "issueDate" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP NOT NULL,
    "paymentTerms" INTEGER DEFAULT 30,
    "status" VARCHAR(50) DEFAULT 'draft',
    "paidAmount" DECIMAL(15,2) DEFAULT 0,
    "remainingAmount" DECIMAL(15,2) NOT NULL,
    "paymentMethod" VARCHAR(50),
    "referenceNumber" VARCHAR(255),
    "notes" TEXT,
    "terms" TEXT,
    "attachments" JSONB,
    "receivedAt" TIMESTAMP,
    "paidAt" TIMESTAMP,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Insert sample invoice data
INSERT INTO "Invoices" (
    "invoiceNumber", "customerId", "customerName", "type", "description",
    "subtotal", "taxAmount", "discountAmount", "totalAmount", "currency",
    "issueDate", "dueDate", "paymentTerms", "status", "paidAmount", "remainingAmount",
    "paymentMethod", "referenceNumber", "notes", "isActive"
) VALUES 
(
    'INV001',
    '463bbf3c-f93d-411b-a9e3-62b778dd018b',
    'ABC Corporation',
    'service',
    'Security Services - Monthly Contract',
    500000.00,
    90000.00,
    0.00,
    590000.00,
    'RWF',
    '2024-08-01',
    '2024-08-31',
    30,
    'sent',
    0.00,
    590000.00,
    'bank_transfer',
    'REF001',
    'Monthly security services invoice',
    true
),
(
    'INV002',
    '463bbf3c-f93d-411b-a9e3-62b778dd018b',
    'ABC Corporation',
    'service',
    'Consulting Services - Q3 2024',
    750000.00,
    135000.00,
    50000.00,
    835000.00,
    'RWF',
    '2024-08-05',
    '2024-09-05',
    30,
    'draft',
    0.00,
    835000.00,
    'bank_transfer',
    'REF002',
    'Q3 consulting services',
    true
),
(
    'INV003',
    '463bbf3c-f93d-411b-a9e3-62b778dd018b',
    'ABC Corporation',
    'product',
    'Security Equipment - Cameras and Sensors',
    1200000.00,
    216000.00,
    0.00,
    1416000.00,
    'RWF',
    '2024-08-10',
    '2024-09-10',
    30,
    'sent',
    0.00,
    1416000.00,
    'bank_transfer',
    'REF003',
    'Security equipment purchase',
    true
)
ON CONFLICT ("invoiceNumber") DO NOTHING;

-- 5. Insert sample bill data
INSERT INTO "Bills" (
    "billNumber", "vendorId", "vendorName", "vendorInvoiceNumber", "type", "description",
    "subtotal", "taxAmount", "discountAmount", "totalAmount", "currency",
    "issueDate", "dueDate", "paymentTerms", "status", "paidAmount", "remainingAmount",
    "paymentMethod", "referenceNumber", "notes", "isActive"
) VALUES 
(
    'BILL001',
    'b26a3510-da34-45ef-aee0-d49be1317728',
    'Maintenance Services Ltd',
    'VINV001',
    'service',
    'Building Maintenance - August 2024',
    250000.00,
    45000.00,
    0.00,
    295000.00,
    'RWF',
    '2024-08-01',
    '2024-08-31',
    30,
    'received',
    0.00,
    295000.00,
    'bank_transfer',
    'VREF001',
    'Monthly building maintenance',
    true
),
(
    'BILL002',
    'b26a3510-da34-45ef-aee0-d49be1317728',
    'Maintenance Services Ltd',
    'VINV002',
    'service',
    'Equipment Repair Services',
    180000.00,
    32400.00,
    10000.00,
    202400.00,
    'RWF',
    '2024-08-05',
    '2024-09-05',
    30,
    'draft',
    0.00,
    202400.00,
    'bank_transfer',
    'VREF002',
    'Emergency equipment repair',
    true
),
(
    'BILL003',
    'b26a3510-da34-45ef-aee0-d49be1317728',
    'Maintenance Services Ltd',
    'VINV003',
    'product',
    'Cleaning Supplies - Monthly',
    75000.00,
    13500.00,
    0.00,
    88500.00,
    'RWF',
    '2024-08-10',
    '2024-09-10',
    30,
    'received',
    0.00,
    88500.00,
    'bank_transfer',
    'VREF003',
    'Monthly cleaning supplies',
    true
)
ON CONFLICT ("billNumber") DO NOTHING;

-- 6. Verify the data
SELECT 'Invoices' as table_name, COUNT(*) as record_count FROM "Invoices" WHERE "isActive" = true
UNION ALL
SELECT 'Bills' as table_name, COUNT(*) as record_count FROM "Bills" WHERE "isActive" = true;

-- 7. Show sample data
SELECT 'Invoices Sample' as info, "invoiceNumber", "customerName", "totalAmount", "status" FROM "Invoices" WHERE "isActive" = true LIMIT 3;
SELECT 'Bills Sample' as info, "billNumber", "vendorName", "totalAmount", "status" FROM "Bills" WHERE "isActive" = true LIMIT 3; 