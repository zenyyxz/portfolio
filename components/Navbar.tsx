"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X, Github } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [brandName, setBrandName] = useState("LahiruX");
    const [repoLink, setRepoLink] = useState("");
    const [showRepoLink, setShowRepoLink] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Fetch settings
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                if (data.brandName) setBrandName(data.brandName);
                if (data.repoLink) setRepoLink(data.repoLink);
                if (data.showRepoLink !== undefined) setShowRepoLink(data.showRepoLink);
            })
            .catch(err => console.error("Failed to load settings:", err));
    }, []);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-slate-900/80 backdrop-blur-md py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold font-heading gradient-text">
                    {brandName}
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.slice(0, -1).map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="nav-link font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {showRepoLink && repoLink && (
                        <a
                            href={repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="GitHub Repository"
                        >
                            <Github size={22} />
                        </a>
                    )}

                    <Link
                        href="#contact"
                        className="px-5 py-2 bg-primary hover:bg-primary-dark rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
                    >
                        Contact
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-lg py-4 px-4 flex flex-col space-y-4"
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-300 hover:text-primary block py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {showRepoLink && repoLink && (
                        <a
                            href={repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-primary flex items-center gap-2 py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <Github size={20} />
                            <span>GitHub Repo</span>
                        </a>
                    )}
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
