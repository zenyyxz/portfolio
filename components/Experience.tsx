"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Briefcase } from "lucide-react";

const Experience = () => {
    const [experiences, setExperiences] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/experience")
            .then((res) => res.json())
            .then((data) => {
                if (data.length === 0) {
                    const defaultExp = [
                        {
                            id: "1",
                            year: "2024 - Present",
                            title: "Independent Security Researcher",
                            organization: "Freelance",
                            description: "Developing ethical hacking tools and contributing to open-source security projects. Focus on network analysis and vulnerability assessment.",
                            skills: ["Python", "Scapy", "Metasploit"],
                        },
                        {
                            id: "2",
                            year: "2023 - 2024",
                            title: "AI/ML Projects",
                            organization: "Personal Projects",
                            description: "Built multiple machine learning models including a code assistant and neural network implementations. Explored transformer architectures and NLP.",
                            skills: ["PyTorch", "TensorFlow", "NLP"],
                        },
                        {
                            id: "3",
                            year: "2022 - 2023",
                            title: "Full-Stack Development",
                            organization: "Various Projects",
                            description: "Created web applications using modern frameworks with focus on performance optimization and user experience.",
                            skills: ["React", "Next.js", "Node.js"],
                        },
                    ];
                    setExperiences(defaultExp);
                    defaultExp.forEach((exp) => {
                        fetch("/api/experience", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(exp),
                        });
                    });
                } else {
                    setExperiences(data);
                }
            });
    }, []);

    return (
        <section id="experience" className="py-20">
            <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="section-heading text-center mb-16"
                >
                    Experience & Journey
                </motion.h2>

                {/* Vertical Timeline */}
                <div className="max-w-4xl mx-auto relative">
                    {/* Glowing Timeline Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-600 to-transparent" />

                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className={`mb-12 flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                } flex-row`}
                        >
                            {/* Content Card */}
                            <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"} pl-16 md:pl-0`}>
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="card p-6 group relative overflow-hidden"
                                >
                                    {/* Gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-purple-600/0 group-hover:from-primary/10 group-hover:to-purple-600/10 transition-all duration-300" />

                                    {/* Icon */}
                                    <div className="absolute top-4 right-4 p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                        <Briefcase className="text-primary" size={20} />
                                    </div>

                                    <div className="relative z-10">
                                        <span className="text-primary font-semibold text-sm">
                                            {exp.year}
                                        </span>
                                        <h3 className="text-2xl font-bold mt-2 mb-1 group-hover:text-primary transition-colors">
                                            {exp.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-3">
                                            {exp.organization}
                                        </p>
                                        <p className="text-gray-300 mb-4">{exp.description}</p>

                                        {/* Skills Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills?.map((skill: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className="text-xs px-3 py-1 bg-primary/20 text-primary rounded-full border border-primary/30"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Timeline Dot */}
                            <div className="absolute left-8 md:left-1/2 flex items-center justify-center -translate-x-1/2">
                                <motion.div
                                    whileHover={{ scale: 1.5 }}
                                    className="relative flex items-center justify-center"
                                >
                                    {/* Pulsing outer ring */}
                                    <motion.div
                                        className="absolute w-8 h-8 bg-primary/20 rounded-full"
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.5, 0.8, 0.5],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: index * 0.3,
                                        }}
                                    />
                                    {/* Solid dot */}
                                    <div className="w-4 h-4 bg-primary rounded-full border-4 border-slate-900 z-10 shadow-lg shadow-primary/50" />
                                </motion.div>
                            </div>

                            {/* Spacer for alternating layout */}
                            <div className="hidden md:block w-5/12" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
