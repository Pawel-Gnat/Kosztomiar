import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Source_Sans_Pro } from 'next/font/google';
import UserContext from '@/store/user-context';
import { getProjectsFromLocalStorage } from '@/utils/localStorageDatabase';
import { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import AOS from 'aos';

const fonts = Source_Sans_Pro({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [projects, setProjects] = useState([]);

  const handleProjects = async () => {
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <UserContext.Provider
        value={{
          isLoggedIn: false,
          projects: projects,
          setProjects: handleProjects,
        }}
      >
        <style jsx global>{`
          html {
            font-family: ${fonts.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </UserContext.Provider>
    </SessionProvider>
  );
}
