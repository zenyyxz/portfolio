import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { authOptions } from "@/lib/auth";

const credentialsPath = path.join(process.cwd(), "data", "credentials.json");

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
        }

        const newCreds = {
            username,
            passwordHash: bcrypt.hashSync(password, 10)
        };

        fs.writeFileSync(credentialsPath, JSON.stringify(newCreds, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to update credentials:", error);
        return NextResponse.json({ error: "Failed to update credentials" }, { status: 500 });
    }
}
