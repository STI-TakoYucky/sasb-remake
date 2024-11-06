import User from "../../../../models/User";
import connect from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

let isConnected = false;

export const POST = async (request: any) => {
    console.time("START API");

    // Connect only if not connected yet (avoid reconnecting every time)
    if (!isConnected) {
        await connect();
        isConnected = true;
    }

    // Parse request body
    const { firstName, lastName, email, password } = await request.json();

    try {
        // Find user by email and handle user creation conditionally.
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.timeEnd("START API");
            return NextResponse.json({ message: "Email already exists" }, { status: 409 });
        }

        // Create new user if not already existing.
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
        });
        await newUser.save();

        console.timeEnd("START API");
        return NextResponse.json({ message: "Registered successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error during registration:", error);
        console.timeEnd("START API");
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
