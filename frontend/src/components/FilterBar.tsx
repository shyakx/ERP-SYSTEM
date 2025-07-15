import React from 'react';

export type FilterFieldType = 'select' | 'text';

export interface FilterField {
  key: string;
  label: string;
  type: FilterFieldType;
  value: string;
  options?: { value: string; label: string }[]; // for select
  placeholder?: string; // for text
}

interface FilterBarProps {
  fields: FilterField[];
  onChange: (key: string, value: string) => void;
  showToggle?: boolean;
  show?: boolean;
  onToggle?: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ fields, onChange, showToggle = false, show = true, onToggle }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 mb-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
        Filters
      </h3>
      {showToggle && (
        <button
          onClick={onToggle}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          {show ? 'Hide' : 'Show'} Filters
        </button>
      )}
    </div>
    {show && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {fields.map(field => (
          <div key={field.key}>
            <label className="block text-xs font-medium text-gray-700 mb-1">{field.label}</label>
            {field.type === 'select' ? (
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={field.value}
                onChange={e => onChange(field.key, e.target.value)}
              >
                {field.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder={field.placeholder || ''}
                value={field.value}
                onChange={e => onChange(field.key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default FilterBar; 