"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Default skills - NOT fetching from database to avoid issues
const defaultSkills = [
    // Languages
    { id: "1", name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", category: "Languages" },
    { id: "2", name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", category: "Languages" },
    { id: "3", name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", category: "Languages" },
    { id: "4", name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", category: "Languages" },
    { id: "5", name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", category: "Languages" },
    { id: "6", name: "Rust", icon: "https://www.vectorlogo.zone/logos/rust-lang/rust-lang-icon.svg", category: "Languages" },
    { id: "7", name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg", category: "Languages" },
    { id: "8", name: "Ruby", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg", category: "Languages" },
    // Frontend
    { id: "9", name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", category: "Frontend" },
    { id: "10", name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", category: "Frontend" },
    { id: "11", name: "Vue", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg", category: "Frontend" },
    { id: "12", name: "Tailwind", icon: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg", category: "Frontend" },
    { id: "13", name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", category: "Frontend" },
    { id: "14", name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", category: "Frontend" },
    // Backend
    { id: "15", name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", category: "Backend" },
    { id: "16", name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", category: "Backend" },
    { id: "17", name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", category: "Backend" },
    { id: "18", name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg", category: "Backend" },
    // Database
    { id: "19", name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", category: "Database" },
    { id: "20", name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", category: "Database" },
    { id: "21", name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", category: "Database" },
    { id: "22", name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", category: "Database" },
    // AI/ML
    { id: "23", name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", category: "AI/ML" },
    { id: "24", name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", category: "AI/ML" },
    { id: "25", name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg", category: "AI/ML" },
    { id: "26", name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg", category: "AI/ML" },
    // DevOps
    { id: "27", name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", category: "DevOps" },
    { id: "28", name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", category: "DevOps" },
    { id: "29", name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", category: "DevOps" },
    { id: "30", name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", category: "DevOps" },
    { id: "31", name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", category: "DevOps" },
    { id: "32", name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", category: "DevOps" },
    // Tools
    { id: "33", name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", category: "Tools" },
    { id: "34", name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", category: "Tools" },
    { id: "35", name: "Nginx", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg", category: "Tools" },
    { id: "36", name: "Postman", icon: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg", category: "Tools" },
];

const Skills = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section id="skills" className="py-20 overflow-hidden">
            <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="section-heading text-center mb-16"
                >
                    Skills & Expertise
                </motion.h2>

                {/* Scrolling Container */}
                <div className="relative">
                    <div className="max-w-7xl mx-auto bg-[#1e293b] rounded-3xl p-8 md:p-12 overflow-hidden">
                        {/* Infinite Scrolling Chain */}
                        <div
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <motion.div
                                className="flex gap-6"
                                animate={{
                                    x: [0, -2400],
                                }}
                                transition={{
                                    x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: 30,
                                        ease: "linear",
                                        ...(isHovered && { duration: 0 }), // Pause by setting duration to 0
                                    },
                                }}
                            >
                                {/* Triple the skills for seamless loop */}
                                {[...defaultSkills, ...defaultSkills, ...defaultSkills].map((skill, index) => (
                                    <motion.div
                                        key={`${skill.id}-${index}`}
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        className="flex-shrink-0"
                                    >
                                        {/* Skill Card */}
                                        <div className="relative bg-[#2d3748] hover:bg-[#374151] rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 border border-gray-700/50 hover:border-primary/50 w-32 h-32">
                                            <img
                                                src={skill.icon}
                                                alt={skill.name}
                                                className="w-12 h-12 object-contain"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                            <div className="text-xs font-medium text-center text-gray-200">
                                                {skill.name}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>

                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background-start via-background-start/80 to-transparent pointer-events-none z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background-start via-background-start/80 to-transparent pointer-events-none z-10" />
                </div>
            </div>
        </section>
    );
};

export default Skills;
