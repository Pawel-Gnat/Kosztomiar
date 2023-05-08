import { Project } from '@/types/types';
import { createContext } from 'react';

const UserContext = createContext({
  isLoggedIn: false,
  projects: [],
  setProjects: async (project: Project) => {},
});

export default UserContext;
