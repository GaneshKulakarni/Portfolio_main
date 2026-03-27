"use client";

import { useEffect } from "react";
import { canAnimate } from "../utils/animation";

/**
 * useMagneticHover — Makes an element subtly follow the cursor on hover
 * with an elastic snap-back on leave.
 *
 * @param {React.RefObject} ref — ref to the target element
 * @param {number} strength — multiplier for the magnetic pull (default 0.35)
 */
export default function useMagneticHover(ref, strength = 0.35) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !canAnimate()) return;

    let gsapInstance;

    const init = async () => {
      gsapInstance = (await import("gsap")).default;

      const handleMouseMove = (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = (e.clientX - centerX) * strength;
        const offsetY = (e.clientY - centerY) * strength;

        gsapInstance.to(el, {
          x: offsetX,
          y: offsetY,
          ease: "power2.out",
          duration: 0.3,
        });
      };

      const handleMouseLeave = () => {
        gsapInstance.to(el, {
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.3)",
          duration: 0.7,
        });
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      // Store for cleanup
      el._magneticHandlers = { handleMouseMove, handleMouseLeave };
    };

    init();

    return () => {
      if (el._magneticHandlers) {
        el.removeEventListener("mousemove", el._magneticHandlers.handleMouseMove);
        el.removeEventListener("mouseleave", el._magneticHandlers.handleMouseLeave);
        delete el._magneticHandlers;
      }
      if (gsapInstance) {
        gsapInstance.set(el, { x: 0, y: 0 });
      }
    };
  }, [ref, strength]);
}
