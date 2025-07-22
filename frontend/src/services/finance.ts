import { apiService } from './api';

// Types
export interface FinanceDashboard {
  revenue: {
    total_revenue: number;
    total_paid: number;
    outstanding_amount: number;
    total_invoices: number;
    paid_invoices: number;
    overdue_invoices: number;
  };
  trend: Array<{
    month: string;
    revenue: number;
    paid: number;
  }>;
  topClients: Array<{
    company_name: string;
    invoice_count: number;
    total_amount: number;
  }>;
  expenses: {
    total_expenses: number;
    expense_count: number;
  };
  bankAccounts: Array<{
    account_name: string;
    current_balance: number;
    currency: string;
  }>;
}

export interface Client {
  id: number;
  client_code: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  tax_id: string;
  registration_number: string;
  contract_start_date: string;
  contract_end_date: string;
  contract_value: number;
  payment_terms: string;
  credit_limit: number;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: number;
  invoice_number: string;
  client_id: number;
  company_name: string;
  contact_person: string;
  issue_date: string;
  due_date: string;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  paid_amount: number;
  balance_amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'partially_paid';
  payment_terms: string;
  notes: string;
  terms_conditions: string;
  created_at: string;
  updated_at: string;
  items?: InvoiceItem[];
  payments?: Payment[];
}

export interface InvoiceItem {
  id: number;
  invoice_id: number;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  service_period_start: string;
  service_period_end: string;
  created_at: string;
}

export interface Payment {
  id: number;
  payment_number: string;
  invoice_id: number;
  client_id: number;
  payment_date: string;
  amount: number;
  payment_method: string;
  reference_number: string;
  bank_name: string;
  account_number: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  notes: string;
  created_at: string;
  updated_at: string;
  company_name?: string;
  invoice_number?: string;
}

export interface Expense {
  id: number;
  expense_number: string;
  category: string;
  subcategory: string;
  description: string;
  amount: number;
  expense_date: string;
  vendor_name: string;
  vendor_contact: string;
  payment_method: string;
  reference_number: string;
  receipt_url: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  approved_at: string;
  submitted_by: string;
  approved_by: string;
  notes: string;
  created_at: string;
  updated_at: string;
  submitted_by_name?: string;
  approved_by_name?: string;
}

// Finance Dashboard
export const getFinanceDashboard = async (): Promise<FinanceDashboard> => {
  const response = await apiService.get('/api/finance/dashboard');
  return response;
};

// Clients
export const getClients = async (params?: {
  search?: string;
  status?: string;
  limit?: number;
  offset?: number;
}): Promise<Client[]> => {
  const response = await apiService.get('/api/finance/clients', params);
  return response;
};

export const createClient = async (clientData: Partial<Client>): Promise<Client> => {
  const response = await apiService.post('/api/finance/clients', clientData);
  const data = await response.json();
  return data;
};

// Invoices
export const getInvoices = async (params?: {
  search?: string;
  status?: string;
  client_id?: number;
  start_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
}): Promise<Invoice[]> => {
  const response = await apiService.get('/api/finance/invoices', params);
  return response;
};

export const getInvoice = async (id: number): Promise<Invoice> => {
  const response = await apiService.get(`/api/finance/invoices/${id}`);
  return response;
};

export const createInvoice = async (invoiceData: {
  client_id: number;
  issue_date: string;
  due_date: string;
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  discount_amount: number;
  total_amount: number;
  payment_terms: string;
  notes: string;
  terms_conditions: string;
  items: Array<{
    description: string;
    quantity: number;
    unit_price: number;
    amount: number;
    tax_rate: number;
    tax_amount: number;
    total_amount: number;
    service_period_start: string;
    service_period_end: string;
  }>;
}): Promise<Invoice> => {
  const response = await apiService.post('/api/finance/invoices', invoiceData);
  const data = await response.json();
  return data;
};

export const updateInvoiceStatus = async (id: number, status: string): Promise<Invoice> => {
  const response = await apiService.put(`/api/finance/invoices/${id}/status`, { status });
  const data = await response.json();
  return data;
};

// Payments
export const getPayments = async (params?: {
  search?: string;
  status?: string;
  client_id?: number;
  payment_method?: string;
  start_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
}): Promise<Payment[]> => {
  const response = await apiService.get('/api/finance/payments', params);
  return response;
};

export const createPayment = async (paymentData: {
  invoice_id?: number;
  client_id: number;
  payment_date: string;
  amount: number;
  payment_method: string;
  reference_number: string;
  bank_name: string;
  account_number: string;
  notes: string;
}): Promise<Payment> => {
  const response = await apiService.post('/api/finance/payments', paymentData);
  const data = await response.json();
  return data;
};

// Expenses
export const getExpenses = async (params?: {
  search?: string;
  status?: string;
  category?: string;
  start_date?: string;
  end_date?: string;
  limit?: number;
  offset?: number;
}): Promise<Expense[]> => {
  const response = await apiService.get('/api/finance/expenses', params);
  return response;
};

export const createExpense = async (expenseData: {
  category: string;
  subcategory: string;
  description: string;
  amount: number;
  expense_date: string;
  vendor_name: string;
  vendor_contact: string;
  payment_method: string;
  reference_number: string;
  notes: string;
}): Promise<Expense> => {
  const response = await apiService.post('/api/finance/expenses', expenseData);
  const data = await response.json();
  return data;
};

export const approveExpense = async (id: number, status: string): Promise<Expense> => {
  const response = await apiService.put(`/api/finance/expenses/${id}/approve`, { status });
  const data = await response.json();
  return data;
}; 