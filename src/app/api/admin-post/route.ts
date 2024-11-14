import connect from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import PostModel from "../../../../models/PostModel";

let isConnected = false;

export const POST = async (request: any, response: any) => {

    if (!isConnected) {
        await connect();
        isConnected = true;
    }

    const { organization, caption } = await request.json();

    try {
        const newPost = new PostModel({
            organization,
            caption
        });
        await newPost.save();

        return NextResponse.json({ message: "Post Successful" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
};
