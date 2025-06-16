import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import Video from "../../../../models/Video";
import { Types } from "mongoose";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const video = await Video.findById(params.id);

    if (!video) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }

    return NextResponse.json(video);
  } catch (err) {
    return NextResponse.json({ message: "Server error", error: (err as Error).message }, { status: 500 });
  }
}