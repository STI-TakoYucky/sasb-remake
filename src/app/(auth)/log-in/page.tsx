"use client";

import React, { useContext } from "react";
import { verifyToken } from "../../../../lib/verifyToken";
import { useState, useEffect } from "react";
import { CustomAuthForm } from "@/components";
import { useRouter } from "next/navigation";
import { useAuthRefs } from "../../../../hooks";
import { login } from "../../../../lib/authenticate";
import { AuthenticationPage } from "@/components";
import { userContext } from "@/components/UserContextComponent";


export default function Login() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const { emailRef, passwordRef } = useAuthRefs();
  const [isSuccess, setSuccess] = useState(false);
  //sets the message in the form whether if it is an error or a successful operation for the users to see
  const [statusMessage, setStatusMessage] = useState("");
  const USERCONTEXT = useContext(userContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && verifyToken(token)) {
      router.push("/");
    }
  }, [router]);

  const HandleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      //check the authenticate.ts to access login function
      const res = await login(email, password);
      const data = await res.json();


      if(!USERCONTEXT) {
        throw new Error("USERCONTEXT must be inside a User Provider");
      }

      const { updateUser } = USERCONTEXT;

      if (res.ok) {
        if (typeof window !== "undefined") {
          console.log(data);
          
          setError(false);
          setSuccess(true);
          setStatusMessage(data.message);
          localStorage.setItem("username", data.username);
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          updateUser({role: data.role, username: data.username})
          router.replace("/")
        }
      } else if (!res.ok) {
        setSuccess(false);
        setStatusMessage(data.message);
        setError(true);
      }
    } catch (error: any) {
      setSuccess(false);
      setStatusMessage(error.message);
    }
  };

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
            ref: emailRef,
          },
          {
            icon: "/images/key-round.svg",
            inputType: "password",
            placeholder: "Password",
            ref: passwordRef,
          },
        ]}
        submit={HandleLogin}
        buttonName="Log In"
        success={isSuccess}
      >
        <div className="-mb-5 min-h-6">
            <span>
              <p className={error ? "text-red-500" : "text-green-500"}>
                {statusMessage}
              </p>
            </span>
          </div>
      </CustomAuthForm>
    </AuthenticationPage>
  );
}
