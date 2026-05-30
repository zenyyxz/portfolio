"use client";

import { motion } from "framer-motion";
import { Shield, Brain, Code, ExternalLink, Github, Globe } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProjectSkeleton } from "./ui/Skeleton";

const TerminalIcon = ({ className, size }: { className?: string; size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
);

const iconMap: Record<string, any> = {
    Shield: Shield,
    Brain: Brain,
    Code: Code,
    Terminal: TerminalIcon,
    Globe: Globe,
};

const Projects = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [folders, setFolders] = useState<any[]>([]);
    const [activeFolder, setActiveFolder] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            fetch("/api/projects").then(res => res.json()),
            fetch("/api/folders").then(res => res.json())
        ]).then(([projectsData, foldersData]) => {
            setProjects(projectsData);
            setFolders(foldersData);

            // Set first folder with projects as active
            const folderWithProjects = foldersData.find((folder: any) =>
                projectsData.some((p: any) => p.folderId === folder.id)
            );
            if (folderWithProjects) {
                setActiveFolder(folderWithProjects.id);
            }
            setIsLoading(false);
        });
    }, []);

    // Get folders that have at least one project
    const foldersWithProjects = folders.filter(folder =>
        projects.some(project => project.folderId === folder.id)
    );

    // Get projects for active folder
    const filteredProjects = activeFolder
        ? projects.filter(project => project.folderId === activeFolder)
        : [];

    if (foldersWithProjects.length === 0) {
        return null; // Hide section if no folders with projects
    }

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="section-heading text-center"
                >
                    ⚡ Projects
                </motion.h2>

                {/* Folder Tabs */}
                <div className="flex justify-center gap-4 mb-10 flex-wrap">
                    {foldersWithProjects.map((folder) => (
                        <button
                            key={folder.id}
                            onClick={() => setActiveFolder(folder.id)}
                            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${activeFolder === folder.id
                                ? "bg-primary text-white shadow-lg shadow-primary/50"
                                : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                                }`}
                        >
                            {folder.name}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="flex flex-wrap justify-center gap-6">
                    {isLoading ? (
                        // Show skeletons while loading
                        Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)]">
                                <ProjectSkeleton />
                            </div>
                        ))
                    ) : (
                        filteredProjects.map((project, index) => {
                            const IconComponent = iconMap[project.icon] || Code;
                            // Determine the main link for "View Project"
                            // Priority: Live URL -> GitHub URL -> Generic Link -> #
                            const mainLink = project.live || project.github || project.link || "#";

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="card overflow-hidden border border-gray-800 hover:border-primary/50 group w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] flex flex-col"
                                >
                                    {/* Project Image */}
                                    {project.image && (
                                        <div className="relative h-48 overflow-hidden shrink-0">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                                            <div className="absolute top-3 right-3 p-2 bg-primary/20 backdrop-blur-sm rounded-lg">
                                                <IconComponent className="text-primary" size={24} />
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-2">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags?.map((tag: string, i: number) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs font-medium px-2.5 py-1 rounded bg-slate-700 text-gray-300"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-800">
                                            <Link
                                                href={mainLink}
                                                target="_blank"
                                                className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
                                            >
                                                View Project <ExternalLink size={14} />
                                            </Link>

                                            {(project.github || (project.link && project.link.includes("github.com"))) && (
                                                <Link
                                                    href={project.github || project.link}
                                                    target="_blank"
                                                    className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg shadow-black/50"
                                                >
                                                    <Github size={18} />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </section>
    );
};

export default Projects;
