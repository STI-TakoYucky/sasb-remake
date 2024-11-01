import connect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { NextResponse } from 'next/server'

export async function POST(request: any) {
    await connect();
    const  { email, password } = await request.json();

    const user: any = await User.findOne({"email": email})
    

    if (!user) {
        return NextResponse.json({message: "Email does not exist"}, {status: 404})
    }

    if(user.password === password) {
        return NextResponse.json({message: "Logged in succesfully"}, {status: 200})
    }

    return NextResponse.json({message: "Invalid Password"}, {status: 401})
}