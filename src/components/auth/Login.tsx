import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Zap,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  Settings,
  Crown,
  Cpu,
  MessageSquare,
  Sparkles,
  ChevronUp
} from 'lucide-react';

// Import logo image
import dicelLogo from '../../assets/images/dicel-logo.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAllDemos, setShowAllDemos] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { login } = useAuth();

  // Demo login configurations for all departments
  const demoLogins = [
    {
      id: 'admin',
      name: 'Admin',
      email: 'admin@dicel.co.rw',
      password: 'admin123',
      icon: Crown,
      color: 'bg-slate-600',
      description: 'Full system access',
      category: 'management'
    },
    {
      id: 'hr',
      name: 'HR Manager',
      email: 'hr.manager@dicel.co.rw',
      password: 'hr123',
      icon: Users,
      color: 'bg-blue-600',
      description: 'HR module access',
      category: 'core'
    },
    {
      id: 'finance',
      name: 'Finance Manager',
      email: 'finance.manager@dicel.co.rw',
      password: 'finance123',
      icon: DollarSign,
      color: 'bg-emerald-600',
      description: 'Finance module access',
      category: 'core'
    },
    {
      id: 'it',
      name: 'IT Manager',
      email: 'it.manager@dicel.co.rw',
      password: 'it123',
      icon: Cpu,
      color: 'bg-slate-600',
      description: 'IT module access',
      category: 'core'
    },
    {
      id: 'security',
      name: 'Security Manager',
      email: 'security.manager@dicel.co.rw',
      password: 'security123',
      icon: ShieldCheck,
      color: 'bg-red-600',
      description: 'Security module access',
      category: 'core'
    },
    {
      id: 'operations',
      name: 'Operations Manager',
      email: 'operations.manager@dicel.co.rw',
      password: 'inventory123',
      icon: Package,
      color: 'bg-amber-600',
      description: 'Operations module access',
      category: 'core'
    },
    {
      id: 'sales',
      name: 'Sales Manager',
      email: 'sales.manager@dicel.co.rw',
      password: 'sales123',
      icon: TrendingUp,
      color: 'bg-indigo-600',
      description: 'Sales module access',
      category: 'core'
    },
    {
      id: 'risk',
      name: 'Risk Manager',
      email: 'risk.manager@dicel.co.rw',
      password: 'risk123',
      icon: AlertTriangle,
      color: 'bg-amber-600',
      description: 'Risk management access',
      category: 'support'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', { email, password });
      await login(email, password);
      console.log('Login successful!');
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demo: typeof demoLogins[0]) => {
    console.log('Demo login clicked for:', demo.name, demo.email);
    setEmail(demo.email);
    setPassword(demo.password);
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        console.log('Submitting form for demo login...');
        form.dispatchEvent(new Event('submit', { bubbles: true }));
      }
    }, 100);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'management': return Crown;
      case 'core': return Users;
      case 'support': return Settings;
      default: return Users;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'management': return 'bg-slate-600';
      case 'core': return 'bg-blue-600';
      case 'support': return 'bg-emerald-600';
      default: return 'bg-gray-600';
    }
  };

  const coreDepartments = demoLogins.filter(d => d.category === 'core');
  const supportDepartments = demoLogins.filter(d => d.category === 'support');
  const managementDepartments = demoLogins.filter(d => d.category === 'management');

  // Logo component with fallback
  const LogoComponent = ({ className = "w-24 h-24" }: { className?: string }) => {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {!logoError ? (
          <img
            src={dicelLogo}
            alt="Dicel Security Company Logo"
            className="w-full h-full object-contain"
            onError={() => setLogoError(true)}
          />
        ) : (
          <Shield className="w-full h-full text-white" />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden relative">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Enhanced Corporate Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800"></div>
          
          <div className="relative z-10 flex flex-col justify-center px-16 text-white">
            <div className="mb-12">
              {/* Enhanced Logo Container */}
              <div className="relative mb-8">
                <div className="w-48 h-48 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl flex items-center justify-center shadow-xl relative overflow-hidden border border-slate-600">
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  {/* Logo */}
                  <div className="relative z-10">
                    <LogoComponent className="w-36 h-36" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-5xl font-bold mb-4 text-white">
                Dicel ERP
              </h1>
              <p className="text-xl text-slate-300 mb-8 font-medium">
                Enterprise Resource Planning System
              </p>
            </div>

            {/* Enhanced Feature Cards */}
            <div className="space-y-4">
              <div className="p-5 bg-gradient-to-r from-slate-700/60 to-slate-600/60 rounded-xl border border-slate-600/50 backdrop-blur-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-lg">Powerful Management</h3>
                    <p className="text-slate-300 text-sm">Complete control over your business operations</p>
                  </div>
                </div>
              </div>

              <div className="group p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Global Access</h3>
                  <p className="text-blue-200 text-sm">Access your data from anywhere in the world</p>
                  </div>
                </div>
              </div>

              <div className="group p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                  </div>
                <div>
                    <h3 className="font-semibold text-lg">Team Collaboration</h3>
                  <p className="text-blue-200 text-sm">Work together seamlessly across departments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <div className="w-48 h-48 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl flex items-center justify-center shadow-xl mx-auto mb-6 border border-slate-600">
                <div className="relative z-10">
                  <LogoComponent className="w-36 h-36" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Dicel ERP</h2>
              <p className="text-slate-300 font-medium">Sign in to your account</p>
            </div>

            {/* Enhanced Login Form */}
            <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome Back</h2>
                <p className="text-gray-600 text-lg">Sign in to continue to your dashboard</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                      <span className="text-sm text-red-700 font-medium">{error}</span>
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors hover:border-gray-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors hover:border-gray-400"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white/10"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-4 px-6 border border-transparent text-base font-semibold rounded-lg text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="spinner mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Sign in
                      </div>
                    )}
                  </button>
                </div>
              </form>

              {/* Enhanced Divider */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-6 bg-white text-gray-600 font-medium">Quick Demo Access</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Demo Buttons */}
              <div className="mt-6 space-y-3">
                {/* Management */}
                {managementDepartments.map((demo, index) => {
                  const Icon = demo.icon;
                  return (
                    <button
                      key={demo.id}
                      onClick={() => handleDemoLogin(demo)}
                      className="w-full flex items-center justify-between px-5 py-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg ${demo.color} flex items-center justify-center mr-4 shadow-sm`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900">{demo.name}</div>
                          <div className="text-xs text-gray-500">{demo.description}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                  );
                })}

                {/* Core Departments */}
                {coreDepartments.slice(0, 2).map((demo, index) => {
                  const Icon = demo.icon;
                  return (
                    <button
                      key={demo.id}
                      onClick={() => handleDemoLogin(demo)}
                      className="w-full flex items-center justify-between px-5 py-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-lg ${demo.color} flex items-center justify-center mr-4 shadow-sm`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900">{demo.name}</div>
                          <div className="text-xs text-gray-500">{demo.description}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </button>
                  );
                })}

                {/* Enhanced Show More Button */}
                {!showAllDemos && (
                  <button
                    onClick={() => setShowAllDemos(true)}
                    className="w-full flex items-center justify-center px-5 py-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
                  >
                    <Sparkles className="w-5 h-5 mr-3 text-emerald-600" />
                    Show All Departments
                    <span className="ml-3 text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium">+9 more</span>
                  </button>
                )}

                {/* All Departments (when expanded) */}
                {showAllDemos && (
                  <div className="space-y-3">
                    {/* Core Departments (remaining) */}
                    {coreDepartments.slice(2).map((demo, index) => {
                      const Icon = demo.icon;
                      return (
                        <button
                          key={demo.id}
                          onClick={() => handleDemoLogin(demo)}
                          className="w-full flex items-center justify-between px-5 py-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                        >
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-lg ${demo.color} flex items-center justify-center mr-4 shadow-sm`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-gray-900">{demo.name}</div>
                              <div className="text-xs text-gray-500">{demo.description}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </button>
                      );
                    })}

                    {/* Support Departments */}
                    {supportDepartments.map((demo, index) => {
                      const Icon = demo.icon;
                      return (
                        <button
                          key={demo.id}
                          onClick={() => handleDemoLogin(demo)}
                          className="w-full flex items-center justify-between px-5 py-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
                        >
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-lg ${demo.color} flex items-center justify-center mr-4 shadow-sm`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-gray-900">{demo.name}</div>
                              <div className="text-xs text-gray-500">{demo.description}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </button>
                      );
                    })}

                    {/* Enhanced Hide Button */}
                    <button
                      onClick={() => setShowAllDemos(false)}
                      className="w-full flex items-center justify-center px-5 py-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                    >
                      <ChevronUp className="w-5 h-5 mr-3" />
                      Hide Departments
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Footer */}
            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Sign up
                </Link>
              </p>
              <p className="mt-3 text-xs text-gray-500">
                © 2024 Dicel Security Company. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;