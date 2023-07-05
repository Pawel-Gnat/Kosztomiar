import { Project } from '@/types/types';

export const getProjectsFromLocalStorage = async () => {
  const projects = localStorage.getItem('projects')
    ? JSON.parse(localStorage.getItem('projects') || '')
    : [];

  return projects;
};

export const setProjectsToLocalStorage = async (projects: Project[]) => {
  localStorage.setItem('projects', JSON.stringify(projects));
};
