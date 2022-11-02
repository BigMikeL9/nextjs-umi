import Image from "next/image";

import Footer from "../src/layout/Footer/Footer.jsx";
import PageHead from "../src/layout/Head/Head.jsx";
import Header from "../src/layout/Header/Header.jsx";

import GameCard from "../src/components/GameCard/GameCard.jsx";
import GamesContainer from "../src/components/GamesContainer/GamesContainer.jsx";
import SearchForm from "../src/components/Search/Search.jsx";

import { useState } from "react";
import { API_KEY } from "../src/data/constants.js";
import httpRequest from "../src/lib/httpRequest";

const Home = (props) => {
  // console.log(props);
  // console.table(props.topTenGames);
  const [searchResults, setSearchResults] = useState();

  const { topTen_CurrentGames } = props;

  // console.log(topTen_CurrentGames);

  console.log(searchResults);

  // --- get search results from 'Search.jsx' child component
  const searchResultsHandler = (results) => {
    setSearchResults(results);
  };

  return (
    <>
      <PageHead
        title="UMI"
        meta_Description="UMI ♛ Keep all games in one profile ✔ See what friends are playing, and find your next great game."
        og_URL="www.umi.com"
      />

      <Header />

      <main>
        <SearchForm onSearchResults={searchResultsHandler} />

        <h2></h2>

        {searchResults?.length > 0 ? (
          <GamesContainer games={searchResults} />
        ) : (
          <h3>No Games Found</h3>
        )}

        {searchResults?.length === 0 && (
          <GamesContainer games={topTen_CurrentGames} />
        )}
      </main>

      <Footer />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const currentYear = new Date().getFullYear();

  // Most popular games in current year
  const apiData = await httpRequest(
    `https://api.rawg.io/api/games?key=${API_KEY}&dates=${currentYear}-01-01,${currentYear}-12-31&ordering=-added`
  );

  // const apiData = await httpRequest(
  //   `https://api.rawg.io/api/games?key=${API_KEY}`
  // );

  const topTen_CurrentGames = apiData.results.slice(0, 10);

  return {
    props: { topTen_CurrentGames },
  };
};
