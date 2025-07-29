import React from 'react';
import { Users, Plus, Search, Filter, Download, Upload } from 'lucide-react';

const TrainingRecords: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                Training Records
              </h1>
              <p className="text-gray-600 mt-2">Manage compliance training records and certifications</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <Plus className="h-5 w-5" />
                Add Training Record
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors">
                <Download className="h-5 w-5" />
                Export Records
              </button>
            </div>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Training Records Management</h3>
            <p className="text-gray-600 mb-6">
              This page will allow you to manage compliance training records, track certifications, 
              and monitor training completion status for all employees.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add Training Record
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                View All Records
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingRecords; 