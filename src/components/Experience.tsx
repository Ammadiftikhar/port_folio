import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import siteData from '../data/siteData.json';
import SectionHeading from './SectionHeading';

const dotColors = ['bg-grape', 'bg-candy', 'bg-sun', 'bg-mint'];

const Experience: React.FC = () => (
  <section id="experience" className="section overflow-hidden">
    <div className="container-p">
      <SectionHeading
        eyebrow="my path"
        accent="grape"
        title={
          <>
            Where I&apos;ve <span className="text-grad">worked</span>
          </>
        }
      />

      <div className="relative">
        <div className="absolute left-[9px] top-2 h-full w-1 rounded-full bg-gradient-to-b from-grape via-candy to-sun md:left-[11px]" />

        <div className="space-y-8">
          {siteData.experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-10 md:pl-14"
            >
              <span
                className={`absolute left-0 top-1.5 h-5 w-5 rounded-full border-4 border-cream ${dotColors[i % dotColors.length]} dark:border-ink md:h-6 md:w-6`}
              />
              <div className="card card-pop p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-grape/15 text-grape">
                    <Briefcase size={16} />
                  </span>
                  <h3 className="font-display text-lg font-bold">{exp.title}</h3>
                  <span className="text-lg font-bold text-grape">· {exp.company}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm font-semibold text-ink/50 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-candy" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-sun" />
                    {exp.location}
                  </span>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {exp.highlights.map((h, hi) => (
                    <li key={hi} className="flex gap-3 text-sm leading-relaxed text-ink/70 dark:text-slate-300">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-grape to-candy" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
