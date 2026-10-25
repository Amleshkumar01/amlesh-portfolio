export const certificationCategories = [
  'Networking',
  'Cybersecurity',
  'Development',
  'AI & IT',
] as const;

export type CertificationCategory = (typeof certificationCategories)[number];

type CertificationDetails = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: CertificationCategory;
  kind: 'Certification' | 'Course' | 'Internship';
  skills: string[];
};

// Show professional credentials first, followed by advanced courses, internships,
// applied projects, and foundational learning. Category filters preserve this order.
const certificationDetails: CertificationDetails[] = [
  {
    id: 'salesforce-platform-developer',
    title: 'Salesforce Certified Platform Developer',
    issuer: 'Salesforce',
    date: '05 Apr 2026',
    category: 'Development',
    kind: 'Certification',
    skills: ['Salesforce', 'Platform Development', 'Application Development'],
  },
  {
    id: 'copado-agentia-advanced',
    title: 'Copado Certified Agentia Advanced',
    issuer: 'Copado',
    date: '01-10-2026',
    category: 'AI & IT',
    kind: 'Certification',
    skills: ['Copado', 'Agentia', 'Salesforce DevOps'],
  },
  {
    id: 'copado-ai',
    title: 'Copado Certified Copado AI',
    issuer: 'Copado',
    date: '10-04-2026',
    category: 'AI & IT',
    kind: 'Certification',
    skills: ['Copado AI', 'Salesforce', 'DevOps'],
  },
  {
    id: 'ccna-enterprise-networking-security-automation',
    title: 'CCNA: Enterprise Networking, Security, and Automation',
    issuer: 'Cisco Networking Academy',
    date: '21 May 2026',
    category: 'Networking',
    kind: 'Course',
    skills: ['Enterprise Networking', 'Network Security', 'Automation'],
  },
  {
    id: 'ccna-switching-routing-wireless',
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    issuer: 'Cisco Networking Academy',
    date: '20 May 2026',
    category: 'Networking',
    kind: 'Course',
    skills: ['Switching', 'Routing', 'Wireless Networks'],
  },
  {
    id: 'cisco-aicte-cybersecurity-internship',
    title: 'Cisco AICTE Cybersecurity Virtual Internship',
    issuer: 'Cisco Networking Academy & AICTE',
    date: 'Jun - Aug 2026',
    category: 'Cybersecurity',
    kind: 'Internship',
    skills: ['Cybersecurity', 'Networking', 'Security Fundamentals'],
  },
  {
    id: 'servicenow-virtual-internship',
    title: 'ServiceNow Virtual Internship Program',
    issuer: 'ServiceNow, AICTE & SmartBridge',
    date: '14 Apr 2026',
    category: 'AI & IT',
    kind: 'Internship',
    skills: ['ServiceNow', 'IT Administration', 'Agentic AI', 'Automation'],
  },
  {
    id: 'django-elearning-portal',
    title: 'Django Projects: E-Learning Portal',
    issuer: 'Infosys Springboard',
    date: '29 Jul 2025',
    category: 'Development',
    kind: 'Course',
    skills: ['Django', 'E-Learning', 'Web Applications'],
  },
  {
    id: 'cybersecurity-essentials',
    title: 'Cybersecurity Essentials',
    issuer: 'Cisco Networking Academy',
    date: '29 Jul 2025',
    category: 'Cybersecurity',
    kind: 'Course',
    skills: ['Cybersecurity', 'Network Defense', 'Threat Awareness'],
  },
  {
    id: 'ccna-introduction-to-networks',
    title: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    date: '19 May 2026',
    category: 'Networking',
    kind: 'Course',
    skills: ['Computer Networks', 'TCP/IP', 'IP Addressing'],
  },
  {
    id: 'python-foundation',
    title: 'Python Foundation Certification',
    issuer: 'Infosys Springboard',
    date: '14 Apr 2026',
    category: 'Development',
    kind: 'Course',
    skills: ['Python', 'Programming Fundamentals', 'Problem Solving'],
  },
  {
    id: 'introduction-to-generative-ai',
    title: 'Introduction to Generative AI',
    issuer: 'IBM SkillsBuild',
    date: '13 Nov 2025',
    category: 'AI & IT',
    kind: 'Course',
    skills: ['Generative AI', 'AI Fundamentals', 'AI Applications'],
  },
  {
    id: 'introduction-to-large-language-models',
    title: 'Introduction to Large Language Models',
    issuer: 'IBM SkillsBuild',
    date: '13 Nov 2025',
    category: 'AI & IT',
    kind: 'Course',
    skills: ['Large Language Models', 'Natural Language Processing', 'AI'],
  },
];

export const certifications = certificationDetails.map((certification) => ({
  ...certification,
  previewUrl: `${import.meta.env.BASE_URL}certifications/previews/${certification.id}.webp`,
  credentialUrl: `${import.meta.env.BASE_URL}certifications/${certification.id}.pdf`,
}));
