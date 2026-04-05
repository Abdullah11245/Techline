import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { buildUrl } from '@/utils/api';

export const AdminRegister: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    registerSecret: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.registerSecret) newErrors.registerSecret = 'Register secret is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitMessage('');

    try {
      const response = await fetch(buildUrl('/api/auth/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          registerSecret: formData.registerSecret,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/admin/login');
        }, 2000);
      } else {
        setSubmitMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-xl shadow-xl p-8">
          <motion.h1
            className="text-3xl font-bold text-center mb-2 text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Create Account
          </motion.h1>
          <p className="text-center text-gray-600 mb-8">
            Join Tech Line Admin Portal
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                  errors.name
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                } outline-none`}
                placeholder="John Doe"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-600 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                  errors.email
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                } outline-none`}
                placeholder="admin@tline.ie"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-600 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                  errors.password
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                } outline-none`}
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && (
                <p id="password-error" className="text-red-600 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                  errors.confirmPassword
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                } outline-none`}
                placeholder="••••••••"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              />
              {errors.confirmPassword && (
                <p id="confirmPassword-error" className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </motion.div>

            {/* Register Secret */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <label htmlFor="registerSecret" className="block text-sm font-semibold text-gray-900 mb-2">
                Register Secret <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="registerSecret"
                name="registerSecret"
                value={formData.registerSecret}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                  errors.registerSecret
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                } outline-none`}
                placeholder="Enter register secret"
                aria-invalid={!!errors.registerSecret}
                aria-describedby={errors.registerSecret ? 'registerSecret-error' : undefined}
              />
              {errors.registerSecret && (
                <p id="registerSecret-error" className="text-red-600 text-sm mt-1">
                  {errors.registerSecret}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">Ask your administrator for the register secret</p>
            </motion.div>

            {/* Submit Message */}
            {submitMessage && (
              <motion.div
                className={`p-4 rounded-lg ${
                  submitMessage.includes('error') || submitMessage.includes('failed')
                    ? 'bg-red-50 text-red-700'
                    : 'bg-green-50 text-green-700'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {submitMessage}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </motion.button>
          </form>

          {/* Login Link */}
          <motion.p
            className="text-center mt-6 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            Already have an account?{' '}
            <Link to="/admin/login" className="text-primary-600 font-semibold hover:text-primary-700">
              Sign In
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
