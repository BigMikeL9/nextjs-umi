import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  CardContainer,
  CardImage,
  CardTitle,
  ImageContainer,
  StyledLink,
} from "./GameCard.style";

const GameCard = (props) => {
  return (
    <CardContainer>
      <Link href={`/${props.slug}`}>
        <a>
          <ImageContainer>
            <CardImage src={props.image} alt={props.name} />
          </ImageContainer>

          <CardTitle>{props.name}</CardTitle>
        </a>
      </Link>
    </CardContainer>
  );
};

export default GameCard;
