import Head from "next/head";
import React from "react";

const PageHead = (props) => {
  const { title, meta_Description, og_URL, og_Image } = props;

  return (
    <Head>
      {/* TODO Change {title && ""} once I implement generateStaticPaths for [gameslug] dynamic page */}
      <title>{title && ""}</title>
      <meta name="description" content={meta_Description && ""} />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:title" content={title && ""} />
      <meta property="og:image" content={og_Image && ""} />

      <meta property="og:description" content={meta_Description && ""} />
      <meta property="og:url" content={og_URL && ""} />
      <meta property="og:type" content="Website" />

      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&amp;display=optional"
        rel="stylesheet"
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;700&amp;display=optional"
        rel="stylesheet"
      ></link>
    </Head>
  );
};

export default PageHead;
