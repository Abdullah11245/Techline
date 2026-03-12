import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

type Accent = 'blue' | 'green';

export const ServiceCardStack: React.FC<{
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
  accent?: Accent;
}> = ({ icon: Icon, title, description, items, accent = 'blue' }) => {

  const textAccent =
    accent === 'green' ? 'text-accent-700' : 'text-primary-700';

  const backTop =
    accent === 'green' ? 'bg-accent-600' : 'bg-primary-600';

  const backBottom =
    accent === 'green' ? 'bg-primary-600' : 'bg-accent-600';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="relative group h-full"
    >
      {/* STACKED CARDS */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">

        {/* Back Card 1 */}
        <div
          className={`
            absolute inset-0 rounded-2xl ${backTop}
            transform translate-x-2 rotate-1
            sm:translate-x-3 sm:rotate-2
            transition-all duration-500 ease-out
            group-hover:translate-x-3 sm:group-hover:translate-x-4
            group-hover:rotate-4 sm:group-hover:rotate-6
          `}
        />

        {/* Back Card 2 */}
        <div
          className={`
            absolute inset-0 rounded-2xl ${backBottom}
            transform translate-x-1 rotate-0
            sm:translate-x-2 sm:rotate-1
            transition-all duration-500 ease-out
            group-hover:translate-x-2 sm:group-hover:translate-x-3
            group-hover:rotate-2 sm:group-hover:rotate-4
          `}
        />
      </div>

      {/* MAIN CARD */}
      <div className="relative z-10 h-full rounded-2xl bg-white border border-gray-100 shadow-[0_18px_40px_rgba(0,0,0,0.08)] p-6 sm:p-8 flex flex-col">

        {/* Icon */}
        <div
          className={`mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border ${textAccent}`}
        >
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 sm:mt-3 text-gray-600 leading-relaxed text-sm sm:text-base flex-grow">
          {description}
        </p>

        {/* Items */}
        <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-sm text-gray-600">
          {items.map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span className={`mt-1.5 h-2 w-2 rounded-full ${backTop}`} />
              <span>{t}</span>
            </li>
          ))}
        </ul>

        {/* Read More */}
        <div className="mt-5 sm:mt-6 flex items-center gap-2 font-semibold text-xs sm:text-sm">
          <span className={textAccent}>READ MORE</span>
          <ArrowRight className={`h-4 w-4 ${textAccent}`} />
        </div>

      </div>
    </motion.div>
  );
};