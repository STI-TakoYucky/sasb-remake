import mongoose, { Schema } from "mongoose";

export const PostSchema = new Schema(
    {
        organization: {
            type: String,
            required: true
        },
        caption: {
            type: String
        },
        images: [
            {
                url: { type: String, required: true },
                public_id: { type: String, required: true },
                fileName: { type: String, required: true },
                _id: false, 
            }
        ],
        author: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

//to remove the id from the images object (gotit from my bestie chatgpt so i dont know how tf it works)
PostSchema.set('toJSON', { transform: (doc, ret) => { delete ret._id; return ret; } });

const PostModel = mongoose.models.AdminPost || mongoose.model("AdminPost", PostSchema);

export default PostModel;