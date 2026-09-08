import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Cloud, Sparkles, CheckCircle2 } from 'lucide-react';
import siteData from '../data/siteData.json';
import SectionHeading from './SectionHeading';
import Blobs from './Blobs';
import Tilt from './Tilt';

const catStyle = [
  { icon: Layout, badge: 'bg-grape/15 text-grape', bar: 'from-grape via-grape to-candy' },
  { icon: Server, badge: 'bg-candy/15 text-candy', bar: 'from-candy via-candy to-sun' },
  { icon: Database, badge: 'bg-sun/15 text-sun', bar: 'from-sun via-sun to-mint' },
  { icon: Cloud, badge: 'bg-mint/15 text-mint', bar: 'from-mint via-mint to-sky2' },
];

const Skills: React.FC = () => {
  const entries = Object.entries(siteData.skills);
  const learning = ['Next.js App Router', 'NestJS Microservices', 'GraphQL & Apollo', 'WebSockets / Socket.IO', 'AWS S3 & Cloud Architecture', 'Docker & CI/CD'];

  return (
    <section id="skills" className="section overflow-hidden bg-white/70 dark:bg-ink-soft/60">
      <Blobs items={[{ color: 'mint', className: 'left-[-8rem] bottom-10 h-80 w-80' }]} />
      <div className="container-p">
        <SectionHeading
          eyebrow="technical stack"
          accent="mint"
          title={
            <>
              Technologies &amp; <span className="text-grad">tools</span>
            </>
          }
          subtitle="Battle-tested technologies I leverage daily to engineer full-stack web applications."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map(([category, skills], ci) => {
            const s = catStyle[ci % catStyle.length];
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: ci * 0.08 }}
              >
                <Tilt max={5} className="card card-pop p-6 h-full flex flex-col justify-between border border-ink/10 dark:border-white/10">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${s.badge} shrink-0`}>
                        <s.icon size={20} />
                      </span>
                      <h3 className="font-display text-base font-bold text-ink dark:text-white">{category}</h3>
                    </div>

                    <div className="mt-6 space-y-4">
                      {skills.map((sk, si) => {
                        const val = Math.max(0, Math.min(10, Number(sk.level ?? 0)));
                        const pct = val * 10;
                        return (
                          <div key={sk.name}>
                            <div className="mb-1.5 flex items-center justify-between text-xs font-extrabold">
                              <span className="text-ink/80 dark:text-slate-200">{sk.name}</span>
                              <span className="text-ink/50 dark:text-slate-400 font-mono">{pct}%</span>
                            </div>
                            <div className="h-2.5 overflow-hidden rounded-full bg-ink/8 dark:bg-white/10 p-0.5">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${pct}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: si * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                className={`h-full rounded-full bg-gradient-to-r ${s.bar}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>

        {/* Currently Exploring Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card mt-8 p-6 sm:p-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border border-ink/10 dark:border-white/10"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-grape/15 text-grape shrink-0">
              <Sparkles size={22} className="animate-spin-slow" />
            </span>
            <div>
              <h3 className="font-display text-lg font-bold">Currently Expanding Knowledge 🧪</h3>
              <p className="mt-1 text-sm text-ink/60 dark:text-slate-400">Continuous skill mastery and architectural exploration.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {learning.map((t) => (
              <span key={t} className="pill font-extrabold text-xs">
                <CheckCircle2 size={12} className="text-mint mr-1.5" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

