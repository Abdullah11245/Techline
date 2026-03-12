import React from 'react';
import { motion } from 'framer-motion';
import { SLA } from '@data/slas';
import { Button } from './Button';
import { Check } from 'lucide-react';

interface SlaTableProps {
  slas: SLA[];
  className?: string;
}

export const SlaTable: React.FC<SlaTableProps> = ({ slas, className = '' }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={`grid md:grid-cols-3 gap-8 ${className}`}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      {slas.map((sla) => (
        <motion.div
          key={sla.id}
          variants={item}
          className={`relative rounded-xl p-8 border transition-all duration-300 ${
            sla.id === 'premium'
              ? 'border-accent-500 bg-gradient-to-br from-accent-50 to-white ring-2 ring-accent-200 scale-105'
              : 'border-gray-200 bg-white hover:shadow-lg'
          }`}
          whileHover={sla.id === 'premium' ? { scale: 1.07 } : { y: -8 }}
        >
          {sla.id === 'premium' && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent-500 text-white px-4 py-1 rounded-full text-xs font-bold">
              Most Popular
            </div>
          )}

          <h3 className="text-2xl font-bold text-gray-900 mb-2">{sla.name}</h3>
          <p className="text-gray-600 text-sm mb-6">{sla.description}</p>

          <div className="mb-6 pb-6 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Response Time</p>
            <p className="text-xl font-bold text-primary-500 mb-4">{sla.responseTime}</p>
            <p className="text-sm text-gray-600 mb-2">Availability</p>
            <p className="text-gray-900 font-semibold">{sla.availability}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase">Included</h4>
            <ul className="space-y-3">
              {sla.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                  <span className="text-sm text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6 pt-6 border-t border-gray-200">
            <p className="text-lg font-bold text-gray-900">{sla.price}</p>
          </div>

          <a href="/contact" className="block">
            <Button
              variant={sla.id === 'premium' ? 'accent' : 'primary'}
              fullWidth
            >
              Get Started
            </Button>
          </a>
        </motion.div>
      ))}
    </motion.div>
  );
};
