import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="Slime Scholars" />
        <meta
          name="robots"
          content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
        />
        <meta name="theme-color" content="#4bad5a" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/meta/logo32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/meta/logo16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/assets/meta/logo76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/assets/meta/logo120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/meta/logo152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/meta/logo180.png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Slime Scholars" />
        <meta name="apple-mobile-web-app-status-bar" content="#4bad5a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#4bad5a" />
        <meta name="msapplication-TileImage" content="/favicon.ico" />
        <meta name="msapplication-config" content="/favicon.ico" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="application-name" content="Slime Scholars" />
        <meta name="msapplication-tooltip" content="Slime Scholars" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="msapplication-navbutton-color" content="#4bad5a" />
        <meta name="msapplication-task" content="name=Slime Scholars" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://slimescholars.com/" />
        <meta property="og:title" content="Slime Scholars" />
        <meta
          property="og:description"
          content="Collect adorable slimes while learning from lessons designed to help maximize success in our modern world. Slime Scholars is a gamified learning platform for students, teachers, and parents."
        />
        <meta property="og:image" content="/assets/meta/og-banner.png" />
        <meta property="og:image:width" content="180" />
        <meta property="og:image:height" content="180" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://slimescholars.com/" />
        <meta name="twitter:title" content="Slime Scholars" />
        <meta
          name="twitter:description"
          content="Collect adorable slimes while learning from lessons designed to help maximize success in our modern world. Slime Scholars is a gamified learning platform for students, teachers, and parents."
        />
        <meta name="twitter:image" content="/assets/meta/og-banner.png" />
        <meta name="twitter:creator" content="@slimescholars" />
        <meta name="twitter:site" content="@slimescholars" />
        <meta name="twitter:domain" content="slimescholars.com" />
        <meta name="twitter:label1" content="Written by" />
        <meta name="twitter:data1" content="Slime Scholars" />
        <meta name="twitter:label2" content="Est. reading time" />
        <meta name="twitter:data2" content="1 minute" />
        <meta name="twitter:widgets:new-embed-design" content="on" />
        <meta name="twitter:widgets:csp" content="on" />
        <meta name="twitter:widgets:autoload" content="off" />
        <meta name="twitter:widgets:theme" content="light" />
        <meta name="twitter:widgets:link-color" content="#4bad5a" />
        <meta name="twitter:widgets:border-color" content="#4bad5a" />
        <meta name="twitter:widgets:width" content="300" />
        <meta name="twitter:widgets:height" content="300" />
        <meta name="twitter:widgets:tweet-limit" content="3" />
        <meta name="twitter:widgets:chrome" content="nofooter" />
        <meta name="twitter:widgets:align" content="center" />
        <meta name="twitter:widgets:lang" content="en" />
        <meta name="twitter:widgets:tweet-id" content="20" />
        <meta name="twitter:widgets:conversation" content="none" />
        <meta name="twitter:widgets:cards" content="hidden" />

        {/* Google */}
        <meta itemProp="name" content="Slime Scholars" />
        <meta
          itemProp="description"
          content="Collect adorable slimes while learning from lessons designed to help maximize success in our modern world. Slime Scholars is a gamified learning platform for students, teachers, and parents."
        />
        <meta itemProp="image" content="/assets/meta/logo180.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
