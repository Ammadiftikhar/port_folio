import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Languages, Award, CheckCircle2 } from 'lucide-react';
import siteData from '../data/siteData.json';
import SectionHeading from './SectionHeading';
import Tilt from './Tilt';

const Education: React.FC = () => {
  const education =
    (siteData as {
      education?: { institution: string; degree: string; period: string; location: string }[];
    }).education ?? [];
  const languages = (siteData as { languages?: string[] }).languages ?? [];

  return (
    <section id="education" className="section overflow-hidden bg-white/50 dark:bg-ink-soft/40">
      <div className="container-p">
        <SectionHeading
          eyebrow="academic background"
          accent="sun"
          title={
            <>
              Education &amp; <span className="text-grad">qualifications</span>
            </>
          }
          subtitle="Computer Science foundation and continuous learning journey."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((item, i) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Tilt max={5} className="card card-pop p-6 sm:p-8 h-full flex flex-col justify-between border border-ink/10 dark:border-white/10">
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${i === 0 ? 'bg-grape/15 text-grape' : 'bg-candy/15 text-candy'}`}>
                      <GraduationCap size={22} />
                    </span>
                    <span className="pill text-xs font-bold font-mono">{item.period}</span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-bold leading-snug text-ink dark:text-white">
                    {item.institution}
                  </h3>
                  <p className="mt-2 text-base font-extrabold text-grape dark:text-grape-light">
                    {item.degree}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-ink/5 dark:border-white/5 text-xs font-bold text-ink/60 dark:text-slate-400">
                  📍 {item.location}
                </div>
              </Tilt>
            </motion.div>
          ))}

          {languages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2"
            >
              <div className="card p-6 sm:p-8 border border-ink/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint/15 text-mint shrink-0">
                    <Languages size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">Languages &amp; Communication</h3>
                    <p className="text-xs text-ink/60 dark:text-slate-400">Professional working proficiency for international teams.</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {languages.map((l) => (
                    <span key={l} className="pill text-xs font-bold px-4 py-2 bg-grape/10 text-grape dark:bg-white/10 dark:text-white">
                      <CheckCircle2 size={13} className="mr-1.5 text-mint inline" />
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;

