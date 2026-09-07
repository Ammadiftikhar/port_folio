import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Languages } from 'lucide-react';
import siteData from '../data/siteData.json';
import SectionHeading from './SectionHeading';

const Education: React.FC = () => {
  const education =
    (siteData as {
      education?: { institution: string; degree: string; period: string; location: string }[];
    }).education ?? [];
  const languages = (siteData as { languages?: string[] }).languages ?? [];

  return (
    <section id="education" className="section overflow-hidden">
      <div className="container-p">
        <SectionHeading
          eyebrow="learning"
          accent="sun"
          title={
            <>
              Academic <span className="text-grad">background</span>
            </>
          }
        />

        <div className="grid gap-5 md:grid-cols-2">
          {education.map((item, i) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="card card-pop p-6"
            >
              <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${i === 0 ? 'bg-grape/15 text-grape' : 'bg-candy/15 text-candy'}`}>
                <GraduationCap size={20} />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold leading-snug">{item.institution}</h3>
              <p className="mt-1 font-semibold text-grape dark:text-grape-light">{item.degree}</p>
              <p className="mt-2 text-sm font-semibold text-ink/45 dark:text-slate-500">
                {item.period} · {item.location}
              </p>
            </motion.div>
          ))}

          {languages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="card p-6 md:col-span-2"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint/15 text-mint">
                  <Languages size={20} />
                </span>
                <h3 className="font-display text-lg font-bold">Languages</h3>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {languages.map((l) => (
                  <span key={l} className="pill">{l}</span>
                ))}
                <span className="text-sm text-ink/45 dark:text-slate-500">— professional working proficiency</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Education;
