import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Space_Grotesk } from 'next/font/google';
import UserContext from '@/store/user-context';
import {
  getProjectsFromLocalStorage,
  setProjectToLocalStorage,
} from '@/components/utils/localStorageDatabase';
import { useEffect, useState } from 'react';
import { Project } from '@/types/types';

const fonts = Space_Grotesk({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  const [projects, setProjects] = useState([]);

  const handleCreatedProject = async (project: Project) => {
    await setProjectToLocalStorage(project);
    const updatedProjects = await getProjectsFromLocalStorage();
    setProjects(updatedProjects);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const storedProjects = await getProjectsFromLocalStorage();
      setProjects(storedProjects);
    };

    fetchProjects();
  }, []);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: false,
        projects: projects,
        setProjects: handleCreatedProject,
      }}
    >
      <style jsx global>{`
        html {
          font-family: ${fonts.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
