import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Footer from './components/Footer';

const App: React.FC = () => {
  // Default to true (dark mode)
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-tech-base text-tech-text-main selection:bg-tech-blue selection:text-white font-sans transition-colors duration-300">
      {/* Theme Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className="fixed top-6 right-6 z-50 p-2 rounded-full bg-tech-surface border border-tech-border text-tech-text-sub hover:text-tech-text-main hover:border-tech-blue transition-all shadow-lg"
        title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Footer />
    </div>
  );
};

export default App;