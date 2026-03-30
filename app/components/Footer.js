"use client";

import { useEffect, useRef } from "react";
import { canAnimate } from "../utils/animation";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/GaneshKulakarni",
    icon: "code",
    color: "#e8e8e8",
    hoverColor: "#ffffff",
    bg: "rgba(232, 232, 232, 0.08)",
    hoverBg: "rgba(232, 232, 232, 0.15)",
    border: "rgba(232, 232, 232, 0.15)",
    hoverBorder: "rgba(232, 232, 232, 0.4)",
    shadow: "rgba(232, 232, 232, 0.2)",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kulakarniganesh",
    icon: "work",
    color: "#0077B5",
    hoverColor: "#00A0DC",
    bg: "rgba(0, 119, 181, 0.08)",
    hoverBg: "rgba(0, 119, 181, 0.18)",
    border: "rgba(0, 119, 181, 0.2)",
    hoverBorder: "rgba(0, 160, 220, 0.5)",
    shadow: "rgba(0, 119, 181, 0.3)",
  },
  {
    label: "Twitter",
    href: "https://twitter.com",
    icon: "share",
    color: "#1DA1F2",
    hoverColor: "#4FC3F7",
    bg: "rgba(29, 161, 242, 0.08)",
    hoverBg: "rgba(29, 161, 242, 0.15)",
    border: "rgba(29, 161, 242, 0.2)",
    hoverBorder: "rgba(79, 195, 247, 0.5)",
    shadow: "rgba(29, 161, 242, 0.25)",
  },
  {
    label: "Email",
    href: "mailto:ganeshkulakarni124@gmail.com",
    icon: "mail",
    color: "#EA4335",
    hoverColor: "#FF6B6B",
    bg: "rgba(234, 67, 53, 0.08)",
    hoverBg: "rgba(234, 67, 53, 0.15)",
    border: "rgba(234, 67, 53, 0.2)",
    hoverBorder: "rgba(255, 107, 107, 0.5)",
    shadow: "rgba(234, 67, 53, 0.25)",
  },
];

function SocialButton({ link }) {
  const btnRef = useRef(null);

  useEffect(() => {
    if (!btnRef.current || !canAnimate()) return;
    const btn = btnRef.current;

    const handleMouseEnter = async () => {
      if (!canAnimate()) return;
      const gsap = (await import("gsap")).default;
      gsap.to(btn, {
        y: -4,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = async () => {
      if (!canAnimate()) return;
      const gsap = (await import("gsap")).default;
      gsap.to(btn, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });
    };

    btn.addEventListener("mouseenter", handleMouseEnter);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mouseenter", handleMouseEnter);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={btnRef}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-btn group relative flex items-center gap-3 px-5 py-3 rounded-xl border backdrop-blur-sm transition-all duration-300"
      style={{
        background: link.bg,
        borderColor: link.border,
        color: link.color,
      }}
      aria-label={link.label}
    >
      <span
        className="material-symbols-outlined text-2xl transition-transform duration-300 group-hover:scale-110"
      >
        {link.icon}
      </span>
      <span className="font-[family-name:var(--font-label)] text-sm font-semibold tracking-wide">
        {link.label}
      </span>

      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 20px ${link.shadow}`,
        }}
      />
    </a>
  );
}

function NavLink({ link }) {
  const linkRef = useRef(null);

  useEffect(() => {
    if (!linkRef.current || !canAnimate()) return;
    const el = linkRef.current;

    const handleMouseEnter = async () => {
      if (!canAnimate()) return;
      const gsap = (await import("gsap")).default;
      gsap.to(el.querySelector(".nav-underline"), {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = async () => {
      if (!canAnimate()) return;
      const gsap = (await import("gsap")).default;
      gsap.to(el.querySelector(".nav-underline"), {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href={link.href}
      className="footer-nav-link relative font-[family-name:var(--font-body)] text-sm text-on-surface-variant hover:text-primary transition-colors duration-300 py-1"
    >
      {link.label}
      <span
        className="nav-underline absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-primary to-secondary origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </a>
  );
}

export default function Footer() {
  const footerRef = useRef(null);
  const topLineRef = useRef(null);

  useEffect(() => {
    if (!canAnimate()) return;

    let ctx;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Top gradient line animation
        if (topLineRef.current) {
          gsap.fromTo(
            topLineRef.current,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left",
              duration: 1.2,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: footerRef.current,
                start: "top 95%",
                once: true,
              },
            }
          );
        }

        // Social buttons stagger entrance
        gsap.fromTo(
          ".social-btn",
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );

        // Brand entrance
        gsap.fromTo(
          ".footer-brand",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );

        // Nav links stagger
        gsap.fromTo(
          ".footer-nav-link",
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );

        // Decorative elements
        gsap.fromTo(
          ".footer-deco",
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );

        // Copyright fade
        gsap.fromTo(
          ".footer-copyright",
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }, footerRef);
    };

    init();
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative w-full overflow-hidden">
      {/* Gradient top border */}
      <div
        ref={topLineRef}
        className="h-px w-full bg-gradient-to-r from-transparent via-primary to-secondary"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Decorative background blobs */}
      <div className="footer-deco absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="footer-deco absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-20">
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24 mb-16">
            {/* Brand Column */}
            <div className="flex flex-col gap-6">
              <div className="footer-brand inline-flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="font-[family-name:var(--font-headline)] text-xl font-black text-surface-container-lowest">
                    GK
                  </span>
                </div>
                <div>
                  <div className="font-[family-name:var(--font-headline)] text-xl font-bold text-on-surface tracking-tight leading-none">
                    Ganesh Kulkarni
                  </div>
                  <div className="font-[family-name:var(--font-label)] text-[10px] uppercase tracking-widest text-on-surface-variant mt-0.5">
                    Portfolio
                  </div>
                </div>
              </div>

              <p className="font-[family-name:var(--font-body)] text-sm text-on-surface-variant leading-relaxed max-w-sm">
                MERN Stack Developer & Agentic AI Enthusiast crafting immersive
                digital experiences with clean code and cinematic design.
              </p>

              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="font-[family-name:var(--font-label)] text-[10px] uppercase tracking-widest text-green-400 font-semibold">
                  Open to opportunities
                </span>
              </div>
            </div>

            {/* Navigation Column */}
            <div className="flex flex-col gap-6">
              <h3 className="font-[family-name:var(--font-headline)] text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                Navigation
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {navLinks.map((link) => (
                  <NavLink key={link.label} link={link} />
                ))}
              </div>
            </div>

            {/* Social Column */}
            <div className="flex flex-col gap-6">
              <h3 className="font-[family-name:var(--font-headline)] text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                Connect
              </h3>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <SocialButton key={link.label} link={link} />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-outline-variant/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="footer-copyright font-[family-name:var(--font-body)] text-xs text-on-surface-variant/60">
                © {new Date().getFullYear()} Ganesh Kulkarni. All rights reserved.
              </p>
              <p className="font-[family-name:var(--font-body)] text-[10px] uppercase tracking-widest text-on-surface-variant/40">
                Built for the cinematic web
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
