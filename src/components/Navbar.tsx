'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import { IoMenu } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
//npm install react-icons --savell react-icons --save

export default function Navbar() {

  const router = useRouter();
  
const [isProfileSettingsToggled, setProfileSettingsToggle] = useState(false);

  const showMenu = () => {
    const links: HTMLElement | null = document.querySelector('.nav__container');

    if(links?.classList.contains('nav__container--active')){
      links?.classList.remove('nav__container--active');
    } else {
      links?.classList.add('nav__container--active');
    }
  }

  const Logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem('username');
      localStorage.removeItem('token')
    }
    router.replace('/log-in')
  }

  const getUsername = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('username')
    }
  }

  const toggleProfileSettings = () => {
    !isProfileSettingsToggled ? setProfileSettingsToggle(true) : setProfileSettingsToggle(false)
  }

  const profileSettingsStyle = `${isProfileSettingsToggled ? "block" : "hidden"} bg-white h-52 w-[15rem] absolute right-0 top-7 rounded-md p-5 text-lg`

  return (
    <nav className='bg-primary z-30'>
        <div className='global-mx py-5 flex justify-between items-center'>  
            <div className='w-[3rem] flex items-center'><img src="./images/logo.png" alt="" /><h1 className='text-4xl font-onest font-bold text-white ml-1 mt-1'>SASB</h1></div>
            <div className='relative'>
              <button className='underline text-white cursor-pointer' onClick={toggleProfileSettings}>{getUsername()}</button>
              <div className={profileSettingsStyle}>
                <button className='flex items-center justify-center gap-2' onClick={Logout}><CiLogout /> Logout</button>
              </div>
            </div>
            
            <div className='hidden'><IoMenu className='text-5xl text-white cursor-pointer' onClick={showMenu}/></div>
        </div>
        
        <div className='nav__container absolute bg-primary-200 w-full overflow-hidden h-0'>
            <ul className='nav__links w-full text-center text-2xl text-white'>
                <li><Link href={""}>Home</Link></li>
                <li><Link href={""}>Featured Posts</Link></li>
                <li><Link href={""}>Organizations</Link></li>
                <li><Link href={""}>Contacts</Link></li>
            </ul>
        </div>
    </nav>
  )
}
