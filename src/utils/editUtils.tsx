import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from '@/utils/localStorageDatabase';
import { Category, Project } from '@/types/types';

export const editCategory = async (
  project: Project,
  currentCategoryName: string,
  element: string,
) => {
  const existingProjects = await getProjectsFromLocalStorage();
  const currentProject = existingProjects.find(
    (currentProject: Project) =>
      JSON.stringify(currentProject) === JSON.stringify(project),
  );
  const selectedCategory = currentProject.data.find(
    (data: Category) => data.category === currentCategoryName,
  );

  selectedCategory.category = element;
  setProjectsToLocalStorage(existingProjects);
};
