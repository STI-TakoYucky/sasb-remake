import User from "../../../../models/User";
import connect from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

let isConnected = false;

export const POST = async (request: any, response: any) => {

    if (!isConnected) {
        await connect();
        isConnected = true;
    }

    const { firstName, lastName, email, password } = await request.json();

    const emailExists = await User.findOne({email})

    if(emailExists) {
        return NextResponse.json({message: "Email already exists"}, {status: 409})
    }

    try {
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
        });
        await newUser.save();

        return NextResponse.json({ message: "Registered successfully" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
};
