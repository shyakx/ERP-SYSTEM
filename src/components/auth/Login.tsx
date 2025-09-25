import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock,
  AlertCircle,
  ArrowRight,
  Zap,
  Users,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Crown,
  Sparkles,
  ChevronUp
} from 'lucide-react';

// Import logo and background images
import dicelLogo from '../../assets/images/dicel-logo.png';
import loginBackground from '../../assets/images/login-background-image.jpg';

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
      id: 'operations',
      name: 'Operations Manager',
      email: 'operations.manager@dicel.co.rw',
      password: 'operations123',
      icon: ShieldCheck,
      color: 'bg-red-600',
      description: 'Security operations access',
      category: 'core'
    },
    {
      id: 'legal',
      name: 'Legal Manager',
      email: 'legal.manager@dicel.co.rw',
      password: 'legal123',
      icon: Shield,
      color: 'bg-purple-600',
      description: 'Legal & compliance access',
      category: 'core'
    },
    {
      id: 'sales',
      name: 'Sales Manager',
      email: 'sales.manager@dicel.co.rw',
      password: 'sales123',
      icon: TrendingUp,
      color: 'bg-indigo-600',
      description: 'Sales & marketing access',
      category: 'core'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Login failed. Please try again.');
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Page Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-pulse-slow"
        style={{ 
          backgroundImage: `url(${loginBackground})`,
          animation: 'backgroundFloat 20s ease-in-out infinite',
          filter: 'blur(8px)'
        }}
      ></div>
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-800/75 to-slate-900/85 animate-fade-in"></div>
      
      {/* Subtle floating particles effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-slate-300 rounded-full animate-float-fast"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white rounded-full animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-blue-200 rounded-full animate-float-medium"></div>
      </div>

      <div className="flex min-h-screen max-w-6xl mx-auto relative z-10">
        {/* Left Side - Professional Corporate Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative items-center">
          
          <div className="relative z-10 flex flex-col justify-center px-8 text-white w-full">
            <div className="mb-6">
              {/* Professional Logo Container with Animation */}
              <div className="relative mb-4 animate-fade-in">
                <div className="w-28 h-28 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl flex items-center justify-center shadow-2xl relative overflow-hidden border border-slate-600 hover:scale-105 transition-transform duration-300">
                  {/* Professional inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  {/* Logo */}
                  <div className="relative z-10">
                    <LogoComponent className="w-20 h-20" />
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-2 text-white animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Dicel ERP
              </h1>
              <p className="text-base text-slate-300 mb-4 font-medium animate-fade-in" style={{ animationDelay: '0.4s' }}>
                Enterprise Resource Planning System
              </p>
            </div>

            {/* Professional Feature Cards with Animation */}
            <div className="space-y-2">
              <div className="p-3 bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-lg border border-slate-600/50 backdrop-blur-sm animate-fade-in hover:scale-105 transition-all duration-300" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center shadow-sm">
                    <Zap className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Enterprise Management</h3>
                    <p className="text-slate-300 text-xs">Complete control over your business operations</p>
                  </div>
                </div>
              </div>

              <div className="group p-3 bg-slate-800/60 backdrop-blur-xl rounded-lg border border-slate-600/30 hover:bg-slate-800/80 transition-all duration-300 animate-fade-in hover:scale-105" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-slate-600 to-slate-500 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                    <h3 className="font-semibold text-sm">Global Access</h3>
                    <p className="text-slate-300 text-xs">Access your data from anywhere in the world</p>
                  </div>
                </div>
              </div>

              <div className="group p-3 bg-slate-800/60 backdrop-blur-xl rounded-lg border border-slate-600/30 hover:bg-slate-800/80 transition-all duration-300 animate-fade-in hover:scale-105" style={{ animationDelay: '1.0s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-slate-600 to-slate-500 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5 text-white" />
                  </div>
                <div>
                    <h3 className="font-semibold text-sm">Team Collaboration</h3>
                    <p className="text-slate-300 text-xs">Work together seamlessly across departments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Enhanced Login Form */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-sm">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-4">
              <div className="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl flex items-center justify-center shadow-2xl mx-auto mb-3 border border-slate-600">
                <div className="relative z-10">
                  <LogoComponent className="w-16 h-16" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-white mb-1">Dicel ERP</h2>
              <p className="text-slate-300 text-sm">Sign in to your account</p>
            </div>

            {/* Professional Login Form */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-5 border border-white/20">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-slate-900 mb-1">Welcome Back</h2>
                <p className="text-slate-600 text-sm">Sign in to continue to your dashboard</p>
              </div>

              <form className="space-y-3" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center">
                      <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                      <span className="text-xs text-red-700 font-medium">{error}</span>
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors hover:border-slate-400"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors hover:border-slate-400"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-400 hover:text-slate-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-400 hover:text-slate-500" />
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
                      className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-xs text-slate-600">
                      Remember me
                    </label>
                  </div>
                  <div className="text-xs">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="spinner mr-2"></div>
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 mr-2" />
                        Sign in
                      </div>
                    )}
                  </button>
                </div>
              </form>

              {/* Professional Divider */}
              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-300" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-slate-600 font-medium">Quick Demo Access</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Demo Buttons */}
              <div className="mt-3 space-y-1">
                {/* Management */}
                {managementDepartments.map((demo) => {
                  const Icon = demo.icon;
                  return (
                    <button
                      key={demo.id}
                      onClick={() => handleDemoLogin(demo)}
                      className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg shadow-sm bg-white text-xs font-medium text-slate-900 hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-lg ${demo.color} flex items-center justify-center mr-2 shadow-sm`}>
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-slate-900 text-xs">{demo.name}</div>
                          <div className="text-xs text-slate-500">{demo.description}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                  );
                })}

                {/* Core Departments */}
                {coreDepartments.slice(0, 2).map((demo) => {
                  const Icon = demo.icon;
                  return (
                    <button
                      key={demo.id}
                      onClick={() => handleDemoLogin(demo)}
                      className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg shadow-sm bg-white text-xs font-medium text-slate-900 hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-200"
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-lg ${demo.color} flex items-center justify-center mr-2 shadow-sm`}>
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-slate-900 text-xs">{demo.name}</div>
                          <div className="text-xs text-slate-500">{demo.description}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </button>
                  );
                })}

                {/* Enhanced Show More Button */}
                {!showAllDemos && (
                  <button
                    onClick={() => setShowAllDemos(true)}
                    className="w-full flex items-center justify-center px-3 py-2 border border-slate-200 rounded-lg shadow-sm bg-white text-xs font-medium text-slate-900 hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-200"
                  >
                    <Sparkles className="w-3 h-3 mr-1 text-blue-600" />
                    Show All Departments
                    <span className="ml-1 text-xs bg-blue-100 text-blue-700 px-1 py-0.5 rounded-full font-medium">+4 more</span>
                  </button>
                )}

                {/* All Departments (when expanded) */}
                {showAllDemos && (
                  <div className="space-y-1">
                    {/* Core Departments (remaining) */}
                    {coreDepartments.slice(2).map((demo) => {
                      const Icon = demo.icon;
                      return (
                        <button
                          key={demo.id}
                          onClick={() => handleDemoLogin(demo)}
                          className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg shadow-sm bg-white text-xs font-medium text-slate-900 hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-200"
                        >
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-lg ${demo.color} flex items-center justify-center mr-2 shadow-sm`}>
                              <Icon className="w-3 h-3 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-gray-900 text-xs">{demo.name}</div>
                              <div className="text-xs text-gray-500">{demo.description}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                        </button>
                      );
                    })}

                    {/* Support Departments */}
                    {supportDepartments.map((demo) => {
                      const Icon = demo.icon;
                      return (
                        <button
                          key={demo.id}
                          onClick={() => handleDemoLogin(demo)}
                          className="w-full flex items-center justify-between px-3 py-2 border border-slate-200 rounded-lg shadow-sm bg-white text-xs font-medium text-slate-900 hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-all duration-200"
                        >
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-lg ${demo.color} flex items-center justify-center mr-2 shadow-sm`}>
                              <Icon className="w-3 h-3 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-gray-900 text-xs">{demo.name}</div>
                              <div className="text-xs text-gray-500">{demo.description}</div>
                            </div>
                          </div>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                        </button>
                      );
                    })}

                    {/* Enhanced Hide Button */}
                    <button
                      onClick={() => setShowAllDemos(false)}
                      className="w-full flex items-center justify-center px-3 py-2 border border-slate-200 rounded-lg shadow-sm bg-white text-xs font-medium text-slate-500 hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200"
                    >
                      <ChevronUp className="w-3 h-3 mr-1" />
                      Hide Departments
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Professional Footer */}
            <div className="text-center mt-4">
              <p className="text-xs text-slate-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Sign up
                </Link>
              </p>
              <p className="mt-1 text-xs text-slate-500">
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