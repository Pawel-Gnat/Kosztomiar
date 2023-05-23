import { Category, Element, Project } from '@/types/types';
import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from './localStorageDatabase';

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
