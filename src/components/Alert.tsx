"use client";

import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { alertProps } from "../../types";

const Alert = ({ makeAlertVisible, alertType, alertMessages, hideButton }: any) => {

  const [showAlert, setShowAlert] = useState(makeAlertVisible);
 
  return (
    <div
      role="alert"
      id="alert"
      className={`${showAlert} z-50 alert ${alertType == "error" && alertType != "default"  ?  "bg-red-300" : "bg-green-300"} ${alertType == "default" && "bg-white"} fixed w-[91%] max-w-[34rem] top-12 text-left shadow-lg flex justify-center items-center`}
    >
      <div className="flex flex-col justify-center items-center relative w-full">
          {!hideButton && <div className="flex justify-end w-full z-50">
            <IoClose
                onClick={() => {
                  setShowAlert("hidden")
                }}
                className="text-4xl font-bold cursor-pointer rounded-full p-1 -mb-[1rem]"
            ></IoClose>
          </div>}
          
        <ul className="flex flex-col justify-center items-center w-full my-[.5rem] ">
            {Array.isArray(alertMessages) ? alertMessages.map((message: string, index: number) => {
              return(<li key={index} className={`${alertMessages.length > 1 && "mb-4"}`}>
                <p>
                  {message}
                </p>
              </li>)
            }): 
            (<li>
            <p>
              {alertMessages}
            </p>
            </li>)}
          
        </ul>
      </div>
    </div>
  );
};

export default Alert;
