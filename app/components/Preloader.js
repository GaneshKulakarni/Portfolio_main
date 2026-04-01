"use client";

import { useEffect, useRef, useState } from "react";
import { canAnimate } from "../utils/animation";
import { gsap } from "gsap";

/**
 * Preloader — Full-screen fixed overlay with:
 * 1. A 0→100 CSS-driven counter (always runs, never stuck)
 * 2. "Ganesh Kulakarni" letter-by-letter reveal via GSAP
 * 3. Cinematic exit animation
 *
 * @param {{ onComplete: () => void }} props
 */
export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null);
  const counterRef = useRef(null);
  const lettersRef = useRef([]);
  const [visible, setVisible] = useState(true);
  const progressBarRef = useRef(null);

  useEffect(() => {
    // We are temporarily bypassing the reduced motion check to guarantee the user sees it
    // if (!canAnimate()) {
    //   setVisible(false);
    //   onComplete?.();
    //   return;
    // }

    let ctx;
    let rafId;

    const completeExit = () => {
      if (!overlayRef.current) {
        setVisible(false);
        onComplete?.();
        return;
      }
      const exitTl = gsap.timeline({
        onComplete: () => {
          setVisible(false);
          onComplete?.();
        },
      });

      exitTl.to(counterRef.current, { opacity: 0, duration: 0.25 });

      exitTl.to(
        lettersRef.current,
        { y: "-100%", opacity: 0, stagger: 0.03, ease: "power4.in", duration: 0.45 },
        "-=0.1"
      );

      exitTl.to(
        overlayRef.current,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", ease: "power3.inOut", duration: 0.9, delay: 0.2 },
        "-=0.15"
      );
    };

    const init = () => {
      try {
        ctx = gsap.context(() => {
          const tl = gsap.timeline({ onComplete: completeExit });

          tl.fromTo(
            lettersRef.current,
            { y: "100%", opacity: 0 },
            { y: "0%", opacity: 1, stagger: 0.04, ease: "power4.out", duration: 0.7 },
            0
          );
        }, overlayRef);

        const counterEl = counterRef.current;
        if (counterEl) {
          counterEl.style.transition = "none";
          let start = null;
          const duration = 2800;
          const target = 100;

          const animate = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            
            const eased = progress === 1 ? 1 : 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.round(eased * target);
            
            if (counterRef.current) {
                counterRef.current.textContent = currentCount;
            }
            
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${progress * 100}%`;
            }
            
            if (progress < 1) {
              rafId = requestAnimationFrame(animate);
            } else {
              if (counterRef.current) {
                  counterRef.current.textContent = "100";
              }
              setTimeout(() => {
                completeExit();
              }, 400);
            }
          };
          rafId = requestAnimationFrame(animate);
        }
      } catch (err) {
        console.error("Preloader animation error:", err);
        setVisible(false);
        onComplete?.();
      }
    };

    init();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (ctx) ctx.revert();
    };
  }, [onComplete]);

  if (!visible) return null;

  const name = "Ganesh Kulkarni";

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#050505", // Slightly deeper black
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Cinematic Counter */}
        <div
          ref={counterRef}
          style={{
            fontFamily: "var(--font-headline), sans-serif",
            fontSize: "clamp(6rem, 20vw, 15rem)",
            fontWeight: 800,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            position: "relative",
            background: "linear-gradient(180deg, #fff 0%, #777 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))",
          }}
        >
          0
        </div>

        {/* Text Layer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.15em",
            marginTop: "-2rem",
            zIndex: 2,
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
                  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                  fontWeight: 400,
                  color: "#aaa",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  willChange: "transform",
                  ...(char === " " ? { width: "0.4em" } : {}),
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            </span>
          ))}
        </div>

        {/* Loading Bar Container */}
        <div
          style={{
            width: "200px",
            height: "2px",
            background: "rgba(255, 255, 255, 0.05)",
            marginTop: "2rem",
            position: "relative",
            overflow: "hidden",
            borderRadius: "10px",
          }}
        >
          <div
            ref={progressBarRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "0%",
              background: "linear-gradient(90deg, transparent, #fff, transparent)",
              transition: "width 0.1s ease-out",
            }}
          />
        </div>
      </div>

      {/* Decorative Orbs or subtle details */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "60vw",
          height: "60vw",
          background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
    </div>
  );
}
