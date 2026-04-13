export const siteConfig = {
  name: 'Tech Line',
  title: 'IT Support & ISO 27001 Compliance for Irish Businesses',
  description: 'Complete IT services, cybersecurity, and cloud solutions for Irish enterprises',
  url: 'https://tline.ie',
  phone: '(065) 682 7229',
  email: 'info@tline.ie',
  serviceArea: 'Ireland',
  socialLinks: {
    linkedin: '#',
    twitter: '#',
    facebook: '#',
  },
  nav: [
    { label: 'Services', href: '#services', submenu: true },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'IT Support & Infrastructure', href: '/services/it-support-infrastructure' },
      { label: 'Cyber Security', href: '/services/cyber-security' },
      { label: 'Backup & Business Continuity', href: '/services/backup-business-continuity' },
      { label: 'Microsoft 365 & Collaboration', href: '/services/microsoft-365-collaboration' },
      { label: 'Telecom & Cloud Telephony', href: '/services/telecom-cloud-telephony' },
      { label: 'Digital Services', href: '/services/digital-services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Phone : (065) 682 7229', href: '' },
      { label: 'Email : info@tline.ie', href: '' },
      // { label: 'Service Area: Ireland', href: '#' },
    ],
  },
];
