import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/mongodb";
import User from "../../../../models/User";


export async function POST(req) {
  await connectToDB()

  const { userId, videoId } = await req.json();

  if (!userId || !videoId) {
    return NextResponse.json(
      { message: "userId and videoId required" },
      { status: 400 }
    );
  }


  await User.findByIdAndUpdate(userId, {
    $pull: { watchHistory: videoId }
  });

  await User.findByIdAndUpdate(userId, {
    $push: {
      watchHistory: {
        $each: [videoId],
        $position: 0
      }
    }
  });

  return NextResponse.json({ message: "History updated" });
}
