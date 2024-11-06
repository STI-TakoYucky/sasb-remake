"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CustomAuthForm } from "@/components";
import { useAuthRefs } from "../../../../hooks";

export default function Register() {
  const router = useRouter();

  const { emailRef, firstNameRef, lastNameRef, passwordRef } = useAuthRefs();

  const [error, setError] = useState(false);
  //sets the message in the form whether if it is an error or a successful operation for the users to see
  const [statusMessage, setStatusMessage] = useState("");
  //disable the register button if the registration is a success
  const [isSuccess, setSuccess] = useState(false);

  //at render, change the success to false to reset the registration button
  useEffect(() => {
    setSuccess(false);
  }, [])

  const HandleRegister = async (event: React.FormEvent<HTMLFormElement>) => {

    console.log("check credentials");

    event.preventDefault();
    const email = emailRef.current?.value;
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !firstName || !lastName || !password) {
      setStatusMessage("Please fill out all the required fields.");
      setError(true);
    } 
    else if(password.length < 7){
      setStatusMessage("Password must be 8 letters or more.");
      setError(true);
    } else {
        try {
          const res = await fetch("https://sasb-remake.vercel.app/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstName,
              lastName,
              email,
              password,
            }),
          });

          const { message } = await res.json();
          

          if (res.status === 201) {
          setSuccess(true);
          setError(false);
          setStatusMessage(message);

          setTimeout(() => {
            router.push("/log-in");
          }, 3000)

         
          } else if (res.status === 500) {
            setError(true);
            setStatusMessage(message);
          }
        } catch (err) {
          console.error(err)
        }
        console.timeEnd("CHECK CREDENTIALS");
    }
  };

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
                ref: emailRef,
              },
              {
                icon: "/images/user-round.svg",
                inputType: "text",
                placeholder: "First Name",
                ref: firstNameRef,
              },
              {
                icon: "/images/user-round.svg",
                inputType: "text",
                placeholder: "LastName",
                ref: lastNameRef,
              },
              {
                icon: "/images/key-round.svg",
                inputType: "password",
                placeholder: "Password",
                ref: passwordRef,
              },
            ]}
            submit={HandleRegister}
            buttonName="Register"
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
            <p>
              Have an existing account?{" "}
              <Link href={"/log-in"} className="underline text-primary-200">
                Log In
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
