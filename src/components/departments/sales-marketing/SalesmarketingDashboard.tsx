import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Sales marketing Department Pages
import SalesOverview from './pages/SalesOverview';
import LeadManagement from './pages/LeadManagement';
import Campaigns from './pages/Campaigns';
import Opportunities from './pages/Opportunities';
import Quotes from './pages/Quotes';
import Analytics from './pages/Analytics';

const SalesmarketingDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SalesOverview />} />
      <Route path="/leadmanagement" element={<LeadManagement />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/opportunities" element={<Opportunities />} />
      <Route path="/quotes" element={<Quotes />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
};

export default SalesmarketingDashboard;
