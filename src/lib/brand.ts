export const brand = {
  colors: {
    obsidian: "#080908",
    deepEmerald: "#062E24",
    emerald: "#0B5D45",
    bloodRed: "#6E0915",
    crimson: "#9B1025",
    antiqueGold: "#C8A45D",
    champagne: "#E6D3A3",
    ivory: "#F4F0E7",
  },
  fonts: {
    display: '"Bodoni Moda", "Didot", "Playfair Display", serif',
    body: '"Inter", "Helvetica Neue", sans-serif',
    accent: '"Cormorant Garamond", "Georgia", serif',
  },
  animation: {
    duration: {
      fast: 0.3,
      normal: 0.6,
      slow: 1.0,
      cinematic: 1.6,
    },
    ease: {
      smooth: "power3.inOut",
      sharp: "power4.inOut",
      reveal: "power3.out",
    },
  },
} as const;

export type BrandColors = typeof brand.colors;
