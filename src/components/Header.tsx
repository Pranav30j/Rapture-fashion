"use client";

import { useState, useCallback } from "react";
import NavigationOverlay from "./NavigationOverlay";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] mix-blend-difference">
        <div className="flex items-center justify-between px-6 md:px-10 py-5 md:py-6">
          <a
            href="/"
            className="text-ivory text-sm tracking-[0.3em] uppercase"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Rapture
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {["Collections", "The House", "Campaigns"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-ivory/70 text-[11px] tracking-[0.2em] uppercase hover:text-antique-gold transition-colors duration-500"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {item}
              </a>
            ))}
          </nav>

          <button
            onClick={toggleMenu}
            className="relative z-[110] flex flex-col items-end gap-[5px] group"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            data-cursor="hover"
          >
            <span
              className={`block h-px bg-ivory transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isMenuOpen ? "w-6 rotate-45 translate-y-[3px]" : "w-6"
              }`}
            />
            <span
              className={`block h-px bg-ivory transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isMenuOpen ? "w-6 -rotate-45 -translate-y-[3px]" : "w-4"
              }`}
            />
          </button>
        </div>
      </header>

      <NavigationOverlay isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
