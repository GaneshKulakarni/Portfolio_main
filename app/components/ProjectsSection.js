"use client";

import { useEffect, useRef, useState } from "react";
import { canAnimate } from "../utils/animation";
import useTextReveal from "../hooks/useTextReveal";

const featuredProjects = [
  {
    title: "Earth Together",
    description: "Environmental awareness platform promoting sustainability and community engagement.",
    tags: ["React.js", "Express", "Node.js", "MongoDB"],
    image: "/earth-together.png",
    category: "Full Stack",
    github: "https://github.com/GaneshKulakarni/EarthTogether",
    live: "https://earth-together.vercel.app",
    color: "#4DB33D",
  },
  {
    title: "Image Generation Website",
    description: "AI-powered platform for creating stunning images using advanced generative models.",
    tags: ["React.js", "Express", "MongoDB", "AI APIs"],
    image: "/image-gen.png",
    category: "AI/ML",
    github: "https://github.com/GaneshKulakarni/Image-Generation-Website",
    color: "#818cf8",
  },
  {
    title: "Carbon Compass",
    description: "Personal sustainability application built to help individuals track their carbon footprint.",
    tags: ["TypeScript", "Next.js", "TailwindCSS"],
    category: "SaaS",
    github: "https://github.com/GaneshKulakarni/Carbon-Compass",
    color: "#10b981",
    language: "TypeScript",
  },
  {
    title: "Learn Hub",
    description: "Ed-tech administrative platform supporting courses, students, and assignment tracking.",
    tags: ["JavaScript", "React.js", "Node.js", "MongoDB"],
    category: "EdTech",
    github: "https://github.com/GaneshKulakarni/EDXcellence_Major_Project",
    color: "#8b5cf6",
    language: "JavaScript",
  }
];

