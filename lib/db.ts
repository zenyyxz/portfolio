import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

// Generic read function
export async function readData<T>(filename: string): Promise<T[]> {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);

    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// Generic write function
export async function writeData<T>(filename: string, data: T[]): Promise<void> {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Projects
export async function getProjects() {
    return readData("projects.json");
}

export async function saveProjects(projects: any[]) {
    return writeData("projects.json", projects);
}

// Skills
export async function getSkills() {
    return readData("skills.json");
}

export async function saveSkills(skills: any[]) {
    return writeData("skills.json", skills);
}

// Experience
export async function getExperience() {
    return readData("experience.json");
}

export async function saveExperience(experience: any[]) {
    return writeData("experience.json", experience);
}
