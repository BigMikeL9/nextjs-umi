import styled from "styled-components";

export const CardContainer = styled.div`
  width: 30rem;
  height: 40rem;
`;

export const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const CardImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

export const CardTitle = styled.h2`
  color: #fff;
`;
