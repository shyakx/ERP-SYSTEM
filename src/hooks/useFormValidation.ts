import { useState, useCallback, useRef } from 'react';
import { validateForm, validateField, ValidationRule, FieldValidation, ValidationResult } from '../utils/validation';

export interface FormField {
  value: string | number | boolean;
  rules: ValidationRule;
  label?: string;
  touched?: boolean;
  error?: string;
}

export interface UseFormValidationOptions {
  initialValues: Record<string, string | number | boolean>;
  validationRules: Record<string, ValidationRule>;
  onSubmit: (values: Record<string, string | number | boolean>) => void | Promise<void>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export interface UseFormValidationReturn {
  values: Record<string, string | number | boolean>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isValid: boolean;
  isSubmitting: boolean;
  setValue: (field: string, value: string | number | boolean) => void;
  setError: (field: string, error: string) => void;
  clearError: (field: string) => void;
  clearAllErrors: () => void;
  validateField: (field: string) => void;
  validateForm: () => ValidationResult;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  handleChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (field: string) => () => void;
  reset: () => void;
  setValues: (values: Record<string, string | number | boolean>) => void;
  setTouched: (field: string, touched: boolean) => void;
}

export const useFormValidation = ({
  initialValues,
  validationRules,
  onSubmit,
  validateOnChange = true,
  validateOnBlur = true
}: UseFormValidationOptions): UseFormValidationReturn => {
  const [values, setValues] = useState<Record<string, string | number | boolean>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  // Validate a single field
  const validateSingleField = useCallback((field: string) => {
    const fieldValue = values[field];
    const rules = validationRules[field];
    
    if (!rules) return;

    const fieldValidation: FieldValidation = {
      value: fieldValue,
      rules,
      label: field
    };

    const error = validateField(fieldValidation);
    
    setErrors(prev => ({
      ...prev,
      [field]: error || ''
    }));
  }, [values, validationRules]);

  // Validate entire form
  const validateEntireForm = useCallback((): ValidationResult => {
    const fields: Record<string, FieldValidation> = {};
    
    for (const [fieldName, value] of Object.entries(values)) {
      const rules = validationRules[fieldName];
      if (rules) {
        fields[fieldName] = {
          value,
          rules,
          label: fieldName
        };
      }
    }

    return validateForm(fields);
  }, [values, validationRules]);

  // Set field value
  const setValue = useCallback((field: string, value: string | number | boolean) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));

    // Validate on change if enabled
    if (validateOnChange) {
      setTimeout(() => validateSingleField(field), 0);
    }
  }, [validateOnChange, validateSingleField]);

  // Set field error
  const setError = useCallback((field: string, error: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  }, []);

  // Clear field error
  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  // Clear all errors
  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Prevent double submission
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      // Mark all fields as touched
      const allTouched: Record<string, boolean> = {};
      for (const field of Object.keys(validationRules)) {
        allTouched[field] = true;
      }
      setTouched(allTouched);

      // Validate form
      const validationResult = validateEntireForm();
      
      if (!validationResult.isValid) {
        setErrors(validationResult.errors);
        return;
      }

      // Clear errors and submit
      setErrors({});
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle submission error
      if (error instanceof Error) {
        setError('submit', error.message);
      } else {
        setError('submit', 'An error occurred while submitting the form');
      }
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  }, [values, validationRules, validateEntireForm, onSubmit, setError]);

  // Handle field change
  const handleChange = useCallback((field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setValue(field, value);
  }, [setValue]);

  // Handle field blur
  const handleBlur = useCallback((field: string) => () => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    // Validate on blur if enabled
    if (validateOnBlur) {
      validateSingleField(field);
    }
  }, [validateOnBlur, validateSingleField]);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    isSubmittingRef.current = false;
  }, [initialValues]);

  // Set multiple values
  const setMultipleValues = useCallback((newValues: Record<string, string | number | boolean>) => {
    setValues(prev => ({
      ...prev,
      ...newValues
    }));
  }, []);

  // Set touched state
  const setTouchedState = useCallback((field: string, touchedState: boolean) => {
    setTouched(prev => ({
      ...prev,
      [field]: touchedState
    }));
  }, []);

  // Calculate form validity
  const isValid = Object.keys(errors).length === 0 && Object.values(errors).every(error => !error);

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setValue,
    setError,
    clearError,
    clearAllErrors,
    validateField: validateSingleField,
    validateForm: validateEntireForm,
    handleSubmit,
    handleChange,
    handleBlur,
    reset,
    setValues: setMultipleValues,
    setTouched: setTouchedState
  };
};
