import React from 'react';
import { motion } from 'framer-motion';

type Accent = 'grape' | 'candy' | 'sun' | 'mint' | 'sky2';

const dot: Record<Accent, string> = {
  grape: 'bg-grape',
  candy: 'bg-candy',
  sun: 'bg-sun',
  mint: 'bg-mint',
  sky2: 'bg-sky2',
};

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  accent?: Accent;
  align?: 'left' | 'center';
}

const SectionHeading: React.FC<Props> = ({
  eyebrow,
  title,
  subtitle,
  accent = 'grape',
  align = 'left',
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.5 }}
    className={`mb-12 ${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}
  >
    <span className="eyebrow">
      <span className={`h-2 w-2 rounded-full ${dot[accent]}`} />
      {eyebrow}
    </span>
    <h2 className="h-section mt-5">{title}</h2>
    {subtitle && (
      <p className="mt-4 text-base text-ink/60 dark:text-slate-400 sm:text-lg">{subtitle}</p>
    )}
  </motion.div>
);

export default SectionHeading;
