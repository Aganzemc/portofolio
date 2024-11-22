import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-800">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <a href="mailto:aganzemirindi2016@gmail.com" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                <Mail className="w-5 h-5" />
                <span>aganzemirindi2016@gmail.com</span>
              </a>
              <a href="tel:+243997366776" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                <Phone className="w-5 h-5" />
                <span>+243 997 366 776</span>
              </a>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5" />
                <span>Bukavu, Sud-Kivu, DR Congo</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('footer.links')}</h3>
            <div className="space-y-3">
              <a href="#skills" className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                {t('nav.skills')}
              </a>
              <a href="#projects" className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                {t('nav.projects')}
              </a>
              <a href="#contact" className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                {t('nav.contact')}
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold">{t('footer.social')}</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/Aganzemc" target="_blank" rel="noopener noreferrer" className="p-2 transition-colors bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/christian-aganze-371774292" target="_blank" rel="noopener noreferrer" className="p-2 transition-colors bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} AGANZE Christian. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}