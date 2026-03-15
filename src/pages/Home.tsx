import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { updateMetaTags, getJsonLd, organizationSchema } from '@utils/seo';
import { Section } from '@components/Section';
import { Button } from '@components/Button';
import { FeatureCard } from '@components/FeatureCard';
import { ServiceCardStack } from '@components/ServiceCardStack';
import { CtaBand } from '@components/CtaBand';
import { LogoGrid } from '@components/LogoGrid';
import { SlaTable } from '@components/SlaTable';
import { FaqAccordion } from '@components/FaqAccordion';
import { slas } from '@data/slas';
import { faqs } from '@data/faqs';
import { CheckCircle, Shield, Server, LifeBuoy, Database, Phone, Monitor,MSquareIcon } from 'lucide-react';
import { Typewriter } from '@/components/TypeWriter';
export const Home: React.FC = () => {
  useEffect(() => {
    updateMetaTags({
      title: 'Tech Line - IT Support & ISO 27001 Compliance | Ireland',
      description: 'Complete IT services, cybersecurity, and cloud solutions for Irish businesses. Fast response times, ISO 27001 expertise, modern tooling.',
      url: 'https://tline.ie',
      type: 'website',
    });
    getJsonLd(organizationSchema);
  }, []);
  

  return (
    <>
   
      {/* Hero Section */}
     <Section
  className="pt-0 md:pt-0 pb-16 md:pb-24 relative overflow-hidden"
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

    {/* Dark overlay for readability */}
    <div className="absolute inset-0 bg-black/60" />
  </div>

  {/* Content */}
  <div className="relative z-10 md:mt-36 ">
    <div className="mx-auto max-w-6xl px-4">
      <div className="flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 rounded-full  bg-white/20 px-4 py-2 shadow-sm backdrop-blur"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <span className="relative flex size-3 items-center justify-center ">
            <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-accent-400 opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent-600" />
          </span>
          <p className="text-sm text-white font-semibold none md:block">
            Trusted by 100+ Irish businesses
          </p>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="mt-2 md:mt-8 max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
         <Typewriter
  text="Transform Your IT Infrastructure"
  speed={80}
  className="text-2xl md:text-5xl font-bold text-white"
/>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="mt-5 max-w-2xl text-base text-white/80 md:text-xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          Secure infrastructure, ISO 27001 expertise, and 24/7 support.
          Transform your IT, reduce risk, and scale confidently.
        </motion.p>

        {/* CTAs */}
        {/* <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          <Link to="/contact">
            <Button size="lg" className="min-w-[180px]">
              Get Started Now
            </Button>
          </Link>

          <a href="tel:+353">
            <Button
              variant="secondary"
              size="lg"
              className="min-w-[180px]"
            >
              Book a Demo
            </Button>
          </a>
        </motion.div> */}

        {/* Divider */}
        {/* <div className="mt-12 w-full max-w-6xl">
          <div className="h-px w-full bg-gradient-to-r from-white via-primary-400 to-white" />
        </div> */}

        {/* Stats Panel */}
        {/* <motion.div
          className="mt-10 w-full max-w-4xl rounded-2xl  bg-white/20 px-5 py-6 shadow-sm backdrop-blur md:px-8"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10 ">
            {[
              { number: "15+", label: "Years Experience" },
              { number: "100+", label: "Happy Clients" },
              { number: "99.9%", label: "Uptime SLA" },
              { number: "24/7", label: "Expert Support" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.38 + index * 0.08,
                }}
              >
                <div className="text-2xl font-bold text-white md:text-4xl">
                  {stat.number}
                </div>
                <div className="mt-1 text-xs text-white/80 md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}

      </div>
    </div>
  </div>
</Section>

      {/* Trust Section - Client Logos */}
   <div className="py-2 w-full ackdrop-blur-md 
    bg-gradient-to-t from-white/70 to-gray-800/30">
  <div className="mx-auto w-full overflow-hidden">

    <div className="relative">
      {/* Marquee container */}
      <div className="flex gap-12 animate-marquee">
        {[
          { src: '/Casey-meaney-construction.webp', alt: 'Casey Meaney Construction' },
          { src: '/Clarke.webp', alt: 'Clarke Distributors Ireland' },
          { src: '/Derg-kitchen-design-ltd.png', alt: 'Derg Kitchen Design Ltd' },
          { src: '/Get-autism-active.webp', alt: 'Get Autism Active' },
          { src: '/Infinity-lifts-step-into-the-future.webp', alt: 'Infinity Lifts - Step Into The Future' },
          { src: '/Materials-testing-services.webp', alt: 'Materials Testing Services' },
          { src: '/Midwest-euronics-electrical-wholesale-ltd.webp', alt: 'Midwest Euronics Electrical Wholesale Ltd' },
          { src: '/Mmel-ltd-electrical-contractor.webp', alt: 'MMEL Ltd Electrical Contractor' },
          { src: '/Ses-water-management.webp', alt: 'SES Water Management' },
          { src: '/St-theresas-nursing-home.png', alt: "St. Theresa's Nursing Home" },
          { src: '/Techdepot.webp', alt: 'Tech Depot' },
          // Repeat logos
          { src: '/Casey-meaney-construction.webp', alt: 'Casey Meaney Construction' },
          { src: '/Clarke.webp', alt: 'Clarke Distributors Ireland' },
          { src: '/Derg-kitchen-design-ltd.png', alt: 'Derg Kitchen Design Ltd' },
          { src: '/Get-autism-active.webp', alt: 'Get Autism Active' },
          { src: '/Infinity-lifts-step-into-the-future.webp', alt: 'Infinity Lifts - Step Into The Future' },
          { src: '/Materials-testing-services.webp', alt: 'Materials Testing Services' },
          { src: '/Midwest-euronics-electrical-wholesale-ltd.webp', alt: 'Midwest Euronics Electrical Wholesale Ltd' },
          { src: '/Mmel-ltd-electrical-contractor.webp', alt: 'MMEL Ltd Electrical Contractor' },
          { src: '/Ses-water-management.webp', alt: 'SES Water Management' },
          { src: '/St-theresas-nursing-home.png', alt: "St. Theresa's Nursing Home" },
          { src: '/Techdepot.webp', alt: 'Tech Depot' },
        ].map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.alt}
            className="h-16 md:h-32 w-auto object-contain opacity-100 transition duration-300"
          />
        ))}
      </div>
    </div>
  </div>

  {/* CSS for marquee */}
  <style>
    {`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      .animate-marquee {
        display: flex;
        gap: 3rem;
        width: max-content;
        animation: marquee 50s linear infinite;
      }
    `}
  </style>
