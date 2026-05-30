import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "LahiruX | AI & CS Enthusiast",
    description: "Portfolio of an AL Science Student, Coder, and Ethical Hacker specializing in AI, cybersecurity, and full-stack development.",
    keywords: ["LahiruX", "Lahiru Rashmika", "AI", "Cybersecurity", "Ethical Hacker", "Full Stack Developer", "Portfolio"],
    authors: [{ name: "Lahiru Rashmika" }],
    creator: "Lahiru Rashmika",
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
            { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
    },
    openGraph: {
        title: "LahiruX | AI & CS Enthusiast",
        description: "Portfolio of an AL Science Student, Coder, and Ethical Hacker",
        url: "https://lahirux.dev",
        siteName: "LahiruX Portfolio",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "LahiruX | AI & CS Enthusiast",
        description: "Portfolio of an AL Science Student, Coder, and Ethical Hacker",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${poppins.variable} font-sans`}>
                {children}
            </body>
        </html>
    );
}
