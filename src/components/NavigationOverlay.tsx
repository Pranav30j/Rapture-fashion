"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { fashionImages } from "@/lib/images";

const navLinks = [
  { label: "COLLECTIONS", href: "#collections" },
  { label: "THE HOUSE", href: "#the-house" },
  { label: "CAMPAIGNS", href: "#campaigns" },
  { label: "JOURNAL", href: "#journal" },
  { label: "CONTACT", href: "#contact" },
  { label: "SHOP", href: "#shop" },
];

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();
      tl.fromTo(overlayRef.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "power4.inOut" });
      tl.fromTo(linksRef.current, { y: 80, opacity: 0, rotateX: -15 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, "-=0.3");
      tl.fromTo(imageRef.current, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, "-=0.5");
    } else {
      document.body.style.overflow = "";
      const tl = gsap.timeline();
      tl.to(linksRef.current, { y: -40, opacity: 0, duration: 0.3, stagger: 0.03, ease: "power3.in" });
      tl.to(overlayRef.current, { clipPath: "inset(0 0 100% 0)", duration: 0.6, ease: "power4.inOut" }, "-=0.1");
    }
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[105] bg-obsidian flex" style={{ clipPath: "inset(0 0 100% 0)" }}>
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <nav className="flex flex-col gap-2 md:gap-3">
          {navLinks.map((link, i) => (
            <a
              key={link.label}
              ref={(el) => { linksRef.current[i] = el; }}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
              className="text-ivory text-3xl md:text-5xl lg:text-6xl tracking-[0.05em] hover:text-antique-gold transition-colors duration-500 origin-bottom-left"
              style={{ fontFamily: '"Bodoni Moda", serif', opacity: 0, transform: "translateY(80px)" }}
              data-cursor="hover"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-12 flex items-center gap-8">
          <div className="w-px h-10 bg-gradient-to-b from-antique-gold/40 to-transparent" />
          <p className="text-ivory/30 text-xs tracking-[0.15em]" style={{ fontFamily: '"Inter", sans-serif' }}>RAPTURE FASHION HOUSE</p>
        </div>
      </div>

      <div ref={imageRef} className="hidden lg:block w-2/5 relative overflow-hidden opacity-0">
        <Image
          src={fashionImages.navCampaign.src}
          alt={fashionImages.navCampaign.alt}
          fill
          className="object-cover object-center"
          sizes="40vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/80 via-obsidian/20 to-obsidian/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-antique-gold/10 text-[200px] font-display leading-none" style={{ fontFamily: '"Bodoni Moda", serif' }}>R</span>
        </div>
      </div>
    </div>
  );
}