</div>

      {/* Services Overview Section (Redesigned like reference cards) */}
      <Section darkBg={false} className="py-12 md:py-24">
        <motion.div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive IT solutions designed to keep your business secure, efficient, and competitive.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
<Link
  to="/services/it-support-infrastructure"
  className="group"
  
>
  <ServiceCardStack
    accent="blue"
    icon={LifeBuoy}
    title="IT Support & Infrastructure"
    description="24/7 helpdesk, infrastructure management, remote working solutions, and proactive monitoring."
    items={['IT Support Helpdesk', 'Infrastructure Management', 'Remote Working Solutions', 'IT Security Audit']}

  />
</Link>

          <Link to="/services/cyber-security" className="group">
            <ServiceCardStack
              accent="green"
              icon={Shield}
              title="Cyber Security Services"
              description="ISO 27001 compliance, threat protection, security audits, and incident response."
              items={['ISO 27001 Compliance', 'Threat Protection & Firewalls', 'Multi-Factor Authentication', 'SOC/EDR Services']}
            />
          </Link>

          <Link to="/services/backup-business-continuity" className="group">
            <ServiceCardStack
              accent="blue"
              icon={Database}
              title="Backup & Business Continuity"
              description="BCDR planning, managed backups, disaster recovery, and rapid recovery solutions."
              items={['BCDR Planning', 'Managed Backups', 'Rapid Recovery (RPO/RTO)', 'Compliance & Audit Support']}
            />
          </Link>

          <Link to="/services/microsoft-365-collaboration" className="group">
            <ServiceCardStack
              accent="green"
              icon={MSquareIcon}
              title="Microsoft 365 & Collaboration"
              description="Cloud-based productivity with Microsoft 365, SharePoint, Teams, and OneDrive."
              items={['Microsoft 365 Setup', 'Teams & SharePoint', 'Email Migration', 'License Management']}
            />
          </Link>

          <Link to="/services/telecom-cloud-telephony" className="group">
            <ServiceCardStack
              accent="blue"
              icon={Phone}
              title="Telecom & Cloud Telephony"
              description="Modern cloud telephony solutions, VoIP systems, and unified communications."
              items={['Cloud Telephony', 'VoIP Solutions', 'Call Recording', 'Mobile Integration']}
            />
          </Link>

          <Link to="/services/digital-services" className="group">
            <ServiceCardStack
              accent="green"
              icon={Monitor}
              title="Digital Services"
              description="Web development, SEO, SEM, and digital marketing to grow your online presence."
              items={['Web Development', 'SEO Optimization', 'Google Ads (SEM)', 'Digital Strategy']}
            />
          </Link>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link to="/contact">
            <Button size="lg">Let's Build Your Solution</Button>
          </Link>
        </motion.div>
      </Section>
      {/* Decision Tree Section */}
      <Section id="services" darkBg className="pt-24 md:pt-32">
        <motion.div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How Can We Help?</h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Select your primary need, and we'll guide you to the right solution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <Link to="/services/it-support-infrastructure">
            <FeatureCard
              icon={Server}
              title="Need Ongoing IT Support"
              description="24/7 helpdesk, infrastructure management, and proactive monitoring. Starting from €299/month."
              badge="Fast Response"
            />
          </Link>

          <Link to="/services/cyber-security">
            <FeatureCard
              icon={Shield}
              title="Need ISO 27001 Readiness"
              description="Gap analysis, compliance support, threat protection, and security audits. Expert guidance for certification."
              badge="ISO Specialist"
            />
          </Link>

          <Link to="/services/backup-business-continuity">
            <FeatureCard
              icon={CheckCircle}
              title="Need Backup & Recovery"
              description="Bespoke BCDR planning, managed backups, and rapid recovery solutions. Minimize downtime with RPO/RTO targets."
              badge="Peace of Mind"
            />
          </Link>
        </div>
      </Section>

      {/* Certifications & Compliance Section */}
 <Section darkBg={false} className="py-2 pt-12 md:py-24 md:pt-24 bg-white">
  <div className="text-center mb-16">
    
    {/* Brand Badge */}
    <span className="inline-block bg-[#004b6a]/10 text-[#004b6a] text-sm font-semibold px-4 py-1 rounded-full mb-4">
      Trust & Compliance
    </span>

    <motion.h2
      className="text-3xl md:text-5xl font-bold mb-4 text-[#004b6a]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      Certifications & Compliance
    </motion.h2>

    {/* Green Accent Divider */}
    <div className="w-24 h-1 bg-[#40ae49] mx-auto rounded-full mb-6"></div>

    <motion.p
      className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      viewport={{ once: true }}
    >
      We adhere to globally recognized standards to ensure security,
      quality, and regulatory compliance across all services.
    </motion.p>
  </div>

  <LogoGrid
    type="certifications"
    logos={[
      { src: '/iso-27001.jpg', alt: 'ISO 27001' },
      // { src: '/9001.png', alt: 'ISO 9001' },
      { src: '/GDPR.png', alt: 'GDPR Compliant' },
      // { src: '/industry.png', alt: 'Industry Partner' },
    ]}
  />
