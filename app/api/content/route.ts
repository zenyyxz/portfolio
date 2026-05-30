import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dataFilePath = path.join(process.cwd(), 'data', 'content.json');

// Helper to read data
const readData = () => {
    if (!fs.existsSync(dataFilePath)) {
        // Create default if not exists
        const defaultData = {
            hero: {
                title: "Building the Future with Code & AI",
                subtitle: "I'm a passionate developer and AI enthusiast...",
                image: "/hero-character.png"
            },
            about: {
                bio: "I'm a passionate developer..."
            }
        };
        fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
        return defaultData;
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileData);
};

// Helper to write data
const writeData = (data: any) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function GET() {
    try {
        const data = readData();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const currentData = readData();

        // Merge new data with existing data
        const updatedData = { ...currentData, ...body };

        writeData(updatedData);
        return NextResponse.json(updatedData);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
    }
}
