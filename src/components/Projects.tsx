import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Lock, ExternalLink, Github, Sparkles } from 'lucide-react';
import ProjectModal from './ProjectModal';
import ProjectImage from './ProjectImage';
import SectionHeading from './SectionHeading';
import Tilt from './Tilt';
import siteData from '../data/siteData.json';

type Project = (typeof siteData.projects)[number];

const themes = [
  { pill: 'bg-grape/15 text-grape', shadow: 'hover:shadow-pop', border: 'hover:border-grape' },
  { pill: 'bg-candy/15 text-candy', shadow: 'hover:shadow-pop-candy', border: 'hover:border-candy' },
  { pill: 'bg-sun/15 text-sun', shadow: 'hover:shadow-pop-sun', border: 'hover:border-sun' },
  { pill: 'bg-mint/15 text-mint', shadow: 'hover:shadow-pop-mint', border: 'hover:border-mint' },
  { pill: 'bg-sky2/15 text-sky2', shadow: 'hover:shadow-pop-sky', border: 'hover:border-sky2' },
];

const Projects: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [stickerId, setStickerId] = useState<number | null>(null);
  const timer = useRef<number | null>(null);

  const categories = ['All', ...Array.from(new Set(siteData.projects.map((p) => p.category)))];
  const [filter, setFilter] = useState('All');
  const list = filter === 'All' ? siteData.projects : siteData.projects.filter((p) => p.category === filter);

  const flash = (id: number) => {
    setStickerId(id);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStickerId(null), 2000) as unknown as number;
  };

  return (
    <>
      <section id="projects" className="section overflow-hidden bg-white/70 dark:bg-ink-soft/60">
        <div className="container-p">
          <SectionHeading
            eyebrow="my portfolio"
            accent="candy"
            title={
              <>
                Featured <span className="text-grad">production systems</span>
              </>
            }
            subtitle="Full-stack web applications delivered for AI/legal-tech, sports venues, booking portals & enterprise management."
          />

          {/* Filter Pills with Animated Blob Indicator */}
          <div className="mb-10 flex flex-wrap gap-2.5">
            {categories.map((c) => (
              <motion.button
                key={c}
                onClick={() => setFilter(c)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
                className={`relative rounded-full px-5 py-2.5 text-xs font-extrabold transition-colors ${
                  filter === c
                    ? 'text-white'
                    : 'border border-ink/10 bg-white/60 text-ink/70 hover:border-grape hover:text-grape dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
                }`}
              >
                {filter === c && (
                  <motion.span
                    layoutId="filter-active-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-grape via-grape to-candy shadow-md"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{c}</span>
              </motion.button>
            ))}
          </div>

          {/* Projects Card Grid */}
          <motion.div layout className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((project, i) => {
                const t = themes[i % themes.length];
                const hasDemo = !!project.demo && project.demo !== '#';
                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: (i % 3) * 0.07 }}
                  >
                    <Tilt
                      max={6}
                      onClick={() => setSelected(project)}
                      className={`card card-pop group flex h-full cursor-pointer flex-col overflow-hidden border border-ink/10 dark:border-white/10 [transform-style:preserve-3d] ${t.border} ${t.shadow}`}
                    >
                      {/* Image Container with Hover Zoom & Action Badges */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-ink/5 dark:bg-white/5">
                        <ProjectImage
                          src={project.image}
                          alt={project.name}
                          name={project.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                        />

                        {/* Top Action Overlay Buttons */}
                        <div className="absolute right-3 top-3 flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              flash(project.id);
                            }}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-ink/60 text-white backdrop-blur-md transition-transform hover:scale-110"
                            aria-label="Private project info"
                            title="Click for repository status"
                          >
                            <Lock size={14} />
                          </button>
                          {hasDemo && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.demo, '_blank', 'noopener,noreferrer');
                              }}
                              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-ink/60 text-white backdrop-blur-md transition-transform hover:scale-110"
                              aria-label="Live Demo link"
                              title="Visit Live Site"
                            >
                              <ExternalLink size={14} />
                            </button>
                          )}
                        </div>

                        {/* Private Repo Flash Tooltip */}
                        <AnimatePresence>
                          {stickerId === project.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -8, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -8, scale: 0.9 }}
                              className="absolute left-3 top-3 rounded-full border border-white/40 bg-ink/90 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-md shadow-lg"
                            >
                              🔒 Client / Proprietary Codebase
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Card Content Info */}
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider ${t.pill}`}>
                            {project.category}
                          </span>
                          <ArrowUpRight
                            size={20}
                            className="text-ink/30 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-grape dark:text-slate-500 dark:group-hover:text-grape-light"
                          />
                        </div>

                        <h3 className="mt-4 font-display text-xl font-bold group-hover:text-grape dark:group-hover:text-grape-light transition-colors">
                          {project.name}
                        </h3>

                        <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-ink/65 dark:text-slate-400">
                          {project.summary}
                        </p>

                        {/* Tech Stack Pills */}
                        <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-ink/5 dark:border-white/5">
                          {project.stack.slice(0, 4).map((s) => (
                            <span key={s} className="pill text-[11px]">
                              {s}
                            </span>
                          ))}
                          {project.stack.length > 4 && (
                            <span className="pill text-[11px] font-bold text-grape dark:text-grape-light">
                              +{project.stack.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </Tilt>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* GitHub CTA */}
          <div className="mt-14 text-center">
            <motion.a
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href={siteData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex items-center gap-2"
            >
              <Github size={18} />
              Explore More Repositories on GitHub
            </motion.a>
          </div>
        </div>
      </section>

      <ProjectModal project={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default Projects;

