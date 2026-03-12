export interface SLA {
  id: string;
  name: string;
  description: string;
  responseTime: string;
  availability: string;
  features: string[];
  price: string;
}

export const slas: SLA[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Ideal for small businesses with moderate IT needs',
    responseTime: '8 hours (business hours)',
    availability: 'Monday–Friday, 8 AM–6 PM',
    features: [
      'Email and phone support',
      'Helpdesk ticket management',
      'Monthly check-ins',
      'Standard patches and updates',
      'Basic reporting',
    ],
    price: 'From €299/month',
  },
  {
    id: 'priority',
    name: 'Priority',
    description: 'Recommended for growing businesses and critical operations',
    responseTime: '4 hours (extended hours)',
    availability: 'Monday–Saturday, 7 AM–8 PM',
    features: [
      'Priority phone support (dedicated line)',
      'Advanced ticket management',
      'Bi-weekly strategic reviews',
      'Proactive monitoring',
      'Advanced patches and patches',
      'Detailed monthly reports',
      'Compliance audits',
    ],
    price: 'From €699/month',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For mission-critical businesses requiring maximum uptime',
    responseTime: '1 hour (24/7)',
    availability: 'Around the clock, including holidays',
    features: [
      '24/7 dedicated support team',
      'Immediate incident response',
      'Weekly strategic planning sessions',
      'Proactive threat monitoring and response',
      'Zero-day patch deployment',
      'Real-time compliance monitoring',
      'Quarterly business reviews',
      'Custom training and consulting',
      'Dedicated account manager',
    ],
    price: 'From €1,499/month',
  },
];
