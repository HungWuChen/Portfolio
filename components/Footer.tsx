import React from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { HERO_DATA } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-12 px-4 border-t border-tech-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold text-white tracking-wider uppercase">{HERO_DATA.name}</h2>
          <p className="text-zinc-500 text-xs mt-1 font-mono uppercase">Computational Mechanical Design</p>
        </div>

        <div className="flex gap-6">
          <a 
            href={HERO_DATA.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-500 hover:text-tech-blue transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin size={20} />
          </a>
          <a 
            href={`mailto:${HERO_DATA.email}`} 
            className="text-zinc-500 hover:text-engineering-orange transition-colors"
            title="Send Email"
          >
            <Mail size={20} />
          </a>
        </div>

        <div className="text-zinc-600 text-[10px] text-center md:text-right font-mono">
          <p>&copy; {new Date().getFullYear()} {HERO_DATA.name}.</p>
          <p>System: React + Tailwind.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
