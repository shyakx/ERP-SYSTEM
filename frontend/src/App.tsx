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

// Import additional department pages
import TrainingManagement from './pages/HR/TrainingManagement';
import PerformanceReviews from './pages/HR/PerformanceReviews';
import Recruitment from './pages/HR/Recruitment';
import LeaveRequests from './pages/HR/LeaveRequests';
import LeaveApproval from './pages/HR/LeaveApproval';
import HRDocuments from './pages/HR/Documents';
import DepartmentManagement from './pages/HR/DepartmentManagement';
import EmployeeProfile from './pages/HR/EmployeeProfile';
import EditEmployee from './pages/HR/EditEmployee';

// Finance pages
import BudgetManagement from './pages/Finance/BudgetManagement';
import AccountReconciliation from './pages/Finance/AccountReconciliation';
import TaxManagement from './pages/Finance/TaxManagement';
import SalaryDisbursement from './pages/Finance/SalaryDisbursement';
import Payments from './pages/Finance/Payments';

// Operations pages
import VehicleLog from './pages/Operations/VehicleLog';
import ShiftManagement from './pages/Operations/ShiftManagement';
import SiteManagement from './pages/Operations/SiteManagement';
import TaskAssignment from './pages/Operations/TaskAssignment';
import DailyActivityReports from './pages/Operations/DailyActivityReports';
import DutyRoster from './pages/Operations/DutyRoster';
import EquipmentCheck from './pages/Operations/EquipmentCheck';
import GuardScheduling from './pages/Operations/GuardScheduling';
import PatrolLogs from './pages/Operations/PatrolLogs';
import PostOrders from './pages/Operations/PostOrders';

// Inventory pages
import StockLevels from './pages/Inventory/StockLevels';
import SupplierManagement from './pages/Inventory/SupplierManagement';
import InventoryAudit from './pages/Inventory/InventoryAudit';
import PurchaseOrders from './pages/Inventory/PurchaseOrders';

// Sales pages
import Leads from './pages/SalesMarketing/Leads';
import Opportunities from './pages/SalesMarketing/Opportunities';
import SalesClients from './pages/SalesMarketing/Clients';

// IT Support pages
import SupportTickets from './pages/ITSupport/SupportTickets';
import ITAssets from './pages/ITSupport/ITAssets';
import UserManagement from './pages/ITSupport/UserManagement';
import AccessControl from './pages/ITSupport/AccessControl';
import AddUser from './pages/ITSupport/AddUser';
import SoftwareLicenses from './pages/ITSupport/SoftwareLicenses';
import SystemLogs from './pages/ITSupport/SystemLogs';
import PasswordResets from './pages/ITSupport/PasswordResets';

// Compliance pages
import ComplianceReports from './pages/Compliance/ComplianceReports';
import IncidentCompliance from './pages/Compliance/IncidentCompliance';
import Licenses from './pages/Compliance/Licenses';
import PolicyDocuments from './pages/Compliance/PolicyDocuments';
import RegulatoryUpdates from './pages/Compliance/RegulatoryUpdates';
import TrainingRecords from './pages/Compliance/TrainingRecords';
import AddLicense from './pages/Compliance/AddLicense';

// Client Management pages
import ServiceRequests from './pages/ClientManagement/ServiceRequests';
import SupportTicketsClient from './pages/ClientManagement/SupportTickets';
import Feedback from './pages/ClientManagement/Feedback';
import EditClient from './pages/ClientManagement/EditClient';
import ClientDocuments from './pages/ClientManagement/ClientDocuments';
import ClientMeetings from './pages/ClientManagement/ClientMeetings';
import ContractRenewals from './pages/ClientManagement/ContractRenewals';
import AddClient from './pages/ClientManagement/AddClient';

