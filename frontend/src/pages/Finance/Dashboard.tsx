import React from 'react';

const FinanceDashboard: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full text-center">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Finance Dashboard</h1>
        <p className="text-gray-600 mb-6">Welcome to the Finance dashboard. Key financial metrics and quick actions will appear here.</p>
      </div>
    </div>
  </div>
);

export default FinanceDashboard; 