import { NextRequest, NextResponse } from "next/server";
import User from "../../../../models/User";
import { connectToDB } from "../../../../lib/mongodb";


export async function POST(request: NextRequest) {
    try {
        const { username, email, password, coverImage } = await request.json()

        if (!username || !email || !password || !coverImage) {
            return NextResponse.json(
                { error: "All fields (username, email, password, coverImage) are required." },
                { status: 400 }
            );
        }

        await connectToDB()
        const existinguser = await User.findOne({email} )
        if (existinguser) {
            return NextResponse.json(
                { error: "email already exists" },
                { status: 400 }
            )
        }
         await User.create({
            username,
            email,
            password,
            coverImage
        });
        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        )

    }  catch (error: unknown) {
    let errorMessage = "Unknown error";

    if (error instanceof Error) {
        errorMessage = error.message;
    }

    console.error("Registration error:", errorMessage);
    return NextResponse.json(
        { error: "Cannot register user" },
        { status: 500 }
    );
}
}