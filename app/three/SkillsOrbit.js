"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { canAnimate } from "../utils/animation";

// ─── Tech stack data with logo paths ───────────────────────────────
const skills = [
  { name: "React", logo: "/logos/react.svg", color: "#61DAFB" },
  { name: "Node.js", logo: "/logos/nodejs.svg", color: "#68A063" },
  { name: "MongoDB", logo: "/logos/mongodb.svg", color: "#4DB33D" },
  { name: "Express", logo: "/logos/express.svg", color: "#828282" },
  { name: "Next.js", logo: "/logos/nextjs.svg", color: "#ffffff" },
  { name: "Three.js", logo: "/logos/threejs.svg", color: "#049EF4" },
  { name: "Tailwind", logo: "/logos/tailwind.svg", color: "#38BDF8" },
  { name: "GSAP", logo: "/logos/gsap.svg", color: "#88CE02" },
  { name: "Git", logo: "/logos/git.svg", color: "#F1502F" },
  { name: "JavaScript", logo: "/logos/javascript.svg", color: "#F7DF1E" },
];

// ─── 3D Monitor Component ──────────────────────────────────────────
function Monitor() {
  const monitorRef = useRef(null);

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1a1a1a",
        roughness: 0.85,
        metalness: 0.2,
      }),
    []
  );

  const screenMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#0a0a12",
        roughness: 0.1,
        metalness: 0.1,
        reflectivity: 0.8,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        emissive: "#1a1a3e",
        emissiveIntensity: 0.15,
      }),
    []
  );

  const bezelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#111111",
        roughness: 0.4,
        metalness: 0.6,
      }),
    []
  );

  // Subtle breathing animation
  useFrame((state) => {
    if (!monitorRef.current) return;
    const t = state.clock.elapsedTime;
    monitorRef.current.rotation.y = Math.sin(t * 0.3) * 0.03;
    const breath = 1 + Math.sin(t * 0.6) * 0.005;
    monitorRef.current.scale.set(breath, breath, breath);
  });

  return (
    <group ref={monitorRef} position={[0, 0.15, 0]}>
      {/* Screen bezel (outer frame) */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow material={bezelMaterial}>
        <boxGeometry args={[2.8, 1.75, 0.08]} />
      </mesh>

      {/* Screen glass */}
      <mesh position={[0, 1.1, 0.041]} material={screenMaterial}>
        <boxGeometry args={[2.55, 1.5, 0.01]} />
      </mesh>

      {/* Screen glow */}
      <mesh position={[0, 1.1, 0.05]}>
        <planeGeometry args={[2.5, 1.45]} />
        <meshBasicMaterial color="#1a1a3e" transparent opacity={0.08} />
      </mesh>

      {/* Screen content — code snippet */}
      <Html
        position={[0, 1.1, 0.06]}
        transform
        distanceFactor={3.2}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            width: 280,
            height: 165,
            background: "linear-gradient(180deg, #0d0d1a 0%, #0a0a15 100%)",
            borderRadius: 4,
            padding: "12px 16px",
            overflow: "hidden",
            fontFamily: "monospace",
            fontSize: "7px",
            lineHeight: "12px",
            color: "#3a3a5c",
          }}
        >
          <div style={{ color: "#5865F2", marginBottom: 4 }}>{"// tech_stack.config"}</div>
          <div>
            <span style={{ color: "#c792ea" }}>const</span>{" "}
            <span style={{ color: "#82aaff" }}>skills</span>{" "}
            <span style={{ color: "#89ddff" }}>=</span> {"{"}
          </div>
          <div style={{ paddingLeft: 12 }}>
            <span style={{ color: "#f78c6c" }}>frontend</span>:{" "}
            <span style={{ color: "#c3e88d" }}>&apos;React, Next.js&apos;</span>,
          </div>
          <div style={{ paddingLeft: 12 }}>
            <span style={{ color: "#f78c6c" }}>backend</span>:{" "}
            <span style={{ color: "#c3e88d" }}>&apos;Node, Express&apos;</span>,
          </div>
          <div style={{ paddingLeft: 12 }}>
            <span style={{ color: "#f78c6c" }}>database</span>:{" "}
            <span style={{ color: "#c3e88d" }}>&apos;MongoDB&apos;</span>,
          </div>
          <div style={{ paddingLeft: 12 }}>
            <span style={{ color: "#f78c6c" }}>animation</span>:{" "}
            <span style={{ color: "#c3e88d" }}>&apos;GSAP, Three.js&apos;</span>,
          </div>
          <div>{"}"}</div>
          <div style={{ marginTop: 4 }}>
            <span style={{ color: "#c792ea" }}>export</span>{" "}
            <span style={{ color: "#c792ea" }}>default</span>{" "}
            <span style={{ color: "#82aaff" }}>skills</span>;
          </div>
          <span
            style={{
              display: "inline-block",
              width: 4,
              height: 8,
              background: "#5865F2",
              animation: "blink 1s infinite",
              marginLeft: 2,
            }}
          />
        </div>
      </Html>

      {/* Chin */}
      <mesh position={[0, 0.18, 0]} material={bezelMaterial}>
        <boxGeometry args={[0.3, 0.04, 0.08]} />
      </mesh>

      {/* Stand neck */}
      <mesh position={[0, -0.05, 0]} castShadow material={bodyMaterial}>
        <cylinderGeometry args={[0.08, 0.1, 0.5, 16]} />
      </mesh>

      {/* Stand arm */}
      <mesh position={[0, -0.15, -0.05]} castShadow material={bodyMaterial}>
        <boxGeometry args={[0.12, 0.55, 0.12]} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -0.42, 0.05]} receiveShadow castShadow material={bodyMaterial}>
        <boxGeometry args={[1.0, 0.04, 0.6]} />
      </mesh>

      {/* Base front lip */}
      <mesh position={[0, -0.39, 0.35]} material={bezelMaterial}>
        <boxGeometry args={[0.8, 0.02, 0.02]} />
      </mesh>
    </group>
  );
}

