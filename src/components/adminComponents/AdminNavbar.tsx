"use client";

import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import ProfileDropdown from "../ProfileDropdown";
import { useEffect, useRef, useState } from "react";
import { navProps } from "../../../types";

export default function Navbar( {navActive, setNavActive }: navProps ) {
  const linksRef = useRef<HTMLDivElement | null>(null);
  

  const [isMenuActive, setIsMenuActive] = useState(false);

  const showMenu = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the menu button click from being detected by the window listener
    setIsMenuActive((prev) => !prev);
  };

  const NavClickHandler = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A" || target.tagName === "LI") {
      setNavActive({
        link: target.innerHTML,
        "y-pos": target.getBoundingClientRect().y - (target.tagName === "A" ? 90 : 76),
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (linksRef.current && !linksRef.current.contains(e.target as Node)) {
        setIsMenuActive(false); // Close the menu only if clicking outside the menu
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="nav bg-primary z-30">
      <div className="global-mx py-5 flex justify-between items-center">
        <div className="w-[3rem] flex items-center">
          <IoMenu
            className="text-4xl text-white cursor-pointer"
            onClick={showMenu}
          />
        </div>
        <div className="relative"></div>
        <ProfileDropdown />
      </div>

      <div
        ref={linksRef}
        id="side-bar"
        className={`nav__container absolute bg-white w-[13rem] overflow-hidden shadow-lg transition-all ${
          isMenuActive ? "h-auto nav__container--active" : "h-0"
        }`}
      >
        <span
          className={`span__nav-link-indicator absolute right-0 h-[3.3rem] rounded-full w-[3px] bg-primary-200 transition-all duration-500 ease-in-out`}
          style={{ top: `${navActive["y-pos"]}px` }}
        ></span>
        <ul className="nav__links w-full text-l" onClick={NavClickHandler}>
          <li>
            <Link href={""}>Create Post</Link>
          </li>
          <li>
            <Link href={""}>Post List</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
