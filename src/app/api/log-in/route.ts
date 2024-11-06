import connect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

export async function POST(request: any) {
    await connect();
    const  { email, password } = await request.json();

    const user: any = await User.findOne({"email": email})
    const firstName = user.firstName;
    const lastName = user.lastName
    

    if (!user) {
        return NextResponse.json({message: "Email does not exist"}, {status: 404})
    }

    if(user.password === password) {
        const JWT_SECRET_KEY = process.env.SECRET_KEY;

        if(!JWT_SECRET_KEY) {
            return NextResponse.json({message: "Server error"}, {status: 401})
        }
        const token = jwt.sign({email}, JWT_SECRET_KEY)
        return NextResponse.json({message: "Logged in succesfully", token, firstName, lastName}, {status: 200})
    }

    return NextResponse.json({message: "Invalid Password"}, {status: 401})
}