import { API_KEY } from "../data/constants";

export const PAGE_SIZE = 20;

export const fetchAllGames = async (pageNumber, orderBy) => {
  const response = await fetch(
    `https://rawg.io/api/games/lists/main?discover=true&ordering=-${orderBy}&page_size=${PAGE_SIZE}&page=${pageNumber}&key=${API_KEY}`
  );

  const data = await response.json();

  return data;
};
