"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fashionImages } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function CampaignSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    gsap.fromTo(title.querySelectorAll(".camp-reveal"), { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 65%", once: true } });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-obsidian overflow-hidden" id="campaigns">
      {/* Full-width campaign image */}
      <div className="relative w-full h-[50vh] md:h-[70vh] mb-16 md:mb-24 overflow-hidden">
        <Image
          src={fashionImages.campaign.src}
          alt={fashionImages.campaign.alt}
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-obsidian/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/40 via-transparent to-obsidian/40" />

        {/* Center text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-antique-gold/50 text-[10px] tracking-[0.5em] uppercase mb-4" style={{ fontFamily: '"Inter", sans-serif' }}>Campaign</span>
          <h2 className="text-ivory text-5xl md:text-7xl lg:text-8xl tracking-[-0.03em] mb-2" style={{ fontFamily: '"Bodoni Moda", serif' }}>NOCTURNE</h2>
          <div className="w-12 h-px bg-antique-gold/40 mb-4" />
          <span className="text-champagne/50 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>Autumn Winter 2026</span>
        </div>

        {/* Corner marks */}
        <div className="absolute top-6 left-6 md:top-10 md:left-10">
          <div className="w-10 h-px bg-antique-gold/25 mb-1" />
          <div className="w-px h-10 bg-antique-gold/25" />
        </div>
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10">
          <div className="w-10 h-px bg-antique-gold/25 mb-1" />
          <div className="w-px h-10 bg-antique-gold/25" />
        </div>
      </div>

      <div ref={titleRef} className="px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div className="camp-reveal">
            <span className="text-antique-gold/50 text-[10px] tracking-[0.4em] uppercase block mb-4" style={{ fontFamily: '"Inter", sans-serif' }}>Campaign</span>
            <h3 className="text-ivory text-2xl md:text-3xl tracking-[-0.01em] mb-3" style={{ fontFamily: '"Bodoni Moda", serif' }}>Winter Silence</h3>
            <p className="text-ivory/35 text-sm leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
              The Nocturne campaign captures the tension between concealment and revelation, shot in the abandoned palazzos of northern Italy.
            </p>
          </div>
          <div className="camp-reveal">
            <span className="text-antique-gold/50 text-[10px] tracking-[0.4em] uppercase block mb-4" style={{ fontFamily: '"Inter", sans-serif' }}>Creative Direction</span>
            <h3 className="text-ivory text-2xl md:text-3xl tracking-[-0.01em] mb-3" style={{ fontFamily: '"Bodoni Moda", serif' }}>Vision & Craft</h3>
            <p className="text-ivory/35 text-sm leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
              Directed by the house creative team with photographer Marco Visconti, each image is a meditation on form, shadow, and the poetry of fabric in motion.
            </p>
          </div>
          <div className="camp-reveal">
            <span className="text-antique-gold/50 text-[10px] tracking-[0.4em] uppercase block mb-4" style={{ fontFamily: '"Inter", sans-serif' }}>Production</span>
            <h3 className="text-ivory text-2xl md:text-3xl tracking-[-0.01em] mb-3" style={{ fontFamily: '"Bodoni Moda", serif' }}>Detail Obsessed</h3>
            <p className="text-ivory/35 text-sm leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
              Three months of preparation. Fifty rolls of film. Twelve locations. One unifying vision: every frame must feel like a painting you can step into.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
