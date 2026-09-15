"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fashionImages } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function EditorialGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;
    if (!container || !scroll) return;

    const totalWidth = scroll.scrollWidth - window.innerWidth;

    const scrollTween = gsap.to(scroll, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: { trigger: container, start: "top top", end: () => `+=${totalWidth}`, pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true },
    });

    const slides = scroll.querySelectorAll(".editorial-slide");
    slides.forEach((slide) => {
      gsap.fromTo(
        slide.querySelector(".slide-content"),
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, ease: "power3.out", scrollTrigger: { trigger: slide, containerAnimation: scrollTween, start: "left 85%", end: "left 50%", scrub: 1 } }
      );
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-obsidian" id="collections">
      <div className="absolute top-8 left-6 md:left-10 z-10">
        <span className="text-antique-gold/60 text-[10px] tracking-[0.5em] uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>Collections</span>
      </div>

      <div ref={scrollRef} className="flex h-screen items-stretch" style={{ width: `${fashionImages.collections.length * 100}vw` }}>
        {fashionImages.collections.map((slide, i) => (
          <div key={slide.number} className="editorial-slide relative flex-shrink-0 w-screen h-full flex items-end overflow-hidden">
            {/* Full background image */}
            <div className="absolute inset-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover object-center"
                sizes="100vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-obsidian/50" />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-obsidian/30" />
            </div>

            <div className="slide-content relative z-10 w-full p-8 md:p-12 lg:p-16 flex items-end justify-between">
              <div className="max-w-2xl">
                <span className="text-antique-gold text-[10px] tracking-[0.4em] uppercase block mb-4" style={{ fontFamily: '"Inter", sans-serif' }}>
                  Collection {slide.number}
                </span>
                <h3 className="text-ivory text-6xl md:text-8xl lg:text-[7rem] tracking-[-0.03em] mb-3" style={{ fontFamily: '"Bodoni Moda", serif' }}>
                  {slide.title}
                </h3>
                <div className="w-12 h-px bg-antique-gold/40 mb-4" />
                <p className="text-champagne/50 text-xs tracking-[0.2em] uppercase mb-2" style={{ fontFamily: '"Inter", sans-serif' }}>
                  {slide.subtitle}
                </p>
                <p className="text-ivory/35 text-sm italic" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                  {slide.description}
                </p>
              </div>
              <div className="hidden md:block">
                <span className="text-antique-gold/15 text-[140px] md:text-[200px] font-display leading-none" style={{ fontFamily: '"Bodoni Moda", serif' }}>
                  {slide.number}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
