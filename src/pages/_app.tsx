import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Source_Sans_Pro } from 'next/font/google';
import { UserProvider } from '@/store/user-context';
import { useEffect } from 'react';
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
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <UserProvider>
        <style jsx global>{`
          html {
            font-family: ${fonts.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </UserProvider>
    </SessionProvider>
  );
}
