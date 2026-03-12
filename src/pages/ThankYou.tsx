import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { updateMetaTags } from '@utils/seo';
import { Section } from '@components/Section';
import { Button } from '@components/Button';
import { CheckCircle } from 'lucide-react';

export const ThankYou: React.FC = () => {
  const location = useLocation();
  const name = (location.state as any)?.name || 'there';

  useEffect(() => {
    updateMetaTags({
      title: 'Thank You | Tech Line',
      description: 'Your submission has been received. We will contact you shortly.',
      url: 'https://tline.ie/thank-you',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Section className="pt-20 md:pt-32 pb-24 min-h-[80vh] flex items-center" noAnimation>
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <CheckCircle className="w-24 h-24 text-accent-500 mx-auto" strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Thank You, {name}!
        </motion.h1>

        <motion.p
          className="text-xl text-gray-700 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Your assessment request has been received successfully.
        </motion.p>

        <motion.div
          className="bg-accent-50 border border-accent-200 rounded-lg p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">What's Next?</h2>
          <ol className="text-left space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="font-bold text-accent-600 flex-shrink-0">1.</span>
              <span>We'll review your submission right away</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-accent-600 flex-shrink-0">2.</span>
              <span>Our team will contact you within 1 business hour</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-accent-600 flex-shrink-0">3.</span>
              <span>We'll schedule your 15-minute assessment call</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-accent-600 flex-shrink-0">4.</span>
              <span>Get customized recommendations for your business</span>
            </li>
          </ol>
        </motion.div>

        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          In the meantime, feel free to explore more about our services or give us a call directly.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link to="/">
            <Button size="lg">Back to Home</Button>
          </Link>
          <a href="tel:+353">
            <Button variant="secondary" size="lg">Call Now</Button>
          </a>
        </motion.div>

        <motion.p
          className="text-sm text-gray-600 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Need immediate assistance? Call us at <strong>+353 (0)XX XXX XXXX</strong>
        </motion.p>
      </div>
    </Section>
  );
};
