import { useState, useEffect, useCallback } from 'react';

export const useApi = (apiFunction: () => Promise<any>, dependencies: any[] = []) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction();
      setData(response.data);
    } catch (err: any) {
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

export const useApiMutation = (apiFunction: (params: any) => Promise<any>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const mutate = useCallback(async (params: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction(params);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return { mutate, loading, error, data };
};

export const useApiList = (apiFunction: (params: any) => Promise<any>, params: any = {}) => {
  const [data, setData] = useState<any>({ items: [], total: 0, currentPage: 1, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState(params);

  const fetchData = useCallback(async (newFilters: any = filters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiFunction(newFilters);
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [apiFunction, filters]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const updateFilters = useCallback((newFilters: any) => {
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