import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Download, Mail, Github, Linkedin, MapPin } from 'lucide-react';
import Blobs from './Blobs';
import Counter from './Counter';
import siteData from '../data/siteData.json';

const RESUME_FILE = 'Ammad-Iftikhar-Full-Stack-Developer.pdf';
const photo = '/WhatsApp Image 2025-08-21 at 15.39.44_886ed721.jpg';

const statColors = [
  'text-grape dark:text-grape-light',
  'text-candy dark:text-candy-light',
  'text-sun dark:text-sun-light',
  'text-mint dark:text-mint-light',
];

const Hero: React.FC = () => {
  const roles: string[] = (siteData as { roles?: string[] }).roles ?? [siteData.role];
  const stats = (siteData as { stats?: { label: string; value: string }[] }).stats ?? [];
  const [ri, setRi] = useState(0);

  useEffect(() => {
    if (roles.length < 2) return;
    const id = window.setInterval(() => setRi((i) => (i + 1) % roles.length), 2600);
    return () => window.clearInterval(id);
  }, [roles.length]);

  // gentle mouse parallax for the photo block
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 120, damping: 20 });
  const spy = useSpring(py, { stiffness: 120, damping: 20 });
  const onParallax = (e: React.MouseEvent) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 18);
  };
  const resetParallax = () => {
    px.set(0);
    py.set(0);
  };

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const socials = [
    { href: `mailto:${siteData.contact.email}`, Icon: Mail, label: 'Email' },
    { href: siteData.contact.github, Icon: Github, label: 'GitHub' },
    { href: siteData.contact.linkedin, Icon: Linkedin, label: 'LinkedIn' },
  ];

  return (
    <section id="home" className="section relative min-h-screen overflow-hidden pt-28">
      <Blobs />

      <div className="container-p grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* text */}
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            👋 Hello, I&apos;m Ammad
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-5 font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl md:text-7xl"
          >
            Ammad
            <br />
            Iftikhar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-6 text-xl font-semibold text-ink/70 dark:text-slate-300 sm:text-2xl"
          >
            I&apos;m a{' '}
            <span className="marker">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[ri]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block font-extrabold text-ink dark:text-white"
                >
                  {roles[ri]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-ink/60 dark:text-slate-400"
          >
            {siteData.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <motion.button
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => go('projects')}
              className="btn-primary"
            >
              See my work
            </motion.button>
            <motion.a
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={siteData.contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              download={RESUME_FILE}
              className="btn-outline"
            >
              <Download size={16} />
              Download CV
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-7 flex items-center gap-3"
          >
            {socials.map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="icon-btn">
                <Icon size={18} />
              </a>
            ))}
            <span className="ml-1 inline-flex items-center gap-2 text-sm font-semibold text-ink/50 dark:text-slate-400">
              <MapPin size={15} className="text-candy" />
              {siteData.contact.location}
            </span>
          </motion.div>
        </div>

        {/* photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onMouseMove={onParallax}
          onMouseLeave={resetParallax}
          className="relative mx-auto w-[16rem] sm:w-[20rem] lg:w-full lg:max-w-sm"
        >
          <motion.div style={{ x: spx, y: spy }} className="absolute -inset-6 -z-10 mask-blob bg-gradient-to-br from-grape via-candy to-sun opacity-80 blur-2xl animate-blob-slow dark:opacity-60" />
          <div className="absolute -inset-3 -z-10 mask-blob border-2 border-dashed border-ink/20 dark:border-white/20 animate-spin-slow" />
          <motion.div
            style={{ x: spx, y: spy }}
            className="mask-blob overflow-hidden border-4 border-white shadow-pop dark:border-ink-card"
          >
            <img src={photo} alt="Ammad Iftikhar" className="aspect-square w-full object-cover" />
          </motion.div>

          {/* stickers */}
          <motion.div
            style={{ x: spx, y: spy }}
            className="card absolute -left-5 top-8 flex items-center gap-2 px-3 py-2 text-sm font-bold shadow-lg animate-float"
          >
            ⚡ <span className="text-ink/70 dark:text-slate-300">Full Stack</span>
          </motion.div>
          <motion.div
            style={{ x: spx, y: spy }}
            className="card absolute -right-4 bottom-10 flex items-center gap-2 px-3 py-2 text-sm font-bold shadow-lg animate-float"
          >
            🚀 <span className="text-ink/70 dark:text-slate-300">3+ yrs</span>
          </motion.div>
          <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border-2 border-white bg-mint px-4 py-1.5 text-sm font-bold text-white shadow-lg dark:border-ink-card">
            <span className="h-2 w-2 rounded-full bg-white" /> Open to work
          </div>
        </motion.div>
      </div>

      {/* stats */}
      {stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="container-p mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -4 }}
              className="card px-4 py-5 text-center"
            >
              <Counter
                value={s.value}
                className={`block font-display text-3xl font-extrabold ${statColors[i % statColors.length]}`}
              />
              <div className="mt-1 text-xs font-semibold text-ink/50 dark:text-slate-400">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <button
        onClick={() => go('about')}
        className="mx-auto mt-14 flex items-center gap-2 text-sm font-semibold text-ink/40 dark:text-slate-500"
        aria-label="Scroll down"
      >
        <span className="animate-float">
          <ArrowDown size={18} />
        </span>
        scroll
      </button>
    </section>
  );
};

export default Hero;
