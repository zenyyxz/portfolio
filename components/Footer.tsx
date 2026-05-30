"use client";

import { Github, Linkedin, Twitter, Send, Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Footer = () => {
    const [settings, setSettings] = useState<any>({
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        telegram: "https://t.me",
    });

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data.email) {
                    setSettings(data);
                }
            });
    }, []);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    const socialLinks = [
        { icon: Globe, href: "#home", label: "Portfolio" },
        { icon: Github, href: settings.github, label: "GitHub" },
        { icon: Linkedin, href: settings.linkedin, label: "LinkedIn" },
        { icon: Twitter, href: settings.twitter, label: "X (Twitter)" },
        { icon: Send, href: settings.telegram, label: "Telegram" },
    ];

    return (
        <footer className="bg-slate-900 border-t border-gray-800 py-12">
            <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Left Side - Name & Tagline */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold gradient-text mb-2">
                            👨‍💻 Lahiru Rashmika
                        </h3>
                        <p className="text-gray-400">Full-Stack Developer & AI Enthusiast</p>
                    </div>

                    {/* Center - Navigation Links */}
                    <nav className="flex flex-wrap justify-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-400 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Right Side - Social Links */}
                    <div className="flex gap-4">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-slate-800 hover:bg-primary/20 border border-gray-700 hover:border-primary rounded-lg text-gray-400 hover:text-primary transition-all"
                                title={social.label}
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom - Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    © {new Date().getFullYear()} Lahiru Rashmika. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
