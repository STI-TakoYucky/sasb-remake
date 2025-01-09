import connect from "../../../../lib/mongodb";
import cloudinary from "cloudinary";
import { NextResponse } from "next/server";
import PostModel from "../../../../models/PostModel";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (request: any) => {
  try {
    await connect();
    const { organization, caption, images } = await request.json();

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
      caption,
      images: uploadedImages
    });

    await newPost.save();

    return NextResponse.json({ message: "Post successful" }, { status: 201 });
  } catch (error: any) {
    console.log("Error creating post:", error.message);
  }
};
