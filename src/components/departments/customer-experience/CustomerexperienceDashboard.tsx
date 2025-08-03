import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Customer experience Department Pages
import CustomerOverview from './pages/CustomerOverview';
import SupportTickets from './pages/SupportTickets';
import Feedback from './pages/Feedback';
import Satisfaction from './pages/Satisfaction';
import Communication from './pages/Communication';
import Reports from './pages/Reports';

const CustomerexperienceDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomerOverview />} />
      <Route path="/supporttickets" element={<SupportTickets />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/satisfaction" element={<Satisfaction />} />
      <Route path="/communication" element={<Communication />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
};

export default CustomerexperienceDashboard;
