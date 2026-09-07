import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Lock, Check } from 'lucide-react';
import ProjectImage from './ProjectImage';

interface Project {
  id: number;
  name: string;
  category: string;
  stack: string[];
  summary: string;
  image: string;
  features: string[];
  github: string;
  demo: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;
  const hasDemo = !!project.demo && project.demo !== '#';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-4xl border-2 border-ink/10 bg-white dark:border-white/10 dark:bg-ink-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30 bg-ink/50 text-white backdrop-blur-sm transition-transform hover:rotate-90"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="overflow-y-auto">
              <div className="relative aspect-[16/9] overflow-hidden">
                <ProjectImage src={project.image} alt={project.name} name={project.name} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm">
                    {project.category}
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">{project.name}</h2>
                </div>
              </div>

              <div className="space-y-7 p-6 sm:p-8">
                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink/40 dark:text-slate-500">Overview</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70 dark:text-slate-300">{project.summary}</p>
                </div>

                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink/40 dark:text-slate-500">Highlights</h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {project.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 rounded-2xl bg-ink/[0.03] p-3 text-sm text-ink/70 dark:bg-white/5 dark:text-slate-300">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mint/20 text-mint">
                          <Check size={11} />
                        </span>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-ink/40 dark:text-slate-500">Stack</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <span key={t} className="pill">{t}</span>
                    ))}
                  </div>
                </div>

                <div>
                  {hasDemo ? (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      <ExternalLink size={16} /> Visit live demo
                    </a>
                  ) : (
                    <span className="btn-outline cursor-default opacity-70">
                      <Lock size={16} /> Private / client project
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
