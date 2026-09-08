import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, AlertCircle, Mail, Phone, MapPin, Github, Linkedin, Copy, Clock, MessageSquare, Sparkles } from 'lucide-react';
import siteData from '../data/siteData.json';
import SectionHeading from './SectionHeading';
import Blobs from './Blobs';
import Tilt from './Tilt';

interface FormData { name: string; email: string; message: string }
type FormErrors = Partial<Record<keyof FormData, string>>;

const Contact: React.FC = () => {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your full name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email address';
    if (form.message.trim().length < 10) e.message = 'Please provide a bit more detail (min 10 chars)';
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

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const info = [
    {
      key: 'email',
      Icon: Mail,
      title: 'Email Address',
      label: siteData.contact.email,
      action: () => copyToClipboard(siteData.contact.email, 'email'),
      c: 'bg-grape/15 text-grape',
    },
    {
      key: 'phone',
      Icon: Phone,
      title: 'Phone / WhatsApp',
      label: siteData.contact.phone,
      action: () => copyToClipboard(siteData.contact.phone, 'phone'),
      c: 'bg-candy/15 text-candy',
    },
    {
      key: 'location',
      Icon: MapPin,
      title: 'Location',
      label: siteData.contact.location,
      action: null,
      c: 'bg-sun/15 text-sun',
    },
  ];

  return (
    <section id="contact" className="section overflow-hidden">
      <Blobs items={[
        { color: 'grape', className: 'left-[-6rem] top-0 h-80 w-80' },
        { color: 'candy', className: 'right-[-6rem] bottom-0 h-80 w-80' },
      ]} />
      <div className="container-p">
        <SectionHeading
          eyebrow="get in touch"
          accent="grape"
          align="center"
          title={
            <>
              Let&apos;s build <span className="text-grad">something extra ordinary</span>
            </>
          }
          subtitle="Whether you have an open role, project inquiry, or technical proposal — my inbox is open."
        />

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left Column Contact Info & Copy Cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {info.map(({ key, Icon, title, label, action, c }) => {
              const isCopied = copiedKey === key;
              return (
                <Tilt max={4} key={key}>
                  <div
                    onClick={() => action && action()}
                    className={`card p-5 flex items-center justify-between gap-4 border border-ink/10 dark:border-white/10 ${
                      action ? 'cursor-pointer card-pop' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${c}`}>
                        <Icon size={20} />
                      </span>
                      <div className="min-w-0">
                        <span className="block text-xs font-bold uppercase tracking-wider text-ink/40 dark:text-slate-500">
                          {title}
                        </span>
                        <span className="block truncate text-sm font-extrabold text-ink dark:text-white">
                          {label}
                        </span>
                      </div>
                    </div>

                    {action && (
                      <button
                        type="button"
                        aria-label={`Copy ${title}`}
                        className="icon-btn h-9 w-9 shrink-0"
                        title="Click to copy"
                      >
                        {isCopied ? <Check size={16} className="text-mint" /> : <Copy size={15} />}
                      </button>
                    )}
                  </div>
                </Tilt>
              );
            })}

            {/* Social Connection Row */}
            <div className="card p-5 flex items-center justify-between border border-ink/10 dark:border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-ink/60 dark:text-slate-400">
                Connect on Social
              </span>
              <div className="flex gap-2">
                {[
                  { Icon: Github, href: siteData.contact.github, label: 'GitHub' },
                  { Icon: Linkedin, href: siteData.contact.linkedin, label: 'LinkedIn' },
                  { Icon: Mail, href: `mailto:${siteData.contact.email}`, label: 'Email' },
                ].map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="icon-btn h-10 w-10"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column Interactive Form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={onSubmit}
            className="card p-6 sm:p-8 space-y-5 border border-ink/10 dark:border-white/10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-ink/60 dark:text-slate-400">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="field"
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1.5 text-xs font-semibold text-candy">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-ink/60 dark:text-slate-400">
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  className="field"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1.5 text-xs font-semibold text-candy">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-xs font-extrabold uppercase tracking-wider text-ink/60 dark:text-slate-400">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={onChange}
                className="field resize-none"
                placeholder="Tell me about your project, timeline, or scope..."
              />
              {errors.message && <p className="mt-1.5 text-xs font-semibold text-candy">{errors.message}</p>}
            </div>

            <motion.button
              type="submit"
              disabled={busy}
              whileHover={{ scale: busy ? 1 : 1.02 }}
              whileTap={{ scale: busy ? 1 : 0.97 }}
              className="btn-primary w-full disabled:opacity-60"
            >
              <span className="animate-shine" />
              {busy ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : status === 'success' ? (
                <>
                  <Check size={18} /> Message Sent Successfully!
                </>
              ) : (
                <>
                  <Send size={18} /> Send Direct Message
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-2xl bg-mint/15 p-3.5 text-sm font-bold text-mint"
                >
                  <Check size={16} /> Thank you! Your message has been sent. I will respond shortly.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-2xl bg-candy/15 p-3.5 text-sm font-bold text-candy"
                >
                  <AlertCircle size={16} /> Something went wrong. Please try again or email directly.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

