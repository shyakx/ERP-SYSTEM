import React from 'react';
import { Routes, Route } from 'react-router-dom';

// It Department Pages
import ITOverview from './pages/ITOverview';
import SystemManagement from './pages/SystemManagement';
import UserSupport from './pages/UserSupport';
import Network from './pages/Network';
import Security from './pages/Security';
import Maintenance from './pages/Maintenance';

const ItDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ITOverview />} />
      <Route path="/systems" element={<SystemManagement />} />
      <Route path="/support" element={<UserSupport />} />
      <Route path="/security" element={<Security />} />
      <Route path="/reports" element={<Maintenance />} />
    </Routes>
  );
};

export default ItDashboard;
