import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Code2, Palette, Zap, Users } from 'lucide-react';
import siteData from '../data/siteData.json';

const About: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true
  });

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
        delay: i * 0.05 + 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    } : ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and well-documented code"
    },
    {
      icon: Palette,
      title: "UI/UX Focus",
      description: "Creating intuitive and visually appealing user interfaces"
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing applications for speed and efficiency"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working effectively with cross-functional teams"
    }
  ];

  return (
    <section 
      id="about" 
      className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full" />
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
            {/* Text Content */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate={isIntersecting ? "visible" : "hidden"}
              className="space-y-4 sm:space-y-6"
            >
              <div className="space-y-3 sm:space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                {siteData.summary.split('. ').map((sentence, index) => (
                  <motion.p
                    key={index}
                    variants={textVariants}
                    initial="hidden"
                    animate={isIntersecting ? "visible" : "hidden"}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="text-base sm:text-lg"
                  >
                    {sentence}{index < siteData.summary.split('. ').length - 1 ? '.' : ''}
                  </motion.p>
                ))}
              </div>

              <motion.div
                variants={textVariants}
                initial="hidden"
                animate={isIntersecting ? "visible" : "hidden"}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-3 sm:pt-4"
              >
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-sm sm:text-base">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span className="text-primary-700 dark:text-primary-300 font-medium">
                    Based in {siteData.contact.location}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full text-sm sm:text-base">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    Available for work
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Image/Visual Element */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate={isIntersecting ? "visible" : "hidden"}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="relative glass dark:glass-dark rounded-2xl p-6 sm:p-8 h-64 sm:h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                    <span className="text-2xl sm:text-4xl font-bold text-white">A</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                    {siteData.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {siteData.role}
                  </p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 bg-primary-400 rounded-full opacity-60"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 w-3 sm:w-4 h-3 sm:h-4 bg-accent-400 rounded-full opacity-60"></div>
                <div className="absolute top-1/2 left-3 sm:left-4 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-primary-300 rounded-full opacity-40"></div>
              </div>
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                animate={isIntersecting ? "visible" : "hidden"}
                whileHover={!isMobile ? { y: -5, scale: 1.02 } : {}}
                className="glass dark:glass-dark rounded-xl p-4 sm:p-6 text-center group cursor-pointer mobile-optimized"
              >
                <motion.div
                  whileHover={!isMobile ? { rotate: 360, scale: 1.1 } : {}}
                  transition={{ duration: isMobile ? 0.2 : 0.6 }}
                  className="inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg text-white mb-3 sm:mb-4 mx-auto"
                >
                  <item.icon size={20} className="sm:w-6 sm:h-6" />
                </motion.div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;