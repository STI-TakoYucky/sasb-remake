import mongoose from "mongoose";
import PostModel from "../../../../models/PostModel";
import connect from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

let isConnected = false;

export const GET = async (request: any) => {
  if (!isConnected) {
    await connect();
    isConnected = true;
  }

  try {
    const posts = await PostModel.find();

    const response = NextResponse.json(posts, { status: 200 });

    return response;
  } catch (error) {

    console.error("Error fetching posts:", error); 
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};
