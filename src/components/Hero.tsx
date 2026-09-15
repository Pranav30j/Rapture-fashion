"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const overlay = overlayRef.current;
    const decor = decorRef.current;
    if (!section || !image || !headline || !subtitle || !cta || !overlay) return;

    const headlineTexts = headline.querySelectorAll(".headline-text");

    const tl = gsap.timeline({ delay: 2.8 });
    tl.fromTo(overlay, { opacity: 1 }, { opacity: 0, duration: 1.8, ease: "power2.inOut" })
      .fromTo(image, { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.5, ease: "power3.out" }, 0)
      .fromTo(headlineTexts, { y: 140, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, stagger: 0.2, ease: "power3.out" }, 0.6)
      .fromTo(subtitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 1.2)
      .fromTo(cta, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 1.4)
      .fromTo(decor, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" }, 1.0);

    gsap.to(image, { yPercent: 20, ease: "none", scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: 1.5 } });
    gsap.to(headline, { y: -120, opacity: 0, ease: "none", scrollTrigger: { trigger: section, start: "20% top", end: "55% top", scrub: 1 } });
    gsap.to(subtitle, { y: -60, opacity: 0, ease: "none", scrollTrigger: { trigger: section, start: "15% top", end: "40% top", scrub: 1 } });
    gsap.to(cta, { y: -40, opacity: 0, ease: "none", scrollTrigger: { trigger: section, start: "15% top", end: "35% top", scrub: 1 } });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden" id="hero">
      {/* Background image composition */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0 }}>
        <svg viewBox="0 0 1920 1080" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="hero-glow-1" cx="35%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#0B5D45" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#080908" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hero-glow-2" cx="75%" cy="60%" r="40%">
              <stop offset="0%" stopColor="#6E0915" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#080908" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hero-glow-3" cx="50%" cy="30%" r="35%">
              <stop offset="0%" stopColor="#C8A45D" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#080908" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#062E24" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#080908" stopOpacity="0" />
              <stop offset="100%" stopColor="#080908" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="hero-fabric" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#062E24" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0B5D45" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#080908" stopOpacity="0.6" />
            </linearGradient>
            <filter id="hero-blur"><feGaussianBlur stdDeviation="60" /></filter>
            <filter id="hero-grain"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
          </defs>

          <rect width="1920" height="1080" fill="#080908" />
          <rect width="1920" height="1080" fill="url(#hero-sky)" />

          {/* Atmospheric glows */}
          <ellipse cx="672" cy="486" rx="500" ry="400" fill="url(#hero-glow-1)" />
          <ellipse cx="1440" cy="648" rx="400" ry="350" fill="url(#hero-glow-2)" />
          <ellipse cx="960" cy="324" rx="450" ry="300" fill="url(#hero-glow-3)" />

          {/* Central fashion silhouette arch */}
          <path d="M760,1080 L760,350 Q760,180 960,180 Q1160,180 1160,350 L1160,1080 Z" fill="url(#hero-fabric)" opacity="0.5" />
          <path d="M760,1080 L760,350 Q760,180 960,180 Q1160,180 1160,350 L1160,1080" fill="none" stroke="#C8A45D" strokeWidth="0.8" opacity="0.2" />

          {/* Inner silhouette detail lines */}
          {Array.from({ length: 30 }).map((_, i) => (
            <line key={`vs-${i}`} x1={780 + i * 13} y1="200" x2={780 + i * 13 + (i % 4) * 5} y2="1080" stroke="#C8A45D" strokeWidth="0.3" opacity={0.04 + (i % 5) * 0.015} />
          ))}

          {/* Horizontal fabric lines */}
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={`hs-${i}`} x1="760" y1={250 + i * 55} x2="1160" y2={250 + i * 55} stroke="#C8A45D" strokeWidth="0.25" opacity={0.06} />
          ))}

          {/* Inner shadow */}
          <rect x="760" y="180" width="400" height="900" fill="#080908" opacity="0.4" />

          {/* Light inside arch */}
          <ellipse cx="960" cy="400" rx="120" ry="180" fill="#C8A45D" opacity="0.06" filter="url(#hero-blur)" />

          {/* Decorative side elements */}
          <line x1="600" y1="0" x2="600" y2="1080" stroke="#C8A45D" strokeWidth="0.3" opacity="0.06" />
          <line x1="1320" y1="0" x2="1320" y2="1080" stroke="#C8A45D" strokeWidth="0.3" opacity="0.06" />

          {/* Geometric accents */}
          <circle cx="600" cy="540" r="80" fill="none" stroke="#C8A45D" strokeWidth="0.4" opacity="0.08" />
          <circle cx="1320" cy="540" r="60" fill="none" stroke="#C8A45D" strokeWidth="0.4" opacity="0.08" />

          {/* Corner marks */}
          <line x1="60" y1="60" x2="120" y2="60" stroke="#C8A45D" strokeWidth="0.6" opacity="0.3" />
          <line x1="60" y1="60" x2="60" y2="120" stroke="#C8A45D" strokeWidth="0.6" opacity="0.3" />
          <line x1="1860" y1="1020" x2="1800" y2="1020" stroke="#C8A45D" strokeWidth="0.6" opacity="0.3" />
          <line x1="1860" y1="1020" x2="1860" y2="960" stroke="#C8A45D" strokeWidth="0.6" opacity="0.3" />

          {/* Grain overlay */}
          <rect width="1920" height="1080" filter="url(#hero-grain)" opacity="0.04" />
        </svg>
      </div>

      {/* Dark overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-obsidian z-10" style={{ opacity: 1 }} />

      {/* Decorative elements */}
      <div ref={decorRef} className="absolute inset-0 z-20 pointer-events-none opacity-0">
        <div className="absolute top-1/4 right-12 w-px h-24 bg-gradient-to-b from-transparent via-antique-gold/20 to-transparent" />
        <div className="absolute bottom-1/3 left-12 w-px h-16 bg-gradient-to-b from-transparent via-antique-gold/15 to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-8 h-px bg-antique-gold/10" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-10 lg:px-16">
        <div ref={headlineRef} className="mb-8 md:mb-12">
          <div className="overflow-hidden">
            <div className="headline-text text-ivory text-[14vw] md:text-[11vw] lg:text-[9vw] leading-[0.82] tracking-[-0.04em] uppercase" style={{ fontFamily: '"Bodoni Moda", serif' }}>
              RAPTURE
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="headline-text text-ivory/80 text-[14vw] md:text-[11vw] lg:text-[9vw] leading-[0.82] tracking-[-0.04em] uppercase" style={{ fontFamily: '"Bodoni Moda", serif' }}>
              FASHION HOUSE
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="w-16 h-px bg-gradient-to-r from-antique-gold to-transparent mb-5" />
            <p ref={subtitleRef} className="text-champagne/70 text-sm md:text-base tracking-[0.3em] uppercase" style={{ fontFamily: '"Inter", sans-serif', opacity: 0, transform: "translateY(30px)" }}>
              The Art of Becoming
            </p>
          </div>
          <a
            ref={ctaRef}
            href="#collections"
            className="inline-flex items-center gap-4 text-antique-gold text-[11px] tracking-[0.25em] uppercase border border-antique-gold/30 px-10 py-5 hover:bg-antique-gold hover:text-obsidian transition-all duration-700 group"
            style={{ fontFamily: '"Inter", sans-serif', opacity: 0, transform: "translateY(20px)" }}
            data-cursor="hover"
          >
            <span>Discover Collection</span>
            <span className="inline-block w-5 h-px bg-antique-gold group-hover:bg-obsidian transition-colors duration-700" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="w-px h-8 bg-gradient-to-b from-antique-gold/0 via-antique-gold/30 to-antique-gold/0" />
        <div className="w-1 h-1 rounded-full bg-antique-gold/40" />
      </div>
    </section>
  );
}
