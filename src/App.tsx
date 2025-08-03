import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

// Import all HR components
import HRDashboard from './components/departments/hr/HRDashboard';
import EmployeeManagement from './components/departments/hr/EmployeeManagement';
import Recruitment from './components/departments/hr/Recruitment';
import TrainingDevelopment from './components/departments/hr/TrainingDevelopment';
import Payroll from './components/departments/hr/Payroll';
import PerformanceReviews from './components/departments/hr/PerformanceReviews';
import LeaveManagement from './components/departments/hr/LeaveManagement';
import BenefitsInsurance from './components/departments/hr/BenefitsInsurance';
import EmployeeRelations from './components/departments/hr/EmployeeRelations';
import HRReports from './components/departments/hr/HRReports';

// Import other components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './components/admin/AdminDashboard';

// Import Finance components
import FinanceDashboard from './components/departments/finance/FinanceDashboard';
import FinancialReports from './components/departments/finance/FinancialReports';
import BudgetManagement from './components/departments/finance/BudgetManagement';
import AccountsPayable from './components/departments/finance/AccountsPayable';
import AccountsReceivable from './components/departments/finance/AccountsReceivable';
import CashManagement from './components/departments/finance/CashManagement';
import ExpenseManagement from './components/departments/finance/ExpenseManagement';
import TaxManagement from './components/departments/finance/TaxManagement';
import FinancialPlanning from './components/departments/finance/FinancialPlanning';
import AuditCompliance from './components/departments/finance/AuditCompliance';

import ComplianceDashboard from './components/departments/compliance/ComplianceDashboard';
import InventoryDashboard from './components/departments/inventory/InventoryDashboard';
import ClientManagementDashboard from './components/departments/client-management/ClientmanagementDashboard';
import SalesMarketingDashboard from './components/departments/sales-marketing/SalesmarketingDashboard';
import CustomerExperienceDashboard from './components/departments/customer-experience/CustomerexperienceDashboard';
import SecurityGuardManagementDashboard from './components/departments/security-guard-management/SecurityGuardManagementDashboard';
import GuardAssignment from './components/departments/security-guard-management/pages/GuardAssignment';
import PatrolSchedules from './components/departments/security-guard-management/pages/PatrolSchedules';
import IncidentReports from './components/departments/security-guard-management/pages/IncidentReports';
import Training from './components/departments/security-guard-management/pages/Training';
import GuardOverview from './components/departments/security-guard-management/pages/GuardOverview';
import Performance from './components/departments/security-guard-management/pages/Performance';
import RiskDashboard from './components/departments/risk/RiskDashboard';
import RecoveryDashboard from './components/departments/recovery/RecoveryDashboard';
import ITDashboard from './components/departments/it/ItDashboard';

import DepartmentLayout from './components/shared/DepartmentLayout';
import LoaderSpinner from './components/common/LoaderSpinner';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoaderSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route Component (for login/register when already authenticated)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoaderSpinner />;
  }

  if (user) {
    // Redirect based on user role with proper path mapping
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'hr':
        return <Navigate to="/hr" replace />;
      case 'finance':
        return <Navigate to="/finance" replace />;
      case 'it':
        return <Navigate to="/it" replace />;
      case 'security':
        return <Navigate to="/security-guard-management" replace />;
      default:
        return <Navigate to="/admin" replace />;
    }
  }

  return <>{children}</>;
};

