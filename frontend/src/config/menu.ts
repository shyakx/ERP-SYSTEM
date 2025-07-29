import { MenuItem, UserRole } from '../types';

export const menuItems: MenuItem[] = [
  // Shared/General Items - Only System Admin and essential cross-department access
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/dashboard',
    roles: ['system_admin']
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'Settings',
    path: '/settings',
    roles: ['system_admin', 'it_support_officer']
  },
  {
    id: 'chatbot-training',
    title: 'Chatbot Training',
    icon: 'Bot',
    path: '/admin/chatbot-training',
    roles: ['system_admin']
  },
  
  // HR Department - Only HR roles and System Admin
  {
    id: 'hr-dashboard',
    title: 'HR Dashboard',
    icon: 'Users',
    path: '/hr/dashboard',
    roles: ['system_admin', 'hr_manager', 'hr_assistant', 'hr_officer']
  },
  {
    id: 'hr-employees',
    title: 'Employee Management',
    icon: 'User',
    path: '/hr/employees',
    roles: ['system_admin', 'hr_manager', 'hr_assistant', 'hr_officer']
  },
  {
    id: 'hr-training',
    title: 'Training Management',
    icon: 'GraduationCap',
    path: '/hr/training',
    roles: ['system_admin', 'hr_manager', 'hr_assistant', 'hr_officer']
  },
  {
    id: 'hr-performance',
    title: 'Performance Reviews',
    icon: 'BarChart3',
    path: '/hr/performance',
    roles: ['system_admin', 'hr_manager', 'hr_assistant', 'hr_officer']
  },
  {
    id: 'hr-recruitment',
    title: 'Recruitment',
    icon: 'UserPlus',
    path: '/hr/recruitment',
    roles: ['system_admin', 'hr_manager', 'hr_assistant', 'hr_officer']
  },
  {
    id: 'hr-leave',
    title: 'Leave Management',
    icon: 'Calendar',
    path: '/hr/leave',
    roles: ['system_admin', 'hr_manager', 'hr_assistant', 'hr_officer']
  },
  {
    id: 'hr-documents',
    title: 'HR Documents',
    icon: 'FolderOpen',
    path: '/hr/documents',
    roles: ['system_admin', 'hr_manager', 'hr_assistant', 'hr_officer']
  },
  {
    id: 'hr-shifts',
    title: 'Shift Scheduling',
    icon: 'Clock',
    path: '/hr/shifts',
    roles: ['system_admin', 'hr_manager', 'hr_assistant', 'hr_officer']
  },
  {
    id: 'hr-attendance',
    title: 'Attendance',
    icon: 'UserCheck',
    path: '/hr/attendance',
    roles: ['system_admin', 'hr_manager', 'hr_assistant', 'hr_officer']
  },
  {
    id: 'hr-payroll',
    title: 'Payroll Management',
    icon: 'DollarSign',
    path: '/hr/payroll',
    roles: ['system_admin', 'hr_manager', 'hr_assistant', 'hr_officer']
  },
  
  // Finance Department - Only Finance roles and System Admin
  {
    id: 'finance-dashboard',
    title: 'Finance Dashboard',
    icon: 'DollarSign',
    path: '/finance/dashboard',
    roles: ['system_admin', 'finance_manager', 'accountant', 'finance_officer', 'billing_officer']
  },
  {
    id: 'finance-budget',
    title: 'Budget Management',
    icon: 'PieChart',
    path: '/finance/budget',
    roles: ['system_admin', 'finance_manager', 'accountant', 'finance_officer']
  },
  {
    id: 'finance-reconciliation',
    title: 'Account Reconciliation',
    icon: 'CheckSquare',
    path: '/finance/reconciliation',
    roles: ['system_admin', 'finance_manager', 'accountant', 'finance_officer']
  },
  {
    id: 'finance-tax',
    title: 'Tax Management',
    icon: 'Receipt',
    path: '/finance/tax',
    roles: ['system_admin', 'finance_manager', 'accountant', 'finance_officer']
  },
  {
    id: 'finance-salary',
    title: 'Salary Disbursement',
    icon: 'CreditCard',
    path: '/finance/salary',
    roles: ['system_admin', 'finance_manager', 'accountant', 'finance_officer']
  },
  {
    id: 'finance-payments',
    title: 'Payments',
    icon: 'CreditCard',
    path: '/finance/payments',
    roles: ['system_admin', 'finance_manager', 'accountant', 'finance_officer', 'billing_officer']
  },
  {
    id: 'finance-reports',
    title: 'Finance Reports',
    icon: 'BarChart3',
    path: '/finance/reports',
    roles: ['system_admin', 'finance_manager', 'accountant', 'finance_officer', 'billing_officer']
  },
  {
    id: 'invoicing',
    title: 'Invoicing & Billing',
    icon: 'FileText',
    path: '/invoicing',
    roles: ['system_admin', 'finance_manager', 'accountant', 'billing_officer']
  },
  {
    id: 'expenses',
    title: 'Expense Management',
    icon: 'Receipt',
    path: '/expenses',
    roles: ['system_admin', 'finance_manager', 'accountant']
  },
  {
    id: 'payslips',
    title: 'Payslips',
    icon: 'FileText',
    path: '/payslips',
    roles: ['system_admin', 'finance_manager', 'accountant']
  },
  
  // Operations Department - Only Operations roles and System Admin
  {
    id: 'operations-dashboard',
    title: 'Operations Dashboard',
    icon: 'Activity',
    path: '/operations/dashboard',
    roles: ['system_admin', 'operations_supervisor', 'field_officer', 'security_guard']
  },
  {
    id: 'operations-vehicles',
    title: 'Vehicle Management',
    icon: 'Truck',
    path: '/operations/vehicles',
    roles: ['system_admin', 'operations_supervisor', 'field_officer']
  },
  {
    id: 'operations-shifts',
    title: 'Shift Management',
    icon: 'Clock',
    path: '/operations/shifts',
    roles: ['system_admin', 'operations_supervisor', 'field_officer']
  },
  {
    id: 'operations-sites',
    title: 'Site Management',
    icon: 'MapPin',
    path: '/operations/sites',
    roles: ['system_admin', 'operations_supervisor', 'field_officer']
  },
  {
    id: 'operations-tasks',
    title: 'Task Assignment',
    icon: 'CheckSquare',
    path: '/operations/tasks',
    roles: ['system_admin', 'operations_supervisor', 'field_officer']
  },
  {
    id: 'operations-patrols',
    title: 'Patrol Logs',
    icon: 'Route',
    path: '/operations/patrols',
    roles: ['system_admin', 'operations_supervisor', 'field_officer', 'security_guard']
  },
  {
    id: 'operations-equipment',
    title: 'Equipment Check',
    icon: 'Tool',
    path: '/operations/equipment',
    roles: ['system_admin', 'operations_supervisor', 'field_officer']
  },
  {
    id: 'operations-guards',
    title: 'Guard Scheduling',
    icon: 'Users',
    path: '/operations/guards',
    roles: ['system_admin', 'operations_supervisor', 'field_officer']
  },
  {
    id: 'operations-reports',
    title: 'Daily Reports',
    icon: 'FileText',
    path: '/operations/reports',
    roles: ['system_admin', 'operations_supervisor', 'field_officer']
  },
  {
    id: 'operations-duty',
    title: 'Duty Roster',
    icon: 'Calendar',
    path: '/operations/duty',
    roles: ['system_admin', 'operations_supervisor', 'field_officer']
  },
  {
    id: 'operations-post',
    title: 'Post Orders',
    icon: 'ClipboardList',
    path: '/operations/post',
    roles: ['system_admin', 'operations_supervisor', 'field_officer']
  },
  {
    id: 'incidents',
    title: 'Incident Reporting',
    icon: 'AlertTriangle',
    path: '/incidents',
    roles: ['system_admin', 'operations_supervisor', 'field_officer', 'security_guard']
  },
  
  // Inventory Department - Only Inventory roles and System Admin
  {
    id: 'inventory-dashboard',
    title: 'Inventory Dashboard',
    icon: 'Package',
    path: '/inventory/dashboard',
    roles: ['system_admin', 'asset_manager', 'inventory_officer', 'logistics_officer']
  },
  {
    id: 'inventory-stock',
    title: 'Stock Levels',
    icon: 'BarChart3',
    path: '/inventory/stock',
    roles: ['system_admin', 'asset_manager', 'inventory_officer', 'logistics_officer']
  },
  {
    id: 'inventory-suppliers',
    title: 'Supplier Management',
    icon: 'Truck',
    path: '/inventory/suppliers',
    roles: ['system_admin', 'asset_manager', 'inventory_officer', 'logistics_officer']
  },
  {
    id: 'inventory-purchase',
    title: 'Purchase Orders',
    icon: 'ShoppingCart',
    path: '/inventory/purchase',
    roles: ['system_admin', 'asset_manager', 'inventory_officer', 'logistics_officer']
  },
  {
    id: 'inventory-audit',
    title: 'Inventory Audit',
    icon: 'ClipboardCheck',
    path: '/inventory/audit',
    roles: ['system_admin', 'asset_manager', 'inventory_officer', 'logistics_officer']
  },
  {
    id: 'assets',
    title: 'Asset Tracking',
    icon: 'Package',
    path: '/assets',
    roles: ['system_admin', 'asset_manager', 'inventory_officer', 'logistics_officer']
  },
  
  // Sales & Marketing Department - Only Sales & Marketing roles and System Admin
  {
    id: 'sales-dashboard',
    title: 'Sales Dashboard',
    icon: 'TrendingUp',
    path: '/sales/dashboard',
    roles: ['system_admin', 'sales_manager', 'sales_officer', 'marketing_officer']
  },
  {
    id: 'sales-leads',
    title: 'Lead Management',
    icon: 'UserPlus',
    path: '/sales/leads',
    roles: ['system_admin', 'sales_manager', 'sales_officer', 'marketing_officer']
  },
  {
    id: 'sales-opportunities',
    title: 'Opportunities',
    icon: 'Target',
    path: '/sales/opportunities',
    roles: ['system_admin', 'sales_manager', 'sales_officer', 'marketing_officer']
  },
  {
    id: 'sales-clients',
    title: 'Client Management',
    icon: 'Building',
    path: '/sales/clients',
    roles: ['system_admin', 'sales_manager', 'sales_officer', 'marketing_officer']
  },
  
  // IT Support Department - Only IT Support roles and System Admin
  {
    id: 'it-dashboard',
    title: 'IT Support Dashboard',
    icon: 'Monitor',
    path: '/it/dashboard',
    roles: ['system_admin', 'it_support_officer']
  },
  {
    id: 'it-tickets',
    title: 'Support Tickets',
    icon: 'MessageSquare',
    path: '/it/tickets',
    roles: ['system_admin', 'it_support_officer']
  },
  {
    id: 'it-assets',
    title: 'IT Assets',
    icon: 'HardDrive',
    path: '/it/assets',
    roles: ['system_admin', 'it_support_officer']
  },
  {
    id: 'it-users',
    title: 'User Management',
    icon: 'Users',
    path: '/it/users',
    roles: ['system_admin', 'it_support_officer']
  },
  {
    id: 'it-access',
    title: 'Access Control',
    icon: 'Lock',
    path: '/it/access',
    roles: ['system_admin', 'it_support_officer']
  },
  {
    id: 'it-passwords',
    title: 'Password Resets',
    icon: 'Key',
    path: '/it/passwords',
    roles: ['system_admin', 'it_support_officer']
  },
  {
    id: 'it-software',
    title: 'Software Licenses',
    icon: 'Package',
    path: '/it/software',
    roles: ['system_admin', 'it_support_officer']
  },
  {
    id: 'it-logs',
    title: 'System Logs',
    icon: 'FileText',
    path: '/it/logs',
    roles: ['system_admin', 'it_support_officer']
  },
  
  // Compliance Department - Only Compliance and System Admin roles
  {
    id: 'compliance-dashboard',
    title: 'Compliance Dashboard',
    icon: 'Shield',
    path: '/compliance/dashboard',
    roles: ['system_admin', 'auditor', 'compliance_manager', 'compliance_officer']
  },
  {
    id: 'compliance-reports',
    title: 'Compliance Reports',
    icon: 'FileText',
    path: '/compliance/reports',
    roles: ['system_admin', 'auditor', 'compliance_manager', 'compliance_officer']
  },
  {
    id: 'compliance-incidents',
    title: 'Incident Compliance',
    icon: 'AlertTriangle',
    path: '/compliance/incidents',
    roles: ['system_admin', 'auditor', 'compliance_manager', 'compliance_officer']
  },
  {
    id: 'compliance-audit',
    title: 'Audit Management',
    icon: 'Activity',
    path: '/compliance/audit',
    roles: ['system_admin', 'auditor', 'compliance_manager', 'compliance_officer']
  },
  {
    id: 'compliance-documents',
    title: 'Compliance Documents',
    icon: 'FolderOpen',
    path: '/compliance/documents',
    roles: ['system_admin', 'auditor', 'compliance_manager', 'compliance_officer']
  },
  {
    id: 'compliance-licenses',
    title: 'License Management',
    icon: 'Lock',
    path: '/compliance/licenses',
    roles: ['system_admin', 'auditor', 'compliance_manager', 'compliance_officer']
  },
  {
    id: 'compliance-policies',
    title: 'Policy Documents',
    icon: 'FileText',
    path: '/compliance/policies',
    roles: ['system_admin', 'auditor', 'compliance_manager', 'compliance_officer']
  },
  {
    id: 'compliance-regulatory',
    title: 'Regulatory Updates',
    icon: 'Shield',
    path: '/compliance/regulatory',
    roles: ['system_admin', 'auditor', 'compliance_manager', 'compliance_officer']
  },
  {
    id: 'compliance-training',
    title: 'Training Records',
    icon: 'Users',
    path: '/compliance/training',
    roles: ['system_admin', 'auditor', 'compliance_manager', 'compliance_officer']
  },
  
  // Client Management Department - Only Client Management roles and System Admin
  {
    id: 'client-dashboard',
    title: 'Client Dashboard',
    icon: 'Building',
    path: '/client/dashboard',
    roles: ['system_admin', 'client_relationship_manager', 'client_officer']
  },
  {
    id: 'client-requests',
    title: 'Service Requests',
    icon: 'MessageSquare',
    path: '/client/requests',
    roles: ['system_admin', 'client_relationship_manager', 'client_officer']
  },
  {
    id: 'client-support',
    title: 'Support Tickets',
    icon: 'Headphones',
    path: '/client/support',
    roles: ['system_admin', 'client_relationship_manager', 'client_officer']
  },
  {
    id: 'client-feedback',
    title: 'Client Feedback',
    icon: 'MessageCircle',
    path: '/client/feedback',
    roles: ['system_admin', 'client_relationship_manager', 'client_officer']
  },
  {
    id: 'client-documents',
    title: 'Client Documents',
    icon: 'FolderOpen',
    path: '/client/documents',
    roles: ['system_admin', 'client_relationship_manager', 'client_officer']
  },
  {
    id: 'client-meetings',
    title: 'Client Meetings',
    icon: 'Calendar',
    path: '/client/meetings',
    roles: ['system_admin', 'client_relationship_manager', 'client_officer']
  },
  {
    id: 'client-contracts',
    title: 'Contract Renewals',
    icon: 'FileText',
    path: '/client/contracts',
    roles: ['system_admin', 'client_relationship_manager', 'client_officer']
  }
];

export const roleDisplayNames: Record<UserRole, string> = {
  system_admin: 'System Administrator',
  hr_manager: 'HR Manager',
  hr_assistant: 'HR Assistant',
  hr_officer: 'HR Officer',
  finance_manager: 'Finance Manager',
  accountant: 'Accountant',
  finance_officer: 'Finance Officer',
  operations_supervisor: 'Operations Supervisor',
  field_officer: 'Field Officer',
  security_guard: 'Security Guard',
  asset_manager: 'Asset Manager',
  inventory_officer: 'Inventory Officer',
  logistics_officer: 'Logistics Officer',
  client_relationship_manager: 'Client Relationship Manager',
  client_officer: 'Client Officer',
  billing_officer: 'Billing Officer',
  it_support_officer: 'IT Support Officer',
  auditor: 'Auditor',
  compliance_manager: 'Compliance Manager',
  compliance_officer: 'Compliance Officer',
  sales_manager: 'Sales Manager',
  sales_officer: 'Sales Officer',
  marketing_officer: 'Marketing Officer'
};