import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Risk Department Pages
import RiskOverview from './pages/RiskOverview';
import RiskAssessment from './pages/RiskAssessment';
import ThreatAnalysis from './pages/ThreatAnalysis';
import RiskReports from './pages/RiskReports';
import MitigationPlans from './pages/MitigationPlans';
import Alerts from './pages/Alerts';
import Reporting from './pages/Reporting';
import Mitigation from './pages/Mitigation';
import Monitoring from './pages/Monitoring';

const RiskDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<RiskOverview />} />
      <Route path="/assessment" element={<RiskAssessment />} />
      <Route path="/threats" element={<ThreatAnalysis />} />
      <Route path="/reports" element={<RiskReports />} />
      <Route path="/mitigation" element={<MitigationPlans />} />
      <Route path="/alerts" element={<Alerts />} />
      <Route path="/reporting" element={<Reporting />} />
      <Route path="/mitigation-plans" element={<Mitigation />} />
      <Route path="/monitoring" element={<Monitoring />} />
    </Routes>
  );
};

export default RiskDashboard;
