# DICEL ERP Backend API

A comprehensive Enterprise Resource Planning (ERP) backend system built with Node.js, Express, and PostgreSQL.

## 🚀 Features

### Core Modules
- **User Management**: Complete user authentication and authorization
- **Department Management**: Organizational structure management
- **Project Management**: Project lifecycle and task management
- **Asset Management**: Inventory and asset tracking
- **Document Management**: File upload and management
- **Chat System**: Internal messaging system
- **Dashboard Analytics**: Comprehensive reporting and analytics

### Technical Features
- **RESTful API**: Clean, well-structured endpoints
- **Authentication**: JWT-based authentication
- **Database**: PostgreSQL with Sequelize ORM
- **File Upload**: Multer-based file handling
- **Validation**: Input validation and sanitization
- **Error Handling**: Comprehensive error management
- **Pagination**: Efficient data pagination
- **Search & Filtering**: Advanced search capabilities
- **Analytics**: Real-time statistics and reporting

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5434
   DB_USER=postgres
   DB_PASS=0123
   DB_NAME=dicel_erp_development

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d

   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173

   # File Upload Configuration
   MAX_FILE_SIZE=10485760
   UPLOAD_PATH=./uploads
   ```

4. **Database Setup**
   ```bash
   # Create database
   createdb dicel_erp_development
   
   # Run migrations (automatic with sync)
   npm start
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `POST /api/departments` - Create department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department
- `GET /api/departments/:id/employees` - Get department employees
- `GET /api/departments/stats` - Get department statistics

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/stats` - Get project statistics
- `GET /api/projects/department/:departmentId` - Get projects by department

### Assets
- `GET /api/assets` - Get all assets
- `GET /api/assets/:id` - Get asset by ID
- `POST /api/assets` - Create asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset
- `GET /api/assets/stats` - Get asset statistics
- `GET /api/assets/maintenance/due` - Get maintenance due assets
- `GET /api/assets/department/:departmentId` - Get assets by department

### Dashboard
- `GET /api/dashboard/stats` - Get overall statistics
- `GET /api/dashboard/activities` - Get recent activities
- `GET /api/dashboard/analytics/departments` - Get department analytics
- `GET /api/dashboard/analytics/projects` - Get project analytics
- `GET /api/dashboard/analytics/assets` - Get asset analytics

### Documents
- `GET /api/documents` - Get all documents
- `POST /api/documents` - Upload document
- `GET /api/documents/:id` - Get document by ID
- `DELETE /api/documents/:id` - Delete document

### Chat
- `GET /api/chat` - Get chat messages
- `POST /api/chat` - Send message
- `GET /api/chat/:id` - Get message by ID

## 🗄️ Database Schema

### Core Tables
- **users**: User accounts and profiles
- **departments**: Organizational departments
- **projects**: Project management
- **tasks**: Project tasks and assignments
- **assets**: Asset and inventory management
- **documents**: File management
- **chat_messages**: Internal messaging

### Key Features
- **UUID Primary Keys**: Secure identifier generation
- **Soft Deletes**: Data preservation with isActive flags
- **Timestamps**: Automatic created_at and updated_at
- **Foreign Keys**: Proper relational integrity
- **Indexes**: Optimized query performance

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: BCrypt password encryption
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Cross-origin request handling
- **Rate Limiting**: API abuse prevention
- **File Upload Security**: Secure file handling

## 📈 Analytics & Reporting

### Dashboard Statistics
- User activity and engagement metrics
- Department performance analytics
- Project completion rates and timelines
- Asset utilization and maintenance tracking
- Financial budget and cost analysis

### Real-time Analytics
- Recent activity feeds
- Performance indicators
- Trend analysis
- Custom reporting

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables
Ensure all required environment variables are set in production:
- Database connection details
- JWT secret keys
- File upload configurations
- CORS settings

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 API Documentation

### Request/Response Format
All API responses follow a consistent format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful",
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

### Error Handling
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

## 🔧 Configuration

### Database Configuration
- **Host**: Database server address
- **Port**: Database port (default: 5434)
- **Database**: Database name
- **Username**: Database username
- **Password**: Database password

### JWT Configuration
- **Secret**: JWT signing secret
- **Expiration**: Token expiration time

### File Upload
- **Max Size**: Maximum file size (default: 10MB)
- **Upload Path**: File storage directory
- **Allowed Types**: Supported file types

## 📞 Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 📄 License

This project is licensed under the MIT License.

---

**DICEL ERP Backend** - Enterprise Resource Planning System 