import Image from "next/image";
import React from "react";

import {
  CardContainer,
  CardImage,
  CardTitle,
  ImageContainer,
} from "./GameCard.style";

const GameCard = (props) => {
  return (
    <CardContainer>
      <ImageContainer>
        <CardImage src={props.image} alt={props.name} />
      </ImageContainer>

      <CardTitle>{props.name}</CardTitle>
    </CardContainer>
  );
};

export default GameCard;
