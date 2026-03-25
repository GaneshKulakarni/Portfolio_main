"use client";

import { useEffect, useRef, useState } from "react";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("about");
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Determine active section
            const sections = navLinks.map((link) =>
                document.querySelector(link.href)
            );
            let current = "about";
            sections.forEach((section) => {
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 200) {
                        current = section.id;
                    }
                }
            });
            setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMobileOpen(false);
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 w-max rounded-full border border-neutral-700/20 px-6 py-2 mt-6 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.3)] solaris-transition transition-all duration-500 ${scrolled
                        ? "bg-neutral-900/60 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                        : "bg-neutral-900/40"
                    }`}
                id="main-navbar"
            >
                {/* Brand */}
                <div className="text-2xl font-bold tracking-tighter text-neutral-100 font-[family-name:var(--font-headline)]">
                    GK
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`font-[family-name:var(--font-headline)] tracking-tight text-sm font-medium transition-all duration-300 solaris-transition hover:text-blue-300 active:scale-90 ${activeSection === link.href.slice(1)
                                    ? "text-blue-400 font-bold"
                                    : "text-neutral-400"
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* CTA Button */}
                <a
                    href="#contact"
                    onClick={(e) => handleNavClick(e, "#contact")}
                    className="bg-gradient-to-r from-primary-container to-secondary-container text-on-surface font-[family-name:var(--font-label)] text-[10px] uppercase tracking-widest px-5 py-1.5 rounded-full font-bold shadow-[0_0_15px_rgba(80,143,248,0.3)] hover:shadow-[0_0_25px_rgba(172,199,255,0.4)] transition-all solaris-transition active:scale-95"
                >
                    Hire Me
                </a>

                {/* Mobile toggle */}
                <button
                    className="md:hidden flex flex-col gap-1 p-1"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle navigation"
                >
                    <span
                        className={`block w-5 h-0.5 bg-on-surface transition-transform solaris-transition ${mobileOpen ? "rotate-45 translate-y-1.5" : ""
                            }`}
                    />
                    <span
                        className={`block w-5 h-0.5 bg-on-surface transition-opacity solaris-transition ${mobileOpen ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`block w-5 h-0.5 bg-on-surface transition-transform solaris-transition ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
                            }`}
                    />
                </button>
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`font-[family-name:var(--font-headline)] text-2xl font-medium transition-all solaris-transition ${activeSection === link.href.slice(1)
                                    ? "text-primary font-bold"
                                    : "text-on-surface-variant"
                                }`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </>
    );
}
