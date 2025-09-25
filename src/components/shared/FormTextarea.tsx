import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export interface FormTextareaProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  cols?: number;
  minLength?: number;
  maxLength?: number;
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  helpText?: string;
  size?: 'sm' | 'md' | 'lg';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  touched,
  required = false,
  disabled = false,
  readOnly = false,
  rows = 4,
  cols,
  minLength,
  maxLength,
  className = '',
  textareaClassName = '',
  labelClassName = '',
  errorClassName = '',
  helpText,
  size = 'md',
  resize = 'vertical'
}, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const hasError = touched && error;
  const showError = hasError;

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-4 py-4 text-lg'
  };

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize'
  };

  const baseTextareaClasses = `
    w-full border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    ${sizeClasses[size]}
    ${resizeClasses[resize]}
    ${hasError 
      ? 'border-red-500 bg-red-50 focus:ring-red-500' 
      : isFocused 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-300 bg-white hover:border-gray-400'
    }
    ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
    ${readOnly ? 'bg-gray-50 cursor-default' : ''}
    ${textareaClassName}
  `.trim();

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(e);
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

      {/* Textarea Container */}
      <div className="relative">
        {/* Textarea */}
        <textarea
          ref={ref}
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          cols={cols}
          minLength={minLength}
          maxLength={maxLength}
          className={baseTextareaClasses}
          aria-invalid={showError}
          aria-describedby={showError ? `${name}-error` : helpText ? `${name}-help` : undefined}
        />

        {/* Error Icon */}
        {showError && (
          <div className="absolute top-3 right-3 flex items-center pointer-events-none">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

      {/* Character Count */}
      {maxLength && (
        <div className="text-right text-xs text-gray-500">
          {(value || '').length} / {maxLength}
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

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
