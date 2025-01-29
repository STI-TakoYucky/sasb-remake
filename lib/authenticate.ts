import { NextResponse } from "next/server";

export const login = async (email: string | undefined, password: string | undefined) => {
    const URL = process.env.NEXT_PUBLIC_API_URL;

    try {
      const res = await fetch(`${URL}/api/log-in`, {
        method: "POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      })

      const data = await res.json();

      

      if(res.ok) {
        return NextResponse.json({ "message": data.message, "token": data.token, "username": data.username, "role": data.role}, {status: res.status});
      }


      return NextResponse.json({ "message": data.message }, {status: res.status});
    } catch (error) {
      return NextResponse.json({error})
    }

}