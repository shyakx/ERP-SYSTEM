import React, { useState } from 'react';
import AnimatedCard from '../../../shared/AnimatedCard';
import { AnimatedButton, AnimatedProgressBar } from '../../../shared/AnimatedCard';
import { getColorScheme } from '../../../../utils/colorSchemes';
import { 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Calendar,
  Phone
} from 'lucide-react';

const LeadManagement: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const leadStats = [
    { title: 'Total Leads', value: '156', subtitle: 'Active leads', color: 'blue', icon: '🎯', trend: { value: '+23', isPositive: true }, delay: 0 },
    { title: 'Qualified Leads', value: '89', subtitle: 'High potential', color: 'green', icon: '✅', trend: { value: '+12', isPositive: true }, delay: 100 },
    { title: 'Conversion Rate', value: '68.5%', subtitle: 'Lead to deal', color: 'orange', icon: '📊', trend: { value: '+3.2%', isPositive: true }, delay: 200 },
    { title: 'Avg Lead Value', value: 'RWF 2.8M', subtitle: 'Per lead', color: 'purple', icon: '💰', trend: { value: '+0.3M', isPositive: true }, delay: 300 }
  ];

  const leads = [
    {
      id: 1,
      name: 'Kigali Business Center',
      contact: 'Jean Pierre Uwimana',
      email: 'jean.pierre@kbc.rw',
      phone: '+250 788 123 456',
      company: 'Kigali Business Center',
      source: 'Website',
      status: 'Qualified',
      value: 'RWF 8.5M',
      assignedTo: 'Marie Claire Niyonsaba',
      createdAt: '2024-01-15',
      lastActivity: '2024-01-15 14:30',
      nextAction: 'Schedule meeting'
    },
    {
      id: 2,
      name: 'Musanze Hotel & Resort',
      contact: 'Marie Claire Niyonsaba',
      email: 'marie.claire@musanzehotel.rw',
      phone: '+250 789 234 567',
      company: 'Musanze Hotel & Resort',
      source: 'Referral',
      status: 'Contacted',
      value: 'RWF 6.2M',
      assignedTo: 'Patrick Nshimiyimana',
      createdAt: '2024-01-14',
      lastActivity: '2024-01-15 13:45',
      nextAction: 'Send proposal'
    },
    {
      id: 3,
      name: 'Huye University',
      contact: 'Patrick Nshimiyimana',
      email: 'patrick.n@huyeuni.rw',
      phone: '+250 787 345 678',
      company: 'Huye University',
      source: 'Cold Call',
      status: 'Qualified',
      value: 'RWF 4.8M',
      assignedTo: 'Emmanuel Ndayisaba',
      createdAt: '2024-01-13',
      lastActivity: '2024-01-15 12:20',
      nextAction: 'Technical assessment'
    },
    {
      id: 4,
      name: 'Rubavu Manufacturing',
      contact: 'Emmanuel Ndayisaba',
      email: 'emmanuel@rubavumfg.rw',
      phone: '+250 786 456 789',
      company: 'Rubavu Manufacturing',
      source: 'Trade Show',
      status: 'New',
      value: 'RWF 5.5M',
      assignedTo: 'Alexis Nkurunziza',
      createdAt: '2024-01-12',
      lastActivity: '2024-01-15 11:15',
      nextAction: 'Initial contact'
    },
    {
      id: 5,
      name: 'Kigali Shopping Mall',
      contact: 'Alexis Nkurunziza',
      email: 'alexis@kigalimall.rw',
      phone: '+250 785 567 890',
      company: 'Kigali Shopping Mall',
      source: 'Website',
      status: 'Contacted',
      value: 'RWF 3.9M',
      assignedTo: 'Dr. Sarah Uwamahoro',
      createdAt: '2024-01-11',
      lastActivity: '2024-01-15 10:30',
      nextAction: 'Follow-up call'
    },
    {
      id: 6,
      name: 'Butare Medical Center',
      contact: 'Dr. Sarah Uwamahoro',
      email: 'sarah.uwamahoro@butaremed.rw',
      phone: '+250 784 678 901',
      company: 'Butare Medical Center',
      source: 'Referral',
      status: 'Qualified',
      value: 'RWF 2.8M',
      assignedTo: 'Marie Claire Niyonsaba',
      createdAt: '2024-01-10',
      lastActivity: '2024-01-14 16:45',
      nextAction: 'Present solution'
    }
  ];

  const leadSources = [
    { source: 'Website', count: 45, conversion: 72.5, color: 'bg-blue-100 text-blue-800' },
    { source: 'Referral', count: 32, conversion: 85.2, color: 'bg-green-100 text-green-800' },
    { source: 'Cold Call', count: 28, conversion: 45.8, color: 'bg-purple-100 text-purple-800' },
    { source: 'Trade Show', count: 25, conversion: 68.3, color: 'bg-orange-100 text-orange-800' },
    { source: 'Social Media', count: 18, conversion: 55.6, color: 'bg-yellow-100 text-yellow-800' },
    { source: 'Email Campaign', count: 8, conversion: 42.1, color: 'bg-red-100 text-red-800' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New': return 'bg-gray-100 text-gray-800';
      case 'Contacted': return 'bg-blue-100 text-blue-800';
      case 'Qualified': return 'bg-green-100 text-green-800';
      case 'Proposal': return 'bg-yellow-100 text-yellow-800';
      case 'Negotiation': return 'bg-orange-100 text-orange-800';
      case 'Closed Won': return 'bg-green-100 text-green-800';
      case 'Closed Lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceBadge = (source: string) => {
    const sourceData = leadSources.find(s => s.source === source);
    return sourceData ? sourceData.color : 'bg-gray-100 text-gray-800';
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Lead Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {leadStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            style={{ animationDelay: `${stat.delay}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
              <div className="text-2xl">{stat.icon}</div>
            </div>
            {stat.trend && (
              <div className={`flex items-center mt-2 text-xs ${
                stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{stat.trend.isPositive ? '↗' : '↘'}</span>
                <span className="ml-1">{stat.trend.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lead Management Actions */}
      <AnimatedCard
        title="Lead Management"
        subtitle="Lead management operations"
        color="blue"
        icon="🎯"
        delay={400}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <AnimatedButton
            color="blue"
            size="md"
            onClick={() => console.log('Add lead')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lead
          </AnimatedButton>
          <AnimatedButton
            color="green"
            size="md"
            onClick={() => console.log('Import leads')}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Leads
          </AnimatedButton>
          <AnimatedButton
            color="orange"
            size="md"
            onClick={() => console.log('Assign leads')}
          >
            <User className="w-4 h-4 mr-2" />
            Assign Leads
          </AnimatedButton>
          <AnimatedButton
            color="purple"
            size="md"
            onClick={() => console.log('Generate report')}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Generate Report
          </AnimatedButton>
        </div>
      </AnimatedCard>

      {/* Search and Filter */}
      <AnimatedCard
        title="Search & Filter"
        subtitle="Find specific leads"
        color="green"
        icon="🔍"
        delay={600}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search leads by name, contact, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              <FilterIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </AnimatedCard>

      {/* Lead Sources */}
      <AnimatedCard
        title="Lead Sources"
        subtitle="Distribution by source"
        color="green"
        icon="📊"
        delay={800}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {leadSources.map((source, index) => (
            <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mb-2 ${source.color}`}>
                {source.source}
              </div>
              <div className="text-2xl font-bold text-gray-900">{source.count}</div>
              <div className="text-xs text-gray-500">{source.conversion}% conversion</div>
            </div>
          ))}
        </div>
      </AnimatedCard>

      {/* Leads Table */}
      <AnimatedCard
        title="Lead Management"
        subtitle="All active leads"
        color="orange"
        icon="📋"
        delay={1000}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                    <div className="text-xs text-gray-500">{lead.email}</div>
                    <div className="text-xs text-gray-500">{lead.phone}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.contact}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.company}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSourceBadge(lead.source)}`}>
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.value}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.assignedTo}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-900 transition-colors duration-200">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 transition-colors duration-200">
                        <Calendar className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>

      {/* Lead Metrics */}
      <AnimatedCard
        title="Lead Metrics"
        subtitle="Key performance indicators"
        color="green"
        icon="📈"
        delay={1200}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">68.5%</div>
            <div className="text-sm text-green-600">Conversion Rate</div>
            <AnimatedProgressBar progress={68.5} color="green" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-blue-600">Total Leads</div>
            <AnimatedProgressBar progress={85} color="blue" />
          </div>
          <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">RWF 2.8M</div>
            <div className="text-sm text-purple-600">Avg Lead Value</div>
            <AnimatedProgressBar progress={92} color="purple" />
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default LeadManagement;
