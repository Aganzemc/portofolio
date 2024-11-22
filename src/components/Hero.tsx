import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import SocialLink from './SocialLink';
import chirstianImage from '../images/chris.jpg';

export default function Hero() {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' }
  ];

  return (
    <section id="home" className="flex items-center min-h-screen pt-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              {t('hero.greeting')} <span className="text-blue-600 dark:text-blue-400">AGANZE Christian</span>
            </h1>
            <h2 className="mb-6 text-2xl text-gray-600 md:text-3xl dark:text-gray-300">
              {t('hero.role')}
            </h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              {t('hero.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <SocialLink key={link.label} {...link} />
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <img
              src='../images/chris.jpg'
              alt="AGANZE Christian"
              className="object-cover w-64 h-64 mx-auto rounded-full shadow-2xl md:w-96 md:h-96"
            />
          </motion.div>
        </div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute transform -translate-x-1/2 bottom-8 left-1/2"
        >
          <ChevronDown className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </motion.div>
      </div>
    </section>
  );
}