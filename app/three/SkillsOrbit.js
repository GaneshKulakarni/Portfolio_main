"use client";

import { useRef, useMemo, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { canAnimate } from "../utils/animation";

// ─── Tech stack data with logo paths ───────────────────────────────
const skills = [
  { name: "React", logo: "/logos/react.svg", color: "#61DAFB" },
  { name: "Next.js", logo: "/logos/nextjs.svg", color: "#FFFFFF" },
  { name: "Node.js", logo: "/logos/nodejs.svg", color: "#68A063" },
  { name: "MongoDB", logo: "/logos/mongodb.svg", color: "#4DB33D" },
  { name: "Express", logo: "/logos/express.svg", color: "#828282" },
  { name: "Tailwind", logo: "/logos/tailwind.svg", color: "#38BDF8" },
  { name: "Git", logo: "/logos/git.svg", color: "#F1502F" },
  { name: "JavaScript", logo: "/logos/javascript.svg", color: "#F7DF1E" },
];

// ─── Terminal Boot Lines ───────────────────────────────────────────
const bootLines = [
  "ROM BIOS (C) 1989 AMI CORP.",
  "640KB SYSTEM RAM PASSED",
  "VIDEO ADAPTER: VGA MONOCHROME PHOSPHOR",
  "INITIALIZING DISK CONTROLLER... OK",
  "",
  "MS-DOS Version 5.00",
  "C:\\> SET TERM=VT100",
  "C:\\> RUN DIAGNOSTICS.EXE",
  "----------------------------------------",
  "CPU CLOCK      : 33.0 MHz (TURBO ON)",
  "CRT REFRESH    : 60.0 Hz H-SYNC OK",
  "MEMORY STATUS  : 655,360 BYTES FREE",
  "----------------------------------------",
  "SYSTEM READY.",
  "C:\\> ",
];

// Scratchpad vectors for zero-allocation dynamic 3D occlusion projection
const _vBadge = new THREE.Vector3();
const _vMon = new THREE.Vector3();
const _vEdge = new THREE.Vector3();
const _vTop = new THREE.Vector3();
const _vDepth = new THREE.Vector3();

// ─── Retro White CRT Monitor Component ─────────────────────────────
function RetroMonitor({ scale = 0.65 }) {
  const groupRef = useRef(null);

  // 1. Offscreen CRT Canvas & CanvasTexture
  const { canvas, ctx, crtTexture } = useMemo(() => {
    if (typeof document === "undefined") {
      return { canvas: null, ctx: null, crtTexture: null };
    }
    const c = document.createElement("canvas");
    c.width = 640;
    c.height = 480;
    const context = c.getContext("2d");

    const texture = new THREE.CanvasTexture(c);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    return { canvas: c, ctx: context, crtTexture: texture };
  }, []);

  // 2. Terminal Typing state
  const stateRef = useRef({
    currentLine: 0,
    currentChar: 0,
    lastTypeTime: 0,
  });

  const updateTerminal = useCallback(
    (time) => {
      if (!ctx || !canvas || !crtTexture) return;
      const s = stateRef.current;

      // Typewriter typing progression
      if (time - s.lastTypeTime > 35) {
        if (s.currentLine < bootLines.length - 1) {
          s.currentChar++;
          if (s.currentChar > bootLines[s.currentLine].length) {
            s.currentLine++;
            s.currentChar = 0;
          }
          s.lastTypeTime = time;
        } else {
          // Restart typing loop after 8 seconds of idle cursor
          if (time - s.lastTypeTime > 8000) {
            s.currentLine = 0;
            s.currentChar = 0;
            s.lastTypeTime = time;
          }
        }
      }

      // Background phosphor dark
      ctx.fillStyle = "#051208";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Radial phosphor CRT glow
      const radialGrad = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        80,
        canvas.width / 2,
        canvas.height / 2,
        380
      );
      radialGrad.addColorStop(0, "rgba(30, 110, 50, 0.12)");
      radialGrad.addColorStop(1, "rgba(0, 0, 0, 0.65)");
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green terminal text with glow
      ctx.font = 'bold 20px "Courier New", Courier, monospace';
      ctx.fillStyle = "#33ff66";
      ctx.shadowColor = "#22ff55";
      ctx.shadowBlur = 8;

      const startX = 42;
      const startY = 52;
      const lineHeight = 26;

      for (let i = 0; i <= s.currentLine; i++) {
        const text =
          i === s.currentLine && s.currentLine < bootLines.length - 1
            ? bootLines[i].slice(0, s.currentChar)
            : bootLines[i];
        ctx.fillText(text, startX, startY + i * lineHeight);
      }

      // Blinking cursor
      if (Math.floor(time / 450) % 2 === 0) {
        const activeText =
          s.currentLine < bootLines.length - 1
            ? bootLines[s.currentLine].slice(0, s.currentChar)
            : bootLines[s.currentLine];
        const cursorX = startX + ctx.measureText(activeText).width + 2;
        const cursorY = startY + s.currentLine * lineHeight - 17;
        ctx.fillRect(cursorX, cursorY, 12, 20);
      }

      ctx.shadowBlur = 0;

      // Scanline refresh sweep bar
      const barY = ((time * 0.12) % (canvas.height + 120)) - 60;
      const barGrad = ctx.createLinearGradient(0, barY, 0, barY + 60);
      barGrad.addColorStop(0, "rgba(51, 255, 102, 0)");
      barGrad.addColorStop(0.5, "rgba(51, 255, 102, 0.08)");
      barGrad.addColorStop(1, "rgba(51, 255, 102, 0)");
      ctx.fillStyle = barGrad;
      ctx.fillRect(0, barY, canvas.width, 60);

      // CRT horizontal raster scanlines
      ctx.fillStyle = "rgba(0, 0, 0, 0.38)";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 2);
      }

      crtTexture.needsUpdate = true;
    },
    [canvas, ctx, crtTexture]
  );

  // 3. Materials
  const materials = useMemo(() => {
    const whitePlastic = new THREE.MeshStandardMaterial({
      color: 0xf0ece5,
      roughness: 0.45,
      metalness: 0.05,
    });

    const darkBezelInset = new THREE.MeshStandardMaterial({
      color: 0xd4d0c8,
      roughness: 0.55,
      metalness: 0.1,
    });

    const darkGlassEdge = new THREE.MeshStandardMaterial({
      color: 0x0a140d,
      roughness: 0.3,
    });

    const crtFrontGlass = crtTexture
      ? new THREE.MeshPhysicalMaterial({
          map: crtTexture,
          emissive: 0xffffff,
          emissiveMap: crtTexture,
          emissiveIntensity: 0.85,
          roughness: 0.15,
          metalness: 0.05,
          clearcoat: 1.0,
          clearcoatRoughness: 0.08,
        })
      : new THREE.MeshStandardMaterial({ color: 0x051208 });

    const darkGray = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      roughness: 0.7,
    });

    const ledGreen = new THREE.MeshBasicMaterial({ color: 0x33ff55 });

    return {
      whitePlastic,
      darkBezelInset,
      darkGlassEdge,
      crtFrontGlass,
      darkGray,
      ledGreen,
    };
  }, [crtTexture]);

  // 4. Geometries
  const geometries = useMemo(() => {
    // Bulged CRT Screen Geometry
    const screenGeo = new THREE.BoxGeometry(1.92, 1.42, 0.08, 16, 16, 2);
    const posAttr = screenGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const z = posAttr.getZ(i);
      if (z > 0) {
        const bulge = Math.cos(x * 0.65) * Math.cos(y * 0.85) * 0.09;
        posAttr.setZ(i, z + bulge);
      }
    }
    screenGeo.computeVertexNormals();

    // Rear cone housing
    const rearHousingGeo = new THREE.CylinderGeometry(0.85, 1.45, 1.25, 4);
    rearHousingGeo.rotateY(Math.PI / 4);
    rearHousingGeo.rotateX(Math.PI / 2);

    // Front dial geometry
    const dialGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.06, 16);
    dialGeo.rotateX(Math.PI / 2);

    return { screenGeo, rearHousingGeo, dialGeo };
  }, []);

  const screenMaterials = useMemo(
    () => [
      materials.darkGlassEdge,
      materials.darkGlassEdge,
      materials.darkGlassEdge,
      materials.darkGlassEdge,
      materials.crtFrontGlass,
      materials.darkGlassEdge,
    ],
    [materials]
  );

  // 5. Cleanup
  useEffect(() => {
    return () => {
      Object.values(materials).forEach((m) => m?.dispose());
      Object.values(geometries).forEach((g) => g?.dispose());
      crtTexture?.dispose();
    };
  }, [materials, geometries, crtTexture]);

  // 6. Frame animation
  useFrame((state) => {
    const time = state.clock.elapsedTime * 1000;
    updateTerminal(time);

    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      // Gentle floating animation centered upward at Y = 0.05
      groupRef.current.position.y = 0.05 + Math.sin(t * 0.8) * 0.015;
    }
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, 0.05, 0]}>
      {/* Base */}
      <mesh
        position={[0, 0.06, 0]}
        material={materials.whitePlastic}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1.8, 0.12, 1.6]} />
      </mesh>

      {/* Swivel neck */}
      <mesh
        position={[0, 0.28, -0.05]}
        material={materials.darkBezelInset}
        castShadow
      >
        <cylinderGeometry args={[0.45, 0.55, 0.35, 32]} />
      </mesh>

      {/* Main cabinet */}
      <mesh
        position={[0, 1.35, 0.25]}
        material={materials.whitePlastic}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[2.4, 2.0, 1.1]} />
      </mesh>

      {/* Bezel frame inset */}
      <mesh position={[0, 1.42, 0.78]} material={materials.darkBezelInset}>
        <boxGeometry args={[2.05, 1.55, 0.1]} />
      </mesh>

      {/* Bulged screen */}
      <mesh
        position={[0, 1.42, 0.81]}
        geometry={geometries.screenGeo}
        material={screenMaterials}
      />

      {/* Green phosphor screen glow point light */}
      <pointLight
        position={[0, 1.42, 1.15]}
        color="#33ff66"
        intensity={0.45}
        distance={3.5}
      />

      {/* Rear housing */}
      <mesh
        position={[0, 1.35, -0.85]}
        scale={[1.15, 0.92, 1.0]}
        geometry={geometries.rearHousingGeo}
        material={materials.whitePlastic}
        castShadow
      />

      {/* Rear cap */}
      <mesh
        position={[0, 1.35, -1.5]}
        material={materials.whitePlastic}
        castShadow
      >
        <boxGeometry args={[1.05, 0.85, 0.35]} />
      </mesh>

      {/* Heat cooling vents */}
      {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[i * 0.25, 1.98 - Math.abs(i) * 0.01, -0.75]}
          rotation={[-0.26, 0, 0]}
          material={materials.darkGray}
        >
          <boxGeometry args={[0.18, 0.02, 0.55]} />
        </mesh>
      ))}

      {/* Power push button */}
      <mesh position={[0.85, 0.5, 0.8]} material={materials.darkBezelInset}>
        <boxGeometry args={[0.16, 0.1, 0.08]} />
      </mesh>

      {/* Green power LED */}
      <mesh position={[0.68, 0.5, 0.81]} material={materials.ledGreen}>
        <sphereGeometry args={[0.025, 16, 16]} />
      </mesh>

      {/* Front dials */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[0.2 + i * 0.12, 0.5, 0.8]}
          geometry={geometries.dialGeo}
          material={materials.darkGray}
        />
      ))}

      {/* Ground shadow disc */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.0, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

// ─── Orbiting Logos (HTML overlays with Precise Screen-Space Occlusion) ───
function OrbitingLogos({ radius }) {
  const [hovered, setHovered] = useState(null);
  const rotationRef = useRef(0);

  // Each logo is positioned via world-space math (raised upward to Y = 0.5)
  const positionsRef = useRef(
    skills.map((_, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      return { x: radius * Math.cos(angle), z: radius * Math.sin(angle), y: 0.5 };
    })
  );

  useFrame((state) => {
    rotationRef.current += 0.003;
    const t = state.clock.elapsedTime;

    skills.forEach((_, i) => {
      const baseAngle = (i / skills.length) * Math.PI * 2;
      const angle = baseAngle + rotationRef.current;
      const floatY = Math.sin(t * (0.8 + i * 0.05) + i * 0.6) * 0.08;
      positionsRef.current[i] = {
        x: radius * Math.cos(angle),
        z: radius * Math.sin(angle),
        y: 0.5 + floatY,
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
  const containerRef = useRef(null);
  const isHovered = hovered === index;

  useFrame((state) => {
    if (meshRef.current && positionsRef.current[index]) {
      const pos = positionsRef.current[index];
      meshRef.current.position.set(pos.x, pos.y, pos.z);

      if (containerRef.current) {
        // Dynamic projected screen-space occlusion:
        // Monitor cabinet center in world space is (0, 0.93, 0.16)
        const monNDC = _vMon.set(0, 0.93, 0.16).project(state.camera);
        const badgeNDC = _vBadge.set(pos.x, pos.y, pos.z).project(state.camera);

        // Project cabinet boundary points (width, height, and depth) into camera NDC:
        // Cabinet half-width (0.78) + badge & label margin (0.52) = 1.30
        const edgeNDC = _vEdge.set(1.30, 0.93, 0.16).project(state.camera);
        // Cabinet half-height (0.65) + badge margin (0.50) = 1.15
        const topNDC = _vTop.set(0, 0.93 + 1.15, 0.16).project(state.camera);
        // Depth boundary when rotated
        const depthNDC = _vDepth.set(0, 0.93, 0.16 - 1.25).project(state.camera);

        // Dynamic projected half-width and half-height on screen with safety margin
        const halfWidthNDC = Math.max(Math.abs(edgeNDC.x - monNDC.x), Math.abs(depthNDC.x - monNDC.x)) + 0.04;
        const halfHeightNDC = Math.abs(topNDC.y - monNDC.y) + 0.04;

        const dx = Math.abs(badgeNDC.x - monNDC.x);
        const dy = Math.abs(badgeNDC.y - monNDC.y);

        // In 3D: badge is behind monitor if depth is greater than monitor depth,
        // and its screen position falls within the monitor's silhouette and shoulders from any angle
        const isBehind = badgeNDC.z > monNDC.z && dx < halfWidthNDC && dy < halfHeightNDC;

        const targetOpacity = isBehind ? "0" : "1";
        const targetVisibility = isBehind ? "hidden" : "visible";
        const targetPointer = isBehind ? "none" : "auto";
        const targetScale = isBehind ? "scale(0.7)" : (isHovered ? "scale(1.2)" : "scale(1)");

        if (containerRef.current.style.opacity !== targetOpacity) {
          containerRef.current.style.opacity = targetOpacity;
          containerRef.current.style.visibility = targetVisibility;
          containerRef.current.style.pointerEvents = targetPointer;
          containerRef.current.style.transform = targetScale;
        } else if (!isBehind && containerRef.current.style.transform !== targetScale) {
          containerRef.current.style.transform = targetScale;
        }
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.01, 4, 4]} />
      <meshBasicMaterial visible={false} />
      <Html center distanceFactor={8.2} style={{ pointerEvents: "auto" }}>
        <div
          ref={containerRef}
          onMouseEnter={() => onHover(index)}
          onMouseLeave={() => onHover(null)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "7px",
            cursor: "pointer",
            opacity: 1,
            visibility: "visible",
            transition: "opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1), transform 0.22s ease",
            filter: isHovered ? `drop-shadow(0 0 14px ${skill.color}90)` : "none",
          }}
        >
          {/* Logo container */}
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: "14px",
              background: `rgba(${hexToRgb(skill.color)}, 0.12)`,
              border: `1.5px solid ${isHovered ? skill.color : `${skill.color}35`}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "9px",
              backdropFilter: "blur(10px)",
              boxShadow: isHovered
                ? `0 0 24px ${skill.color}40, 0 0 48px ${skill.color}20, inset 0 0 12px ${skill.color}10`
                : `0 4px 16px rgba(0,0,0,0.4)`,
              transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            <img
              src={skill.logo}
              alt={skill.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: isHovered ? "brightness(1.2)" : "brightness(0.95)",
                transition: "filter 0.3s ease",
              }}
              draggable={false}
            />
          </div>
          {/* Label — always crisp, fully visible and styled with high-contrast drop shadow */}
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: isHovered ? skill.color : "#e2e8f0",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontFamily: "var(--font-label), sans-serif",
              whiteSpace: "nowrap",
              transition: "color 0.3s ease",
              textShadow: "0 2px 10px rgba(0,0,0,0.95), 0 0 16px rgba(0,0,0,0.9)",
              pointerEvents: "none",
              display: "block",
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
    <group position={[0, 0.5, 0]}>
      {/* Primary ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.025, radius + 0.025, 128]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Outer subtle glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.2, radius + 0.2, 128]} />
        <meshBasicMaterial
          color="#818cf8"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Inner subtle orbit track */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.65, radius - 0.63, 128]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.07}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ─── 3D Scene ───────────────────────────────────────────────────────
function Scene() {
  const orbitRadius = 3.0;

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[5, 8, 6]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-6, 5, -4]}
        intensity={0.6}
        color="#a5b4fc"
      />
      <directionalLight
        position={[0, -3, 5]}
        intensity={0.3}
        color="#38bdf8"
      />
      <pointLight position={[0, 4, 0]} intensity={0.3} color="#60a5fa" />

      {/* Centerpiece: Scaled Retro White CRT Monitor (Raised upward) */}
      <RetroMonitor scale={0.65} />

      {/* Orbital ring (Raised upward) */}
      <OrbitalRing radius={orbitRadius} />

      {/* Orbiting skill logos */}
      <OrbitingLogos radius={orbitRadius} />

      {/* Interactive OrbitControls — constrained polar angle so orbit is never clipped when dragging down */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2 + 0.05}
        rotateSpeed={0.65}
        target={[0, 0.55, 0]}
      />
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

  // Mobile fallback GSAP entrance
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
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 460,
        position: "relative",
        overflow: "visible",
      }}
    >
      <Canvas
        camera={{ position: [0, 2.3, 8.2], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        shadows={{ type: THREE.PCFShadowMap }}
        style={{ background: "transparent", cursor: "grab", overflow: "visible" }}
      >
        <Scene />
      </Canvas>
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
