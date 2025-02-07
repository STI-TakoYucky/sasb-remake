import { Post } from '@/components';
import React from 'react'

export default async function Profile( { params }: {params: Promise<{ username: string }>}) {
  const username = (await params).username;
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${URL}/api/get-user-posts`, {
    method: "POST", 
    headers: {
      "Content-Type": "text/plain"
    },
    body: username,
    cache: 'no-store'
  });
  const data = await res.json();

  return (
    <main className=''>
      <div className='cover-photo bg-slate-400 py-10 h-[7rem] w-full'></div>
      <div className='flex flex-row items-center justify-between bg-slate-100 global-px pb-[2rem]'>
        <div className='flex items-center pt-6'>
          <div className=' rounded-full overflow-hidden w-[6rem] mr-4 mt-[-6rem]'>
            <img src="/images/default-profile.jpg" className='w-[100%] h-auto object-cover'></img>
          </div>
          <div className='mr-4'> 
            <p className='font-bold text-lg'>{username}</p>
            <p className='text-sm'>@{username}</p>
          </div>
          <input type='button' className='btn btn-success' value={"Edit Profile"}></input>
        </div>
      </div>
      <Post posts={data}></Post>
    </main>
  )
}