// ─── Orbiting Logos (HTML overlays, NOT inside rotating group) ──────
function OrbitingLogos({ radius }) {
  const [hovered, setHovered] = useState(null);
  const rotationRef = useRef(0);

  // Each logo is positioned via world-space math, no 3D group rotation
  // This prevents mirroring since HTML is never inside a rotated group
  const positionsRef = useRef(
    skills.map((_, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      return { x: radius * Math.cos(angle), z: radius * Math.sin(angle), y: 0 };
    })
  );

  useFrame((state) => {
    rotationRef.current += 0.003;
    const t = state.clock.elapsedTime;

    skills.forEach((_, i) => {
      const baseAngle = (i / skills.length) * Math.PI * 2;
      const angle = baseAngle + rotationRef.current;
      const floatY = Math.sin(t * (0.8 + i * 0.05) + i * 0.6) * 0.12;
      positionsRef.current[i] = {
        x: radius * Math.cos(angle),
        z: radius * Math.sin(angle),
        y: floatY,
      };
    });
  });

  return (
    <>
      {skills.map((skill, i) => (
        <LogoOverlay
          key={skill.name}
          skill={skill}
          index={i}
          positionsRef={positionsRef}
          hovered={hovered}
          onHover={setHovered}
        />
      ))}
    </>
  );
}

function LogoOverlay({ skill, index, positionsRef, hovered, onHover }) {
  const meshRef = useRef(null);
  const isHovered = hovered === index;

  useFrame(() => {
    if (meshRef.current && positionsRef.current[index]) {
      const pos = positionsRef.current[index];
      meshRef.current.position.set(pos.x, pos.y, pos.z);
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* Invisible sphere just to position the Html overlay */}
      <sphereGeometry args={[0.01, 4, 4]} />
      <meshBasicMaterial visible={false} />
      <Html center distanceFactor={8} style={{ pointerEvents: "auto" }}>
        <div
          onMouseEnter={() => onHover(index)}
          onMouseLeave={() => onHover(null)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            cursor: "default",
            transform: isHovered ? "scale(1.25)" : "scale(1)",
            transition: "transform 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
            filter: isHovered ? `drop-shadow(0 0 12px ${skill.color}80)` : "none",
          }}
        >
          {/* Logo container */}
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "16px",
              background: `rgba(${hexToRgb(skill.color)}, 0.08)`,
              border: `1.5px solid ${isHovered ? skill.color : `${skill.color}30`}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              backdropFilter: "blur(8px)",
              boxShadow: isHovered
                ? `0 0 24px ${skill.color}30, 0 0 48px ${skill.color}15, inset 0 0 12px ${skill.color}08`
                : `0 4px 16px rgba(0,0,0,0.3)`,
              transition: "all 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            <img
              src={skill.logo}
              alt={skill.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: isHovered ? "brightness(1.2)" : "brightness(0.9)",
                transition: "filter 0.3s ease",
              }}
              draggable={false}
            />
          </div>
          {/* Label */}
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: isHovered ? skill.color : "#c2c6d5",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontFamily: "var(--font-label), sans-serif",
              whiteSpace: "nowrap",
              transition: "color 0.3s ease",
              textShadow: isHovered ? `0 0 8px ${skill.color}40` : "none",
            }}
          >
            {skill.name}
          </span>
        </div>
      </Html>
    </mesh>
  );
}

// ─── Orbital Ring ──────────────────────────────────────────────────
function OrbitalRing({ radius }) {
  return (
    <>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.05, radius + 0.05, 128]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.15, radius + 0.15, 128]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.02} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}

// ─── Scene ─────────────────────────────────────────────────────────
function Scene() {
  const orbitRadius = 3.2;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3, 6, 4]}
        intensity={0.7}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-near={0.1}
      />
      <pointLight position={[-4, 2, -3]} intensity={0.3} color="#6366f1" />
      <pointLight position={[4, -1, 3]} intensity={0.2} color="#818cf8" />
      <spotLight
        position={[0, 8, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.3}
        color="#c7d2fe"
      />

      {/* 3D Monitor */}
      <Monitor />

      {/* Ground shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.45, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <shadowMaterial opacity={0.15} />
      </mesh>

      {/* Orbital ring */}
      <OrbitalRing radius={orbitRadius} />

      {/* Orbiting logos — positioned individually, NOT inside a rotating group */}
      <OrbitingLogos radius={orbitRadius} />
    </>
  );
}

// ─── Main Export ────────────────────────────────────────────────────
export default function SkillsOrbit() {
  const [isMobile, setIsMobile] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile fallback
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
    return () => {
      if (ctx) ctx.revert();
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div ref={gridRef} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="skill-badge flex items-center gap-3 px-4 py-3 rounded-xl border border-outline-variant/20 bg-surface-container-high/40"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center p-1.5"
              style={{
                background: `rgba(${hexToRgb(skill.color)}, 0.15)`,
              }}
            >
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-full h-full object-contain"
                draggable={false}
              />
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
        shadows
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "255, 255, 255";
}
