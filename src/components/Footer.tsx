"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.fromTo(
      footerRef.current.querySelectorAll(".footer-reveal"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-obsidian border-t border-ivory/5"
      id="contact"
    >
      <div className="px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-4">
            <div className="footer-reveal mb-6">
              <span
                className="text-ivory text-xl tracking-[0.3em] uppercase"
                style={{ fontFamily: '"Bodoni Moda", serif' }}
              >
                RAPTURE
              </span>
            </div>
            <p
              className="footer-reveal text-ivory/30 text-xs leading-relaxed max-w-xs mb-8"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              A luxury fashion house dedicated to the art of
              haute couture, timeless elegance, and cinematic beauty.
            </p>

            <div className="footer-reveal">
              <span
                className="text-ivory/40 text-[10px] tracking-[0.3em] uppercase block mb-3"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Newsletter
              </span>
              {subscribed ? (
                <p
                  className="text-antique-gold text-xs tracking-[0.1em]"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                >
                  Thank you for subscribing.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="bg-transparent border-b border-ivory/20 text-ivory text-xs py-2 pr-4 flex-1 focus:outline-none focus:border-antique-gold transition-colors duration-300 placeholder:text-ivory/20"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                    required
                  />
                  <button
                    type="submit"
                    className="text-antique-gold text-[10px] tracking-[0.15em] uppercase ml-4 hover:text-antique-gold/80 transition-colors duration-300"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                    data-cursor="hover"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <span
              className="footer-reveal text-ivory/50 text-[10px] tracking-[0.3em] uppercase block mb-5"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Explore
            </span>
            <nav className="space-y-3">
              {["Collections", "The House", "Campaigns", "Journal", "Shop"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="footer-reveal block text-ivory/30 text-xs hover:text-antique-gold transition-colors duration-300"
                    style={{ fontFamily: '"Inter", sans-serif' }}
                    data-cursor="hover"
                  >
                    {link}
                  </a>
                )
              )}
            </nav>
          </div>

          <div className="md:col-span-2">
            <span
              className="footer-reveal text-ivory/50 text-[10px] tracking-[0.3em] uppercase block mb-5"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Connect
            </span>
            <nav className="space-y-3">
              {["Instagram", "Pinterest", "LinkedIn"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="footer-reveal block text-ivory/30 text-xs hover:text-antique-gold transition-colors duration-300"
                  style={{ fontFamily: '"Inter", sans-serif' }}
                  data-cursor="hover"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div className="md:col-span-2">
            <span
              className="footer-reveal text-ivory/50 text-[10px] tracking-[0.3em] uppercase block mb-5"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              Contact
            </span>
            <div className="space-y-3">
              <p
                className="footer-reveal text-ivory/30 text-xs"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                Via Montenapoleone 22
                <br />
                20121 Milano, Italia
              </p>
              <a
                href="mailto:atelier@rapturefashion.com"
                className="footer-reveal block text-ivory/30 text-xs hover:text-antique-gold transition-colors duration-300"
                style={{ fontFamily: '"Inter", sans-serif' }}
                data-cursor="hover"
              >
                atelier@rapturefashion.com
              </a>
              <a
                href="tel:+390212345678"
                className="footer-reveal block text-ivory/30 text-xs hover:text-antique-gold transition-colors duration-300"
                style={{ fontFamily: '"Inter", sans-serif' }}
                data-cursor="hover"
              >
                +39 02 1234 5678
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-ivory/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span
              className="footer-reveal text-ivory/20 text-[10px] tracking-[0.1em]"
              style={{ fontFamily: '"Inter", sans-serif' }}
            >
              &copy; 2026 Rapture Fashion
            </span>
          </div>

          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="footer-reveal text-ivory/20 text-[10px] tracking-[0.1em] hover:text-ivory/40 transition-colors duration-300"
                style={{ fontFamily: '"Inter", sans-serif' }}
                data-cursor="hover"
              >
                {link}
              </a>
            ))}
          </div>

          <span
            className="footer-reveal text-ivory/20 text-[10px] tracking-[0.1em]"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            Milano, Italia
          </span>
        </div>
      </div>
    </footer>
  );
}
