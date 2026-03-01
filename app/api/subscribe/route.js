import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import Subscribe from "../../../models/Subscribe";
import { connectToDB } from "../../../lib/mongodb";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const { channelId } = await req.json()
        const userId = session.user.id
        if (userId === channelId) return Response.json({ error: "Cannot subscribe to self" }, { status: 400 });

        await connectToDB();
        const existing = await Subscribe.findOne({ subscriber: userId, channel: channelId })
        if (existing) {
            await Subscribe.findByIdAndDelete(existing._id)
            return Response.json({ subscribed: false });
        } else {
            await Subscribe.create({ subscriber: userId, channel: channelId })
            return Response.json({ subscribed: true });
        }
    } catch (error) {
        return Response.json({ error: "Error in subscription" }, { status: 500 });
    }
}