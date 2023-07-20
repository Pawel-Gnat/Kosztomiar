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
  categoryData: Category,
  session: UserSession,
) => {
  if (session) {
    const category = {
      projectId,
      categoryData,
    };
    await mongoDatabaseProjects('POST', undefined, category);
  } else {
    const existingProjects: Project[] = await getProjectsFromLocalStorage();
    const currentProject = existingProjects.find(
      (project: Project) => project.id === projectId,
    )!;
    currentProject.data.push(categoryData);
    setProjectsToLocalStorage(existingProjects);
  }
};

export const createNewCategoryElement = async (
  projectId: string,
  categoryName: string,
  elementObj: Element,
  session: UserSession,
) => {
  if (session) {
    const element = {
      projectId,
      categoryName,
      elementObj,
    };
    await mongoDatabaseProjects('POST', undefined, undefined, element);
  } else {
    const existingProjects: Project[] = await getProjectsFromLocalStorage();
    const currentProject = existingProjects.find(
      (currentProject: Project) => currentProject.id === projectId,
    )!;
    const currentCategory = currentProject.data.filter(
      (item) => item.category === categoryName,
    );

    currentCategory[0].elements.push(elementObj);
    setProjectsToLocalStorage(existingProjects);
  }
};
