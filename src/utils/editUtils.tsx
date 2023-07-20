import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from '@/utils/localStorageDatabase';
import { Category, Project, UserSession } from '@/types/types';
import { mongoDatabaseProjects } from './mongoDatabaseProjects';

export const editCategory = async ({
  projectId,
  currentCategoryName,
  categoryData,
  session,
}: {
  projectId: string;
  currentCategoryName: string;
  categoryData: Category;
  session: UserSession;
}) => {
  if (session) {
    const category = {
      projectId,
      currentCategoryName,
      categoryData,
    };

    console.log(category);
    await mongoDatabaseProjects('PATCH', undefined, category);
  } else {
    const existingProjects = await getProjectsFromLocalStorage();
    const currentProject = existingProjects.find(
      (currentProject: Project) => currentProject.id === projectId,
    );
    const selectedCategory = currentProject.data.find(
      (data: Category) => data.category === currentCategoryName,
    );

    selectedCategory.category = categoryData;
    setProjectsToLocalStorage(existingProjects);
  }
};
