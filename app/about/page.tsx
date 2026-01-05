import React from 'react';
import { History, Heart, Users } from 'lucide-react';
import StoryTeaser from '../components/home/StoryTeaser';

export default function AboutPage() {
  return (
    <main className="bg-[#FFFBF2] min-h-screen">
      {/* 1. Elegant Hero Header */}

      <section className="bg-[#1A332E] py-24 px-6 text-center">
        <h1 className="text-[#D48D3B] text-5xl md:text-7xl font-serif font-bold mb-6">
          Our Story
        </h1>
        <div className="w-24 h-1 bg-[#D48D3B] mx-auto mb-8" />
        <p className="text-[#E2E6D6]/80 max-w-2xl mx-auto text-xl font-light italic">
          "Preserving the royal tradition of post-meal digestive blends for the modern palate."
        </p>
      </section>

      {/* 2. Narrative Section: The Beginning */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-[#1A332E] text-4xl font-serif font-bold mb-6">The Roots of Tradition</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              Before the era of processed candies and artificial breath fresheners, every Indian meal ended with a ritual. A small, handcrafted blend of seeds, spices, and herbs known as <span className="text-[#1A332E] font-bold">Mukhwas</span>.
            </p>
            <p>
              The Mukhwas Man was born from a family legacy spanning three generations. What started in a small home kitchen in Gujarat has evolved into a quest to bring back the authentic, sun-dried flavors of royalty.
            </p>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://joyspoon.in/cdn/shop/files/Untitled-3-09.jpg?v=1739182729&width=600"
              alt="Traditional Indian Spices"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>
      <StoryTeaser />

      {/* 3. Our Values: Icons & Philosophy */}
      <section className="bg-[#E2E6D6]/30 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[#1A332E] text-4xl font-serif font-bold">What Defines Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="bg-[#1A332E] text-[#D48D3B] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <History size={32} />
              </div>
              <h3 className="text-[#1A332E] text-xl font-bold font-serif">Legacy</h3>
              <p className="text-gray-600">Using age-old recipes passed down through generations of master blenders.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-[#1A332E] text-[#D48D3B] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-[#1A332E] text-xl font-bold font-serif">Purity</h3>
              <p className="text-gray-600">100% natural, sun-dried ingredients with no artificial preservatives or colors.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-[#1A332E] text-[#D48D3B] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={32} />
              </div>
              <h3 className="text-[#1A332E] text-xl font-bold font-serif">Community</h3>
              <p className="text-gray-600">Supporting local farmers and sustainable harvesting practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Closing CTA */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-[#1A332E] text-4xl font-serif font-bold mb-6">Experience the Ritual</h2>
        <p className="text-xl text-gray-700 mb-10 leading-relaxed">
          We invite you to rediscover the art of the after-meal. Each jar we ship is a piece of our history, crafted with love for your home.
        </p>
        <button className="bg-[#D48D3B] text-[#1A332E] px-12 py-4 rounded-full font-bold text-lg hover:brightness-110 transition-all shadow-xl">
          Start Your Collection
        </button>
      </section>
    </main>
  );
}