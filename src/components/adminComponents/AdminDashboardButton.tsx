import Link from 'next/link';
import React from 'react'
import { PiNotePencil } from "react-icons/pi";

export default function AdminDashboardButton() {
  return (
        <Link href={"/admin-dashboard"} className='flex items-center justify-center gap-2'><PiNotePencil />Admin Dashboard</Link>
  )
}