const DepartmentDashboardRedirect: React.FC = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  const dept = user.department?.toLowerCase();
  switch (dept) {
    case 'hr': return <Navigate to="/hr/dashboard" replace />;
    case 'operations': return <Navigate to="/operations/dashboard" replace />;
    case 'finance': return <Navigate to="/finance/dashboard" replace />;
    case 'inventory': return <Navigate to="/inventory/dashboard" replace />;
    case 'itsupport': return <Navigate to="/it/dashboard" replace />;
    case 'compliance': return <Navigate to="/compliance/dashboard" replace />;
    case 'salesmarketing': return <Navigate to="/sales/dashboard" replace />;
    case 'clientmanagement': return <Navigate to="/client/dashboard" replace />;
    default: return <Navigate to="/dashboard" replace />;
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
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* HR Routes - Only HR users */}
        <Route path="hr/dashboard" element={<HRDashboard />} />
        <Route path="hr/employees" element={<Employees />} />
        <Route path="hr/training" element={<TrainingManagement />} />
        <Route path="hr/performance" element={<PerformanceReviews />} />
        <Route path="hr/recruitment" element={<Recruitment />} />
        <Route path="hr/leave" element={<LeaveRequests />} />
        <Route path="hr/leave-approval" element={<LeaveApproval />} />
        <Route path="hr/documents" element={<HRDocuments />} />
        <Route path="hr/departments" element={<DepartmentManagement />} />
        <Route path="hr/employee/:id" element={<EmployeeProfile />} />
        <Route path="hr/employee/:id/edit" element={<EditEmployee />} />
        <Route path="hr/shifts" element={<Shifts />} />
        <Route path="hr/attendance" element={<Attendance />} />
        <Route path="hr/payroll" element={<Payroll />} />
        <Route path="add-employee" element={<AddEmployee />} />
        
        {/* Finance Routes - Only Finance users */}
        <Route path="finance/dashboard" element={<FinanceDashboard />} />
        <Route path="finance/budget" element={<BudgetManagement />} />
        <Route path="finance/reconciliation" element={<AccountReconciliation />} />
        <Route path="finance/tax" element={<TaxManagement />} />
        <Route path="finance/salary" element={<SalaryDisbursement />} />
        <Route path="finance/payments" element={<Payments />} />
        <Route path="finance/reports" element={<FinanceReports />} />
        <Route path="invoicing" element={<Invoicing />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="payslips" element={<Payslips />} />
        
        {/* Operations Routes - Only Operations users */}
        <Route path="operations/dashboard" element={<OperationsDashboard />} />
        <Route path="operations/vehicles" element={<VehicleLog />} />
        <Route path="operations/shifts" element={<ShiftManagement />} />
        <Route path="operations/sites" element={<SiteManagement />} />
        <Route path="operations/tasks" element={<TaskAssignment />} />
        <Route path="operations/reports" element={<DailyActivityReports />} />
        <Route path="operations/duty" element={<DutyRoster />} />
        <Route path="operations/equipment" element={<EquipmentCheck />} />
        <Route path="operations/guards" element={<GuardScheduling />} />
        <Route path="operations/patrols" element={<PatrolLogs />} />
        <Route path="operations/post" element={<PostOrders />} />
        <Route path="incidents" element={<Incidents />} />
        
        {/* Inventory Routes - Only Inventory users */}
        <Route path="inventory/dashboard" element={<InventoryDashboard />} />
        <Route path="inventory/stock" element={<StockLevels />} />
        <Route path="inventory/suppliers" element={<SupplierManagement />} />
        <Route path="inventory/audit" element={<InventoryAudit />} />
        <Route path="inventory/purchase" element={<PurchaseOrders />} />
        <Route path="assets" element={<Assets />} />
        
        {/* Sales & Marketing Routes - Only Sales users */}
        <Route path="sales/dashboard" element={<SalesMarketingDashboard />} />
        <Route path="sales/leads" element={<Leads />} />
        <Route path="sales/opportunities" element={<Opportunities />} />
        <Route path="sales/clients" element={<SalesClients />} />
        
        {/* IT Support Routes - Only IT Support users */}
        <Route path="it/dashboard" element={<ITSupportDashboard />} />
        <Route path="it/tickets" element={<SupportTickets />} />
        <Route path="it/assets" element={<ITAssets />} />
        <Route path="it/users" element={<UserManagement />} />
        <Route path="it/access" element={<AccessControl />} />
        <Route path="it/add-user" element={<AddUser />} />
        <Route path="it/software" element={<SoftwareLicenses />} />
        <Route path="it/logs" element={<SystemLogs />} />
        <Route path="it/passwords" element={<PasswordResets />} />
        <Route path="settings" element={<SettingsPage />} />
        
        {/* Compliance Routes - Only Compliance users */}
        <Route path="compliance/dashboard" element={<ComplianceDashboard />} />
        <Route path="compliance/reports" element={<ComplianceReports />} />
        <Route path="compliance/incidents" element={<IncidentCompliance />} />
        <Route path="compliance/audit" element={<Audit />} />
        <Route path="compliance/documents" element={<Documents />} />
        <Route path="compliance/licenses" element={<Licenses />} />
        <Route path="compliance/policies" element={<PolicyDocuments />} />
        <Route path="compliance/regulatory" element={<RegulatoryUpdates />} />
        <Route path="compliance/training" element={<TrainingRecords />} />
        <Route path="compliance/add-license" element={<AddLicense />} />
        
        {/* Client Management Routes - Only Client Management users */}
        <Route path="client/dashboard" element={<ClientManagementDashboard />} />
        <Route path="client/requests" element={<ServiceRequests />} />
        <Route path="client/support" element={<SupportTicketsClient />} />
        <Route path="client/feedback" element={<Feedback />} />
        <Route path="client/edit/:id" element={<EditClient />} />
        <Route path="client/documents" element={<ClientDocuments />} />
        <Route path="client/meetings" element={<ClientMeetings />} />
        <Route path="client/contracts" element={<ContractRenewals />} />
        <Route path="client/add" element={<AddClient />} />
        <Route path="clients" element={<Clients />} />
        
        {/* Admin Routes - Only System Admin */}
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