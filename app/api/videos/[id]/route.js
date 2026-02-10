import {  NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import Video from "../../../../models/Video";

export async function GET(req) {
  await connectToDB();

  const id = req.nextUrl.pathname.split("/").pop(); 
  if (!id) {
    return NextResponse.json({ message: "Video ID missing" }, { status: 400 });
  }

  const video = await Video.findById(id);

  if (!video) {
    return NextResponse.json({ message: "Video not found" }, { status: 404 });
  }

  return NextResponse.json(video);
}