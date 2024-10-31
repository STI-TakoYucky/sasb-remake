'use client'

import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { CustomAuthForm } from "@/components";
import { useRouter } from "next/navigation";
import { useAuthRefs } from "../../../../hooks";

export default function Login() {

const [error, setError] = useState(false);
const router = useRouter();
const { emailRef, passwordRef } = useAuthRefs();
const [isSuccess, setSuccess] = useState(false);

  //at render, change the success to false to reset the registration button
  useEffect(() => {
    setSuccess(false);
  }, [])

const HandleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const email = emailRef.current?.value;

  try {
    const res = await fetch('/api/log-in', {
      method: "GET",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    })

  } catch (error) {
    console.error(error);
  }
}

  return (
    <main className="flex justify-center items-center h-[100dvh] bg-primary-200">
      <section className="shadow-2xl w-full global-mx flex flex-col justify-center items-center rounded-md bg-white h-[35rem] p-8 max-w-[30rem]">
        <div className="flex items-center justify-center flex-col mb-5">
          <Image
            src={"/images/logo.png"}
            width={100}
            height={100}
            alt="scc logo"
            className="bg-primary-100 rounded-full p-3"
          />
          <h1 className="font-bold text-2xl mt-3">Welcome to SASB!</h1>
        </div>
       
       <CustomAuthForm
       data={[
        {
          icon: "/images/mail.svg",
          inputType: "text",
          placeholder: "Email",
          ref: emailRef
        },
        {
          icon: "/images/key-round.svg",
          inputType: "password",
          placeholder: "Password",
          ref: passwordRef
        }
       ]}
       submit={HandleLogin}
       buttonName="Log In"
       success={isSuccess}

       ></CustomAuthForm>

        <div className="text-center w-[80%] relative flex flex-col items-center mb-5">
          <p className="bg-white text-primary z-50 px-5">OR</p>
          <div className="bg-primary w-full h-[2px] absolute top-3"></div>
        </div>

        <div>
          <p>Need an account? <Link href={"/register"} className="underline text-primary-200">Register</Link></p>
        </div>
      </section>
    </main>
  );
}