const contributedProjects = [
  {
    title: "Blood Connect",
    description: "A platform matching blood donors with local patient queries in real time.",
    tags: ["HTML", "CSS", "JavaScript", "Auth"],
    category: "Social Good",
    github: "https://github.com/GaneshKulakarni/Blood-Connect-By-ChronalLabs-1",
    live: "https://blood-connect-by-chronallabs.onrender.com/",
    color: "#ef4444",
    language: "HTML",
  },
  {
    title: "Weatherify",
    description: "AI weather advisor detailing weekly weather patterns and clothing suggestions.",
    tags: ["JavaScript", "OpenWeather", "AI APIs"],
    category: "Aesthetics",
    github: "https://github.com/GaneshKulakarni/weatherify-1",
    live: "https://weatherify-silk.vercel.app/",
    color: "#60a5fa",
    language: "JavaScript",
  },
  {
    title: "Wanderlust",
    description: "A gorgeous travel review application presenting rental cabins and hotels.",
    tags: ["JavaScript", "EJS", "Express", "MongoDB"],
    category: "Web Dev",
    github: "https://github.com/GaneshKulakarni/wanderLust_1",
    live: "https://wanderlust-wkeg.onrender.com/listings",
    color: "#e5e2e1",
    language: "JavaScript",
  },
  {
    title: "HashTribe",
    description: "Topic-centric community engine parsing hashtag updates to build interest feeds.",
    tags: ["TypeScript", "React", "Next.js"],
    category: "Web Platform",
    github: "https://github.com/GaneshKulakarni/hashtribe_1",
    live: "https://hashtribe.nfks.co.in",
    color: "#0284c7",
    language: "TypeScript",
  },
  {
    title: "Soul Sense Exam",
    description: "Wellness test evaluating users' emotional health and compiling history reports.",
    tags: ["Python", "Flask", "SQLite"],
    category: "Wellness",
    github: "https://github.com/GaneshKulakarni/SOUL_SENSE_EXAM",
    color: "#a855f7",
    language: "Python",
  },
  {
    title: "VishwaGuru",
    description: "Civic action tool simplifying democracy engagement, contacting representatives, and filing grievances.",
    tags: ["HTML", "AI Chat", "Civic Tech"],
    category: "Open Source",
    github: "https://github.com/GaneshKulakarni/VishwaGuru",
    live: "https://fixmyindia-20061986-74e1a.web.app",
    color: "#ffb873",
    language: "HTML",
  },
  {
    title: "100 Days of Web Dev",
    description: "Challenge tracker mapping daily exercise widgets, frontend styles, and animations.",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Practice",
    github: "https://github.com/GaneshKulakarni/100-Days-Of-Web-Development-ECWoC26",
    live: "https://100dayswebdevelopment-ecwoc.netlify.app/",
    color: "#f97316",
    language: "JavaScript",
  },
  {
    title: "DevConnect",
    description: "A modern developer-focused social platform showcasing connections, portfolios, and posts.",
    tags: ["TypeScript", "React", "Tailwind", "Firebase"],
    category: "Social Platform",
    github: "https://github.com/GaneshKulakarni/DevConnect_1",
    live: "https://devconnect-delta.vercel.app/",
    color: "#3b82f6",
    language: "TypeScript",
  },
  {
    title: "LaunchPad CodeH",
    description: "Student portal environment supporting secure workspaces and student submission grading.",
    tags: ["TypeScript", "React.js", "Docker"],
    category: "Education",
    github: "https://github.com/GaneshKulakarni/LaunchPad-CodeH",
    color: "#475569",
    language: "TypeScript",
  },
  {
    title: "College Media",
    description: "Interactive campus notification portal displaying schedules, articles, and exam sheets.",
    tags: ["JavaScript", "Node.js", "Express", "MongoDB"],
    category: "Community",
    github: "https://github.com/GaneshKulakarni/College_Media",
    live: "https://college-media-glw9.onrender.com/",
    color: "#f43f5e",
    language: "JavaScript",
  },
  {
    title: "GroqTales",
    description: "GroqTales is an open-source platform that uses AI to generate stories and comics minted as NFTs on Monad.",
    tags: ["TypeScript", "Groq AI", "Web3", "Next.js"],
    category: "Web3/AI",
    github: "https://github.com/GaneshKulakarni/GroqTales",
    live: "https://www.groqtales.xyz/",
    color: "#d2bbff",
    language: "TypeScript",
  },
  {
    title: "NutriLens",
    description: "Computer vision application parsing food snapshot images to extract calories and nutrition facts.",
    tags: ["JavaScript", "Computer Vision", "AI APIs"],
    category: "HealthTech",
    github: "https://github.com/GaneshKulakarni/NutriLens",
    live: "https://nutri-lens-five.vercel.app",
    color: "#10b981",
    language: "JavaScript",
  },
  {
    title: "Job Portal System",
    description: "Enterprise Java portal application with candidate tracking system features.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "ThymeLeaf"],
    category: "Enterprise",
    github: "https://github.com/GaneshKulakarni/Job-portal-system",
    color: "#14b8a6",
    language: "Java",
  },
  {
    title: "Car Rental",
    description: "An online booking platform presenting beautiful vehicle grids, filters, and checkout sheets.",
    tags: ["JavaScript", "React.js", "Next.js", "CSS"],
    category: "E-commerce",
    github: "https://github.com/GaneshKulakarni/car-rental",
    live: "https://car-rental-eight-eta.vercel.app/",
    color: "#acc7ff",
    language: "JavaScript",
  },
  {
    title: "AI Summarizer",
    description: "Intelligent content summarization tool using advanced NLP techniques.",
    tags: ["Python", "NLP", "React.js", "REST APIs"],
    image: "/ai-summarizer.png",
    category: "AI/ML",
    github: "https://github.com/GaneshKulakarni/ai_summarizer",
    color: "#60a5fa",
  }
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
      <div className="aspect-video w-full overflow-hidden relative flex items-center justify-center bg-black/20">
        {project.image ? (
          <img ref={imgRef} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700" src={project.image} alt={project.title} loading="eager" />
        ) : (
          <div ref={imgRef} className="w-full h-full relative flex items-center justify-center transition-transform duration-700 select-none" style={{ background: `linear-gradient(135deg, ${project.color}10, ${project.color}30)` }}>
            {/* Ambient blur circle */}
            <div className="absolute w-24 h-24 rounded-full filter blur-xl opacity-40 animate-pulse-glow" style={{ backgroundColor: project.color }} />
            {/* Tech tag/text indicator in center */}
            <div className="z-10 flex flex-col items-center px-6 text-center">
              <span className="font-[family-name:var(--font-headline)] text-2xl md:text-3xl font-extrabold tracking-tight opacity-95 leading-tight" style={{ color: project.color }}>
                {project.title}
              </span>
            </div>
            
            {/* Subtly animated decorative grid or lines */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent opacity-60" />
        <div ref={overlayRef} className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`, clipPath: "inset(0 100% 0 0)" }} />
      </div>

      <div className="p-8 flex-grow flex flex-col gap-4">
        <div className="pb-1">
          <h3 ref={titleRef} className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface tracking-tight" style={{ opacity: 0.7 }}>
            {project.title}
          </h3>
        </div>
        <p className="text-on-surface-variant text-sm line-clamp-2 font-light leading-relaxed h-10">{project.description}</p>
        <div ref={tagsRef} className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="project-tag px-3 py-1 bg-surface-variant text-on-surface-variant text-[10px] font-[family-name:var(--font-label)] uppercase tracking-wider rounded-full">{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-outline-variant/10">
          {project.live ? (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium hover:text-secondary transition-colors">Live</a>
          ) : (
            <span className="text-on-surface-variant/30 text-sm font-light select-none">No Live Demo</span>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant text-sm font-medium hover:text-on-surface transition-colors">GitHub</a>
        </div>
      </div>
      <div className="absolute -inset-px rounded-xl border pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderColor: `${project.color}40` }} />
    </article>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const featuredWrapperRef = useRef(null);
  const contributedWrapperRef = useRef(null);

  const [scrollState, setScrollState] = useState({
    featured: { canScrollLeft: false, canScrollRight: true, leftCount: 0, rightCount: 0 },
    contributed: { canScrollLeft: false, canScrollRight: true, leftCount: 0, rightCount: 0 }
  });
  
  useTextReveal(sectionRef);

  const handleScroll = (direction, wrapperRef) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    
    const firstCard = wrapper.querySelector('article');
    const cardWidth = firstCard ? firstCard.offsetWidth : 500;
    const gap = parseFloat(window.getComputedStyle(wrapper).gap) || 32;
    const scrollAmount = cardWidth + gap;

    const targetScroll = wrapper.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);
    wrapper.scrollTo({
      left: targetScroll,
      behavior: "smooth"
    });
  };

  const checkScroll = (wrapper, key) => {
    if (!wrapper) return;
    const { scrollLeft, scrollWidth, clientWidth } = wrapper;
    const canScrollLeft = scrollLeft > 5;
    const canScrollRight = scrollLeft + clientWidth < scrollWidth - 5;

    const children = Array.from(wrapper.children).filter(
      (child) => child.tagName.toLowerCase() === "article"
    );

    let leftCount = 0;
    let rightCount = 0;

    if (children.length > 0) {
      const wrapperRect = wrapper.getBoundingClientRect();
      const viewportLeft = wrapperRect.left;
      const viewportRight = wrapperRect.right;

      children.forEach((child) => {
        const childRect = child.getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;

        if (childCenter < viewportLeft) {
          leftCount++;
        } else if (childCenter > viewportRight) {
          rightCount++;
        }
      });
    }

    // Clamp values at edges
    if (!canScrollLeft) {
      leftCount = 0;
    }
    if (!canScrollRight) {
      rightCount = 0;
    }

    setScrollState((prev) => {
      const prevState = prev[key];
      if (
        prevState.canScrollLeft === canScrollLeft &&
        prevState.canScrollRight === canScrollRight &&
        prevState.leftCount === leftCount &&
        prevState.rightCount === rightCount
      ) {
        return prev;
      }
      return {
        ...prev,
        [key]: { canScrollLeft, canScrollRight, leftCount, rightCount }
      };
    });
  };

  useEffect(() => {
    const featured = featuredWrapperRef.current;
    const contributed = contributedWrapperRef.current;

    const handleFeaturedScroll = () => checkScroll(featured, "featured");
    const handleContributedScroll = () => checkScroll(contributed, "contributed");

    if (featured) {
      featured.addEventListener("scroll", handleFeaturedScroll);
      checkScroll(featured, "featured");
    }
    if (contributed) {
      contributed.addEventListener("scroll", handleContributedScroll);
      checkScroll(contributed, "contributed");
    }

    const handleResize = () => {
      checkScroll(featured, "featured");
      checkScroll(contributed, "contributed");
    };
    window.addEventListener("resize", handleResize);

    // Deferred trigger to ensure component rendering and layouts are computed
    const timer = setTimeout(handleResize, 500);

    return () => {
      if (featured) featured.removeEventListener("scroll", handleFeaturedScroll);
      if (contributed) contributed.removeEventListener("scroll", handleContributedScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} id="work" className="featured-projects relative z-20 pt-24 pb-32 overflow-hidden w-full flex flex-col gap-24">
      {/* Featured Projects Section */}
      <div className="flex flex-col gap-12 relative">
        <div className="px-6 md:px-24">
          <h2 className="font-[family-name:var(--font-headline)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-2" data-reveal>
            Featured Work
          </h2>
          <p className="text-on-surface-variant text-lg max-w-xl font-light leading-relaxed">
            Projects that define my craft. A curated collection of digital experiences built from the ground up.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full group/carousel">
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll("left", featuredWrapperRef)}
            disabled={!scrollState.featured.canScrollLeft}
            className={`absolute left-4 md:left-12 top-[40%] -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 ${
              scrollState.featured.canScrollLeft
                ? "bg-neutral-900/90 border-primary/50 text-primary hover:bg-neutral-800 hover:scale-105 hover:border-primary hover:text-white active:scale-95 shadow-[0_0_15px_rgba(80,143,248,0.35)] cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll Left"
          >
            <span className="font-[family-name:var(--font-headline)] text-base font-bold text-white select-none">
              {scrollState.featured.leftCount}
            </span>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll("right", featuredWrapperRef)}
            disabled={!scrollState.featured.canScrollRight}
            className={`absolute right-4 md:right-12 top-[40%] -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 ${
              scrollState.featured.canScrollRight
                ? "bg-neutral-900/90 border-primary/50 text-primary hover:bg-neutral-800 hover:scale-105 hover:border-primary hover:text-white active:scale-95 shadow-[0_0_15px_rgba(80,143,248,0.35)] cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll Right"
          >
            <span className="font-[family-name:var(--font-headline)] text-base font-bold text-white select-none">
              {scrollState.featured.rightCount}
            </span>
          </button>

          <div
            ref={featuredWrapperRef}
            className="cards-wrapper flex gap-8 px-6 md:px-24 overflow-x-auto pb-12 no-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
            {/* Spacer */}
            <div className="flex-shrink-0 w-12" />
          </div>
        </div>
      </div>

      {/* Contributed Projects Section */}
      <div className="flex flex-col gap-12 relative">
        <div className="px-6 md:px-24">
          <h2 className="font-[family-name:var(--font-headline)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-2" data-reveal>
            Contributed Work
          </h2>
          <p className="text-on-surface-variant text-lg max-w-xl font-light leading-relaxed">
            Collaborations, open-source involvement, and forked ecosystems I've refined or added functionality to.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full group/carousel">
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll("left", contributedWrapperRef)}
            disabled={!scrollState.contributed.canScrollLeft}
            className={`absolute left-4 md:left-12 top-[40%] -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 ${
              scrollState.contributed.canScrollLeft
                ? "bg-neutral-900/90 border-primary/50 text-primary hover:bg-neutral-800 hover:scale-105 hover:border-primary hover:text-white active:scale-95 shadow-[0_0_15px_rgba(80,143,248,0.35)] cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll Left"
          >
            <span className="font-[family-name:var(--font-headline)] text-base font-bold text-white select-none">
              {scrollState.contributed.leftCount}
            </span>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll("right", contributedWrapperRef)}
            disabled={!scrollState.contributed.canScrollRight}
            className={`absolute right-4 md:right-12 top-[40%] -translate-y-1/2 z-30 w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-md transition-all duration-300 ${
              scrollState.contributed.canScrollRight
                ? "bg-neutral-900/90 border-primary/50 text-primary hover:bg-neutral-800 hover:scale-105 hover:border-primary hover:text-white active:scale-95 shadow-[0_0_15px_rgba(80,143,248,0.35)] cursor-pointer"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Scroll Right"
          >
            <span className="font-[family-name:var(--font-headline)] text-base font-bold text-white select-none">
              {scrollState.contributed.rightCount}
            </span>
          </button>

          <div
            ref={contributedWrapperRef}
            className="cards-wrapper flex gap-8 px-6 md:px-24 overflow-x-auto pb-12 no-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {contributedProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
            {/* Spacer */}
            <div className="flex-shrink-0 w-12" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
