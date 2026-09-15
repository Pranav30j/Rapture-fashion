"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useDeviceType } from "@/hooks/useDeviceType";

function GoldenEmblem() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.15;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.06) * 0.05;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[1.4, 0]} />
        <MeshDistortMaterial
          color="#C8A45D"
          metalness={0.92}
          roughness={0.12}
          distort={0.12}
          speed={1.2}
        />
      </mesh>
      {/* Inner glow mesh */}
      <mesh position={[0, 0, 0]} scale={1.05}>
        <octahedronGeometry args={[1.3, 0]} />
        <meshStandardMaterial
          color="#E6D3A3"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 80;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 3;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#C8A45D" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

function EmeraldRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.2, 0.02, 16, 100]} />
      <meshStandardMaterial color="#0B5D45" metalness={0.8} roughness={0.3} />
    </mesh>
  );
}

export default function ThreeScene() {
  const { isMobile } = useDeviceType();

  return (
    <section className="relative h-screen bg-obsidian overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 1920 1080" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="3d-glow" cx="50%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#062E24" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#080908" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="3d-gold" cx="50%" cy="40%" r="30%">
              <stop offset="0%" stopColor="#C8A45D" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#080908" stopOpacity="0" />
            </radialGradient>
            <filter id="3d-blur"><feGaussianBlur stdDeviation="60" /></filter>
            <filter id="3d-grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
          </defs>
          <rect width="1920" height="1080" fill="#080908" />
          <rect width="1920" height="1080" fill="url(#3d-glow)" />
          <rect width="1920" height="1080" fill="url(#3d-gold)" />
          <ellipse cx="960" cy="480" rx="400" ry="300" fill="#062E24" opacity="0.12" filter="url(#3d-blur)" />
          <rect width="1920" height="1080" filter="url(#3d-grain)" opacity="0.03" />
        </svg>
      </div>

      <div className="absolute top-8 left-6 md:left-10 z-10">
        <span className="text-antique-gold/60 text-[10px] tracking-[0.5em] uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>
          The Emblem
        </span>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <div className="w-full h-[55vh] md:h-[65vh]">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={isMobile ? [1, 1.5] : [1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={0.7} color="#F4F0E7" />
            <pointLight position={[-3, 2, -2]} intensity={0.6} color="#C8A45D" />
            <spotLight position={[0, 5, 0]} intensity={0.5} angle={0.3} penumbra={1} color="#C8A45D" />
            <pointLight position={[2, -3, 1]} intensity={0.3} color="#0B5D45" />
            <GoldenEmblem />
            <EmeraldRing />
            <Particles />
            <Environment preset="studio" />
          </Canvas>
        </div>

        <div className="text-center mt-2">
          <p className="text-antique-gold/50 text-[10px] tracking-[0.4em] uppercase mb-2" style={{ fontFamily: '"Inter", sans-serif' }}>
            The Rapture Sigil
          </p>
          <p className="text-ivory/25 text-xs max-w-xs mx-auto" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
            An emblem of vision, craft, and the pursuit of perfection
          </p>
          <div className="w-10 h-px bg-gradient-to-r from-transparent via-antique-gold/30 to-transparent mx-auto mt-4" />
        </div>
      </div>
    </section>
  );
}
