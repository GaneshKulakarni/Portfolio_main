"use client";

import { useEffect } from "react";
import { canAnimate } from "../utils/animation";

/**
 * useTextReveal — Splits [data-reveal] elements into word-level spans
 * and animates them on ScrollTrigger enter.
 *
 * @param {React.RefObject} containerRef — ref to the container holding data-reveal elements
 * @param {number} delay — optional base delay in seconds
 */
export default function useTextReveal(containerRef, delay = 0) {
  useEffect(() => {
    if (!containerRef.current) return;
    if (!canAnimate()) return;

    let ctx;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const revealEls = containerRef.current.querySelectorAll("[data-reveal]");
        if (!revealEls.length) return;

        revealEls.forEach((el) => {
          // Skip if already processed
          if (el.dataset.revealProcessed) return;
          el.dataset.revealProcessed = "true";

          const text = el.textContent;
          const words = text.split(/\s+/).filter(Boolean);

          // Clear original content
          el.innerHTML = "";

          const wordSpans = [];

          words.forEach((word, i) => {
            // Outer overflow-hidden wrapper
            const wrapper = document.createElement("span");
            wrapper.style.overflow = "hidden";
            wrapper.style.display = "inline-block";
            wrapper.style.verticalAlign = "top";

            // Inner word span
            const wordSpan = document.createElement("span");
            wordSpan.textContent = word;
            wordSpan.style.display = "inline-block";
            wordSpan.style.willChange = "transform";

            wrapper.appendChild(wordSpan);
            el.appendChild(wrapper);

            // Add a space between words (except after last word)
            if (i < words.length - 1) {
              const space = document.createTextNode("\u00A0");
              el.appendChild(space);
            }

            wordSpans.push(wordSpan);
          });

          // Set initial state
          gsap.set(wordSpans, { y: "110%", opacity: 0 });

          // Animate on scroll
          gsap.to(wordSpans, {
            y: "0%",
            opacity: 1,
            stagger: 0.07,
            ease: "power4.out",
            duration: 0.9,
            delay: delay,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
            onComplete: () => {
              // Remove will-change after animation
              wordSpans.forEach((span) => {
                span.style.willChange = "auto";
              });
            },
          });
        });
      }, containerRef);
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [containerRef, delay]);
}
