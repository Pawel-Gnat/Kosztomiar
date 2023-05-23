import { createContext } from 'react';

const UserContext = createContext({
  isLoggedIn: false,
  projects: [],
  setProjects: async () => {},
});

export default UserContext;
