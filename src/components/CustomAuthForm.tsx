import React, { useState } from 'react'
import Image from 'next/image'
import { CustomAuthFormProps } from '../../types'

export default function AuthForm({data, submit, buttonName, children, success}: CustomAuthFormProps) {

  
  return (
    <>
         <form className="form-control gap-5 w-full max-w-[30rem]" onSubmit={submit} noValidate>
          {
            data.map(({icon, inputType, placeholder, ref}, index) => {
              return (
                <label className="input input-primary input-bordered flex items-center gap-2" key={index}>
                <Image src={icon} width={20} height={20} alt='email' className=''/>
                <input type={inputType} name={placeholder} className="grow" placeholder={placeholder} ref={ref} required/>
                </label>
              );
            })
          }
          {children}

          <input className="btn btn-success mb-5 mt-3 disabled:bg-[#00a96e]" type="submit" value={buttonName} disabled={success}></input>
        </form>
    </>
  )
}
