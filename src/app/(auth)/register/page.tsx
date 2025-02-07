"use client";

import { useEffect, useState } from "react";
import { verifyToken } from "../../../../lib/verifyToken";
import { useRouter } from "next/navigation";
import { AuthenticationPage, CustomAuthForm, Alert } from "@/components";
import { useAuthRefs } from "../../../../hooks";

export default function Register() {
  const router = useRouter();
  const { emailRef, usernameRef, firstNameRef, lastNameRef, passwordRef } = useAuthRefs();
  const [error, setError] = useState(false);
  const [passwordHint, setPasswordHint] = useState<string[]>();
  //sets the message in the form whether if it is an error or a successful operation for the users to see
  const [statusMessage, setStatusMessage] = useState<string | string[]>();
  //disable the register button if the registration is a success
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && verifyToken(token)) {
      router.push("/");
    }
  }, [router]);

  //resets the error status every 10 seconds
  useEffect(() => {
      setTimeout(() => {
        setError(false);
        setStatusMessage("");
        setPasswordHint(undefined)
      }, 10000)
  }, [error])

  const verifyEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.match(emailRegex)) {
      return true;
    } else {
      return false;
    }
  };

  const verifyPassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_])[A-Za-z\d@$!%*?&-_]{8,}$/;

    if (password.match(passwordRegex)) {
      return true;
    }
    return false;
  };

  const HandleRegister = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const email = emailRef.current?.value.trim();
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const password = passwordRef.current?.value;
    const username = usernameRef.current?.value;

    if (!email || !firstName || !lastName || !password) {
      setStatusMessage("Please fill out all the required fields.");
      setError(true);
    } else if (!verifyPassword(password)) {
      setStatusMessage("Invalid password");
      setPasswordHint(["Password must contain atleast one uppercase and lowercase letter.",
        "Password must contain atleast one digit.",
        "Password must be 8 characters long.",
        "Password must contain atleast one of these symbols @$!%*?&-_"]);
      setError(true);
    } else if (!verifyEmail(email)) {
      setStatusMessage("Please enter a valid email.");
      setError(true);
    } else {
      try {
        const URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${URL}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            username,
            password,
          }),
        });

        const { message } = await res.json();

        if (res.ok) {
          setSuccess(true);
          setError(false);
          setStatusMessage(message);

          setTimeout(() => {
            router.push("/log-in");
          }, 3000);
        } else if (!res.ok) {
          setError(true);
          setStatusMessage(message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <AuthenticationPage
      linkName="Login"
      link="/log-in"
      styles="shadow-2xl w-full global-mx flex flex-col justify-center items-center rounded-md bg-white h-[46rem] p-8 my-10 max-w-[30rem] md:max-w-[35rem]"
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
            icon: "/images/user-round.svg",
            inputType: "text",
            placeholder: "Username",
            ref: usernameRef,
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

        <div className="-mb-5 min-h-6">
          <span>
            <p className={error ? "text-red-500" : "text-green-500"}>
              {statusMessage}
            </p>
          </span>
        </div>
      </CustomAuthForm>
      {passwordHint && <Alert makeAlertVisible={"block"} alertType="default" alertMessages={passwordHint} button={false}></Alert>}
      {(error && !passwordHint) && <Alert makeAlertVisible={"block"} alertType="default" alertMessages={statusMessage} button={false}></Alert>}
    
    </AuthenticationPage>
  );
}
