import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Users, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Filter,
  Download,
  MapPin,
  Calendar,
  DollarSign,
  Building
} from 'lucide-react';
import StatCard from '../../components/StatCard';
import FilterBar, { FilterField } from '../../components/FilterBar';
import CompactTable, { TableColumn } from '../../components/CompactTable';
import Modal from '../../components/Common/Modal';

interface Client {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  contractStart: string;
  contractEnd: string;
  status: 'active' | 'inactive' | 'pending' | 'expired';
  monthlyValue: number;
  services: string[];
  locations: string[];
  assignedEmployees: string[];
  notes?: string;
  paymentTerms: string;
  billingCycle: 'monthly' | 'quarterly' | 'annually';
}

// Mock data for development
const mockClients: Client[] = [
  {
    id: '1',
    name: 'ABC Corporation',
    contactPerson: 'John Manager',
    email: 'john.manager@abccorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business Ave, Downtown, City, State 12345',
    contractStart: '2023-01-01',
    contractEnd: '2024-12-31',
    status: 'active',
    monthlyValue: 15000,
    services: ['Security Guarding', 'Access Control', 'Patrol Services'],
    locations: ['Downtown Office', 'Warehouse Facility'],
    assignedEmployees: ['John Smith', 'Sarah Johnson'],
    notes: 'High priority client, 24/7 security required',
    paymentTerms: 'Net 30',
    billingCycle: 'monthly'
  },
  {
    id: '2',
    name: 'Mall Security LLC',
    contactPerson: 'Lisa Director',
    email: 'lisa.director@mallsecurity.com',
    phone: '+1 (555) 234-5678',
    address: '456 Shopping Center, Mall District, City, State 12345',
    contractStart: '2023-03-15',
    contractEnd: '2025-03-15',
    status: 'active',
    monthlyValue: 25000,
    services: ['Mall Security', 'Crowd Control', 'Event Security'],
    locations: ['Main Mall', 'Parking Garage'],
    assignedEmployees: ['Michael Brown', 'David Wilson'],
    notes: 'Shopping mall with high foot traffic',
    paymentTerms: 'Net 15',
    billingCycle: 'monthly'
  },
  {
    id: '3',
    name: 'Industrial Security Inc',
    contactPerson: 'Robert Supervisor',
    email: 'robert.supervisor@industrialsec.com',
    phone: '+1 (555) 345-6789',
    address: '789 Industrial Park, Factory District, City, State 12345',
    contractStart: '2022-08-01',
    contractEnd: '2024-08-01',
    status: 'active',
    monthlyValue: 18000,
    services: ['Factory Security', 'Night Patrol', 'Equipment Protection'],
    locations: ['Main Factory', 'Storage Facility'],
    assignedEmployees: ['Lisa Davis'],
    notes: 'Heavy machinery facility, safety critical',
    paymentTerms: 'Net 30',
    billingCycle: 'monthly'
  },
  {
    id: '4',
    name: 'Tech Corp',
    contactPerson: 'Sarah CEO',
    email: 'sarah.ceo@techcorp.com',
    phone: '+1 (555) 456-7890',
    address: '321 Tech Campus, Innovation District, City, State 12345',
    contractStart: '2024-01-01',
    contractEnd: '2025-01-01',
    status: 'active',
    monthlyValue: 12000,
    services: ['Reception Security', 'Building Access', 'Visitor Management'],
    locations: ['Main Campus', 'Research Lab'],
    assignedEmployees: ['John Smith'],
    notes: 'Tech company with sensitive data',
    paymentTerms: 'Net 30',
    billingCycle: 'monthly'
  },
  {
    id: '5',
    name: 'Event Security Services',
    contactPerson: 'Mike Coordinator',
    email: 'mike.coordinator@eventsecurity.com',
    phone: '+1 (555) 567-8901',
    address: '654 Event Center, Entertainment District, City, State 12345',
    contractStart: '2023-06-01',
    contractEnd: '2024-06-01',
    status: 'pending',
    monthlyValue: 8000,
    services: ['Event Security', 'VIP Protection', 'Crowd Management'],
    locations: ['Event Center', 'Concert Hall'],
    assignedEmployees: ['David Wilson'],
    notes: 'Event-based security services',
    paymentTerms: 'Net 15',
    billingCycle: 'monthly'
  }
];

