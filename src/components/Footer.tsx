import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className='bg-primary-200 flex flex-col h-[20rem] justify-center items-center gap-7'>
        <div className='bg-primary rounded-full p-2'>
            <Image
                src={"/images/logo.png"}
                alt='SCC Logo'
                height={60}
                width={60}
            ></Image>
        </div>
        <div>
            <ul className='flex text-white gap-5'>
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={""}>Featured Posts</Link></li>
                <li><Link href={""}>Organizations</Link></li>
                <li><Link href={""}>Contacts</Link></li>
            </ul>
        </div>
        <div className='flex text-white gap-5 text-[2rem]'>
            <Link href={""} className='hover:scale-125 hover:text-secondary transition-all duration-500'><FaFacebook/></Link>
            <Link href={""} className='hover:scale-125 hover:text-secondary transition-all duration-500'><FaYoutube/></Link>
            <Link href={""} className='hover:scale-125 hover:text-secondary transition-all duration-500'><FaTwitter/></Link>
        </div>
    </footer>
  )
}
