// app/api/history/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import User from "../../../models/User";
import { connectToDB } from "../../../lib/mongodb";
import Video from "../../../models/Video";

export async function GET(req: NextRequest) {
  try {
    await connectToDB()
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(session.user.id)
    .populate("watchHistory");

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
console.log("history :" , user.watchHistory)
    return NextResponse.json(user.watchHistory || []);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}