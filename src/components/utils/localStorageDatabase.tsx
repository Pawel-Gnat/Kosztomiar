import { Project } from '@/types/types';

export const getProjectsFromLocalStorage = async () => {
  const projects = localStorage.getItem('projects')
    ? JSON.parse(localStorage.getItem('projects') || '')
    : [];

  return projects;
};

export const setProjectToLocalStorage = async (project: Project) => {
  const existingProjects = await getProjectsFromLocalStorage();
  const updatedProjects = existingProjects.concat(project);
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
};
