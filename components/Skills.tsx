import React from 'react';
import { SKILLS_DATA } from '../constants';
import { Cpu, PenTool, Code2 } from 'lucide-react';

const Skills: React.FC = () => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <Cpu className="text-tech-blue" size={20} />;
      case 1: return <PenTool className="text-engineering-orange" size={20} />;
      case 2: return <Code2 className="text-emerald-500" size={20} />;
      default: return <Cpu className="text-tech-text-sub" size={20} />;
    }
  };

  return (
    <section className="py-8 px-4 bg-tech-surface border-b border-tech-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
             <div className="h-4 w-1 bg-engineering-orange"></div>
             <h2 className="text-lg font-bold text-tech-text-main uppercase tracking-tight">Technical Arsenal</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SKILLS_DATA.map((category, idx) => (
            <div key={idx} className="bg-tech-base p-4 border border-tech-border hover:border-tech-blue/50 transition-colors shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-tech-border/50 pb-2">
                 <div className="flex items-center gap-2">
                     {getIcon(idx)}
                     <h3 className="text-sm font-bold text-tech-text-main uppercase tracking-wider">
                        {category.title}
                     </h3>
                 </div>
                 <span className="text-tech-text-sub font-mono text-[10px]">0{idx + 1}</span>
              </div>
              
              <ul className="grid grid-cols-1 gap-1.5">
                {category.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="text-tech-text-sub text-xs font-mono flex items-center gap-2">
                    <span className="w-0.5 h-0.5 bg-tech-text-sub"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;