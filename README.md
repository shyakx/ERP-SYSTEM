# DICEL ERP - Enterprise Resource Planning System

A modern, comprehensive ERP system built with React, TypeScript, and Tailwind CSS. Features role-based access control, AI-powered chatbot, internal messaging, and department-specific dashboards.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd DICEL_ERP

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── shared/           # Global components
│   │   ├── AIChatbot.tsx
│   │   ├── InternalMessaging.tsx
│   │   └── DepartmentLayout.tsx
│   └── departments/      # Department-specific components
│       ├── hr/
│       ├── finance/
│       ├── security/
│       ├── it/
│       ├── operations/
│       ├── customer-experience/
│       ├── sales-marketing/
│       └── recovery/
├── contexts/             # React contexts
│   └── AuthContext.tsx
├── services/             # API and service functions
│   └── auth.ts
└── App.tsx              # Main application component
```

## 🔐 Authentication & Access

### Department Credentials

| Department | Email | Password | Role |
|------------|-------|----------|------|
| HR | hr@dicel.co.rw | hr123 | hr |
| Finance | finance@dicel.co.rw | finance123 | finance |
| Security | security@dicel.co.rw | security123 | security |
| IT | it@dicel.co.rw | it123 | it |
| Operations | operations@dicel.co.rw | operations123 | operations |
| Customer Experience | cx@dicel.co.rw | cx123 | cx |
| Sales & Marketing | sales@dicel.co.rw | sales123 | sales |
| Recovery | recovery@dicel.co.rw | recovery123 | recovery |

### Access URLs
- **HR Dashboard:** `/hr`
- **Finance Dashboard:** `/finance`
- **Security Dashboard:** `/security`
- **IT Dashboard:** `/it`
- **Operations Dashboard:** `/operations`
- **Customer Experience:** `/cx`
- **Sales & Marketing:** `/sales`
- **Recovery:** `/recovery`

## 🎯 Features

### Global Features
- **AI Chatbot:** Intelligent ERP assistant with 4 tabs (Chat, Data, Automation, Help)
- **Internal Messaging:** Real-time communication system with dynamic conversations
- **Role-based Access:** Secure department-specific access control
- **Responsive Design:** Works on desktop, tablet, and mobile devices

### Department Features

#### HR Department
- Employee Management
- Recruitment Tools
- Payroll Management
- Performance Tracking
- Training Programs
- Benefits Administration

#### Finance Department
- Financial Dashboard
- Budget Management
- Accounts Payable/Receivable
- Cash Management
- Financial Reports
- Revenue Tracking

#### Security Department
- System Monitoring
- Security Alerts
- Protocol Management
- Compliance Tracking
- Incident Management
- Forensics Tools

#### IT Department
- System Management
- Technical Support
- Network Monitoring
- Security Tools
- Development Tools
- Maintenance Tracking

#### Operations Department
- Process Management
- Workflow Automation
- Quality Control
- Inventory Management
- Logistics Tracking
- Performance Metrics

#### Customer Experience
- Support Ticket Management
- Customer Satisfaction
- Feedback Collection
- Analytics Dashboard
- Loyalty Programs
- Customer Insights

#### Sales & Marketing
- Campaign Management
- Lead Generation
- Analytics Dashboard
- CRM Integration
- Promotional Tools
- Partnership Management

#### Recovery Department
- Case Management
- Asset Recovery
- Forensics Analysis
- Legal Documentation
- Recovery Tracking
- Compliance Monitoring

## 🤖 AI Chatbot Features

### Chat Tab
- **Quick Actions:** System navigation, report generation, data queries
- **Intelligent Responses:** Context-aware ERP assistance
- **Message Actions:** Copy, thumbs up/down feedback
- **Suggestions:** Quick action buttons for common tasks

### Data Tab
- **ERP Overview:** Employee count, revenue, system health, projects
- **Recent Activities:** Real-time system activity feed
- **System Alerts:** Current alerts and notifications

### Automation Tab
- **Process List:** Employee onboarding, financial reporting, security monitoring
- **Status Tracking:** Active, scheduled, and running processes
- **Management Tools:** Process control and monitoring

### Help Tab
- **Support Topics:** Navigation, data access, report generation
- **Security Protocols:** Best practices and guidelines
- **Interactive Help:** Click-through assistance system

## 💬 Internal Messaging System

### Features
- **Dynamic Conversations:** Each chat has unique message history
- **Modern UI:** Gradient backgrounds, blur effects, enhanced avatars
- **File Attachments:** Support for document sharing
- **Reactions:** Thumbs up/down, emoji reactions
- **Typing Indicators:** Real-time typing status
- **Search Functionality:** Find conversations and messages
- **Status Indicators:** Online/offline, muted, archived status

### Navigation
- **Sidebar Link:** "Internal Messaging" in department sidebar
- **Floating Button:** Quick access button in bottom-right corner
- **Route:** `/messages` (protected route)

## 🛠️ Technical Stack

### Frontend
- **React 18:** Modern React with hooks
- **TypeScript:** Type-safe development
- **Vite:** Fast build tool and dev server
- **Tailwind CSS:** Utility-first CSS framework
- **Lucide React:** Beautiful icon library

### State Management
- **React Context:** Authentication and global state
- **useState/useEffect:** Local component state
- **useRef:** DOM manipulation and scrolling

### Routing
- **React Router DOM:** Client-side routing
- **Protected Routes:** Role-based access control
- **Public Routes:** Login and error pages

## 🚀 Deployment

### Development
```bash
npm run dev
```
Access at: `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

### Deployment Platforms
- **Vercel:** Recommended for React apps
- **Netlify:** Great for static sites
- **GitHub Pages:** Free hosting option

## 📁 File Structure Details

### Key Components

#### AIChatbot.tsx
- **Location:** `src/components/shared/AIChatbot.tsx`
- **Purpose:** AI-powered ERP assistant
- **Features:** 4 tabs, simulated backend, intelligent responses
- **Position:** Top-right corner with backdrop blur

#### InternalMessaging.tsx
- **Location:** `src/components/shared/InternalMessaging.tsx`
- **Purpose:** Real-time communication system
- **Features:** Dynamic conversations, modern UI, file attachments
- **Access:** Sidebar link and floating button

#### DepartmentLayout.tsx
- **Location:** `src/components/shared/DepartmentLayout.tsx`
- **Purpose:** Common layout for all departments
- **Features:** Sidebar navigation, upper bar, global features

#### AuthContext.tsx
- **Location:** `src/contexts/AuthContext.tsx`
- **Purpose:** Authentication state management
- **Features:** User roles, login/logout, protected routes

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_TITLE=DICEL ERP
VITE_APP_VERSION=1.0.0
```

### Customization
- **Colors:** Modify Tailwind config in `tailwind.config.js`
- **Icons:** Replace Lucide icons in components
- **Data:** Update mock data in service files
- **Routing:** Modify routes in `App.tsx`

## 🐛 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Development Server Issues
```bash
# Kill existing processes
npx kill-port 5173
npm run dev
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --noEmit
```

## 📞 Support

### Getting Help
1. **Check the documentation** in this README
2. **Review the code comments** in source files
3. **Test with different credentials** for each department
4. **Check browser console** for error messages

### Contact Information
- **Project Owner:** Steven BUGONZI
- **Email:** [Your Email]
- **Repository:** [GitHub URL]

## 📄 License

This project is proprietary software. All rights reserved.

---

**DICEL ERP v1.0.0** - A comprehensive enterprise resource planning solution. 