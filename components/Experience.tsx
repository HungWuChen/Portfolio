import React from 'react';
import { EXPERIENCE_DATA } from '../constants';

const Experience: React.FC = () => {
  return (
    <section className="py-10 px-4 bg-tech-base border-t border-tech-border transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-lg font-bold text-tech-text-main uppercase tracking-tight">Experience</h2>
          <div className="h-px bg-tech-border flex-1"></div>
        </div>

        {/* Compact Vertical Stack */}
        <div className="flex flex-col gap-4">
          {EXPERIENCE_DATA.map((exp) => (
            <div key={exp.id} className="group relative border-l-2 border-tech-border pl-4 py-1 hover:border-tech-blue transition-colors duration-300">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                <h3 className="text-sm font-bold text-tech-text-main uppercase tracking-tight">{exp.role}</h3>
                <span className="font-mono text-engineering-orange text-[10px] whitespace-nowrap">{exp.period}</span>
              </div>
              
              <div className="text-xs text-tech-blue font-medium mb-1.5">{exp.company}</div>
              
              <p className="text-tech-text-sub text-xs leading-relaxed max-w-3xl">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;