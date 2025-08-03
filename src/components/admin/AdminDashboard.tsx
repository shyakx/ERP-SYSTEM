import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Admin Dashboard Pages
import AdminOverview from './pages/AdminOverview';
import DepartmentManagement from './pages/DepartmentManagement';
import SystemSettings from './pages/SystemSettings';
import UserManagement from './pages/UserManagement';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';

const AdminDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminOverview />} />
      <Route path="/departments" element={<DepartmentManagement />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/settings" element={<SystemSettings />} />
    </Routes>
  );
};

export default AdminDashboard; 