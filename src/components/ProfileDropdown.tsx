'use client'

import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { CiLogout } from "react-icons/ci";
import { CreatePostButton } from "./adminComponents";
import { userContext } from "./UserContextComponent";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

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

  const getUserHandler = async () => {
    const URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const username = localStorage.getItem("username");
      const res = await fetch(`${URL}/api/get-user`, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username})
      })

      if(res.ok) {
        router.replace(`/profile/${username}`)
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <button className='underline text-white cursor-pointer' onClick={toggleProfileDropdown}>{username}</button>
      <div className={profileDropdownStyles}>
        <button className="flex items-center justify-center gap-2"
        onClick={getUserHandler}>
          <FaUser /> Profile
        </button>
      {role == "admin" && <CreatePostButton></CreatePostButton>}
        <button
          className="flex items-center justify-center gap-2"
          onClick={Logout}>
          <CiLogout /> Logout
        </button>
      </div>
    </>
  );
}
