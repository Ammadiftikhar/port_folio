import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import siteData from '../data/siteData.json';

interface SkillBarProps {
  skill: { name: string; level: number | null };
  index: number;
  isVisible: boolean;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, index, isVisible }) => {

  const safeLevel = Math.max(0, Math.min(10, Number(skill.level ?? 0)));

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          {skill.name}
        </span>
        <span className="text-primary-600 dark:text-primary-400 font-semibold">
          {safeLevel}/10
        </span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${safeLevel * 10}%` } : { width: 0 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary-600 to-accent-600 rounded-full relative"
        >
          <motion.div
            animate={{
              x: [-10, 10, -10],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-white/20 rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.05,
    rootMargin: "0px 0px -10% 0px",
    freezeOnceVisible: true
  });
  const visible = isMobile || isIntersecting;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: isMobile ? {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    } : {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => isMobile ? {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    } : ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  return (
    <section 
      id="skills" 
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900"
      ref={ref}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              My <span className="text-gradient">Skills</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Here are the technologies and tools I work with to bring ideas to life
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full" />
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(siteData.skills).map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                variants={cardVariants}
                custom={categoryIndex}
                initial="hidden"
                animate={visible ? "visible" : "hidden"}
                whileHover={!isMobile ? { y: -5 } : {}}
                className="glass dark:glass-dark rounded-xl p-6 space-y-6"
              >
                {/* Category Header */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {category}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full" />
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      skill={skill}
                      index={skillIndex}
                      isVisible={visible}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            transition={{ delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="glass dark:glass-dark rounded-2xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Always Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Technology evolves rapidly, and I'm committed to continuous learning. 
                I regularly explore new frameworks, tools, and best practices to stay current 
                with industry standards and deliver cutting-edge solutions.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {['TypeScript', 'Next.js', 'GraphQL', 'Docker', 'AWS'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isIntersecting ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-full text-sm font-medium text-primary-700 dark:text-primary-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;