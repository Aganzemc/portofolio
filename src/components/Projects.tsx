import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';
import { Project } from '../types';

const projects: Project[] = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform built with React and Node.js',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
  },
  {
    title: 'AI Image Generator',
    description: 'An AI-powered image generation tool using Python',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    technologies: ['Python', 'TensorFlow', 'Flask', 'React'],
    githubUrl: 'https://github.com'
  },
  {
    title: 'Mobile Fitness App',
    description: 'Cross-platform fitness tracking application',
    image: 'https://images.unsplash.com/photo-1676321685222-4dd7f8ecd95c?auto=format&fit=crop&q=80&w=800',
    technologies: ['React Native', 'Firebase', 'TypeScript'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com'
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