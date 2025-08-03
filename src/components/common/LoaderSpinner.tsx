import React from 'react';
import { Shield } from 'lucide-react';

const LoaderSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
          <Shield className="w-10 h-10 text-white animate-bounce" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-gray-900">Dicel ERP</h2>
        <p className="mt-2 text-gray-600">Loading...</p>
        <div className="mt-6 flex justify-center">
          <div className="spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default LoaderSpinner;