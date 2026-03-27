"use client";

import { useEffect, useRef } from "react";
import { canAnimate } from "../utils/animation";
import useMagneticHover from "../hooks/useMagneticHover";

const socialLinks = [
  { label: "GitHub", href: "https://github.com", icon: "code" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "work" },
  { label: "Twitter", href: "https://twitter.com", icon: "share" },
  { label: "Email", href: "mailto:hello@ganeshkulkarni.dev", icon: "mail" },
];

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function SocialIcon({ link }) {
  const iconRef = useRef(null);
  useMagneticHover(iconRef);

  return (
    <a
      ref={iconRef}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant/20 text-neutral-500 hover:text-blue-400 hover:border-blue-400/50 transition-colors solaris-transition"
      aria-label={link.label}
      style={{ opacity: 0 }}
    >
      <span className="material-symbols-outlined text-xl">{link.icon}</span>
    </a>
  );
}

export default function Footer() {
  const footerRef = useRef(null);
  const taglineRef = useRef(null);

  // GSAP entrance animations
  useEffect(() => {
    if (!canAnimate()) return;

    let ctx;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Social icons stagger entrance
        const socialIcons =
          footerRef.current.querySelectorAll(".social-icon");
        gsap.fromTo(
          socialIcons,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );

        // Brand name entrance
        gsap.fromTo(
          ".footer-brand",
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );

        // Text links entrance
        gsap.fromTo(
          ".footer-link",
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 0.5,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );

        // Copyright fade
        gsap.fromTo(
          ".footer-copyright",
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            delay: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );

        // Tagline character scramble on scroll
        ScrollTrigger.create({
          trigger: taglineRef.current,
          start: "top 90%",
          once: true,
          onEnter: () => {
            if (!taglineRef.current) return;
            const el = taglineRef.current;
            const originalText = "GANESH KULKARNI";
            el.style.width = `${el.offsetWidth}px`;

            let iteration = 0;
            const interval = setInterval(() => {
              el.textContent = originalText
                .split("")
                .map((char, i) => {
                  if (char === " ") return " ";
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
          },
        });
      }, footerRef);
    };

    init();
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <footer ref={footerRef} className="w-full py-12 bg-transparent">
      <div className="flex flex-col items-center gap-6 max-w-7xl mx-auto px-8">
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <SocialIcon key={link.label} link={link} />
          ))}
        </div>

        {/* Brand — with scramble effect */}
        <div
          ref={taglineRef}
          className="footer-brand text-lg font-black text-neutral-100 font-[family-name:var(--font-headline)] tracking-widest"
          style={{ opacity: 0 }}
        >
          GANESH KULKARNI
        </div>

        {/* Text Links */}
        <div className="flex gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-neutral-500 hover:text-blue-400 transition-colors"
              style={{ opacity: 0 }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <p
          className="footer-copyright font-[family-name:var(--font-body)] text-[10px] uppercase tracking-widest text-neutral-500 opacity-60 text-center"
          style={{ opacity: 0 }}
        >
          © {new Date().getFullYear()} Ganesh Kulkarni. Built for the cinematic
          web.
        </p>
      </div>
    </footer>
  );
}
