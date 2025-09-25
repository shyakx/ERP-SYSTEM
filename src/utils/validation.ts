// Validation utility functions for form validation and error handling

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | null;
  email?: boolean;
  phone?: boolean;
  number?: boolean;
  positive?: boolean;
  date?: boolean;
  url?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface FieldValidation {
  value: unknown;
  rules: ValidationRule;
  label?: string;
}

// Common validation patterns
export const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[+]?[1-9][\d]{0,15}$/,
  rwandaPhone: /^(\+250|250|0)?[7][0-9]{8}$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  name: /^[a-zA-Z\s-']+$/,
  employeeId: /^[A-Z]{2,3}[0-9]{4,6}$/,
  sku: /^[A-Z0-9\-]{3,20}$/,
  currency: /^\d+(\.\d{1,2})?$/
};

// Validation functions
export const validators = {
  required: (value: unknown): string | null => {
    if (value === null || value === undefined || value === '') {
      return 'This field is required';
    }
    return null;
  },

  minLength: (value: string, min: number): string | null => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters long`;
    }
    return null;
  },

  maxLength: (value: string, max: number): string | null => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters long`;
    }
    return null;
  },

  pattern: (value: string, pattern: RegExp, message?: string): string | null => {
    if (value && !pattern.test(value)) {
      return message || 'Invalid format';
    }
    return null;
  },

  email: (value: string): string | null => {
    if (value && !patterns.email.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  phone: (value: string): string | null => {
    if (value && !patterns.phone.test(value)) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  rwandaPhone: (value: string): string | null => {
    if (value && !patterns.rwandaPhone.test(value)) {
      return 'Please enter a valid Rwanda phone number (e.g., +250788123456)';
    }
    return null;
  },

  number: (value: unknown): string | null => {
    if (value && isNaN(Number(value))) {
      return 'Must be a valid number';
    }
    return null;
  },

  positive: (value: unknown): string | null => {
    if (value && Number(value) <= 0) {
      return 'Must be a positive number';
    }
    return null;
  },

  date: (value: string): string | null => {
    if (value && isNaN(Date.parse(value))) {
      return 'Please enter a valid date';
    }
    return null;
  },

  futureDate: (value: string): string | null => {
    if (value && new Date(value) <= new Date()) {
      return 'Date must be in the future';
    }
    return null;
  },

  pastDate: (value: string): string | null => {
    if (value && new Date(value) >= new Date()) {
      return 'Date must be in the past';
    }
    return null;
  },

  url: (value: string): string | null => {
    if (value && !patterns.url.test(value)) {
      return 'Please enter a valid URL';
    }
    return null;
  },

  name: (value: string): string | null => {
    if (value && !patterns.name.test(value)) {
      return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }
    return null;
  },

  employeeId: (value: string): string | null => {
    if (value && !patterns.employeeId.test(value)) {
      return 'Employee ID must be in format: ABC1234 (2-3 letters followed by 4-6 numbers)';
    }
    return null;
  },

  sku: (value: string): string | null => {
    if (value && !patterns.sku.test(value)) {
      return 'SKU must be 3-20 characters, letters, numbers, and hyphens only';
    }
    return null;
  },

  currency: (value: string): string | null => {
    if (value && !patterns.currency.test(value)) {
      return 'Please enter a valid currency amount';
    }
    return null;
  },

  password: (value: string): string | null => {
    if (value) {
      if (value.length < 8) {
        return 'Password must be at least 8 characters long';
      }
      if (!/(?=.*[a-z])/.test(value)) {
        return 'Password must contain at least one lowercase letter';
      }
      if (!/(?=.*[A-Z])/.test(value)) {
        return 'Password must contain at least one uppercase letter';
      }
      if (!/(?=.*\d)/.test(value)) {
        return 'Password must contain at least one number';
      }
      if (!/(?=.*[@$!%*?&])/.test(value)) {
        return 'Password must contain at least one special character (@$!%*?&)';
      }
    }
    return null;
  },

  confirmPassword: (value: string, originalPassword: string): string | null => {
    if (value && value !== originalPassword) {
      return 'Passwords do not match';
    }
    return null;
  }
};

// Main validation function
export const validateField = (field: FieldValidation): string | null => {
  const { value, rules } = field;

  // Required validation
  if (rules.required) {
    const requiredError = validators.required(value);
    if (requiredError) return requiredError;
  }

  // Skip other validations if value is empty and not required
  if (!value && !rules.required) {
    return null;
  }

  // String validations
  if (typeof value === 'string') {
    if (rules.minLength) {
      const error = validators.minLength(value, rules.minLength);
      if (error) return error;
    }

    if (rules.maxLength) {
      const error = validators.maxLength(value, rules.maxLength);
      if (error) return error;
    }

    if (rules.pattern) {
      const error = validators.pattern(value, rules.pattern);
      if (error) return error;
    }

    if (rules.email) {
      const error = validators.email(value);
      if (error) return error;
    }

    if (rules.phone) {
      const error = validators.phone(value);
      if (error) return error;
    }

    if (rules.url) {
      const error = validators.url(value);
      if (error) return error;
    }
  }

  // Number validations
  if (rules.number) {
    const error = validators.number(value);
    if (error) return error;
  }

  if (rules.positive) {
    const error = validators.positive(value);
    if (error) return error;
  }

  // Date validations
  if (rules.date) {
    const error = validators.date(value);
    if (error) return error;
  }

  // Custom validation
  if (rules.custom) {
    const error = rules.custom(value);
    if (error) return error;
  }

  return null;
};

// Validate multiple fields
export const validateForm = (fields: Record<string, FieldValidation>): ValidationResult => {
  const errors: Record<string, string> = {};
  let isValid = true;

  for (const [fieldName, field] of Object.entries(fields)) {
    const error = validateField(field);
    if (error) {
      errors[fieldName] = error;
      isValid = false;
    }
  }

  return { isValid, errors };
};

// Common validation rules for different field types
export const commonRules = {
  required: { required: true },
  email: { required: true, email: true },
  phone: { required: true, phone: true },
  rwandaPhone: { required: true, rwandaPhone: true },
  name: { required: true, minLength: 2, maxLength: 50, name: true },
  password: { required: true, minLength: 8, custom: validators.password },
  employeeId: { required: true, employeeId: true },
  sku: { required: true, sku: true },
  currency: { required: true, number: true, positive: true },
  url: { url: true },
  date: { required: true, date: true },
  futureDate: { required: true, date: true, custom: validators.futureDate },
  pastDate: { required: true, date: true, custom: validators.pastDate },
  description: { maxLength: 500 },
  shortText: { maxLength: 100 },
  longText: { maxLength: 1000 }
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Format validation errors for display
export const formatValidationErrors = (errors: Record<string, string>): string[] => {
  return Object.values(errors);
};

// Get first validation error
export const getFirstError = (errors: Record<string, string>): string | null => {
  const errorValues = Object.values(errors);
  return errorValues.length > 0 ? errorValues[0] : null;
};
