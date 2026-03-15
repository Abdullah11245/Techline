import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { updateMetaTags } from '@utils/seo';
import { Section } from '@components/Section';
import { Button } from '@components/Button';
import { FeatureCard } from '@components/FeatureCard';
import { CtaBand } from '@components/CtaBand';
import { FaqAccordion } from '@components/FaqAccordion';
import { faqs } from '@data/faqs';
import { services } from '@data/services';
import { ChevronRight } from 'lucide-react';
import { Typewriter } from '@/components/TypeWriter';

export const ItSupport: React.FC = () => {
  const service = services['it-support'];

  useEffect(() => {
    updateMetaTags({
      title: `${service.title} | Tech Line - Ireland`,
      description: service.description,
      url: 'https://tline.ie/services/it-support-infrastructure',
    });
  }, []);

  return (
    <>
      {/* Hero */}
<Section
  className="relative overflow-hidden pt-28 md:pt-40 pb-24"
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

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT */}
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Back */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white/70 hover:text-white transition mb-6"
      >
        <ChevronRight className="w-4 h-4 rotate-180" />
        Back to Home
      </Link>

      {/* Heading */}
      <motion.h1
                className=" max-w-4xl  font-bold leading-tight text-white "
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
               <Typewriter
        text={service.title}
        speed={100}
       
        className="text-3xl font-bold md:4xl text-white mb-4"
      />
              </motion.h1>
      {/* Description */}
      <p className="text-base md:text-xl mt-4 md:mt-0 text-white/80 mb-10 max-w-xl">
        {service.description}
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
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-2 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">

        {/* Title */}
        <h2 className="text-lg  text-center font-semibold text-white mb-6">
          What's Included
        </h2>

        {/* Items */}
        <div className="grid md:grid-cols-2 gap-2 md:gap-5">
          {service.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition"
            >
              <p className="text-sm text-white/90 font-medium">
                {item}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mb-4 mt-4 md:mt-8 p-2 md:p-4 rounded-xl bg-white/10 border border-white/20 text-xs md:text-sm text-white/80">
          Our services are optimized for reliability and ISO-aligned standards.
        </div>
      </div>
    </motion.div>

  </div>
</Section>

      {/* Services Grid */}
      {/* <Section darkBg className="py-24">
        <motion.h2 className="text-4xl font-bold mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          What's Included
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {service.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold text-sm mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section> */}

      {/* Process Section */}
   <Section className="relative py-24 bg-[url('/2360c8ef-2273-450c-9c68-6e80da5e90a6.jpg')] bg-cover bg-center">
  {/* Light overlay for readability */}
  <div className="absolute inset-0 bg-white/60"></div>

  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Header */}
    <div className="text-center">
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#004b6a] sm:text-4xl lg:text-5xl">
        Our Approach
      </h2>

      <div className="w-20 h-1 bg-[#40ae49] mx-auto rounded-full mt-6 mb-6"></div>

      <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700 lg:text-xl lg:leading-8">
        We start with a comprehensive assessment and tailor solutions to your needs.
      </p>
    </div>

    {/* Steps */}
    <ul className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-12 sm:mt-16 lg:mt-20 lg:max-w-6xl lg:grid-cols-4">
      {[
        { step: 1, title: 'Discovery', description: 'Understand your IT landscape, pain points, and business goals.' },
        { step: 2, title: 'Solution Design', description: 'Create a tailored IT support plan with clear SLAs and deliverables.' },
        { step: 3, title: 'Implementation', description: 'Deploy solutions, migrate systems, and train your team.' },
        { step: 4, title: 'Ongoing Support', description: 'Proactive monitoring, regular reviews, and continuous improvement.' },
      ].map((item) => (
        <li key={item.step} className="group relative flex lg:flex-col">
          {/* Connector Line */}
          <span
            className="absolute left-[22px] top-14 h-[calc(100%_-_32px)] w-px bg-[#004b6a]/20 
                       lg:right-0 lg:left-auto lg:top-[22px] lg:h-px lg:w-[calc(100%_-_72px)]"
            aria-hidden="true"
          />

          {/* Step Number */}
          <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full 
                          border-2 border-[#004b6a] bg-white text-[#004b6a] 
                          font-bold text-lg shadow-sm 
                          group-hover:bg-[#40ae49] group-hover:border-[#40ae49] 
                          group-hover:text-white transition-all duration-300">
            {item.step}
          </div>

          {/* Content */}
          <div className="ml-6 lg:ml-0 lg:mt-8">
            <h3 className="text-xl font-bold text-[#004b6a]">
              {item.title}
            </h3>
            <p className="mt-2 text-base text-gray-700 leading-relaxed">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
</Section>

      {/* FAQ */}
      <Section darkBg className="py-24">
        <FaqAccordion
          faqs={faqs}
          filterByCategory="general"
          title="Common Questions"
          subtitle="Learn more about IT support, response times, and how we work."
        />
      </Section>

      {/* Final CTA */}
      <CtaBand
        headline="Ready to Upgrade Your IT Support?"
        subheadline="Let's discuss your business needs and find the right support level for you."
         illustration='/7758839.jpg'
        primaryCTA={{ label: 'Get Started', href: '/contact' }}
        secondaryCTA={{ label: 'Request a Call', href: 'tel:+353' }}
      />
    </>
  );
};
