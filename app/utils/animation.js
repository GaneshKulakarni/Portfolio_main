/**
 * Animation utility — guards all GSAP animation blocks
 * Checks if browser environment exists AND user hasn't enabled reduced motion
 */
export const canAnimate = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
