export const projects = [
  {
    id: 1,
    title: 'CyberGuard AI',
    description: 'An AI-powered real-time Network Intrusion Detection System (NIDS) that monitors live traffic, detects suspicious activities, generates SOC-style alerts, and visualizes attack analytics through an interactive dashboard.',
    category: 'Cybersecurity',
    technologies: [ 'Python' , 'Django' , 'Scapy' , 'SQLITE' , 'HTML' , 'CSS' , 'JavaScript'  ],
    features: [
      'Real-time packet sniffing using Scapy',
      'Flow-based network traffic analysis',
      'Detection of port scanning attacks',
      'Incident reporting and documentation  ',
      'SOC-style real-time alert system',
      'Top attacker IP and targeted port analysis'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Amleshkumar01/CyberGuard-AI',
    status: 'In Development'
  },
  {
    id: 2,
   title: 'E-Commerce',
description: 'A Django-based e-commerce web application for browsing products, managing carts, placing orders, and handling user authentication.',
category: 'Web Development',
technologies: ['Python', 'Django', 'SQLite', 'HTML', 'CSS', 'JavaScript', 'Bootstrap'],
features: [
'User registration and login system',
'Product listing with detailed product pages',
'Shopping cart management',
'Order placement and checkout flow',
'Admin panel for managing products and orders',
'Search and category-based product filtering',
'Responsive design for mobile and desktop users'
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/Amleshkumar01/e-com-project',
    status: 'Completed'
  },
  {
    id: 3,
    title: 'Airline Management System',
description: 'A Salesforce-based airline management platform designed to streamline flight operations, passenger bookings, and administrative processes through a centralized cloud solution.',
category: 'Salesforce Development',
technologies: ['Salesforce', 'Apex', 'Lightning Web Components (LWC)', 'SOQL', 'Flow Builder', 'Salesforce CRM'],
features: [
'Passenger registration and profile management',
'Flight scheduling and route management',
'Online ticket booking and reservation system',
'Real-time seat availability tracking',
'Automated booking confirmations using Salesforce Flows',
'Admin dashboard for managing flights, passengers, and bookings'
    ],
    liveUrl: '#',
    githubUrl: '#',
    status: 'Completed'
  },
  {
    id: 4,
    title: 'Placement IQ',
    description: 'A placement preparation platform that helps students organize their learning, practice technical skills, and build confidence for software development opportunities.',
    category: 'Web Development',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
    features: [
      'Structured placement preparation workflow',
      'Technical practice and progress tracking',
      'Clean dashboard experience for students',
      'Responsive design for mobile and desktop users'
    ],
    liveUrl: 'https://placementiq.centralindia.cloudapp.azure.com/',
    githubUrl: '#',
    status: 'In Development'
  }
];
