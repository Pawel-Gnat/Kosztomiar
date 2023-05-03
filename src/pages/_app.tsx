import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Space_Grotesk } from 'next/font/google';

const fonts = Space_Grotesk({
  weight: ['300', '400', '600'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${fonts.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
