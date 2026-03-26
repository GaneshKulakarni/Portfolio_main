"use client";

import { useEffect, useRef } from "react";


const stats = [
    { value: "2+", label: "Hackathon Awards" },
    { value: "10+", label: "Projects Built" },
    { value: "MERN", label: "Core Stack" },
    { value: "AI", label: "Enthusiast" },
];

export default function HeroSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const loadGsap = async () => {
            const gsap = (await import("gsap")).default;
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                // Stagger animate hero elements
                gsap.fromTo(".hero-animate",
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.3 }
                );

                // Animate stats on scroll
                gsap.fromTo(".stat-item",
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".stats-section",
                            start: "top 80%",
                        }
                    }
                );
            }, sectionRef);

            return () => ctx.revert();
        };

        loadGsap();
    }, []);

    return (
        <section ref={sectionRef} id="hero">
            {/* Background Monogram Watermark */}
            <div className="fixed -bottom-20 -left-20 text-[25rem] font-[family-name:var(--font-headline)] font-bold text-surface-container-low pointer-events-none select-none z-0 leading-none opacity-60">
                GK
            </div>

            {/* Main Hero */}
            <main className="relative z-10 min-h-screen hero-grid">
                <div className="flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-24 pt-20">
                    {/* Left Side: Content */}
                    <div className="w-full md:w-1/2 flex flex-col items-start gap-8 z-20">
                        {/* Status Badge */}
                        <div className="hero-animate flex items-center gap-3 px-4 py-1.5 rounded-full bg-surface-container-high/50 border border-outline-variant/20 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            <span className="font-[family-name:var(--font-label)] text-[10px] uppercase tracking-[0.2em] font-bold text-on-surface-variant">
                                Available for work
                            </span>
                        </div>

                        <div className="hero-animate flex flex-col gap-2">
                            <h2 className="font-[family-name:var(--font-headline)] text-2xl md:text-3xl font-light tracking-tight text-on-surface/80">
                                Hi, I&apos;m
                            </h2>
                            <h1 className="font-[family-name:var(--font-headline)] text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400">
                                Ganesh
                                <br />
                                Kulkarni
                            </h1>
                        </div>

                        {/* Role Details */}
                        <div className="hero-animate flex flex-col gap-4">
                            <p className="font-[family-name:var(--font-headline)] text-lg md:text-xl font-medium tracking-tight text-blue-300">
                                MERN Stack Developer{" "}
                                <span className="mx-2 text-outline-variant opacity-50">·</span>{" "}
                                Agentic AI Enthusiast
                            </p>
                            <p className="max-w-md font-[family-name:var(--font-body)] text-lg leading-relaxed text-on-surface-variant/90">
                                Building real-world apps | Automation Workflows | Prompt Engineer. Transforming ideas into fluid digital experiences.
                            </p>
                        </div>

                        {/* CTA Cluster */}
                        <div className="hero-animate flex flex-wrap items-center gap-6 mt-4">
                            <a
                                href="#contact"
                                className="flex items-center gap-3 bg-gradient-to-r from-primary-container to-secondary-container text-on-surface px-8 py-4 rounded-xl font-[family-name:var(--font-label)] text-sm uppercase tracking-widest font-black hover:shadow-[0_0_30px_rgba(80,143,248,0.4)] transition-all solaris-transition active:scale-95"
                            >
                                <span>Let&apos;s Talk</span>
                                <span className="material-symbols-outlined text-lg">
                                    arrow_forward
                                </span>
                            </a>
                            <a
                                href="#work"
                                className="px-8 py-4 rounded-xl border border-outline-variant/20 text-on-surface font-[family-name:var(--font-label)] text-sm uppercase tracking-widest font-black hover:bg-surface-container-high/40 transition-all solaris-transition backdrop-blur-sm"
                            >
                                View My Work
                            </a>
                        </div>
                    </div>

                    {/* Right Side: Visuals */}
                    <div className="relative w-full md:w-1/2 h-[400px] md:h-[700px] flex items-center justify-center pointer-events-none">
                        <div className="absolute inset-0 flex items-center justify-center">
                            {/* Glow Layers */}
                            <div className="absolute w-96 h-96 rounded-full bg-blue-500/10 blur-[100px] animate-pulse" />
                            <div className="absolute w-[30rem] h-[30rem] rounded-full bg-indigo-500/5 blur-[120px]" />

                            {/* Profile Image Asset Mockup */}
                            <div className="relative z-10 w-80 h-[28rem] rounded-3xl border border-outline-variant/10 backdrop-blur-3xl overflow-hidden group shadow-2xl">
                                <img
                                    src="/profile-full-image.jpeg"
                                    alt="Ganesh Kulkarni"
                                    className="w-full h-full object-cover opacity-90 transition-all duration-700 hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-surface via-transparent to-primary/20 pointer-events-none text-transparent" />

                                {/* Decorative Specs */}
                                <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa] pointer-events-none text-transparent" />
                                <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_15px_#818cf8] pointer-events-none text-transparent" />
                            </div>

                            {/* Orbital Rings behind portrait */}
                            <div className="absolute w-[28rem] h-[28rem] rounded-full border border-outline-variant/10 rotate-45 pointer-events-none text-transparent" />
                            <div className="absolute w-[32rem] h-[32rem] rounded-full border border-outline-variant/5 -rotate-12 pointer-events-none text-transparent" />
                        </div>
                    </div>
                </div>

                {/* Stats Bento Bar */}
                <section className="stats-section px-6 md:px-24 py-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 bg-outline-variant/10 border border-outline-variant/10 rounded-2xl overflow-hidden backdrop-blur-xl">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="stat-item bg-surface-container-low p-8 flex flex-col gap-2"
                            >
                                <span className="font-[family-name:var(--font-headline)] text-4xl font-bold text-primary">
                                    {stat.value}
                                </span>
                                <span className="font-[family-name:var(--font-label)] text-[10px] uppercase tracking-widest text-on-surface-variant">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </section>
    );
}
