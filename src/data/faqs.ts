export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'iso' | 'security' | 'backup' | 'onboarding' | 'sla';
}

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    category: 'general',
    question: 'What is included in Tech Line\'s IT Support service?',
    answer: 'Our IT Support Helpdesk provides 24/7 technical assistance, IT infrastructure management, remote working solutions, and regular security audits. We tailor support levels to match your SLA requirements (Standard, Priority, or Premium tiers).',
  },
  {
    id: 'faq-2',
    category: 'iso',
    question: 'How can Tech Line help us achieve ISO 27001 certification?',
    answer: 'We provide comprehensive ISO 27001 GAP Analysis to identify compliance gaps, then support your organization through implementation of required controls. Our experts guide you through documentation, policies, and technical measures needed for certification.',
  },
  {
    id: 'faq-3',
    category: 'security',
    question: 'What happens if we experience a security incident?',
    answer: 'Our Incident Response & Recovery service activates immediately. We contain the breach, investigate the root cause, remediate vulnerabilities, and provide recommendations to prevent future incidents. Our SOC/EDR services also provide proactive threat detection.',
  },
  {
    id: 'faq-4',
    category: 'backup',
    question: 'How does your backup and disaster recovery service protect our data?',
    answer: 'We create a bespoke BCDR plan tailored to your business needs. This includes managed backups with defined RPO/RTO targets, integration with modern RMM tools, and protection for Microsoft 365 and SaaS applications. We minimize downtime and ensure rapid recovery.',
  },
  {
    id: 'faq-5',
    category: 'onboarding',
    question: 'What is your typical onboarding process?',
    answer: 'We follow a 4-step approach: Assess (understand your current environment), Onboard (implement solutions and training), Monitor (continuous oversight), and Improve (optimize and evolve). Most onboarding completes within 2–4 weeks depending on complexity.',
  },
  {
    id: 'faq-6',
    category: 'sla',
    question: 'What SLA options do you offer?',
    answer: 'We provide three tiers: Standard (8-hour response, business hours), Priority (4-hour response, extended hours), and Premium (1-hour response, 24/7). Choose the tier that matches your business criticality.',
  },
  {
    id: 'faq-7',
    category: 'security',
    question: 'Do you offer security training for our staff?',
    answer: 'Yes, we provide Custom Security Training Programs tailored to your organization. We also run Phishing Simulation Testing to help staff recognize and respond to threats in real-world scenarios.',
  },
  {
    id: 'faq-8',
    category: 'general',
    question: 'Are you based in Ireland? Do you support Irish businesses?',
    answer: 'Yes, Tech Line is based in Ireland and specializes in supporting Irish businesses. We understand local compliance requirements and can provide localized support across the country.',
  },
];
