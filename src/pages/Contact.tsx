import React, { useEffect,useState } from 'react';
import { updateMetaTags } from '@utils/seo';
import { Section } from '@components/Section';
import { LeadForm } from '@components/LeadForm';
import { motion } from 'framer-motion';
import { Typewriter } from '@/components/TypeWriter';
import { useLocation } from 'react-router-dom';
export const Contact: React.FC = () => {
   const location = useLocation();
   const params = new URLSearchParams(location.search);
    const product = params.get('product');


  useEffect(() => {
    updateMetaTags({
      title: 'Contact Tech Line | Get IT Support Ireland',
      description: 'Contact Tech Line for IT support, cybersecurity, and cloud solutions. Book a 15-minute assessment or call us directly.',
      url: 'https://tline.ie/contact',
    });

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
   <Section className="relative overflow-hidden pt-20 md:pt-32 pb-20" noAnimation>

  {/* ===== Mobile Background Image ===== */}
  <div className="absolute inset-0 lg:hidden overflow-hidden">
    <img
      src="/ai-nuclear.jpg" // same as About page
      alt="Tech background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* ===== Dark Overlay ===== */}
  <div className="absolute inset-0 bg-black/70"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

    {/* ===== Images (Desktop Only) ===== */}
    <div className="hidden lg:grid sm:grid-cols-2 gap-6">
      
      <div className="pt-20 flex justify-end sm:justify-center">
        <img
          src="/contact.jpg"
          alt="Contact team"
          className="rounded-xl object-cover shadow-2xl"
        />
      </div>

      <img
        src="/contactavatar.jpg"
        alt="Team discussion"
        className="rounded-xl object-cover shadow-2xl"
      />

    </div>

    {/* ===== Content Section ===== */}
    <motion.div
      className="flex flex-col gap-2 md:gap-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Animated Heading */}
      <motion.h1
        className="mt-2 md:mt-8 max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <Typewriter
          text="Get in Touch"
          speed={100}
          className="text-3xl md:text-5xl font-bold text-white"
        />
      </motion.h1>

      <p className="text-white/70 text-lg max-w-xl">
        Have questions? Want to schedule an assessment? We're here to help. Fill out the form below and we'll get back to you within 1 business hour.
      </p>
    </motion.div>

  </div>
</Section>

      <Section darkBg className="py-24 overflow-x-hidden">
        <LeadForm productname={product ?? undefined} />
      </Section>

      <Section className="py-24">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Other Ways to Reach Us
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-8 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
              <a href="tel:+353" className="text-primary-600 font-semibold hover:text-primary-700">
                +353 (0)XX XXX XXXX
              </a>
              <p className="text-sm text-gray-600 mt-2">Available 24/7 for premium clients</p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <a href="mailto:info@tline.ie" className="text-primary-600 font-semibold hover:text-primary-700">
                info@tline.ie
              </a>
              <p className="text-sm text-gray-600 mt-2">Response within 2 hours</p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-bold text-gray-900 mb-2">Service Area</h3>
              <p className="text-gray-700 font-semibold">Ireland</p>
              <p className="text-sm text-gray-600 mt-2">Supporting businesses nationwide</p>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
};
