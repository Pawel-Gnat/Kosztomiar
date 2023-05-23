import { Project } from '@/types/types';
import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from './localStorageDatabase';

export const createNewProject = async (project: Project) => {
  const existingProjects = await getProjectsFromLocalStorage();
  const updatedProjects = existingProjects.concat(project);
  setProjectsToLocalStorage(updatedProjects);
};
