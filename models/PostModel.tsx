import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
    {
        organization: {
            type: String,
            required: true
        },
        caption: {
            type: String,
            required: true
        },
        author: {
            type: String,
        }
    },
    { timestamps: true }
);


const PostModel = mongoose.models.AdminPost || mongoose.model("AdminPost", PostSchema);

export default PostModel;