import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Zap, Rocket, Shield, Layers, Workflow, Terminal } from 'lucide-react';
import siteData from '../data/siteData.json';
import SectionHeading from './SectionHeading';
import Blobs from './Blobs';
import Tilt from './Tilt';

const cards = [
  {
    icon: Code2,
    title: 'Clean & Typed Frontend',
    desc: 'Scalable React, Next.js & Remix UIs with strict TypeScript, responsive layouts, and fluid Framer Motion animations.',
    ring: 'group-hover:border-grape', badge: 'bg-grape/15 text-grape', shadow: 'hover:shadow-pop',
  },
  {
    icon: Server,
    title: 'Robust Backend APIs',
    desc: 'RESTful & GraphQL microservices built with Node.js & NestJS, featuring RBAC, JWT auth, Stripe, and AWS integrations.',
    ring: 'group-hover:border-candy', badge: 'bg-candy/15 text-candy', shadow: 'hover:shadow-pop-candy',
  },
  {
    icon: Zap,
    title: 'Real-Time & Low Latency',
    desc: 'High-performance WebSockets via Socket.IO, database indexing (PostgreSQL, MySQL, MongoDB), and fast API payloads.',
    ring: 'group-hover:border-sun', badge: 'bg-sun/15 text-sun', shadow: 'hover:shadow-pop-sun',
  },
  {
    icon: Rocket,
    title: 'Production Ready & Agile',
    desc: '3+ years of experience delivering full-stack platforms from architectural design to deployment & production monitoring.',
    ring: 'group-hover:border-mint', badge: 'bg-mint/15 text-mint', shadow: 'hover:shadow-pop-mint',
  },
];

const highlights = [
  { icon: Terminal, text: 'Islamabad, Pakistan' },
  { icon: Shield, text: '3+ Years Full-Stack Experience' },
  { icon: Workflow, text: 'Full Lifecycle Development' },
  { icon: Layers, text: 'English & Urdu Proficient' },
];

const About: React.FC = () => {
  const sentences = (siteData.summary ?? '').split('. ').map((s) => s.trim()).filter(Boolean);

  return (
    <section id="about" className="section overflow-hidden">
      <Blobs items={[{ color: 'sky2', className: 'right-[-10rem] top-10 h-80 w-80' }]} />
      <div className="container-p">
        <SectionHeading
          eyebrow="about me"
          accent="sky2"
          title={
            <>
              Crafting production web systems <br />
              with <span className="text-grad">precision &amp; purpose</span>
            </>
          }
          subtitle="Combining full-stack software engineering with modern visual interaction standards."
        />

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          {/* Bio Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <div className="card p-6 sm:p-8 space-y-4 border border-ink/10 dark:border-white/10">
              {sentences.map((s, i) => (
                <p key={i} className="text-base leading-relaxed text-ink/75 dark:text-slate-300 sm:text-lg">
                  {s}
                  {i < sentences.length - 1 ? '.' : ''}
                </p>
              ))}
            </div>

            {/* Key Quick Facts Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {highlights.map(({ icon: Icon, text }) => (
                <div key={text} className="card p-3.5 flex items-center gap-3 border border-ink/10 dark:border-white/10">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-grape/15 text-grape">
                    <Icon size={17} />
                  </span>
                  <span className="text-xs font-bold text-ink/80 dark:text-slate-200">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Core Competencies Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Tilt max={7} className={`card card-pop group h-full p-6 [transform-style:preserve-3d] border border-ink/10 dark:border-white/10 ${c.ring} ${c.shadow}`}>
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.badge} transition-transform group-hover:scale-110`}>
                    <c.icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold group-hover:text-grape dark:group-hover:text-grape-light transition-colors">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65 dark:text-slate-400">{c.desc}</p>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

