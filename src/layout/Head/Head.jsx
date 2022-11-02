import Head from "next/head";
import React from "react";

const PageHead = (props) => {
  const { title, meta_Description, og_URL } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={meta_Description} />
      <link rel="icon" href="/favicon.ico" />

      <meta property="og:title" content={title} />
      <meta property="og:image" content="/favicon.ico" />

      <meta property="og:description" content={meta_Description} />
      <meta property="og:url" content={og_URL} />
      <meta property="og:type" content="Website" />
    </Head>
  );
};

export default PageHead;
