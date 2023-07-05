import { Category, Project } from '@/types/types';

export const checkIfProjectNameExists = (
  existingProjects: Project[],
  elementName: string,
) => {
  if (
    existingProjects.find(
      (project) => project.name.toLowerCase() === elementName.toLowerCase(),
    )
  ) {
    return true;
  }
};

export const checkIfCategoryNameExists = (
  existingProjects: Project,
  elementName: string,
) => {
  if (
    existingProjects.data.find(
      (category) => category.category.toLowerCase() === elementName.toLowerCase(),
    )
  ) {
    return true;
  }
};

export const checkIfElementNameExists = (
  project: Project,
  categoryName: Category,
  elementName: string,
) => {
  const existingProject: Category[] = project.data;
  const currentCategory = existingProject.find(
    (categoryContainer) => categoryContainer.category === categoryName.category,
  )!;

  if (
    currentCategory.elements.find(
      (element) => element.name.toLowerCase() === elementName.toLowerCase(),
    )
  ) {
    return true;
  }
};
