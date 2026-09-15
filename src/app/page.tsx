"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SignatureScroll from "@/components/SignatureScroll";
import EditorialGallery from "@/components/EditorialGallery";
import CollectionShowcase from "@/components/CollectionShowcase";
import BloodRedStory from "@/components/BloodRedStory";
import BrandStory from "@/components/BrandStory";
import CampaignSection from "@/components/CampaignSection";
import JournalSection from "@/components/JournalSection";
import Footer from "@/components/Footer";

const CinematicLoader = dynamic(() => import("@/components/CinematicLoader"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const ThreeScene = dynamic(() => import("@/components/ThreeScene"), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const [isTouchDevice, setIsTouchDevice] = useState(true);
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <>
      {isLoading && <CinematicLoader onComplete={handleLoaderComplete} />}
      {!isTouchDevice && <CustomCursor />}
      <SmoothScroll>
        <Header />
        <main>
          <Hero />
          <SignatureScroll />
          <EditorialGallery />
          <CollectionShowcase />
          <BloodRedStory />
          <BrandStory />
          <CampaignSection />
          <ThreeScene />
          <JournalSection />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
