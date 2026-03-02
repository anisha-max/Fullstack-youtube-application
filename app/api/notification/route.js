import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { connectToDB } from "../../../lib/mongodb";
import Notification from "../../../models/Notification";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json([], { status: 200 });
  }

  await connectToDB();

  const notifications = await Notification.find({
    userId: session.user.id,
  })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  return NextResponse.json(notifications);
}