"use client";

import { useEffect, useRef } from "react";
import { canAnimate } from "../utils/animation";
import useTextReveal from "../hooks/useTextReveal";

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

function TimelineCard({ exp }) {
  return (
    <div className="timeline-card glass-card p-8 rounded-xl hover:bg-on-surface/[0.08] relative overflow-hidden transition-colors duration-500">
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

      <ul
        className={`space-y-4 font-[family-name:var(--font-body)] text-on-surface-variant text-base ${
          exp.location ? "" : "mt-4"
        }`}
      >
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
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  // Text reveal for headings
  useTextReveal(sectionRef);

  // GSAP animations
  useEffect(() => {
    if (!canAnimate()) return;

    let ctx;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Header entrance
        gsap.fromTo(
          ".exp-header",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".exp-header",
              start: "top 80%",
              once: true,
            },
          }
        );

        // SVG line draw on scroll
        const path = pathRef.current;
        if (path) {
          const length = path.getTotalLength();
          path.style.strokeDasharray = length;
          path.style.strokeDashoffset = length;

          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current.querySelector(".timeline-container"),
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          });
        }

        // Timeline nodes — scale in with ripple
        const nodes = sectionRef.current.querySelectorAll(".timeline-node");
        nodes.forEach((node) => {
          gsap.fromTo(
            node,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              ease: "back.out(2)",
              duration: 0.5,
              scrollTrigger: {
                trigger: node,
                start: "top 75%",
                once: true,
              },
            }
          );

          // Ripple ring
          const ripple = node.querySelector(".node-ripple");
          if (ripple) {
            gsap.fromTo(
              ripple,
              { scale: 1, opacity: 0.6 },
              {
                scale: 2.5,
                opacity: 0,
                duration: 0.7,
                scrollTrigger: {
                  trigger: node,
                  start: "top 75%",
                  once: true,
                },
              }
            );
          }
        });

        // Timeline cards — slide in from alternating sides
        const cards = sectionRef.current.querySelectorAll(".timeline-entry");
        cards.forEach((card, i) => {
          const isLeft = i % 2 === 0;
          gsap.fromTo(
            card,
            { opacity: 0, y: 40, x: isLeft ? -60 : 60, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              x: 0,
              scale: 1,
              ease: "power3.out",
              duration: 0.8,
              scrollTrigger: {
                trigger: card,
                start: "top 78%",
                once: true,
              },
            }
          );

          // Date labels fade in with delay
          const dateLabel = card.querySelector(".timeline-date");
          if (dateLabel) {
            gsap.fromTo(
              dateLabel,
              { opacity: 0, y: 10 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 78%",
                  once: true,
                },
              }
            );
          }
        });
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
      id="experience"
      className="relative z-10 min-h-screen pt-40 pb-24 overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
        <span className="text-[30rem] font-[family-name:var(--font-headline)] font-bold tracking-tighter text-on-surface">
          GK
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header */}
        <div className="exp-header mb-24 flex flex-col items-center">
          <span className="font-[family-name:var(--font-label)] text-xs uppercase tracking-[0.2em] text-primary mb-4">
            Chronology
          </span>
          <h2
            className="font-[family-name:var(--font-headline)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-on-surface leading-none text-center"
            data-reveal
          >
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative">
          {/* SVG Timeline Line — draws on scroll */}
          <svg
            ref={svgRef}
            className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[4px] hidden md:block"
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="timeline-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="20%" stopColor="#508ff8" />
                <stop offset="80%" stopColor="#6001d1" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <line
              ref={pathRef}
              x1="2"
              y1="0"
              x2="2"
              y2="100%"
              className="timeline-svg-line"
              style={{ filter: "drop-shadow(0 0 8px rgba(80,143,248,0.3))" }}
            />
          </svg>

          <div className="space-y-24 md:space-y-32">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="timeline-entry relative flex flex-col md:flex-row items-center justify-between w-full"
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
                <div className="timeline-node absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center z-20">
                  <div
                    className={`w-4 h-4 rounded-full ${exp.dotColor} border-[3px] border-surface`}
                    style={{ boxShadow: "0 0 15px #acc7ff" }}
                  />
                  {/* Ripple ring */}
                  <div
                    className="node-ripple absolute w-4 h-4 rounded-full border-2 border-primary"
                    style={{ opacity: 0 }}
                  />
                </div>

                {/* Right content */}
                <div
                  className={`w-full md:w-[45%] ${
                    exp.side === "right"
                      ? "order-2"
                      : "order-1 md:order-2 hidden md:block"
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

                {/* Date label removed to prevent overlap and redundancy */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
