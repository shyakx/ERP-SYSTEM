import React, { useState } from 'react';
import { Search, Filter, X, Calendar, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

interface AdvancedSearchProps {
  onSearch: (filters: any) => void;
  onClear: () => void;
  searchFields: {
    name: string;
    label: string;
    type: 'text' | 'select' | 'date' | 'number' | 'range';
    options?: { value: string; label: string }[];
  }[];
  placeholder?: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  onSearch,
  onClear,
  searchFields,
  placeholder = "Search..."
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<any>({});
  const [quickSearch, setQuickSearch] = useState('');

  const handleFilterChange = (field: string, value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuickSearch = (value: string) => {
    setQuickSearch(value);
    if (value.trim()) {
      onSearch({ quickSearch: value.trim() });
    } else {
      onClear();
    }
  };

  const handleAdvancedSearch = () => {
    const activeFilters = Object.keys(filters).reduce((acc, key) => {
      if (filters[key] !== '' && filters[key] !== null && filters[key] !== undefined) {
        acc[key] = filters[key];
      }
      return acc;
    }, {} as any);

    if (Object.keys(activeFilters).length > 0) {
      onSearch(activeFilters);
    }
  };

  const handleClearAll = () => {
    setFilters({});
    setQuickSearch('');
    onClear();
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            placeholder={`Search ${field.label.toLowerCase()}...`}
            value={filters[field.name] || ''}
            onChange={(e) => handleFilterChange(field.name, e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );

      case 'select':
        return (
          <select
            value={filters[field.name] || ''}
            onChange={(e) => handleFilterChange(field.name, e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All {field.label}</option>
            {field.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'date':
        return (
          <input
            type="date"
            value={filters[field.name] || ''}
            onChange={(e) => handleFilterChange(field.name, e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            placeholder={`Enter ${field.label.toLowerCase()}...`}
            value={filters[field.name] || ''}
            onChange={(e) => handleFilterChange(field.name, e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );

      case 'range':
        return (
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters[`${field.name}Min`] || ''}
              onChange={(e) => handleFilterChange(`${field.name}Min`, e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters[`${field.name}Max`] || ''}
              onChange={(e) => handleFilterChange(`${field.name}Max`, e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const activeFiltersCount = Object.keys(filters).filter(key => 
    filters[key] !== '' && filters[key] !== null && filters[key] !== undefined
  ).length;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Quick Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={placeholder}
              value={quickSearch}
              onChange={(e) => handleQuickSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                {activeFiltersCount}
              </span>
            )}
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchFields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleAdvancedSearch}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Search className="w-4 h-4" />
                <span>Apply Filters</span>
              </button>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>

            {activeFiltersCount > 0 && (
              <div className="text-sm text-gray-500">
                {activeFiltersCount} active filter{activeFiltersCount !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch; 