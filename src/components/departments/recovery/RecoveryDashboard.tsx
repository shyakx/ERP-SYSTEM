import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Recovery Department Pages
import RecoveryOverview from './pages/RecoveryOverview';
import CaseManagement from './pages/CaseManagement';
import Investigation from './pages/Investigation';
import Documentation from './pages/Documentation';
import Legal from './pages/Legal';
import Reports from './pages/Reports';

const RecoveryDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RecoveryOverview />} />
      <Route path="/casemanagement" element={<CaseManagement />} />
      <Route path="/investigation" element={<Investigation />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
};

export default RecoveryDashboard;
