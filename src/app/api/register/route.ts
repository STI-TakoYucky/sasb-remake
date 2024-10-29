import User from "../../../../models/User";
import connect from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    const { firstName, lastName, email, password } = await request.json();

    await connect();

    await User.create({firstName, lastName, email, password});

    return NextResponse.json({message: "User Created"}, {status: 201});
}

export async function GET() {
    await connect();

    const users = await User.find();
    return NextResponse.json({users});
}