import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin gradient bar at the very top that tracks scroll progress. */
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-grape via-candy to-sun"
    />
  );
};

export default ScrollProgress;