function AppContent() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />

      {/* Admin Routes */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute>
            <DepartmentLayout
              title="Admin Dashboard"
              colorScheme={{
                primary: 'bg-purple-500',
                secondary: 'bg-purple-600',
                accent: 'bg-purple-400',
                gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
                light: 'bg-purple-50',
                dark: 'bg-purple-900'
              }}
              sidebarItems={[
                { name: 'Admin Dashboard', path: '/admin', icon: '👑' },
                { name: 'User Management', path: '/admin/users', icon: '👤' },
                { name: 'Role Management', path: '/admin/roles', icon: '🔐' },
                { name: 'System Settings', path: '/admin/settings', icon: '⚙️' },
                { name: 'Audit Logs', path: '/admin/audit', icon: '📝' }
              ]}
            >
              <AdminDashboard />
            </DepartmentLayout>
          </ProtectedRoute>
        } 
      />

      {/* HR Routes */}
      <Route 
        path="/hr/*" 
        element={
          <ProtectedRoute>
            <DepartmentLayout
              title="HR Dashboard"
              colorScheme={{
                primary: 'bg-blue-500',
                secondary: 'bg-blue-600',
                accent: 'bg-blue-400',
                gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
                light: 'bg-blue-50',
                dark: 'bg-blue-900'
              }}
              sidebarItems={[
                { name: 'HR Dashboard', path: '/hr', icon: '👥' },
                { name: 'Employee Management', path: '/hr/employees', icon: '👨‍💼' },
                { name: 'Recruitment', path: '/hr/recruitment', icon: '🎯' },
                { name: 'Training & Development', path: '/hr/training', icon: '📚' },
                { name: 'Payroll', path: '/hr/payroll', icon: '💰' },
                { name: 'Performance Reviews', path: '/hr/performance', icon: '📊' },
                { name: 'Leave Management', path: '/hr/leave', icon: '📅' },
                { name: 'Benefits & Insurance', path: '/hr/benefits', icon: '🏥' },
                { name: 'Employee Relations', path: '/hr/relations', icon: '🤝' },
                { name: 'HR Reports', path: '/hr/reports', icon: '📈' }
              ]}
            >
              <Routes>
                <Route path="/" element={<HRDashboard />} />
                <Route path="/employees" element={<EmployeeManagement />} />
                <Route path="/recruitment" element={<Recruitment />} />
                <Route path="/training" element={<TrainingDevelopment />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/performance" element={<PerformanceReviews />} />
                <Route path="/leave" element={<LeaveManagement />} />
                <Route path="/benefits" element={<BenefitsInsurance />} />
                <Route path="/relations" element={<EmployeeRelations />} />
                <Route path="/reports" element={<HRReports />} />
              </Routes>
            </DepartmentLayout>
          </ProtectedRoute>
        } 
      />

      {/* Fallback route for hr_manager */}
      <Route 
        path="/hr_manager/*" 
        element={
          <ProtectedRoute>
            <DepartmentLayout
              title="HR Dashboard"
              colorScheme={{
                primary: 'bg-blue-500',
                secondary: 'bg-blue-600',
                accent: 'bg-blue-400',
                gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
                light: 'bg-blue-50',
                dark: 'bg-blue-900'
              }}
              sidebarItems={[
                { name: 'HR Dashboard', path: '/hr', icon: '👥' },
                { name: 'Employee Management', path: '/hr/employees', icon: '👨‍💼' },
                { name: 'Recruitment', path: '/hr/recruitment', icon: '🎯' },
                { name: 'Training & Development', path: '/hr/training', icon: '📚' },
                { name: 'Payroll', path: '/hr/payroll', icon: '💰' },
                { name: 'Performance Reviews', path: '/hr/performance', icon: '📊' },
                { name: 'Leave Management', path: '/hr/leave', icon: '📅' },
                { name: 'Benefits & Insurance', path: '/hr/benefits', icon: '🏥' },
                { name: 'Employee Relations', path: '/hr/relations', icon: '🤝' },
                { name: 'HR Reports', path: '/hr/reports', icon: '📈' }
              ]}
            >
              <Routes>
                <Route path="/" element={<HRDashboard />} />
                <Route path="/employees" element={<EmployeeManagement />} />
                <Route path="/recruitment" element={<Recruitment />} />
                <Route path="/training" element={<TrainingDevelopment />} />
                <Route path="/payroll" element={<Payroll />} />
                <Route path="/performance" element={<PerformanceReviews />} />
                <Route path="/leave" element={<LeaveManagement />} />
                <Route path="/benefits" element={<BenefitsInsurance />} />
                <Route path="/relations" element={<EmployeeRelations />} />
                <Route path="/reports" element={<HRReports />} />
              </Routes>
            </DepartmentLayout>
          </ProtectedRoute>
        } 
      />

      {/* Finance Routes */}
      <Route 
        path="/finance/*" 
        element={
          <ProtectedRoute>
            <DepartmentLayout
              title="Finance Dashboard"
              colorScheme={{
                primary: 'bg-green-500',
                secondary: 'bg-green-600',
                accent: 'bg-green-400',
                gradient: 'bg-gradient-to-r from-green-500 to-green-600',
                light: 'bg-green-50',
                dark: 'bg-green-900'
              }}
              sidebarItems={[
                { name: 'Finance Dashboard', path: '/finance', icon: '💳' },
                { name: 'Financial Reports', path: '/finance/reports', icon: '📈' },
                { name: 'Budget Management', path: '/finance/budget', icon: '📋' },
                { name: 'Accounts Payable', path: '/finance/payable', icon: '💸' },
                { name: 'Accounts Receivable', path: '/finance/receivable', icon: '💵' },
                { name: 'Cash Management', path: '/finance/cash', icon: '💰' },
                { name: 'Expense Management', path: '/finance/expenses', icon: '📊' },
                { name: 'Tax Management', path: '/finance/tax', icon: '🧾' },
                { name: 'Financial Planning', path: '/finance/planning', icon: '📋' },
                { name: 'Audit & Compliance', path: '/finance/audit', icon: '🔍' }
              ]}
            >
              <Routes>
                <Route path="/" element={<FinanceDashboard />} />
                <Route path="/reports" element={<FinancialReports />} />
                <Route path="/budget" element={<BudgetManagement />} />
                <Route path="/payable" element={<AccountsPayable />} />
                <Route path="/receivable" element={<AccountsReceivable />} />
                <Route path="/cash" element={<CashManagement />} />
                <Route path="/expenses" element={<ExpenseManagement />} />
                <Route path="/tax" element={<TaxManagement />} />
                <Route path="/planning" element={<FinancialPlanning />} />
                <Route path="/audit" element={<AuditCompliance />} />
              </Routes>
            </DepartmentLayout>
          </ProtectedRoute>
        } 
      />

      {/* Compliance Routes */}
      <Route 
        path="/compliance/*" 
        element={
          <ProtectedRoute>
            <DepartmentLayout
              title="Compliance Dashboard"
              colorScheme={{
                primary: 'bg-red-500',
                secondary: 'bg-red-600',
                accent: 'bg-red-400',
                gradient: 'bg-gradient-to-r from-red-500 to-red-600',
                light: 'bg-red-50',
                dark: 'bg-red-900'
              }}
              sidebarItems={[
                { name: 'Compliance Dashboard', path: '/compliance', icon: '🛡️' },
                { name: 'Regulatory Compliance', path: '/compliance/regulatory', icon: '📋' },
                { name: 'Audit Management', path: '/compliance/audit', icon: '🔍' },
                { name: 'Policy Management', path: '/compliance/policies', icon: '📜' },
                { name: 'Risk Assessment', path: '/compliance/risk-assessment', icon: '⚠️' },
                { name: 'Incident Reporting', path: '/compliance/incidents', icon: '🚨' }
              ]}
            >
              <ComplianceDashboard />
            </DepartmentLayout>
          </ProtectedRoute>
        } 
      />

      {/* Inventory Routes */}
      <Route 
        path="/inventory/*" 
        element={
          <ProtectedRoute>
            <DepartmentLayout
              title="Inventory Dashboard"
              colorScheme={{
                primary: 'bg-orange-500',
                secondary: 'bg-orange-600',
                accent: 'bg-orange-400',
                gradient: 'bg-gradient-to-r from-orange-500 to-orange-600',
                light: 'bg-orange-50',
                dark: 'bg-orange-900'
              }}
              sidebarItems={[
                { name: 'Inventory Dashboard', path: '/inventory', icon: '📦' },
                { name: 'Stock Management', path: '/inventory/stock', icon: '🏪' },
                { name: 'Asset Tracking', path: '/inventory/assets', icon: '📍' },
                { name: 'Procurement', path: '/inventory/procurement', icon: '🛒' },
                { name: 'Maintenance', path: '/inventory/maintenance', icon: '🔧' }
              ]}
            >
              <InventoryDashboard />
            </DepartmentLayout>
          </ProtectedRoute>
        } 
      />

      {/* Client Management Routes */}
      <Route 
        path="/client-management/*" 
        element={
          <ProtectedRoute>
            <DepartmentLayout
              title="Client Dashboard"
              colorScheme={{
                primary: 'bg-indigo-500',
                secondary: 'bg-indigo-600',
                accent: 'bg-indigo-400',
                gradient: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
                light: 'bg-indigo-50',
                dark: 'bg-indigo-900'
              }}
              sidebarItems={[
                { name: 'Client Dashboard', path: '/client-management', icon: '👥' },
                { name: 'Client Directory', path: '/client-management/directory', icon: '📇' },
                { name: 'Contract Management', path: '/client-management/contracts', icon: '📄' },
                { name: 'Client Communications', path: '/client-management/communications', icon: '💬' },
                { name: 'Service Requests', path: '/client-management/requests', icon: '🎫' }
              ]}
            >
              <ClientManagementDashboard />
            </DepartmentLayout>
          </ProtectedRoute>
        } 
      />

      {/* Sales & Marketing Routes */}
      <Route 
        path="/sales-marketing/*" 
        element={
          <ProtectedRoute>
            <DepartmentLayout
              title="Sales Dashboard"
              colorScheme={{
                primary: 'bg-pink-500',
                secondary: 'bg-pink-600',
                accent: 'bg-pink-400',
                gradient: 'bg-gradient-to-r from-pink-500 to-pink-600',
                light: 'bg-pink-50',
                dark: 'bg-pink-900'
              }}
              sidebarItems={[
                { name: 'Sales Dashboard', path: '/sales-marketing', icon: '📈' },
                { name: 'Lead Management', path: '/sales-marketing/leads', icon: '🎯' },
                { name: 'Sales Pipeline', path: '/sales-marketing/pipeline', icon: '🔄' },
                { name: 'Marketing Campaigns', path: '/sales-marketing/campaigns', icon: '📢' },
                { name: 'Sales Reports', path: '/sales-marketing/reports', icon: '📊' }
              ]}
            >
              <SalesMarketingDashboard />
            </DepartmentLayout>
          </ProtectedRoute>
        } 
      />

      {/* Customer Experience Routes */}
      <Route 
        path="/customer-experience/*" 
        element={
          <ProtectedRoute>
            <DepartmentLayout
              title="CX Dashboard"
              colorScheme={{
                primary: 'bg-cyan-500',
                secondary: 'bg-cyan-600',
                accent: 'bg-cyan-400',
                gradient: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
                light: 'bg-cyan-50',
                dark: 'bg-cyan-900'
              }}
              sidebarItems={[
                { name: 'CX Dashboard', path: '/customer-experience', icon: '😊' },
                { name: 'Customer Support', path: '/customer-experience/support', icon: '🎧' },
                { name: 'Feedback Management', path: '/customer-experience/feedback', icon: '💭' },
                { name: 'Satisfaction Surveys', path: '/customer-experience/surveys', icon: '📝' },
                { name: 'Service Quality', path: '/customer-experience/quality', icon: '⭐' }
              ]}
            >
              <CustomerExperienceDashboard />
            </DepartmentLayout>
          </ProtectedRoute>
        } 
      />

      {/* Security Guard Management Routes */}
      <Route 
        path="/security-guard-management/*" 
        element={
          <ProtectedRoute>
            <DepartmentLayout
              title="Guard Dashboard"
              colorScheme={{
                primary: 'bg-yellow-500',
                secondary: 'bg-yellow-600',
                accent: 'bg-yellow-400',
                gradient: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
                light: 'bg-yellow-50',
                dark: 'bg-yellow-900'
              }}
              sidebarItems={[
                { name: 'Guard Dashboard', path: '/security-guard-management', icon: '🛡️' },
                { name: 'Guard Assignment', path: '/security-guard-management/guard-assignment', icon: '📍' },
                { name: 'Patrol Schedules', path: '/security-guard-management/patrol-schedules', icon: '🕐' },
                { name: 'Incident Reports', path: '/security-guard-management/incident-reports', icon: '🚨' },
                { name: 'Training', path: '/security-guard-management/training', icon: '📚' },
                { name: 'Performance', path: '/security-guard-management/performance', icon: '📊' }
              ]}
            >
              <SecurityGuardManagementDashboard />
            </DepartmentLayout>
          </ProtectedRoute>
        } 
      />

      {/* Risk Routes */}
      <Route 
        path="/risk/*" 
        element={
          <ProtectedRoute>
            <DepartmentLayout
              title="Risk Dashboard"
              colorScheme={{
                primary: 'bg-red-500',
                secondary: 'bg-red-600',
                accent: 'bg-red-400',
                gradient: 'bg-gradient-to-r from-red-500 to-red-600',
                light: 'bg-red-50',
                dark: 'bg-red-900'
              }}
              sidebarItems={[
                { name: 'Risk Dashboard', path: '/risk', icon: '⚠️' },
                { name: 'Risk Assessment', path: '/risk/assessment', icon: '🔍' },
                { name: 'Threat Analysis', path: '/risk/threats', icon: '🔍' },
                { name: 'Risk Reports', path: '/risk/reports', icon: '📊' },
                { name: 'Mitigation Plans', path: '/risk/mitigation', icon: '🛠️' }
              ]}
            >
              <RiskDashboard />
            </DepartmentLayout>
          </ProtectedRoute>
        } 
      />

      {/* Recovery Routes */}
      <Route 
        path="/recovery/*" 
        element={
          <ProtectedRoute>
            <DepartmentLayout
              title="Recovery Dashboard"
              colorScheme={{
                primary: 'bg-emerald-500',
                secondary: 'bg-emerald-600',
                accent: 'bg-emerald-400',
                gradient: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
                light: 'bg-emerald-50',
                dark: 'bg-emerald-900'
              }}
              sidebarItems={[
                { name: 'Recovery Dashboard', path: '/recovery', icon: '🔄' },
                { name: 'Recovery Cases', path: '/recovery/cases', icon: '📁' },
                { name: 'Asset Recovery', path: '/recovery/assets', icon: '💎' },
                { name: 'Legal Proceedings', path: '/recovery/legal', icon: '⚖️' },
                { name: 'Recovery Reports', path: '/recovery/reports', icon: '📊' }
              ]}
            >
              <RecoveryDashboard />
            </DepartmentLayout>
          </ProtectedRoute>
        } 
      />

      {/* IT Routes */}
      <Route 
        path="/it/*" 
        element={
          <ProtectedRoute>
            <DepartmentLayout
              title="IT Dashboard"
              colorScheme={{
                primary: 'bg-blue-500',
                secondary: 'bg-blue-600',
                accent: 'bg-blue-400',
                gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
                light: 'bg-blue-50',
                dark: 'bg-blue-900'
              }}
              sidebarItems={[
                { name: 'IT Dashboard', path: '/it', icon: '💻' },
                { name: 'System Management', path: '/it/systems', icon: '⚙️' },
                { name: 'Network Security', path: '/it/security', icon: '🔒' },
                { name: 'Technical Support', path: '/it/support', icon: '🛠️' },
                { name: 'IT Reports', path: '/it/reports', icon: '📊' }
              ]}
            >
              <ITDashboard />
            </DepartmentLayout>
          </ProtectedRoute>
        } 
      />

      {/* Default redirect */}
      <Route 
        path="/" 
        element={<Navigate to="/login" replace />} 
      />

      {/* Catch all route */}
      <Route 
        path="*" 
        element={<Navigate to="/login" replace />} 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;