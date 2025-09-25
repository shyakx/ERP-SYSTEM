import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Settings,
  Package,
  MessageSquare,
  Target,
  Cpu,
  AlertTriangle,
  BarChart3,
  Eye,
  Edit,
  Settings as SettingsIcon,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import AnimatedCard from '../../shared/AnimatedCard';
import { AnimatedButton } from '../../shared/AnimatedCard';

interface Department {
  id: string;
  name: string;
  icon: any;
  color: string;
  status: 'active' | 'maintenance' | 'warning';
  employeeCount: number;
  manager: string;
  lastActivity: string;
  pendingActions: number;
  kpis: {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
  }[];
}

const DepartmentMiniDashboards: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const departments: Department[] = [
    {
      id: 'hr',
      name: 'Human Resources',
      icon: Users,
      color: 'blue',
      status: 'active',
      employeeCount: 45,
      manager: 'Claudine Uwimana',
      lastActivity: '2 minutes ago',
      pendingActions: 3,
      kpis: [
        { title: 'Total Employees', value: '45', change: '+2', isPositive: true },
        { title: 'Active Recruitments', value: '8', change: '+1', isPositive: true },
        { title: 'Training Sessions', value: '12', change: '-2', isPositive: false },
        { title: 'Leave Requests', value: '5', change: '+1', isPositive: false }
      ]
    },
         {
       id: 'finance',
       name: 'Finance & Accounting',
       icon: DollarSign,
       color: 'emerald',
       status: 'active',
       employeeCount: 32,
       manager: 'Emmanuel Rugamba',
       lastActivity: '5 minutes ago',
       pendingActions: 7,
       kpis: [
         { title: 'Total Revenue', value: '15.2M RWF', change: '+12.5%', isPositive: true },
         { title: 'Total Expenses', value: '8.7M RWF', change: '+5.2%', isPositive: false },
         { title: 'Net Profit', value: '6.5M RWF', change: '+18.3%', isPositive: true },
         { title: 'Pending Approvals', value: '7', change: '+2', isPositive: false }
       ]
    },
    {
      id: 'security',
      name: 'Security Management',
      icon: Shield,
      color: 'red',
      status: 'active',
      employeeCount: 15,
      manager: 'Patrick Mugisha',
      lastActivity: '1 minute ago',
      pendingActions: 2,
      kpis: [
        { title: 'Active Guards', value: '12', change: '0', isPositive: true },
        { title: 'Security Incidents', value: '1', change: '-2', isPositive: true },
        { title: 'Patrols Completed', value: '24', change: '+4', isPositive: true },
        { title: 'Access Violations', value: '0', change: '-1', isPositive: true }
      ]
    },
         {
       id: 'operations',
       name: 'Operations & Inventory',
       icon: Package,
       color: 'amber',
       status: 'active',
       employeeCount: 25,
       manager: 'Marie Mukamana',
       lastActivity: '15 minutes ago',
       pendingActions: 6,
       kpis: [
         { title: 'Total Items', value: '1,247', change: '+23', isPositive: true },
         { title: 'Low Stock Alerts', value: '12', change: '-3', isPositive: true },
         { title: 'Purchase Orders', value: '8', change: '+2', isPositive: true },
         { title: 'Inventory Value', value: '2.4M RWF', change: '+8%', isPositive: true }
       ]
     },
         {
       id: 'sales',
       name: 'Sales & Marketing',
       icon: TrendingUp,
       color: 'indigo',
       status: 'active',
       employeeCount: 38,
       manager: 'David Habyarimana',
       lastActivity: '8 minutes ago',
       pendingActions: 5,
       kpis: [
         { title: 'Total Sales', value: '8.9M RWF', change: '+15.2%', isPositive: true },
         { title: 'Active Leads', value: '45', change: '+8', isPositive: true },
         { title: 'Conversion Rate', value: '23.5%', change: '+2.1%', isPositive: true },
         { title: 'Campaign ROI', value: '156%', change: '+12%', isPositive: true }
       ]
     },
         {
       id: 'cx',
       name: 'Customer Experience',
       icon: MessageSquare,
       color: 'teal',
       status: 'active',
       employeeCount: 22,
       manager: 'Sarah Uwamahoro',
       lastActivity: '12 minutes ago',
       pendingActions: 9,
       kpis: [
         { title: 'Open Tickets', value: '18', change: '-5', isPositive: true },
         { title: 'Avg Response Time', value: '2.3h', change: '-0.5h', isPositive: true },
         { title: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', isPositive: true },
         { title: 'Resolution Rate', value: '94%', change: '+3%', isPositive: true }
       ]
     },
         {
       id: 'risk',
       name: 'Risk Management',
       icon: AlertTriangle,
       color: 'amber',
       status: 'active',
       employeeCount: 18,
       manager: 'Ange Uwase',
       lastActivity: '20 minutes ago',
       pendingActions: 3,
       kpis: [
         { title: 'Active Risks', value: '7', change: '-2', isPositive: true },
         { title: 'Risk Score', value: 'Medium', change: 'Stable', isPositive: true },
         { title: 'Compliance Status', value: '98%', change: '+1%', isPositive: true },
         { title: 'Audit Findings', value: '2', change: '-1', isPositive: true }
       ]
     }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-orange-600 bg-orange-100';
      case 'warning': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'maintenance': return Clock;
      case 'warning': return AlertCircle;
      default: return Clock;
    }
  };

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedDept = departments.find(d => d.id === selectedDepartment);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Department Mini-Dashboards</h1>
          <p className="text-gray-600">Monitor and manage all department activities from a central location</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <AnimatedButton className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </AnimatedButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department List */}
        <div className="lg:col-span-1">
          <AnimatedCard title="Departments">
            <div className="space-y-3">
              {filteredDepartments.map((dept) => {
                const Icon = dept.icon;
                const StatusIcon = getStatusIcon(dept.status);
                return (
                                     <button
                     key={dept.id}
                     onClick={() => setSelectedDepartment(dept.id)}
                     className={`w-full p-4 rounded-lg border transition-shadow duration-200 text-left ${
                       selectedDepartment === dept.id
                         ? 'border-blue-500 bg-blue-50 shadow-sm'
                         : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                     }`}
                   >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-${dept.color}-100 rounded-lg flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 text-${dept.color}-600`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{dept.name}</h3>
                          <p className="text-sm text-gray-600">{dept.employeeCount} employees</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dept.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {dept.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Manager: {dept.manager}</span>
                      <span>{dept.lastActivity}</span>
                    </div>
                    
                    {dept.pendingActions > 0 && (
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm text-orange-600 font-medium">
                          {dept.pendingActions} pending actions
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </AnimatedCard>
        </div>

        {/* Department Dashboard */}
        <div className="lg:col-span-2">
          {selectedDept ? (
            <div className="space-y-6">
              {/* Department Header */}
                             <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-${selectedDept.color}-100 rounded-xl flex items-center justify-center`}>
                      <selectedDept.icon className={`w-8 h-8 text-${selectedDept.color}-600`} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedDept.name}</h2>
                      <p className="text-gray-600">Managed by {selectedDept.manager}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <AnimatedButton className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>View Full Dashboard</span>
                    </AnimatedButton>
                    <AnimatedButton className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                      <SettingsIcon className="w-4 h-4" />
                      <span>Manage</span>
                    </AnimatedButton>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Employees</p>
                    <p className="text-2xl font-bold text-gray-900">{selectedDept.employeeCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedDept.status)}`}>
                      {selectedDept.status}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Last Activity</p>
                    <p className="text-sm font-medium text-gray-900">{selectedDept.lastActivity}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Pending Actions</p>
                    <p className="text-2xl font-bold text-orange-600">{selectedDept.pendingActions}</p>
                  </div>
                </div>
              </div>

              {/* Department KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 {selectedDept.kpis.map((kpi, index) => (
                   <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{kpi.title}</h3>
                      <span className={`text-sm font-medium ${kpi.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <AnimatedCard title="Quick Actions">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                     <button className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-shadow duration-200 text-left">
                     <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mb-3">
                       <Users className="w-4 h-4 text-blue-600" />
                     </div>
                     <h3 className="font-medium text-gray-900 mb-1">Manage Employees</h3>
                     <p className="text-sm text-gray-600">Add, edit, or remove employees</p>
                   </button>
                   
                   <button className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-shadow duration-200 text-left">
                     <div className="w-8 h-8 bg-emerald-100 rounded flex items-center justify-center mb-3">
                       <BarChart3 className="w-4 h-4 text-emerald-600" />
                     </div>
                     <h3 className="font-medium text-gray-900 mb-1">View Reports</h3>
                     <p className="text-sm text-gray-600">Generate department reports</p>
                   </button>
                   
                   <button className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-shadow duration-200 text-left">
                     <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center mb-3">
                       <Settings className="w-4 h-4 text-slate-600" />
                     </div>
                     <h3 className="font-medium text-gray-900 mb-1">Configure</h3>
                     <p className="text-sm text-gray-600">Department settings & permissions</p>
                   </button>
                </div>
              </AnimatedCard>
            </div>
          ) : (
            <AnimatedCard title="Select a Department">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Department Selected</h3>
                <p className="text-gray-600">Choose a department from the list to view its dashboard and manage its activities.</p>
              </div>
            </AnimatedCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentMiniDashboards;
