import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Inventory Department Pages
import InventoryOverview from './pages/InventoryOverview';
import StockManagement from './pages/StockManagement';
import AssetTracking from './pages/AssetTracking';
import Procurement from './pages/Procurement';
import Maintenance from './pages/Maintenance';
import Reports from './pages/Reports';

const InventoryDashboard: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<InventoryOverview />} />
      <Route path="/stock" element={<StockManagement />} />
      <Route path="/assets" element={<AssetTracking />} />
      <Route path="/procurement" element={<Procurement />} />
      <Route path="/maintenance" element={<Maintenance />} />
    </Routes>
  );
};

export default InventoryDashboard;
