import Image from "next/image";
import { useRouter } from "next/router.js";

import Footer from "../src/layout/Footer/Footer.jsx";
import PageHead from "../src/layout/Head/Head.jsx";
import Header from "../src/layout/Header/Header.jsx";

import GamesContainer from "../src/components/GamesContainer/GamesContainer.jsx";
import SearchForm from "../src/components/Search/Search.jsx";

import { useCallback, useEffect, useState } from "react";
import { API_KEY } from "../src/data/constants.js";
import httpRequest from "../src/lib/httpRequest";

const Home = (props) => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { topTen_CurrentGames } = props;
  const { query } = router;

  const searchQuery = query.search;

  // ------------------------------------
  const fetchGamesHandler = useCallback(async (searchValue) => {
    setIsLoading(true);

    const data = await httpRequest(
      `https://api.rawg.io/api/games?key=7624d1052a1c4ec68b3300e9bb3f12e7&search="${searchValue}"&page_size=20&page=1`
    );

    setSearchResults(data.results);

    setIsLoading(false);
  }, []);

  // ------------------------------------
  // if URL has search parameter  ->  fetch games
  useEffect(() => {
    if (searchQuery) fetchGamesHandler(searchQuery);
  }, [searchQuery, fetchGamesHandler]);

  // ------------------------------------
  let content = <h2>No Games Found!!</h2>;

  if (isLoading) content = <h2>LOADING</h2>;

  if (!searchQuery)
    content = (
      <>
        <h2> Most Popular Games NOW</h2>
        <GamesContainer games={topTen_CurrentGames} />
      </>
    );

  // if there are search results
  if (searchResults?.length > 0)
    content = <GamesContainer games={searchResults} />;

  // ------------------------------------

  return (
    <>
      <PageHead
        title="UMI"
        meta_Description="UMI ♛ Keep all games in one profile ✔ See what friends are playing, and find your next great game."
        og_URL="www.umi.com"
      />

      <main>
        <SearchForm fetchGames={fetchGamesHandler} />

        {content}
      </main>
    </>
  );
};

export default Home;

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
export const getStaticProps = async () => {
  const currentYear = new Date().getFullYear();

  // Most popular games in current year
  const apiData = await httpRequest(
    `https://api.rawg.io/api/games?key=${API_KEY}&dates=${currentYear}-01-01,${currentYear}-12-31&ordering=-added`
  );

  const topTen_CurrentGames = apiData.results.slice(0, 10);

  return {
    props: { topTen_CurrentGames },
  };
};
