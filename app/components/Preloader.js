"use client";

import { useEffect, useRef, useState } from "react";
import { canAnimate } from "../utils/animation";

/**
 * Preloader — Full-screen fixed overlay with:
 * 1. A 0→100 counter
 * 2. "Ganesh Kulakarni" letter-by-letter reveal
 * 3. Cinematic exit animation (counter fade, letter scatter, diagonal clip-path wipe)
 *
 * @param {{ onComplete: () => void }} props
 */
export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null);
  const counterRef = useRef(null);
  const lettersRef = useRef([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // If reduced motion, skip entirely
    if (!canAnimate()) {
      setVisible(false);
      if (onComplete) onComplete();
      return;
    }

    let ctx;

    const init = async () => {
      const gsap = (await import("gsap")).default;

      ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // 1. Animate letters in
        tl.fromTo(
          lettersRef.current,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.04,
            ease: "power4.out",
            duration: 0.7,
          },
          0
        );

        // 2. Counter animation (runs concurrently)
        const counterObj = { val: 0 };
        tl.to(
          counterObj,
          {
            val: 100,
            duration: 2.5,
            ease: "power2.inOut",
            snap: { val: 1 },
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = Math.round(counterObj.val);
              }
            },
            onComplete: () => {
              // 3. Exit sequence
              const exitTl = gsap.timeline({
                onComplete: () => {
                  setVisible(false);
                  if (onComplete) onComplete();
                },
              });

              // Counter fades out
              exitTl.to(counterRef.current, {
                opacity: 0,
                duration: 0.3,
              });

              // Letters scatter up
              exitTl.to(
                lettersRef.current,
                {
                  y: "-100%",
                  opacity: 0,
                  stagger: 0.03,
                  ease: "power4.in",
                  duration: 0.5,
                },
                "-=0.1"
              );

              // Overlay wipes away
              exitTl.to(
                overlayRef.current,
                {
                  clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                  ease: "power3.inOut",
                  duration: 1,
                  delay: 0.3,
                },
                "-=0.2"
              );
            },
          },
          0.3
        );
      }, overlayRef);
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [onComplete]);

  if (!visible) return null;

  const name = "Ganesh Kulakarni";

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      }}
      aria-hidden="true"
    >
      {/* Counter */}
      <div
        ref={counterRef}
        style={{
          fontFamily: "var(--font-headline), sans-serif",
          fontSize: "clamp(5rem, 15vw, 12rem)",
          fontWeight: 700,
          color: "#acc7ff",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          marginBottom: "1.5rem",
        }}
      >
        0
      </div>

      {/* Name — each letter in its own overflow:hidden wrapper */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
        }}
      >
        {name.split("").map((char, i) => (
          <span
            key={i}
            style={{
              overflow: "hidden",
              display: "inline-block",
              lineHeight: 1.2,
            }}
          >
            <span
              ref={(el) => (lettersRef.current[i] = el)}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-headline), sans-serif",
                fontSize: "clamp(1.2rem, 3vw, 2rem)",
                fontWeight: 300,
                color: "#e5e2e1",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                willChange: "transform",
                // Use non-breaking space for actual spaces to preserve gap
                ...(char === " " ? { width: "0.5em" } : {}),
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
