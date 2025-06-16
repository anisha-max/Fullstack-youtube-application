import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import Video from "../../../../models/Video";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectToDB();
  const video = await Video.findById(params.id);

  if (!video) {
    return NextResponse.json({ message: "Video not found" }, { status: 404 });
  }

  return NextResponse.json(video);
}
