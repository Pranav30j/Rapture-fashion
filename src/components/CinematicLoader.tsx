"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CinematicLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete,
        });
      },
    });

    tl.fromTo(
      textRef.current,
      { opacity: 0, letterSpacing: "0.5em" },
      { opacity: 1, letterSpacing: "0.35em", duration: 1.2, ease: "power3.out" }
    )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.0, ease: "power3.inOut" },
        "-=0.3"
      )
      .fromTo(
        subTextRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .to({}, { duration: 0.6 });
  }, [isMounted, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-obsidian"
    >
      <div
        ref={textRef}
        className="text-antique-gold font-display text-lg md:text-xl tracking-[0.35em] opacity-0"
        style={{ fontFamily: '"Bodoni Moda", serif' }}
      >
        RAPTURE
      </div>
      <div
        ref={lineRef}
        className="w-16 h-px bg-antique-gold my-4 origin-center"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        ref={subTextRef}
        className="text-champagne/60 text-[10px] tracking-[0.4em] uppercase opacity-0"
        style={{ fontFamily: '"Inter", sans-serif' }}
      >
        Fashion House
      </div>
    </div>
  );
}
