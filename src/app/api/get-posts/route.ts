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
    
    // Set the cache-control header in the response.
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};
