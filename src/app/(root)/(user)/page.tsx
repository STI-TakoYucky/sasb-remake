'use client'
import FeaturedPosts from '@/components/FeaturedPosts';
//install daisyUI   npm i -D daisyui@latest
import Post from '@/components/Post'
import React, { useEffect, useState } from 'react';

// Use getServerSideProps to fetch data on every request
// app/(root)/(user)/page.tsx
  
export default function Home() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${URL}/api/get-posts`, {
        cache: 'no-store', // This ensures the data is fetched fresh on every request
      });
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, []); // The empty dependency array ensures this runs only once when the component mounts.

  if (!data) return <div>Loading...</div>;

  return (
    <main className='py-20'>
        <FeaturedPosts></FeaturedPosts>
        <Post posts={data}></Post>
    </main>
  );
}
