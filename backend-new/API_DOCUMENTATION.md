# DICEL ERP - API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication
All API endpoints (except login/register) require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Register
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "employee"
}
```

---

## 👥 HR Department APIs

### Employees
- `GET /api/v1/hr/employees` - Get all employees
- `GET /api/v1/hr/employees/:id` - Get employee by ID
- `POST /api/v1/hr/employees` - Create new employee
- `PUT /api/v1/hr/employees/:id` - Update employee
- `DELETE /api/v1/hr/employees/:id` - Delete employee

### Leave Requests
- `GET /api/v1/hr/leave-requests` - Get all leave requests
- `POST /api/v1/hr/leave-requests` - Create leave request
- `PUT /api/v1/hr/leave-requests/:id/status` - Update leave request status

### Attendance
- `GET /api/v1/hr/attendance` - Get attendance records
- `POST /api/v1/hr/attendance` - Record attendance

### Payroll
- `GET /api/v1/hr/payroll` - Get payroll records
- `POST /api/v1/hr/payroll/generate` - Generate payroll

### Performance Reviews
- `GET /api/v1/hr/performance-reviews` - Get performance reviews
- `POST /api/v1/hr/performance-reviews` - Create performance review

### Training
- `GET /api/v1/hr/training-programs` - Get training programs
- `POST /api/v1/hr/training-programs` - Create training program
- `POST /api/v1/hr/training-enrollments` - Enroll in training

### Recruitment
- `GET /api/v1/hr/job-postings` - Get job postings
- `POST /api/v1/hr/job-postings` - Create job posting
- `GET /api/v1/hr/candidates` - Get candidates
- `POST /api/v1/hr/candidates` - Create candidate

### HR Statistics
- `GET /api/v1/hr/stats` - Get HR dashboard statistics

---

## 💰 Finance Department APIs

### Transactions
- `GET /api/v1/finance/transactions` - Get all transactions
- `POST /api/v1/finance/transactions` - Create transaction

### Financial Accounts
- `GET /api/v1/finance/accounts` - Get all accounts
- `POST /api/v1/finance/accounts` - Create account

### Expenses
- `GET /api/v1/finance/expenses` - Get all expenses
- `POST /api/v1/finance/expenses` - Create expense
- `PUT /api/v1/finance/expenses/:id/approve` - Approve expense

### Budgets
- `GET /api/v1/finance/budgets` - Get all budgets
- `POST /api/v1/finance/budgets` - Create budget

### Invoices
- `GET /api/v1/finance/invoices` - Get all invoices
- `POST /api/v1/finance/invoices` - Create invoice

### Accounts Receivable
- `GET /api/v1/finance/accounts-receivable` - Get accounts receivable
- `POST /api/v1/finance/accounts-receivable/:id/payment` - Record payment

### Accounts Payable
- `GET /api/v1/finance/accounts-payable` - Get accounts payable
- `POST /api/v1/finance/accounts-payable/:id/payment` - Record payment

### Financial Reports
- `POST /api/v1/finance/reports/generate` - Generate financial report

### Finance Statistics
- `GET /api/v1/finance/stats` - Get finance dashboard statistics

---

## 📦 Operations Department APIs

### Inventory Items
- `GET /api/v1/operations/inventory-items` - Get all inventory items
- `GET /api/v1/operations/inventory-items/:id` - Get inventory item by ID
- `POST /api/v1/operations/inventory-items` - Create inventory item
- `PUT /api/v1/operations/inventory-items/:id` - Update inventory item

### Inventory Transactions
- `GET /api/v1/operations/inventory-transactions` - Get inventory transactions
- `POST /api/v1/operations/inventory-transactions` - Create inventory transaction

### Suppliers
- `GET /api/v1/operations/suppliers` - Get all suppliers
- `POST /api/v1/operations/suppliers` - Create supplier

### Purchase Orders
- `GET /api/v1/operations/purchase-orders` - Get all purchase orders
- `POST /api/v1/operations/purchase-orders` - Create purchase order
- `PUT /api/v1/operations/purchase-orders/:id/status` - Update purchase order status

### Warehouses
- `GET /api/v1/operations/warehouses` - Get all warehouses
- `POST /api/v1/operations/warehouses` - Create warehouse

### Operations Statistics
- `GET /api/v1/operations/stats` - Get operations dashboard statistics

---

## 📈 Sales & Marketing APIs

### Leads
- `GET /api/v1/sales/leads` - Get all leads
- `GET /api/v1/sales/leads/:id` - Get lead by ID
- `POST /api/v1/sales/leads` - Create lead
- `PUT /api/v1/sales/leads/:id` - Update lead
- `POST /api/v1/sales/leads/:id/convert` - Convert lead to opportunity

### Opportunities
- `GET /api/v1/sales/opportunities` - Get all opportunities
- `GET /api/v1/sales/opportunities/:id` - Get opportunity by ID
- `POST /api/v1/sales/opportunities` - Create opportunity
- `PUT /api/v1/sales/opportunities/:id` - Update opportunity
- `PUT /api/v1/sales/opportunities/:id/stage` - Update opportunity stage

### Quotes
- `GET /api/v1/sales/quotes` - Get all quotes
- `POST /api/v1/sales/quotes` - Create quote
- `PUT /api/v1/sales/quotes/:id/status` - Update quote status

### Clients
- `GET /api/v1/sales/clients` - Get all clients
- `POST /api/v1/sales/clients` - Create client

### Marketing Campaigns
- `GET /api/v1/sales/marketing-campaigns` - Get all marketing campaigns
- `POST /api/v1/sales/marketing-campaigns` - Create marketing campaign

### Sales Statistics
- `GET /api/v1/sales/stats` - Get sales dashboard statistics

---

## 💻 IT Department APIs

### IT Assets
- `GET /api/v1/it/assets` - Get all IT assets
- `GET /api/v1/it/assets/:id` - Get IT asset by ID
- `POST /api/v1/it/assets` - Create IT asset
- `PUT /api/v1/it/assets/:id` - Update IT asset

### Support Tickets
- `GET /api/v1/it/support-tickets` - Get all support tickets
- `GET /api/v1/it/support-tickets/:id` - Get support ticket by ID
- `POST /api/v1/it/support-tickets` - Create support ticket
- `PUT /api/v1/it/support-tickets/:id` - Update support ticket
- `PUT /api/v1/it/support-tickets/:id/assign` - Assign support ticket
- `PUT /api/v1/it/support-tickets/:id/close` - Close support ticket

### Systems
- `GET /api/v1/it/systems` - Get all systems
- `POST /api/v1/it/systems` - Create system

### Network Devices
- `GET /api/v1/it/network-devices` - Get all network devices
- `POST /api/v1/it/network-devices` - Create network device

### Maintenance Schedules
- `GET /api/v1/it/maintenance-schedules` - Get all maintenance schedules
- `POST /api/v1/it/maintenance-schedules` - Create maintenance schedule
- `PUT /api/v1/it/maintenance-schedules/:id/status` - Update maintenance schedule status

### IT Statistics
- `GET /api/v1/it/stats` - Get IT dashboard statistics

---

## 🛡️ Security Department APIs

### Security Guards
- `GET /api/v1/security/guards` - Get all security guards
- `GET /api/v1/security/guards/:id` - Get security guard by ID
- `POST /api/v1/security/guards` - Create security guard
- `PUT /api/v1/security/guards/:id` - Update security guard

### Security Incidents
- `GET /api/v1/security/incidents` - Get all security incidents
- `GET /api/v1/security/incidents/:id` - Get security incident by ID
- `POST /api/v1/security/incidents` - Create security incident
- `PUT /api/v1/security/incidents/:id` - Update security incident
- `PUT /api/v1/security/incidents/:id/assign` - Assign incident to guard
- `PUT /api/v1/security/incidents/:id/close` - Close security incident

### Security Assignments
- `GET /api/v1/security/assignments` - Get all security assignments
- `POST /api/v1/security/assignments` - Create security assignment
- `PUT /api/v1/security/assignments/:id` - Update security assignment
- `PUT /api/v1/security/assignments/:id/status` - Update assignment status

### Security Statistics
- `GET /api/v1/security/stats` - Get security dashboard statistics

---

## 💬 Chat/Messaging APIs

### Conversations
- `GET /api/chat/conversations` - Get all conversations
- `POST /api/chat/conversations` - Create conversation
- `GET /api/chat/conversations/:id` - Get conversation by ID
- `PUT /api/chat/conversations/:id` - Update conversation
- `DELETE /api/chat/conversations/:id` - Delete conversation

### Messages
- `GET /api/chat/conversations/:id/messages` - Get messages in conversation
- `POST /api/chat/conversations/:id/messages` - Send message
- `PUT /api/chat/conversations/:id/messages/:messageId` - Update message
- `DELETE /api/chat/conversations/:id/messages/:messageId` - Delete message

### Reactions
- `POST /api/chat/conversations/:id/messages/:messageId/reactions` - Add reaction
- `DELETE /api/chat/conversations/:id/messages/:messageId/reactions/:reaction` - Remove reaction

### Typing Indicators
- `POST /api/chat/conversations/:id/typing` - Send typing indicator
- `GET /api/chat/conversations/:id/typing` - Get typing users

---

## 📊 Common Query Parameters

Most GET endpoints support these common query parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search term
- `status` - Filter by status
- `date_from` - Start date filter
- `date_to` - End date filter

### Example:
```http
GET /api/v1/hr/employees?page=1&limit=20&search=john&status=active
```

---

## 📝 Response Format

All API responses follow this format:

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // Response data here
  },
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

---

## 🔒 Role-Based Access Control

Different endpoints require different roles:

- **admin** - Full access to all endpoints
- **hr** - Access to HR-related endpoints
- **finance** - Access to finance-related endpoints
- **operations** - Access to operations-related endpoints
- **sales-marketing** - Access to sales and marketing endpoints
- **it** - Access to IT-related endpoints
- **security-guard-management** - Access to security-related endpoints
- **employee** - Limited access to personal data

---

## 🚀 Getting Started

1. **Start the server:**
   ```bash
   cd backend-new
   npm install
   npm run dev
   ```

2. **Test the API:**
   ```bash
   # Health check
   curl http://localhost:5000/health
   
   # Login
   curl -X POST http://localhost:5000/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@dicel.com","password":"password"}'
   ```

3. **Use the token in subsequent requests:**
   ```bash
   curl http://localhost:5000/api/v1/hr/employees \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

---

## 📋 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔧 Environment Variables

Create a `.env` file in the backend-new directory:

```env
PORT=5000
JWT_SECRET=your-secret-key-here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dicel_erp
DB_USER=your-db-user
DB_PASSWORD=your-db-password
FRONTEND_URL=http://localhost:3000
```

---

## 📚 Additional Resources

- [Database Schema Documentation](./DATABASE_SCHEMA.md)
- [Authentication Guide](./AUTHENTICATION.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [API Testing Collection](./api-tests.postman_collection.json)
