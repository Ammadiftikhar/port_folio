import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import siteData from '../data/siteData.json';
import SectionHeading from './SectionHeading';
import Tilt from './Tilt';

const dotColors = ['bg-grape shadow-grape/40', 'bg-candy shadow-candy/40', 'bg-sun shadow-sun/40', 'bg-mint shadow-mint/40'];

const Experience: React.FC = () => (
  <section id="experience" className="section overflow-hidden">
    <div className="container-p">
      <SectionHeading
        eyebrow="career path"
        accent="grape"
        title={
          <>
            Professional <span className="text-grad">experience</span>
          </>
        }
        subtitle="3+ years of hands-on full-stack development across startups, legal-tech, and client software solutions."
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Animated Gradient Timeline Vertical Line */}
        <div className="absolute left-[11px] top-3 h-[calc(100%-20px)] w-1 rounded-full bg-gradient-to-b from-grape via-candy to-sun opacity-70 md:left-[15px]" />

        <div className="space-y-10">
          {siteData.experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative pl-10 md:pl-16"
            >
              {/* Timeline Node Dot */}
              <span
                className={`absolute left-0 top-2.5 h-6 w-6 rounded-full border-4 border-cream ${dotColors[i % dotColors.length]} dark:border-ink shadow-lg ring-2 ring-white/50 dark:ring-white/10`}
              />

              <Tilt max={4} className="card card-pop p-6 sm:p-8 border border-ink/10 dark:border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-grape/15 text-grape shrink-0">
                      <Briefcase size={20} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink dark:text-white">{exp.title}</h3>
                      <span className="text-sm font-extrabold text-grape dark:text-grape-light">{exp.company}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-ink/60 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-candy/10 px-3 py-1 text-candy">
                      <Calendar size={13} />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sun/10 px-3 py-1 text-sun-dark dark:text-sun-light">
                      <MapPin size={13} />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 border-t border-ink/5 pt-4 dark:border-white/5">
                  {exp.highlights.map((h, hi) => (
                    <li key={hi} className="flex items-start gap-3 text-sm leading-relaxed text-ink/75 dark:text-slate-300">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-grape/15 text-grape">
                        <CheckCircle2 size={12} />
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;

