// Safe utility functions to prevent undefined errors

/**
 * Safely converts a value to string with fallback
 * @param value - The value to convert
 * @param fallback - Fallback value if the input is undefined/null
 * @returns String representation of the value or fallback
 */
export const safeToString = (value: unknown, fallback: string = '0'): string => {
  if (value === undefined || value === null) {
    return fallback;
  }
  return value.toString();
};

/**
 * Safely converts a value to number with fallback
 * @param value - The value to convert
 * @param fallback - Fallback value if the input is undefined/null/invalid
 * @returns Number representation of the value or fallback
 */
export const safeToNumber = (value: unknown, fallback: number = 0): number => {
  if (value === undefined || value === null) {
    return fallback;
  }
  const num = parseFloat(value.toString());
  return isNaN(num) ? fallback : num;
};

/**
 * Safely formats currency with fallback
 * @param value - The value to format
 * @param currency - Currency symbol (default: 'RWF')
 * @param fallback - Fallback value if the input is undefined/null
 * @returns Formatted currency string
 */
export const safeFormatCurrency = (value: unknown, currency: string = 'RWF'): string => {
  const num = safeToNumber(value, 0);
  return `${currency} ${num.toLocaleString()}`;
};

/**
 * Safely calculates percentage with fallback
 * @param value - The value to calculate percentage for
 * @param total - The total value
 * @param fallback - Fallback value if calculation fails
 * @returns Percentage as number
 */
export const safePercentage = (value: unknown, total: unknown, fallback: number = 0): number => {
  const numValue = safeToNumber(value, 0);
  const numTotal = safeToNumber(total, 0);
  
  if (numTotal === 0) {
    return fallback;
  }
  
  return Math.round((numValue / numTotal) * 100);
};

/**
 * Safely gets object property with fallback
 * @param obj - The object to get property from
 * @param key - The property key
 * @param fallback - Fallback value if property doesn't exist
 * @returns Property value or fallback
 */
export const safeGet = (obj: unknown, key: string, fallback: unknown = null): unknown => {
  if (!obj || typeof obj !== 'object') {
    return fallback;
  }
  return obj[key] !== undefined ? obj[key] : fallback;
};

/**
 * Safely filters array with fallback
 * @param array - The array to filter
 * @param predicate - The filter function
 * @param fallback - Fallback array if input is invalid
 * @returns Filtered array or fallback
 */
export const safeFilter = <T>(array: T[] | undefined | null, predicate: (item: T) => boolean, fallback: T[] = []): T[] => {
  if (!Array.isArray(array)) {
    return fallback;
  }
  return array.filter(predicate);
};

/**
 * Safely reduces array with fallback
 * @param array - The array to reduce
 * @param reducer - The reduce function
 * @param initialValue - Initial value for reduction
 * @param fallback - Fallback value if input is invalid
 * @returns Reduced value or fallback
 */
export const safeReduce = <T, R>(
  array: T[] | undefined | null, 
  reducer: (acc: R, item: T) => R, 
  initialValue: R, 
  fallback: R
): R => {
  if (!Array.isArray(array)) {
    return fallback;
  }
  try {
    return array.reduce(reducer, initialValue);
  } catch {
    return fallback;
  }
}; 