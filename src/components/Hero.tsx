import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, Download, Mail, Github, Linkedin, MapPin, Check, Copy, Sparkles, Code2, Server, Layers } from 'lucide-react';
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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (roles.length < 2) return;
    const id = window.setInterval(() => setRi((i) => (i + 1) % roles.length), 2600);
    return () => window.clearInterval(id);
  }, [roles.length]);

  // Gentle mouse parallax for photo container
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 140, damping: 20 });
  const spy = useSpring(py, { stiffness: 140, damping: 20 });

  const onParallax = (e: React.MouseEvent) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 22);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 22);
  };
  const resetParallax = () => {
    px.set(0);
    py.set(0);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const socials = [
    { href: `mailto:${siteData.contact.email}`, Icon: Mail, label: 'Email' },
    { href: siteData.contact.github, Icon: Github, label: 'GitHub' },
    { href: siteData.contact.linkedin, Icon: Linkedin, label: 'LinkedIn' },
  ];

  return (
    <section id="home" className="section relative min-h-screen overflow-hidden pt-28 pb-16">
      <Blobs />

      <div className="container-p grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* Left Column Text Content */}
        <div>
          {/* Availability Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-mint backdrop-blur-md shadow-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
            </span>
            Available for Full-Time & Contract Roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.04] sm:text-6xl md:text-7xl tracking-tight"
          >
            Ammad <br />
            <span className="text-grad">Iftikhar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-5 text-xl font-semibold text-ink/80 dark:text-slate-200 sm:text-2xl"
          >
            Building high-impact{' '}
            <span className="marker">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[ri]}
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35 }}
                  className="inline-block font-extrabold text-ink dark:text-white"
                >
                  {roles[ri]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-ink/65 dark:text-slate-350 sm:text-lg"
          >
            {siteData.tagline}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <motion.button
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => go('projects')}
              className="btn-primary group"
            >
              <span className="animate-shine" />
              <Sparkles size={17} className="transition-transform group-hover:rotate-12" />
              Explore My Work
            </motion.button>

            <motion.a
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              href={siteData.contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              download={RESUME_FILE}
              className="btn-outline"
            >
              <Download size={17} />
              Download CV
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyEmail}
              className="icon-btn h-12 px-4 w-auto gap-2 text-xs font-bold rounded-full border border-ink/10 dark:border-white/10"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check size={15} className="text-mint" />
                  <span className="text-mint font-semibold">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={15} />
                  <span>Copy Email</span>
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Socials & Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34 }}
            className="mt-8 flex flex-wrap items-center gap-4 border-t border-ink/5 pt-6 dark:border-white/5"
          >
            <div className="flex items-center gap-2">
              {socials.map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="icon-btn"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3.5 py-1.5 text-xs font-semibold text-ink/70 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <MapPin size={14} className="text-candy animate-bounce" />
              {siteData.contact.location}
            </span>
          </motion.div>
        </div>

        {/* Right Column Interactive 3D Avatar Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onMouseMove={onParallax}
          onMouseLeave={resetParallax}
          className="relative mx-auto w-[17rem] sm:w-[21rem] lg:w-full lg:max-w-md"
        >
          {/* Ambient Glow behind Photo */}
          <motion.div
            style={{ x: spx, y: spy }}
            className="absolute -inset-6 -z-10 mask-blob bg-gradient-to-br from-grape via-candy to-sun opacity-75 blur-3xl animate-blob-slow dark:opacity-60"
          />

          {/* Decorative Dashed Spinning Ring */}
          <div className="absolute -inset-4 -z-10 mask-blob border-2 border-dashed border-grape/30 dark:border-white/20 animate-spin-slow" />

          {/* Photo Frame Container */}
          <motion.div
            style={{ x: spx, y: spy }}
            className="mask-blob overflow-hidden border-4 border-white shadow-2xl shadow-grape/20 dark:border-ink-card dark:shadow-black/50"
          >
            <img src={photo} alt="Ammad Iftikhar" className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105" />
          </motion.div>

          {/* Floating Interactive Tech Badges */}
          <motion.div
            style={{ x: spx, y: spy }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card absolute -left-6 top-8 flex items-center gap-2.5 px-4 py-2.5 text-xs font-extrabold shadow-xl animate-float backdrop-blur-xl border border-white/40 dark:border-white/10"
          >
            <Code2 size={16} className="text-grape" />
            <span className="text-ink dark:text-white">React &amp; Next.js</span>
          </motion.div>

          <motion.div
            style={{ x: spx, y: spy }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="card absolute -right-5 bottom-12 flex items-center gap-2.5 px-4 py-2.5 text-xs font-extrabold shadow-xl animate-float backdrop-blur-xl border border-white/40 dark:border-white/10"
            style={{ animationDelay: '1.5s' }}
          >
            <Server size={16} className="text-candy" />
            <span className="text-ink dark:text-white">Node.js &amp; NestJS</span>
          </motion.div>

          <motion.div
            style={{ x: spx, y: spy }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="card absolute left-2 -bottom-4 flex items-center gap-2.5 px-4 py-2.5 text-xs font-extrabold shadow-xl backdrop-blur-xl border border-white/40 dark:border-white/10"
          >
            <Layers size={16} className="text-sun" />
            <span className="text-ink dark:text-white">Full Stack Engineer</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Counter Section */}
      {stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="container-p mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="card px-5 py-6 text-center border border-ink/10 dark:border-white/10"
            >
              <Counter
                value={s.value}
                className={`block font-display text-3xl font-extrabold sm:text-4xl ${statColors[i % statColors.length]}`}
              />
              <div className="mt-1.5 text-xs font-bold uppercase tracking-wider text-ink/60 dark:text-slate-400">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={() => go('about')}
        whileHover={{ scale: 1.1 }}
        className="mx-auto mt-14 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ink/40 transition-colors hover:text-grape dark:text-slate-500 dark:hover:text-grape-light"
        aria-label="Scroll down"
      >
        <span className="animate-bounce">
          <ArrowDown size={16} />
        </span>
        Scroll to explore
      </motion.button>
    </section>
  );
};

export default Hero;

