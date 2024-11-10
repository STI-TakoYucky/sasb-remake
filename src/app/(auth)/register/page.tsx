"use client";

import { useEffect, useState } from "react";
import { verifyToken } from "../../../../lib/verifyToken";
import { useRouter } from "next/navigation";
import { AuthenticationPage, CustomAuthForm } from "@/components";
import { useAuthRefs } from "../../../../hooks";

export default function Register() {
  const router = useRouter();
  const { emailRef, firstNameRef, lastNameRef, passwordRef } = useAuthRefs();
  const [error, setError] = useState(false);
  //sets the message in the form whether if it is an error or a successful operation for the users to see
  const [statusMessage, setStatusMessage] = useState("");
  //disable the register button if the registration is a success
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && verifyToken(token)) {
      router.push("/");
    }
  }, [router]);

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
    console.log("check credentials");

    event.preventDefault();
    const email = emailRef.current?.value.trim();
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !firstName || !lastName || !password) {
      setStatusMessage("Please fill out all the required fields.");
      setError(true);
    } else if (!verifyPassword(password)) {
      setStatusMessage("Please input a valid password.");
      setError(true);
    } else if (!verifyEmail(email)) {
      setStatusMessage(
        "Please enter a valid email."
      );
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
      console.timeEnd("CHECK CREDENTIALS");
    }

    //test comment
  };

  return (
    <AuthenticationPage
      linkName="Login"
      link="/log-in"
      styles="shadow-2xl w-full global-mx flex flex-col justify-center items-center rounded-md bg-white h-[54rem] p-8 max-w-[30rem] md:max-w-[35rem]"
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
        <div className="text-gray-600 mt-3">
          <ul className="flex gap-[.5rem] flex-col">
            <li>
              <p>Must contain atleast one uppercase and lowercase letter.</p>
            </li>
            <li>
              <p>Must contain atleast one digit.</p>
            </li>
            <li>
              <p>Must be 8 characters long.</p>
            </li>
            <li>
              <p>Must contain atleast one @$!%*?&-_</p>
            </li>
            <li>
              <p></p>
            </li>
          </ul>
        </div>

        {statusMessage && (
          <div className="-mb-5">
            <span>
              <p className={error ? "text-red-500" : "text-green-500"}>
                {statusMessage}
              </p>
            </span>
          </div>
        )}
      </CustomAuthForm>
    </AuthenticationPage>
  );
}
