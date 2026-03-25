"use client";

import { useEffect, useRef, useState } from "react";

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

export default function ContactSection() {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const isVisible = useInView(sectionRef, 0.1);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState("idle"); // idle, sending, sent, error

    const handleChange = (e) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const emailjs = (await import("@emailjs/browser")).default;
            await emailjs.sendForm(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
                formRef.current,
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
            );
            setStatus("sent");
            setFormState({ name: "", email: "", message: "" });
            setTimeout(() => setStatus("idle"), 5000);
        } catch (err) {
            console.error("EmailJS error:", err);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden"
        >
            {/* Subtle Beam Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="light-beam left-1/4 -rotate-12 translate-y-[-20%]" />
                <div className="light-beam left-2/3 rotate-6 translate-y-[10%] opacity-5" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
                {/* Large Watermark */}
                <div className="absolute -bottom-20 -left-20 text-[25rem] font-[family-name:var(--font-headline)] font-black text-surface-container-lowest select-none pointer-events-none leading-none opacity-40">
                    GK
                </div>
            </div>

            {/* Header */}
            <div
                className={`relative z-10 text-center mb-16 max-w-4xl mx-auto transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
                    }`}
            >
                <span className="font-[family-name:var(--font-label)] text-xs uppercase tracking-[0.2em] text-primary mb-4 block">
                    Let&apos;s Connect
                </span>
                <h2 className="font-[family-name:var(--font-headline)] text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-6 leading-[0.9]">
                    Let&apos;s Build <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        Something
                    </span>
                </h2>
                <p className="font-[family-name:var(--font-body)] text-lg md:text-xl text-on-surface-variant max-w-xl mx-auto opacity-80 leading-relaxed">
                    Have a project in mind? Let&apos;s talk about how we can turn your
                    vision into a cinematic digital reality.
                </p>
            </div>

            {/* Contact Form */}
            <div
                className={`relative z-10 w-full max-w-[600px] mx-auto transition-all duration-1000 delay-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                <div className="p-8 md:p-10 rounded-xl bg-on-surface/5 backdrop-blur-[20px] border border-outline-variant/20 shadow-2xl">
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name Field */}
                            <div className="space-y-2 group">
                                <label
                                    className="font-[family-name:var(--font-label)] text-[0.7rem] uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors"
                                    htmlFor="contact-name"
                                >
                                    Full Name
                                </label>
                                <input
                                    className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-neutral-600 focus:outline-none focus:border-primary transition-all solaris-transition"
                                    id="contact-name"
                                    name="name"
                                    placeholder="John Doe"
                                    type="text"
                                    required
                                    value={formState.name}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Email Field */}
                            <div className="space-y-2 group">
                                <label
                                    className="font-[family-name:var(--font-label)] text-[0.7rem] uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors"
                                    htmlFor="contact-email"
                                >
                                    Email Address
                                </label>
                                <input
                                    className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-neutral-600 focus:outline-none focus:border-primary transition-all solaris-transition"
                                    id="contact-email"
                                    name="email"
                                    placeholder="john@example.com"
                                    type="email"
                                    required
                                    value={formState.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Message Field */}
                        <div className="space-y-2 group">
                            <label
                                className="font-[family-name:var(--font-label)] text-[0.7rem] uppercase tracking-widest text-on-surface-variant group-focus-within:text-primary transition-colors"
                                htmlFor="contact-message"
                            >
                                Your Message
                            </label>
                            <textarea
                                className="w-full bg-surface-container-highest border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-neutral-600 focus:outline-none focus:border-primary transition-all solaris-transition resize-none"
                                id="contact-message"
                                name="message"
                                placeholder="Tell me about your vision..."
                                rows="5"
                                required
                                value={formState.message}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="w-full group relative overflow-hidden bg-gradient-to-r from-primary-container to-secondary-container text-on-surface font-[family-name:var(--font-headline)] font-bold py-4 rounded-xl solaris-transition active:scale-95 shadow-[0_0_20px_rgba(80,143,248,0.2)] hover:shadow-[0_0_30px_rgba(80,143,248,0.4)] transition-all disabled:opacity-50"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {status === "sending"
                                    ? "Sending..."
                                    : status === "sent"
                                        ? "Message Sent! ✓"
                                        : status === "error"
                                            ? "Error. Try Again"
                                            : "Send Message"}
                                {status === "idle" && (
                                    <span className="material-symbols-outlined text-sm">
                                        arrow_forward
                                    </span>
                                )}
                            </span>
                        </button>
                    </form>
                </div>

                {/* Floating Decoration */}
                <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-primary/20 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full border border-secondary/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 blur-md" />
                    </div>
                </div>
            </div>
        </section>
    );
}
