import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Risk Department Pages
import RiskOverview from './pages/RiskOverview';
import RiskAssessment from './pages/RiskAssessment';
import Mitigation from './pages/Mitigation';
import Monitoring from './pages/Monitoring';
import Reporting from './pages/Reporting';
import Alerts from './pages/Alerts';

const RiskDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RiskOverview />} />
      <Route path="/riskassessment" element={<RiskAssessment />} />
      <Route path="/mitigation" element={<Mitigation />} />
      <Route path="/monitoring" element={<Monitoring />} />
      <Route path="/reporting" element={<Reporting />} />
      <Route path="/alerts" element={<Alerts />} />
    </Routes>
  );
};

export default RiskDashboard;
