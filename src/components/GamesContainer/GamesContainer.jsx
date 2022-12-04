import React from "react";
import GameCard from "../GameCard/GameCard";

import { Container } from "./GamesContainer.style";

const GamesContainer = (props) => {
  console.log(props);

  return (
    <Container>
      {props.games &&
        props.games.map((gameData, index) => (
          <GameCard
            key={gameData?.id}
            slug={gameData?.slug}
            image={gameData?.background_image}
            name={gameData?.name}
          />
        ))}
    </Container>
  );
};

export default GamesContainer;
