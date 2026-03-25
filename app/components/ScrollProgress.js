"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
    const progressRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!progressRef.current) return;
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressRef.current.style.transform = `scaleX(${scrollPercent / 100})`;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-0.5 z-[100] bg-surface-container-high/30">
            <div
                ref={progressRef}
                className="h-full bg-gradient-to-r from-primary-container to-secondary-container scroll-progress shadow-[0_0_10px_rgba(80,143,248,0.5)]"
                style={{ transform: "scaleX(0)" }}
            />
        </div>
    );
}
