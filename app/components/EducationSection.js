"use client";

import { useEffect, useRef, useState } from "react";

const educationData = [
    {
        period: "2023 — 2027",
        institution: "Malla Reddy Engineering College",
        degree: "B.Tech in Information Technology",
        gpa: "8.98",
        logo: "/mrec-logo.png",
        color: "#acc7ff",
        glowColor: "rgba(172, 199, 255, 0.25)",
        location: "Hyderabad, Telangana",
        decorativeIcon: "school",
    },
    {
        period: "2021 — 2023",
        institution: "Sri Chaitanya Junior College",
        degree: "Intermediate (MPC)",
        gpa: "9.61",
        logo: "/sri-chaitanya-logo.jpg",
        color: "#22d3ee",
        glowColor: "rgba(34, 211, 238, 0.25)",
        location: "Hyderabad, Telangana",
        decorativeIcon: "functions",
    },
    {
        period: "Finished 2021",
        institution: "Pragana High School",
        degree: "Secondary School Education",
        gpa: "10.0 (Perfect)",
        logo: null,
        icon: "emoji_events",
        color: "#d2bbff",
        glowColor: "rgba(210, 187, 255, 0.25)",
        location: "Bodhan, Telangana",
        decorativeIcon: "military_tech",
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

/* ─── Timeline Dot ─── */
function TimelineDot({ visible, top }) {
    return (
        <div
            className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-outline-variant/60 border-2 border-surface-container z-20 transition-all duration-700 ${
                visible ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
            style={{ top }}
        />
    );
}

/* ─── Education Card ─── */
function EduCard({ edu, index }) {
    const ref = useRef(null);
    const isVisible = useInView(ref, 0.1);

    // Stagger: 0 = left-center, 1 = right, 2 = left
    const positions = [
        "md:ml-[15%]",   // first card — slightly left of center
        "md:ml-[50%]",   // second card — right side
        "md:ml-[20%]",   // third card — left-center
    ];

    return (
        <div
            ref={ref}
            className={`relative transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
            }`}
        >
            <div
                className={`w-full md:w-[320px] ${positions[index] || "md:ml-[15%]"}`}
            >
                <div
                    className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:translate-y-[-4px] group"
                    style={{
                        background: "rgba(32, 31, 31, 0.7)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: `1px solid rgba(66, 71, 83, 0.3)`,
                    }}
                >
                    {/* Decorative Icon — top right */}
                    <span
                        className="material-symbols-outlined absolute top-4 right-4 text-3xl opacity-[0.12] transition-opacity duration-500 group-hover:opacity-[0.2]"
                        style={{ color: edu.color }}
                    >
                        {edu.decorativeIcon}
                    </span>

                    <div className="p-6">
                        {/* Logo + Period + GPA row */}
                        <div className="flex items-start gap-4 mb-4">
                            {/* Logo */}
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                                style={{
                                    background: edu.logo ? "#ffffff" : edu.color,
                                    boxShadow: `0 0 16px ${edu.glowColor}`,
                                }}
                            >
                                {edu.logo ? (
                                    <img
                                        src={edu.logo}
                                        alt={edu.institution}
                                        className="w-full h-full object-contain p-1.5"
                                    />
                                ) : (
                                    <span
                                        className="material-symbols-outlined text-xl"
                                        style={{ color: "#131313" }}
                                    >
                                        {edu.icon}
                                    </span>
                                )}
                            </div>

                            {/* Badges */}
                            <div className="flex flex-col gap-1.5 pt-0.5">
                                <span
                                    className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit"
                                    style={{
                                        background: "rgba(229, 226, 225, 0.08)",
                                        color: "var(--color-on-surface-variant)",
                                        border: "1px solid rgba(66, 71, 83, 0.3)",
                                    }}
                                >
                                    {edu.period}
                                </span>
                                <span
                                    className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit"
                                    style={{
                                        background: `${edu.color}18`,
                                        color: edu.color,
                                        border: `1px solid ${edu.color}30`,
                                    }}
                                >
                                    GPA: {edu.gpa}
                                </span>
                            </div>
                        </div>

                        {/* Institution Name */}
                        <h3 className="font-[family-name:var(--font-headline)] text-[1.35rem] font-bold text-on-surface leading-tight mb-2">
                            {edu.institution}
                        </h3>

                        {/* Degree */}
                        <p
                            className="font-[family-name:var(--font-body)] text-sm font-medium mb-3"
                            style={{ color: edu.color }}
                        >
                            {edu.degree}
                        </p>

                        {/* Location */}
                        <div className="flex items-center gap-1.5">
                            <span
                                className="material-symbols-outlined text-sm"
                                style={{ color: edu.color }}
                            >
                                location_on
                            </span>
                            <span className="font-[family-name:var(--font-body)] text-xs text-on-surface-variant">
                                {edu.location}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function EducationSection() {
    const headerRef = useRef(null);
    const headerVisible = useInView(headerRef, 0.2);
    const summaryRef = useRef(null);
    const summaryVisible = useInView(summaryRef, 0.15);

    return (
        <section
            id="education"
            className="relative z-10 pt-40 pb-32 overflow-hidden"
        >
            {/* Background Watermark */}
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none">
                <span className="text-[28rem] font-[family-name:var(--font-headline)] font-bold tracking-tighter text-on-surface">
                    GK
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                {/* ─── Header — Left aligned ─── */}
                <div
                    ref={headerRef}
                    className={`mb-20 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                        headerVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-16"
                    }`}
                >
                    <span className="font-[family-name:var(--font-label)] text-xs uppercase tracking-[0.25em] text-primary mb-4 block">
                        Academic Path
                    </span>
                    <h2 className="font-[family-name:var(--font-headline)] text-6xl md:text-8xl font-bold tracking-tighter text-on-surface leading-none">
                        Education<span className="text-primary">.</span>
                    </h2>
                    {/* Accent underline */}
                    <div
                        className="mt-6 w-12 h-1 rounded-full"
                        style={{ background: "var(--color-primary)" }}
                    />
                </div>

                {/* ─── Main Layout: Summary + Timeline ─── */}
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* ─── Left: Qualifications Summary ─── */}
                    <div
                        ref={summaryRef}
                        className={`lg:w-[260px] flex-shrink-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                            summaryVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-12"
                        }`}
                    >
                        <div
                            className="rounded-2xl p-6 mb-8"
                            style={{
                                background: "rgba(32, 31, 31, 0.6)",
                                backdropFilter: "blur(16px)",
                                WebkitBackdropFilter: "blur(16px)",
                                border: "1px solid rgba(66, 71, 83, 0.25)",
                            }}
                        >
                            <h4 className="font-[family-name:var(--font-headline)] text-sm font-bold text-on-surface mb-3">
                                Qualifications Summary
                            </h4>
                            <p className="font-[family-name:var(--font-body)] text-xs text-on-surface-variant leading-relaxed">
                                A consistent record of academic excellence with a focus on
                                Information Technology and Engineering. Dedicated to technical
                                mastery and creative problem solving.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="space-y-5 pl-1">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: "rgba(172, 199, 255, 0.1)",
                                        border: "1px solid rgba(172, 199, 255, 0.15)",
                                    }}
                                >
                                    <span className="material-symbols-outlined text-primary text-lg">
                                        stars
                                    </span>
                                </div>
                                <div>
                                    <span className="font-[family-name:var(--font-label)] text-[9px] uppercase tracking-widest text-on-surface-variant block">
                                        Highest CGPA
                                    </span>
                                    <span className="font-[family-name:var(--font-headline)] text-base font-bold text-on-surface">
                                        10.0 Grade
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{
                                        background: "rgba(210, 187, 255, 0.1)",
                                        border: "1px solid rgba(210, 187, 255, 0.15)",
                                    }}
                                >
                                    <span className="material-symbols-outlined text-secondary text-lg">
                                        computer
                                    </span>
                                </div>
                                <div>
                                    <span className="font-[family-name:var(--font-label)] text-[9px] uppercase tracking-widest text-on-surface-variant block">
                                        Core Focus
                                    </span>
                                    <span className="font-[family-name:var(--font-headline)] text-base font-bold text-on-surface">
                                        Computer Science
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ─── Right: Timeline + Cards ─── */}
                    <div className="flex-1 relative">
                        {/* Vertical Timeline Line */}
                        <div
                            className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 hidden md:block"
                            style={{
                                background:
                                    "linear-gradient(to bottom, transparent 0%, rgba(140, 144, 158, 0.2) 10%, rgba(140, 144, 158, 0.2) 90%, transparent 100%)",
                            }}
                        />

                        {/* Timeline Dots + Cards */}
                        <div className="space-y-20 md:space-y-28 relative">
                            {educationData.map((edu, i) => (
                                <div key={i} className="relative">
                                    {/* Timeline dot */}
                                    <TimelineDot visible={true} top="50px" />
                                    <EduCard edu={edu} index={i} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
