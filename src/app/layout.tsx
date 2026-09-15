import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAPTURE FASHION — The Art of Becoming",
  description:
    "Discover the world of Rapture Fashion. A luxury fashion house dedicated to the art of haute couture, timeless elegance, and cinematic beauty.",
  keywords: [
    "luxury fashion",
    "haute couture",
    "fashion house",
    "RAPTURE",
    "editorial fashion",
  ],
  openGraph: {
    title: "RAPTURE FASHION — The Art of Becoming",
    description:
      "Discover the world of Rapture Fashion. A luxury fashion house dedicated to the art of haute couture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-obsidian">
      <body className="grain-overlay antialiased">{children}</body>
    </html>
  );
}
