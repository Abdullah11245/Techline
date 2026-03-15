import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { updateMetaTags } from '@utils/seo';
import { Section } from '@components/Section';
import { Button } from '@components/Button';
import { CtaBand } from '@components/CtaBand';
import { Link } from 'react-router-dom';
import { Typewriter } from '@/components/TypeWriter';

export const About: React.FC = () => {
  useEffect(() => {
    updateMetaTags({
      title: 'About Tech Line | Ireland IT Services',
      description: 'Learn about Tech Line - your IT support partner for Irish businesses. ISO 27001 expertise, fast response times, local presence.',
      url: 'https://tline.ie/about',
    });
  }, []);

  return (
    <>
   <Section className="relative overflow-hidden pt-20 md:pt-32 pb-20" noAnimation>

  {/* Dark Background */}
  {/* <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div> */}

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/70"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

    {/* Images Section */}
    <div className="grid sm:grid-cols-2 gap-6">
      
      <div className="pt-20 flex justify-end sm:justify-center">
        <img
          src="/ai-nuclear.jpg"
          alt="Tech team"
          className="rounded-xl object-cover shadow-2xl"
        />
      </div>

      <img
        src="/cybersecurity.jpg"
        alt="Tech work"
        className="rounded-xl object-cover shadow-2xl"
      />

    </div>

    {/* Content Section */}
    <motion.div
      className="flex flex-col gap-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >

      {/* Typewriter Heading */}
       <motion.h1
                className="mt-2 md:mt-8 max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
               <Typewriter
        text="About Tech Line"
        speed={100}
    
        className="text-2xl md:text-5xl font-bold text-white"
      />
              </motion.h1>
      

      <p className="text-white/70 text-lg max-w-xl">
        At Tech Line, we provide reliable IT solutions across Ireland.
        Our mission is to help businesses grow through secure systems,
        modern infrastructure, and expert technical support.
      </p>

      {/* Glass Stats Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 flex gap-10 w-fit shadow-[0_20px_60px_rgba(0,0,0,0.4)]">

        <div>
          <h3 className="text-4xl font-bold text-white">15+</h3>
          <p className="text-white/70 text-sm">Years Experience</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-white">100+</h3>
          <p className="text-white/70 text-sm">Happy Clients</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-white">80+</h3>
          <p className="text-white/70 text-sm">Projects Completed</p>
        </div>

      </div>

    </motion.div>

  </div>
</Section>

<Section className="py-24 relative overflow-x-hidden">

  {/* ===== Animated Background Squares ===== */}
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
  <div className="max-w-4xl mx-auto space-y-16 relative z-10">

{/* Who We Are */}
<motion.div
  className="p-8 rounded-2xl text-center bg-gray-50"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
>
  <h2 className="inline-block px-6 py-2 mb-4 rounded-full text-white font-semibold text-sm bg-gradient-to-r from-primary-500 to-primary-700 tracking-wide uppercase shadow-md">
    Who We Are
  </h2>

  <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
    Tech Line is a leading IT services provider based in Ireland, specializing in IT support, cybersecurity, and cloud solutions for small to medium-sized businesses. We've been helping Irish organizations transform their IT infrastructure for years.
  </p>
</motion.div>

{/* Our Mission */}
<div className="px-2 md:px-0 mt-12 text-center">
  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight inline-block">
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-primary-700">
      Our Mission
    </span>
    {/* Underline with gap */}
    <div className="w-20 h-1 bg-primary-500 rounded-full mx-auto mt-3"></div>
  </h2>

  <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mt-6">
    To empower Irish businesses with world-class IT services that are reliable, secure, and affordable. We believe IT should enable business growth, not hinder it.
  </p>
</div>
    {/* Why Choose */}
   <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2 }}
  className="mx-auto  px-4 py-10 "
>
  <p className="text-center text-base font-semibold leading-7 text-primary-500">
    Why Choose Us
  </p>
  <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl mb-16">
    Why Choose Tech Line?
  </h2>

  <ul className="grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-3">
    {[
      {
        icon: 'https://www.svgrepo.com/show/530438/ddos-protection.svg',
        title: 'Local Expertise',
        desc: 'Based in Ireland with deep understanding of local business needs and compliance requirements.',
      },
      {
        icon: 'https://www.svgrepo.com/show/530442/port-detection.svg',
        title: 'ISO 27001 Specialists',
        desc: 'Expert guidance on information security and compliance certification.',
      },
      {
        icon: 'https://www.svgrepo.com/show/530444/availability.svg',
        title: 'Fast Response Times',
        desc: 'SLA-backed support with response times starting from 1 hour for premium clients.',
      },
      {
        icon: 'https://www.svgrepo.com/show/530440/machine-vision.svg',
        title: 'Proactive Monitoring',
        desc: 'Continuous oversight of your systems to prevent issues before they occur.',
      },
      {
        icon: 'https://www.svgrepo.com/show/530450/page-analysis.svg',
        title: 'Modern Tooling',
        desc: 'Latest RMM, EDR, SOC, and automation tools for maximum efficiency.',
      },
      {
        icon: 'https://www.svgrepo.com/show/530453/mail-reception.svg',
        title: 'Customer Success',
        desc: 'Your success is our success. We measure ourselves by your satisfaction.',
      },
    ].map((item, idx) => (
      <motion.li
        key={idx}
        className="rounded-xl bg-white/10 px-6 py-8 shadow-lg flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 + idx * 0.05 }}
        viewport={{ once: true }}
      >
        <img src={item.icon} alt="" className="mx-auto h-10 w-10 mb-3" />
        <h3 className="font-display font-medium text-lg mb-2">{item.title}</h3>
        <p className="text-sm leading-6 text-secondary-500">{item.desc}</p>
      </motion.li>
    ))}
  </ul>
</motion.div>

  </div>
</Section>

      {/* <Section className="py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Commitment</h2>
          <div className="space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">
              We're committed to building long-term partnerships with our clients. Every organization is unique, which is why we customize our services to your specific needs.
            </p>
            <p className="text-lg leading-relaxed">
              Whether you need ongoing helpdesk support, ISO 27001 compliance guidance, or advanced security monitoring, Tech Line has the expertise to help you succeed.
            </p>
          </div>
        </div>
      </Section> */}

      <CtaBand
        headline="Ready to Partner with Tech Line?"
        illustration='6180780.jpg'
        subheadline="Let's discuss your IT needs and how we can help your business grow."
        primaryCTA={{ label: 'Get in Touch', href: '/contact' }}
        secondaryCTA={{ label: 'Call Us', href: 'tel:+353' }}
      />
    </>
  );
};
