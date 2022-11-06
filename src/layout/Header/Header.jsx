import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const router = useRouter();

  const { pathname } = router;

  return (
    <header>
      <div>LOGO</div>

      <nav>
        <ul>
          <li>
            <Link href="/">
              <a
                className={pathname === "/" ? "active" : null}
                aria-current={pathname === "/" ? "page" : null}
              >
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/all-games">
              <a
                className={pathname === "/all-games" ? "active" : null}
                aria-current={pathname === "/all-games" ? "page" : null}
              >
                All Games
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
