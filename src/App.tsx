import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import LoadingSpinner from "./components/shared/LoadingSpinner";
import ErrorBoundary from "./components/shared/ErrorBoundary";
import { NotificationProvider } from "./components/shared/NotificationSystem";
import { LayoutProvider } from "./contexts/LayoutContext";

// Lazy load components for better performance
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const HRDashboard = lazy(() => import("./components/departments/hr/HRDashboard"));
const FinanceDashboard = lazy(() => import("./components/departments/finance/FinanceDashboard"));
const ITDashboard = lazy(() => import("./components/departments/it/ItDashboard"));
const SecurityDashboard = lazy(() => import("./components/departments/security-guard-management/SecurityGuardManagementDashboard"));
const OperationsDashboard = lazy(() => import("./components/departments/inventory/InventoryDashboard"));
const CustomerExperienceDashboard = lazy(() => import("./components/departments/customer-experience/CustomerexperienceDashboard"));
const SalesMarketingDashboard = lazy(() => import("./components/departments/sales-marketing/SalesmarketingDashboard"));
const RiskDashboard = lazy(() => import("./components/departments/risk/RiskDashboard"));
const RecoveryDashboard = lazy(() => import("./components/departments/recovery/RecoveryDashboard"));
const TimeClock = lazy(() => import("./components/shared/TimeClock"));
const PersonalLeave = lazy(() => import("./components/shared/PersonalLeave"));

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
  const { user, getDashboardRoute } = useAuth();

  if (user) {
    // Redirect based on user role
    const dashboardRoute = getDashboardRoute(user.role);
    return <Navigate to={dashboardRoute} replace />;
  }

  return <>{children}</>;
};

