"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
    {
        title: "Earth Together",
        description:
            "Environmental awareness platform promoting sustainability and community engagement.",
        tags: ["React.js", "Express", "Node.js", "MongoDB"],
        image: "/earth-together.png",
        category: "Full Stack",
        github: "https://github.com/GaneshKulakarni/EarthTogether",
    },
    {
        title: "Image Generation Website",
        description:
            "AI-powered platform for creating stunning images using advanced generative models.",
        tags: ["React.js", "Express", "MongoDB", "AI APIs"],
        image: "/image-gen.png",
        category: "AI/ML",
        github: "https://github.com/GaneshKulakarni/image-generation",
    },
    {
        title: "AI Summarizer",
        description:
            "Intelligent content summarization tool using advanced NLP techniques.",
        tags: ["Python", "NLP", "React.js", "REST APIs"],
        image: "/ai-summarizer.png",
        category: "AI/ML",
        github: "https://github.com/GaneshKulakarni/ai_summarizer",
    },
];

const filters = ["All", "Frontend", "Full Stack", "AI/ML"];

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

export default function ProjectsSection() {
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const headerVisible = useInView(headerRef, 0.2);
    const gridVisible = useInView(gridRef, 0.05);
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredProjects =
        activeFilter === "All"
            ? projects
            : projects.filter((p) => p.category === activeFilter);

    return (
        <section
            id="work"
            className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-x-hidden"
        >
            {/* Header */}
            <header
                ref={headerRef}
                className={`mb-20 relative transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                    }`}
            >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <h2 className="font-[family-name:var(--font-headline)] text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-4">
                            Featured Work
                        </h2>
                        <p className="text-on-surface-variant text-lg max-w-xl font-light leading-relaxed">
                            Projects that define my craft. A curated collection of digital
                            experiences built with precision and intent.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex bg-surface-container-low p-1.5 rounded-full border border-outline-variant/10">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-2 rounded-full text-xs font-[family-name:var(--font-label)] uppercase tracking-widest transition-all ${activeFilter === filter
                                    ? "bg-primary-container text-on-primary-container font-bold"
                                    : "text-on-surface-variant hover:text-on-surface"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Projects Grid */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredProjects.map((project, i) => (
                    <article
                        key={project.title}
                        className={`tilt-card group relative flex flex-col bg-surface-container border border-primary/20 rounded-xl overflow-hidden shadow-2xl transition-all duration-800 ease-[cubic-bezier(0.23,1,0.32,1)] ${gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                            }`}
                        style={{ transitionDelay: gridVisible ? `${i * 150}ms` : "0ms" }}
                    >
                        {/* Image */}
                        <div className="aspect-video w-full overflow-hidden relative">
                            <img
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent opacity-60" />
                        </div>

                        {/* Content */}
                        <div className="p-8 flex-grow flex flex-col gap-4">
                            <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface tracking-tight">
                                {project.title}
                            </h3>
                            <p className="text-on-surface-variant text-sm line-clamp-2 font-light">
                                {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-surface-variant text-on-surface-variant text-[10px] font-[family-name:var(--font-label)] uppercase tracking-wider rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-outline-variant/10">
                                <button className="flex items-center gap-2 text-primary text-sm font-medium hover:text-secondary transition-colors">
                                    <span className="material-symbols-outlined text-lg">
                                        open_in_new
                                    </span>
                                    Live
                                </button>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-on-surface-variant text-sm font-medium hover:text-on-surface transition-colors"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        code
                                    </span>
                                    GitHub
                                </a>
                            </div>
                        </div>

                        {/* Hover border glow */}
                        <div className="absolute -inset-px rounded-xl border border-primary/30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    </article>
                ))}
            </div>
        </section>
    );
}
