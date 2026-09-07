import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Lock, ExternalLink, Github } from 'lucide-react';
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
    timer.current = window.setTimeout(() => setStickerId(null), 1500) as unknown as number;
  };

  return (
    <>
      <section id="projects" className="section overflow-hidden bg-white dark:bg-ink-soft">
        <div className="container-p">
          <SectionHeading
            eyebrow="my work"
            accent="candy"
            title={
              <>
                Things I&apos;ve <span className="text-grad">shipped</span>
              </>
            }
            subtitle="Full-stack products across AI/legal-tech, sports management, booking and business operations."
          />

          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <motion.button
                key={c}
                onClick={() => setFilter(c)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.94 }}
                className={`relative overflow-hidden rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                  filter === c
                    ? 'border-transparent text-white'
                    : 'border-ink/10 text-ink/60 hover:border-grape hover:text-grape dark:border-white/10 dark:text-slate-400'
                }`}
              >
                {filter === c && (
                  <motion.span
                    layoutId="filter-blob"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-grape to-candy"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{c}</span>
              </motion.button>
            ))}
          </div>

          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((project, i) => {
                const t = themes[i % themes.length];
                const hasDemo = !!project.demo && project.demo !== '#';
                return (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                  >
                  <Tilt
                    max={5}
                    onClick={() => setSelected(project)}
                    className={`card card-pop group flex h-full cursor-pointer flex-col overflow-hidden border-2 [transform-style:preserve-3d] ${t.border} ${t.shadow}`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <ProjectImage
                        src={project.image}
                        alt={project.name}
                        name={project.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute right-3 top-3 flex gap-1.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); flash(project.id); }}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white backdrop-blur-sm"
                          aria-label="Private repo"
                        >
                          <Lock size={13} />
                        </button>
                        {hasDemo && (
                          <button
                            onClick={(e) => { e.stopPropagation(); window.open(project.demo, '_blank', 'noopener,noreferrer'); }}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/45 text-white backdrop-blur-sm"
                            aria-label="Live demo"
                          >
                            <ExternalLink size={13} />
                          </button>
                        )}
                      </div>
                      <AnimatePresence>
                        {stickerId === project.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, rotate: -4 }}
                            animate={{ opacity: 1, y: 0, rotate: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute left-3 top-3 rounded-full border-2 border-white bg-ink px-3 py-1 text-xs font-bold text-white"
                          >
                            🔒 private · client work
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${t.pill}`}>
                          {project.category}
                        </span>
                        <ArrowUpRight
                          size={18}
                          className="text-ink/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-grape dark:text-slate-600"
                        />
                      </div>
                      <h3 className="mt-3 font-display text-xl font-bold">{project.name}</h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink/60 dark:text-slate-400">
                        {project.summary}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 4).map((s) => (
                          <span key={s} className="pill text-[11px]">{s}</span>
                        ))}
                        {project.stack.length > 4 && (
                          <span className="pill text-[11px]">+{project.stack.length - 4}</span>
                        )}
                      </div>
                    </div>
                  </Tilt>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          <div className="mt-12">
            <a href={siteData.contact.github} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Github size={16} />
              More on GitHub
            </a>
          </div>
        </div>
      </section>

      <ProjectModal project={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default Projects;
