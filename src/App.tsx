import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import LoadingSpinner from "./components/shared/LoadingSpinner";

// Lazy load components for better performance
const HRDashboard = lazy(() => import("./components/departments/hr/HRDashboard"));
const FinanceDashboard = lazy(() => import("./components/departments/finance/FinanceDashboard"));
const ITDashboard = lazy(() => import("./components/departments/it/ItDashboard"));
const SecurityDashboard = lazy(() => import("./components/departments/security-guard-management/SecurityGuardManagementDashboard"));
const OperationsDashboard = lazy(() => import("./components/departments/inventory/InventoryDashboard"));
const CustomerExperienceDashboard = lazy(() => import("./components/departments/customer-experience/CustomerexperienceDashboard"));
const SalesMarketingDashboard = lazy(() => import("./components/departments/sales-marketing/SalesmarketingDashboard"));
const RiskDashboard = lazy(() => import("./components/departments/risk/RiskDashboard"));
const RecoveryDashboard = lazy(() => import("./components/departments/recovery/RecoveryDashboard"));
const InternalMessaging = lazy(() => import("./components/shared/InternalMessaging"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route Component
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    // Redirect based on user role
    switch (user.role) {
      case 'admin': return <Navigate to="/hr" replace />;
      case 'hr': return <Navigate to="/hr" replace />;
      case 'finance': return <Navigate to="/finance" replace />;
      case 'it': return <Navigate to="/it" replace />;
      case 'security': return <Navigate to="/security" replace />;
      case 'compliance': return <Navigate to="/compliance" replace />;
      case 'inventory': return <Navigate to="/operations" replace />;
      case 'client': return <Navigate to="/client" replace />;
      case 'sales': return <Navigate to="/sales" replace />;
      case 'cx': return <Navigate to="/cx" replace />;
      case 'risk': return <Navigate to="/risk" replace />;
      case 'recovery': return <Navigate to="/recovery" replace />;
      case 'employee': return <Navigate to="/hr" replace />;
      default: return <Navigate to="/hr" replace />;
    }
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            
            {/* HR Routes */}
            <Route path="/hr" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />
            <Route path="/hr/employees" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />
            <Route path="/hr/recruitment" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />
            <Route path="/hr/training" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />
            <Route path="/hr/payroll" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />
            <Route path="/hr/performance" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />
            <Route path="/hr/leave" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />
            <Route path="/hr/attendance" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />
            <Route path="/hr/benefits" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />
            <Route path="/hr/compliance" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />
            <Route path="/hr/reports" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />
            <Route path="/hr/settings" element={<ProtectedRoute><HRDashboard /></ProtectedRoute>} />

            {/* Finance Routes */}
            <Route path="/finance" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
            <Route path="/finance/overview" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
            <Route path="/finance/payable" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
            <Route path="/finance/receivable" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
            <Route path="/finance/tax" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
            <Route path="/finance/budgeting" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
            <Route path="/finance/reports" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
            <Route path="/finance/cash" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
            <Route path="/finance/expenses" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
            <Route path="/finance/planning" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />

            {/* IT Routes */}
            <Route path="/it" element={<ProtectedRoute><ITDashboard /></ProtectedRoute>} />
            <Route path="/it/overview" element={<ProtectedRoute><ITDashboard /></ProtectedRoute>} />
            <Route path="/it/systems" element={<ProtectedRoute><ITDashboard /></ProtectedRoute>} />
            <Route path="/it/support" element={<ProtectedRoute><ITDashboard /></ProtectedRoute>} />
            <Route path="/it/network" element={<ProtectedRoute><ITDashboard /></ProtectedRoute>} />
            <Route path="/it/security" element={<ProtectedRoute><ITDashboard /></ProtectedRoute>} />
            <Route path="/it/maintenance" element={<ProtectedRoute><ITDashboard /></ProtectedRoute>} />
            <Route path="/it/backup" element={<ProtectedRoute><ITDashboard /></ProtectedRoute>} />
            <Route path="/it/software" element={<ProtectedRoute><ITDashboard /></ProtectedRoute>} />
            <Route path="/it/reports" element={<ProtectedRoute><ITDashboard /></ProtectedRoute>} />

            {/* Security Routes */}
            <Route path="/security" element={<ProtectedRoute><SecurityDashboard /></ProtectedRoute>} />
            <Route path="/security/overview" element={<ProtectedRoute><SecurityDashboard /></ProtectedRoute>} />
            <Route path="/security/assignment" element={<ProtectedRoute><SecurityDashboard /></ProtectedRoute>} />
            <Route path="/security/patrols" element={<ProtectedRoute><SecurityDashboard /></ProtectedRoute>} />
            <Route path="/security/incidents" element={<ProtectedRoute><SecurityDashboard /></ProtectedRoute>} />
            <Route path="/security/training" element={<ProtectedRoute><SecurityDashboard /></ProtectedRoute>} />
            <Route path="/security/performance" element={<ProtectedRoute><SecurityDashboard /></ProtectedRoute>} />
            <Route path="/security/equipment" element={<ProtectedRoute><SecurityDashboard /></ProtectedRoute>} />
            <Route path="/security/reports" element={<ProtectedRoute><SecurityDashboard /></ProtectedRoute>} />
            <Route path="/security/settings" element={<ProtectedRoute><SecurityDashboard /></ProtectedRoute>} />

            {/* Operations Routes */}
            <Route path="/operations" element={<ProtectedRoute><OperationsDashboard /></ProtectedRoute>} />
            <Route path="/operations/overview" element={<ProtectedRoute><OperationsDashboard /></ProtectedRoute>} />
            <Route path="/operations/stock" element={<ProtectedRoute><OperationsDashboard /></ProtectedRoute>} />
            <Route path="/operations/assets" element={<ProtectedRoute><OperationsDashboard /></ProtectedRoute>} />
            <Route path="/operations/procurement" element={<ProtectedRoute><OperationsDashboard /></ProtectedRoute>} />
            <Route path="/operations/maintenance" element={<ProtectedRoute><OperationsDashboard /></ProtectedRoute>} />
            <Route path="/operations/warehouse" element={<ProtectedRoute><OperationsDashboard /></ProtectedRoute>} />
            <Route path="/operations/quality" element={<ProtectedRoute><OperationsDashboard /></ProtectedRoute>} />
            <Route path="/operations/reports" element={<ProtectedRoute><OperationsDashboard /></ProtectedRoute>} />
            <Route path="/operations/analytics" element={<ProtectedRoute><OperationsDashboard /></ProtectedRoute>} />

            {/* Sales & Marketing Routes */}
            <Route path="/sales" element={<ProtectedRoute><SalesMarketingDashboard /></ProtectedRoute>} />
            <Route path="/sales/overview" element={<ProtectedRoute><SalesMarketingDashboard /></ProtectedRoute>} />
            <Route path="/sales/leads" element={<ProtectedRoute><SalesMarketingDashboard /></ProtectedRoute>} />
            <Route path="/sales/pipeline" element={<ProtectedRoute><SalesMarketingDashboard /></ProtectedRoute>} />
            <Route path="/sales/campaigns" element={<ProtectedRoute><SalesMarketingDashboard /></ProtectedRoute>} />
            <Route path="/sales/opportunities" element={<ProtectedRoute><SalesMarketingDashboard /></ProtectedRoute>} />
            <Route path="/sales/quotes" element={<ProtectedRoute><SalesMarketingDashboard /></ProtectedRoute>} />
            <Route path="/sales/analytics" element={<ProtectedRoute><SalesMarketingDashboard /></ProtectedRoute>} />
            <Route path="/sales/reports" element={<ProtectedRoute><SalesMarketingDashboard /></ProtectedRoute>} />
            <Route path="/sales/settings" element={<ProtectedRoute><SalesMarketingDashboard /></ProtectedRoute>} />

            {/* Customer Experience Routes */}
            <Route path="/cx" element={<ProtectedRoute><CustomerExperienceDashboard /></ProtectedRoute>} />
            <Route path="/cx/overview" element={<ProtectedRoute><CustomerExperienceDashboard /></ProtectedRoute>} />
            <Route path="/cx/support" element={<ProtectedRoute><CustomerExperienceDashboard /></ProtectedRoute>} />
            <Route path="/cx/feedback" element={<ProtectedRoute><CustomerExperienceDashboard /></ProtectedRoute>} />
            <Route path="/cx/surveys" element={<ProtectedRoute><CustomerExperienceDashboard /></ProtectedRoute>} />
            <Route path="/cx/quality" element={<ProtectedRoute><CustomerExperienceDashboard /></ProtectedRoute>} />
            <Route path="/cx/tickets" element={<ProtectedRoute><CustomerExperienceDashboard /></ProtectedRoute>} />
            <Route path="/cx/satisfaction" element={<ProtectedRoute><CustomerExperienceDashboard /></ProtectedRoute>} />
            <Route path="/cx/communication" element={<ProtectedRoute><CustomerExperienceDashboard /></ProtectedRoute>} />
            <Route path="/cx/reports" element={<ProtectedRoute><CustomerExperienceDashboard /></ProtectedRoute>} />

            {/* Risk Management Routes */}
            <Route path="/risk" element={<ProtectedRoute><RiskDashboard /></ProtectedRoute>} />
            <Route path="/risk/overview" element={<ProtectedRoute><RiskDashboard /></ProtectedRoute>} />
            <Route path="/risk/assessment" element={<ProtectedRoute><RiskDashboard /></ProtectedRoute>} />
            <Route path="/risk/threats" element={<ProtectedRoute><RiskDashboard /></ProtectedRoute>} />
            <Route path="/risk/reports" element={<ProtectedRoute><RiskDashboard /></ProtectedRoute>} />
            <Route path="/risk/mitigation" element={<ProtectedRoute><RiskDashboard /></ProtectedRoute>} />
            <Route path="/risk/alerts" element={<ProtectedRoute><RiskDashboard /></ProtectedRoute>} />
            <Route path="/risk/reporting" element={<ProtectedRoute><RiskDashboard /></ProtectedRoute>} />
            <Route path="/risk/monitoring" element={<ProtectedRoute><RiskDashboard /></ProtectedRoute>} />
            <Route path="/risk/incidents" element={<ProtectedRoute><RiskDashboard /></ProtectedRoute>} />
            <Route path="/risk/compliance" element={<ProtectedRoute><RiskDashboard /></ProtectedRoute>} />

            {/* Recovery Routes */}
            <Route path="/recovery" element={<ProtectedRoute><RecoveryDashboard /></ProtectedRoute>} />
            <Route path="/recovery/overview" element={<ProtectedRoute><RecoveryDashboard /></ProtectedRoute>} />
            <Route path="/recovery/investigation" element={<ProtectedRoute><RecoveryDashboard /></ProtectedRoute>} />
            <Route path="/recovery/cases" element={<ProtectedRoute><RecoveryDashboard /></ProtectedRoute>} />
            <Route path="/recovery/documentation" element={<ProtectedRoute><RecoveryDashboard /></ProtectedRoute>} />
            <Route path="/recovery/legal" element={<ProtectedRoute><RecoveryDashboard /></ProtectedRoute>} />
            <Route path="/recovery/reports" element={<ProtectedRoute><RecoveryDashboard /></ProtectedRoute>} />
            <Route path="/recovery/assets" element={<ProtectedRoute><RecoveryDashboard /></ProtectedRoute>} />
            <Route path="/recovery/forensics" element={<ProtectedRoute><RecoveryDashboard /></ProtectedRoute>} />
            <Route path="/recovery/settings" element={<ProtectedRoute><RecoveryDashboard /></ProtectedRoute>} />

            {/* Internal Messaging */}
            <Route path="/messages" element={<ProtectedRoute><InternalMessaging /></ProtectedRoute>} />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;