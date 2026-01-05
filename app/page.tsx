
// src/app/page.tsx
import HeroSection from "./components/home/HeroSection";
import RoyalSelection from "./components/home/royal_selection";
import OurPromise from "./components/home/OurPromise";
import StoryTeaser from "./components/home/StoryTeaser";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <RoyalSelection />
      <OurPromise />
      <StoryTeaser />
    </div>
  );
}