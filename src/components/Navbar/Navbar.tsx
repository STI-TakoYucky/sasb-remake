'use client'

import React from 'react'
import Link from 'next/link'
import '../Navbar/NavbarStyles.css'

import { IoMenu } from "react-icons/io5";
//npm install react-icons --savell react-icons --save

export default function Navbar() {

  const showMenu = () => {
    const links: HTMLElement | null = document.querySelector('.links-container');

    if(links?.classList.contains('active')){
      links?.classList.remove('active');
    } else {
      links?.classList.add('active');
    }
  }

  return (
    <nav className='bg-primary relative z-30'>
        <div className='global-mx py-5 flex justify-between items-center'>  
            <div className='w-[3rem] flex items-center'><img src="./images/logo.png" alt="" /><h1 className='text-4xl font-onest font-bold text-white ml-1 mt-1'>SASB</h1></div>
            <div><IoMenu className='text-5xl text-white cursor-pointer' onClick={showMenu}/></div>
        </div>
        
        <div className='links-container absolute bg-primary-200 w-full overflow-hidden h-0'>
            <ul className='w-full text-center text-2xl text-white'>
                <li><Link href={""}>Home</Link></li>
                <li><Link href={""}>Featured Posts</Link></li>
                <li><Link href={""}>Organizations</Link></li>
                <li><Link href={""}>Contacts</Link></li>
            </ul>
        </div>
    </nav>
  )
}
