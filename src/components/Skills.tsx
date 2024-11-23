import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: 'JavaScript', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 85, category: 'Frontend' },
  { name: 'React', level: 88, category: 'Frontend' },
  { name: 'Python', level: 82, category: 'Backend' },
  { name: 'PHP', level: 85, category: 'Backend' },
  { name: 'Laravel PHP', level: 75, category: 'Backend' },
  { name: 'SQL', level: 80, category: 'Database' },
  { name: 'SQLite', level: 78, category: 'Database' },
  { name: 'Python', level: 75, category: 'Analyse des données' },
  { name: 'R', level: 80, category: 'Analyse des données' },
  { name: 'STATA', level: 85, category: 'Analyse des données' },
  { name: 'SPSS', level: 85, category: 'Analyse des données' },
  { name: 'PDI', level: 80, category: '(data warehousing' },
];

export default function Skills() {
  const { t } = useTranslation();
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {t('skills.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-primary-600 dark:text-primary-400">
                {category}
              </h3>
              <div className="space-y-4">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <motion.div
                          className="bg-primary-600 dark:bg-primary-400 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}