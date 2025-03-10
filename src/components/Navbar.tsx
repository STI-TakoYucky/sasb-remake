"use client";

import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import ProfileDropdown from "./ProfileDropdown";

//npm install react-icons --savell react-icons --save

export default function Navbar() {
  const showMenu = () => {
    const links: HTMLElement | null = document.querySelector(".nav__container");

    if (links?.classList.contains("nav__container--active")) {
      links?.classList.remove("nav__container--active");
    } else {
      links?.classList.add("nav__container--active");
    }
  };

  return (
    <nav className="bg-primary z-30">
      <div className="global-mx py-5 flex justify-between items-center">
        <div className="w-[3rem] flex items-center">
          <img src="/images/logo.png" alt="" />
          <h1 className="text-4xl font-onest font-bold text-white ml-1 mt-1">
            <Link href="/">SASB</Link>
          </h1>
        </div>
        <div className="relative"></div>

        <ProfileDropdown></ProfileDropdown>

        <div className="hidden">
          <IoMenu
            className="text-5xl text-white cursor-pointer"
            onClick={showMenu}
          />
        </div>
      </div>

      <div className="nav__container hidden absolute bg-primary-200 w-full overflow-hidden h-0">
        <ul className="nav__links w-full text-center text-2xl text-white">
          <li>
            <Link href={""}>Home</Link>
          </li>
          <li>
            <Link href={""}>Featured Posts</Link>
          </li>
          <li>
            <Link href={""}>Organizations</Link>
          </li>
          <li>
            <Link href={""}>Contacts</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
  //for streak :P
}
