import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pl">
      <Head>
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
      </Head>
      <body>
        <Main />
        <div id="portal"></div>
        <NextScript />
        <script async src="https://unpkg.com/aos@next/dist/aos.js" />
      </body>
    </Html>
  );
}
