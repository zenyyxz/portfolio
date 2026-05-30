import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const settingsPath = path.join(process.cwd(), "data", "settings.json");

export async function GET() {
    try {
        if (!fs.existsSync(settingsPath)) {
            return NextResponse.json({
                email: "lahirurashmika3434@gmail.com",
                country: "Sri Lanka",
                portfolio: "lahiru.dev",
                brandName: "LahiruX",
                github: "",
                linkedin: "",
                twitter: "",
                telegram: "",
            });
        }
        const data = fs.readFileSync(settingsPath, "utf-8");
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: "Failed to read settings" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    fs.writeFileSync(settingsPath, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
}
