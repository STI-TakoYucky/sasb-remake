import connect from "../../../../lib/mongodb";
import cloudinary from "cloudinary";
import { NextResponse } from "next/server";
import PostModel from "../../../../models/PostModel";
import { MongoClient } from 'mongodb';

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (request: any) => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      return NextResponse.json({message: "Missing MongoDB URI"}, {status: 404})
    }
    const client = new MongoClient(MONGODB_URI);


    await connect();
    const { organization, caption, images, author } = await request.json();

    if (organization == undefined) {
      return NextResponse.json({message: "Please input an organization"}, { status: 400 })
    }

    //upload the images in cloudinary
    const uploadedImages = await Promise.all(
      images.map(async (image: { file: string; fileName: string }) => {
        try {
          const result = await cloudinary.v2.uploader.upload(image.file, {
            folder: "sasb-post-images",
            public_id: image.fileName.split(".")[0],
          });
          return {
            url: result.secure_url,
            public_id: result.public_id,
            fileName: image.fileName,
          };
        } catch (uploadError: any) {
          console.error("Error uploading image:", uploadError.message);
          throw new Error(`Failed to upload image: ${image.fileName}`);
        }
      })
    );
    
    const newPost = new PostModel({
      organization,
      author,
      caption,
      images: uploadedImages
    });

    await newPost.save();

    //once the post is added to the postsDB, update the array of posts inside the user

    const sasbDB = client.db("SASBDB");
    const userColl = sasbDB.collection("users");
    
    const query = {username: author}
    const update = { $push: { posts: newPost }};
    const options = { upsert: true };

    const result = await userColl.updateOne(
      query,
      update,
      options
    );

    return NextResponse.json({ message: "Post successful" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
