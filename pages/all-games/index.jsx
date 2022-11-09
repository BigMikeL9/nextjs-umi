import React from "react";

const allGamesPage = () => {
  return <div>allGamesPage</div>;
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
