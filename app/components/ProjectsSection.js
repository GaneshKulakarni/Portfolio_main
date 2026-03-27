"use client";

import { useEffect, useRef, useState } from "react";
import { canAnimate } from "../utils/animation";
import useTextReveal from "../hooks/useTextReveal";
import useHorizontalScroll from "../hooks/useHorizontalScroll";

const projects = [
  {
    title: "Earth Together",
    description:
      "Environmental awareness platform promoting sustainability and community engagement.",
    tags: ["React.js", "Express", "Node.js", "MongoDB"],
    image: "/earth-together.png",
    category: "Full Stack",
    github: "https://github.com/GaneshKulakarni/EarthTogether",
    color: "#4DB33D",
  },
  {
    title: "Image Generation Website",
    description:
      "AI-powered platform for creating stunning images using advanced generative models.",
    tags: ["React.js", "Express", "MongoDB", "AI APIs"],
    image: "/image-gen.png",
    category: "AI/ML",
    github: "https://github.com/GaneshKulakarni/image-generation",
    color: "#818cf8",
  },
  {
    title: "AI Summarizer",
    description:
      "Intelligent content summarization tool using advanced NLP techniques.",
    tags: ["Python", "NLP", "React.js", "REST APIs"],
    image: "/ai-summarizer.png",
    category: "AI/ML",
    github: "https://github.com/GaneshKulakarni/ai_summarizer",
    color: "#60a5fa",
  },
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const tagsRef = useRef(null);
  const imgRef = useRef(null);

  const handleMouseEnter = async () => {
    if (!canAnimate()) return;
    const gsap = (await import("gsap")).default;

    // Color wash overlay
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0% 0 0)",
        ease: "power3.inOut",
        duration: 0.5,
      });
    }

    // Title reveal
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    }

    // Tags stagger in
    if (tagsRef.current) {
      const tags = tagsRef.current.querySelectorAll(".project-tag");
      gsap.fromTo(
        tags,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: "power2.out" }
      );
    }

    // Image subtle scale
    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1.06,
        duration: 0.6,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = async () => {
    if (!canAnimate()) return;
    const gsap = (await import("gsap")).default;

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 100% 0 0)",
        ease: "power3.inOut",
        duration: 0.4,
      });
    }

    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: 20,
        opacity: 0.7,
        duration: 0.3,
      });
    }

    if (imgRef.current) {
      gsap.to(imgRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  return (
    <article
      ref={cardRef}
      className="project-card relative flex-shrink-0 w-[85vw] md:w-[500px] lg:w-[550px] flex flex-col bg-surface-container border border-outline-variant/20 rounded-xl overflow-hidden shadow-2xl group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: 0 }}
    >
      {/* Image */}
      <div className="aspect-video w-full overflow-hidden relative">
        <img
          ref={imgRef}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700"
          src={project.image}
          alt={project.title}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent opacity-60" />

        {/* Color wash overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
            clipPath: "inset(0 100% 0 0)",
          }}
        />
      </div>

      {/* Content */}
      <div className="p-8 flex-grow flex flex-col gap-4">
        {/* Title with overflow hidden reveal */}
        <div className="overflow-hidden">
          <h3
            ref={titleRef}
            className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface tracking-tight"
            style={{ transform: "translateY(20px)", opacity: 0.7 }}
          >
            {project.title}
          </h3>
        </div>

        <p className="text-on-surface-variant text-sm line-clamp-2 font-light">
          {project.description}
        </p>

        {/* Tags */}
        <div ref={tagsRef} className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="project-tag px-3 py-1 bg-surface-variant text-on-surface-variant text-[10px] font-[family-name:var(--font-label)] uppercase tracking-wider rounded-full"
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
            <span className="material-symbols-outlined text-lg">code</span>
            GitHub
          </a>
        </div>
      </div>

      {/* Hover border glow */}
      <div
        className="absolute -inset-px rounded-xl border pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ borderColor: `${project.color}40` }}
      />
    </article>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Text reveal
  useTextReveal(sectionRef);

  // Detect mobile for fallback
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Horizontal scroll (desktop only)
  useHorizontalScroll(
    isMobile ? { current: null } : containerRef,
    isMobile ? { current: null } : trackRef
  );

  // Card entrance animations
  useEffect(() => {
    if (!canAnimate()) return;

    let ctx;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const cards = sectionRef.current.querySelectorAll(".project-card");
        gsap.fromTo(
          cards,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
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
    <section ref={sectionRef} id="work" className="pt-32 pb-20 overflow-x-hidden">
      {/* Header */}
      <header className="mb-20 px-6 md:px-24">
        <h2
          className="font-[family-name:var(--font-headline)] text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-4"
          data-reveal
        >
          Featured Work
        </h2>
        <p className="text-on-surface-variant text-lg max-w-xl font-light leading-relaxed">
          Projects that define my craft. A curated collection of digital
          experiences built with precision and intent.
        </p>
      </header>

      {/* Desktop: Horizontal Scroll */}
      {!isMobile ? (
        <div
          ref={containerRef}
          className="horizontal-scroll-container min-h-screen"
        >
          <div
            ref={trackRef}
            className="horizontal-scroll-track gap-8 px-24 items-center min-h-screen"
          >
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
            {/* Spacer at end */}
            <div className="flex-shrink-0 w-[20vw]" />
          </div>
        </div>
      ) : (
        /* Mobile: Vertical stack */
        <div className="flex flex-col gap-10 px-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
