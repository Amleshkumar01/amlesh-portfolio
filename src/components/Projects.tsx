import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Code, Globe, Shield } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'CyberGuard AI ',
    description: 'An AI-powered real-time Network Intrusion Detection System (NIDS) that monitors live traffic, detects suspicious activities, generates SOC-style alerts, and visualizes attack analytics through an interactive dashboard.',
    image: '/api/placeholder/400/250',
    category: 'Cybersecurity',
    technologies: [ 'Python' , 'Django' , 'Scapy' , 'SQLITE' , 'HTML' , 'CSS' , 'Java Script'  ],
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
   title: 'E-Commerce ',
description: 'A Django-based e-commerce web application for browsing products, managing carts, placing orders, and handling user authentication.',
image: '/api/placeholder/400/250',
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
image: '/api/placeholder/400/250',
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
  }
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null);

  return (
    <section id="projects" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Featured <span className="text-accent">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing my work in software development and cybersecurity
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl overflow-hidden card-hover cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                {project.category === 'Cybersecurity' && <Shield className="w-16 h-16 text-accent/60" />}
                {project.category === 'Full Stack' && <Code className="w-16 h-16 text-accent/60" />}
                {project.category === 'Web Development' && <Globe className="w-16 h-16 text-accent/60" />}
                
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Completed' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 rounded bg-accent/10 text-accent text-xs font-medium">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 btn-outline text-sm py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.liveUrl, '_blank');
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Demo
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 btn-outline text-sm py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.githubUrl, '_blank');
                    }}
                  >
                    <Github className="w-4 h-4 mr-1" />
                    Code
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-glass-border">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {selectedProject.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                        {selectedProject.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedProject.status === 'Completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {selectedProject.status}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full hover:bg-accent/20 transition-colors"
                  >
                    <X className="w-6 h-6 text-foreground" />
                  </motion.button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Description */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Description</h4>
                    <p className="text-muted-foreground">{selectedProject.description}</p>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Key Features</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="skill-chip"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-hero flex items-center gap-2"
                      onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Live Demo
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-outline flex items-center gap-2"
                      onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                    >
                      <Github className="w-5 h-5" />
                      View Source Code
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
