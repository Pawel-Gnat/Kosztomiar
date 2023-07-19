import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from '@/utils/localStorageDatabase';
import { Category, Project, UserSession } from '@/types/types';
import { mongoDatabaseProjects } from './mongoDatabaseProjects';

export const editCategory = async ({
  projectId,
  currentCategoryName,
  newCategoryName,
  session,
}: {
  projectId: string;
  currentCategoryName: string;
  newCategoryName: string;
  session: UserSession;
}) => {
  if (session) {
    const category = {
      projectId,
      currentCategoryName,
      newCategoryName,
    };
    await mongoDatabaseProjects('PATCH', undefined, category);
  } else {
    const existingProjects = await getProjectsFromLocalStorage();
    const currentProject = existingProjects.find(
      (currentProject: Project) => currentProject.id === projectId,
    );
    const selectedCategory = currentProject.data.find(
      (data: Category) => data.category === currentCategoryName,
    );

    selectedCategory.category = newCategoryName;
    setProjectsToLocalStorage(existingProjects);
  }
};
