import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GuardOverview from './pages/GuardOverview';
import GuardAssignment from './pages/GuardAssignment';
import PatrolSchedules from './pages/PatrolSchedules';
import IncidentReports from './pages/IncidentReports';
import Training from './pages/Training';
import Performance from './pages/Performance';

const SecurityGuardManagementDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GuardOverview />} />
      <Route path="/guard-assignment" element={<GuardAssignment />} />
      <Route path="/patrol-schedules" element={<PatrolSchedules />} />
      <Route path="/incident-reports" element={<IncidentReports />} />
      <Route path="/training" element={<Training />} />
      <Route path="/performance" element={<Performance />} />
    </Routes>
  );
};

export default SecurityGuardManagementDashboard; 