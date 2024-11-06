'use client'

import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { CustomAuthForm } from "@/components";
import { useRouter } from "next/navigation";
import { useAuthRefs } from "../../../../hooks";
import { login } from "../../../../lib/authenticate";
import { setUsername, fullName } from "../../../../utils";


export default function Login() {

const router = useRouter();
const [error, setError] = useState(false);
const { emailRef, passwordRef } = useAuthRefs();
const [isSuccess, setSuccess] = useState(false);

  //sets the message in the form whether if it is an error or a successful operation for the users to see
  const [statusMessage, setStatusMessage] = useState("");

  //at render, change the success to false to reset the registration button
  useEffect(() => {
    setSuccess(false);
  }, [])

const HandleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const email = emailRef.current?.value;
  const password = passwordRef.current?.value;

  try {

    const res = await login(email, password);
    
    const { message, token, firstName, lastName } = await res.json();

    if (res.ok) {
      setError(false);
      setStatusMessage(message)     
      if (typeof window !== "undefined") {
        localStorage.setItem('username', fullName)
        localStorage.setItem("token", token);
      }
      setUsername(firstName, lastName);
      router.replace('/')
    } else if (res.status === 404) {
      setStatusMessage(message)
      setError(true);
    } else if (res.status === 401) {
      setStatusMessage(message)
      setError(true);
    }

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

       >
        {statusMessage && (
            <div className="-mb-5">
              <span>
                <p className={error ? "text-red-500": "text-green-500"}>{statusMessage}</p>
              </span>
            </div>
            )}
       </CustomAuthForm>

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
