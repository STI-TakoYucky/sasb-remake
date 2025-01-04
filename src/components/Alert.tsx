'use client'

import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5"
import { alertProps } from "../../types"


const Alert:React.FC<alertProps> = ({setError, setStatusMessage}) => {
   
  return (
    <div role="alert" className={`alert bg-white absolute w-[91%] max-w-[34rem] top-10 px-8 text-left shadow-lg flex justify-center items-center`}>
  <div className=" relative">
          <ul className="flex gap-[1rem] flex-col">
            <li>
            <div className='flex justify-end'>
                <IoClose onClick={() => {setError(false); setStatusMessage("")}} className='text-4xl font-bold cursor-pointer hover:bg-red-500 rounded-full p-1'></IoClose>
            </div>
            </li>
            <li>
              <p>Password must contain atleast one uppercase and lowercase letter.</p>
            </li>
            <li>
              <p>Password must contain atleast one digit.</p>
            </li>
            <li>
              <p>Password must be 8 characters long.</p>
            </li>
            <li>
              <p>Password must contain atleast one of these symbols @$!%*?&-_</p>
            </li>
            <li>
              <p></p>
            </li>
          </ul>
        </div>
</div>
  )
}

export default Alert
