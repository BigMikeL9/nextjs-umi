import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GamesContainer from "../../src/components/GamesContainer/GamesContainer";
import PageHead from "../../src/layout/Head/Head";

let pageNumber = 1;

const AllGamesPage = () => {
  const [games, setGames] = useState([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [isLoading, setIsLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true);
  // const [pageNumber, setPageNumber] = useState(1);

  console.log(games);
  console.log(pageNumber);

  // ------------------------------
  // TODO: Find a way to update page number
  const fetchGames = useCallback(async () => {
    try {
      setIsLoading(true);

      pageNumber = pageNumber + 1;

      const response = await fetch(
        `https://api.rawg.io/api/games/lists/popular?key=7624d1052a1c4ec68b3300e9bb3f12e7&page=${pageNumber}`
      );

      if (!response.ok) throw new Error("Something Went Wrong!");

      const data = await response.json();

      setGames((prevState) => {
        return [...prevState, ...data.results];
      });

      // setPageNumber((prevState) => prevState + 1);
    } catch (error) {
      console.log(error);
      setHasMore(false);
    }

    setIsLoading(false);
  }, []);

  // ------------------------------
  useEffect(() => {
    fetchGames();
  }, [fetchGames]);
  // ------------------------------

  let content = "No Games Found 😢";

  if (isLoading) content = <p>LOADING</p>;

  if (games?.length > 0)
    content = (
      <InfiniteScroll
        dataLength={games.length} //This is important field to render the next data
        next={fetchGames}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <GamesContainer games={games} />
      </InfiniteScroll>
    );

  return (
    <>
      <PageHead
        title="UMI"
        meta_Description="UMI ♛ Keep all games in one profile ✔ See what friends are playing, and find your next great game."
        og_URL="www.umi.com"
      />

      {content}
    </>
  );
};

export default AllGamesPage;
