import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import Video from "../../../../models/Video";


export async function POST(req) {
    try {
        await connectToDB();
        const { userId, videoId, comment } = await req.json();

        if (!userId || !videoId || !comment) {
            return NextResponse.json(
                { message: "userId, videoId, and comment are required" },
                { status: 400 }
            );
        }

        const updatedVideo = await Video.findByIdAndUpdate(
            videoId, 
            {
                $push: {
                    comments: {
                        user: userId,
                        text: comment,
                    }
                }
            },
            { new: true } 
        );

        if (!updatedVideo) {
            return NextResponse.json({ message: "Video not found" }, { status: 404 });
        }

        return NextResponse.json(
            { message: "Comment added successfully", data: updatedVideo },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error adding comment:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}