import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const credentialsPath = path.join(process.cwd(), "data", "credentials.json");

const getCredentials = () => {
    // Check environment variables first for initial setup or overrides
    if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
        return {
            username: process.env.ADMIN_USERNAME,
            passwordHash: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 10)
        };
    }

    if (!fs.existsSync(credentialsPath)) {
        const defaultCreds = {
            username: "admin",
            passwordHash: bcrypt.hashSync("admin123", 10)
        };
        // Ensure data directory exists
        const dataDir = path.dirname(credentialsPath);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        fs.writeFileSync(credentialsPath, JSON.stringify(defaultCreds, null, 2));
        return defaultCreds;
    }
    return JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
};

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                const storedCreds = getCredentials();

                if (
                    credentials.username === storedCreds.username &&
                    bcrypt.compareSync(credentials.password, storedCreds.passwordHash)
                ) {
                    return { id: "1", name: "Admin", email: "admin@portfolio.com" };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
    session: {
        strategy: "jwt" as const,
    },
    secret: process.env.NEXTAUTH_SECRET,
};
