import User from "../../../../models/User";
import connect from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    await connect();
    const { firstName, lastName, email, password } = await request.json();

    const emailAlreadyExists: string | null = await User.findOne({"email": email})

    if(emailAlreadyExists){
        return NextResponse.json({message: "Email already exists"}, {status: 409 });
        
    } else {

        await User.create({firstName, lastName, email, password});
    
        return NextResponse.json({message: "Registered succesfully"}, {status: 201});
    }
}
