import { NextResponse } from "next/server";
import { getExperience, saveExperience } from "@/lib/db";

export async function GET() {
    const experience = await getExperience();
    return NextResponse.json(experience);
}

export async function POST(request: Request) {
    const body = await request.json();
    const experience = await getExperience();
    const newExp = { ...body, id: Date.now().toString() };
    experience.push(newExp);
    await saveExperience(experience);
    return NextResponse.json(newExp);
}

export async function PUT(request: Request) {
    const body = await request.json();
    const experience = await getExperience();
    const index = experience.findIndex((e: any) => e.id === body.id);
    if (index !== -1) {
        experience[index] = body;
        await saveExperience(experience);
        return NextResponse.json(body);
    }
    return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const experience = await getExperience();
    const filtered = experience.filter((e: any) => e.id !== id);
    await saveExperience(filtered);
    return NextResponse.json({ success: true });
}
