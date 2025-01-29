import { NextResponse } from "next/server";
import connect from "../../../../lib/mongodb";
import User from "../../../../models/UserModel";

export async function POST(request: any) {
    try {
        await connect();

        const {username} = await request.json();
        const user: any = await User.findOne({"username": username})

        if(!user) {
            return NextResponse.json({message: "User does not exist"}, {status: 404})
        }

        return NextResponse.json({message: "Success", "user": user}, {status: 200})
         
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}