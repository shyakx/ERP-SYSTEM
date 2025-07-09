export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: string; // Added for department-based routing
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export type UserRole = 
  | 'system_admin'
  | 'hr_manager'
  | 'hr_assistant'
  | 'finance_manager'
  | 'accountant'
  | 'operations_supervisor'
  | 'field_officer'
  | 'security_guard'
  | 'asset_manager'
  | 'logistics_officer'
  | 'client_relationship_manager'
  | 'billing_officer'
  | 'it_support_officer';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  path: string;
  roles: UserRole[];
  children?: MenuItem[];
}

export interface DashboardStats {
  totalEmployees: number;
  activeShifts: number;
  pendingInvoices: number;
  overduePayments: number;
  openIncidents: number;
  totalAssets: number;
  monthlyRevenue: number;
  payrollStatus: 'pending' | 'completed' | 'in_progress';
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  startDate: string;
  status: 'active' | 'inactive' | 'on_leave';
  avatar?: string;
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadDate: string;
  size: number;
}

export interface Shift {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'missed';
  notes?: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  tax: number;
  total: number;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  total: number;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  location: string;
  reportedBy: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  reportedAt: string;
  photos?: string[];
  response?: string;
}

export interface Asset {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  assignedTo?: string;
  location: string;
  status: 'in_use' | 'maintenance' | 'retired' | 'available';
  purchaseDate: string;
  value: number;
}

export interface Client {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  contractStart: string;
  contractEnd: string;
  status: 'active' | 'inactive' | 'pending';
  services: string[];
}