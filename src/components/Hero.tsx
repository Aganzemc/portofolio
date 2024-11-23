import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown, Upload } from 'lucide-react';
import SocialLink from './SocialLink';
import { useAuth } from '../context/AuthContext';
import profilImage from '../images/chris.jpg'

export default function Hero() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const [profileImage, setProfileImage] = useState<string>(profilImage);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/aganzemc', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/christian-aganze-371774292', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:aganzemirindi2016@gmail.com', label: 'Email' }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="home" className="pt-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('hero.greeting')} <span className="text-blue-600 dark:text-blue-400">AGANZE Christian</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-6">
              {t('hero.role')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
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
            className="flex-1 relative"
          >
            <img
              src={profileImage}
              alt="AGANZE Christian"
              className="rounded-full w-64 h-64 md:w-96 md:h-96 object-cover mx-auto shadow-2xl"
            />
            {isAuthenticated && (
              <div className="absolute bottom-4 right-4">
                <input
                  type="file"
                  id="profile-photo"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="profile-photo"
                  className="cursor-pointer inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Update Photo
                </label>
              </div>
            )}
          </motion.div>
        </div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </motion.div>
      </div>
    </section>
  );
}