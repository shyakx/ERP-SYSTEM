import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { menuItems, roleDisplayNames } from '../../config/menu';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/auth';
import * as Icons from 'lucide-react';

// Real database users from the backend seed file
const databaseUsers = [
  { id: 'DIC001', name: 'Alice Uwimana', role: 'hr_manager' as const, department: 'HR', email: 'alice.uwimana@dicel.rw' },
  { id: 'DIC002', name: 'Jeanine Mukeshimana', role: 'hr_assistant' as const, department: 'HR', email: 'jeanine.mukeshimana@dicel.rw' },
  { id: 'DIC003', name: 'Eric Mugisha', role: 'hr_officer' as const, department: 'HR', email: 'eric.mugisha@dicel.rw' },
  { id: 'DIC004', name: 'Eric Niyonshuti', role: 'operations_supervisor' as const, department: 'Operations', email: 'eric.niyonshuti@dicel.rw' },
  { id: 'DIC005', name: 'Chantal Mukamana', role: 'field_officer' as const, department: 'Operations', email: 'chantal.mukamana@dicel.rw' },
  { id: 'DIC006', name: 'Jean Bosco Niyonzima', role: 'security_guard' as const, department: 'Operations', email: 'jeanbosco.niyonzima@dicel.rw' },
  { id: 'DIC007', name: 'Diane Uwase', role: 'finance_manager' as const, department: 'Finance', email: 'diane.uwase@dicel.rw' },
  { id: 'DIC008', name: 'Jean Claude', role: 'accountant' as const, department: 'Finance', email: 'jean.claude@dicel.rw' },
  { id: 'DIC009', name: 'Patrick Habimana', role: 'billing_officer' as const, department: 'Finance', email: 'patrick.habimana@dicel.rw' },
  { id: 'DIC010', name: 'Aline Mukamana', role: 'asset_manager' as const, department: 'Inventory', email: 'aline.mukamana@dicel.rw' },
  { id: 'DIC011', name: 'Olivier Ndayisenga', role: 'inventory_officer' as const, department: 'Inventory', email: 'olivier.ndayisenga@dicel.rw' },
  { id: 'DIC012', name: 'Solange Uwase', role: 'logistics_officer' as const, department: 'Inventory', email: 'solange.uwase@dicel.rw' },
  { id: 'DIC013', name: 'Alice Umutoni', role: 'system_admin' as const, department: 'ITSupport', email: 'alice.umutoni@dicel.rw' },
  { id: 'DIC014', name: 'Patrick Nkurunziza', role: 'it_support_officer' as const, department: 'ITSupport', email: 'patrick.nkurunziza@dicel.rw' },
  { id: 'DIC015', name: 'Samuel Mugabo', role: 'it_support_officer' as const, department: 'ITSupport', email: 'samuel.mugabo@dicel.rw' },
  { id: 'DIC016', name: 'Diane Uwase', role: 'compliance_manager' as const, department: 'Compliance', email: 'diane.uwase@dicel.rw' },
  { id: 'DIC017', name: 'Jean Claude', role: 'auditor' as const, department: 'Compliance', email: 'jean.claude@dicel.rw' },
  { id: 'DIC018', name: 'Claudine Ingabire', role: 'compliance_officer' as const, department: 'Compliance', email: 'claudine.ingabire@dicel.rw' },
  { id: 'DIC019', name: 'Jean Bosco', role: 'client_officer' as const, department: 'ClientManagement', email: 'jean.bosco@dicel.rw' },
  { id: 'DIC020', name: 'Solange Mukamana', role: 'client_relationship_manager' as const, department: 'ClientManagement', email: 'solange.mukamana@dicel.rw' },
  { id: 'DIC021', name: 'Emmanuel Niyonzima', role: 'client_officer' as const, department: 'ClientManagement', email: 'emmanuel.niyonzima@dicel.rw' },
  { id: 'DIC022', name: 'Claudette Uwase', role: 'sales_manager' as const, department: 'SalesMarketing', email: 'claudette.uwase@dicel.rw' },
  { id: 'DIC023', name: 'Jean Paul Mugisha', role: 'marketing_officer' as const, department: 'SalesMarketing', email: 'jeanpaul.mugisha@dicel.rw' },
  { id: 'DIC024', name: 'Josiane Uwimana', role: 'sales_officer' as const, department: 'SalesMarketing', email: 'josiane.uwimana@dicel.rw' },
  { id: 'DIC025', name: 'Pascaline Mukeshimana', role: 'hr_officer' as const, department: 'HR', email: 'pascaline.mukeshimana@dicel.rw' },
  { id: 'DIC026', name: 'Aimable Niyitegeka', role: 'operations_supervisor' as const, department: 'Operations', email: 'aimable.niyitegeka@dicel.rw' },
  { id: 'DIC027', name: 'Sandrine Uwase', role: 'finance_officer' as const, department: 'Finance', email: 'sandrine.uwase@dicel.rw' },
  { id: 'DIC028', name: 'Jean Pierre Nshimiyimana', role: 'asset_manager' as const, department: 'Inventory', email: 'jeanpierre.nshimiyimana@dicel.rw' },
  { id: 'DIC029', name: 'Marie Claire Uwimana', role: 'compliance_officer' as const, department: 'Compliance', email: 'marieclaire.uwimana@dicel.rw' },
  { id: 'DIC030', name: 'Emile Niyonsaba', role: 'sales_officer' as const, department: 'SalesMarketing', email: 'emile.niyonsaba@dicel.rw' }
];

