"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function GlowingSphere() {
    const meshRef = useRef();
    const materialRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={2.5}>
                <icosahedronGeometry args={[1, 8]} />
                <MeshDistortMaterial
                    ref={materialRef}
                    color="#508ff8"
                    roughness={0.2}
                    metalness={0.8}
                    distort={0.3}
                    speed={2}
                    transparent
                    opacity={0.7}
                />
            </mesh>
        </Float>
    );
}

function OrbitalRing({ radius, color, rotationSpeed, tilt }) {
    const ringRef = useRef();
    const points = useMemo(() => {
        const pts = [];
        for (let i = 0; i <= 64; i++) {
            const angle = (i / 64) * Math.PI * 2;
            pts.push(
                new THREE.Vector3(
                    Math.cos(angle) * radius,
                    0,
                    Math.sin(angle) * radius
                )
            );
        }
        return pts;
    }, [radius]);

    const lineGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return geometry;
    }, [points]);

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
        }
    });

    return (
        <group ref={ringRef} rotation={tilt}>
            <line geometry={lineGeometry}>
                <lineBasicMaterial color={color} transparent opacity={0.15} />
            </line>
        </group>
    );
}

function Particles() {
    const particlesRef = useRef();
    const count = 50;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color="#acc7ff"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

export default function HeroOrb() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#acc7ff" />
                <pointLight position={[-5, -5, 5]} intensity={0.5} color="#d2bbff" />
                <GlowingSphere />
                <OrbitalRing
                    radius={3.5}
                    color="#acc7ff"
                    rotationSpeed={0.1}
                    tilt={[0.8, 0, 0]}
                />
                <OrbitalRing
                    radius={4}
                    color="#d2bbff"
                    rotationSpeed={-0.05}
                    tilt={[-0.3, 0.5, 0]}
                />
                <Particles />
                <Environment preset="night" />
            </Canvas>
        </div>
    );
}
