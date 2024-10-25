'use client'

import FeaturedPosts from '@/components/FeaturedPosts';
import { useEffect} from 'react';
import { useRouter } from 'next/navigation';
//install daisyUI   npm i -D daisyui@latest

import Post from '@/components/Post'
import { login } from '../../../utils/middleware';

export default function Home() {

  const router = useRouter();
  const isAuthenticated = login;

  useEffect(() => {
    
    if (isAuthenticated) {
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
