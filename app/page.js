"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import GrainOverlay from "./components/GrainOverlay";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Dynamic imports for heavy components (no SSR needed for animations)
const Preloader = dynamic(() => import("./components/Preloader"), {
  ssr: false,
});
const SmoothScroll = dynamic(() => import("./components/SmoothScroll"), {
  ssr: false,
});
const Cursor = dynamic(() => import("./components/Cursor"), {
  ssr: false,
});
const ParticleField = dynamic(() => import("./three/ParticleField"), {
  ssr: false,
});
const HeroSection = dynamic(() => import("./components/HeroSection"), {
  ssr: false,
});
const AboutSection = dynamic(() => import("./components/AboutSection"), {
  ssr: false,
});
const TechStackSection = dynamic(
  () => import("./components/TechStackSection"),
  { ssr: false }
);
const ProjectsSection = dynamic(
  () => import("./components/ProjectsSection"),
  { ssr: false }
);
const ExperienceSection = dynamic(
  () => import("./components/ExperienceSection"),
  { ssr: false }
);
const EducationSection = dynamic(
  () => import("./components/EducationSection"),
  { ssr: false }
);
const ContactSection = dynamic(() => import("./components/ContactSection"), {
  ssr: false,
});

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
    // Signal to CSS that GSAP is in control — disables fallback animations
    if (typeof document !== "undefined") {
      document.body.classList.add("gsap-ready");
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Preloader — shown until complete */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Custom cursor */}
      <Cursor />

      {/* Particle field background */}
      <ParticleField />

      <SmoothScroll>
        {/* Global Overlays */}
        <GrainOverlay />
        <ScrollProgress />
        <Navbar preloaderDone={preloaderDone} />

        {/* Main Content */}
        <HeroSection preloaderDone={preloaderDone} />
        <AboutSection />
        <EducationSection />
        <TechStackSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </SmoothScroll>
    </>
  );
}
