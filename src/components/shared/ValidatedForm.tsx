import React from 'react';
import { useFormValidation, UseFormValidationOptions } from '../../hooks/useFormValidation';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import FormSelect, { SelectOption } from './FormSelect';
import LoadingSpinner from './LoadingSpinner';
import { useNotifications } from './NotificationSystem';

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date' | 'textarea' | 'select';
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: SelectOption[];
  helpText?: string;
  showPasswordToggle?: boolean;
  prefix?: string;
  suffix?: string;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  autoComplete?: string;
  size?: 'sm' | 'md' | 'lg';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
}

export interface ValidatedFormProps extends Omit<UseFormValidationOptions, 'onSubmit'> {
  fields: FormField[];
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
  submitText?: string;
  cancelText?: string;
  showCancel?: boolean;
  onCancel?: () => void;
  className?: string;
  formClassName?: string;
  buttonClassName?: string;
  loadingText?: string;
  successMessage?: string;
  errorMessage?: string;
  gridCols?: 1 | 2 | 3;
  spacing?: 'sm' | 'md' | 'lg';
}

const ValidatedForm: React.FC<ValidatedFormProps> = ({
  fields,
  onSubmit,
  submitText = 'Submit',
  cancelText = 'Cancel',
  showCancel = false,
  onCancel,
  className = '',
  formClassName = '',
  buttonClassName = '',
  loadingText = 'Submitting...',
  successMessage = 'Form submitted successfully!',
  errorMessage = 'Failed to submit form. Please try again.',
  gridCols = 1,
  spacing = 'md',
  ...formOptions
}) => {
  const { success, error } = useNotifications();

  const {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    reset
  } = useFormValidation({
    ...formOptions,
    onSubmit: async (values) => {
      try {
        await onSubmit(values);
        success('Success', successMessage);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : errorMessage;
        error('Error', errorMsg);
      }
    }
  });

  const spacingClasses = {
    sm: 'space-y-3',
    md: 'space-y-4',
    lg: 'space-y-6'
  };

  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      name: field.name,
      value: values[field.name],
      onChange: handleChange(field.name),
      onBlur: handleBlur(field.name),
      error: errors[field.name],
      touched: touched[field.name],
      required: field.required,
      disabled: field.disabled || isSubmitting,
      placeholder: field.placeholder,
      helpText: field.helpText,
      size: field.size,
      className: 'w-full'
    };

    switch (field.type) {
      case 'textarea':
        return (
          <FormTextarea
            {...commonProps}
            label={field.label}
            rows={field.rows}
            minLength={field.minLength}
            maxLength={field.maxLength}
            resize={field.resize}
          />
        );

      case 'select':
        return (
          <FormSelect
            {...commonProps}
            label={field.label}
            options={field.options || []}
            searchable={field.searchable}
            clearable={field.clearable}
            multiple={field.multiple}
          />
        );

      default:
        return (
          <FormInput
            {...commonProps}
            label={field.label}
            type={field.type}
            min={field.min}
            max={field.max}
            step={field.step}
            minLength={field.minLength}
            maxLength={field.maxLength}
            pattern={field.pattern}
            autoComplete={field.autoComplete}
            showPasswordToggle={field.showPasswordToggle}
            prefix={field.prefix}
            suffix={field.suffix}
          />
        );
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className={`space-y-6 ${formClassName}`}>
        <div className={`grid ${gridClasses[gridCols]} gap-4 ${spacingClasses[spacing]}`}>
          {fields.map((field) => (
            <div key={field.name} className="w-full">
              {renderField(field)}
            </div>
          ))}
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`
              flex-1 sm:flex-none px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center
              ${buttonClassName}
            `}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" color="white" className="mr-2" />
                {loadingText}
              </>
            ) : (
              submitText
            )}
          </button>

          {showCancel && (
            <button
              type="button"
              onClick={onCancel || reset}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {cancelText}
            </button>
          )}
        </div>

        {/* Global Form Error */}
        {errors.submit && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{errors.submit}</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ValidatedForm;
