import Image from "next/image";
import { useRouter } from "next/router.js";

import Footer from "../src/layout/Footer/Footer.jsx";
import PageHead from "../src/layout/Head/Head.jsx";
import Header from "../src/layout/Header/Header.jsx";

import GamesContainer from "../src/components/GamesContainer/GamesContainer.jsx";
import SearchForm from "../src/components/Search/Search.jsx";

import { useCallback, useEffect, useState } from "react";
import { API_KEY } from "../src/data/constants.js";
import useFetch from "../src/hooks/useFetch.jsx";
import httpRequest from "../src/utility/httpRequest";

const Home = (props) => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);

  const { topTen_CurrentGames } = props;
  const { query } = router;

  const searchQuery = query.search;

  const { fetchData, isLoading, error } = useFetch();

  // ------------------------------------

  const getSearchResults = useCallback(async (data) => {
    const transformedData = {
      count: data?.count,
      games: data?.results,
    };

    setSearchResults(transformedData.games);
  }, []);

  // ------------------------------------
  const refetchData = useCallback(async () => {
    const data = await fetchData(
      `https://api.rawg.io/api/games?key=7624d1052a1c4ec68b3300e9bb3f12e7&search="${searchQuery}"&page_size=20&page=1`
    );

    setSearchResults(data.results);
  }, [fetchData, searchQuery]);

  // ------------------------------------
  // if URL has search parameter  ->  fetch games
  useEffect(() => {
    if (!searchQuery) return;
    refetchData();
  }, [searchQuery, refetchData]);

  // ------------------------------------
  let content = <h2>No Games Found!!</h2>;

  if (isLoading) content = <h2>LOADING</h2>;

  if (error)
    content = (
      <>
        <h2>{error}</h2> <button onClick={refetchData}>Try Again!!</button>
      </>
    );

  console.log(searchResults);

  // if there are search results
  if (searchResults?.length > 0)
    content = <GamesContainer games={searchResults} />;

  if (!searchQuery)
    content = (
      <>
        <h2> Most Popular Games NOW</h2>
        <GamesContainer games={topTen_CurrentGames} />
      </>
    );

  // ------------------------------------

  return (
    <>
      <PageHead
        title="UMI"
        meta_Description="UMI ♛ Keep all games in one profile ✔ See what friends are playing, and find your next great game."
        og_URL="www.umi.com"
      />

      <main>
        <SearchForm
          fetchData={fetchData}
          isLoading={isLoading}
          error={error}
          onSearchResults={getSearchResults}
        />

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
    `https://api.rawg.io/api/games?key=${API_KEY}&dates=${currentYear}-01-01,${currentYear}-12-31`
  );

  const topTen_CurrentGames = apiData.results.slice(0, 6);

  return {
    props: { topTen_CurrentGames },
    revalidate: 3600, // In seconds
  };
};
