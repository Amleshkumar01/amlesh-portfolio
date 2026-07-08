import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Shield, Code } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'B.Tech CSE at LNCT University, Bhopal',
  },
  {
    icon: Shield,
    label: 'Focus',
    value: 'Cybersecurity, ethical hacking, and secure systems',
  },
  {
    icon: Code,
    label: 'Builds',
    value: 'React, TypeScript, Django, Salesforce, and Python projects',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Bhopal, Madhya Pradesh, India',
  },
];

export const About = () => {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            About <span className="text-accent">Amlesh Kumar</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-8">
            Amlesh Kumar is a B.Tech Computer Science Engineering student at LNCT University, Bhopal,
            building a portfolio around software development, cybersecurity, and modern web applications.
            The focus is on practical problem solving, secure coding, and projects that demonstrate real
            technical depth rather than generic landing-page content.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent/10 shrink-0">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-wide text-muted-foreground mb-2">
                    {item.label}
                  </div>
                  <div className="text-lg font-semibold text-foreground leading-7">
                    {item.value}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};