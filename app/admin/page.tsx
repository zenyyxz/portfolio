"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    LogOut, Plus, Edit, Trash2, Settings, Save, X,
    LayoutDashboard, User, FileText, Briefcase, Code,
    Layers, Image as ImageIcon, Type, Globe, Folder
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

let cachedData: any = null;

export default function AdminPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("dashboard");

    // Data States
    const [projects, setProjects] = useState<any[]>([]);
    const [folders, setFolders] = useState<any[]>([]);
    const [skills, setSkills] = useState<any[]>([]);
    const [experience, setExperience] = useState<any[]>([]);
    const [content, setContent] = useState<any>({ hero: {}, about: {} });
    const [settings, setSettings] = useState({
        email: "",
        country: "",
        portfolio: "",
        brandName: "LahiruX",
        github: "",
        linkedin: "",
        twitter: "",
        telegram: "",
        repoLink: "",
        showRepoLink: false,
    });

    // Modal States
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<"project" | "skill" | "experience" | "folder" | null>(null);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [credForm, setCredForm] = useState({ username: "", password: "" });

    // Loading State
    const [isLoading, setIsLoading] = useState(!cachedData);

    useEffect(() => {
        document.title = "LahiruX | Admin";
        if (status === "unauthenticated") {
            router.push("/admin/login");
        }
    }, [status, router]);

    useEffect(() => {
        if (session) {
            if (cachedData) {
                setProjects(cachedData.projects);
                setSkills(cachedData.skills);
                setExperience(cachedData.experience);
                setContent(cachedData.content);
                setFolders(cachedData.folders);
                if (cachedData.settings.email) setSettings(cachedData.settings);
                setIsLoading(false);
                fetchData(true); // Background update
            } else {
                fetchData();
            }
        }
    }, [session]);

    const fetchData = async (isBackground = false) => {
        if (!isBackground) setIsLoading(true);
        try {
            const [projectsRes, skillsRes, experienceRes, settingsRes, contentRes, foldersRes] = await Promise.all([
                fetch("/api/projects"),
                fetch("/api/skills"),
                fetch("/api/experience"),
                fetch("/api/settings"),
                fetch("/api/content"),
                fetch("/api/folders"),
            ]);

            const newProjects = await projectsRes.json();
            const newSkills = await skillsRes.json();
            const newExperience = await experienceRes.json();
            const newContent = await contentRes.json();
            const newFolders = await foldersRes.json();
            const newSettings = await settingsRes.json();

            setProjects(newProjects);
            setSkills(newSkills);
            setExperience(newExperience);
            setContent(newContent);
            setFolders(newFolders);
            if (newSettings.email) setSettings(newSettings);

            // Update cache
            cachedData = {
                projects: newProjects,
                skills: newSkills,
                experience: newExperience,
                content: newContent,
                folders: newFolders,
                settings: newSettings
            };

        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            if (!isBackground) setIsLoading(false);
        }
    };

    const deleteItem = async (type: string, id: string) => {
        if (!confirm("Are you sure?")) return;
        await fetch(`/api/${type}?id=${id}`, { method: "DELETE" });
        fetchData();
    };

    const saveSettings = async () => {
        await fetch("/api/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(settings),
        });
        alert("Settings saved successfully!");
    };

    const saveContent = async () => {
        await fetch("/api/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content),
        });
        alert("Content updated successfully!");
    };

    const updateCredentials = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirm("Are you sure you want to update your login credentials? You will need to login again.")) return;

        try {
            const res = await fetch("/api/auth/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credForm),
            });

            if (res.ok) {
                alert("Credentials updated successfully! Please login again.");
                signOut();
            } else {
                alert("Failed to update credentials.");
            }
        } catch (error) {
            console.error("Error updating credentials:", error);
            alert("An error occurred.");
        }
    };

    const openAddModal = (type: "project" | "skill" | "experience" | "folder") => {
        setModalType(type);
        setEditingItem(null);
        setFormData({});
        setShowModal(true);
    };

    const openEditModal = (type: "project" | "skill" | "experience" | "folder", item: any) => {
        setModalType(type);
        setEditingItem(item);
        setFormData(item);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType(null);
        setEditingItem(null);
        setFormData({});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const endpoint = modalType === "project" ? "projects" : modalType === "skill" ? "skills" : modalType === "experience" ? "experience" : "folders";

        if (editingItem) {
            await fetch(`/api/${endpoint}?id=${editingItem.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
        } else {
            await fetch(`/api/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, id: Date.now().toString() }),
            });
        }

        closeModal();
        fetchData();
    };

    if (status === "loading" || isLoading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    const sidebarItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "hero", label: "Hero Section", icon: User },
        { id: "about", label: "About Section", icon: FileText },
        { id: "folders", label: "Folders", icon: Folder },
        { id: "projects", label: "Projects", icon: Briefcase },
        { id: "skills", label: "Skills", icon: Code },
        { id: "experience", label: "Experience", icon: Layers },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 fixed h-full overflow-y-auto z-20">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
                </div>

                <nav className="p-4 space-y-2">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === item.id
                                ? "bg-primary/20 text-primary border border-primary/20"
                                : "text-gray-400 hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-slate-800 space-y-2">
                    <Link
                        href="/"
                        target="_blank"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition"
                    >
                        <Globe size={18} />
                        View Website
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Dashboard Overview */}
                    {activeTab === "dashboard" && (
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold">Dashboard Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="card p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-gray-400 mb-1">Total Projects</p>
                                            <h3 className="text-4xl font-bold">{projects.length}</h3>
                                        </div>
                                        <div className="p-3 bg-primary/20 rounded-lg text-primary">
                                            <Briefcase size={24} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-gray-400 mb-1">Total Skills</p>
                                            <h3 className="text-4xl font-bold">{skills.length}</h3>
                                        </div>
                                        <div className="p-3 bg-purple-500/20 rounded-lg text-purple-500">
                                            <Code size={24} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card p-6 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-gray-400 mb-1">Experience</p>
                                            <h3 className="text-4xl font-bold">{experience.length}</h3>
                                        </div>
                                        <div className="p-3 bg-blue-500/20 rounded-lg text-blue-500">
                                            <Layers size={24} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Hero Editor */}
                    {activeTab === "hero" && (
                        <div className="max-w-4xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold">Hero Section</h2>
                                <button onClick={saveContent} className="btn-primary flex items-center gap-2">
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>
                            <div className="card p-8 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                        <Type size={16} /> Main Title
                                    </label>
                                    <input
                                        type="text"
                                        value={content.hero?.title || ""}
                                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                        <FileText size={16} /> Subtitle
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={content.hero?.subtitle || ""}
                                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                        <ImageIcon size={16} /> Character Image
                                    </label>

                                    {/* Character Gallery */}
                                    <div className="grid grid-cols-4 gap-3 mb-4">
                                        {[
                                            { name: "Current", url: "/hero-character.png", type: "image" },
                                            { name: "Astronaut", url: "/models/astronaut/scene.gltf", type: "model" },
                                            { name: "Robot", url: "/models/robot/scene.gltf", type: "model" },
                                            { name: "Developer", url: "/models/developer/scene.gltf", type: "model" },
                                        ].map((char) => (
                                            <button
                                                key={char.name}
                                                type="button"
                                                onClick={() => setContent({ ...content, hero: { ...content.hero, image: char.url } })}
                                                className={`p-3 rounded-lg border-2 transition-all ${content.hero?.image === char.url
                                                    ? "border-primary bg-primary/10"
                                                    : "border-slate-700 bg-slate-800 hover:border-slate-600"
                                                    }`}
                                            >
                                                <div className="aspect-square bg-slate-900 rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                                                    {char.type === 'image' ? (
                                                        <img src={char.url} alt={char.name} className="w-full h-full object-contain" />
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center text-slate-500">
                                                            <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                                                            </svg>
                                                            <span className="text-xs">3D</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <p className="text-xs text-center">{char.name}</p>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Custom URL Input */}
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={content.hero?.image || ""}
                                            onChange={(e) => setContent({ ...content, hero: { ...content.hero, image: e.target.value } })}
                                            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-primary focus:outline-none"
                                            placeholder="Or paste custom URL..."
                                        />
                                        {content.hero?.image && (
                                            <div className="w-12 h-12 rounded-lg bg-slate-800 border border-slate-700 overflow-hidden">
                                                <img src={content.hero.image} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* About Editor */}
                    {activeTab === "about" && (
                        <div className="max-w-4xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold">About Section</h2>
                                <button onClick={saveContent} className="btn-primary flex items-center gap-2">
                                    <Save size={18} /> Save Changes
                                </button>
                            </div>
                            <div className="card p-8 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                                        <FileText size={16} /> Biography
                                    </label>
                                    <textarea
                                        rows={8}
                                        value={content.about?.bio || ""}
                                        onChange={(e) => setContent({ ...content, about: { ...content.about, bio: e.target.value } })}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-primary focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Folders Tab */}
                    {activeTab === "folders" && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold">Project Folders</h2>
                                <button onClick={() => openAddModal("folder")} className="btn-primary flex items-center gap-2">
                                    <Plus size={18} /> Add Folder
                                </button>
                            </div>
                            <div className="grid gap-4">
                                {folders.map((folder: any) => (
                                    <div key={folder.id} className="card p-6 flex justify-between items-center hover:border-primary/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-slate-800 rounded-lg">
                                                <Folder size={24} className="text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">{folder.name}</h3>
                                                <p className="text-gray-400 text-sm">ID: {folder.id}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEditModal("folder", folder)} className="p-2 hover:bg-slate-700 rounded text-gray-400 hover:text-white">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => deleteItem("folders", folder.id)} className="p-2 hover:bg-red-900/20 text-red-400 rounded">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects Tab */}
                    {activeTab === "projects" && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold">Projects</h2>
                                <button onClick={() => openAddModal("project")} className="btn-primary flex items-center gap-2">
                                    <Plus size={18} /> Add Project
                                </button>
                            </div>
                            <div className="grid gap-4">
                                {projects.map((project: any) => (
                                    <div key={project.id} className="card p-6 flex justify-between items-start hover:border-primary/50 transition-colors">
                                        <div className="flex gap-4 flex-1">
                                            {project.image && (
                                                <img src={project.image} alt={project.title} className="w-24 h-24 object-cover rounded-lg" />
                                            )}
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-xs px-2 py-1 bg-slate-800 text-gray-300 rounded border border-slate-700">
                                                        {folders.find((f) => f.id === project.folderId)?.name || "Uncategorized"}
                                                    </span>
                                                </div>
                                                <p className="text-gray-400 line-clamp-2">{project.description}</p>
                                                <div className="flex gap-2 mt-3">
                                                    {project.tags?.map((tag: string, i: number) => (
                                                        <span key={i} className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEditModal("project", project)} className="p-2 hover:bg-slate-700 rounded text-gray-400 hover:text-white">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => deleteItem("projects", project.id)} className="p-2 hover:bg-red-900/20 text-red-400 rounded">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills Tab */}
                    {activeTab === "skills" && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold">Skills</h2>
                                <button onClick={() => openAddModal("skill")} className="btn-primary flex items-center gap-2">
                                    <Plus size={18} /> Add Skill
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {skills.map((skill: any) => (
                                    <div key={skill.id} className="card p-4 flex justify-between items-center hover:border-primary/50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            {skill.icon && <img src={skill.icon} alt={skill.name} className="w-8 h-8 object-contain" />}
                                            <div>
                                                <h3 className="font-bold">{skill.name}</h3>
                                                <p className="text-sm text-gray-400">{skill.category}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEditModal("skill", skill)} className="p-2 hover:bg-slate-700 rounded text-gray-400 hover:text-white">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => deleteItem("skills", skill.id)} className="p-2 hover:bg-red-900/20 text-red-400 rounded">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Experience Tab */}
                    {activeTab === "experience" && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold">Experience</h2>
                                <button onClick={() => openAddModal("experience")} className="btn-primary flex items-center gap-2">
                                    <Plus size={18} /> Add Experience
                                </button>
                            </div>
                            <div className="grid gap-4">
                                {experience.map((exp: any) => (
                                    <div key={exp.id} className="card p-6 flex justify-between items-start hover:border-primary/50 transition-colors">
                                        <div>
                                            <span className="text-primary text-sm font-mono">{exp.year}</span>
                                            <h3 className="text-xl font-bold mt-1">{exp.title}</h3>
                                            <p className="text-gray-400 text-sm">{exp.organization}</p>
                                            <p className="text-gray-300 mt-2">{exp.description}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEditModal("experience", exp)} className="p-2 hover:bg-slate-700 rounded text-gray-400 hover:text-white">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => deleteItem("experience", exp.id)} className="p-2 hover:bg-red-900/20 text-red-400 rounded">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === "settings" && (
                        <div className="max-w-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-3xl font-bold">Settings</h2>
                                <button onClick={saveSettings} className="btn-primary flex items-center gap-2">
                                    <Save size={18} /> Save Settings
                                </button>
                            </div>
                            <div className="card p-8 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={settings.email}
                                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Country</label>
                                        <input
                                            type="text"
                                            value={settings.country}
                                            onChange={(e) => setSettings({ ...settings, country: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Portfolio Domain</label>
                                        <input
                                            type="text"
                                            value={settings.portfolio}
                                            onChange={(e) => setSettings({ ...settings, portfolio: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Brand Name Setting */}
                                <div className="pt-4 border-t border-slate-700">
                                    <label className="block text-sm font-medium mb-2">Brand Name (Navbar)</label>
                                    <select
                                        value={settings.brandName || "LahiruX"}
                                        onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-primary focus:outline-none text-white"
                                    >
                                        <option value="Portfolio">Portfolio</option>
                                        <option value="LahiruX">LahiruX</option>
                                        <option value="Lahiru Rashmika">Lahiru Rashmika</option>
                                    </select>
                                    <p className="text-xs text-gray-500 mt-2">This will appear in the navbar logo</p>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-700">
                                    <h3 className="font-bold text-lg">Social Links</h3>
                                    {['github', 'linkedin', 'twitter', 'telegram'].map((social) => (
                                        <div key={social}>
                                            <label className="block text-sm font-medium mb-2 capitalize">{social} URL</label>
                                            <input
                                                type="url"
                                                value={(settings as any)[social]}
                                                onChange={(e) => setSettings({ ...settings, [social]: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-primary focus:outline-none"
                                                placeholder={`https://${social}.com/...`}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* GitHub Repository Link Setting */}
                                <div className="pt-4 border-t border-slate-700 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg">GitHub Repository Button</h3>
                                            <p className="text-xs text-gray-500">Show a GitHub icon in the navbar linked to your project repo</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={settings.showRepoLink}
                                                onChange={(e) => setSettings({ ...settings, showRepoLink: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                    {settings.showRepoLink && (
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Repository URL</label>
                                            <input
                                                type="url"
                                                value={settings.repoLink}
                                                onChange={(e) => setSettings({ ...settings, repoLink: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-primary focus:outline-none"
                                                placeholder="https://github.com/yourusername/your-repo"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="card p-8 space-y-6 mt-8 border-t border-slate-800 pt-8">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <Settings size={20} /> Admin Credentials
                                </h3>
                                <form onSubmit={updateCredentials} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">New Username</label>
                                        <input
                                            type="text"
                                            required
                                            value={credForm.username}
                                            onChange={(e) => setCredForm({ ...credForm, username: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-primary focus:outline-none"
                                            placeholder="Enter new username"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">New Password</label>
                                        <input
                                            type="password"
                                            required
                                            value={credForm.password}
                                            onChange={(e) => setCredForm({ ...credForm, password: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:border-primary focus:outline-none"
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <button type="submit" className="btn-primary w-full">
                                        Update Credentials
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </motion.div>
            </main>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            <div className="p-6 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-slate-900 z-10">
                                <h3 className="text-xl font-bold">
                                    {editingItem ? "Edit" : "Add"} {modalType === "project" ? "Project" : modalType === "skill" ? "Skill" : modalType === "experience" ? "Experience" : "Folder"}
                                </h3>
                                <button onClick={closeModal} className="p-2 hover:bg-slate-800 rounded-lg transition">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                {/* Dynamic Form Fields based on modalType - Same as before but styled */}
                                {modalType === "project" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Title</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.title || ""}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Description</label>
                                            <textarea
                                                required
                                                value={formData.description || ""}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none"
                                                rows={3}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Folder</label>
                                            <select
                                                value={formData.folderId || ""}
                                                onChange={(e) => setFormData({ ...formData, folderId: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none text-white"
                                            >
                                                <option value="">Select a folder</option>
                                                {folders.map((folder: any) => (
                                                    <option key={folder.id} value={folder.id}>
                                                        {folder.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Project Image</label>
                                            <div className="flex gap-4 items-start">
                                                <div className="flex-1">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={async (e) => {
                                                            const file = e.target.files?.[0];
                                                            if (!file) return;

                                                            const uploadFormData = new FormData();
                                                            uploadFormData.append("file", file);

                                                            try {
                                                                const res = await fetch("/api/upload", {
                                                                    method: "POST",
                                                                    body: uploadFormData,
                                                                });

                                                                if (!res.ok) throw new Error("Upload request failed");

                                                                const data = await res.json();
                                                                if (data.success) {
                                                                    setFormData((prev: any) => ({ ...prev, image: data.url }));
                                                                } else {
                                                                    alert("Upload failed: " + data.message);
                                                                }
                                                            } catch (err) {
                                                                console.error("Upload error:", err);
                                                                alert("Upload error. Check console for details.");
                                                            }
                                                        }}
                                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                                                    />
                                                    {!formData.image && (
                                                        <>
                                                            <p className="text-xs text-gray-500 mt-2">Or paste URL below</p>
                                                            <input
                                                                type="url"
                                                                value={formData.image || ""}
                                                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                                placeholder="https://..."
                                                                className="w-full mt-2 px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none text-sm"
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                                {formData.image && (
                                                    <div className="relative w-24 h-24 rounded-lg border border-slate-800 overflow-hidden bg-slate-900 shrink-0 group">
                                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => setFormData({ ...formData, image: "" })}
                                                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                                                        >
                                                            <X size={20} />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                                                <input
                                                    type="url"
                                                    value={formData.github || ""}
                                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Live URL</label>
                                                <input
                                                    type="url"
                                                    value={formData.live || ""}
                                                    onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                                            <input
                                                type="text"
                                                value={Array.isArray(formData.tags) ? formData.tags.join(", ") : ""}
                                                onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map((t: string) => t.trim()) })}
                                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none"
                                            />
                                        </div>
                                    </>
                                )}

                                {modalType === "skill" && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name || ""}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Icon URL</label>
                                            <input
                                                type="url"
                                                required
                                                value={formData.icon || ""}
                                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Category</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.category || ""}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none"
                                            />
                                        </div>
                                    </>
                                )}

                                {modalType === "experience" && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Year</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.year || ""}
                                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Title</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.title || ""}
                                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Organization</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.organization || ""}
                                                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Description</label>
                                            <textarea
                                                required
                                                value={formData.description || ""}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none"
                                                rows={3}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Skills (comma-separated)</label>
                                            <input
                                                type="text"
                                                value={Array.isArray(formData.skills) ? formData.skills.join(", ") : ""}
                                                onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(",").map((s: string) => s.trim()) })}
                                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none"
                                            />
                                        </div>
                                    </>
                                )}

                                {modalType === "folder" && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Folder Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name || ""}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                )}

                                <div className="flex gap-3 pt-4 border-t border-slate-800">
                                    <button
                                        type="submit"
                                        className="btn-primary flex-1"
                                    >
                                        {editingItem ? "Update" : "Create"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition flex-1"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}
