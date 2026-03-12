import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { updateMetaTags } from '@utils/seo';
import { Section } from '@components/Section';
import { Button } from '@components/Button';
import { CtaBand } from '@components/CtaBand';
import { services } from '@data/services';
import { ChevronRight } from 'lucide-react';

export const Telecom: React.FC = () => {
  const service = services['telecom'];

  useEffect(() => {
    updateMetaTags({
      title: `${service.title} | Tech Line - Ireland`,
      description: service.description,
      url: 'https://tline.ie/services/telecom-cloud-telephony',
    });
  }, []);

  return (
    <>
   <Section
  className="relative overflow-hidden pt-28 md:pt-36 pb-24"
  noAnimation
>
  {/* Background Video */}
  <div className="absolute inset-0">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="h-full w-full object-cover"
    >
      <source src="/7706758-uhd_4096_2160_25fps.mp4" type="video/mp4" />
    </video>

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/70" />
  </div>

  <div className="relative z-10 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT */}
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Back Link */}
      <div className="flex items-center gap-2 mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Home
        </Link>
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
        {service.title}
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl">
        {service.description}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4">
        <Link to="/contact">
          <Button size="lg" className="px-8 min-w-[180px]">
            Get Cloud Telephony
          </Button>
        </Link>

        <a href="tel:+353">
          <Button
            size="lg"
            className="px-8 min-w-[180px] bg-white/10 text-white border border-white/20 hover:bg-white/20"
          >
            Call Now
          </Button>
        </a>
      </div>
    </motion.div>

    {/* RIGHT CARD */}
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="relative"
    >
      {/* Glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-indigo-500/10 to-purple-500/20 blur-2xl opacity-40 rounded-3xl"></div>

      {/* Glass Card */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-2 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">

        <h3 className="text-lg text-center font-semibold text-white mb-6">
          Cloud Telephony Highlights
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Call Reliability</span>
            <span className="font-semibold text-green-400">99.99% Uptime</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-white/70">Number Porting</span>
            <span className="font-semibold text-blue-400">Seamless</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-white/70">Support</span>
            <span className="font-semibold text-red-400">24/7 Assistance</span>
          </div>
        </div>

        <div className="mt-8 p-5 bg-white/10 border border-white/20 rounded-xl text-sm text-white/80">
          Your telephony infrastructure is fully cloud-enabled, secure, and always monitored for performance.
        </div>
      </div>
    </motion.div>

  </div>
</Section>

   <div className="bg-white dark:bg-gray-900 py-20">
  <div className="max-w-6xl mx-auto px-6">

    {/* Header */}
    <div className="max-w-2xl mb-16">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
        Modern Communication Solutions
      </h2>
      <p className="mt-4 text-gray-500 dark:text-gray-400">
        Simple, scalable tools designed for seamless communication and collaboration.
      </p>
    </div>

    {/* Services Grid */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {service.items.map((item, idx) => (
        <div key={idx} className="flex items-start gap-4">
          
          {/* Green Circle */}
          <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>

          {/* Text */}
          <p className="text-lg text-gray-800 dark:text-gray-200">
            {item}
          </p>

        </div>
      ))}
    </div>

  </div>
</div>

<Section className="py-24 relative overflow-hidden">

  {/* ===== Random Animated Background Squares ===== */}
  <div className="absolute inset-0 pointer-events-none z-0">
    {[...Array(35)].map((_, i) => {
      const sizes = [40, 50, 60, 70];
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
      const randomTop = Math.floor(Math.random() * 100);
      const randomLeft = Math.floor(Math.random() * 100);
      const duration = 25 + Math.random() * 20;

      return (
        <div
          key={i}
          className="absolute rounded-xl 
            bg-gradient-to-r 
            from-[#004b6a]/20 
            via-[#004b6a]/40 
            to-[#004b6a]/20 
            p-[1px] opacity-20"
          style={{
            width: `${randomSize}px`,
            height: `${randomSize}px`,
            top: `${randomTop}%`,
            left: `${randomLeft}%`,
            animation: `spin ${duration}s linear infinite`,
          }}
        >
          <div className="w-full h-full rounded-xl bg-transparent"></div>
        </div>
      );
    })}
  </div>

  {/* ===== Main Content ===== */}
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">

    {/* Left Side */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold mb-6 text-gray-900">
        Cloud Telephony Benefits
      </h2>

      <p className="text-gray-700 mb-6">
        Move beyond traditional phone systems. Cloud telephony offers flexibility, scalability, and cost efficiency:
      </p>
    </motion.div>

    {/* Right Side */}
    <div className="grid gap-6">
      {[
        'Work from anywhere with mobile and softphone apps',
        'Scale up/down as your business grows',
        'Reduce costs compared to on-premise systems',
        'Advanced call routing and management',
        'Integrated with Microsoft Teams and other platforms',
      ].map((feature, idx) => (
        <motion.div
          key={idx}
          className="flex gap-4 items-start p-5 
            bg-[#004b6a]/10 backdrop-blur-2xl 
            border border-white/20 
            rounded-2xl 
            hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] 
            transition-all"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          viewport={{ once: true }}
        >
          <span className="text-gray-800 font-medium">
            {feature}
          </span>
        </motion.div>
      ))}
    </div>

  </div>

</Section>

      <CtaBand
        headline="Upgrade to Cloud Telephony"
        subheadline="Modern communication systems that scale with your business and keep you connected anywhere."
        illustration="/5092143.jpg"
        primaryCTA={{ label: 'Schedule Demo', href: '/contact' }}
      />
    </>
  );
};
