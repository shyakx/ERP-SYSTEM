import { MenuItem, UserRole } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/dashboard',
    roles: ['system_admin', 'hr_manager', 'hr_assistant', 'finance_manager', 'accountant', 'operations_supervisor', 'field_officer', 'security_guard', 'asset_manager', 'logistics_officer', 'client_relationship_manager', 'billing_officer', 'it_support_officer']
  },
  {
    id: 'employees',
    title: 'Employee Management',
    icon: 'Users',
    path: '/employees',
    roles: ['system_admin', 'hr_manager', 'hr_assistant', 'operations_supervisor']
  },
  {
    id: 'shifts',
    title: 'Shift Scheduling',
    icon: 'Clock',
    path: '/shifts',
    roles: ['system_admin', 'hr_manager', 'operations_supervisor', 'field_officer', 'security_guard']
  },
  {
    id: 'attendance',
    title: 'Attendance',
    icon: 'UserCheck',
    path: '/attendance',
    roles: ['system_admin', 'hr_manager', 'operations_supervisor', 'field_officer']
  },
  {
    id: 'payroll',
    title: 'Payroll Management',
    icon: 'DollarSign',
    path: '/payroll',
    roles: ['system_admin', 'hr_manager', 'finance_manager', 'accountant']
  },
  {
    id: 'invoicing',
    title: 'Invoicing & Billing',
    icon: 'FileText',
    path: '/invoicing',
    roles: ['system_admin', 'finance_manager', 'accountant', 'billing_officer']
  },
  {
    id: 'clients',
    title: 'Client Management',
    icon: 'Building',
    path: '/clients',
    roles: ['system_admin', 'client_relationship_manager', 'operations_supervisor']
  },
  {
    id: 'assets',
    title: 'Asset Tracking',
    icon: 'Package',
    path: '/assets',
    roles: ['system_admin', 'asset_manager', 'logistics_officer']
  },
  {
    id: 'incidents',
    title: 'Incident Reporting',
    icon: 'AlertTriangle',
    path: '/incidents',
    roles: ['system_admin', 'operations_supervisor', 'field_officer', 'security_guard']
  },
  {
    id: 'documents',
    title: 'Document Management',
    icon: 'FolderOpen',
    path: '/documents',
    roles: ['system_admin', 'hr_manager', 'hr_assistant', 'it_support_officer']
  },
  {
    id: 'reports',
    title: 'Reports',
    icon: 'BarChart3',
    path: '/reports',
    roles: ['system_admin', 'hr_manager', 'finance_manager', 'operations_supervisor']
  },
  {
    id: 'audit',
    title: 'Audit Logs',
    icon: 'History',
    path: '/audit',
    roles: ['system_admin', 'it_support_officer']
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'Settings',
    path: '/settings',
    roles: ['system_admin', 'it_support_officer']
  }
];

export const roleDisplayNames: Record<UserRole, string> = {
  system_admin: 'System Administrator',
  hr_manager: 'HR Manager',
  hr_assistant: 'HR Assistant',
  finance_manager: 'Finance Manager',
  accountant: 'Accountant',
  operations_supervisor: 'Operations Supervisor',
  field_officer: 'Field Officer',
  security_guard: 'Security Guard',
  asset_manager: 'Asset Manager',
  logistics_officer: 'Logistics Officer',
  client_relationship_manager: 'Client Relationship Manager',
  billing_officer: 'Billing Officer',
  it_support_officer: 'IT Support Officer'
};