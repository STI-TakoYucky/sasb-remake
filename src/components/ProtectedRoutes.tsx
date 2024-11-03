'use client'

import { useEffect } from 'react'
import { verifyToken } from '../../lib/verifyToken';
import { useRouter } from 'next/navigation'

export default function ProtectedRoutes( { children }: any ) {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token || !verifyToken(token)){
            router.push('/log-in')
        }
    }, [router])
  return (
    <>
    {children}
    </>
  )
}
