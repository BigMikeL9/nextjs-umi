import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import useFetch from "../../src/hooks/useFetch";

const GameDetailPage = () => {
  const router = useRouter();
  const [gameData, setGameData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const { gameSlug } = router.query;

  const { fetchData, isLoading, error } = useFetch();

  // ------------------------------------------------------
  useEffect(() => {
    if (!gameSlug) return;

    const fetch = async () => {
      const data = await fetchData(
        `https://api.rawg.io/api/games/${gameSlug}?key=7624d1052a1c4ec68b3300e9bb3f12e7`
      );

      const transformedData = Object.entries(data).map((el) => {
        const key = el[0];
        const value = el[1];

        return { key, value };
      });

      setGameData(transformedData);
    };

    fetch();
  }, [gameSlug, fetchData]);

  // ------------------------------------------------------
  let content = gameSlug;

  if (isLoading) content = <h2>Loading</h2>;

  const gameDetails = gameData.map((game, i) => (
    <div key={i}>
      <span>{game.key} ---------- </span>
      <span>{typeof game.value !== "object" && game.value}</span>
    </div>
  ));

  console.log(gameDetails);

  if (gameDetails.length > 1) content = gameDetails;

  return <div>{content}</div>;
};

export default GameDetailPage;
