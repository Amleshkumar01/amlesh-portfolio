import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser'; // ✅ ADD THIS

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const contactInfo = {
    email: 'amleshkumar647544@gmail.com',
    location: 'Bhopal, Madhya Pradesh, India',
    phone: 'Available upon request',
    // Note: Twitter/X link yahan adjust kar sakte ho.
    twitterHref: 'https://twitter.com/',
    githubHref: 'https://github.com/Amleshkumar01',
    linkedinHref: 'https://www.linkedin.com/in/amlesh-kumar23/'
  };

  // ✅ UPDATED FUNCTION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_yctevsl',   // 👉 yaha apna Service ID daalo
        'template_qogj487',  // 👉 yaha apna Template ID daalo
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        'cNMsdu7bkLudVsL_o' // 👉 yaha apni Public Key daalo
      );

      toast({
        title: "Message sent successfully! ✅",
        description: "Check your email 📩",
      });

      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      console.error(error);

      toast({
        title: "Error sending message ❌",
        description: "Please try again later",
      });
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="section-padding bg-muted/20">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left - Let's Connect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Let's Connect
              </h2>
              <p className="text-background/80 max-w-md">
                I'm always open to discussing new opportunities, interesting projects, or just
                chatting about technology and cybersecurity. Feel free to reach out!
              </p>
            </div>

            <div className="space-y-4">
              <div className="glass rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 rounded-full bg-accent/20 text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-background/70 font-medium">Email</p>
                  <p className="text-foreground break-words">{contactInfo.email}</p>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 rounded-full bg-accent/20 text-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-background/70 font-medium">Location</p>
                  <p className="text-foreground">{contactInfo.location}</p>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 flex items-start gap-4">
                <div className="p-3 rounded-full bg-accent/20 text-accent">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-background/70 font-medium">Phone</p>
                  <p className="text-foreground">{contactInfo.phone}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-lg font-semibold text-foreground mb-4">Follow Me</h3>
              <div className="flex items-center gap-4">
                <motion.a
                  href={contactInfo.githubHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full glass hover:bg-accent/20 transition-all duration-300 text-white"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href={contactInfo.linkedinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full glass hover:bg-accent/20 transition-all duration-300 text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>

                <motion.a
                  href={contactInfo.twitterHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full glass hover:bg-accent/20 transition-all duration-300 text-white"
                  aria-label="Twitter/X"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Send a Message
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-background/70" htmlFor="contact-name">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg border bg-background/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-background/70" htmlFor="contact-email">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your email@example.com"
                    className="w-full px-4 py-3 rounded-lg border bg-background/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-background/70" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project, opportunity, or just say hello!"
                    className="w-full px-4 py-3 rounded-lg border bg-background/10"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-hero flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4" />
              </motion.button>

              <p className="text-xs text-background/60">
                By sending a message, you agree to our privacy policy. Your information will be kept
                secure and only used to respond to your inquiry.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};