// Role-based Route Component
const RoleBasedRoute: React.FC<{ 
  children: React.ReactNode; 
  allowedRoles: string[];
  fallbackRoute?: string;
}> = ({ children, allowedRoles, fallbackRoute = '/login' }) => {
  const { user, getDashboardRoute } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to user's appropriate dashboard
    const dashboardRoute = getDashboardRoute(user.role);
    return <Navigate to={dashboardRoute} replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Add resource management
  useEffect(() => {
    // Add a small delay to prevent resource exhaustion on initial load
    const timer = setTimeout(() => {
      // Preload critical resources
      console.log('App initialized with resource optimization');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
    <AuthProvider>
    <NotificationProvider>
    <LayoutProvider>
      <Router>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<RoleBasedRoute allowedRoles={['admin']}><AdminDashboard /></RoleBasedRoute>} />
            <Route path="/admin/overview" element={<RoleBasedRoute allowedRoles={['admin']}><AdminDashboard /></RoleBasedRoute>} />
            <Route path="/admin/departments" element={<RoleBasedRoute allowedRoles={['admin']}><AdminDashboard /></RoleBasedRoute>} />
            <Route path="/admin/users" element={<RoleBasedRoute allowedRoles={['admin']}><AdminDashboard /></RoleBasedRoute>} />
            <Route path="/admin/audit" element={<RoleBasedRoute allowedRoles={['admin']}><AdminDashboard /></RoleBasedRoute>} />
            <Route path="/admin/reports" element={<RoleBasedRoute allowedRoles={['admin']}><AdminDashboard /></RoleBasedRoute>} />
            <Route path="/admin/analytics" element={<RoleBasedRoute allowedRoles={['admin']}><AdminDashboard /></RoleBasedRoute>} />
            <Route path="/admin/settings" element={<RoleBasedRoute allowedRoles={['admin']}><AdminDashboard /></RoleBasedRoute>} />
            
            {/* HR Routes */}
            <Route path="/hr" element={<RoleBasedRoute allowedRoles={['admin', 'hr']}><HRDashboard /></RoleBasedRoute>} />
            <Route path="/hr/employees" element={<RoleBasedRoute allowedRoles={['admin', 'hr']}><HRDashboard /></RoleBasedRoute>} />
            <Route path="/hr/recruitment" element={<RoleBasedRoute allowedRoles={['admin', 'hr']}><HRDashboard /></RoleBasedRoute>} />
            <Route path="/hr/training" element={<RoleBasedRoute allowedRoles={['admin', 'hr']}><HRDashboard /></RoleBasedRoute>} />
            <Route path="/hr/payroll" element={<RoleBasedRoute allowedRoles={['admin', 'hr']}><HRDashboard /></RoleBasedRoute>} />
            <Route path="/hr/performance" element={<RoleBasedRoute allowedRoles={['admin', 'hr']}><HRDashboard /></RoleBasedRoute>} />
            <Route path="/hr/leave" element={<RoleBasedRoute allowedRoles={['admin', 'hr']}><HRDashboard /></RoleBasedRoute>} />
            <Route path="/hr/attendance" element={<RoleBasedRoute allowedRoles={['admin', 'hr']}><HRDashboard /></RoleBasedRoute>} />
            <Route path="/hr/benefits" element={<RoleBasedRoute allowedRoles={['admin', 'hr']}><HRDashboard /></RoleBasedRoute>} />
            <Route path="/hr/compliance" element={<RoleBasedRoute allowedRoles={['admin', 'hr']}><HRDashboard /></RoleBasedRoute>} />
            <Route path="/hr/reports" element={<RoleBasedRoute allowedRoles={['admin', 'hr']}><HRDashboard /></RoleBasedRoute>} />
            <Route path="/hr/settings" element={<RoleBasedRoute allowedRoles={['admin', 'hr']}><HRDashboard /></RoleBasedRoute>} />

            {/* Finance Routes */}
            <Route path="/finance" element={<RoleBasedRoute allowedRoles={['admin', 'finance']}><FinanceDashboard /></RoleBasedRoute>} />
            <Route path="/finance/overview" element={<RoleBasedRoute allowedRoles={['admin', 'finance']}><FinanceDashboard /></RoleBasedRoute>} />
            <Route path="/finance/payable" element={<RoleBasedRoute allowedRoles={['admin', 'finance']}><FinanceDashboard /></RoleBasedRoute>} />
            <Route path="/finance/receivable" element={<RoleBasedRoute allowedRoles={['admin', 'finance']}><FinanceDashboard /></RoleBasedRoute>} />
            <Route path="/finance/tax" element={<RoleBasedRoute allowedRoles={['admin', 'finance']}><FinanceDashboard /></RoleBasedRoute>} />
            <Route path="/finance/budgeting" element={<RoleBasedRoute allowedRoles={['admin', 'finance']}><FinanceDashboard /></RoleBasedRoute>} />
            <Route path="/finance/reports" element={<RoleBasedRoute allowedRoles={['admin', 'finance']}><FinanceDashboard /></RoleBasedRoute>} />
            <Route path="/finance/cash" element={<RoleBasedRoute allowedRoles={['admin', 'finance']}><FinanceDashboard /></RoleBasedRoute>} />
            <Route path="/finance/expenses" element={<RoleBasedRoute allowedRoles={['admin', 'finance']}><FinanceDashboard /></RoleBasedRoute>} />
            <Route path="/finance/planning" element={<RoleBasedRoute allowedRoles={['admin', 'finance']}><FinanceDashboard /></RoleBasedRoute>} />

            {/* IT Routes */}
            <Route path="/it" element={<RoleBasedRoute allowedRoles={['admin', 'it']}><ITDashboard /></RoleBasedRoute>} />
            <Route path="/it/overview" element={<RoleBasedRoute allowedRoles={['admin', 'it']}><ITDashboard /></RoleBasedRoute>} />
            <Route path="/it/systems" element={<RoleBasedRoute allowedRoles={['admin', 'it']}><ITDashboard /></RoleBasedRoute>} />
            <Route path="/it/support" element={<RoleBasedRoute allowedRoles={['admin', 'it']}><ITDashboard /></RoleBasedRoute>} />
            <Route path="/it/network" element={<RoleBasedRoute allowedRoles={['admin', 'it']}><ITDashboard /></RoleBasedRoute>} />
            <Route path="/it/security" element={<RoleBasedRoute allowedRoles={['admin', 'it']}><ITDashboard /></RoleBasedRoute>} />
            <Route path="/it/maintenance" element={<RoleBasedRoute allowedRoles={['admin', 'it']}><ITDashboard /></RoleBasedRoute>} />
            <Route path="/it/backup" element={<RoleBasedRoute allowedRoles={['admin', 'it']}><ITDashboard /></RoleBasedRoute>} />
            <Route path="/it/software" element={<RoleBasedRoute allowedRoles={['admin', 'it']}><ITDashboard /></RoleBasedRoute>} />
            <Route path="/it/reports" element={<RoleBasedRoute allowedRoles={['admin', 'it']}><ITDashboard /></RoleBasedRoute>} />

            {/* Security Routes */}
            <Route path="/security" element={<RoleBasedRoute allowedRoles={['admin', 'security']}><SecurityDashboard /></RoleBasedRoute>} />
            <Route path="/security/overview" element={<RoleBasedRoute allowedRoles={['admin', 'security']}><SecurityDashboard /></RoleBasedRoute>} />
            <Route path="/security/assignment" element={<RoleBasedRoute allowedRoles={['admin', 'security']}><SecurityDashboard /></RoleBasedRoute>} />
            <Route path="/security/patrols" element={<RoleBasedRoute allowedRoles={['admin', 'security']}><SecurityDashboard /></RoleBasedRoute>} />
            <Route path="/security/incidents" element={<RoleBasedRoute allowedRoles={['admin', 'security']}><SecurityDashboard /></RoleBasedRoute>} />
            <Route path="/security/training" element={<RoleBasedRoute allowedRoles={['admin', 'security']}><SecurityDashboard /></RoleBasedRoute>} />
            <Route path="/security/performance" element={<RoleBasedRoute allowedRoles={['admin', 'security']}><SecurityDashboard /></RoleBasedRoute>} />
            <Route path="/security/equipment" element={<RoleBasedRoute allowedRoles={['admin', 'security']}><SecurityDashboard /></RoleBasedRoute>} />
            <Route path="/security/reports" element={<RoleBasedRoute allowedRoles={['admin', 'security']}><SecurityDashboard /></RoleBasedRoute>} />
            <Route path="/security/settings" element={<RoleBasedRoute allowedRoles={['admin', 'security']}><SecurityDashboard /></RoleBasedRoute>} />

            {/* Operations Routes */}
            <Route path="/operations" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/operations/overview" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/operations/stock" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/operations/assets" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/operations/procurement" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/operations/maintenance" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/operations/warehouse" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/operations/quality" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/operations/reports" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/operations/analytics" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />

            {/* Inventory Routes */}
            <Route path="/inventory" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/inventory/overview" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/inventory/stock" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/inventory/assets" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/inventory/procurement" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/inventory/maintenance" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/inventory/warehouse" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/inventory/quality" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/inventory/reports" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />
            <Route path="/inventory/analytics" element={<RoleBasedRoute allowedRoles={['admin', 'inventory']}><OperationsDashboard /></RoleBasedRoute>} />

            {/* Sales & Marketing Routes */}
            <Route path="/sales" element={<RoleBasedRoute allowedRoles={['admin', 'sales']}><SalesMarketingDashboard /></RoleBasedRoute>} />
            <Route path="/sales/overview" element={<RoleBasedRoute allowedRoles={['admin', 'sales']}><SalesMarketingDashboard /></RoleBasedRoute>} />
            <Route path="/sales/leads" element={<RoleBasedRoute allowedRoles={['admin', 'sales']}><SalesMarketingDashboard /></RoleBasedRoute>} />
            <Route path="/sales/pipeline" element={<RoleBasedRoute allowedRoles={['admin', 'sales']}><SalesMarketingDashboard /></RoleBasedRoute>} />
            <Route path="/sales/campaigns" element={<RoleBasedRoute allowedRoles={['admin', 'sales']}><SalesMarketingDashboard /></RoleBasedRoute>} />
            <Route path="/sales/opportunities" element={<RoleBasedRoute allowedRoles={['admin', 'sales']}><SalesMarketingDashboard /></RoleBasedRoute>} />
            <Route path="/sales/quotes" element={<RoleBasedRoute allowedRoles={['admin', 'sales']}><SalesMarketingDashboard /></RoleBasedRoute>} />
            <Route path="/sales/analytics" element={<RoleBasedRoute allowedRoles={['admin', 'sales']}><SalesMarketingDashboard /></RoleBasedRoute>} />
            <Route path="/sales/reports" element={<RoleBasedRoute allowedRoles={['admin', 'sales']}><SalesMarketingDashboard /></RoleBasedRoute>} />
            <Route path="/sales/settings" element={<RoleBasedRoute allowedRoles={['admin', 'sales']}><SalesMarketingDashboard /></RoleBasedRoute>} />

            {/* Customer Experience Routes */}
            <Route path="/cx" element={<RoleBasedRoute allowedRoles={['admin', 'cx']}><CustomerExperienceDashboard /></RoleBasedRoute>} />
            <Route path="/cx/overview" element={<RoleBasedRoute allowedRoles={['admin', 'cx']}><CustomerExperienceDashboard /></RoleBasedRoute>} />
            <Route path="/cx/support" element={<RoleBasedRoute allowedRoles={['admin', 'cx']}><CustomerExperienceDashboard /></RoleBasedRoute>} />
            <Route path="/cx/feedback" element={<RoleBasedRoute allowedRoles={['admin', 'cx']}><CustomerExperienceDashboard /></RoleBasedRoute>} />
            <Route path="/cx/surveys" element={<RoleBasedRoute allowedRoles={['admin', 'cx']}><CustomerExperienceDashboard /></RoleBasedRoute>} />
            <Route path="/cx/quality" element={<RoleBasedRoute allowedRoles={['admin', 'cx']}><CustomerExperienceDashboard /></RoleBasedRoute>} />
            <Route path="/cx/tickets" element={<RoleBasedRoute allowedRoles={['admin', 'cx']}><CustomerExperienceDashboard /></RoleBasedRoute>} />
            <Route path="/cx/satisfaction" element={<RoleBasedRoute allowedRoles={['admin', 'cx']}><CustomerExperienceDashboard /></RoleBasedRoute>} />
            <Route path="/cx/communication" element={<RoleBasedRoute allowedRoles={['admin', 'cx']}><CustomerExperienceDashboard /></RoleBasedRoute>} />
            <Route path="/cx/reports" element={<RoleBasedRoute allowedRoles={['admin', 'cx']}><CustomerExperienceDashboard /></RoleBasedRoute>} />

            {/* Risk Management Routes */}
            <Route path="/risk" element={<RoleBasedRoute allowedRoles={['admin', 'risk']}><RiskDashboard /></RoleBasedRoute>} />
            <Route path="/risk/overview" element={<RoleBasedRoute allowedRoles={['admin', 'risk']}><RiskDashboard /></RoleBasedRoute>} />
            <Route path="/risk/assessment" element={<RoleBasedRoute allowedRoles={['admin', 'risk']}><RiskDashboard /></RoleBasedRoute>} />
            <Route path="/risk/threats" element={<RoleBasedRoute allowedRoles={['admin', 'risk']}><RiskDashboard /></RoleBasedRoute>} />
            <Route path="/risk/reports" element={<RoleBasedRoute allowedRoles={['admin', 'risk']}><RiskDashboard /></RoleBasedRoute>} />
            <Route path="/risk/mitigation" element={<RoleBasedRoute allowedRoles={['admin', 'risk']}><RiskDashboard /></RoleBasedRoute>} />
            <Route path="/risk/alerts" element={<RoleBasedRoute allowedRoles={['admin', 'risk']}><RiskDashboard /></RoleBasedRoute>} />
            <Route path="/risk/reporting" element={<RoleBasedRoute allowedRoles={['admin', 'risk']}><RiskDashboard /></RoleBasedRoute>} />
            <Route path="/risk/monitoring" element={<RoleBasedRoute allowedRoles={['admin', 'risk']}><RiskDashboard /></RoleBasedRoute>} />
            <Route path="/risk/incidents" element={<RoleBasedRoute allowedRoles={['admin', 'risk']}><RiskDashboard /></RoleBasedRoute>} />
            <Route path="/risk/compliance" element={<RoleBasedRoute allowedRoles={['admin', 'risk']}><RiskDashboard /></RoleBasedRoute>} />

            {/* Recovery Routes */}
            <Route path="/recovery" element={<RoleBasedRoute allowedRoles={['admin', 'recovery']}><RecoveryDashboard /></RoleBasedRoute>} />
            <Route path="/recovery/overview" element={<RoleBasedRoute allowedRoles={['admin', 'recovery']}><RecoveryDashboard /></RoleBasedRoute>} />
            <Route path="/recovery/investigation" element={<RoleBasedRoute allowedRoles={['admin', 'recovery']}><RecoveryDashboard /></RoleBasedRoute>} />
            <Route path="/recovery/cases" element={<RoleBasedRoute allowedRoles={['admin', 'recovery']}><RecoveryDashboard /></RoleBasedRoute>} />
            <Route path="/recovery/documentation" element={<RoleBasedRoute allowedRoles={['admin', 'recovery']}><RecoveryDashboard /></RoleBasedRoute>} />
            <Route path="/recovery/legal" element={<RoleBasedRoute allowedRoles={['admin', 'recovery']}><RecoveryDashboard /></RoleBasedRoute>} />
            <Route path="/recovery/reports" element={<RoleBasedRoute allowedRoles={['admin', 'recovery']}><RecoveryDashboard /></RoleBasedRoute>} />
            <Route path="/recovery/assets" element={<RoleBasedRoute allowedRoles={['admin', 'recovery']}><RecoveryDashboard /></RoleBasedRoute>} />
            <Route path="/recovery/forensics" element={<RoleBasedRoute allowedRoles={['admin', 'recovery']}><RecoveryDashboard /></RoleBasedRoute>} />
            <Route path="/recovery/settings" element={<RoleBasedRoute allowedRoles={['admin', 'recovery']}><RecoveryDashboard /></RoleBasedRoute>} />


            {/* Global User Features */}
            <Route path="/timeclock" element={<ProtectedRoute><TimeClock /></ProtectedRoute>} />
            <Route path="/myleave" element={<ProtectedRoute><PersonalLeave /></ProtectedRoute>} />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
        
        {/* Global Chat Interface - Now handled by DepartmentLayout */}
      </Router>
    </LayoutProvider>
    </NotificationProvider>
    </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;