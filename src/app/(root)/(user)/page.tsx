
import FeaturedPosts from '@/components/FeaturedPosts';
//install daisyUI   npm i -D daisyui@latest
import Post from '@/components/Post'
import React from 'react';


  
export default async function Home() {

  try {
      const URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${URL}/api/get-posts`, {
        cache: 'no-store', // This ensures the data is fetched fresh on every request
      });
      const data = await res.json();


      return (
        <main className='py-20'>
            <FeaturedPosts></FeaturedPosts>
            <Post posts={data}></Post>
        </main>
      )
  } catch (error) {
    
  }

}
