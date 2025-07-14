export const payrollService = {
  fetchPayroll: async (filters: {
    period?: string;
    status?: string;
    department?: string;
    paymentMethod?: string;
    employeeName?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters.period) params.append('period', filters.period);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.department && filters.department !== 'all') params.append('department', filters.department);
    if (filters.paymentMethod && filters.paymentMethod !== 'all') params.append('paymentMethod', filters.paymentMethod);
    if (filters.employeeName) params.append('employeeName', filters.employeeName);
    const res = await fetch(`/api/payroll?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch payroll');
    return res.json();
  },
  submitPayroll: async (ids: number[]) => {
    const res = await fetch('/api/payroll/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) throw new Error('Failed to submit payroll');
    return res.json();
  },
  approvePayroll: async (id: number, comment?: string) => {
    const res = await fetch(`/api/payroll/approve/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment }),
    });
    if (!res.ok) throw new Error('Failed to approve payroll');
    return res.json();
  },
  rejectPayroll: async (id: number, comment?: string) => {
    const res = await fetch(`/api/payroll/reject/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment }),
    });
    if (!res.ok) throw new Error('Failed to reject payroll');
    return res.json();
  },
  markAsPaid: async (id: number) => {
    const res = await fetch(`/api/payroll/mark-paid/${id}`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to mark as paid');
    return res.json();
  },
  exportPayroll: async (period: string) => {
    const res = await fetch(`/api/payroll/export?period=${period}`);
    if (!res.ok) throw new Error('Failed to export payroll');
    return res.blob();
  },
  generatePayroll: async (period: string) => {
    const res = await fetch(`/api/payroll/generate?period=${period}`, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to generate payroll');
    return res.json();
  },
  downloadPayslip: async (employeeId: string, month: string) => {
    const res = await fetch(`/api/payslip/${employeeId}?month=${month}`);
    if (!res.ok) throw new Error('Failed to download payslip');
    return res.blob();
  },
  bulkUpload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/payroll/bulk-upload', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to upload payroll CSV');
    return res.json();
  },
}; 