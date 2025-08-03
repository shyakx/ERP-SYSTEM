import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Customer experience Department Pages
import CustomerOverview from './pages/CustomerOverview';
import CustomerSupport from './pages/CustomerSupport';
import FeedbackManagement from './pages/FeedbackManagement';
import SatisfactionSurveys from './pages/SatisfactionSurveys';
import ServiceQuality from './pages/ServiceQuality';

const CustomerexperienceDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CustomerOverview />} />
      <Route path="/support" element={<CustomerSupport />} />
      <Route path="/feedback" element={<FeedbackManagement />} />
      <Route path="/surveys" element={<SatisfactionSurveys />} />
      <Route path="/quality" element={<ServiceQuality />} />
    </Routes>
  );
};

export default CustomerexperienceDashboard;
