const { body, param, query, validationResult } = require('express-validator');

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: 'Validation failed', 
      details: errors.array() 
    });
  }
  next();
};

// Employee validation rules
const validateEmployee = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be a valid email address'),
  
  body('phone')
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone must be between 10 and 15 characters')
    .matches(/^[\d\-\+\(\)\s]+$/)
    .withMessage('Phone can only contain numbers, spaces, and basic punctuation'),
  
  body('position')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Position must be between 2 and 50 characters'),
  
  body('department')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Department must be between 2 and 50 characters'),
  
  handleValidationErrors
];

// Payroll validation rules
const validatePayroll = [
  body('employeeId')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Employee ID is required'),
  
  body('period')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Period is required'),
  
  body('baseSalary')
    .isFloat({ min: 0 })
    .withMessage('Base salary must be a positive number'),
  
  body('hoursWorked')
    .isFloat({ min: 0, max: 200 })
    .withMessage('Hours worked must be between 0 and 200'),
  
  body('hourlyRate')
    .isFloat({ min: 0 })
    .withMessage('Hourly rate must be a positive number'),
  
  handleValidationErrors
];

// Attendance validation rules
const validateAttendance = [
  body('employeeId')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Employee ID is required'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location must be less than 100 characters'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes must be less than 500 characters'),
  
  handleValidationErrors
];

// Document validation rules
const validateDocument = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title is required and must be less than 255 characters'),
  
  body('category')
    .trim()
    .isIn(['policy', 'procedure', 'contract', 'training', 'incident_report', 'audit', 'compliance', 'other'])
    .withMessage('Category must be one of the allowed values'),
  
  body('access_level')
    .optional()
    .trim()
    .isIn(['public', 'restricted', 'confidential', 'secret'])
    .withMessage('Access level must be one of the allowed values'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must be less than 1000 characters'),
  
  handleValidationErrors
];

// ID parameter validation
const validateId = [
  param('id')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('ID parameter is required'),
  
  handleValidationErrors
];

// Query parameter sanitization
const sanitizeQuery = [
  query('search')
    .optional()
    .trim()
    .escape(),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a non-negative integer'),
  
  handleValidationErrors
];

module.exports = {
  validateEmployee,
  validatePayroll,
  validateAttendance,
  validateDocument,
  validateId,
  sanitizeQuery,
  handleValidationErrors
}; 