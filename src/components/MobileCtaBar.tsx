import React from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { siteConfig } from '@data/site';

export const MobileCtaBar: React.FC = () => {
  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 hidden bg-white border-t border-gray-200 shadow-lg z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 p-3">
        <a
          href="tel:+353"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition-colors text-sm"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </a>
        <Link to="/contact" className="flex-1">
          <Button variant="primary" fullWidth size="md">
            Book Now
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
