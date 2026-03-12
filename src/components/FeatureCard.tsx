import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  items?: string[];
  onClick?: () => void;
  href?: string;
  badge?: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  items = [],
  onClick,
  href,
  badge,
  className = '',
}) => {
  const content = (
    <motion.div
      className={`relative h-full p-6 md:p-8 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {badge && (
        <div className="absolute -top-3 -right-3 bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {badge}
        </div>
      )}
      
      {Icon && (
        <motion.div
          className="mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Icon className="w-10 h-10 text-primary-500" strokeWidth={1.5} />
        </motion.div>
      )}

      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>

      {items.length > 0 && (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="text-gray-700 text-sm flex items-start gap-2">
              <span className="text-accent-500 font-bold mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {(onClick || href) && (
        <motion.div
          className="mt-6 pt-4 border-t border-gray-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-primary-500 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Learn more →
          </span>
        </motion.div>
      )}
    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return <button onClick={onClick} className="group text-left w-full">{content}</button>;
};
