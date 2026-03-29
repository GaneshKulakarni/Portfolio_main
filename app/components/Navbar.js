"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { canAnimate } from "../utils/animation";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * Character scramble effect on text elements.
 * Replaces characters randomly for 8 iterations, then restores original text.
 */
function useCharScramble(elementRef, originalText) {
  const scramble = useCallback(() => {
    const el = elementRef.current;
    if (!el || !originalText) return;

    // Lock width
    el.style.width = `${el.offsetWidth}px`;
    el.style.display = "inline-block";

    let iteration = 0;
    const interval = setInterval(() => {
      el.textContent = originalText
        .split("")
        .map((char, i) => {
          if (i < iteration) return originalText[i];
          return SCRAMBLE_CHARS[
            Math.floor(Math.random() * SCRAMBLE_CHARS.length)
          ];
        })
        .join("");

      if (iteration >= originalText.length) {
        clearInterval(interval);
        el.textContent = originalText;
        el.style.width = "";
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [elementRef, originalText]);

  return scramble;
}

export default function Navbar({ preloaderDone }) {
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const linkRefs = useRef([]);

  // Entrance animation after preloader
  useEffect(() => {
    if (!preloaderDone || !canAnimate()) return;

    let ctx;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Navbar slides in
        gsap.fromTo(
          navRef.current,
          { y: -80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 0.6,
            delay: 0.1,
          }
        );

        // Scroll-based compact mode
        ScrollTrigger.create({
          start: 60,
          onEnter: () => {
            gsap.to(navRef.current, {
              backdropFilter: "blur(12px)",
              background: "rgba(0, 0, 0, 0.8)",
              duration: 0.4,
            });
          },
          onLeaveBack: () => {
            gsap.to(navRef.current, {
              backdropFilter: "blur(20px)",
              background: "rgba(23, 23, 23, 0.4)",
              duration: 0.4,
            });
          },
        });
      }, navRef);
    };

    init();
    return () => {
      if (ctx) ctx.revert();
    };
  }, [preloaderDone]);

  // Active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) =>
        document.querySelector(link.href)
      );
      let current = "about";
      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // Use a tighter threshold for section tracking
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section.id;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Move active indicator
  useEffect(() => {
    if (!canAnimate()) return;

    const activeIndex = navLinks.findIndex(
      (link) => link.href.slice(1) === activeSection
    );
    const activeLink = linkRefs.current[activeIndex];
    const indicator = indicatorRef.current;

    if (!activeLink || !indicator) return;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();

      gsap.to(indicator, {
        x: linkRect.left - navRect.left + linkRect.width / 2 - 3,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    init();
  }, [activeSection]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Character scramble on hover
  const handleLinkHover = (index) => {
    const el = linkRefs.current[index];
    if (!el) return;

    const originalText = navLinks[index].label;
    el.style.width = `${el.offsetWidth}px`;
    el.style.display = "inline-block";

    let iteration = 0;
    const interval = setInterval(() => {
      el.textContent = originalText
        .split("")
        .map((char, i) => {
          if (i < iteration) return originalText[i];
          return SCRAMBLE_CHARS[
            Math.floor(Math.random() * SCRAMBLE_CHARS.length)
          ];
        })
        .join("");

      if (iteration >= originalText.length) {
        clearInterval(interval);
        el.textContent = originalText;
        el.style.width = "";
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 w-max rounded-full border border-neutral-700/20 px-6 py-2 mt-6 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.3)] solaris-transition transition-all duration-500 ${
          scrolled
            ? "bg-neutral-900/60 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            : "bg-neutral-900/40"
        }`}
        style={preloaderDone ? {} : { opacity: 0, transform: "translateX(-50%) translateY(-80px)" }}
        id="main-navbar"
      >
        {/* Brand */}
        <div className="text-2xl font-bold tracking-tighter text-neutral-100 font-[family-name:var(--font-headline)]">
          GK
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 relative">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              ref={(el) => (linkRefs.current[i] = el)}
              onClick={(e) => handleNavClick(e, link.href)}
              onMouseEnter={() => handleLinkHover(i)}
              className={`font-[family-name:var(--font-headline)] tracking-tight text-sm font-medium transition-colors duration-300 solaris-transition hover:text-blue-300 active:scale-90 ${
                activeSection === link.href.slice(1)
                  ? "text-blue-400 font-bold"
                  : "text-neutral-400"
              }`}
            >
              {link.label}
            </a>
          ))}

          {/* Active indicator dot */}
          <div
            ref={indicatorRef}
            className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"
            style={{ opacity: 0 }}
          />
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
            className={`block w-5 h-0.5 bg-on-surface transition-transform solaris-transition ${
              mobileOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-on-surface transition-opacity solaris-transition ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-on-surface transition-transform solaris-transition ${
              mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
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
              className={`font-[family-name:var(--font-headline)] text-2xl font-medium transition-all solaris-transition ${
                activeSection === link.href.slice(1)
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
