"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fashionImages } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function SignatureScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline) return;

    gsap.fromTo(headline, { y: 100, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%", end: "center center", scrub: 1.5 } });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-obsidian overflow-hidden">
      {/* Subtle background image */}
      <div className="absolute inset-0">
        <Image
          src={fashionImages.collections[0].src}
          alt="Signature scroll background"
          fill
          className="object-cover object-center opacity-20"
          sizes="100vw"
          quality={60}
        />
        <div className="absolute inset-0 bg-obsidian/70" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div ref={headlineRef} style={{ opacity: 0, transform: "translateY(100px) scale(0.95)" }}>
          <span className="block text-antique-gold/50 text-[10px] md:text-xs tracking-[0.5em] uppercase mb-10" style={{ fontFamily: '"Inter", sans-serif' }}>Established MMXXI</span>
          <h2 className="text-ivory text-4xl md:text-7xl lg:text-[5.5rem] leading-[0.88] tracking-[-0.02em] mb-8" style={{ fontFamily: '"Bodoni Moda", serif' }}>
            Where Craft<br />Meets <span className="text-antique-gold italic">Vision</span>
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-antique-gold/40 to-transparent mx-auto mb-8" />
          <p className="text-ivory/40 text-sm md:text-base max-w-xl mx-auto leading-relaxed tracking-wide" style={{ fontFamily: '"Inter", sans-serif' }}>
            Each collection is an intimate dialogue between heritage craftsmanship and contemporary vision, designed for those who understand that true luxury lies in the details.
          </p>
        </div>
      </div>
    </section>
  );
}
