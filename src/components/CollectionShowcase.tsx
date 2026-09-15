"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fashionImages } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function CollectionShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    gsap.fromTo(titleRef.current.children, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true } });

    const cards = sectionRef.current.querySelectorAll(".piece-card");
    gsap.fromTo(cards, { y: 80, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 50%", once: true } });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-obsidian">
      <div ref={titleRef} className="mb-16 md:mb-24 max-w-3xl">
        <span className="text-antique-gold/60 text-[10px] tracking-[0.5em] uppercase block mb-6" style={{ fontFamily: '"Inter", sans-serif' }}>Selected Pieces</span>
        <h2 className="text-ivory text-4xl md:text-6xl lg:text-7xl tracking-[-0.02em] leading-[0.9] mb-4" style={{ fontFamily: '"Bodoni Moda", serif' }}>The Collection</h2>
        <div className="w-16 h-px bg-gradient-to-r from-antique-gold/40 to-transparent mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {fashionImages.pieces.map((piece, i) => (
          <div key={i} className="piece-card group relative aspect-[3/4] overflow-hidden cursor-pointer bg-obsidian" data-cursor="image">
            <Image
              src={piece.src}
              alt={piece.alt}
              fill
              className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

            <div className="absolute top-4 left-4">
              <span className="text-antique-gold/70 text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: '"Inter", sans-serif' }}>
                {piece.collection}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                <div className="w-10 h-px bg-antique-gold mb-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                <h4 className="text-ivory text-lg md:text-xl mb-1" style={{ fontFamily: '"Bodoni Moda", serif' }}>{piece.name}</h4>
                <p className="text-champagne/50 text-xs tracking-[0.15em]" style={{ fontFamily: '"Inter", sans-serif' }}>{piece.price}</p>
              </div>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <button className="text-antique-gold text-[10px] tracking-[0.2em] uppercase border border-antique-gold/30 px-5 py-2.5 hover:bg-antique-gold hover:text-obsidian transition-all duration-500" style={{ fontFamily: '"Inter", sans-serif' }} data-cursor="hover">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
