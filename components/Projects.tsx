
import React, { useState, useMemo } from 'react';
import { PROJECTS_DATA } from '../constants';
import { Project } from '../types';
import { X, Maximize2, Filter, Image as ImageIcon } from 'lucide-react';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  // Extract unique categories from projects
  const categories = useMemo(() => {
    const cats = new Set(PROJECTS_DATA.map(p => p.category));
    return ['ALL', ...Array.from(cats)];
  }, []);

  const filteredProjects = activeFilter === 'ALL' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === activeFilter);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  const getAllProjectImages = (project: Project) => {
      return [project.imageUrl, ...(project.gallery || [])];
  };

  return (
    <section id="projects" className="py-10 px-4 bg-tech-base transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between border-b border-tech-border pb-2 gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tech-blue"></span>
            <h2 className="text-lg font-bold text-tech-text-main uppercase tracking-tight">Selected Works</h2>
            <span className="text-tech-text-sub font-mono text-xs ml-2">/// DB_ACCESS_LEVEL_1</span>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
             <Filter size={14} className="text-tech-text-sub mr-2 flex-shrink-0" />
             {categories.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveFilter(cat)}
                 className={`
                   px-3 py-1 text-[10px] font-mono uppercase tracking-wider border transition-all whitespace-nowrap
                   ${activeFilter === cat 
                     ? 'bg-tech-blue text-white border-tech-blue' 
                     : 'bg-tech-surface text-tech-text-sub border-tech-border hover:border-tech-text-sub hover:text-tech-text-main'}
                 `}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        {/* High density grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              className="group cursor-pointer bg-tech-surface border border-tech-border hover:border-tech-blue transition-all duration-200 flex flex-col h-full hover:bg-tech-highlight/50 shadow-sm"
            >
              <div className="relative h-32 overflow-hidden bg-black border-b border-tech-border">
                <div className="absolute inset-0 bg-tech-blue/5 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay"></div>
                
                {/* Category Label Overlay */}
                <div className="absolute top-0 left-0 z-20 bg-tech-surface/90 backdrop-blur-sm px-2 py-0.5 border-b border-r border-tech-border">
                    <span className="text-[8px] font-mono text-tech-blue uppercase">{project.category}</span>
                </div>

                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                
                {/* Multiple Images Indicator */}
                {project.gallery && project.gallery.length > 0 && (
                    <div className="absolute bottom-1 right-1 z-20 bg-black/60 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <ImageIcon size={10} className="text-white" />
                        <span className="text-[9px] text-white font-mono">{project.gallery.length + 1}</span>
                    </div>
                )}

                <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={14} className="text-white drop-shadow-md" />
                </div>
              </div>
              
              <div className="p-3 flex flex-col flex-1">
                <div className="mb-2">
                    <h3 className="text-xs font-bold text-tech-text-main group-hover:text-tech-blue transition-colors uppercase truncate">
                        {project.title}
                    </h3>
                    <p className="text-tech-text-sub text-[10px] mt-1 line-clamp-2 leading-tight font-mono">
                        {project.subtitle}
                    </p>
                </div>
                
                <div className="mt-auto pt-2 border-t border-tech-border flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[9px] font-mono text-tech-text-sub bg-tech-base px-1 py-px border border-tech-border">
                        {tag}
                        </span>
                    ))}
                    {project.tags.length > 2 && <span className="text-[9px] font-mono text-tech-text-sub px-1 py-px">+{project.tags.length - 2}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="bg-tech-base border border-tech-border w-full max-w-5xl max-h-[90vh] overflow-hidden relative z-10 shadow-2xl animate-fade-in-up flex flex-col md:flex-row">
            
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors z-40 bg-black/50 p-1.5 rounded-full hover:bg-tech-blue"
            >
              <X size={18} />
            </button>

            {/* Left Panel: Images Scroll View */}
            <div className="w-full md:w-5/12 bg-black border-b md:border-b-0 md:border-r border-tech-border relative flex flex-col overflow-hidden">
                <div className="w-full h-full overflow-y-auto slim-scrollbar flex flex-col gap-0.5 bg-zinc-950">
                    {getAllProjectImages(selectedProject).map((img, idx) => (
                        <div key={idx} className="relative w-full shrink-0 group">
                            <img 
                                src={img} 
                                alt={`${selectedProject.title} view ${idx + 1}`} 
                                className="w-full h-auto object-contain block min-h-[200px]" 
                            />
                            {/* Individual Figure Label */}
                            <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 border border-white/10 rounded-sm">
                                <span className="text-[9px] text-white font-mono uppercase tracking-widest">
                                    Fig. {idx + 1}
                                </span>
                            </div>
                        </div>
                    ))}
                    {/* Spacer to ensure last image isn't covered by the floating badge */}
                    {getAllProjectImages(selectedProject).length > 1 && <div className="h-12 w-full shrink-0"></div>}
                </div>

                {/* Floating Badge indicating multiple images */}
                {getAllProjectImages(selectedProject).length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-tech-blue/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 z-20 shadow-lg pointer-events-none">
                        <span className="text-[9px] text-white font-mono uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                            {getAllProjectImages(selectedProject).length} Figures / Scroll View
                        </span>
                    </div>
                )}
            </div>

            {/* Right Panel: Content */}
            <div className="w-full md:w-7/12 flex flex-col overflow-y-auto max-h-[50vh] md:max-h-[90vh] bg-tech-base slim-scrollbar">
                <div className="p-6 md:p-8">
                    <div className="mb-6 border-b border-tech-border pb-4">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-engineering-orange font-mono text-[10px] tracking-widest uppercase block">
                                Project Analysis
                            </span>
                            <span className="text-tech-text-sub font-mono text-[10px] uppercase">
                                // {selectedProject.category}
                            </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-tech-text-main mb-1 uppercase tracking-tight">{selectedProject.title}</h2>
                        <h3 className="text-sm text-tech-blue font-mono">{selectedProject.subtitle}</h3>
                    </div>

                    <div className="space-y-8 flex-1">
                        {/* Key Highlights (Mixed: Text or Numbers) */}
                        {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                            <div className="grid grid-cols-3 gap-3">
                                {selectedProject.highlights.map((item, i) => (
                                    <div key={i} className="bg-tech-surface p-2 border border-tech-border border-l-2 border-l-tech-blue flex flex-col justify-between">
                                        <div className={`font-bold text-tech-text-main font-mono leading-tight ${item.value.length > 7 ? 'text-xs pt-1' : 'text-lg'}`}>
                                            {item.value}
                                        </div>
                                        <div className="text-[9px] text-tech-text-sub uppercase tracking-wider mt-1">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Description */}
                        <div>
                            <h4 className="text-[10px] font-bold text-tech-text-sub uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="w-1 h-3 bg-zinc-400 dark:bg-zinc-600"></span>
                                Overview
                            </h4>
                            <p className="text-tech-text-main text-xs md:text-sm leading-6 text-justify border-l border-tech-border pl-3">
                                {selectedProject.details}
                            </p>
                        </div>
                        
                        {/* Methodology - Extra Info Section */}
                        {selectedProject.methodology && (
                            <div>
                                <h4 className="text-[10px] font-bold text-tech-text-sub uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-1 h-3 bg-zinc-400 dark:bg-zinc-600"></span>
                                    Methodology
                                </h4>
                                <p className="text-tech-text-main text-xs md:text-sm leading-6 text-justify border-l border-tech-border pl-3">
                                    {selectedProject.methodology}
                                </p>
                            </div>
                        )}

                        {/* Tech Stack */}
                        <div>
                            <h4 className="text-[10px] font-bold text-tech-text-sub uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="w-1 h-3 bg-zinc-400 dark:bg-zinc-600"></span>
                                Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                                {selectedProject.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-1 bg-tech-surface text-tech-text-sub text-[10px] border border-tech-border hover:border-tech-text-main transition-colors font-mono">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
