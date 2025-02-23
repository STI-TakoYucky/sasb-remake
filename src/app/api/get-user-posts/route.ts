import mongoose from "mongoose";
import PostModel from "../../../../models/PostModel";
import connect from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import UserModel from "../../../../models/UserModel";

let isConnected = false;

export const POST = async (request: any, response: any) => {

    if (!isConnected) {
        await connect();
        isConnected = true;
    }

    try {
        const username = await request.text();
        const user = await UserModel.findOne({"username": username}).sort({createdAt: -1}).lean() as { posts?: any[] };
    
        return NextResponse.json(user.posts?.reverse(), {
            status: 200,
            headers: {
              'Cache-Control': 'no-store', // Prevent caching on this response
            },
          });
          
    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
};
