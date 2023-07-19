import { Category, Element, Project, UserSession } from '@/types/types';
import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from './localStorageDatabase';
import { mongoDatabaseProjects } from './mongoDatabaseProjects';

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
  categoryName: string,
  session: UserSession,
) => {
  if (session) {
    const category = {
      projectId,
      categoryName,
    };
    await mongoDatabaseProjects('PUT', undefined, category);
  } else {
    const existingProjects = await getProjectsFromLocalStorage();
    const currentProject = existingProjects.find(
      (currentProject: Project) => currentProject.id === projectId,
    );
    const newCategories = currentProject.data.filter(
      (data: Category) => data.category !== categoryName,
    );
    currentProject.data = newCategories;
    setProjectsToLocalStorage(existingProjects);
  }
};

export const deleteCategoryElement = async (
  projectId: string,
  category: string,
  element: Element,
) => {
  const existingProjects = await getProjectsFromLocalStorage();
  const currentProject = existingProjects.filter(
    (project: Project) => project.id === projectId,
  );
  const currentCategory = currentProject[0].data.find(
    (data: Category) => data.category === category,
  );
  const newCategoryElements = currentCategory.elements.filter(
    (el: Element) => JSON.stringify(el) !== JSON.stringify(element),
  );
  currentCategory.elements = newCategoryElements;
  setProjectsToLocalStorage(existingProjects);
};