</Section>

      {/* How We Work Timeline */}
 <Section className="relative py-24 bg-[url('/2360c8ef-2273-450c-9c68-6e80da5e90a6.jpg')] bg-cover bg-center">
  
  {/* Light overlay for readability */}
  <div className="absolute inset-0 bg-white/60"></div>

  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
    
    {/* Header */}
    <div className="text-center">
      <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#004b6a] sm:text-4xl lg:text-5xl">
        How We Work
      </h2>

      <div className="w-20 h-1 bg-[#40ae49] mx-auto rounded-full mt-6 mb-6"></div>

      <p className="mx-auto mt-4 max-w-2xl text-base text-gray-700 lg:text-xl lg:leading-8">
        A proven 4-step approach to transform your IT environment.
      </p>
    </div>

    {/* Steps */}
    <ul className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-12 sm:mt-16 lg:mt-20 lg:max-w-6xl lg:grid-cols-4">
      {[
        { step: 1, title: 'Assess', description: 'We audit your current IT environment, identify gaps, and understand your business goals.' },
        { step: 2, title: 'Onboard', description: 'Implement solutions, configure systems, train your team, and establish monitoring.' },
        { step: 3, title: 'Monitor', description: 'Continuous oversight, proactive threat detection, and performance optimization.' },
        { step: 4, title: 'Improve', description: 'Regular reviews, security updates, compliance checks, and strategic recommendations.' },
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
      {/* SLA Tiers Section */}
      {/* <Section darkBg={false} className="py-24">
        <motion.div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Support Level</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Flexible SLA tiers tailored to your business needs.
          </p>
        </motion.div>

        <SlaTable slas={slas} />
      </Section> */}

      {/* FAQ Section */}
      <Section darkBg className="py-24">
        <FaqAccordion
          faqs={faqs}
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our services, SLAs, and support process."
        />
      </Section>

      {/* Final CTA Band */}
      {/* underline decoration-4 underline-offset-8 */}
      <CtaBand
headline={
  <>
Ready to <span className="text-accent-600 ">Transform</span> Your IT?

  </>
}
        illustration="/3639351.jpg"
        subheadline="Let's discuss how Tech Line can support your business with fast, reliable IT services and ISO 27001 compliance."
        primaryCTA={{ label: 'Book Your Assessment Now', href: '/contact' }}
        secondaryCTA={{ label: 'Call Us Today', href: 'tel:+353' }}
      />
    </>
  );
};
