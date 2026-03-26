"use client";

import { useEffect, useRef, useState } from "react";

const experiences = [
    {
        title: "Frontend Developer Intern",
        company: "CODTECH IT SOLUTIONS",
        location: "Remote",
        period: "Oct — Nov 2024",
        icon: "code",
        iconColor: "text-primary",
        accentColor: "text-secondary",
        dotColor: "bg-primary",
        side: "left",
        bullets: [
            "Developed and enhanced 5+ responsive web modules using HTML, CSS, and JavaScript, improving cross-browser UI consistency across the product.",
            "Identified and resolved 15+ frontend bugs through systematic debugging, directly improving application stability and user experience.",
            "Optimized page load performance by implementing component reuse and clean coding practices, reducing redundant code by approximately 20%.",
            "Collaborated with the development team using Git/GitHub for version control, following industry-standard branching and pull request workflows.",
        ],
        tags: ["HTML", "CSS", "JavaScript", "Git"],
    },
    {
        title: "Open Source Contributor",
        company: "ECWoC '26 (Elite Coders)",
        location: "Remote",
        period: "Jan — Mar 2026",
        icon: "diversity_3",
        iconColor: "text-secondary",
        accentColor: "text-primary",
        dotColor: "bg-secondary",
        side: "right",
        bullets: [
            "Explored 100+ open-source repositories to understand project architecture, contribution guidelines, and issue workflows.",
            "Contributed to selected projects by raising issues and submitting pull requests.",
            "Collaborated with maintainers using Git and GitHub workflows (fork, branch, pull request, code review).",
            "Improved documentation and resolved community-reported issues.",
            "Ranked #40 out of 516 contributors and achieved Top 80 contributor recognition.",
        ],
        tags: ["Open Source", "Git", "GitHub", "Documentation"],
    },
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

function TimelineItem({ exp, index }) {
    const itemRef = useRef(null);
    const isVisible = useInView(itemRef, 0.1);

    return (
        <div
            ref={itemRef}
            className={`relative flex flex-col md:flex-row items-center justify-between w-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isVisible
                    ? "opacity-100 translate-x-0"
                    : `opacity-0 ${index % 2 === 0 ? "-translate-x-20" : "translate-x-20"}`
            }`}
        >
            {/* Left content */}
            <div
                className={`w-full md:w-[45%] ${
                    exp.side === "left"
                        ? "mb-8 md:mb-0 order-2 md:order-1"
                        : "hidden md:block order-1"
                }`}
            >
                {exp.side === "left" && <TimelineCard exp={exp} />}
            </div>

            {/* Center Node */}
            <div
                className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ${exp.dotColor} glow-node border-[3px] border-surface z-20 hidden md:block transition-all duration-700 ${
                    isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
            />

            {/* Right content */}
            <div
                className={`w-full md:w-[45%] ${
                    exp.side === "right" ? "order-2" : "order-1 md:order-2 hidden md:block"
                }`}
            >
                {exp.side === "right" && <TimelineCard exp={exp} />}
            </div>

            {/* Mobile fallback for right-side items */}
            {exp.side === "right" && (
                <div className="w-full md:hidden order-2">
                    <TimelineCard exp={exp} />
                </div>
            )}
        </div>
    );
}

function TimelineCard({ exp }) {
    return (
        <div className="glass-card p-8 rounded-xl hover:bg-on-surface/[0.08] relative overflow-hidden transition-colors duration-500">
            <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant/30">
                    <span
                        className={`material-symbols-outlined ${exp.iconColor} text-3xl`}
                    >
                        {exp.icon}
                    </span>
                </div>
                <div>
                    <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface">
                        {exp.title}
                    </h3>
                    <p
                        className={`font-[family-name:var(--font-body)] ${exp.iconColor} text-sm font-medium`}
                    >
                        {exp.company} • {exp.period}
                    </p>
                </div>
            </div>

            {/* Location badge */}
            {exp.location && (
                <div className="flex items-center gap-1.5 mb-5 ml-[4.5rem]">
                    <span className="material-symbols-outlined text-on-surface-variant text-sm">
                        location_on
                    </span>
                    <span className="font-[family-name:var(--font-label)] text-xs text-on-surface-variant tracking-wide">
                        {exp.location}
                    </span>
                </div>
            )}

            <ul className={`space-y-4 font-[family-name:var(--font-body)] text-on-surface-variant text-base ${exp.location ? "" : "mt-4"}`}>
                {exp.bullets.map((bullet, j) => (
                    <li key={j} className="flex gap-3">
                        <span className={`${exp.accentColor} shrink-0 mt-1`}>•</span>
                        <span>{bullet}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                    <span
                        key={tag}
                        className="font-[family-name:var(--font-label)] text-[10px] uppercase tracking-wider px-3 py-1 bg-surface-variant rounded-full text-on-surface-variant"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function ExperienceSection() {
    const headerRef = useRef(null);
    const headerVisible = useInView(headerRef, 0.2);

    return (
        <section
            id="experience"
            className="relative min-h-screen pt-40 pb-24 overflow-hidden"
        >
            {/* Background Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
                <span className="text-[30rem] font-[family-name:var(--font-headline)] font-bold tracking-tighter text-on-surface">
                    GK
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`mb-24 flex flex-col items-center transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                        headerVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-16"
                    }`}
                >
                    <span className="font-[family-name:var(--font-label)] text-xs uppercase tracking-[0.2em] text-primary mb-4">
                        Chronology
                    </span>
                    <h2 className="font-[family-name:var(--font-headline)] text-6xl md:text-8xl font-bold tracking-tighter text-on-surface leading-none text-center">
                        Experience<span className="text-primary">.</span>
                    </h2>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Central Timeline Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] timeline-line -translate-x-1/2 hidden md:block" />

                    <div className="space-y-24 md:space-y-32">
                        {experiences.map((exp, i) => (
                            <TimelineItem key={i} exp={exp} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
