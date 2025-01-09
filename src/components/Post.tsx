"use client";
export const dynamic = "force-dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { postProps } from '../../types'
import CustomImageContainer from "./CustomImageContainer";
import { formatDistanceToNow } from "date-fns";

export default function Post({ posts }: postProps) {
  useEffect(() => {
    console.log("initialData: ", posts);
  }, []);

  return (
    <div>
    {Array.isArray(posts) && posts.length > 0 ? (
      posts.map((post: any) => (
        <div className="post-item global-mx mt-16" key={post._id}>
          <div className="flex post-header">
            <Image
              src="/images/logo.png"
              width={100}
              height={100}
              alt="image"
              className="bg-primary-100 w-12 h-12 rounded-full p-2"
            />
            <div className="ml-2">
              <h1 className="font-onest text-lg">{post.organization}</h1>
              <p>{formatDistanceToNow(post.createdAt)} ago</p>
            </div>
          </div>

          <CustomImageContainer images={post.images} />

          <div className="post-desc">{post.caption}</div>
          <div className="bg-primary-200 h-[.1rem] rounded-full w-full mt-10"></div>
        </div>
      ))
    ) : (
      <p>No posts available</p>
    )}
  </div>
  );
}


      {/* <div className='post-item global-mx my-16'>
        <div className='flex post-header'>
            <Image src="/images/logo.png" width={100} height={100} alt='image' className='bg-primary-100 w-12 h-12 rounded-full p-2'/>
            <div className='ml-2'>
                <h1 className='font-onest text-lg'>Samuel Christian College</h1>
                <p>2 hrs ago</p>
            </div>
        </div>

        <div className='post-image my-5 grid grid-cols-2 gap-2'>
            <img src="https://picsum.photos/1300" alt="" className='rounded-md row-span-2 h-full object-cover'/>
            <img src="https://picsum.photos/1360" alt="" className='rounded-md aspect-video object-cover'/>
            <img src="https://picsum.photos/1340" alt="" className='rounded-md aspect-video object-cover'/>
        </div>
        <div className='post-desc'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium in perspiciatis fugit, reprehenderit nostrum deleniti expedita sunt adipisci cupiditate dolore tenetur commodi id blanditiis nisi aperiam veniam? Molestias, ut ducimus!
        </div>
    </div>

    <div className='post-item global-mx my-16'>
        <div className='flex post-header'>
            <Image src="/images/logo.png" width={100} height={100} alt='image' className='bg-primary-100 w-12 h-12 rounded-full p-2'/>
            <div className='ml-2'>
                <h1 className='font-onest text-lg'>Samuel Christian College</h1>
                <p>2 hrs ago</p>
            </div>
        </div>

        <div className='post-image my-5 grid gap-2'>
            <img src="https://picsum.photos/1300" alt="" className='rounded-md row-span-2 h-full object-cover'/>

        </div>
        <div className='post-desc'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium in perspiciatis fugit, reprehenderit nostrum deleniti expedita sunt adipisci cupiditate dolore tenetur commodi id blanditiis nisi aperiam veniam? Molestias, ut ducimus!
        </div>
    </div>

    <div className='post-item global-mx my-16'>
        <div className='flex post-header'>
            <Image src="/images/logo.png" width={100} height={100} alt='image' className='bg-primary-100 w-12 h-12 rounded-full p-2'/>
            <div className='ml-2'>
                <h1 className='font-onest text-lg'>Samuel Christian College</h1>
                <p>2 hrs ago</p>
            </div>
        </div>

        <div className='post-image my-5 grid grid-cols-2 gap-2'>
            <img src="https://picsum.photos/1300" alt="" className='rounded-md h-full object-cover'/>
            <img src="https://picsum.photos/1360" alt="" className='rounded-md object-cover'/>
        </div>
        <div className='post-desc'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium in perspiciatis fugit, reprehenderit nostrum deleniti expedita sunt adipisci cupiditate dolore tenetur commodi id blanditiis nisi aperiam veniam? Molestias, ut ducimus!
        </div>
    </div> */}
