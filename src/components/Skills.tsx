import { motion } from 'framer-motion';
import { 
  Code, 
  Database, 
  Globe, 
  Shield, 
  Server, 
  Smartphone,
  Brain,
  Zap
} from 'lucide-react';

const skillCategories = [
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

export const Skills = () => {
  return (
    <section id="skills" className="section-padding bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Technical <span className="text-accent">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to build innovative solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-accent/10">
                  <category.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: categoryIndex * 0.1 + skillIndex * 0.05 
                    }}
                    viewport={{ once: true }}
                    className="skill-item"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ 
                          duration: 1, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2,
                          ease: "easeOut"
                        }}
                        viewport={{ once: true }}
                        className="h-full bg-gradient-to-r from-accent to-accent-hover rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: Code, label: 'Languages', count: '6+' },
            { icon: Zap, label: 'Frameworks', count: '8+' },
            { icon: Database, label: 'Databases', count: '4+' },
            { icon: Shield, label: 'Security Tools', count: '5+' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 glass rounded-xl"
            >
              <div className="inline-flex p-3 rounded-full bg-accent/10 mb-3">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.count}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};