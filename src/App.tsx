import { useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Basic GSAP defaults if needed
  }, []);

  return (
    <ReactLenis root>
      <div className="relative min-h-screen selection:bg-white/20 selection:text-white">
        {/* Global Noise Overlay */}
        <div className="noise-bg pointer-events-none fixed inset-0 z-50 mix-blend-overlay"></div>

        <Navigation />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </ReactLenis>
  );
}

export default App;
