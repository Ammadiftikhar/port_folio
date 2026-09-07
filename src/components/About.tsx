import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Zap, Rocket } from 'lucide-react';
import siteData from '../data/siteData.json';
import SectionHeading from './SectionHeading';
import Blobs from './Blobs';
import Tilt from './Tilt';

const cards = [
  {
    icon: Code2,
    title: 'Clean, typed code',
    desc: 'Maintainable, well-typed TypeScript across the whole stack.',
    ring: 'group-hover:border-grape', badge: 'bg-grape/15 text-grape', shadow: 'hover:shadow-pop',
  },
  {
    icon: Server,
    title: 'Solid APIs',
    desc: 'REST & GraphQL with RBAC, auth, Stripe and AWS/S3 integrations.',
    ring: 'group-hover:border-candy', badge: 'bg-candy/15 text-candy', shadow: 'hover:shadow-pop-candy',
  },
  {
    icon: Zap,
    title: 'Real-time & fast',
    desc: 'Socket.IO messaging, optimized queries and snappy responsive UIs.',
    ring: 'group-hover:border-sun', badge: 'bg-sun/15 text-sun', shadow: 'hover:shadow-pop-sun',
  },
  {
    icon: Rocket,
    title: 'Ships end to end',
    desc: 'Production features delivered across frontend and backend with teams.',
    ring: 'group-hover:border-mint', badge: 'bg-mint/15 text-mint', shadow: 'hover:shadow-pop-mint',
  },
];

const About: React.FC = () => {
  const sentences = (siteData.summary ?? '').split('. ').map((s) => s.trim()).filter(Boolean);

  return (
    <section id="about" className="section overflow-hidden">
      <Blobs items={[{ color: 'sky2', className: 'right-[-10rem] top-10 h-72 w-72' }]} />
      <div className="container-p">
        <SectionHeading
          eyebrow="about me"
          accent="sky2"
          title={
            <>
              A developer who loves <span className="text-grad">building things</span>
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {sentences.map((s, i) => (
              <p key={i} className="text-base leading-relaxed text-ink/70 dark:text-slate-300 sm:text-lg">
                {s}
                {i < sentences.length - 1 ? '.' : ''}
              </p>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Islamabad, PK', '3+ years', 'English / Urdu', 'Available'].map((p) => (
                <span key={p} className="pill">{p}</span>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Tilt max={6} className={`card card-pop group h-full p-5 [transform-style:preserve-3d] ${c.ring} ${c.shadow}`}>
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${c.badge}`}>
                    <c.icon size={20} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60 dark:text-slate-400">{c.desc}</p>
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
