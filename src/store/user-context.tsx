import { UserContextType } from '@/types/types';
import { getProjectsFromLocalStorage } from '@/utils/localStorageDatabase';
import { mongoDatabaseProjects } from '@/utils/mongoDatabaseProjects';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getSession, useSession } from 'next-auth/react';
import { FC, createContext, useCallback, useEffect, useState } from 'react';

export const UserContext = createContext<UserContextType>({
  isUserLoggedIn: false,
  projects: [],
  setProjects: async () => {},
});

export const UserProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  // export const UserProvider: FC<{ children: React.ReactNode; session: Session }> = ({
  //   children,
  //   session,
  // }) => {
  const [projects, setProjects] = useState([]);
  const { data: session, status } = useSession();
  const isUserLoggedIn = session ? true : false;

  console.log(session);

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

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession({ req: context.req });

//   return {
//     props: { session },
//   };
// }
