export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  items: string[];
}

export const services: Record<string, Service> = {
  'it-support': {
    id: 'it-support',
    title: 'IT Support & Infrastructure',
    description: 'Comprehensive IT support and infrastructure management for Irish businesses',
    items: [
      'IT Support Helpdesk',
      'IT Infrastructure & Processes',
      'Remote Working Solutions',
      'IT Security Audit',
    ],
  },
  'cyber-security': {
    id: 'cyber-security',
    title: 'Cyber Security Services',
    description: 'ISO 27001 compliance and advanced threat protection',
    items: [
      'Proactive Threat Protection (Firewalls, Antivirus, Email Scanning)',
      'Multi-Factor Authentication (MFA)',
      'Regular Security Audits',
      'ISO 27001 GAP Analysis & Compliance Support',
      'Incident Response & Recovery',
      'Proactive Patch Management',
      'Server and System Patching',
      'Endpoint Monitoring',
      'Integrated SOC/EDR Services',
      'Automated Maintenance & Updates',
      'Custom Security Training Programs',
      'Phishing Simulation Testing',
      'Encryption Solutions',
      'Firewall Solutions',
      'Antivirus Software',
      'Email Scanning Software',
    ],
  },
  'backup-bcdr': {
    id: 'backup-bcdr',
    title: 'Backup & Business Continuity',
    description: 'Ensure data protection and rapid recovery from disasters',
    items: [
      'Bespoke Business Continuity & Disaster Recovery (BCDR) Planning',
      'Downtime Minimization (RPO & RTO)',
      'Backup Integration with RMM Tools',
      'Managed Data Backup',
      'Backup for Microsoft 365 and SaaS Applications',
    ],
  },
  'microsoft-365': {
    id: 'microsoft-365',
    title: 'Microsoft 365 & Collaboration',
    description: 'Cloud productivity and collaboration solutions',
    items: [
      'Microsoft 365 Cloud Solution',
      'Cloud Data with Microsoft 365',
      'Email Protection',
      'Microsoft Teams for Business',
    ],
  },
  'telecom': {
    id: 'telecom',
    title: 'Telecom & Cloud Telephony',
    description: 'Modern communication solutions for your business',
    items: [
      'Cloud Phone Solution',
      'VoIP Cloud Telephony',
      'On-Premise Phone Systems',
      'Business Broadband',
      'Softphone Technology',
      'Softphone for Cloud Telephony',
      'Call Routing and Switchboard',
      'Call Traffic Management',
      'Cloud Telecoms Support Services',
    ],
  },
  'digital-services': {
    id: 'digital-services',
    title: 'Digital Services',
    description: 'Web and digital transformation services',
    items: [
      'Web Development',
      'Search Engine Marketing (SEM)',
    ],
  },
};

export const servicesList = Object.values(services);
