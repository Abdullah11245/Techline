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
      className={`group relative h-full p-7 rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl hover:border-[#004b6a]/20 ${className}`}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >

      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#40ae49] rounded-t-2xl opacity-0 group-hover:opacity-100 transition"></div>

      {/* Badge */}
      {badge && (
        <span className="absolute top-5 right-5 text-xs font-semibold bg-[#004b6a]/10 text-[#004b6a] px-3 py-1 rounded-full">
          {badge}
        </span>
      )}

      {/* Icon */}
      {Icon && (
        <div className="mb-5 w-12 h-12 rounded-lg bg-[#004b6a]/10 flex items-center justify-center group-hover:bg-[#004b6a]/20 transition">
          <Icon className="w-6 h-6 text-[#004b6a]" strokeWidth={2} />
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {description}
      </p>

      {/* List */}
      {items.length > 0 && (
        <ul className="space-y-2 mb-5">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-[#40ae49] mt-1">•</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      {(onClick || href) && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <span className="text-[#004b6a] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
            Learn more →
          </span>
        </div>
      )}

    </motion.div>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return (
    <button onClick={onClick} className="group text-left w-full">
      {content}
    </button>
  );
};