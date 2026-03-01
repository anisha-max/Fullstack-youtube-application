import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import Video from "../../../../models/Video";
import { getServerSession } from "next-auth";
import Subscribe from "../../../../models/Subscribe";
import { authOptions } from "../../../../lib/auth";

export async function GET(req) {
  try {
    await connectToDB();

    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json({ message: "Video ID missing" }, { status: 400 });
    }

    const video = await Video.findById(id);

    if (!video) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }

    let initialSubscribedState = false;
    const session = await getServerSession(authOptions);

    if (session?.user?.id) {
      const existing = await Subscribe.findOne({
        subscriber: session.user.id,
        channel: video.user,
      });
      initialSubscribedState = !!existing;
    }

    return NextResponse.json({
      video,
      isSubscribed: initialSubscribedState,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error loading video" }, { status: 500 });
  }
}