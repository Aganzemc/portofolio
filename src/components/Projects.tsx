import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';
import { Project } from '../types';
import imageQuotePrism from '../images/projects/QuotePrism.png'
import imageBuzabyte from '../images/projects/buzabyte.png'

const projects: Project[] = [
  {
    title: 'QuotePrism Platform',
    description: 'QuotePrism un site web frontend en React',
    image: imageQuotePrism,
    technologies: ['React', 'TypeScript', 'TailwinsCSS'],
    githubUrl: 'https://github.com/Aganzemc/QuotePrism',
    liveUrl: '#'
  },
  {
    title: 'Buzabyte Platform',
    description: 'un site vitrine pour presenter une entrprise',
    image:imageBuzabyte,
    technologies: ['React', 'TypeScript', 'TailwinsCSS'],
    githubUrl: 'https://github.com/Aganzemc/buzabyte'
  },
  {
    title: 'Mobile Mimea ulinzi App',
    description: 'une application encours de développement',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    technologies: ['React Native', 'Firebase', 'TypeScript'],
    githubUrl: 'https://github.com/Aganzemc/',
    liveUrl: '#'
  }
];

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {t('projects.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}