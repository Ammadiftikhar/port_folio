import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * Custom modern smooth spring cursor ring for desktop devices.
 */
const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const mouseX = useSpring(0, { stiffness: 450, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 450, damping: 28 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.classList.contains('card') ||
        target.classList.contains('pill') ||
        target.getAttribute('role') === 'button';

      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onOver);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
      }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{
          scale: clicked ? 0.75 : hovered ? 1.8 : 1,
          opacity: hovered ? 0.8 : 0.45,
          borderColor: hovered ? 'rgba(236, 72, 153, 0.9)' : 'rgba(124, 58, 237, 0.6)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="h-8 w-8 rounded-full border-2 bg-grape/10 backdrop-blur-[1px] shadow-sm dark:bg-candy/10"
      />
    </motion.div>
  );
};

export default CustomCursor;
