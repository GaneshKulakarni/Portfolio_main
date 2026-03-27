"use client";

import { useEffect, useRef } from "react";
import { canAnimate } from "../utils/animation";

/**
 * useHorizontalScroll — Pins a container and scrubs a track element
 * horizontally as the user scrolls vertically.
 *
 * @param {React.RefObject} containerRef — the full-viewport outer wrapper
 * @param {React.RefObject} trackRef — the flex row of scrolling items inside
 * @returns {{ scrollTriggerRef: React.RefObject }}
 */
export default function useHorizontalScroll(containerRef, trackRef) {
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current || !canAnimate()) return;

    let ctx;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const totalWidth =
          trackRef.current.scrollWidth - containerRef.current.offsetWidth;

        const tween = gsap.to(trackRef.current, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${totalWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        scrollTriggerRef.current = tween.scrollTrigger;
      }, containerRef);
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [containerRef, trackRef]);

  return { scrollTriggerRef };
}
