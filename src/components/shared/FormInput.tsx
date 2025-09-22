import React, { forwardRef } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

export interface FormInputProps {
  label?: string;
  name: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local';
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  min?: number;
  max?: number;
  step?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
  showPasswordToggle?: boolean;
  prefix?: string;
  suffix?: string;
  size?: 'sm' | 'md' | 'lg';
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  required = false,
  disabled = false,
  readOnly = false,
  autoComplete,
  min,
  max,
  step,
  minLength,
  maxLength,
  pattern,
  className = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  helpText,
  showPasswordToggle = false,
  prefix,
  suffix,
  size = 'md'
}, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const hasError = touched && error;
  const showError = hasError;

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-4 py-4 text-lg'
  };

  const baseInputClasses = `
    w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${sizeClasses[size]}
    ${hasError 
      ? 'border-red-500 bg-red-50 focus:ring-red-500' 
      : isFocused 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-300 bg-white hover:border-gray-400'
    }
    ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
    ${readOnly ? 'bg-gray-50 cursor-default' : ''}
    ${prefix || suffix ? 'pl-10 pr-10' : ''}
    ${inputClassName}
  `.trim();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

      {/* Input Container */}
      <div className="relative">
        {/* Prefix */}
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">{prefix}</span>
          </div>
        )}

        {/* Input */}
        <input
          ref={ref}
          id={name}
          name={name}
          type={inputType}
          value={value || ''}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          min={min}
          max={max}
          step={step}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          className={baseInputClasses}
          aria-invalid={showError}
          aria-describedby={showError ? `${name}-error` : helpText ? `${name}-help` : undefined}
        />

        {/* Password Toggle */}
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Suffix */}
        {suffix && !showPasswordToggle && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">{suffix}</span>
          </div>
        )}

        {/* Error Icon */}
        {showError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

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

FormInput.displayName = 'FormInput';

export default FormInput;
