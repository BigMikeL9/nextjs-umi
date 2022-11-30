import React, { useEffect } from "react";

const useOnScrollReachBottom = (action, hasNextPage) => {
  useEffect(() => {
    if (!hasNextPage) return;

    let fetching = false;

    const handleScroll = async (e) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;

        if (hasNextPage) await action();

        fetching = false;
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [action, hasNextPage]);
};

export default useOnScrollReachBottom;
