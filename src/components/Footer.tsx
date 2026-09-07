import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, ArrowUpRight, MapPin } from 'lucide-react';
import siteData from '../data/siteData.json';

const links = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#projects' },
  { name: 'Path', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

const socials = [
  { Icon: Github, href: siteData.contact.github, label: 'GitHub' },
  { Icon: Linkedin, href: siteData.contact.linkedin, label: 'LinkedIn' },
  { Icon: Mail, href: `mailto:${siteData.contact.email}`, label: 'Email' },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden border-t-2 border-ink/10 bg-white dark:border-white/10 dark:bg-ink-soft">
      {/* blob accent */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-grape/20 blur-3xl dark:bg-grape/15" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-candy/20 blur-3xl dark:bg-candy/15" />

      <div className="container-p relative py-16">
        {/* CTA */}
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-mint/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-mint">
              <span className="h-2 w-2 rounded-full bg-mint" /> Available for work
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-[2.75rem]">
              Let&apos;s make something <span className="text-grad">awesome</span> together.
            </h2>
            <motion.a
              href={`mailto:${siteData.contact.email}`}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary mt-6"
            >
              Start a conversation
              <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 gap-6 sm:gap-10 lg:justify-items-end"
          >
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink/40 dark:text-slate-500">Explore</p>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.name}>
                    <button
                      onClick={() => go(l.href)}
                      className="text-sm font-semibold text-ink/60 transition-colors hover:text-grape dark:text-slate-400 dark:hover:text-grape-light"
                    >
                      {l.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink/40 dark:text-slate-500">Reach me</p>
              <div className="space-y-2 text-sm font-semibold text-ink/60 dark:text-slate-400">
                <a href={`mailto:${siteData.contact.email}`} className="block break-all transition-colors hover:text-grape dark:hover:text-grape-light">
                  {siteData.contact.email}
                </a>
                <a href={`tel:${siteData.contact.phone}`} className="block transition-colors hover:text-grape dark:hover:text-grape-light">
                  {siteData.contact.phone}
                </a>
                <p className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-candy" />
                  {siteData.contact.location}
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                {socials.map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="icon-btn h-9 w-9"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* giant name watermark */}
        <div className="pointer-events-none mt-14 select-none">
          <p className="bg-gradient-to-r from-grape via-candy to-sun bg-clip-text text-center font-display text-[18vw] font-extrabold leading-none text-transparent opacity-[0.14] dark:opacity-20 lg:text-[13rem]">
            AMMAD
          </p>
        </div>

        {/* bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t-2 border-ink/5 pt-6 dark:border-white/5 sm:flex-row">
          <p className="text-sm text-ink/45 dark:text-slate-500">
            © {year} Ammad Iftikhar. Built with React, TypeScript &amp; Tailwind.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 rounded-full border-2 border-ink/10 px-4 py-2 text-sm font-bold text-ink/55 transition-colors hover:border-grape hover:text-grape dark:border-white/10 dark:text-slate-400"
          >
            Back to top <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
