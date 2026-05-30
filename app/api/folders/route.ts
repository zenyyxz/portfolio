import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dataFilePath = path.join(process.cwd(), 'data', 'folders.json');

// Helper to read data
const readData = () => {
    if (!fs.existsSync(dataFilePath)) {
        return [];
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
        return NextResponse.json({ error: 'Failed to fetch folders' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const currentData = readData();

        const newData = [...currentData, body];

        writeData(newData);
        return NextResponse.json(newData);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save folder' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        const currentData = readData();
        const index = currentData.findIndex((item: any) => item.id === id);

        if (index !== -1) {
            currentData[index] = { ...currentData[index], ...body };
            writeData(currentData);
            return NextResponse.json(currentData);
        }

        return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update folder' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        const currentData = readData();
        const newData = currentData.filter((item: any) => item.id !== id);

        writeData(newData);
        return NextResponse.json(newData);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete folder' }, { status: 500 });
    }
}
