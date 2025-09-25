import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  AlertCircle
} from 'lucide-react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name);
      navigate('/admin');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center animate-fade-in">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join Dicel ERP system
          </p>
                  </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-in-left">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-slide-in-right">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  <span className="text-sm text-red-600">{error}</span>
                </div>
                  </div>
                )}

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                        <input
                  id="name"
                  name="name"
                          type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                          onChange={handleChange}
                  className="form-input pl-10"
                  placeholder="Enter your full name"
                        />
                      </div>
                    </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                      <input
                        id="email"
                        name="email"
                  type="email"
                  autoComplete="email"
                  required
                        value={formData.email}
                        onChange={handleChange}
                  className="form-input pl-10"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

            {/* Department Field */}
            <div>
              <label htmlFor="department" className="form-label">
                Department
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="department"
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="form-input pl-10"
                >
                  <option value="">Select Department</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance</option>
                  <option value="compliance">Compliance</option>
                  <option value="inventory">Inventory</option>
                  <option value="client-management">Client Management</option>
                  <option value="sales-marketing">Sales & Marketing</option>
                  <option value="customer-experience">Customer Experience</option>
                  <option value="security-guard-management">Security Guard Management</option>
                  <option value="risk">Risk Department</option>
                  <option value="recovery">Recovery</option>
                </select>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                      <input
                        id="password"
                        name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                        value={formData.password}
                        onChange={handleChange}
                  className="form-input pl-10 pr-10"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                      </button>
                    </div>
                  </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                        <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                          onChange={handleChange}
                  className="form-input pl-10 pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
                    </div>
                  </div>

            {/* Submit Button */}
            <div>
                  <button
                    type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="spinner mr-2"></div>
                        Creating account...
                      </div>
                    ) : (
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Create Account
                  </div>
                )}
              </button>
            </div>
          </form>
          </div>

        {/* Footer */}
        <div className="text-center animate-fade-in">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
          <p className="mt-2 text-xs text-gray-500">
            © 2024 Dicel Security Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;