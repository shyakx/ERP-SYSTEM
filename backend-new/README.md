# DICEL ERP Backend

A fresh, simple backend API for the DICEL ERP system built with Node.js and Express.

## 🚀 Features

- **Authentication**: JWT-based authentication with login/register
- **Employee Management**: CRUD operations for employees
- **HR Functions**: Job postings, candidates, training, leave, attendance
- **Performance & Payroll**: Performance reviews and payroll management
- **Chat/Messaging**: Basic messaging system
- **Finance**: Transaction management
- **Mock Data**: Pre-populated with realistic data for testing

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

3. **Access the API**:
   - Server: `http://localhost:5000`
   - Health check: `http://localhost:5000/api/health`

## 🔐 Authentication

### Default Users

| Username | Password | Role |
|----------|----------|------|
| `admin`  | `password` | Admin |
| `hr`     | `password` | HR Manager |

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}
```

### Register

```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "hr"
}
```

## 📊 API Endpoints

### Health Check
- `GET /api/health` - Server status

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Employees
- `GET /api/employees/test` - List employees
- `GET /api/employees/test/stats` - Employee statistics

### Job Postings
- `GET /api/job-postings/test` - List job postings
- `GET /api/job-postings/test/stats` - Job posting statistics

### Candidates
- `GET /api/candidates/test` - List candidates
- `GET /api/candidates/test/stats` - Candidate statistics

### Training
- `GET /api/training/courses/test` - List training courses
- `GET /api/training/test/stats` - Training statistics

### Leave Management
- `GET /api/leave/requests/test` - List leave requests
- `GET /api/leave/test/stats` - Leave statistics

### Attendance
- `GET /api/attendance/test` - List attendance records
- `GET /api/attendance/test/stats` - Attendance statistics

### Performance
- `GET /api/performance/test` - List performance reviews
- `GET /api/performance/test/stats` - Performance statistics

### Payroll
- `GET /api/payroll/test` - List payroll records
- `GET /api/payroll/test/stats` - Payroll statistics

### Benefits
- `GET /api/benefits/test/stats` - Benefits statistics

### Compliance
- `GET /api/compliance/test/stats` - Compliance statistics

### Reports
- `GET /api/reports/test/stats` - Reports statistics

### Settings
- `GET /api/settings/test/stats` - Settings statistics

### Chat/Messaging
- `GET /api/chat/conversations` - List conversations
- `GET /api/chat/stats` - Chat statistics

### Finance
- `GET /api/transactions/test` - List transactions

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
JWT_SECRET=your-secret-key-here
```

## 📝 Usage Examples

### Testing with curl

1. **Health Check**:
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Login**:
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"password"}'
   ```

3. **Get Employees (with token)**:
   ```bash
   curl http://localhost:5000/api/employees/test \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

## 🎯 Frontend Integration

The frontend is configured to connect to this backend at `http://localhost:5000/api`. 

**Login Credentials for Frontend**:
- Username: `admin` or `hr`
- Password: `password`

## 🚨 Security Notes

- This is a development setup with mock data
- JWT secret is hardcoded for simplicity
- No database persistence (data resets on server restart)
- CORS is enabled for all origins

## 🔄 Next Steps

1. **Add Database**: Integrate PostgreSQL or MongoDB
2. **Add Validation**: Enhanced input validation
3. **Add File Upload**: For documents and images
4. **Add Real-time**: WebSocket for chat
5. **Add Testing**: Unit and integration tests
6. **Add Logging**: Proper logging system
7. **Add Rate Limiting**: API rate limiting
8. **Add Caching**: Redis for performance

## 📞 Support

For issues or questions, contact the development team. 