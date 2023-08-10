import { Category, Element, Project } from '@/types/types';
import axios from 'axios';

export default async function mongoDatabaseProjects(
  method: string,
  project?: Project,
  category?: {
    projectId: string;
    currentCategoryName?: string;
    categoryData: string | Category;
  },
  element?: {
    projectId: string;
    categoryName: string;
    elementObj: Element;
  },
) {
  const getDataConfig = () => {
    if (project) return { project };
    if (category) return { category };
    if (element) return { element };
  };

  try {
    const response = await axios({
      method,
      url: '/api/user/handleProjects',
      data: getDataConfig(),
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
