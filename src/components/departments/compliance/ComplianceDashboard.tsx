import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Compliance Department Pages
import ComplianceOverview from './pages/ComplianceOverview';
import RegulatoryCompliance from './pages/RegulatoryCompliance';
import AuditManagement from './pages/AuditManagement';
import PolicyManagement from './pages/PolicyManagement';
import RiskAssessment from './pages/RiskAssessment';
import IncidentReporting from './pages/IncidentReporting';

const ComplianceDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ComplianceOverview />} />
      <Route path="/regulatory" element={<RegulatoryCompliance />} />
      <Route path="/audit" element={<AuditManagement />} />
      <Route path="/policies" element={<PolicyManagement />} />
      <Route path="/risk-assessment" element={<RiskAssessment />} />
      <Route path="/incidents" element={<IncidentReporting />} />
    </Routes>
  );
};

export default ComplianceDashboard;
 