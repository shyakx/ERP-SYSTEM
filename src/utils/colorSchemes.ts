export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  light: string;
  dark: string;
}

export const departmentColorSchemes: Record<string, ColorScheme> = {
  hr: {
    primary: 'bg-blue-500',
    secondary: 'bg-blue-600',
    accent: 'bg-blue-400',
    gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
    light: 'bg-blue-50',
    dark: 'bg-blue-900'
  },
  finance: {
    primary: 'bg-green-500',
    secondary: 'bg-green-600',
    accent: 'bg-green-400',
    gradient: 'bg-gradient-to-r from-green-500 to-green-600',
    light: 'bg-green-50',
    dark: 'bg-green-900'
  },
  compliance: {
    primary: 'bg-red-500',
    secondary: 'bg-red-600',
    accent: 'bg-red-400',
    gradient: 'bg-gradient-to-r from-red-500 to-red-600',
    light: 'bg-red-50',
    dark: 'bg-red-900'
  },
  inventory: {
    primary: 'bg-orange-500',
    secondary: 'bg-orange-600',
    accent: 'bg-orange-400',
    gradient: 'bg-gradient-to-r from-orange-500 to-orange-600',
    light: 'bg-orange-50',
    dark: 'bg-orange-900'
  },
  'client-management': {
    primary: 'bg-indigo-500',
    secondary: 'bg-indigo-600',
    accent: 'bg-indigo-400',
    gradient: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
    light: 'bg-indigo-50',
    dark: 'bg-indigo-900'
  },
  'sales-marketing': {
    primary: 'bg-pink-500',
    secondary: 'bg-pink-600',
    accent: 'bg-pink-400',
    gradient: 'bg-gradient-to-r from-pink-500 to-pink-600',
    light: 'bg-pink-50',
    dark: 'bg-pink-900'
  },
  'customer-experience': {
    primary: 'bg-cyan-500',
    secondary: 'bg-cyan-600',
    accent: 'bg-cyan-400',
    gradient: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
    light: 'bg-cyan-50',
    dark: 'bg-cyan-900'
  },
  'security-guard-management': {
    primary: 'bg-yellow-500',
    secondary: 'bg-yellow-600',
    accent: 'bg-yellow-400',
    gradient: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    light: 'bg-yellow-50',
    dark: 'bg-yellow-900'
  },
  risk: {
    primary: 'bg-red-500',
    secondary: 'bg-red-600',
    accent: 'bg-red-400',
    gradient: 'bg-gradient-to-r from-red-500 to-red-600',
    light: 'bg-red-50',
    dark: 'bg-red-900'
  },
  recovery: {
    primary: 'bg-emerald-500',
    secondary: 'bg-emerald-600',
    accent: 'bg-emerald-400',
    gradient: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
    light: 'bg-emerald-50',
    dark: 'bg-emerald-900'
  },
  it: {
    primary: 'bg-blue-500',
    secondary: 'bg-blue-600',
    accent: 'bg-blue-400',
    gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
    light: 'bg-blue-50',
    dark: 'bg-blue-900'
  },
  admin: {
    primary: 'bg-purple-500',
    secondary: 'bg-purple-600',
    accent: 'bg-purple-400',
    gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
    light: 'bg-purple-50',
    dark: 'bg-purple-900'
  }
};

export const getColorScheme = (department: string): ColorScheme => {
  return departmentColorSchemes[department] || departmentColorSchemes.hr;
};

export const getGradientColors = (department: string): string[] => {
  const schemes = {
    hr: ['#3b82f6', '#1d4ed8'],
    finance: ['#10b981', '#059669'],
    compliance: ['#ef4444', '#dc2626'],
    inventory: ['#f59e0b', '#d97706'],
    'client-management': ['#6366f1', '#4f46e5'],
    'sales-marketing': ['#ec4899', '#db2777'],
    'customer-experience': ['#06b6d4', '#0891b2'],
    'security-guard-management': ['#eab308', '#ca8a04'],
    risk: ['#ef4444', '#dc2626'],
    recovery: ['#10b981', '#059669'],
    it: ['#3b82f6', '#1d4ed8'],
    admin: ['#8b5cf6', '#7c3aed']
  };
  
  return schemes[department as keyof typeof schemes] || schemes.hr;
};

export const getAnimationDelay = (index: number): number => {
  return index * 100;
};

export const getHoverEffects = (department: string): string => {
  const effects = {
    hr: 'hover:shadow-blue-500/25',
    finance: 'hover:shadow-green-500/25',
    compliance: 'hover:shadow-red-500/25',
    inventory: 'hover:shadow-orange-500/25',
    'client-management': 'hover:shadow-indigo-500/25',
    'sales-marketing': 'hover:shadow-pink-500/25',
    'customer-experience': 'hover:shadow-cyan-500/25',
    'security-guard-management': 'hover:shadow-yellow-500/25',
    risk: 'hover:shadow-red-500/25',
    recovery: 'hover:shadow-emerald-500/25',
    it: 'hover:shadow-blue-500/25',
    admin: 'hover:shadow-purple-500/25'
  };
  
  return effects[department as keyof typeof effects] || effects.hr;
}; 