import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import useFetch from "../../src/hooks/useFetch";
import PageHead from "../../src/layout/Head/Head";

const GameDetailPage = () => {
  const router = useRouter();
  const [gameData, setGameData] = useState([]);

  const { gameSlug } = router.query;

  const { fetchData, isLoading, error } = useFetch();

  // console.log(gameData);

  // ------------------------------------------------------
  useEffect(() => {
    if (!gameSlug) return;

    const fetch = async () => {
      const data = await fetchData(
        `https://api.rawg.io/api/games/${gameSlug}?key=7624d1052a1c4ec68b3300e9bb3f12e7`
      );

      console.log(data);

      const transformedData = {
        id: data.id,
        slug: data.slug,
        name: data.name,
        description: data.description,
        description_raw: data.description_raw,
        genres: data.genres,
        tag: data.tags,
        developers: data.developers,
        rating: data.rating,
        released: data.released,
        website: data.website,
        lastUpdated: data.updated,
        metacritic_score: data.metacritic,
        metacritic_url: data.metacritic_url,
        esrb_rating: data.esrb_rating,
        background_image: data.background_image,
        background_image_additional: data.background_image_additional,
      };

      console.log(transformedData);

      setGameData(transformedData);
    };

    fetch();
  }, [gameSlug, fetchData]);

  // ------------------------------------------------------
  let content;

  if (isLoading) content = <h2>LOADING</h2>;

  if (!isLoading)
    content = (
      <>
        <div style={{ width: "100vw", height: "50vh", position: "relative" }}>
          <Image
            src={gameData.background_image}
            alt={`Image of the game ${gameData.name}`}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <h2>{gameData.name}</h2>
        <p>{gameData.description_raw}</p>
      </>
    );

  return (
    <>
      <PageHead
        title={`UMI | ${gameData.name}`}
        meta_Description={gameData.description_raw?.replaceAll("\n", "")}
        og_URL={`https://www.umi.com/${gameData.slug}`}
        og_Image={gameData.background_image}
      />

      {content}
    </>
  );
};

export default GameDetailPage;

// TODO prerender each of the most Popular games detail pages during build process 'getStaticProps' & 'getStaticPaths'
