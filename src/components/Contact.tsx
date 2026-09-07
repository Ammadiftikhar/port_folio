import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import siteData from '../data/siteData.json';
import SectionHeading from './SectionHeading';
import Blobs from './Blobs';

interface FormData { name: string; email: string; message: string }
type FormErrors = Partial<Record<keyof FormData, string>>;

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.message.trim().length < 10) e.message = 'A little more detail, please';
    return e;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setBusy(true);
    setErrors({});
    try {
      await new Promise((r) => setTimeout(r, 1100));
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setBusy(false);
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const info = [
    { Icon: Mail, label: siteData.contact.email, href: `mailto:${siteData.contact.email}`, c: 'bg-grape/15 text-grape' },
    { Icon: Phone, label: siteData.contact.phone, href: `tel:${siteData.contact.phone}`, c: 'bg-candy/15 text-candy' },
    { Icon: MapPin, label: siteData.contact.location, href: null, c: 'bg-sun/15 text-sun' },
  ];

  return (
    <section id="contact" className="section overflow-hidden">
      <Blobs items={[
        { color: 'grape', className: 'left-[-6rem] top-0 h-64 w-64' },
        { color: 'candy', className: 'right-[-6rem] bottom-0 h-64 w-64' },
      ]} />
      <div className="container-p">
        <SectionHeading
          eyebrow="say hi"
          accent="grape"
          align="center"
          title={
            <>
              Let&apos;s build <span className="text-grad">something great</span>
            </>
          }
          subtitle="Open to full-time roles, freelance projects and collaborations."
        />

        <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            {info.map(({ Icon, label, href, c }) => {
              const inner = (
                <>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c}`}>
                    <Icon size={17} />
                  </span>
                  <span className="truncate text-sm font-semibold text-ink/70 dark:text-slate-300">{label}</span>
                </>
              );
              return href ? (
                <a key={label} href={href} className="card card-pop flex items-center gap-3 p-4">{inner}</a>
              ) : (
                <div key={label} className="card flex items-center gap-3 p-4">{inner}</div>
              );
            })}
            <div className="flex gap-2 pt-1">
              {[
                { Icon: Github, href: siteData.contact.github },
                { Icon: Linkedin, href: siteData.contact.linkedin },
                { Icon: Mail, href: `mailto:${siteData.contact.email}` },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="icon-btn">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={onSubmit}
            className="card space-y-4 p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50 dark:text-slate-500">Name</label>
                <input id="name" name="name" value={form.name} onChange={onChange} className="field" placeholder="Your name" />
                {errors.name && <p className="mt-1 text-xs font-semibold text-candy">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50 dark:text-slate-500">Email</label>
                <input id="email" name="email" type="email" value={form.email} onChange={onChange} className="field" placeholder="you@example.com" />
                {errors.email && <p className="mt-1 text-xs font-semibold text-candy">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink/50 dark:text-slate-500">Message</label>
              <textarea id="message" name="message" rows={5} value={form.message} onChange={onChange} className="field resize-none" placeholder="Tell me about your project…" />
              {errors.message && <p className="mt-1 text-xs font-semibold text-candy">{errors.message}</p>}
            </div>
            <motion.button
              type="submit"
              disabled={busy}
              whileHover={{ scale: busy ? 1 : 1.02 }}
              whileTap={{ scale: busy ? 1 : 0.97 }}
              className="btn-primary w-full disabled:opacity-60"
            >
              {busy ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : status === 'success' ? (
                <><Check size={16} /> Sent!</>
              ) : (
                <><Send size={16} /> Send message</>
              )}
            </motion.button>
            {status === 'success' && (
              <p className="flex items-center gap-2 text-sm font-semibold text-mint">
                <Check size={15} /> Thanks — I&apos;ll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="flex items-center gap-2 text-sm font-semibold text-candy">
                <AlertCircle size={15} /> Something went wrong. Try again.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
