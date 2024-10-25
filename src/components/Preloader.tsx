'use client'

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [isLoading, setLoading] = useState(true);
  

  useEffect(() => {

    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
        const preloader: HTMLElement | null = document.querySelector(".preloader");

        if(preloader) {
          preloader.style.display = "none";
        }
        
      }, 2000)
    }

    
    if(document.readyState == 'complete'){
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
   

    return () => {
      window.removeEventListener('load', handleLoad);
    }

  }, [])
  
  return (
    <div className='preloader z-[9999] h-screen w-screen fixed'>
        {
            isLoading && 
            (<div className='bg-white h-screen w-screen flex justify-center items-center'>
              <Image
                src={"/images/logo.png"}
                alt='scc logo'
                width={170}
                height={170}
                className='bg-primary-200 rounded-full p-4 animate-spin-slow'
              />
            </div>)
        }
    </div>
  )
}
