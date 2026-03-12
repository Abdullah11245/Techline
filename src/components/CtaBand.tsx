import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

interface CtaBandProps {
  headline: string;
  subheadline?: string;
  primaryCTA?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryCTA?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  illustration?: string; // SVG path
  className?: string;
}

export const CtaBand: React.FC<CtaBandProps> = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  illustration = '/images/person.svg',
  className = '',
}) => {
  return (
    <section
      className={`py-16 md:py-24  text-black ${className}`}
    >
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {headline}
            </h2>

            {subheadline && (
              <p className="text-lg md:text-xl text-black mb-8 max-w-xl">
                {subheadline}
              </p>
            )}

            <div className="flex gap-4 flex-wrap">
  {primaryCTA && primaryCTA.href ? (
    <a href={primaryCTA.href}>
      <Button
        size="lg"
        className="bg-[#40ae49] text-white hover:bg-[#37963f] transition-colors"
      >
        {primaryCTA.label}
      </Button>
    </a>
  ) : primaryCTA ? (
    <Button
      size="lg"
      onClick={primaryCTA.onClick}
      className="bg-[#40ae49] text-white hover:bg-[#37963f] transition-colors"
    >
      {primaryCTA.label}
    </Button>
  ) : null}

  {secondaryCTA && secondaryCTA.href ? (
    <a href={secondaryCTA.href}>
      <Button
        size="lg"
        className="bg-[#004b6a] text-white hover:bg-[#003e57] transition-colors"
      >
        {secondaryCTA.label}
      </Button>
    </a>
  ) : secondaryCTA ? (
    <Button
      size="lg"
      onClick={secondaryCTA.onClick}
      className="bg-[#004b6a] text-white hover:bg-[#003e57] transition-colors"
    >
      {secondaryCTA.label}
    </Button>
  ) : null}
</div>
          </motion.div>

          {/* RIGHT SVG */}
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={illustration}
              alt="IT professional illustration"
              className="w-full max-w-md"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};