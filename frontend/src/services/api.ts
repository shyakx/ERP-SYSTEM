// API service with automatic authentication
const API_BASE_URL = 'http://localhost:5000';

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth-token');
};

// Create headers with authentication
const createHeaders = (customHeaders?: Record<string, string>): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Build URL with query parameters
const buildUrl = (endpoint: string, params?: Record<string, any>): string => {
  const url = `${API_BASE_URL}${endpoint}`;
  if (!params) return url;
  
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `${url}?${queryString}` : url;
};

// Generic API request function
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  params?: Record<string, any>
): Promise<Response> => {
  const url = buildUrl(endpoint, params);
  const headers = createHeaders(options.headers as Record<string, string>);

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user-data');
      window.location.href = '/login';
      throw new Error('Authentication required');
    }

    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// API service with common methods
export const apiService = {
  // GET request
  get: async (endpoint: string, params?: Record<string, any>) => {
    const response = await apiRequest(endpoint, {}, params);
    return response.ok ? await response.json() : response;
  },

  // POST request
  post: async (endpoint: string, data?: any, params?: Record<string, any>) => {
    const response = await apiRequest(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }, params);
    return response;
  },

  // PUT request
  put: async (endpoint: string, data?: any, params?: Record<string, any>) => {
    const response = await apiRequest(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }, params);
    return response;
  },

  // DELETE request
  delete: async (endpoint: string, params?: Record<string, any>) => {
    const response = await apiRequest(endpoint, {
      method: 'DELETE',
    }, params);
    return response.ok ? await response.json() : response;
  },

  // PATCH request
  patch: async (endpoint: string, data?: any, params?: Record<string, any>) => {
    const response = await apiRequest(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }, params);
    return response;
  },
};

export default apiService; 