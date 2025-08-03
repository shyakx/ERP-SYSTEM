import React, { useState } from 'react';
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
  Users
} from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      // The PublicRoute component will handle the redirect automatically
      // No need for manual navigation here
    } catch (error: any) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-1000"></div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#002050] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#002050] to-blue-900"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300/20 rounded-full animate-float animation-delay-1000"></div>
          <div className="absolute bottom-40 left-40 w-20 h-20 bg-blue-500/20 rounded-full animate-float animation-delay-2000"></div>
          
          <div className="relative z-10 flex flex-col justify-center px-12 text-white">
            <div className="mb-8 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Dicel ERP</h1>
              <p className="text-xl text-blue-200 mb-8">Enterprise Resource Planning System</p>
            </div>

            <div className="space-y-6 animate-fade-in animation-delay-300">
              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Powerful Management</h3>
                  <p className="text-blue-200 text-sm">Complete control over your business operations</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Global Access</h3>
                  <p className="text-blue-200 text-sm">Access your data from anywhere in the world</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                  </div>
                <div>
                  <h3 className="font-semibold">Team Collaboration</h3>
                  <p className="text-blue-200 text-sm">Work together seamlessly across departments</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Dicel ERP</h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {/* Login Form */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to continue to your dashboard</p>
                </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-bounce-in">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span className="text-sm text-red-600 font-medium">{error}</span>
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
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
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                      Forgot password?
                    </a>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
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
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 text-gray-500">Quick Demo Access</span>
                  </div>
                </div>
              </div>

              {/* Demo Login Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => {
                    setEmail('admin@dicel.co.rw');
                    setPassword('admin123');
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm text-sm font-medium text-gray-700 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                >
                  <User className="w-4 h-4 mr-2" />
                  Admin Demo
                </button>
                <button
                  onClick={() => {
                    setEmail('hr@dicel.co.rw');
                    setPassword('hr123');
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm text-sm font-medium text-gray-700 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                >
                  <Building className="w-4 h-4 mr-2" />
                  HR Demo
                </button>
                <button
                  onClick={() => {
                    setEmail('finance@dicel.co.rw');
                    setPassword('finance123');
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white/50 backdrop-blur-sm text-sm font-medium text-gray-700 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                >
                  <Building className="w-4 h-4 mr-2" />
                  Finance Demo
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 animate-fade-in">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Sign up
                </Link>
              </p>
              <p className="mt-2 text-xs text-gray-500">
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