import { Code, Globe, Shield, Zap } from 'lucide-react';

export const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    skills: [
      { name: 'JavaScript', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Java', level: 75 },
      { name: 'C++', level: 70 },
      { name: 'TypeScript', level: 78 },
      { name: 'C', level: 72 }
    ]
  },
  {
    title: 'Frameworks & Tools',
    icon: Zap,
    skills: [
      { name: 'React', level: 82 },
      { name: 'Node.js', level: 75 },
      { name: 'Express.js', level: 73 },
      { name: 'MongoDB', level: 70 },
      { name: 'Git', level: 85 },
      { name: 'Docker', level: 60 }
    ]
  },
  {
    title: 'Web Technologies',
    icon: Globe,
    skills: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'REST APIs', level: 75 },
      { name: 'GraphQL', level: 60 },
      { name: 'Firebase', level: 65 }
    ]
  },
  {
    title: 'Networking & Security',
    icon: Shield,
    skills: [
      { name: 'Network Security', level: 70 },
      { name: 'Ethical Hacking', level: 65 },
      { name: 'Penetration Testing', level: 60 },
      { name: 'Cryptography', level: 62 },
      { name: 'Wireshark', level: 68 },
      { name: 'Kali Linux', level: 70 }
    ]
  }
];
