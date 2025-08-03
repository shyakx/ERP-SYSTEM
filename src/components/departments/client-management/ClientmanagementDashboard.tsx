import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Client management Department Pages
import ClientOverview from './pages/ClientOverview';
import ClientDatabase from './pages/ClientDatabase';
import ContractManagement from './pages/ContractManagement';
import Billing from './pages/Billing';
import Support from './pages/Support';
import Analytics from './pages/Analytics';

const ClientmanagementDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientOverview />} />
      <Route path="/clientdatabase" element={<ClientDatabase />} />
      <Route path="/contractmanagement" element={<ContractManagement />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/support" element={<Support />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
};

export default ClientmanagementDashboard;
