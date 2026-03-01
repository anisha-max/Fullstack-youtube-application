import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../lib/auth";
import User from "../../../models/User";
import { connectToDB } from "../../../lib/mongodb";
import Subscribe from "../../../models/Subscribe";

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        await connectToDB()
        const user = await User.findById(session.user.id).select("-password").populate("videos");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 401 })
        }
        const subCount = await Subscribe.countDocuments({channel:user?.id})
        return NextResponse.json({user , subscriberCount: subCount})
    } catch (error) {
        console.error("Profile API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}