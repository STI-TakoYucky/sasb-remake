// import mongoose from "mongoose";

// const connect = async () => {
//     const mongoURI = process.env.MONGODB_URI;

//     if(!mongoURI) {
//         throw new Error("MONGODB_URI is not defined")
//     }

//     try {
//         await mongoose.connect(mongoURI)
//         console.log("Mongo Connection susccesfully established");
//     } catch (error) {
//         throw new Error ("Error connecting to mongoose")
//     }
// }

// export default connect;

import mongoose from 'mongoose';
 
let cached = (global as any).mongoose;

const connect = async () => {

    console.time("CONNECT");
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
        throw new Error("MONGODB_URI is not defined");
    }

    // Check if the connection already exists
    if (cached && cached.conn) {
        console.log("Using existing MongoDB connection");
        return cached.conn;
    }

    if (!cached) {
        cached = (global as any).mongoose = { conn: null, promise: null };
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(mongoURI).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    console.log("Mongo connection established successfully");
    console.timeEnd("CONNECT");
    return cached.conn;
};

export default connect;
