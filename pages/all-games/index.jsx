import { QueryClient, useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef, useState } from "react";
import GamesContainer from "../../src/components/GamesContainer/GamesContainer";
import SortDropdown from "../../src/components/UI/SortDropdown/SortDropdown";
import { API_KEY } from "../../src/data/constants";
import { fetchAllGames, PAGE_SIZE } from "../../src/fetchers/fetchGames";
import useOnScrollReachBottom from "../../src/hooks/useOnScrollReachBottom";
import PageHead from "../../src/layout/Head/Head";

const AllGamesPage = () => {
  const [sortBy, setSortBy] = useState("relevance");

  console.log(sortBy);

  const queryClient = new QueryClient();

  /* 
  Sort by API options: 

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

  // ------------------------------
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
    refetch,
  } = useInfiniteQuery({
    queryKey: ["allGames"],
    queryFn: ({ pageParam = 1 }) => fetchAllGames(pageParam, sortBy),
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
  // get sortBy value from dropdown on change
  const sortChangeHandler = async (sortByValue) => {
    console.log(sortByValue);
    setSortBy(sortByValue);

    // TODO: Find a way to instantly update the games list when sot value changes.
    // refetch({ refetchPage: (page, index) => index === 0 });
  };

  // ------------------------------
  let games = [];
  if (isSuccess) {
    games = data?.pages.map((page) => page.results).flat();
    console.log(games);
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

      <SortDropdown onSortChange={sortChangeHandler} />

      {content}

      {hasNextPage && isFetchingNextPage && <p>Loading</p>}

      {!hasNextPage && !isFetchingNextPage && games.length !== 0 && (
        <p>You have Reached the END!</p>
      )}
    </>
  );
};

export default AllGamesPage;
