import React from "react";

const Monitoring: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Monitors</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-xs text-gray-500">Current monitors</p>
            </div>
            <div className="text-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring; 