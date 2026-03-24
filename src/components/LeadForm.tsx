import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { submitContactForm } from '@utils/form';
import { services } from '@data/services';
import emailjs from "@emailjs/browser";
import.meta.env.VITE_EMAILJS_SERVICE_ID
import.meta.env.VITE_EMAILJS_TEMPLATE_ID
import.meta.env.VITE_EMAILJS_PUBLIC_KEY
interface LeadFormProps {
  productname?: any; // optional prop
}

export const LeadForm: React.FC<LeadFormProps> = ( { productname } ) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'it-support',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
 
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsLoading(true);

  try {
    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    if (response.status === 200) {
      setSubmitMessage("Message sent successfully!");

      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        service: 'it-support',
        message: '',
      });

      setTimeout(() => {
        navigate('/thank-you', { state: { name: formData.name } });
      }, 1000);
    }

  } catch (error) {
    console.error("EmailJS Error:", error);
    setSubmitMessage("An error occurred. Please try again.");
  } finally {
    setIsLoading(false);
  }
};

  return (
  <div className="relative max-w-2xl mx-auto py-24">
  {/* ===== Animated Background Squares ===== */}
  <div className="absolute inset-0 pointer-events-none z-0">
    {[...Array(35)].map((_, i) => {
      const sizes = [40, 50, 60, 70];
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
      const randomTop = Math.floor(Math.random() * 100);
      const randomLeft = Math.floor(Math.random() * 100);
      const duration = 25 + Math.random() * 20;

      return (
        <div
          key={i}
          className="absolute rounded-xl 
            bg-gradient-to-r 
            from-[#004b6a]/20 
            via-[#004b6a]/40 
            to-[#004b6a]/20 
            p-[1px] opacity-20"
          style={{
            width: `${randomSize}px`,
            height: `${randomSize}px`,
            top: `${randomTop}%`,
            left: `${randomLeft}%`,
            animation: `spin ${duration}s linear infinite`,
          }}
        >
          <div className="w-full h-full rounded-xl bg-transparent"></div>
        </div>
      );
    })}
  </div>

  {/* ===== The Form ===== */}
  <motion.form
    onSubmit={handleSubmit}
    className="relative z-10 bg-white/70 p-8 rounded-xl border border-gray-200 shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Name */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
            errors.name
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-primary-200'
          } focus:ring-2 outline-none`}
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

      {/* Company */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Company <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
            errors.company
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-primary-200'
          } focus:ring-2 outline-none`}
          placeholder="Your Company"
          aria-invalid={!!errors.company}
          aria-describedby={errors.company ? 'company-error' : undefined}
        />
        {errors.company && (
          <p id="company-error" className="text-red-600 text-sm mt-1">
            {errors.company}
          </p>
        )}
      </motion.div>

      {/* Email */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
            errors.email
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-primary-200'
          } focus:ring-2 outline-none`}
          placeholder="john@company.ie"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-red-600 text-sm mt-1">
            {errors.email}
          </p>
        )}
      </motion.div>

      {/* Phone */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
            errors.phone
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-primary-200'
          } focus:ring-2 outline-none`}
          placeholder="+353 (0)XX XXX XXXX"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="text-red-600 text-sm mt-1">
            {errors.phone}
          </p>
        )}
      </motion.div>
    </div>

    {/* Service Interest */}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6">
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        Service of Interest <span className="text-red-500">*</span>
      </label>
      <select
        name="service"
        value={formData.service}
        onChange={handleChange}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-colors"
      >
        {Object.values(services).map((service) => (
          <option key={service.id} value={service.id}>
            {service.title}
          </option>
        ))}
      </select>
    </motion.div>

    {/* Message */}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mb-6">
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        Message <span className="text-red-500">*</span>
      </label>
      <textarea
        name="message"
  value={formData.message || `I want to ask you about ${productname}`}
        onChange={handleChange}
        className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
          errors.message
            ? 'border-red-500 bg-red-50'
            : 'border-gray-300 bg-white focus:border-primary-500 focus:ring-primary-200'
        } focus:ring-2 outline-none resize-none`}
        placeholder="Tell us about your needs..."
        rows={5}
        aria-invalid={!!errors.message}
        aria-describedby={errors.message ? 'message-error' : undefined}
      />
      {errors.message && (
        <p id="message-error" className="text-red-600 text-sm mt-1">
          {errors.message}
        </p>
      )}
    </motion.div>

    {/* Submit Message */}
    {submitMessage && (
      <motion.div
        className={`mb-6 p-4 rounded-lg ${
          submitMessage.includes('error') || submitMessage.includes('An error')
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
      <Button type="submit" size="lg" fullWidth isLoading={isLoading}>
        {isLoading ? 'Submitting...' : 'Get in Touch'}
      </Button>
    </motion.div>

    <p className="text-xs text-gray-500 mt-4 text-center">
      We'll respond within 1 business hour during business hours.
    </p>
  </motion.form>

  {/* ===== Spin Keyframes ===== */}
  <style>
    {`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}
  </style>
</div>
  );
};
