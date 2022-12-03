import styled from "@emotion/styled";
import Link from "next/link";

export const CardContainer = styled.article`
  position: relative;
  min-width: 20rem;
  min-height: 30rem;
  max-height: 30rem;
`;

export const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const CardImage = styled.img`
  position: absolute;
  inset: 0;

  object-fit: cover;
  height: 100%;
  width: 100%;
`;

export const CardTitle = styled.h2`
  color: #fff;
  text-align: center;

  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  width: 100%;
  padding: 0 1rem;
`;
