import React, { useState } from 'react';
import { Mail, MapPin, Terminal, Phone, Copy, Check } from 'lucide-react';
import { HERO_DATA } from '../constants';

const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(HERO_DATA.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-12 md:py-16 flex flex-col items-center justify-center overflow-hidden border-b border-tech-border bg-tech-base transition-colors duration-300">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg bg-grid-pattern opacity-10 pointer-events-none"></div>

      <div className="z-10 w-full max-w-7xl px-4">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          
          {/* Left Block: Identity */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <Terminal size={14} className="text-engineering-orange" />
                <h2 className="text-engineering-orange font-mono tracking-widest text-xs">
                    SYSTEM_ONLINE
                </h2>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-tech-text-main uppercase mb-2">
              {HERO_DATA.name}
            </h1>
            
            <p className="text-lg text-tech-blue font-mono font-medium">
              {HERO_DATA.title}
            </p>
            
            <p className="text-tech-text-sub text-sm max-w-xl mt-4 leading-relaxed">
              {HERO_DATA.tagline}
            </p>
          </div>

          {/* Right Block: Contact / Data */}
          <div className="flex flex-col gap-3 md:text-right bg-tech-surface p-4 border border-tech-border rounded-sm w-full md:w-auto min-w-[280px] shadow-sm">
            {/* Location */}
            <div className="flex items-center md:justify-end gap-3 text-sm text-tech-text-sub">
                <span className="text-tech-text-sub/70 font-mono text-xs uppercase">Loc</span>
                <span className="flex items-center gap-2">
                    {HERO_DATA.location}
                    <MapPin size={14} className="text-tech-blue" />
                </span>
            </div>
            
            <div className="h-px bg-tech-border w-full"></div>
            
            {/* Email */}
            <div className="flex items-center md:justify-end gap-3 text-sm text-tech-text-sub">
                <span className="text-tech-text-sub/70 font-mono text-xs uppercase">Mail</span>
                <a href={`mailto:${HERO_DATA.email}`} className="flex items-center gap-2 hover:text-tech-text-main transition-colors">
                    {HERO_DATA.email}
                    <Mail size={14} className="text-tech-blue" />
                </a>
            </div>

            <div className="h-px bg-tech-border w-full"></div>

            {/* Phone */}
            <div className="flex items-center md:justify-end gap-3 text-sm text-tech-text-sub">
                <span className="text-tech-text-sub/70 font-mono text-xs uppercase">Tel</span>
                <div className="flex items-center gap-2">
                    <span className="font-mono tracking-wide">{HERO_DATA.phone}</span>
                    <button 
                        onClick={handleCopyPhone}
                        className="p-1 hover:bg-tech-highlight rounded transition-colors group relative"
                        title="Copy to clipboard"
                    >
                        {copied ? (
                            <Check size={14} className="text-green-500" />
                        ) : (
                            <Copy size={14} className="text-tech-blue group-hover:text-tech-text-main" />
                        )}
                    </button>
                    <a href={`tel:${HERO_DATA.phone}`} className="md:hidden">
                        <Phone size={14} className="text-tech-blue" />
                    </a>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;