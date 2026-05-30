"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Terminal, Code2, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
    const [content, setContent] = useState({
        title: "Building the Future with Code & AI",
        subtitle: "I'm a passionate developer and AI enthusiast. I build ethical hacking tools, explore computer science depths, and create innovative solutions.",
        image: "/hero-character.png"
    });

    useEffect(() => {
        fetch("/api/content")
            .then(res => res.json())
            .then(data => {
                if (data.hero) {
                    setContent(data.hero);
                }
            })
            .catch(err => console.error("Failed to load hero content:", err));
    }, []);

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
        >
            {/* Background Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] animate-pulse delay-1000" />

            <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32 z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left: Text Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6 inline-flex items-center px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium"
                        >
                            <Terminal size={14} className="mr-2" />
                            <span>Full Stack Developer & Ethical Hacker</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold font-heading mb-6"
                        >
                            {content.title.split(" ").map((word, i) => (
                                word.toLowerCase() === "future" ?
                                    <span key={i} className="gradient-text">Future </span> :
                                    <span key={i}>{word} </span>
                            ))}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10"
                        >
                            {content.subtitle}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Link href="#projects" className="btn-primary group">
                                View Projects
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="#contact"
                                className="px-6 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                            >
                                Contact Me
                            </Link>
                        </motion.div>

                        {/* Tech Stack Icons */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="mt-20 flex gap-8 text-gray-500"
                        >
                            <Code2 size={32} />
                            <Cpu size={32} />
                            <Terminal size={32} />
                        </motion.div>
                    </div>

                    {/* Right: 3D Character - LARGER SIZE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex-1 flex justify-center lg:justify-end"
                    >
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" />
                            <img
                                src={content.image || "/hero-character.png"}
                                alt="3D Character"
                                className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
