import React from 'react';
import { motion } from 'framer-motion';

const itemsRow1 = [
  'React.js', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'Express.js',
  'PostgreSQL', 'MongoDB', 'MySQL', 'Socket.IO', 'GraphQL', 'Redux Toolkit',
];

const itemsRow2 = [
  'Tailwind CSS', 'Remix', 'Stripe Payments', 'AWS S3', 'REST APIs', 'RBAC Auth',
  'Microservices', 'Docker', 'WebSockets', 'Jest', 'Postman', 'Git & GitHub',
];

const Marquee: React.FC = () => (
  <div className="relative overflow-hidden border-y border-ink/10 bg-white/60 py-6 backdrop-blur-md dark:border-white/10 dark:bg-ink-soft/60">
    {/* Gradient side masks */}
    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream dark:from-ink to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream dark:from-ink to-transparent" />

    {/* Track 1: Leftward infinite scroll */}
    <div className="flex w-max animate-marquee items-center gap-4 pause-hover">
      {[...itemsRow1, ...itemsRow1, ...itemsRow1].map((t, i) => (
        <span
          key={`row1-${i}`}
          className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-sm font-extrabold text-ink/75 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
        >
          <span>{t}</span>
          <span className="text-grape">✦</span>
        </span>
      ))}
    </div>

    {/* Track 2: Rightward infinite scroll */}
    <div className="mt-3 flex w-max items-center gap-4 pause-hover" style={{ animation: 'marquee 36s linear infinite reverse' }}>
      {[...itemsRow2, ...itemsRow2, ...itemsRow2].map((t, i) => (
        <span
          key={`row2-${i}`}
          className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-sm font-extrabold text-ink/75 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
        >
          <span>{t}</span>
          <span className="text-candy">✦</span>
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;

