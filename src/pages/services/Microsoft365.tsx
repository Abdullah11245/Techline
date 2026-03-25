import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { updateMetaTags } from '@utils/seo';
import { Section } from '@components/Section';
import { Button } from '@components/Button';
import { CtaBand } from '@components/CtaBand';
import { services } from '@data/services';
import { ChevronRight } from 'lucide-react';
import PixelCanvasBg from '@/components/pixels_animations';
export const Microsoft365: React.FC = () => {
  const service = services['microsoft-365'];
  
  useEffect(() => {
    updateMetaTags({
      title: `${service.title} | Tech Line - Ireland`,
      description: service.description,
      url: 'https://tline.ie/services/microsoft-365-collaboration',
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

  {/* Content */}
  <div className="relative z-10 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT */}
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Back Link */}
      <div className="mb-6">
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

      {/* CTA */}
      <div className="flex flex-wrap gap-4">
        <Link to="/contact">
          <Button size="lg" className="px-8 min-w-[180px]">
            Get Microsoft 365
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
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="relative"
    >
      {/* Glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-indigo-500/10 to-purple-500/20 blur-2xl opacity-40 rounded-3xl"></div>

      {/* Glass Card */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-2 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">

        {/* Title */}
        <h2 className="text-lg font-semibold text-center text-white mb-6">
          What's Included
        </h2>

        {/* Items */}
        <div className="grid md:grid-cols-2 gap-5">
          {service.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group relative bg-white/5 border border-white/10 p-4 rounded-xl transition"
            >
              <h3 className="text-sm font-semibold text-white group-hover:text-white">
                {item}
              </h3>

              {/* Hover Glow */}
              {/* <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400/0 via-pink-400/10 to-indigo-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div> */}
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-8 p-5 bg-white/10 border border-white/20 rounded-xl text-sm text-white/80">
          Our services are optimized for reliability and ISO-aligned standards.
        </div>
      </div>
    </motion.div>

  </div>
</Section>

      {/* <Section darkBg className="py-24">
        <h2 className="text-4xl font-bold mb-12">Cloud Productivity Solutions</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {service.items.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-500 text-white flex items-center justify-center font-bold text-sm">✓</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item}</h3>
                  <p className="text-gray-600 text-sm">
                    {item.includes('Cloud Solution') && 'Email, collaboration, storage, and productivity apps in the cloud.'}
                    {item.includes('Cloud Data') && 'Secure cloud storage integrated with Microsoft 365.'}
                    {item.includes('Email Protection') && 'Advanced email security, spam filtering, and threat detection.'}
                    {item.includes('Teams') && 'Unified communication platform for chat, meetings, and collaboration.'}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section> */}

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
        Why Choose Cloud Collaboration?
      </h2>

      <p className="text-gray-700 mb-6">
        Microsoft 365 enables modern work: anywhere, anytime, on any device. Empower your team with:
      </p>
    </motion.div>

    {/* Right Side Features */}
    <div className="grid gap-6">
      {[
        'Real-time collaboration and document co-authoring',
        'Secure cloud storage and file sharing',
        'Integrated communication (email, chat, calls)',
        'Enterprise-grade security and compliance',
        'Always up-to-date applications',
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
        headline="Empower Your Team with Microsoft 365"
        subheadline="Transform collaboration and productivity with cloud-based tools tailored to your organization."
         illustration="/2.png"
        primaryCTA={{ label: 'Talk to Us', href: '/contact' }}
      />
    </>
  );
};
