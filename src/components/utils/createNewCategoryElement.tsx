import { Project } from '@/types/types';
import {
  getProjectsFromLocalStorage,
  setProjectsToLocalStorage,
} from './localStorageDatabase';

export const createNewCategoryElement = async (
  projectID: string,
  name: string,
  category: string,
  element: {
    name: string;
    value: string;
    unit: string;
    price: string;
  },
) => {
  const existingProjects: Project[] = await getProjectsFromLocalStorage();
  const currentProject = existingProjects.find(
    (project: Project) => project.id === projectID && project.name === name,
  )!;
  const currentCategory = currentProject.data.filter(
    (item) => item.category === category,
  );

  //   const index = currentProject.data.indexOf(category);

  if (currentCategory) {
    // console.log(currentCategory);
    currentCategory[0].elements.push(element);

    // console.log(categoryName[0].elements.push(category));
    // categoryName.push(element);
    // console.log(currentProject);
    // console.log(index);
    // console.log(currentProject.data);
  }

  //   const index = currentProject.data.indexOf(category);
  //   if (index !== -1) {
  //     const element = currentProject.data[index];
  //     console.log(element);
  //   }

  //   console.log(currentProject.data);
  //   console.log(category);

  //   currentProject.data.push(category);
  setProjectsToLocalStorage(existingProjects);
};
