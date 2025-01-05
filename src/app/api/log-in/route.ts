import connect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

let isConnected = false;

export async function POST(request: any) {
    try {
        
    if(!isConnected) {
        await connect();
        isConnected = true;
    }

    const  { email, password } = await request.json();

    const user: any = await User.findOne({"email": email})
    
    if (!user) {
        return NextResponse.json({message: "Email does not exist"}, {status: 404})
    }

    if(user.password === password) {
        const JWT_SECRET_KEY = process.env.SECRET_KEY;
        
        if(!JWT_SECRET_KEY) {
            return NextResponse.json({"message": "Server error"}, {status: 500})
        }
        const token = jwt.sign({email}, JWT_SECRET_KEY)
        return NextResponse.json({"message": "Logged in succesfully", "token": token, "firstName": user.firstName, "lastName": user.lastName, "role": user.role}, {status: 200})
    }

    return NextResponse.json({"message": "Invalid Password"}, {status: 401})

    } catch (error) {
        return NextResponse.json({"message": "Server error"}, {status: 500})
    }

    
}