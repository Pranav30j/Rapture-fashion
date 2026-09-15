"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fashionImages } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function BloodRedStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const text = textRef.current;
    if (!section || !headline || !text) return;

    gsap.fromTo(headline.querySelectorAll(".word"), { y: 50, opacity: 0, rotateX: -25 }, { y: 0, opacity: 1, rotateX: 0, stagger: 0.07, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 60%", once: true } });
    gsap.fromTo(text.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: text, start: "top 80%", once: true } });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dramatic fashion image background */}
      <div className="absolute inset-0">
        <Image
          src={fashionImages.bloodRed.src}
          alt={fashionImages.bloodRed.alt}
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        {/* Blood red overlay + dark gradient for text */}
        <div className="absolute inset-0 bg-blood-red/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-blood-red/90 via-blood-red/40 to-blood-red/70" />
        <div className="absolute inset-0 bg-obsidian/15" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div ref={headlineRef} className="mb-12" style={{ perspective: "600px" }}>
          <h2 className="text-ivory text-4xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-[-0.02em]" style={{ fontFamily: '"Bodoni Moda", serif' }}>
            {"EVERY PIECE SHOULD BE REMEMBERED.".split(" ").map((word, i) => (
              <span key={i} className="word inline-block mr-[0.3em]" style={{ opacity: 0, transform: "translateY(50px) rotateX(-25deg)" }}>
                {word}
              </span>
            ))}
          </h2>
        </div>

        <div ref={textRef} className="flex flex-col items-center gap-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-antique-gold/50 to-transparent" />
          <p className="text-ivory/70 text-xs md:text-sm tracking-[0.25em] uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>The Philosophy of Rapture</p>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-antique-gold/30" />
            <div className="w-2 h-2 rounded-full bg-antique-gold/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-antique-gold/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
