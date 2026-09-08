import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Tilt from './Tilt';

const principles = [
  {
    icon: Terminal,
    title: 'Clean Architecture & TypeScript',
    desc: 'Strongly typed codebases, predictable state management, reusable component libraries, and modular API structures.',
    color: 'from-grape to-indigo-600',
    badge: 'bg-grape/15 text-grape',
  },
  {
    icon: Cpu,
    title: 'Real-Time & Performance First',
    desc: 'Low-latency Socket.IO communication, optimized SQL/NoSQL queries, and smooth 60fps frontend interactions.',
    color: 'from-candy to-rose-600',
    badge: 'bg-candy/15 text-candy',
  },
  {
    icon: ShieldCheck,
    title: 'Enterprise Security & RBAC',
    desc: 'Role-based access control, Stripe payment security, JWT/OAuth auth flows, and battle-tested data validation.',
    color: 'from-sun to-amber-600',
    badge: 'bg-sun/15 text-sun',
  },
  {
    icon: Sparkles,
    title: 'User-Centric Motion & UX',
    desc: 'Accessible, responsive UI design built with Tailwind CSS, Framer Motion, and intuitive micro-interactions.',
    color: 'from-mint to-emerald-600',
    badge: 'bg-mint/15 text-mint',
  },
];

const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="section overflow-hidden bg-white/50 dark:bg-ink-soft/40">
      <div className="container-p">
        <SectionHeading
          eyebrow="engineering philosophy"
          accent="grape"
          title={
            <>
              How I build <span className="text-grad">software</span>
            </>
          }
          subtitle="Core standards and best practices applied to every project I deliver."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {principles.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Tilt max={6} className="card card-pop group h-full p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.badge} transition-transform group-hover:scale-110`}>
                        <Icon size={22} />
                      </span>
                      <span className="font-mono text-xs font-bold text-ink/30 dark:text-slate-600">0{index + 1}</span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-bold group-hover:text-grape transition-colors dark:group-hover:text-grape-light">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-ink/5 dark:border-white/5 flex items-center gap-2 text-xs font-semibold text-ink/50 dark:text-slate-500">
                    <CheckCircle2 size={14} className="text-mint" />
                    <span>Industry standard benchmark</span>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
