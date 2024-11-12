"use client";

import React, { useState, useEffect } from "react";

type UserContextType = {
  role: string;
  username: string;
  updateUser: (user: Partial<UserContextType>) => void; // function to update user data
};

export const userContext= React.createContext<UserContextType | undefined> (undefined);

const UserContextComponent = ({ children }: any) => {

  const [user, setUser] = useState({
    role: "",
    username: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const username = localStorage.getItem('username');
      const role = localStorage.getItem('role');

      if(!username || !role) {
        return
      }
      
      updateUser({role: role, username: username})
    }
  }, [])


  const updateUser = (newUserData: Partial<UserContextType>) => {
    setUser(prevUser => ({...prevUser, ...newUserData}))
  }

  return (
    <>
      <userContext.Provider
        value={{...user, updateUser}}
      >
        {children}
      </userContext.Provider>
    </>
  );
};

export default UserContextComponent;
