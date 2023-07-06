import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pl">
      <Head>
        <link rel="icon" href="/favicon.png" sizes="any" />
      </Head>
      <body>
        <Main />
        <div id="portal"></div>
        <NextScript />
      </body>
    </Html>
  );
}
