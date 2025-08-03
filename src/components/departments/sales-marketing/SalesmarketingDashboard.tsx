import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Sales marketing Department Pages
import SalesOverview from './pages/SalesOverview';
import LeadManagement from './pages/LeadManagement';
import SalesPipeline from './pages/SalesPipeline';
import Campaigns from './pages/Campaigns';
import SalesReports from './pages/SalesReports';

const SalesmarketingDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SalesOverview />} />
      <Route path="/leads" element={<LeadManagement />} />
      <Route path="/pipeline" element={<SalesPipeline />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/reports" element={<SalesReports />} />
    </Routes>
  );
};

export default SalesmarketingDashboard;
