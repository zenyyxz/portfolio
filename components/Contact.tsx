"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Send, MapPin, Globe } from "lucide-react";
import { useEffect, useState } from "react";

const Contact = () => {
    const [settings, setSettings] = useState<any>({
        email: "lahirurashmika3434@gmail.com",
        country: "Sri Lanka",
        portfolio: "lahiru.dev",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        telegram: "https://t.me",
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data.email) {
                    setSettings(data);
                } else {
                    // Initialize with defaults
                    fetch("/api/settings", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(settings),
                    });
                }
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Create mailto link
        const subject = `Portfolio Contact from ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
        window.location.href = `mailto:${settings.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setIsSubmitting(false);
        setFormData({ name: "", email: "", message: "" });
    };

    const socialLinks = [
        { icon: Github, href: settings.github, label: "GitHub" },
        { icon: Linkedin, href: settings.linkedin, label: "LinkedIn" },
        { icon: Twitter, href: settings.twitter, label: "X (Twitter)" },
        { icon: Send, href: settings.telegram, label: "Telegram" },
    ];

    return (
        <section id="contact" className="py-20 pb-32">
            <div className="container mx-auto px-8 md:px-16 lg:px-24 xl:px-32">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-heading text-center mb-16"
                >
                    Get In Touch
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Left Side - Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <p className="text-gray-400 text-lg">
                            I'm always open to discussing new projects, creative ideas, or
                            opportunities to be part of your visions. Whether you have a question
                            or just want to say hi, feel free to reach out!
                        </p>

                        <div className="space-y-6">
                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Mail className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Email</h3>
                                    <a
                                        href={`mailto:${settings.email}`}
                                        className="text-primary hover:underline"
                                    >
                                        {settings.email}
                                    </a>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <MapPin className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Location</h3>
                                    <p className="text-gray-400">{settings.country || "Sri Lanka"}</p>
                                </div>
                            </div>

                            {/* Portfolio */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg">
                                    <Globe className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Portfolio</h3>
                                    <p className="text-primary">{settings.portfolio || "lahiru.dev"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-6">
                            <h3 className="font-semibold mb-4">Connect with me</h3>
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-slate-800 hover:bg-primary/20 border border-gray-700 hover:border-primary rounded-lg text-gray-400 hover:text-primary transition-all"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        title={social.label}
                                    >
                                        <social.icon size={24} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="card p-8 space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition"
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Message</label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition resize-none"
                                    rows={6}
                                    placeholder="Your message..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-primary w-full py-3 text-lg flex items-center justify-center gap-2"
                            >
                                <Send size={20} />
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
