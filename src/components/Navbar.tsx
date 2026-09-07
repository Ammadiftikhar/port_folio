import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#projects' },
  { name: 'Path', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

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
        return r.top <= 130 && r.bottom >= 130;
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
        transition={{ duration: 0.5 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="container-p">
          <div
            className={`mt-4 flex items-center justify-between gap-3 px-3 py-2 transition-all duration-300 ${
              scrolled ? 'nav-shell shadow-lg shadow-ink/5' : ''
            }`}
          >
            <button onClick={() => go('#home')} className="flex items-center gap-2 pl-1 font-display font-extrabold">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-grape to-candy text-white">
                <Sparkles size={16} />
              </span>
              <span className="text-ink dark:text-white">Ammad</span>
            </button>

            <nav className="hidden items-center gap-1 md:flex">
              {links.map((l) => {
                const on = active === l.href.slice(1);
                return (
                  <button
                    key={l.name}
                    onClick={() => go(l.href)}
                    className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      on ? 'text-white' : 'text-ink/60 hover:text-ink dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-blob"
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-grape to-candy"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    {l.name}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="icon-btn h-10 w-10" aria-label="Toggle theme">
                {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
              </button>
              <button
                onClick={() => setOpen((v) => !v)}
                className="icon-btn h-10 w-10 md:hidden"
                aria-label="Menu"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm md:hidden"
              />
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="container-p relative z-50 md:hidden"
              >
                <div className="card mt-2 space-y-1 p-3 shadow-xl">
                  {links.map((l) => (
                    <button
                      key={l.name}
                      onClick={() => go(l.href)}
                      className={`block w-full rounded-2xl px-4 py-3 text-left text-base font-semibold ${
                        active === l.href.slice(1)
                          ? 'bg-gradient-to-r from-grape to-candy text-white'
                          : 'text-ink/70 hover:bg-ink/5 dark:text-slate-300 dark:hover:bg-white/5'
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      <a href="#main-content" className="skip-link">Skip to content</a>
    </>
  );
};

export default Navbar;
