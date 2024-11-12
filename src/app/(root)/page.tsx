'use client'

import FeaturedPosts from '@/components/FeaturedPosts';
//install daisyUI   npm i -D daisyui@latest
import Post from '@/components/Post'
import React from 'react';


export default function Home() {

  const userContext = React.createContext({});

  return (
    <main className='py-20'>
        <FeaturedPosts></FeaturedPosts>
        <Post></Post>
    </main>
  );
}
