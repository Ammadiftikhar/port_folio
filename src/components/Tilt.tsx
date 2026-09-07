import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, type MotionStyle } from 'framer-motion';

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  max?: number;
  style?: MotionStyle;
  onClick?: () => void;
}

/** Wraps children in a subtle mouse-tracked 3D tilt (pointer devices only). */
const Tilt: React.FC<TiltProps> = ({ children, className, max = 7, style, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * max * 2);
    rx.set(-py * max * 2);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Tilt;
