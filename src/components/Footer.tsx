import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig, footerLinks } from '@data/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="container-custom py-16 md:py-24">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-gray-800">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src="/Techline Logo (BnW).png" alt="Tech Line" className="h-10 mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed">
              IT Support & ISO 27001 Compliance for Irish Businesses. Your one-stop IT services partner.
            </p>
          </motion.div>

          {/* Link Columns */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-accent-500 flex-shrink-0" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-gray-300 hover:text-white transition-colors">
                {siteConfig.phone}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-accent-500 flex-shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="text-gray-300 hover:text-white transition-colors">
                {siteConfig.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-accent-500 flex-shrink-0" />
              <span className="text-gray-300">{siteConfig.serviceArea}</span>
            </div>
          </motion.div>

          <motion.div
            className="text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p>&copy; {new Date().getFullYear()} Tech Line. All rights reserved.</p>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
