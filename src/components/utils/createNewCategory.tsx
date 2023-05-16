import { Category, Project } from '@/types/types';
import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from './localStorageDatabase';

export const createNewCategory = async (
  projectID: string,
  name: string,
  category: Category,
) => {
  const existingProjects: Project[] = await getProjectsFromLocalStorage();
  const currentProject = existingProjects.find(
    (project: Project) => project.id === projectID && project.name === name,
  )!;
  currentProject.data.push(category);
  setProjectsToLocalStorage(existingProjects);
};
