import React from 'react';

const items = [
  'React.js', 'Next.js', 'TypeScript', 'Node.js', 'NestJS', 'Express',
  'PostgreSQL', 'MongoDB', 'MySQL', 'Socket.IO', 'GraphQL', 'Redux',
  'Tailwind CSS', 'Remix', 'Stripe', 'AWS S3', 'REST APIs', 'RBAC',
];

const Marquee: React.FC = () => (
  <div className="overflow-hidden border-y-2 border-ink/10 bg-white py-4 dark:border-white/10 dark:bg-ink-soft">
    <div className="flex w-max animate-marquee items-center gap-3 pause-hover">
      {[...items, ...items].map((t, i) => (
        <span
          key={i}
          className="flex items-center gap-3 whitespace-nowrap text-lg font-extrabold text-ink/30 dark:text-slate-600"
        >
          {t}
          <span className="text-grape">✦</span>
        </span>
      ))}
    </div>
  </div>
);

export default Marquee;
