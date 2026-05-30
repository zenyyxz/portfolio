"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid credentials");
        } else {
            router.push("/admin");
        }
    };

    return (
        <div className="min-h-screen bg-background-start flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold gradient-text mb-2">Admin Login</h1>
                    <p className="text-gray-400">Portfolio Management System</p>
                </div>

                <form onSubmit={handleSubmit} className="card p-8 space-y-6">
                    {error && (
                        <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-700 border border-gray-600 rounded-lg focus:outline-none focus:border-primary"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full btn-primary py-3">
                        Sign In
                    </button>


                </form>
            </div>
        </div>
    );
}
