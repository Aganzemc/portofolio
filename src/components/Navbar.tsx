import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Languages, LogIn, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'fr' : 'en');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex justify-center sm:justify-start">
            <div className="hidden sm:block">
              <div className="flex space-x-8">
                <Link to="/" className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
                  {t('nav.home')}
                </Link>
                <a href="#skills" className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
                  {t('nav.skills')}
                </a>
                <a href="#projects" className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
                  {t('nav.projects')}
                </a>
                <a href="#contact" className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
                  {t('nav.contact')}
                </a>
                {isAuthenticated && (
                  <Link to="/admin" className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
                    {t('nav.admin')}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={t('nav.language')}
            >
              <Languages className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={t('nav.toggleTheme')}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">{t('nav.logout')}</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <LogIn className="h-5 w-5" />
                <span className="hidden sm:inline">{t('nav.login')}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}