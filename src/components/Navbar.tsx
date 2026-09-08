import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Sparkles, Download } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import siteData from '../data/siteData.json';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Philosophy', href: '#philosophy' },
  { name: 'Work', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const RESUME_FILE = 'Ammad-Iftikhar-Full-Stack-Developer.pdf';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const ids = links.map((l) => l.href.slice(1)).concat('education');
      const cur = ids.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 140 && r.bottom >= 140;
      });
      if (cur) setActive(cur === 'education' ? 'skills' : cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
  }, [open]);

  const go = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="container-p">
          <div
            className={`mt-4 flex items-center justify-between gap-3 px-3.5 py-2.5 transition-all duration-300 ${
              scrolled ? 'nav-shell shadow-xl shadow-black/5 dark:shadow-black/25' : ''
            }`}
          >
            {/* Logo */}
            <button
              onClick={() => go('#home')}
              className="flex items-center gap-2.5 pl-1 font-display font-extrabold text-base tracking-tight transition-transform hover:scale-105"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-grape via-candy to-sun text-white shadow-md">
                <Sparkles size={17} />
              </span>
              <span className="text-ink dark:text-white">Ammad.dev</span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-1 md:flex">
              {links.map((l) => {
                const on = active === l.href.slice(1);
                return (
                  <button
                    key={l.name}
                    onClick={() => go(l.href)}
                    className={`relative rounded-full px-4 py-2 text-xs font-extrabold transition-colors ${
                      on ? 'text-white' : 'text-ink/70 hover:text-ink dark:text-slate-300 dark:hover:text-white'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-blob"
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-grape via-grape to-candy shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {l.name}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={siteData.contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                download={RESUME_FILE}
                className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/70 px-3.5 py-1.5 text-xs font-extrabold text-ink/80 hover:border-grape hover:text-grape dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-grape-light"
              >
                <Download size={13} />
                <span>Resume</span>
              </motion.a>

              <motion.button
                whileHover={{ rotate: 45, scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={toggleTheme}
                className="icon-btn h-10 w-10"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </motion.button>

              <button
                onClick={() => setOpen((v) => !v)}
                className="icon-btn h-10 w-10 md:hidden"
                aria-label="Menu"
              >
                {open ? <X size={19} /> : <Menu size={19} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-md md:hidden"
              />
              <motion.div
                initial={{ opacity: 0, y: -16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                className="container-p relative z-50 md:hidden"
              >
                <div className="card mt-2 space-y-1.5 p-3.5 shadow-2xl border border-ink/10 dark:border-white/10">
                  {links.map((l) => (
                    <button
                      key={l.name}
                      onClick={() => go(l.href)}
                      className={`block w-full rounded-2xl px-4 py-3 text-left text-base font-bold transition-all ${
                        active === l.href.slice(1)
                          ? 'bg-gradient-to-r from-grape via-grape to-candy text-white'
                          : 'text-ink/80 hover:bg-ink/5 dark:text-slate-200 dark:hover:bg-white/5'
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                  <div className="pt-2 border-t border-ink/5 dark:border-white/5">
                    <a
                      href={siteData.contact.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={RESUME_FILE}
                      className="btn-outline w-full flex items-center justify-center gap-2 py-2.5 text-xs"
                    >
                      <Download size={15} />
                      Download Resume
                    </a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
    </>
  );
};

export default Navbar;

