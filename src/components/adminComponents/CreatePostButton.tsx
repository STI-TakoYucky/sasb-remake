import Link from 'next/link';
import React from 'react'
import { PiNotePencil } from "react-icons/pi";

export default function CreatePostButton() {
  return (
        <Link href={"/admin-dashboard/post"} className='flex items-center justify-center gap-2'><PiNotePencil /> Create Post</Link>
  )
}
