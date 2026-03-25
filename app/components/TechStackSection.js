"use client";

import { useEffect, useRef, useState } from "react";

const bentoItems = [
    {
        title: "Frontend",
        icon: "terminal",
        iconColor: "text-primary",
        description:
            "Crafting high-fidelity, interactive user interfaces with modern reactivity and cinematic performance.",
        tags: ["React.js", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
        size: "md:col-span-2",
        type: "tags",
    },
    {
        title: "Backend",
        icon: "database",
        iconColor: "text-secondary",
        description:
            "Architecting robust, scalable systems that power seamless digital experiences.",
        items: ["Node.js", "Express.js", "MongoDB", "MySQL", "Python", "Java"],
        size: "md:row-span-2",
        type: "checklist",
    },
    {
        title: "Other Tools",
        icon: "build",
        iconColor: "text-tertiary",
        items: ["Git", "GitHub", "REST APIs", "N8N Automations"],
        size: "",
        type: "list",
    },
    {
        title: "Architecture & Focus",
        icon: "architecture",
        iconColor: "text-primary",
        description: "Focusing on problem-solving, efficient algorithms, and intelligent systems.",
        tools: [
            { name: "Agentic AI", color: "bg-primary-container" },
            { name: "Data Structures", color: "bg-secondary-container" },
            { name: "Algorithms", color: "bg-tertiary-container" },
            { name: "LLMs", color: "bg-primary" },
        ],
        size: "md:col-span-2",
        type: "tools",
    },
    {
        value: "AI",
        label: "Enthusiast",
        size: "",
        type: "metric",
    },
];

const scrollTechs = [
    { abbr: "RE", name: "React", color: "bg-blue-500/20", text: "text-blue-400" },
    { abbr: "NO", name: "Node.js", color: "bg-green-500/20", text: "text-green-400" },
    { abbr: "EX", name: "Express", color: "bg-gray-500/20", text: "text-gray-400" },
    { abbr: "MG", name: "MongoDB", color: "bg-green-600/20", text: "text-green-500" },
    { abbr: "PY", name: "Python", color: "bg-yellow-500/20", text: "text-yellow-400" },
    { abbr: "JA", name: "Java", color: "bg-orange-500/20", text: "text-orange-400" },
    { abbr: "TW", name: "Tailwind", color: "bg-cyan-500/20", text: "text-cyan-400" },
];

function useInView(ref, threshold = 0.15) {
    const [isVisible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [ref, threshold]);
    return isVisible;
}

export default function TechStackSection() {
    const gridRef = useRef(null);
    const gridVisible = useInView(gridRef, 0.05);

    return (
        <section
            id="skills"
            className="relative z-10 pt-40 pb-20 px-8 max-w-7xl mx-auto min-h-screen"
        >
            {/* Header */}
            <header className="mb-24">
                <h2 className="font-[family-name:var(--font-headline)] text-[5rem] font-bold tracking-tighter leading-none mb-4 text-on-surface">
                    Tech Stack
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary-container to-secondary-container" />
            </header>

            {/* Bento Grid */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-6 mb-32">
                {bentoItems.map((item, i) => (
                    <div
                        key={i}
                        className={`glass-card glow-hover ${item.size} p-8 rounded-xl flex flex-col ${item.type === "tools"
                            ? "md:flex-row items-center justify-between"
                            : item.type === "metric"
                                ? "items-center justify-center text-center"
                                : ""
                            } group transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${gridVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-12"
                            }`}
                        style={{ transitionDelay: gridVisible ? `${i * 120}ms` : "0ms" }}
                    >
                        {item.type === "tags" && (
                            <>
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <span
                                            className={`material-symbols-outlined ${item.iconColor} text-3xl`}
                                        >
                                            {item.icon}
                                        </span>
                                        <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-md">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {item.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-surface-variant text-on-surface-variant px-4 py-1.5 rounded-full text-xs font-[family-name:var(--font-label)] uppercase tracking-widest border border-outline-variant/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}

                        {item.type === "checklist" && (
                            <>
                                <div className="flex items-center gap-3 mb-6">
                                    <span
                                        className={`material-symbols-outlined ${item.iconColor} text-3xl`}
                                    >
                                        {item.icon}
                                    </span>
                                    <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold">
                                        {item.title}
                                    </h3>
                                </div>
                                <p className="text-on-surface-variant mb-8">
                                    {item.description}
                                </p>
                                <div className="space-y-4 mt-auto">
                                    {item.items.map((tech) => (
                                        <div
                                            key={tech}
                                            className="flex items-center justify-between p-3 rounded-lg bg-surface-container-high/40"
                                        >
                                            <span className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest">
                                                {tech}
                                            </span>
                                            <span className="material-symbols-outlined text-sm text-primary">
                                                check_circle
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {item.type === "list" && (
                            <>
                                <div className="flex items-center gap-3 mb-4">
                                    <span
                                        className={`material-symbols-outlined ${item.iconColor} text-2xl`}
                                    >
                                        {item.icon}
                                    </span>
                                    <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="mt-auto flex flex-col gap-2">
                                    {item.items.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-on-surface-variant font-[family-name:var(--font-body)]"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}

                        {item.type === "tools" && (
                            <>
                                <div className="max-w-[50%]">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span
                                            className={`material-symbols-outlined ${item.iconColor} text-2xl`}
                                        >
                                            {item.icon}
                                        </span>
                                        <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-on-surface-variant text-sm">
                                        {item.description}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {item.tools.map((tool) => (
                                        <div key={tool.name} className="flex items-center gap-2">
                                            <div
                                                className={`w-1.5 h-1.5 rounded-full ${tool.color}`}
                                            />
                                            <span className="text-xs font-[family-name:var(--font-label)] uppercase">
                                                {tool.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {item.type === "metric" && (
                            <>
                                <span className="text-primary text-4xl font-[family-name:var(--font-headline)] font-black mb-1">
                                    {item.value}
                                </span>
                                <span className="text-on-surface-variant text-[0.65rem] font-[family-name:var(--font-label)] uppercase tracking-widest">
                                    {item.label}
                                </span>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* Infinite Horizontal Scroll Strip */}
            <div className="relative w-full overflow-hidden py-10 border-y border-outline-variant/10">
                <div className="animate-scroll gap-12 items-center">
                    {/* Original + Duplicate for seamless loop */}
                    {[...scrollTechs, ...scrollTechs].map((tech, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 bg-surface-container-low px-6 py-2 rounded-full border border-outline-variant/20 shrink-0"
                        >
                            <div
                                className={`w-6 h-6 rounded-sm ${tech.color} flex items-center justify-center text-[10px] ${tech.text} font-bold`}
                            >
                                {tech.abbr}
                            </div>
                            <span className="font-[family-name:var(--font-label)] text-xs uppercase tracking-widest text-on-surface-variant">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
