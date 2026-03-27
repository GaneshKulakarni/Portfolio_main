"use client";

import { useEffect, useRef } from "react";

/**
 * SmoothScroll — Initializes Lenis smooth scroll and syncs it with GSAP ScrollTrigger.
 * Wraps children without adding extra DOM elements.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    let lenis;

    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      // Sync Lenis scroll position with ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // Use GSAP ticker to drive Lenis raf
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      // Disable GSAP lag smoothing for consistent behavior
      gsap.ticker.lagSmoothing(0);
    };

    initLenis();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
