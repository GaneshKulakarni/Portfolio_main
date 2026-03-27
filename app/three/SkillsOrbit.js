"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { canAnimate } from "../utils/animation";

const skills = [
  { name: "React", abbr: "RE", color: "#61DAFB" },
  { name: "Node.js", abbr: "NO", color: "#68A063" },
  { name: "MongoDB", abbr: "MG", color: "#4DB33D" },
  { name: "Express", abbr: "EX", color: "#828282" },
  { name: "Next.js", abbr: "NX", color: "#ffffff" },
  { name: "Three.js", abbr: "3D", color: "#049EF4" },
  { name: "Tailwind", abbr: "TW", color: "#38BDF8" },
  { name: "GSAP", abbr: "GS", color: "#88CE02" },
  { name: "Git", abbr: "GT", color: "#F1502F" },
  { name: "JavaScript", abbr: "JS", color: "#F7DF1E" },
];

function OrbitalNode({ skill, index, total, radius, hovered, onHover }) {
  const nodeRef = useRef(null);
  const angle = (index / total) * Math.PI * 2;
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  useFrame(() => {
    if (nodeRef.current) {
      // Counter-rotate to stay "upright"
      nodeRef.current.rotation.y -= 0.004;
    }
  });

  return (
    <group ref={nodeRef} position={[x, 0, z]}>
      <Html center distanceFactor={8} style={{ pointerEvents: "auto" }}>
        <div
          onMouseEnter={() => onHover(index)}
          onMouseLeave={() => onHover(null)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            cursor: "default",
            transform: hovered === index ? "scale(1.3)" : "scale(1)",
            transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: `rgba(${hexToRgb(skill.color)}, 0.15)`,
              border: `1.5px solid ${skill.color}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: 700,
              color: skill.color,
              fontFamily: "var(--font-headline), monospace",
              boxShadow:
                hovered === index
                  ? `0 0 20px ${skill.color}40, 0 0 40px ${skill.color}20`
                  : "none",
              transition: "box-shadow 0.3s ease",
            }}
          >
            {skill.abbr}
          </div>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "#c2c6d5",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "var(--font-label), sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            {skill.name}
          </span>
        </div>
      </Html>
    </group>
  );
}

function OrbitalSystem() {
  const groupRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />

      {/* Central sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#444444"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Orbital ring visual */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.9, 3, 64]} />
        <meshBasicMaterial color="#acc7ff" transparent opacity={0.05} side={2} />
      </mesh>

      <group ref={groupRef}>
        {skills.map((skill, i) => (
          <OrbitalNode
            key={skill.name}
            skill={skill}
            index={i}
            total={skills.length}
            radius={3}
            hovered={hovered}
            onHover={setHovered}
          />
        ))}
      </group>
    </>
  );
}

/**
 * SkillsOrbit — 3D orbital skills visualization.
 * Falls back to a CSS grid of skill pills on mobile.
 */
export default function SkillsOrbit() {
  const [isMobile, setIsMobile] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile fallback with GSAP entrance
  useEffect(() => {
    if (!isMobile || !gridRef.current || !canAnimate()) return;

    let ctx;
    const init = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const badges = gridRef.current.querySelectorAll(".skill-badge");
        gsap.from(badges, {
          opacity: 0,
          y: 20,
          stagger: 0.06,
          ease: "power2.out",
          duration: 0.6,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }, gridRef);
    };

    init();
    return () => { if (ctx) ctx.revert(); };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="skill-badge flex items-center gap-3 px-4 py-3 rounded-xl border border-outline-variant/20 bg-surface-container-high/40"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{
                background: `rgba(${hexToRgb(skill.color)}, 0.15)`,
                color: skill.color,
              }}
            >
              {skill.abbr}
            </div>
            <span className="font-[family-name:var(--font-label)] text-xs uppercase tracking-wider text-on-surface-variant">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 600, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 2, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <OrbitalSystem />
      </Canvas>
    </div>
  );
}

// Helper: convert hex to RGB string
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "255, 255, 255";
}
