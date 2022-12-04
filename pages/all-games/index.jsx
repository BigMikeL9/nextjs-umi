import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef, useState } from "react";
import GamesContainer from "../../src/components/GamesContainer/GamesContainer";
import { API_KEY } from "../../src/data/constants";
import { fetchAllGames, PAGE_SIZE } from "../../src/fetchers/fetchGames";
import useOnScrollReachBottom from "../../src/hooks/useOnScrollReachBottom";
import PageHead from "../../src/layout/Head/Head";

const AllGamesPage = () => {
  const [orderBy, setOrderBy] = useState("released");

  /* 
  Order by API options: 

  - relevance
  - released 
  - created
  - name
  - added
  - rating


   ---- NEW RELEASES ---- 
  - Last 30 Days 👇
    https://rawg.io/api/games/lists/recent-games-past?discover=true&ordering=-added&page_size=20&page=1&key=${API_KEY}

  - This week 
    https://rawg.io/api/games/lists/recent-games?discover=true&ordering=-added&page_size=20&page=1&key=${API_KEY}


  ---- TOP ----
  - Best of the Year
    https://rawg.io/api/games/lists/greatest?discover=true&ordering=-added&page_size=20&page=1&key=${API_KEY}

  - Popular in 2021
    https://rawg.io/api/games/lists/greatest?year=2021&discover=true&ordering=-added&page_size=20&page=1&key=${API_KEY}

  - All time top 250
    https://rawg.io/api/games/lists/popular?discover=true&&page_size=20&page=1&key=${API_KEY}



  */

  // const {
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   data: games,
  //   error,
  // } = useQuery(["allGames"], fetchAllGames, { staleTime: 6000 });

  const {
    data,
    isSuccess,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["allGames"],
    queryFn: ({ pageParam = 1 }) => fetchAllGames(pageParam, orderBy),
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = lastPage.count / PAGE_SIZE;
      const nextPage = allPages.length + 1;

      // console.log("Last Page:", lastPage);
      // console.log("All Pages:", allPages);
      // console.log("Next Page:", nextPage);

      return nextPage <= maxPages ? nextPage : undefined;
    },
  });

  // console.log("isLoading:", isLoading);
  // console.log("data", data);
  // console.log("HAS NEXT PAGE:", hasNextPage);
  // console.log(isFetchingNextPage);

  // ------------------------------
  let games = [];
  if (isSuccess) {
    games = data?.pages.map((page) => page.results).flat();
    console.log(games);

    // Remove duplicates from an array
    const filteredGames = games.filter((el, index, arr) => {
      console.log(arr);
      // console.log(arr.findIndex(el));
    });

    // console.log(filteredGames);
  }

  // ------------------------------
  // Load more games as we reach bottom of GamesContainer
  useOnScrollReachBottom(fetchNextPage, hasNextPage);

  // ------------------------------
  let content = "No Games Found 😢";

  if (isLoading)
    // console.log("Loading...");
    content = <p>LOADING</p>;

  if (isError) {
    // console.log("Error", error);
    content = <p>{error.message}</p>;
  }

  if (isSuccess && games?.length > 0)
    content = <GamesContainer games={games} />;

  return (
    <>
      <PageHead
        title="UMI"
        meta_Description="UMI ♛ Keep all games in one profile ✔ See what friends are playing, and find your next great game."
        og_URL="www.umi.com"
      />

      {content}

      {hasNextPage && isFetchingNextPage && <p>Loading</p>}

      {!hasNextPage && !isFetchingNextPage && games.length !== 0 && (
        <p>You have Reached the END!</p>
      )}
    </>
  );
};

export default AllGamesPage;
