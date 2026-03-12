import React, { useEffect } from 'react';
import { updateMetaTags } from '@utils/seo';
import { Section } from '@components/Section';
import { motion } from 'framer-motion';

export const Privacy: React.FC = () => {
  useEffect(() => {
    updateMetaTags({
      title: 'Privacy Policy | Tech Line',
      description: 'Tech Line privacy policy - how we collect, use, and protect your information.',
      url: 'https://tline.ie/privacy',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <Section className="pt-20 md:pt-32 pb-16 gradient-primary" noAnimation>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-700 text-lg">
            Last updated: March 2, 2026
          </p>
        </motion.div>
      </Section>

      <Section darkBg className="py-24">
        <div className="max-w-3xl mx-auto prose prose-sm prose-gray space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Tech Line ("we," "us," or "our") operates the tline.ie website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information Collection and Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Data</h3>
            <p className="text-gray-700 leading-relaxed">
              When you submit a contact form or assessment request, we may collect the following information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name</li>
              <li>Service interests</li>
              <li>Message content</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Use of Data</h2>
            <p className="text-gray-700 leading-relaxed">
              Tech Line uses the collected data for various purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical and security issues</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Security of Data</h2>
            <p className="text-gray-700 leading-relaxed">
              The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="list-none text-gray-700 space-y-1 ml-4 mt-2">
              <li>Email: privacy@tline.ie</li>
              <li>Phone: +353 (0)XX XXX XXXX</li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-accent-50 border border-accent-200 rounded-lg p-6 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-700 text-sm">
              This Privacy Policy is provided as a template. Please customize it to match your actual data collection and usage practices, and ensure compliance with GDPR and Irish data protection regulations.
            </p>
          </motion.div>
        </div>
      </Section>
    </>
  );
};
