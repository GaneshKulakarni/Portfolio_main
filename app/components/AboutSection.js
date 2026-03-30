"use client";

import { useEffect, useRef } from "react";
import { canAnimate } from "../utils/animation";
import useTextReveal from "../hooks/useTextReveal";
import useMagneticHover from "../hooks/useMagneticHover";

const codeLines = [
  { num: "01", content: "const dev = {", highlight: "keyword" },
  { num: "02", key: "name", value: '"Ganesh Kulkarni"' },
  { num: "03", key: "role", value: '"MERN Stack Developer"' },
  { num: "04", content: "skills: [", highlight: "key" },
  {
    num: "05",
    content: '"React", "Node", "MongoDB", "AI"',
    highlight: "values",
  },
  { num: "06", content: "]," },
  { num: "07", key: "passion", value: '"Agentic AI & Web apps"' },
  { num: "08", content: "};" },
];

const stats = [
  { value: "IT", label: "Student" },
  { value: "MREC", label: "University" },
  { value: "2", label: "Hackathons" },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const cvBtnRef = useRef(null);

  // Auto text reveal for data-reveal elements
  useTextReveal(sectionRef);
  // Magnetic hover on CTA
  useMagneticHover(cvBtnRef);

  // GSAP scroll animations
  useEffect(() => {
    if (!canAnimate()) return;

    let ctx;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Code editor card — slide in from left with clip-path
        const codeCard = sectionRef.current.querySelector(".about-code-card");
        if (codeCard) {
          gsap.fromTo(
            codeCard,
            { clipPath: "inset(0 100% 0 0)", opacity: 0 },
            {
              clipPath: "inset(0 0% 0 0)",
              opacity: 1,
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: codeCard,
                start: "top 80%",
                once: true,
              },
            }
          );
        }

        // Profile image reveal
        const imgWrapper = sectionRef.current.querySelector(".about-img-wrapper");
        const img = sectionRef.current.querySelector(".about-img");
        if (imgWrapper && img) {
          const imgTl = gsap.timeline({
            scrollTrigger: {
              trigger: imgWrapper,
              start: "top 80%",
              once: true,
            },
          });

          imgTl.fromTo(
            imgWrapper,
            { clipPath: "inset(100% 0 0 0)" },
            { clipPath: "inset(0% 0 0 0)", ease: "power3.inOut", duration: 1.2 }
          );
          imgTl.fromTo(
            img,
            { scale: 1.15 },
            { scale: 1, duration: 1.4, ease: "power3.out" },
            "<"
          );
        }

        // Right content slide in
        gsap.fromTo(
          ".about-content",
          { x: 60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".about-content",
              start: "top 80%",
              once: true,
            },
          }
        );

        // Stat cards stagger
        gsap.fromTo(
          ".about-stat",
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".about-stats-grid",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Decorative elements
        gsap.fromTo(
          ".about-deco",
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }, sectionRef);
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24"
    >
      {/* Background Watermark */}
      <div className="about-deco absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none pointer-events-none opacity-5">
        <h2 className="font-[family-name:var(--font-headline)] font-bold text-[30rem] leading-none tracking-tighter text-surface-container-highest">
          GK
        </h2>
      </div>

      {/* Floating glow elements */}
      <div className="about-deco fixed top-1/4 -right-20 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none -z-20" />
      <div className="about-deco fixed bottom-1/4 -left-20 w-80 h-80 bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-20" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Side: Code Editor Card */}
        <div className="about-code-card relative group">
          {/* Ambient Glow */}
          <div className="about-deco absolute -inset-4 bg-primary/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-primary/15 transition-colors duration-700" />

          <div className="relative bg-on-surface/5 backdrop-blur-3xl border border-outline-variant/20 rounded-xl overflow-hidden shadow-2xl">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-surface-container-high/40 border-b border-outline-variant/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-error/40" />
                <div className="w-3 h-3 rounded-full bg-tertiary/40" />
                <div className="w-3 h-3 rounded-full bg-primary/40" />
              </div>
              <div className="text-[10px] font-[family-name:var(--font-label)] uppercase tracking-widest text-on-surface-variant/60">
                developer_profile.js
              </div>
            </div>

            {/* Editor Body */}
            <div className="p-8 font-mono text-sm sm:text-base leading-relaxed">
              {codeLines.map((line, i) => (
                <div key={i} className="flex">
                  <span className="text-on-surface-variant/40 mr-6 select-none">
                    {line.num}
                  </span>
                  {line.key ? (
                    <code className="pl-4">
                      <span className="text-primary">{line.key}</span>:{" "}
                      <span className="text-secondary">{line.value}</span>,
                    </code>
                  ) : line.highlight === "keyword" ? (
                    <code className="text-primary-fixed-dim">
                      {line.content.split("dev").map((part, j) =>
                        j === 0 ? (
                          <span key={j}>{part}</span>
                        ) : (
                          <span key={j}>
                            <span className="text-on-surface">dev</span>
                            {part}
                          </span>
                        )
                      )}
                    </code>
                  ) : line.highlight === "key" ? (
                    <code className="pl-4">
                      <span className="text-primary">
                        {line.content.replace(",", "")}
                      </span>
                      {line.content.includes(",") ? "," : ""}
                    </code>
                  ) : line.highlight === "values" ? (
                    <code className="pl-8">
                      {line.content.split(", ").map((val, j, arr) => (
                        <span key={j}>
                          <span className="text-secondary">{val}</span>
                          {j < arr.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </code>
                  ) : (
                    <code className={line.num === "06" ? "pl-4" : ""}>
                      {line.content}
                    </code>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Abstract element */}
          <div className="about-deco absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tr from-primary-container to-secondary-container rounded-xl -z-10 opacity-20 blur-2xl" />
        </div>

        {/* Right Side: Content */}
        <div className="about-content space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3">
              <div className="hero-line h-px w-8 bg-primary" />
              <span className="font-[family-name:var(--font-label)] text-xs uppercase tracking-[0.2em] text-primary">
                Discovery
              </span>
            </div>
            <h2
              className="font-[family-name:var(--font-headline)] text-5xl md:text-6xl font-bold text-on-surface tracking-tighter leading-tight"
              data-reveal
            >
              About Me
            </h2>
            <p
              className="font-[family-name:var(--font-body)] text-lg text-on-surface-variant leading-relaxed max-w-xl"
              data-reveal
            >
              I&apos;m an Information Technology student at Malla Reddy
              Engineering College with a strong passion for full-stack
              development and AI. I&apos;m currently exploring the MERN stack in
              depth to build modern web applications, while also diving into
              Generative AI to understand how intelligent systems can enhance
              creativity and automation.
            </p>
          </div>

          {/* Stat Cards */}
          <div className="about-stats-grid grid grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`about-stat p-6 bg-surface-container-high/40 border border-outline-variant/20 rounded-xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-primary/40 group ${
                  i === 2 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <div className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">
                  {stat.value}
                </div>
                <div className="font-[family-name:var(--font-label)] text-[10px] uppercase tracking-widest text-on-surface-variant mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              ref={cvBtnRef}
              className="relative inline-flex items-center gap-4 group px-8 py-4 bg-gradient-to-r from-primary-container to-secondary-container rounded-xl text-on-surface font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all solaris-transition overflow-hidden"
            >
              <span className="relative z-10">Download CV</span>
              <span className="material-symbols-outlined relative z-10 text-xl">
                download
              </span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
