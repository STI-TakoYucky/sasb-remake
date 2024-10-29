import mongoose from "mongoose";

const connect = async () => {
    const mongoURI = process.env.MONGODB_URI;

    if(!mongoURI) {
        throw new Error("MONGODB_URI is not defined")
    }

    try {
        await mongoose.connect(mongoURI)
        console.log("Mongo Connection susccesfully established");
    } catch (error) {
        throw new Error ("Error connecting to mongoose")
    }
}

export default connect;