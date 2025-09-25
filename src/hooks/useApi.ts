import { useState, useEffect, useCallback } from 'react';

export const useApi = <T = unknown>(apiFunction: () => Promise<{ data: T }>, dependencies: unknown[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction();
      setData(response.data);
    } catch (err: unknown) {
      setError(err.response?.data?.error || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch };
};

export const useApiMutation = <TParams = unknown, TResponse = unknown>(apiFunction: (params: TParams) => Promise<{ data: TResponse }>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TResponse | null>(null);

  const mutate = useCallback(async (params: TParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction(params);
      setData(response.data);
      return response.data;
    } catch (err: unknown) {
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { mutate, loading, error, data };
};

export const useApiList = <T = unknown>(apiFunction: (params: Record<string, unknown>) => Promise<{ data: T[] }>, params: Record<string, unknown> = {}) => {
  const [data, setData] = useState<{ items: T[]; total: number; currentPage: number; totalPages: number }>({ items: [], total: 0, currentPage: 1, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState(params);

  const fetchData = useCallback(async (newFilters: Record<string, unknown> = filters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction(newFilters);
      setData(response.data);
    } catch (err: unknown) {
      setError(err.response?.data?.error || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiFunction, filters]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const updateFilters = useCallback((newFilters: Record<string, unknown>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  useEffect(() => {
    fetchData();
  }, [filters]);

  return { 
    data, 
    loading, 
    error, 
    refetch, 
    filters, 
    updateFilters,
    items: data.items || data.employees || data.jobPostings || data.candidates || data.courses || data.leaveRequests || data.attendanceRecords || data.performanceReviews || data.payrollRecords || [],
    total: data.total || 0,
    currentPage: data.currentPage || 1,
    totalPages: data.totalPages || 0
  };
}; 