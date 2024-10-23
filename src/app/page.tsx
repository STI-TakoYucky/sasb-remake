import FeaturedPosts from '@/components/FeaturedPosts/FeaturedPosts';
import React from 'react';
//install daisyUI   npm i -D daisyui@latest

import Post from '@/components/Post/Post'

export default function Home() {

  return (
    <div className='pb-40'>
      <FeaturedPosts></FeaturedPosts>
      <Post></Post>
    </div>
  );
}
