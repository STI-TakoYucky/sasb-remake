'use client'

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { CreatePostButton } from "./adminComponents";
import { userContext } from "./UserContextComponent";

export default function ProfileDropdown() {
  const [isProfileDropdownToggled, setProfileDropdownToggle] = useState(false);
  
  
  const router = useRouter();
  const USERCONTEXT = useContext(userContext);

  if (!USERCONTEXT) {
    throw new Error("USERCONTEXT must be used within a UserProvider");
  }

  const { username, role } = USERCONTEXT;

  const Logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("username");
      localStorage.removeItem("token");
    }
    router.replace("/log-in");
  };

  const toggleProfileDropdown = () => {
    !isProfileDropdownToggled
      ? setProfileDropdownToggle(true)
      : setProfileDropdownToggle(false);
  };

  const profileDropdownStyles = `${
    isProfileDropdownToggled ? "block" : "hidden"
  } bg-white h-52 w-[15rem] absolute right-5 top-[4rem] rounded-md p-5 text-lg flex flex-col items-start gap-3`;

  return (
    <>
    <button className='underline text-white cursor-pointer' onClick={toggleProfileDropdown}>{username}</button>
      <div className={profileDropdownStyles}>
      {role == "admin" && <CreatePostButton></CreatePostButton>}
        <button
          className="flex items-center justify-center gap-2"
          onClick={Logout}
        >
          <CiLogout /> Logout
        </button>
      </div>
    </>
  );
}
