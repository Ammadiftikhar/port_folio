import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Cloud } from 'lucide-react';
import siteData from '../data/siteData.json';
import SectionHeading from './SectionHeading';
import Blobs from './Blobs';

const catStyle = [
  { icon: Layout, badge: 'bg-grape/15 text-grape', bar: 'from-grape to-grape-light' },
  { icon: Server, badge: 'bg-candy/15 text-candy', bar: 'from-candy to-candy-light' },
  { icon: Database, badge: 'bg-sun/15 text-sun', bar: 'from-sun to-sun-light' },
  { icon: Cloud, badge: 'bg-mint/15 text-mint', bar: 'from-mint to-mint-light' },
];

const Skills: React.FC = () => {
  const entries = Object.entries(siteData.skills);
  const learning = ['Next.js', 'NestJS', 'GraphQL', 'WebSockets', 'AWS', 'Docker'];

  return (
    <section id="skills" className="section overflow-hidden bg-white dark:bg-ink-soft">
      <Blobs items={[{ color: 'mint', className: 'left-[-8rem] bottom-10 h-72 w-72' }]} />
      <div className="container-p">
        <SectionHeading
          eyebrow="my toolkit"
          accent="mint"
          title={
            <>
              Tech I <span className="text-grad">build with</span>
            </>
          }
          subtitle="The stack I reach for to take a product from idea to production."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map(([category, skills], ci) => {
            const s = catStyle[ci % catStyle.length];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: ci * 0.08 }}
                className="card card-pop p-5"
              >
                <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${s.badge}`}>
                  <s.icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-base font-bold">{category}</h3>
                <div className="mt-4 space-y-3">
                  {skills.map((sk, si) => {
                    const val = Math.max(0, Math.min(10, Number(sk.level ?? 0)));
                    return (
                      <div key={sk.name}>
                        <div className="mb-1 flex items-center justify-between text-xs font-semibold">
                          <span className="text-ink/70 dark:text-slate-300">{sk.name}</span>
                          <span className="text-ink/40 dark:text-slate-500">{val}/10</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-ink/10 dark:bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${val * 10}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: si * 0.05, ease: 'easeOut' }}
                            className={`h-full rounded-full bg-gradient-to-r ${s.bar}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="card mt-6 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 className="font-display text-lg font-bold">Currently exploring 🧪</h3>
            <p className="mt-1 text-sm text-ink/55 dark:text-slate-400">Always leveling up — next on the list.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {learning.map((t) => (
              <span key={t} className="pill">{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
