'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CustomAuthForm } from '@/components'
import { useAuthRefs } from '../../../../hooks'

export default function Register() {

    const { emailRef, usernameRef, passwordRef} = useAuthRefs();

    const HandleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = emailRef.current?.value;
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
      }

  return (
    <div>
        <main className="flex justify-center items-center h-[100dvh] bg-primary-200">
      <section className="shadow-2xl w-full global-mx flex flex-col justify-center items-center rounded-md bg-white h-[40rem] p-8 max-w-[30rem]">
        <div className="flex items-center justify-center flex-col mb-5">
          <Image
            src={"/images/logo.png"}
            width={100}
            height={100}
            alt="scc logo"
            className="bg-primary-100 rounded-full p-3"
          />
          <h1 className="font-bold text-2xl mt-3">Register an account</h1>
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
            icon: "/images/user-round.svg",
            inputType: "text",
            placeholder: "Username",
            ref: usernameRef
        },
        {
          icon: "/images/key-round.svg",
          inputType: "password",
          placeholder: "Password",
          ref: passwordRef
        }
       ]}
       submit={HandleRegister}
       buttonName="Register"
       ></CustomAuthForm>

        <div className="text-center w-[80%] relative flex flex-col items-center mb-5">
          <p className="bg-white text-primary z-50 px-5">OR</p>
          <div className="bg-primary w-full h-[2px] absolute top-3"></div>
        </div>

        <div>
          <p>Have an existing account? <Link href={"/log-in"} className="underline text-primary-200">Log In</Link></p>
        </div>
      </section>
    </main>
    </div>
  )
}
