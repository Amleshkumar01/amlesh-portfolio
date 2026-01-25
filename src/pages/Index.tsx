import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Education } from '@/components/Education';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { FloatingHireMe } from '@/components/FloatingHireMe';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <FloatingHireMe />
    </div>
  );
};

export default Index;
