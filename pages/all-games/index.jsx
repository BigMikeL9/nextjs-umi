import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef, useState } from "react";
import GamesContainer from "../../src/components/GamesContainer/GamesContainer";
import { API_KEY } from "../../src/data/constants";
import useOnScrollReachBottom from "../../src/hooks/useOnScrollReachBottom";
import PageHead from "../../src/layout/Head/Head";

const fetchAllGames = async (pageNumber) => {
  // console.log("Fetching All Games");

  const pageSize = 20;

  const response = await fetch(
    // `https://rawg.io/api/games/lists/main?discover=true&ordering=-${"relevance"}&page_size=${pageSize}&page=${pageNumber}&key=${API_KEY}`

    `https://rawg.io/api/games/lists/popular?discover=true&&page_size=40&page=${pageNumber}&key=c542e67aec3a4340908f9de9e86038af`
  );

  const data = await response.json();

  const games = data.results;

  return games;
};

const AllGamesPage = () => {
  const [sortBy, setSortBy] = useState("relevance");

  // console.log("Render");

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
    queryFn: ({ pageParam = 1 }) => fetchAllGames(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      // console.log("Last Page:", lastPage);
      // console.log("All Pages:", allPages);
      // console.log("Next Page:", nextPage);

      return lastPage?.length !== 0 ? nextPage : undefined;

      // return nextPage;
    },
  });

  // console.log("isLoading:", isLoading);
  // console.log("data", data);
  console.log("HAS NEXT PAGE:", hasNextPage);
  // console.log(isFetchingNextPage);

  // ------------------------------
  let games = [];
  if (isSuccess) games = data?.pages.flat();

  // ------------------------------
  // Load more games as we reach bottom of GamesContainer
  useOnScrollReachBottom(fetchNextPage, hasNextPage);

  // ------------------------------
  useEffect(() => {
    // console.log("Component Mounted");
  }, []);

  // ------------------------------
  let content = "No Games Found 😢";

  if (isLoading) {
    // console.log("Loading...");
    content = <p>LOADING</p>;
  }

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

      {/* TODO Stop fetching next page when there is no more pages to fetch. BUG with hasNextPage  */}
      {!hasNextPage && !isFetchingNextPage && games.length !== 0 && (
        <p>You have Reached the END!</p>
      )}
    </>
  );
};

export default AllGamesPage;
