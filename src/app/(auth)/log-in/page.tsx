'use client'

import React from "react";
import { verifyToken } from "../../../../lib/verifyToken";
import { useState, useEffect } from 'react'
import { CustomAuthForm } from "@/components";
import { useRouter } from "next/navigation";
import { useAuthRefs } from "../../../../hooks";
import { login } from "../../../../lib/authenticate";
import { setUsername, fullName } from "../../../../utils";
import { AuthenticationPage } from "@/components";


export default function Login() {

const router = useRouter();
const [error, setError] = useState(false);
const { emailRef, passwordRef } = useAuthRefs();
const [isSuccess, setSuccess] = useState(false);

  //sets the message in the form whether if it is an error or a successful operation for the users to see
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token && verifyToken(token)){
        router.push('/')
    }
}, [router])

const HandleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const email = emailRef.current?.value;
  const password = passwordRef.current?.value;

  try {

    const res = await login(email, password);

    const data = await res.json();

    if (res.ok) {
      setError(false);
      setStatusMessage(data.message)
        
      if (typeof window !== "undefined") {
        setUsername(data.firstName, data.lastName)   
        localStorage.setItem('username', fullName)
        localStorage.setItem("token", data.token);
      }
      router.replace('/')
    } else if (!res.ok) {
      setStatusMessage(data.message)
      setError(true);
    }
  } catch (error: any) {
    setStatusMessage(error.message);
  }
}

  return (
    <AuthenticationPage
      linkName="Register"
      link="/register"
      styles="shadow-2xl w-full global-mx flex flex-col justify-center items-center rounded-md bg-white h-[35rem] p-8 max-w-[30rem]"
    >
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
    </AuthenticationPage>
    
       
       
  );
}
