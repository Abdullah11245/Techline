import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface LogoGridProps {
  title?: string;
  subtitle?: string;
  logos: Array<{
    src: string;
    alt: string;
    href?: string;
  }>;
  type?: 'clients' | 'certifications';
  className?: string;
}

export const LogoGrid: React.FC<LogoGridProps> = ({
  title,
  subtitle,
  logos,
  type = 'clients',
  className = '',
}) => {
  const { activeLogo, setActiveLogo } = useLogoModal();
  const closeModal = () => setActiveLogo(null);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className={className}>
      {title && (
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h2>
      )}

      {subtitle && (
        <motion.p
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        className={`grid gap-8 ${
          type === 'certifications'
            ? 'grid-cols-2 md:grid-cols-2 lg:grid-cols-2'
            : 'grid-cols-2 md:grid-cols-2 lg:grid-cols-2'
        } items-center justify-center`}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {logos.map((logo, index) => (
          <motion.div key={index} variants={item}>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setActiveLogo(logo)}
              onKeyDown={(e) => e.key === 'Enter' && setActiveLogo(logo)}
             className="group flex cursor-pointer items-center justify-center p-6 h-32 md:h-52 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"            >
              <img src={logo.src} alt={logo.alt} className="max-h-20 md:max-h-32 w-auto object-contain grayscale group-hover:grayscale-0 transition duration-300 " />
            </div>
            <p className="text-center text-sm text-gray-600 mt-2 line-clamp-2">{logo.alt}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal for enlarged logo */}
      {activeLogo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={closeModal} />
          <div className="relative max-w-3xl w-full mx-4">
            <button
              onClick={closeModal}
              className="absolute -right-3 -top-3 z-50 inline-flex items-center justify-center rounded-full bg-white p-2 shadow-lg"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-gray-800" />
            </button>

            <div className="rounded-lg bg-white p-6 shadow-lg flex flex-col items-center">
              <img
                src={activeLogo.src}
                alt={activeLogo.alt}
                className="w-[900px] h-[600px] max-w-full max-h-[80vh] object-contain"
              />
              {activeLogo.href && (
                <a href={activeLogo.href} target="_blank" rel="noopener noreferrer" className="mt-4 text-sm text-primary-600 underline">
                  Open source
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Local state/hooks used by the component
function useLogoModal() {
  const [activeLogo, setActiveLogo] = useState<LogoGridProps['logos'][0] | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLogo(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return { activeLogo, setActiveLogo };
}
