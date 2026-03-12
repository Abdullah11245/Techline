import React from 'react';
import { motion } from 'framer-motion';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '@data/faqs';

interface FaqAccordionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
  filterByCategory?: string;
  className?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  faqs,
  title,
  subtitle,
  filterByCategory,
  className = '',
}) => {
  const filteredFaqs = filterByCategory ? faqs.filter((faq) => faq.category === filterByCategory) : faqs;

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
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <AccordionPrimitive.Root type="single" collapsible defaultValue="faq-1">
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <AccordionPrimitive.Item value={faq.id} className="border-b border-gray-200 last:border-b-0">
                <AccordionPrimitive.Trigger className="w-full py-4 px-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg group">
                  <h3 className="text-lg font-semibold text-left text-gray-900 group-hover:text-primary-600 transition-colors">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className="w-5 h-5 text-gray-500 group-hover:text-primary-600 transition-transform duration-300 flex-shrink-0"
                    strokeWidth={2}
                  />
                </AccordionPrimitive.Trigger>

                <AccordionPrimitive.Content className="overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            </motion.div>
          ))}
        </AccordionPrimitive.Root>
      </motion.div>
    </div>
  );
};
