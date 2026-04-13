import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { updateMetaTags } from '@utils/seo';
import { Section } from '@components/Section';
import { Button } from '@components/Button';
import { CtaBand } from '@components/CtaBand';
import { FaqAccordion } from '@components/FaqAccordion';
import { faqs } from '@data/faqs';
import { services } from '@data/services';
import { ChevronRight, Shield, Lock, AlertCircle, Zap } from 'lucide-react';

export const CyberSecurity: React.FC = () => {
  const service = services['cyber-security'];

  useEffect(() => {
    updateMetaTags({
      title: `${service.title} & ISO 27001 | Tech Line - Ireland`,
      description: service.description,
      url: 'https://tline.ie/services/cyber-security',
    });
    localStorage.setItem('lastVisitedService', service.title);

  }, []);

  const categories = [
    {
      title: 'Threat Protection',
      icon: Shield,
      items: [
        'Firewalls (next-generation)',
        'Antivirus Software',
        'Email Scanning Software',
        'Proactive Threat Protection',
      ],
    },
    {
      title: 'Access & Identity',
      icon: Lock,
      items: [
        'Multi-Factor Authentication (MFA)',
        'Encryption Solutions',
        'Identity management',
      ],
    },
    {
      title: 'Monitoring & Response',
      icon: AlertCircle,
      items: [
        'Endpoint Monitoring',
        'Integrated SOC/EDR Services',
        'Incident Response & Recovery',
        'Automated Maintenance & Updates',
      ],
    },
    {
      title: 'Compliance & Audit',
      icon: Zap,
      items: [
        'ISO 27001 GAP Analysis',
        'Compliance Support',
        'Regular Security Audits',
        'Custom Security Training',
        'Phishing Simulation Testing',
      ],
    },
  ];

  return (
    <>
      {/* Hero */}
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

    {/* Dark overlay */}
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
      {/* Top Row */}
      <div className="flex flex-wrap items-center gap-3 mb-6">

        <Link
          to="/"
          className="inline-flex text-sm md:text-base items-center gap-2 text-white/70 hover:text-white transition"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to Home
        </Link>

        <div className="inline-flex items-center gap-2 px-4 py-2 
                        bg-white/10 text-white rounded-full 
                        text-xs md:text-sm font-semibold backdrop-blur border border-white/20">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          ISO 27001 Certified Experts
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-white leading-tight mb-6">
        Enterprise-Grade{" "}
        <span className="text-accent-500">Cyber Security</span>
        <br />
        & ISO 27001 Compliance
      </h1>

      {/* Description */}
      <p className="text-base md:text-xl text-white/80 mb-10 max-w-xl">
        Protect your business with advanced threat detection, continuous monitoring,
        and complete ISO 27001 compliance support — built for modern organisations.
      </p>

      {/* CTA */}
     <div className="flex gap-4">
      <Link to="/contact" className="w-1/2 sm:w-auto">
        <Button size="lg" className="w-full text-xs md:text-lg  px-2  md:px-8 shadow-lg">
          Book Assessment
        </Button>
      </Link>
    
      <a href="tel:+353" className="w-1/2 sm:w-auto">
        <Button
          variant="secondary"
          size="lg"
          className="w-full px-3 md:px-8 bg-white/10 text-xs md:text-lg text-white border border-white/20 hover:bg-white/20"
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
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-2 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">

        {/* Title */}
        <h3 className="text-lg text-center font-semibold text-white mb-6">
          Security Overview
        </h3>

        {/* Items */}
        <div className="grid gap-4">
          {[
            "ISO 27001 GAP Analysis",
            "Implementation roadmap",
            "Policy & documentation support",
            "Technical controls setup"
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
            >
              <p className="text-sm font-medium text-white/90">
                {item}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mb-4 mt-4 md:mt-8 p-2 md:p-4 rounded-xl bg-white/10 border border-white/20 text-xs md:text-sm text-white/80">
          Your infrastructure is continuously monitored and aligned with ISO standards.
        </div>
      </div>
    </motion.div>

  </div>
</Section>

      {/* ISO 27001 Focus */}
   <Section darkBg className="py-24 relative overflow-hidden">

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
  <motion.div className="max-w-4xl mx-auto relative z-10">
    <motion.div
      className="bg-accent-50/40 border border-accent-200 rounded-xl p-8 md:p-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className=" text-xl md:text-3xl font-bold text-accent-700 mb-6 flex items-center gap-3">
        <Shield className="w-8 h-8" />
        ISO 27001 Compliance Made Simple
      </h2>

      <p className="text-gray-700  mb-6 leading-relaxed">
        Achieving ISO 27001 certification is complex, but it doesn't have to be overwhelming. Tech Line specializes in helping Irish organizations achieve and maintain ISO 27001 compliance.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2">What We Provide:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>ISO 27001 GAP Analysis</li>
            <li>Implementation roadmap</li>
            <li>Policy & documentation support</li>
            <li>Technical controls setup</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Your Benefits:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>Competitive advantage</li>
            <li>Customer trust & compliance</li>
            <li>Risk mitigation</li>
            <li>Expert guidance throughout</li>
          </ul>
        </div>
      </div>

      <Link to="/contact">
        <Button size="lg" className="w-full md:w-auto text-sm md:text-lg">
          Start ISO 27001 Journey
        </Button>
      </Link>
    </motion.div>
  </motion.div>

  {/* ===== Spin Keyframes ===== */}
  <style>
    {`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}
  </style>
</Section>

      {/* Service Categories */}
<Section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">

    {/* Header */}
    <div className="text-center max-w-3xl mx-auto">
      <span className="inline-block mb-6 px-6 py-2 bg-primary-600 text-white text-xs font-semibold tracking-widest uppercase rounded-full">
        Why Choose Us?
      </span>

      <h2 className="font-heading text-3xl sm:text-5xl font-bold text-gray-900 leading-tight">
          Our Security Services
      </h2>

      <p className="mt-6 text-base md:text-lg text-gray-600 leading-relaxed">
      We follow globally recognized security standards and compliance frameworks.
      From encryption to continuous audits, your data security is our top priority.
      </p>
    </div>

    {/* Feature Grid */}
    <div className="mt-20 grid gap-10 md:grid-cols-2">

      {categories.map((category, idx) => {
        const IconComponent =
          category.icon ||
          (() => <div className="w-6 h-6 bg-gray-300 rounded-full" />);

        return (
          <div
            key={idx}
            className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-md  border transition duration-300"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5">

              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary-600  text-white shadow-md group-hover:scale-105 transition">
                <IconComponent className="w-6 h-6" />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-heading text-xl font-semibold text-gray-900">
                  {category.title || "Service Title"}
                </h3>

                <div className="mt-4 space-y-2 text-gray-600 text-base">
                  {category.items?.length ? (
                    category.items.map((item, i) => (
                      <p key={i} className="leading-relaxed">
                        {item}
                      </p>
                    ))
                  ) : (
                    <p>
                      Professional-grade solutions tailored to your business needs.
                    </p>
                  )}
                </div>
              </div>

            </div>
          </div>
        );
      })}

    </div>
  </div>
</Section>


      {/* All Services List */}
      <Section darkBg className="py-24">
        <motion.h2 className="text-3xl font-bold mb-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Complete Service Lineup
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {service.items.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <span className="text-accent-500 font-bold flex-shrink-0">✓</span>
              <span className="text-gray-700">{item}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-24">
        <FaqAccordion
          faqs={faqs}
          filterByCategory="iso"
          title="ISO 27001 Questions"
          subtitle="Everything you need to know about ISO 27001 compliance and security audits."
        />
      </Section>

      {/* Final CTA */}
      <CtaBand
        headline="Secure Your Business & Achieve ISO 27001 Compliance"
        subheadline="Talk to our security experts about protecting your organization and gaining competitive advantage."
        illustration="/7.png"
        primaryCTA={{ label: 'Schedule Security Assessment', href: '/contact' }}
        secondaryCTA={{ label: 'Call Our Security Team', href: 'tel:+353' }}
      />
    </>
  );
};
