import React, { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';

interface CounterProps {
  value: string; // e.g. "10+", "3+", "20+"
  className?: string;
}

/** Counts up from 0 to the numeric part of `value` when scrolled into view. */
const Counter: React.FC<CounterProps> = ({ value, className }) => {
  const target = parseInt(value, 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${Math.round(v)}${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, target, { duration: 1.2, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [inView, target, mv]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
};

export default Counter;
