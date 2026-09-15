"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { fashionImages } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

export default function JournalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    gsap.fromTo(titleRef.current.children, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true } });

    const cards = sectionRef.current.querySelectorAll(".journal-card");
    gsap.fromTo(cards, { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 50%", once: true } });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-10 lg:px-16 bg-obsidian" id="journal">
      <div ref={titleRef} className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-antique-gold/60 text-[10px] tracking-[0.5em] uppercase block mb-6" style={{ fontFamily: '"Inter", sans-serif' }}>Journal</span>
          <h2 className="text-ivory text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] leading-[0.9]" style={{ fontFamily: '"Bodoni Moda", serif' }}>
            Stories & <span className="text-antique-gold italic">Campaigns</span>
          </h2>
        </div>
        <a href="#" className="mt-6 md:mt-0 text-antique-gold text-[11px] tracking-[0.2em] uppercase border border-antique-gold/30 px-6 py-3 hover:bg-antique-gold hover:text-obsidian transition-all duration-500 inline-flex items-center gap-3 self-start" style={{ fontFamily: '"Inter", sans-serif' }} data-cursor="hover">
          <span>View All</span>
          <span className="w-3 h-px bg-antique-gold" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {fashionImages.journal.map((story, i) => (
          <article key={i} className={`journal-card group relative overflow-hidden cursor-pointer ${story.wide ? "md:col-span-2 aspect-[16/9] md:aspect-[21/9]" : "aspect-[4/3]"}`} data-cursor="image">
            <Image
              src={story.src}
              alt={story.alt}
              fill
              className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
              sizes={story.wide ? "(max-width: 768px) 100vw, 100vw" : "(max-width: 768px) 100vw, 50vw"}
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-antique-gold text-[10px] tracking-[0.3em] uppercase block mb-3" style={{ fontFamily: '"Inter", sans-serif' }}>{story.category}</span>
                <h3 className="text-ivory text-xl md:text-2xl lg:text-3xl leading-[1.1] mb-3 max-w-xl" style={{ fontFamily: '"Bodoni Moda", serif' }}>{story.title}</h3>
                <div className="flex items-center gap-4">
                  <span className="text-ivory/35 text-xs tracking-[0.1em]" style={{ fontFamily: '"Inter", sans-serif' }}>{story.date}</span>
                  <div className="w-8 h-px bg-antique-gold/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <span className="text-antique-gold text-[10px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" style={{ fontFamily: '"Inter", sans-serif' }}>Read</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
