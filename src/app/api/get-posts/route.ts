import mongoose from "mongoose";
import PostModel from "../../../../models/PostModel";
import connect from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

let isConnected = false;

export const GET = async (request: any, response: any) => {

    if (!isConnected) {
        await connect();
        isConnected = true;
    }

    

    try {
        const posts = await PostModel.find();

        return NextResponse.json(posts, {
            status: 200,
            headers: {
              'Cache-Control': 'no-store', // Prevent caching on this response
            },
          });

    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
};
