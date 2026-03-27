"use client";

import { useEffect, useRef } from "react";
import { canAnimate } from "../utils/animation";

/**
 * Cursor — Custom cursor with a small dot and a larger trailing ring.
 * Ring scales up on interactive elements with mix-blend-mode: difference.
 * Hidden on touch devices.
 */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Don't render custom cursor on touch devices
    if (!canAnimate()) return;
    if (typeof window === "undefined") return;

    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let gsapInstance;

    const init = async () => {
      gsapInstance = (await import("gsap")).default;

      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      // Show cursor elements
      dot.style.opacity = "1";
      ring.style.opacity = "1";

      const handleMouseMove = (e) => {
        // Dot follows immediately
        gsapInstance.set(dot, { x: e.clientX - 4, y: e.clientY - 4 });
        // Ring follows with lag
        gsapInstance.to(ring, {
          x: e.clientX - 20,
          y: e.clientY - 20,
          duration: 0.15,
          ease: "power2.out",
        });
      };

      const handleMouseEnterInteractive = () => {
        gsapInstance.to(ring, {
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out",
        });
        ring.style.mixBlendMode = "difference";
      };

      const handleMouseLeaveInteractive = () => {
        gsapInstance.to(ring, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
        ring.style.mixBlendMode = "normal";
      };

      // Register global mousemove
      window.addEventListener("mousemove", handleMouseMove);

      // Attach to all interactive elements
      const attachInteractiveListeners = () => {
        const interactiveEls = document.querySelectorAll("a, button, [role='button']");
        interactiveEls.forEach((el) => {
          el.addEventListener("mouseenter", handleMouseEnterInteractive);
          el.addEventListener("mouseleave", handleMouseLeaveInteractive);
        });
      };

      // Initial attach + MutationObserver for dynamic content
      attachInteractiveListeners();
      const observer = new MutationObserver(() => {
        attachInteractiveListeners();
      });
      observer.observe(document.body, { childList: true, subtree: true });

      // Store for cleanup
      window._cursorCleanup = {
        handleMouseMove,
        handleMouseEnterInteractive,
        handleMouseLeaveInteractive,
        observer,
      };
    };

    init();

    return () => {
      if (window._cursorCleanup) {
        const {
          handleMouseMove,
          handleMouseEnterInteractive,
          handleMouseLeaveInteractive,
          observer,
        } = window._cursorCleanup;

        window.removeEventListener("mousemove", handleMouseMove);
        observer.disconnect();

        const interactiveEls = document.querySelectorAll("a, button, [role='button']");
        interactiveEls.forEach((el) => {
          el.removeEventListener("mouseenter", handleMouseEnterInteractive);
          el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
        });

        delete window._cursorCleanup;
      }
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#acc7ff",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: 0,
          willChange: "transform",
        }}
        aria-hidden="true"
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1.5px solid rgba(172, 199, 255, 0.5)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: 0,
          willChange: "transform",
        }}
        aria-hidden="true"
      />
    </>
  );
}
