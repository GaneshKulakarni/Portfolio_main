"use client";

import { useEffect, useRef, useState } from "react";
import { canAnimate } from "../utils/animation";
import useTextReveal from "../hooks/useTextReveal";

const projects = [
  {
    title: "Earth Together",
    description: "Environmental awareness platform promoting sustainability and community engagement.",
    tags: ["React.js", "Express", "Node.js", "MongoDB"],
    image: "/earth-together.png",
    category: "Full Stack",
    github: "https://github.com/GaneshKulkarni/EarthTogether",
    color: "#4DB33D",
  },
  {
    title: "Image Generation Website",
    description: "AI-powered platform for creating stunning images using advanced generative models.",
    tags: ["React.js", "Express", "MongoDB", "AI APIs"],
    image: "/image-gen.png",
    category: "AI/ML",
    github: "https://github.com/GaneshKulkarni/image-generation",
    color: "#818cf8",
  },
  {
    title: "AI Summarizer",
    description: "Intelligent content summarization tool using advanced NLP techniques.",
    tags: ["Python", "NLP", "React.js", "REST APIs"],
    image: "/ai-summarizer.png",
    category: "AI/ML",
    github: "https://github.com/GaneshKulkarni/ai_summarizer",
    color: "#60a5fa",
  },
];

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const tagsRef = useRef(null);
  const imgRef = useRef(null);

  const handleMouseEnter = async () => {
    if (!canAnimate()) return;
    const gsap = (await import("gsap")).default;

    if (overlayRef.current) gsap.to(overlayRef.current, { clipPath: "inset(0 0% 0 0)", ease: "power3.inOut", duration: 0.5 });
    if (titleRef.current) gsap.to(titleRef.current, { opacity: 1, duration: 0.4, ease: "power3.out" });
    if (tagsRef.current) {
      const tags = tagsRef.current.querySelectorAll(".project-tag");
      gsap.fromTo(tags, { opacity: 0, y: 8 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: "power2.out" });
    }
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1.06, duration: 0.6, ease: "power2.out" });
  };

  const handleMouseLeave = async () => {
    if (!canAnimate()) return;
    const gsap = (await import("gsap")).default;
    if (overlayRef.current) gsap.to(overlayRef.current, { clipPath: "inset(0 100% 0 0)", ease: "power3.inOut", duration: 0.4 });
    if (titleRef.current) gsap.to(titleRef.current, { opacity: 0.7, duration: 0.3 });
    if (imgRef.current) gsap.to(imgRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
  };

  return (
    <article
      ref={cardRef}
      className="card relative flex-shrink-0 w-[85vw] md:w-[500px] flex flex-col bg-surface-container border border-outline-variant/20 rounded-xl overflow-hidden shadow-2xl group project-card-v2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-video w-full overflow-hidden relative">
        <img ref={imgRef} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700" src={project.image} alt={project.title} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent opacity-60" />
        <div ref={overlayRef} className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`, clipPath: "inset(0 100% 0 0)" }} />
      </div>

      <div className="p-8 flex-grow flex flex-col gap-4">
        <div className="pb-1">
          <h3 ref={titleRef} className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface tracking-tight" style={{ opacity: 0.7 }}>
            {project.title}
          </h3>
        </div>
        <p className="text-on-surface-variant text-sm line-clamp-2 font-light">{project.description}</p>
        <div ref={tagsRef} className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="project-tag px-3 py-1 bg-surface-variant text-on-surface-variant text-[10px] font-[family-name:var(--font-label)] uppercase tracking-wider rounded-full">{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-outline-variant/10">
          <button className="text-primary text-sm font-medium hover:text-secondary transition-colors">Live</button>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant text-sm font-medium hover:text-on-surface transition-colors">GitHub</a>
        </div>
      </div>
      <div className="absolute -inset-px rounded-xl border pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: `${project.color}40` }} />
    </article>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  
  useTextReveal(sectionRef);

  // Horizontal scroll handler: vertical wheel -> horizontal progress ONLY when hovered
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleWheel = (e) => {
      // If we are over the cards and scrolling vertically, scroll horizontally instead
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        wrapper.scrollLeft += e.deltaY;
      }
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    return () => wrapper.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section ref={sectionRef} id="work" className="featured-projects relative z-20 pt-24 pb-32 overflow-hidden w-full">
      <div className="px-6 md:px-24 mb-12">
        <h2 className="font-[family-name:var(--font-headline)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-2" data-reveal>
          Featured Work
        </h2>
        <p className="text-on-surface-variant text-lg max-w-xl font-light leading-relaxed">
          Projects that define my craft. A curated collection of digital experiences built with precision and intent.
        </p>
      </div>

      <div
        ref={wrapperRef}
        className="cards-wrapper flex gap-8 px-6 md:px-24 overflow-x-auto pb-12 no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
        {/* Spacer */}
        <div className="flex-shrink-0 w-12" />
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
