"use client";

import { motion } from "framer-motion";

const About = () => {
    return (
        <section id="about" className="py-20">
            <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="section-heading text-center md:text-left"
                >
                    About Me
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6 text-gray-300 text-lg leading-relaxed"
                    >
                        <p>
                            I am currently an <span className="text-primary font-semibold">AL Science Student</span> with a deep passion for technology.
                            My journey in Computer Science is driven by curiosity and a desire to understand how things work at a fundamental level.
                        </p>
                        <p>
                            Beyond my studies, I am a dedicated <span className="text-primary font-semibold">Ethical Hacker</span> and Tool Builder.
                            I spend my time developing security tools and contributing to the open-source community on GitHub.
                            My goal is to make the digital world safer and more efficient.
                        </p>
                        <p>
                            I am also an <span className="text-primary font-semibold">AI Enthusiast</span>, constantly exploring the latest advancements in
                            Machine Learning and Neural Networks. I love building projects that combine security, performance, and intelligence.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur-2xl opacity-20" />
                        <div className="relative bg-slate-800 p-8 rounded-2xl border border-gray-700">
                            <h3 className="text-2xl font-bold mb-4 text-white">My Focus</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                                    Ethical Hacking & Cybersecurity
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                                    Tool Development (Python, C++, JS)
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                                    Artificial Intelligence & ML
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                                    Full Stack Web Development
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
