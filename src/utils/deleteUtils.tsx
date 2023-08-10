import { Category, Element, Project, UserSession } from '@/types/types';
import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from './localStorageDatabase';
import mongoDatabaseProjects from './mongoDatabaseProjects';

export const deleteProject = async (currentProject: Project, session: UserSession) => {
  if (session) {
    await mongoDatabaseProjects('PUT', currentProject);
  } else {
    const existingProjects = await getProjectsFromLocalStorage();
    const filteredProjects = existingProjects.filter(
      (project: Project) => project.id !== currentProject.id,
    );
    await setProjectsToLocalStorage(filteredProjects);
  }
};

export const deleteCategory = async (
  projectId: string,
  categoryData: string,
  session: UserSession,
) => {
  if (session) {
    const category = {
      projectId,
      categoryData,
    };
    await mongoDatabaseProjects('PUT', undefined, category);
  } else {
    const existingProjects = await getProjectsFromLocalStorage();
    const currentProject = existingProjects.find(
      (currentProject: Project) => currentProject.id === projectId,
    );
    const newCategories = currentProject.data.filter(
      (data: Category) => data.category !== categoryData,
    );
    currentProject.data = newCategories;
    setProjectsToLocalStorage(existingProjects);
  }
};

export const deleteCategoryElement = async (
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
    await mongoDatabaseProjects('PUT', undefined, undefined, element);
  } else {
    const existingProjects = await getProjectsFromLocalStorage();
    const currentProject = existingProjects.filter(
      (project: Project) => project.id === projectId,
    );
    const currentCategory = currentProject[0].data.find(
      (data: Category) => data.category === categoryName,
    );
    const newCategoryElements = currentCategory.elements.filter(
      (el: Element) => el.name !== elementObj.name,
    );
    currentCategory.elements = newCategoryElements;
    setProjectsToLocalStorage(existingProjects);
  }
};