const Sidebar: React.FC = () => {
  const { user, switchUser } = useAuth();
  const location = useLocation();
  const [showUserSwitcher, setShowUserSwitcher] = useState(false);

  const getIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <Icons.Circle className="w-5 h-5" />;
  };

  // Show all menu items based on user roles
  const filteredMenuItems = menuItems.filter(item =>
    user && authService.hasRole(user, item.roles)
  );

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col justify-between shadow-lg" style={{backgroundColor: '#111827'}}>
      {/* Company Logo */}
      <div className="p-6 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Company Logo" className="w-10 h-10 rounded-lg bg-white object-contain border-2 border-blue-600 shadow" />
          <div>
            <h1 className="text-xl font-bold tracking-wide">DICEL SECURITY</h1>
            <p className="text-xs text-gray-400">ERP System</p>
          </div>
        </div>
      </div>

      {/* User Info with Switcher */}
      <div className="p-4 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">
              {user?.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-gray-400">
              {user?.role ? roleDisplayNames[user.role] : ''}
            </p>
          </div>
          <button
            onClick={() => setShowUserSwitcher(!showUserSwitcher)}
            className="text-gray-400 hover:text-white transition-colors"
            title="Switch User"
          >
            <Icons.Settings className="w-4 h-4" />
          </button>
        </div>
        
        {/* User Switcher Dropdown */}
        {showUserSwitcher && (
          <div className="mt-3 p-2 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400 mb-2">Switch User (Testing):</p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {databaseUsers.map((dbUser) => (
                <button
                  key={dbUser.id}
                  onClick={() => {
                    switchUser(dbUser.email);
                    setShowUserSwitcher(false);
                  }}
                  className={`w-full text-left px-2 py-1 text-xs rounded ${
                    user?.email === dbUser.email 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="font-medium">{dbUser.name}</div>
                  <div className="text-gray-400">{roleDisplayNames[dbUser.role]}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 bg-gray-900">
        {filteredMenuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => `
              flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive || location.pathname === item.path
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
            `}
          >
            {getIcon(item.icon)}
            <span className="text-sm font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* System Info pinned to bottom */}
      <div className="p-4 border-t border-gray-800 bg-gray-900">
        <div className="text-xs text-gray-400">
          <p>Version 1.0.0</p>
          <p>© 2024 DICEL Security</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;