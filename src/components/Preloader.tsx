'use client'

import React, { useEffect, useState } from 'react'

export default function Preloader() {
  const [isLoading, setLoading] = useState(true);
  

  useEffect(() => {

    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
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
    <div>
        {/* <img src="images/preloader.gif" alt="" /> */}
        {
            isLoading && ( <video width="320" height="240" autoPlay loop playsInline muted className='h-screen w-full object-cover'>
              <source src="videos/preloader.mp4" type="video/mp4"/>
            </video>)
        }
    </div>
  )
}
