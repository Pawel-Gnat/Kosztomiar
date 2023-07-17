import { Project } from '@/types/types';

export async function mongoDatabaseProjects(method: string, project?: Project) {
  const options: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (project) {
    options.body = JSON.stringify({ project });
  }

  const response = await fetch('/api/user/handleProjects', options);
  const data = await response.json();

  if (!response.ok) {
    return {
      error: {
        message: data.message,
      },
    };
  }

  return data;
}