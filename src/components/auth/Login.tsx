import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  User,
  Building,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Zap,
  Globe,
  Users,
  DollarSign,
  FileText,
  Package,
  UserCheck,
  TrendingUp,
  Heart,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Settings,
  Crown,
  Briefcase,
  HeadphonesIcon,
  Target,
  BarChart3,
  Database,
  Cpu,
  Network,
  Globe2,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  Star,
  Award,
  Gift,
  Coffee,
  Sparkles,
  ChevronUp,
  Sparkles as SparklesIcon,
  Star as StarIcon,
  Zap as ZapIcon
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
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [animateSuccess, setAnimateSuccess] = useState(false);
  const { login, user } = useAuth();

  // Demo login configurations for all departments
  const demoLogins = [
    {
      id: 'admin',
      name: 'Admin',
      email: 'admin@dicel.co.rw',
      password: 'admin123',
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      description: 'Full system access',
      category: 'management'
    },
    {
      id: 'hr',
      name: 'HR Department',
      email: 'hr@dicel.co.rw',
      password: 'hr123',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      description: 'Employee management',
      category: 'core'
    },
    {
      id: 'finance',
      name: 'Finance Department',
      email: 'finance@dicel.co.rw',
      password: 'finance123',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      description: 'Budget & accounting',
      category: 'core'
    },
    {
      id: 'security',
      name: 'Security Management',
      email: 'security@dicel.co.rw',
      password: 'security123',
      icon: ShieldCheck,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Guard management',
      category: 'core'
    },
    {
      id: 'compliance',
      name: 'Compliance',
      email: 'compliance@dicel.co.rw',
      password: 'compliance123',
      icon: FileText,
      color: 'from-red-500 to-red-600',
      description: 'Regulatory compliance',
      category: 'support'
    },
    {
      id: 'inventory',
      name: 'Inventory',
      email: 'inventory@dicel.co.rw',
      password: 'inventory123',
      icon: Package,
      color: 'from-orange-500 to-orange-600',
      description: 'Asset management',
      category: 'support'
    },
    {
      id: 'client-management',
      name: 'Client Management',
      email: 'clients@dicel.co.rw',
      password: 'clients123',
      icon: UserCheck,
      color: 'from-indigo-500 to-indigo-600',
      description: 'Customer relations',
      category: 'core'
    },
    {
      id: 'sales-marketing',
      name: 'Sales & Marketing',
      email: 'sales@dicel.co.rw',
      password: 'sales123',
      icon: TrendingUp,
      color: 'from-pink-500 to-pink-600',
      description: 'Revenue generation',
      category: 'core'
    },
    {
      id: 'customer-experience',
      name: 'Customer Experience',
      email: 'cx@dicel.co.rw',
      password: 'cx123',
      icon: Heart,
      color: 'from-cyan-500 to-cyan-600',
      description: 'Customer support',
      category: 'support'
    },
    {
      id: 'risk',
      name: 'Risk Department',
      email: 'risk@dicel.co.rw',
      password: 'risk123',
      icon: AlertTriangle,
      color: 'from-red-400 to-red-500',
      description: 'Risk assessment',
      category: 'support'
    },
    {
      id: 'recovery',
      name: 'Recovery',
      email: 'recovery@dicel.co.rw',
      password: 'recovery123',
      icon: RefreshCw,
      color: 'from-emerald-500 to-emerald-600',
      description: 'Asset recovery',
      category: 'support'
    },
    {
      id: 'it',
      name: 'IT Department',
      email: 'it@dicel.co.rw',
      password: 'it123',
      icon: Cpu,
      color: 'from-blue-400 to-blue-500',
      description: 'Technical support',
      category: 'support'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      setAnimateSuccess(true);
      setTimeout(() => setAnimateSuccess(false), 2000);
    } catch (error: any) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demo: typeof demoLogins[0]) => {
    setEmail(demo.email);
    setPassword(demo.password);
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { bubbles: true }));
      }
    }, 100);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'management': return Crown;
      case 'core': return Building;
      case 'support': return Settings;
      default: return Users;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'management': return 'from-purple-500 to-purple-600';
      case 'core': return 'from-blue-500 to-blue-600';
      case 'support': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60 animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40 animate-float-medium"></div>
        <div className="absolute bottom-40 left-40 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-50 animate-float-fast"></div>
        <div className="absolute top-60 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-30 animate-float-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-60 animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-40 animate-float-fast"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-move"></div>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Enhanced Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full animate-float-slow blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full animate-float-medium blur-xl"></div>
          <div className="absolute bottom-40 left-40 w-20 h-20 bg-pink-500/10 rounded-full animate-float-fast blur-xl"></div>
          
          <div className="relative z-10 flex flex-col justify-center px-16 text-white">
            <div className="mb-12 animate-fade-in-up">
              {/* Enhanced Logo Container */}
              <div className="relative mb-8">
                <div className="w-48 h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl relative overflow-hidden group animate-pulse-slow">
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-shift"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                  
                  {/* Logo */}
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                    <LogoComponent className="w-32 h-32" />
                  </div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl animate-pulse-slow"></div>
                </div>
                
                {/* Floating Icons */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                  <StarIcon className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce animation-delay-1000">
                  <ZapIcon className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
                Dicel ERP
              </h1>
              <p className="text-xl text-blue-200 mb-8 animate-fade-in-up animation-delay-400">
                Enterprise Resource Planning System
              </p>
            </div>

            {/* Enhanced Feature Cards */}
            <div className="space-y-6 animate-fade-in-up animation-delay-600">
              <div className="group p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Powerful Management</h3>
                  <p className="text-blue-200 text-sm">Complete control over your business operations</p>
                  </div>
                </div>
              </div>

              <div className="group p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Global Access</h3>
                  <p className="text-blue-200 text-sm">Access your data from anywhere in the world</p>
                  </div>
                </div>
              </div>

              <div className="group p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
            <div className="lg:hidden text-center mb-8 animate-fade-in-up">
              <div className="w-40 h-40 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-xl mx-auto mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-shift"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                <div className="relative z-10">
                  <LogoComponent className="w-28 h-28" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Dicel ERP</h2>
              <p className="text-gray-300">Sign in to your account</p>
            </div>

            {/* Enhanced Login Form */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up animation-delay-300">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-300">Sign in to continue to your dashboard</p>
                </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-500/20 border border-red-400/30 rounded-2xl p-4 animate-shake">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                      <span className="text-sm text-red-300 font-medium">{error}</span>
                    </div>
                  </div>
                )}

                {/* Enhanced Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${
                      isFocused.email ? 'text-blue-400' : 'text-gray-400'
                    }`}>
                      <Mail className="h-5 w-5" />
                    </div>
                      <input
                        id="email"
                        name="email"
                      type="email"
                      autoComplete="email"
                        required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setIsFocused({ ...isFocused, email: true })}
                      onBlur={() => setIsFocused({ ...isFocused, email: false })}
                      className={`w-full pl-12 pr-4 py-4 border rounded-2xl transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isFocused.email 
                          ? 'border-blue-400/50 bg-white/20' 
                          : 'border-white/20 hover:border-white/30'
                      }`}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                {/* Enhanced Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative group">
                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${
                      isFocused.password ? 'text-blue-400' : 'text-gray-400'
                    }`}>
                      <Lock className="h-5 w-5" />
                    </div>
                      <input
                        id="password"
                        name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                        required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setIsFocused({ ...isFocused, password: true })}
                      onBlur={() => setIsFocused({ ...isFocused, password: false })}
                      className={`w-full pl-12 pr-12 py-4 border rounded-2xl transition-all duration-300 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isFocused.password 
                          ? 'border-blue-400/50 bg-white/20' 
                          : 'border-white/20 hover:border-white/30'
                      }`}
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300 transition-colors" />
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

                {/* Enhanced Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`group relative w-full flex justify-center py-4 px-6 border border-transparent text-sm font-medium rounded-2xl text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                      animateSuccess 
                        ? 'bg-gradient-to-r from-green-500 to-green-600' 
                        : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800'
                    } shadow-2xl`}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="spinner mr-2"></div>
                        Signing in...
                      </div>
                    ) : animateSuccess ? (
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Success!
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Sign in
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </button>
                </div>
              </form>

              {/* Enhanced Divider */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/10 text-gray-300 backdrop-blur-sm rounded-full">Quick Demo Access</span>
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
                      className="w-full flex items-center justify-between px-6 py-4 border border-white/20 rounded-2xl shadow-lg bg-white/5 backdrop-blur-sm text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105 group animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${demo.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{demo.name}</div>
                          <div className="text-xs text-gray-300">{demo.description}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
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
                      className="w-full flex items-center justify-between px-6 py-4 border border-white/20 rounded-2xl shadow-lg bg-white/5 backdrop-blur-sm text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 group animate-fade-in-up"
                      style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    >
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${demo.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{demo.name}</div>
                          <div className="text-xs text-gray-300">{demo.description}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </button>
                  );
                })}

                {/* Show More Button */}
                {!showAllDemos && (
                  <button
                    onClick={() => setShowAllDemos(true)}
                    className="w-full flex items-center justify-center px-6 py-4 border border-white/20 rounded-2xl shadow-lg bg-white/5 backdrop-blur-sm text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 group animate-fade-in-up"
                    style={{ animationDelay: '300ms' }}
                  >
                    <SparklesIcon className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-300" />
                    Show All Departments
                    <span className="ml-3 text-xs bg-green-500/20 text-green-300 px-3 py-1 rounded-full">+9 more</span>
                  </button>
                )}

                {/* All Departments (when expanded) */}
                {showAllDemos && (
                  <div className="space-y-3 animate-fade-in-up">
                    {/* Core Departments (remaining) */}
                    {coreDepartments.slice(2).map((demo, index) => {
                      const Icon = demo.icon;
                      return (
                <button
                          key={demo.id}
                          onClick={() => handleDemoLogin(demo)}
                          className="w-full flex items-center justify-between px-6 py-4 border border-white/20 rounded-2xl shadow-lg bg-white/5 backdrop-blur-sm text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 group"
                          style={{ animationDelay: `${index * 50}ms` }}
                >
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${demo.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold">{demo.name}</div>
                              <div className="text-xs text-gray-300">{demo.description}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
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
                          className="w-full flex items-center justify-between px-6 py-4 border border-white/20 rounded-2xl shadow-lg bg-white/5 backdrop-blur-sm text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105 group"
                          style={{ animationDelay: `${(index + coreDepartments.length - 2) * 50}ms` }}
                >
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${demo.color} flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold">{demo.name}</div>
                              <div className="text-xs text-gray-300">{demo.description}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-400 transition-colors" />
                </button>
                      );
                    })}

                    {/* Hide Button */}
                <button
                      onClick={() => setShowAllDemos(false)}
                      className="w-full flex items-center justify-center px-6 py-4 border border-white/20 rounded-2xl shadow-lg bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 transform hover:scale-105"
                >
                      <ChevronUp className="w-5 h-5 mr-3" />
                      Hide Departments
                </button>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Footer */}
            <div className="text-center mt-8 animate-fade-in-up animation-delay-800">
              <p className="text-sm text-gray-300">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Sign up
                </Link>
              </p>
              <p className="mt-2 text-xs text-gray-400">
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