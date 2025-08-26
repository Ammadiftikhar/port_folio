import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail, Github, Linkedin } from 'lucide-react';
import FloatingShapes from './FloatingShapes';
import siteData from '../data/siteData.json';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950 pt-14 sm:pt-16"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-noise opacity-30" />
      
      {/* Animated Background Gradient */}
      <motion.div
        style={{ y: scrollY * -0.5 }}
        className="absolute inset-0 bg-gradient-radial from-primary-200/20 via-transparent to-accent-200/20 dark:from-primary-900/20 dark:via-transparent dark:to-accent-900/20"
      />

      {/* Floating Shapes */}
      <FloatingShapes />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Greeting */}
          <motion.p
            variants={textVariants}
            custom={0}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 font-medium"
          >
            Hello, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={textVariants}
            custom={1}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight"
          >
            <span className="text-gradient">{siteData.name}</span>
          </motion.h1>

          {/* Role */}
          <motion.h2
            variants={textVariants}
            custom={2}
            initial="hidden"
            animate="visible"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 leading-tight"
          >
            {siteData.role}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            variants={textVariants}
            custom={3}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
          >
            {siteData.tagline}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollToProjects}
              className="btn-primary w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3"
            >
              View Projects
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={siteData.contact.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3"
            >
              <Download size={18} className="sm:w-5 sm:h-5" />
              Download Resume
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollToContact}
              className="btn-secondary w-full sm:w-auto text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3"
            >
              Contact Me
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center space-x-4 sm:space-x-6 mb-12 sm:mb-16"
          >
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              href={`mailto:${siteData.contact.email}`}
              className="p-2.5 sm:p-3 rounded-full glass dark:glass-dark text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              aria-label="Send email"
            >
              <Mail size={20} className="sm:w-6 sm:h-6" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              href={siteData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 rounded-full glass dark:glass-dark text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              aria-label="GitHub profile"
            >
              <Github size={20} className="sm:w-6 sm:h-6" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              href={siteData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 rounded-full glass dark:glass-dark text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={20} className="sm:w-6 sm:h-6" />
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 rounded-full text-gray-400 dark:text-gray-500"
          >
            <ChevronDown size={28} className="sm:w-8 sm:h-8" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;