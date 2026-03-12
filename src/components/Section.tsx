import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  noAnimation?: boolean;
  darkBg?: boolean;
}

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ children, className = '', id, noAnimation = false, darkBg = false }, ref) => {
    return (
      <motion.section
        ref={ref}
        id={id}
        className={`section-padding ${darkBg ? 'bg-gray-50' : 'bg-white'} ${className}`}
        initial={noAnimation ? undefined : { opacity: 0, y: 20 }}
        whileInView={noAnimation ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container-custom">{children}</div>
      </motion.section>
    );
  }
);

Section.displayName = 'Section';
