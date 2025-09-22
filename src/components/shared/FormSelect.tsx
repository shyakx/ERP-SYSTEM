import React, { forwardRef } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface FormSelectProps {
  label?: string;
  name: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
  size?: 'sm' | 'md' | 'lg';
  searchable?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(({
  label,
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder = 'Select an option...',
  error,
  touched,
  required = false,
  disabled = false,
  multiple = false,
  className = '',
  selectClassName = '',
  labelClassName = '',
  errorClassName = '',
  helpText,
  size = 'md',
  searchable = false,
  clearable = false,
  onClear
}, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const hasError = touched && error;
  const showError = hasError;

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-4 py-4 text-lg'
  };

  const baseSelectClasses = `
    w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white
    ${sizeClasses[size]}
    ${hasError 
      ? 'border-red-500 bg-red-50 focus:ring-red-500' 
      : isFocused 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-300 hover:border-gray-400'
    }
    ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'cursor-pointer'}
    ${selectClassName}
  `.trim();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClear?.();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={name}
          className={`block text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Select Container */}
      <div className="relative">
        {/* Select */}
        <select
          ref={ref}
          id={name}
          name={name}
          value={value || (multiple ? [] : '')}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          multiple={multiple}
          className={baseSelectClasses}
          aria-invalid={showError}
          aria-describedby={showError ? `${name}-error` : helpText ? `${name}-help` : undefined}
        >
          {!multiple && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Dropdown Arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>

        {/* Clear Button */}
        {clearable && value && !multiple && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-8 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            tabIndex={-1}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Error Icon */}
        {showError && (
          <div className="absolute inset-y-0 right-0 pr-8 flex items-center pointer-events-none">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

      {/* Selected Values Display (for multiple select) */}
      {multiple && Array.isArray(value) && value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((selectedValue: string | number) => {
            const option = options.find(opt => opt.value === selectedValue);
            return option ? (
              <span
                key={selectedValue}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
              >
                {option.label}
                <button
                  type="button"
                  onClick={() => {
                    const newValue = value.filter((v: string | number) => v !== selectedValue);
                    onChange({
                      target: { value: newValue, name }
                    } as React.ChangeEvent<HTMLSelectElement>);
                  }}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ) : null;
          })}
        </div>
      )}

      {/* Help Text */}
      {helpText && !showError && (
        <p id={`${name}-help`} className="text-sm text-gray-500">
          {helpText}
        </p>
      )}

      {/* Error Message */}
      {showError && (
        <p id={`${name}-error`} className={`text-sm text-red-600 flex items-center space-x-1 ${errorClassName}`}>
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
});

FormSelect.displayName = 'FormSelect';

export default FormSelect;
