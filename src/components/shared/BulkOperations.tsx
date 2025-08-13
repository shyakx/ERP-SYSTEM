import React, { useState, useRef } from 'react';
import { Download, Upload, Trash2, Edit, CheckSquare, Square, FileText, AlertCircle } from 'lucide-react';

interface BulkOperationsProps {
  selectedItems: string[];
  onSelectAll: (selected: boolean) => void;
  onBulkDelete: () => void;
  onBulkEdit: () => void;
  onExport: (format: 'csv' | 'excel' | 'pdf') => void;
  onImport: (file: File) => void;
  totalItems: number;
  itemName: string;
  showImport?: boolean;
  showExport?: boolean;
  showBulkEdit?: boolean;
  showBulkDelete?: boolean;
}

const BulkOperations: React.FC<BulkOperationsProps> = ({
  selectedItems,
  onSelectAll,
  onBulkDelete,
  onBulkEdit,
  onExport,
  onImport,
  totalItems,
  itemName,
  showImport = true,
  showExport = true,
  showBulkEdit = true,
  showBulkDelete = true
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string>('');

  const isAllSelected = selectedItems.length === totalItems && totalItems > 0;
  const isPartiallySelected = selectedItems.length > 0 && selectedItems.length < totalItems;

  const handleSelectAll = () => {
    onSelectAll(!isAllSelected);
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf') => {
    onExport(format);
    setShowDropdown(false);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setImportError('Please select a valid CSV or Excel file');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setImportError('File size must be less than 5MB');
        return;
      }

      setImportError('');
      onImport(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} selected ${itemName}?`)) {
      onBulkDelete();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* Selection Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleSelectAll}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              {isAllSelected ? (
                <CheckSquare className="w-5 h-5 text-blue-600" />
              ) : (
                <Square className="w-5 h-5 text-gray-400" />
              )}
              <span className="text-sm font-medium">
                {isAllSelected ? 'Deselect All' : 'Select All'}
              </span>
            </button>
          </div>

          {selectedItems.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>{selectedItems.length} of {totalItems} selected</span>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="flex items-center space-x-2">
            {showBulkEdit && (
              <button
                onClick={onBulkEdit}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                <span>Bulk Edit</span>
              </button>
            )}

            {showBulkDelete && (
              <button
                onClick={handleBulkDelete}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Selected</span>
              </button>
            )}
          </div>
        )}

        {/* Import/Export Actions */}
        <div className="flex items-center space-x-2">
          {showImport && (
            <div className="relative">
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleImport}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
            </div>
          )}

          {showExport && (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[150px]">
                  <button
                    onClick={() => handleExport('csv')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Export as CSV</span>
                  </button>
                  <button
                    onClick={() => handleExport('excel')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Export as Excel</span>
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Export as PDF</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Import Error */}
      {importError && (
        <div className="mt-3 flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>{importError}</span>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-3 text-xs text-gray-500">
        <p>• Select items to perform bulk operations</p>
        <p>• Import supports CSV and Excel files (max 5MB)</p>
        <p>• Export available in CSV, Excel, and PDF formats</p>
      </div>
    </div>
  );
};

export default BulkOperations; 