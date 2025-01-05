import FeaturedPosts from '@/components/FeaturedPosts';
//install daisyUI   npm i -D daisyui@latest
import Post from '@/components/Post'
import React from 'react';

async function fetchPosts() {
  const URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("API URL in server:", URL); // Log the URL to verify it's correct
  const res = await fetch(`${URL}/api/get-posts`);

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data = await res.json();
  console.log("Fetched Data:", data); // Log the fetched data
  return data;
}


export default async function Home() {
  const posts = await fetchPosts();

  return (
    <main className='py-20'>
        <FeaturedPosts></FeaturedPosts>
        <Post data={posts}/>
    </main>
  );
}
