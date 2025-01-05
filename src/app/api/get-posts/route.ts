import mongoose from "mongoose";
import PostModel from "../../../../models/PostModel";
import connect from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

let isConnected = false;

export const GET = async (request: any) => {
  // Ensure we have a valid database connection before fetching the data.
  if (!isConnected) {
    await connect();
    isConnected = true;
  }

  try {
    // Fetch posts from MongoDB
    const posts = await PostModel.find();

    // Create the response object
    const response = NextResponse.json(posts, { status: 200 });

    // Set cache-control headers to prevent caching.
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    // Return the response with the posts data.
    return response;
  } catch (error) {
    // Handle errors and return a server error response if something fails.
    console.error("Error fetching posts:", error);  // Logging error for debugging
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
};
