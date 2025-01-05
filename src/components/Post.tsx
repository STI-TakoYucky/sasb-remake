'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Post({ data }: any) {
  const [posts, setPosts] = useState<any[]>(data); // Initialize state with the fetched data
  const [loading, setLoading] = useState<boolean>(false); // For loading state
  const [error, setError] = useState<string>(''); // For error handling

  // Function to fetch the latest posts
  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/get-posts'); // Use your API URL here
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const newPosts = await res.json();
      setPosts(newPosts); // Update the posts state
    } catch (err) {
      setError('Error fetching posts');
    } finally {
      setLoading(false);
    }
  };

  // Refetch the posts when the component mounts or when new data is posted
  useEffect(() => {
    fetchPosts(); // Fetch latest data when the component mounts
  }, []); // Empty dependency array ensures this runs once when the component loads

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post: any) => (
          <div className="post-item global-mx my-16" key={post._id}>
            <div className="flex post-header">
              <Image
                src="https://picsum.photos/1300"
                width={100}
                height={100}
                alt="image"
                className="bg-primary-100 w-12 h-12 rounded-full p-2"
              />
              <div className="ml-2">
                <h1 className="font-onest text-lg">{post.organization}</h1>
                <p>2 hrs ago</p>
              </div>
            </div>

            <div className="post-image my-5 grid grid-cols-2 gap-2">
              <img
                src="https://picsum.photos/1300"
                alt=""
                className="rounded-md row-span-2 h-full object-cover"
              />
              <img
                src="https://picsum.photos/1360"
                alt=""
                className="rounded-md aspect-video object-cover"
              />
              <img
                src="https://picsum.photos/1340"
                alt=""
                className="rounded-md aspect-video object-cover"
              />
            </div>
            <div className="post-desc">{post.caption}</div>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}

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
    </>
  );
}
