import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen, Award } from 'lucide-react';

const educationData = {
  degree: 'Bachelor of Technology in Computer Science Engineering',
  university: 'LNCT University',
  location: 'Bhopal, Madhya Pradesh',
  duration: '2023 - 2027',
  cgpa: '8.5 / 10',
  status: 'Currently Pursuing',
  relevantCourses: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'Database Management Systems',
    'Computer Networks',
    'Cybersecurity Fundamentals',
    'Software Engineering',
    'Operating Systems',
    'Web Development',
    'Machine Learning Basics',
    'Discrete Mathematics'
  ],
  achievements: [
    'Dean\'s List for Academic Excellence',
    'Active member of Computer Science Society',
    'Participated in Inter-college Coding Competition',
    'Led team project on Campus Security System'
  ]
};

export const Education = () => {
  return (
    <section id="education" className="section-padding bg-muted/20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            <span className="text-accent">Education</span> & Learning
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My academic journey and continuous learning in computer science
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8 mb-12 card-hover"
          >
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Main Info */}
              <div className="lg:col-span-2">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-accent/10">
                    <GraduationCap className="w-8 h-8 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {educationData.degree}
                    </h3>
                    <p className="text-xl text-accent font-semibold mb-2">
                      {educationData.university}
                    </p>
                    <div className="flex flex-wrap gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{educationData.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{educationData.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Status:</span>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                      {educationData.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Current CGPA:</span>
                    <span className="text-lg font-bold text-foreground">{educationData.cgpa}</span>
                  </div>
                </div>
              </div>

              {/* Right: Quick Stats */}
              <div className="space-y-6">
                <div className="text-center p-6 bg-accent/5 rounded-xl">
                  <div className="text-3xl font-bold text-accent mb-1">4</div>
                  <div className="text-sm text-muted-foreground">Years Program</div>
                </div>
                <div className="text-center p-6 bg-primary/5 rounded-xl">
                  <div className="text-3xl font-bold text-primary mb-1">8.5</div>
                  <div className="text-sm text-muted-foreground">Current CGPA</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Relevant Courses */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 mb-12"
          >
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-accent/10">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Relevant Coursework
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {educationData.relevantCourses.map((course, index) => (
                  <motion.div
                    key={course}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="skill-chip"
                  >
                    {course}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Award className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Achievements
                </h3>
              </div>
              <div className="space-y-3">
                {educationData.achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm text-foreground">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline Visual */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
              Academic Journey Timeline
            </h3>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-accent/30" />
              
              {[
                { year: '2023', title: 'Enrolled in B.Tech CSE', status: 'completed' },
                { year: '2024', title: 'Foundation Courses Completed', status: 'completed' },
                { year: '2025', title: 'Core Subjects & Specialization', status: 'current' },
                { year: '2026', title: 'Advanced Topics & Internship', status: 'upcoming' },
                { year: '2027', title: 'Final Project & Graduation', status: 'upcoming' }
              ].map((item, index) => (
                <div key={item.year} className="relative flex items-center justify-center mb-8">
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
                    item.status === 'completed' ? 'bg-accent border-accent' :
                    item.status === 'current' ? 'bg-primary border-primary' :
                    'bg-muted border-muted'
                  }`} />
                  <div className="grid grid-cols-2 w-full gap-8">
                    {index % 2 === 0 ? (
                      <>
                        <div className="text-right pr-8">
                          <div className="font-semibold text-foreground">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.year}</div>
                        </div>
                        <div />
                      </>
                    ) : (
                      <>
                        <div />
                        <div className="pl-8">
                          <div className="font-semibold text-foreground">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.year}</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};