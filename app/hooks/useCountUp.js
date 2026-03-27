"use client";

import { useEffect } from "react";
import { canAnimate } from "../utils/animation";

/**
 * useCountUp — Animates a number from 0 to target on ScrollTrigger enter.
 *
 * @param {React.RefObject} ref — ref to the DOM element displaying the number
 * @param {number} target — the target number to count up to
 * @param {string} suffix — optional suffix (e.g. "+", "x", "%")
 */
export default function useCountUp(ref, target, suffix = "") {
  useEffect(() => {
    const el = ref.current;
    if (!el || !canAnimate()) return;

    let ctx;

    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          snap: { val: 1 },
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = obj.val + suffix;
          },
        });
      }, ref);
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [ref, target, suffix]);
}
