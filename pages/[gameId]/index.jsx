import { useRouter } from "next/router";
import React from "react";

const GameDetailPage = () => {
  const router = useRouter();

  console.log(router);
  const { gameId } = router.query;

  return <div>{gameId}</div>;
};

export default GameDetailPage;
