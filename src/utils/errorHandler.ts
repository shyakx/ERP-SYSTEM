// Comprehensive error handling utilities

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: Record<string, unknown>;
  field?: string;
}

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  timestamp?: string;
  userAgent?: string;
  url?: string;
}

// Error types
export enum ErrorType {
  VALIDATION = 'VALIDATION',
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  CLIENT = 'CLIENT',
  UNKNOWN = 'UNKNOWN'
}

// Parse API error response
export const parseApiError = (error: unknown): ApiError => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    
    return {
      message: data?.message || data?.error || `Server error (${status})`,
      status,
      code: data?.code,
      details: data?.details,
      field: data?.field
    };
  } else if (error.request) {
    // Network error
    return {
      message: 'Network error. Please check your connection and try again.',
      status: 0,
      code: 'NETWORK_ERROR'
    };
  } else {
    // Other error
    return {
      message: error.message || 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR'
    };
  }
};

// Determine error type
export const getErrorType = (error: ApiError): ErrorType => {
  if (error.status) {
    switch (error.status) {
      case 400:
        return ErrorType.VALIDATION;
      case 401:
        return ErrorType.AUTHENTICATION;
      case 403:
        return ErrorType.AUTHORIZATION;
      case 404:
        return ErrorType.NOT_FOUND;
      case 500:
      case 502:
      case 503:
      case 504:
        return ErrorType.SERVER;
      default:
        if (error.status >= 400 && error.status < 500) {
          return ErrorType.CLIENT;
        } else if (error.status >= 500) {
          return ErrorType.SERVER;
        }
    }
  }
  
  if (error.code === 'NETWORK_ERROR') {
    return ErrorType.NETWORK;
  }
  
  return ErrorType.UNKNOWN;
};

// Get user-friendly error message
export const getUserFriendlyMessage = (error: ApiError): string => {
  const errorType = getErrorType(error);
  
  switch (errorType) {
    case ErrorType.VALIDATION:
      return error.message || 'Please check your input and try again.';
    
    case ErrorType.AUTHENTICATION:
      return 'Your session has expired. Please log in again.';
    
    case ErrorType.AUTHORIZATION:
      return 'You do not have permission to perform this action.';
    
    case ErrorType.NOT_FOUND:
      return 'The requested resource was not found.';
    
    case ErrorType.NETWORK:
      return 'Unable to connect to the server. Please check your internet connection.';
    
    case ErrorType.SERVER:
      return 'Server error. Please try again later or contact support.';
    
    case ErrorType.CLIENT:
      return error.message || 'Invalid request. Please check your input.';
    
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
};

// Log error for debugging
export const logError = (error: unknown, context?: ErrorContext) => {
  const apiError = parseApiError(error);
  const errorType = getErrorType(apiError);
  
  const errorLog = {
    type: errorType,
    message: apiError.message,
    status: apiError.status,
    code: apiError.code,
    details: apiError.details,
    context: {
      ...context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    },
    stack: error.stack
  };
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Log:', errorLog);
  }
  
  // In production, you would send this to your error tracking service
  // Example: Sentry.captureException(error, { extra: errorLog });
  
  return errorLog;
};

// Handle API errors with context
export const handleApiError = (error: unknown, context?: ErrorContext) => {
  const apiError = parseApiError(error);
  const userMessage = getUserFriendlyMessage(apiError);
  const errorLog = logError(error, context);
  
  return {
    apiError,
    userMessage,
    errorLog,
    shouldRetry: shouldRetryError(apiError),
    retryAfter: getRetryDelay(apiError)
  };
};

// Determine if error should be retried
export const shouldRetryError = (error: ApiError): boolean => {
  const errorType = getErrorType(error);
  
  switch (errorType) {
    case ErrorType.NETWORK:
    case ErrorType.SERVER:
      return true;
    case ErrorType.AUTHENTICATION:
    case ErrorType.AUTHORIZATION:
    case ErrorType.VALIDATION:
    case ErrorType.NOT_FOUND:
    case ErrorType.CLIENT:
      return false;
    default:
      return false;
  }
};

// Get retry delay in milliseconds
export const getRetryDelay = (error: ApiError): number => {
  const errorType = getErrorType(error);
  
  switch (errorType) {
    case ErrorType.NETWORK:
      return 1000; // 1 second
    case ErrorType.SERVER:
      return 5000; // 5 seconds
    default:
      return 0;
  }
};

// Retry function with exponential backoff
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: unknown;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const apiError = parseApiError(error);
      
      if (!shouldRetryError(apiError) || attempt === maxRetries) {
        throw error;
      }
      
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};

// Error boundary helper
export const createErrorHandler = (context: ErrorContext) => {
  return (error: unknown) => {
    return handleApiError(error, context);
  };
};

// Form validation error handler
export const handleFormError = (error: unknown, setFieldError: (field: string, message: string) => void) => {
  const apiError = parseApiError(error);
  
  if (apiError.field && apiError.message) {
    setFieldError(apiError.field, apiError.message);
  } else if (apiError.details && typeof apiError.details === 'object') {
    // Handle multiple field errors
    Object.entries(apiError.details).forEach(([field, message]) => {
      if (typeof message === 'string') {
        setFieldError(field, message);
      }
    });
  }
  
  return apiError;
};

// Global error handler for unhandled promises
export const setupGlobalErrorHandling = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = handleApiError(event.reason, {
      component: 'Global',
      action: 'UnhandledPromiseRejection'
    });
    
    console.error('Unhandled Promise Rejection:', error);
    
    // Prevent default browser behavior
    event.preventDefault();
  });
  
  // Handle global errors
  window.addEventListener('error', (event) => {
    const error = handleApiError(event.error, {
      component: 'Global',
      action: 'GlobalError'
    });
    
    console.error('Global Error:', error);
  });
};

export default {
  parseApiError,
  getErrorType,
  getUserFriendlyMessage,
  logError,
  handleApiError,
  shouldRetryError,
  getRetryDelay,
  retryWithBackoff,
  createErrorHandler,
  handleFormError,
  setupGlobalErrorHandling
};
