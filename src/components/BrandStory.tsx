"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fashionImages } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    gsap.fromTo(left.querySelectorAll(".reveal-text"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: left, start: "top 70%", once: true } });

    const rightEl = right.querySelector(".right-image");
    if (rightEl) {
      gsap.fromTo(rightEl, { clipPath: "inset(15% 15% 15% 15%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power3.inOut", scrollTrigger: { trigger: right, start: "top 70%", once: true } });
    }

    gsap.fromTo(right.querySelectorAll(".detail-item"), { x: 30, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: right, start: "top 50%", once: true } });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-obsidian" id="the-house">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div ref={leftRef}>
          <span className="reveal-text text-antique-gold/60 text-[10px] tracking-[0.5em] uppercase block mb-8" style={{ fontFamily: '"Inter", sans-serif' }}>The House</span>
          <h2 className="reveal-text text-ivory text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[0.9] mb-8" style={{ fontFamily: '"Bodoni Moda", serif' }}>
            A Legacy<br />of <span className="text-antique-gold italic">Defiance</span>
          </h2>
          <div className="reveal-text w-12 h-px bg-gradient-to-r from-antique-gold/50 to-transparent mb-8" />
          <p className="reveal-text text-ivory/55 text-sm md:text-base leading-relaxed max-w-lg mb-6" style={{ fontFamily: '"Inter", sans-serif' }}>
            Rapture was born from an uncompromising belief that fashion should provoke, not merely please. Founded in the quiet ateliers of Milan, the house has spent decades refining a visual language that speaks in whispers yet commands attention.
          </p>
          <p className="reveal-text text-ivory/55 text-sm md:text-base leading-relaxed max-w-lg" style={{ fontFamily: '"Inter", sans-serif' }}>
            Every silhouette is a conversation between heritage and rebellion, between the discipline of couture and the freedom of contemporary expression. We do not follow seasons — we set them.
          </p>
          <div className="reveal-text flex items-center gap-8 mt-12">
            {[{ num: "47", label: "Artisans" }, { num: "12", label: "Collections" }, { num: "3", label: "Ateliers" }].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-12 bg-ivory/10" />}
                <div>
                  <span className="text-antique-gold text-3xl md:text-4xl block mb-1" style={{ fontFamily: '"Bodoni Moda", serif' }}>{stat.num}</span>
                  <span className="text-ivory/35 text-[10px] tracking-[0.2em] uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div ref={rightRef} className="relative">
          <div className="right-image relative aspect-[3/4] overflow-hidden" style={{ clipPath: "inset(15% 15% 15% 15%)" }}>
            <Image
              src={fashionImages.brand.src}
              alt={fashionImages.brand.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-obsidian/30" />
          </div>
          <div className="mt-8 space-y-4">
            {["Milano, IT", "Since MMXXI", "Haute Couture & Ready-to-Wear"].map((detail) => (
              <div key={detail} className="detail-item flex items-center gap-4">
                <div className="w-10 h-px bg-gradient-to-r from-antique-gold/40 to-transparent" />
                <span className="text-ivory/35 text-xs tracking-[0.15em]" style={{ fontFamily: '"Inter", sans-serif' }}>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
