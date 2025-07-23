import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import LoginForm from './components/Auth/LoginForm';
import ProtectedRoute from './components/Common/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Employees from './pages/HR/Employees';
import Shifts from './pages/HR/Shifts';
import Attendance from './pages/HR/Attendance';
import Payroll from './pages/HR/finance_payroll';
import Clients from './pages/ClientManagement/Clients';
import Invoicing from './pages/Finance/Invoicing';
import Expenses from './pages/Finance/Expenses';
import Payslips from './pages/Finance/Payslips';
import FinanceReports from './pages/Finance/Reports';
import Assets from './pages/Inventory/Assets';
import Incidents from './pages/Operations/Incidents';
import Documents from './pages/Compliance/Documents';
import Reports from './pages/Finance/Reports';
import Audit from './pages/Compliance/Audit';
import SettingsPage from './pages/ITSupport/Settings';
import ComingSoon from './pages/ComingSoon';
import HRDashboard from './pages/HR/Dashboard';
import OperationsDashboard from './pages/Operations/Dashboard';
import FinanceDashboard from './pages/Finance/Dashboard';
import InventoryDashboard from './pages/Inventory/Dashboard';
import ITSupportDashboard from './pages/ITSupport/Dashboard';
import ComplianceDashboard from './pages/Compliance/Dashboard';
import SalesMarketingDashboard from './pages/SalesMarketing/Dashboard';
import ClientManagementDashboard from './pages/ClientManagement/Dashboard';
import AddEmployee from './pages/HR/AddEmployee';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatWidget from './components/Chatbot/ChatWidget';
import ChatbotTraining from './pages/Admin/ChatbotTraining';

const DepartmentDashboardRedirect: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  const dept = user.department?.toLowerCase();
  switch (dept) {
    case 'hr': return <Navigate to="/hr/dashboard" replace />;
    case 'operations': return <Navigate to="/operations/dashboard" replace />;
    case 'finance': return <Navigate to="/finance/dashboard" replace />;
    case 'inventory': return <Navigate to="/inventory/dashboard" replace />;
    case 'itsupport': return <Navigate to="/itsupport/dashboard" replace />;
    case 'compliance': return <Navigate to="/compliance/dashboard" replace />;
    case 'salesmarketing': return <Navigate to="/salesmarketing/dashboard" replace />;
    case 'clientmanagement': return <Navigate to="/clientmanagement/dashboard" replace />;
    default: return <Navigate to="/" replace />;
  }
};

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <DepartmentDashboardRedirect /> : <LoginForm />} 
      />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DepartmentDashboardRedirect />} />
        <Route path="dashboard" element={<DepartmentDashboardRedirect />} />
        <Route path="hr/dashboard" element={<HRDashboard />} />
        <Route path="operations/dashboard" element={<OperationsDashboard />} />
        <Route path="finance/dashboard" element={<FinanceDashboard />} />
        <Route path="inventory/dashboard" element={<InventoryDashboard />} />
        <Route path="itsupport/dashboard" element={<ITSupportDashboard />} />
        <Route path="compliance/dashboard" element={<ComplianceDashboard />} />
        <Route path="salesmarketing/dashboard" element={<SalesMarketingDashboard />} />
        <Route path="clientmanagement/dashboard" element={<ClientManagementDashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="add-employee" element={<AddEmployee />} />
        <Route path="hr/shifts" element={<Shifts />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="invoicing" element={<Invoicing />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="payslips" element={<Payslips />} />
        <Route path="finance/reports" element={<FinanceReports />} />
        <Route path="clients" element={<Clients />} />
        <Route path="assets" element={<Assets />} />
        <Route path="incidents" element={<Incidents />} />
        <Route path="documents" element={<Documents />} />
        <Route path="reports" element={<Reports />} />
        <Route path="audit" element={<Audit />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="admin/chatbot-training" element={<ChatbotTraining />} />
      </Route>
      <Route path="*" element={<DepartmentDashboardRedirect />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <AppContent />
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </Router>
        <ChatWidget />
      </div>
    </AuthProvider>
  );
}

export default App;