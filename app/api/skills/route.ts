import { NextResponse } from "next/server";
import { getSkills, saveSkills } from "@/lib/db";

export async function GET() {
    const skills = await getSkills();
    return NextResponse.json(skills);
}

export async function POST(request: Request) {
    const body = await request.json();
    const skills = await getSkills();
    const newSkill = { ...body, id: Date.now().toString() };
    skills.push(newSkill);
    await saveSkills(skills);
    return NextResponse.json(newSkill);
}

export async function PUT(request: Request) {
    const body = await request.json();
    const skills = await getSkills();
    const index = skills.findIndex((s: any) => s.id === body.id);
    if (index !== -1) {
        skills[index] = body;
        await saveSkills(skills);
        return NextResponse.json(body);
    }
    return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const skills = await getSkills();
    const filtered = skills.filter((s: any) => s.id !== id);
    await saveSkills(filtered);
    return NextResponse.json({ success: true });
}
