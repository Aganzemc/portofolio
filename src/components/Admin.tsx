import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Project } from '../types';
import { projects } from '../data/projects';
import { Upload } from 'lucide-react';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  technologies: z.string().min(1, 'Technologies are required'),
  githubUrl: z.string().url('Must be a valid URL'),
  liveUrl: z.string().url('Must be a valid URL').optional(),
  imageFile: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, 'Image is required')
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported'
    )
    .optional(),
});

type ProjectForm = z.infer<typeof schema>;

export default function Admin() {
  const [projectsList, setProjectsList] = useState<Project[]>(projects);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<ProjectForm>({
    resolver: zodResolver(schema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProjectForm) => {
    const imageFile = data.imageFile?.[0];
    let imageUrl = '';

    if (imageFile) {
      // Convert image to base64
      const reader = new FileReader();
      imageUrl = await new Promise((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(imageFile);
      });
    }

    const newProject: Project = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      image: imageUrl || '',
      technologies: data.technologies.split(',').map(tech => tech.trim()),
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
    };

    setProjectsList([...projectsList, newProject]);
    setPreviewImage(null);
    reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Project Management
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              {...register('description')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Project Image
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                {...register('imageFile')}
                onChange={handleImageChange}
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload Image
              </button>
            </div>
            {previewImage && (
              <div className="mt-2">
                <img src={previewImage} alt="Preview" className="h-32 w-32 object-cover rounded-lg" />
              </div>
            )}
            {errors.imageFile && (
              <p className="text-red-500 text-sm mt-1">{errors.imageFile.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Technologies (comma-separated)
            </label>
            <input
              {...register('technologies')}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
            {errors.technologies && (
              <p className="text-red-500 text-sm mt-1">{errors.technologies.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              GitHub URL
            </label>
            <input
              {...register('githubUrl')}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
            {errors.githubUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.githubUrl.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Live URL (optional)
            </label>
            <input
              {...register('liveUrl')}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
            {errors.liveUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.liveUrl.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Add Project
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Current Projects
          </h2>
          <div className="space-y-4">
            {projectsList.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center gap-4"
              >
                {project.image && (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="h-20 w-20 object-cover rounded"
                  />
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}