import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const COMPANY_LOGO = '/logo.png'; // Place your logo in public/logo.png
const COMPANY_NAME = 'DICEL SECURITY';
const COMPANY_TAGLINE = 'Empowering Security, Empowering People';
const SUPPORT_EMAIL = 'support@dicelsecurity.com';

// Use import.meta.env.MODE for Vite/React projects
const isDev = import.meta.env && import.meta.env.MODE === 'development';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [demoUsers, setDemoUsers] = useState<{email: string, role: string}[]>([]);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDev) {
      fetch('http://localhost:5000/api/demo-users')
        .then(res => res.json())
        .then(data => setDemoUsers(Array.isArray(data) ? data : []))
        .catch(() => setDemoUsers([]));
    }
  }, []);

  useEffect(() => {
    document.getElementById('email')?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      } else {
        const userData = JSON.parse(localStorage.getItem('user-data') || '{}');
        if (userData && userData.department) {
          navigate(`/${userData.department.toLowerCase()}/dashboard`);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-2xl shadow-2xl border border-blue-100">
        {/* Logo & Welcome */}
        <div className="text-center">
          <img src={COMPANY_LOGO} alt="Company Logo" className="mx-auto mb-4 w-20 h-20 rounded-full shadow-lg border-2 border-blue-600 bg-white object-contain" />
          <h2 className="text-3xl font-extrabold text-blue-900 tracking-tight">{COMPANY_NAME}</h2>
          <p className="mt-1 text-sm text-blue-700 font-medium">{COMPANY_TAGLINE}</p>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <h3 className="text-sm font-semibold text-blue-900 mb-1">Welcome Back!</h3>
          <p className="text-xs text-blue-800">Sign in with your company email and password to access your dashboard.</p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="on">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 flex items-center gap-2">
              <span className="text-red-600"><Lock className="w-4 h-4" /></span>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  autoFocus
                  tabIndex={1}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10 pr-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  tabIndex={2}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={3}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              tabIndex={4}
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : null}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.<br />
            <span className="text-xs text-blue-700">Need help? <a href={`mailto:${SUPPORT_EMAIL}`} className="underline">Contact Support</a></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;