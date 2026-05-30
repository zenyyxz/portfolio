import { NextResponse } from "next/server";
import { getProjects, saveProjects } from "@/lib/db";

export async function GET() {
    const projects = await getProjects();
    return NextResponse.json(projects);
}

export async function POST(request: Request) {
    const body = await request.json();
    const projects = await getProjects();
    const newProject = { ...body, id: Date.now().toString() };
    projects.push(newProject);
    await saveProjects(projects);
    return NextResponse.json(newProject);
}

export async function PUT(request: Request) {
    const body = await request.json();
    const projects = await getProjects();
    const index = projects.findIndex((p: any) => p.id === body.id);
    if (index !== -1) {
        projects[index] = body;
        await saveProjects(projects);
        return NextResponse.json(body);
    }
    return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const projects = await getProjects();
    const filtered = projects.filter((p: any) => p.id !== id);
    await saveProjects(filtered);
    return NextResponse.json({ success: true });
}
