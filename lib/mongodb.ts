import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
    throw new Error("Please add MONGODB_URI")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { con: null, promise: null }
}

export async function connectToDB() {
    if (cached.con) {
        return cached.con
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
              dbName: "mydb"
        }
        cached.promise = mongoose.connect(MONGODB_URI, opts).then(() => mongoose.connection)
    }

    try {
        cached.con = await cached.promise
    } catch (error) {
        cached.promise = null
        console.log("MongoDB connection failed:", error);
        throw error
    }
    return cached.con
}