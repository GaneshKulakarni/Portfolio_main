"use client";

import dynamic from "next/dynamic";
import GrainOverlay from "./components/GrainOverlay";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Dynamic imports for heavy components
const SmoothScroll = dynamic(() => import("./components/SmoothScroll"), {
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
const ContactSection = dynamic(() => import("./components/ContactSection"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      {/* Global Overlays */}
      <GrainOverlay />
      <ScrollProgress />
      <Navbar />

      {/* Main Content */}
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </SmoothScroll>
  );
}
