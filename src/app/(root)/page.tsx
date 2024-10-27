'use client'

import FeaturedPosts from '@/components/FeaturedPosts';
import { useEffect} from 'react';
import { useRouter } from 'next/navigation';
//install daisyUI   npm i -D daisyui@latest

import Post from '@/components/Post'

export default function Home() {

  const router = useRouter();
  const isAuthenticated = false;

  useEffect(() => {
    
    if (!isAuthenticated) {
        router.push('/log-in');
    }
}, [isAuthenticated, router]);

  return (
    <main className='py-20'>
      <FeaturedPosts></FeaturedPosts>
      <Post></Post>
    </main>
  );
}
