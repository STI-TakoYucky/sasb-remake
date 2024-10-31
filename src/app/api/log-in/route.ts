import connect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { NextResponse } from 'next/server'

export async function POST(request: any) {
    await connect();
    const users = await request.json();
    return NextResponse.json({message: "Users found"}, {status: 200})
}