import { Category, Element, Project, UserSession } from '@/types/types';
import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from './localStorageDatabase';
import { mongoDatabaseProjects } from './mongoDatabaseProjects';

export const createNewProject = async (project: Project, session: UserSession) => {
  if (session) {
    await mongoDatabaseProjects('POST', project);
  } else {
    const existingProjects = await getProjectsFromLocalStorage();
    const updatedProjects = existingProjects.concat(project);
    setProjectsToLocalStorage(updatedProjects);
  }
};

export const createNewCategory = async (
  projectId: string,
  newCategory: Category,
  session: UserSession,
) => {
  if (session) {
    const category = {
      projectId,
      newCategory,
    };
    await mongoDatabaseProjects('POST', undefined, category);
  } else {
    const existingProjects: Project[] = await getProjectsFromLocalStorage();
    const currentProject = existingProjects.find(
      (project: Project) => project.id === projectId,
    )!;
    currentProject.data.push(newCategory);
    setProjectsToLocalStorage(existingProjects);
  }
};

export const createNewCategoryElement = async (
  project: Project,
  category: string,
  element: Element,
) => {
  const existingProjects: Project[] = await getProjectsFromLocalStorage();
  const currentProject = existingProjects.find(
    (currentProject: Project) =>
      currentProject.id === project.id && currentProject.name === project.name,
  )!;
  const currentCategory = currentProject.data.filter(
    (item) => item.category === category,
  );

  currentCategory[0].elements.push(element);
  setProjectsToLocalStorage(existingProjects);
};