const Clients: React.FC = () => {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const canManageClients = user?.role === 'system_admin' || user?.role === 'client_relationship_manager' || user?.role === 'operations_supervisor';

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesService = serviceFilter === 'all' || client.services.includes(serviceFilter);
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTotalValue = () => {
    return clients.reduce((total, client) => total + client.monthlyValue, 0);
  };

  const getActiveClients = () => {
    return clients.filter(client => client.status === 'active').length;
  };

  const getPendingClients = () => {
    return clients.filter(client => client.status === 'pending').length;
  };

  const getExpiringContracts = () => {
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return clients.filter(client => {
      const contractEnd = new Date(client.contractEnd);
      return contractEnd <= threeMonthsFromNow && client.status === 'active';
    }).length;
  };

  const getTotalLocations = () => {
    return clients.reduce((total, client) => total + client.locations.length, 0);
  };

  const handleDeleteClient = (clientId: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== clientId));
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
            <p className="text-gray-600 mt-1">Manage client relationships and contracts</p>
          </div>
          {canManageClients && (
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Client</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          title="Monthly Value"
          value={formatCurrency(getTotalValue())}
          description="Total monthly contract value"
        />
        
        <StatCard
          icon={<Building className="w-6 h-6 text-blue-600" />}
          title="Active Clients"
          value={getActiveClients()}
          description="Number of active client contracts"
        />
        
        <StatCard
          icon={<Calendar className="w-6 h-6 text-yellow-600" />}
          title="Expiring Soon"
          value={getExpiringContracts()}
          description="Contracts expiring within 3 months"
        />
        
        <StatCard
          icon={<MapPin className="w-6 h-6 text-purple-600" />}
          title="Total Locations"
          value={getTotalLocations()}
          description="Total number of client locations"
        />
      </div>

      {/* Filters and Search */}
      <FilterBar
        searchPlaceholder="Search clients..."
        searchValue={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        statusFilter={statusFilter}
        onStatusFilterChange={(e) => setStatusFilter(e.target.value)}
        serviceFilter={serviceFilter}
        onServiceFilterChange={(e) => setServiceFilter(e.target.value)}
        showExport={true}
        showImport={true}
      />

      {/* Clients List */}
      <CompactTable
        columns={columns}
        data={filteredClients}
        showPagination={true}
        totalItems={clients.length}
        currentPage={1}
        itemsPerPage={10}
        onPageChange={() => {}}
      />

      {/* Add/Edit Client Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        size="xl"
        title={
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Building className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add New Client</h2>
              <p className="text-sm text-gray-500">Create a new client account</p>
            </div>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter contact person name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <input 
                type="tel" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contract Start *</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contract End *</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Value *</label>
              <input 
                type="number" 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter monthly value"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms *</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option value="">Select Payment Terms</option>
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 45">Net 45</option>
                <option value="Net 60">Net 60</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea 
              rows={3} 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Enter company address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Services Required *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <input type="checkbox" className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <span className="text-sm font-medium">Security Guarding</span>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <input type="checkbox" className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <span className="text-sm font-medium">Access Control</span>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <input type="checkbox" className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <span className="text-sm font-medium">Patrol Services</span>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <input type="checkbox" className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <span className="text-sm font-medium">Event Security</span>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <input type="checkbox" className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <span className="text-sm font-medium">VIP Protection</span>
              </label>
              <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <input type="checkbox" className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <span className="text-sm font-medium">Crowd Management</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea 
              rows={3} 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Enter any additional notes"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 font-medium"
            >
              Cancel
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 font-medium shadow-lg hover:shadow-xl">
              Add Client
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const columns: TableColumn<Client>[] = [
  {
    header: 'Client',
    accessor: 'name',
    render: (row) => (
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-600">
            {row.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900">{row.name}</div>
          <div className="text-sm text-gray-500">{row.locations.length} locations</div>
        </div>
      </div>
    ),
  },
  {
    header: 'Contact',
    accessor: 'contactPerson',
    render: (row) => (
      <div className="text-sm text-gray-900">{row.contactPerson}</div>
    ),
  },
  {
    header: 'Contract Period',
    accessor: 'contractStart',
    render: (row) => (
      <div className="text-sm text-gray-900">{formatDate(row.contractStart)}</div>
    ),
  },
  {
    header: 'Monthly Value',
    accessor: 'monthlyValue',
    render: (row) => (
      <div className="text-sm font-medium text-gray-900">{formatCurrency(row.monthlyValue)}</div>
    ),
  },
  {
    header: 'Services',
    accessor: 'services',
    render: (row) => (
      <div className="flex flex-wrap gap-1">
        {row.services.slice(0, 2).map((service, index) => (
          <span key={index} className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {service}
          </span>
        ))}
        {row.services.length > 2 && (
          <span className="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            +{row.services.length - 2} more
          </span>
        )}
      </div>
    ),
  },
  {
    header: 'Status',
    accessor: 'status',
    render: (row) => (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(row.status)}`}>
        {row.status}
      </span>
    ),
  },
  {
    header: 'Actions',
    accessor: 'actions',
    render: (row) => (
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setSelectedClient(row)}
          className="text-blue-600 hover:text-blue-900 p-1"
          title="View Details"
        >
          <Eye className="w-4 h-4" />
        </button>
        {canManageClients && (
          <>
            <button
              onClick={() => setSelectedClient(row)}
              className="text-green-600 hover:text-green-900 p-1"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDeleteClient(row.id)}
              className="text-red-600 hover:text-red-900 p-1"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    ),
  },
];

export default Clients; 