import { NextResponse } from "next/server";
import connect from "../../../../lib/mongodb"
import PostModel from "../../../../models/PostModel";
import UserModel from "../../../../models/UserModel";
import mongoose from "mongoose";

export const POST = async (request: any ) => {
    
    try {
        await connect();
        const { _id, username } = await request.json();

        const user = await UserModel.findOneAndUpdate(
            { username: username },
            { $pull: { posts: { _id: _id } } },
            { new: true }
          );
        console.log(user, _id, username);
        return NextResponse.json({message: " Success"}, {status: 200});
    } catch(err) {
        console.log(err);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}