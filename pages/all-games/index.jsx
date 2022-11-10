import React from "react";
import PageHead from "../../src/layout/Head/Head";

const allGamesPage = () => {
  return (
    <>
      <PageHead
        title="UMI"
        meta_Description="UMI ♛ Keep all games in one profile ✔ See what friends are playing, and find your next great game."
        og_URL="www.umi.com"
      />
      allGamesPage
    </>
  );
};

export default allGamesPage;

// ----------------------------------------------------
// ----------------------------------------------------
export const useStaticProps = async () => {
  try {
    const response = await fetch();
  } catch (error) {
    console.log(error.message);
    console.log(error.cause);
  }
};
