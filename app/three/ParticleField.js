"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const meshRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const count = 2000;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  const originalPositions = useMemo(() => new Float32Array(positions), [positions]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const posArr = meshRef.current.geometry.attributes.position.array;
    const time = clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Base wave animation
      const baseX = originalPositions[i3];
      const baseY = originalPositions[i3 + 1];
      const baseZ = originalPositions[i3 + 2];

      const wave = Math.sin(time * 0.3 + i * 0.01) * 0.05;

      // Subtle mouse drift
      const targetX = baseX + mouseRef.current.x * 0.3;
      const targetY = baseY + mouseRef.current.y * 0.3;

      posArr[i3] += (targetX - posArr[i3]) * 0.02;
      posArr[i3 + 1] += (targetY + wave - posArr[i3 + 1]) * 0.02;
      posArr[i3 + 2] = baseZ + wave * 0.5;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * ParticleField — Full-viewport fixed Three.js canvas with 2000 floating particles
 * that drift subtly toward the mouse position.
 */
export default function ParticleField() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Particles />
      </Canvas>
    </div>
  );
}
