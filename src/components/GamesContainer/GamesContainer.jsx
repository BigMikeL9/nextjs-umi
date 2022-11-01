import React from "react";
import GameCard from "../GameCard/GameCard";

import { Container } from "./GamesContainer.style";

const GamesContainer = (props) => {
  return (
    <Container>
      {props.games.length > 0 &&
        props.games?.map((gameData) => (
          <GameCard
            key={gameData.id}
            slug={gameData.slug}
            image={gameData.background_image}
            name={gameData.name}
          />
        ))}
    </Container>
  );
};

export default GamesContainer;
