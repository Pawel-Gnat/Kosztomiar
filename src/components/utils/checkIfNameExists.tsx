import { Project } from '@/types/types';

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
