import React from 'react'

export default async function Profile( { params }: {params: Promise<{ username: string }>}) {
  const username = (await params).username;
  return (
    <main className=''>
      <div className='flex flex-row items-center justify-between bg-slate-100 py-7 global-px'>
        <div className='flex items-center'>
          <div className=' rounded-full overflow-hidden w-[5rem] mr-4'>
            <img src="/images/default-profile.jpg" className='w-[100%] h-auto object-cover'></img>
          </div>
          <div className='mr-4'> 
            <p className='font-bold'>Lucky Estrada</p>
            <p>@{username}</p>
          </div>
        </div>
        <input type='button' className='btn btn-success' value={"Edit Profile"}></input>
      </div>

      <h1>Posts</h1>
    </main>
  )
}
