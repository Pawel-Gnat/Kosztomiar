import { UserContextType } from '@/types/types';
import { getProjectsFromLocalStorage } from '@/utils/localStorageDatabase';
import mongoDatabaseProjects from '@/utils/mongoDatabaseProjects';
import { useSession } from 'next-auth/react';
import { FC, ReactNode, createContext, useCallback, useEffect, useState } from 'react';

export const UserContext = createContext<UserContextType>({
  isUserLoggedIn: false,
  projects: [],
  setProjects: async () => {},
});

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const { data: session, status } = useSession();
  const isUserLoggedIn = session ? true : false;

  const handleProjects = useCallback(async () => {
    const projects = isUserLoggedIn
      ? await mongoDatabaseProjects('GET')
      : await getProjectsFromLocalStorage();
    setProjects(projects);
  }, [isUserLoggedIn]);

  useEffect(() => {
    handleProjects();
  }, [handleProjects]);

  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn: isUserLoggedIn,
        projects: projects,
        setProjects: handleProjects,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
