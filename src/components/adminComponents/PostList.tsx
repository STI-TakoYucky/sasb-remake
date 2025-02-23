'use client'

import { ObjectId } from "mongodb";
import React, { useEffect, useState } from "react";

export default function PostList( ) {

  const URL = process.env.NEXT_PUBLIC_API_URL;
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState<string | null>(null);
  
  useEffect(() => {
    const username = localStorage.getItem("username")
    setUser(username);
    const fetchPosts = async () => {
      const res = await fetch(`${URL}/api/get-user-posts`, {
        method: "POST", 
        headers: {
          "Content-Type": "text/plain"
        },
        body: username,
        cache: 'no-store'
      });
      const data = await res.json();
      setPosts(data);
      console.log(data)
    }
    fetchPosts();
  }, [])

  const deletePost = async (_id: ObjectId, username: string | null) => {
    try {
      const res = await fetch(`${URL}/api/delete-user-post`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({_id, username})
      });


      const fetchPosts = async () => {
        const res = await fetch(`${URL}/api/get-user-posts`, {
          method: "POST", 
          headers: {
            "Content-Type": "text/plain"
          },
          body: username,
          cache: 'no-store'
        });
        const data = await res.json();
        setPosts(data);
        console.log(data)
      }
      fetchPosts();

      const data = await res.json();
      console.log(data.message);
    } catch (error: any) {
      console.log("ERROR")
    }
   
  }

  return (
    <>
     {Array.isArray(posts) && posts.length > 0 ? (posts?.map((post: any) => {
      return (
      <div key={post._id} className="flex items-center justify-between bg-slate-100 p-5 rounded-md mb-4 text-xs">
        <div className="flex">
          <img src={post.images[0].url} className="aspect-square object-cover w-[5rem] h-[5rem]"></img>
          <p className="mx-4">
            {post.caption}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button className="btn btn-success btn-sm w-[4rem]">Edit</button>
          <button className="btn btn-error btn-sm" onClick={() => {
            console.log(post._id)
            deletePost(post._id, user)}}>Delete</button>
        </div>
      </div>)
     })) : 
     <p>No post available</p> }
   </> 
  );
}
