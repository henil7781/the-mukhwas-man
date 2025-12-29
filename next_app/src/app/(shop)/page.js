import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import ShopByMood from '@/components/home/ShopByMood';
import ProductCard from '@/components/ui/ProductCard';
import products from '@/data/products.json';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  // Featured logic: Get 4 items
  const featuredProducts = products.filter(product => product.isFeatured).slice(0, 4);

  return (
    <div className="bg-royal-cream">
      <HeroSection />

      {/* Mood Section */}
      <ShopByMood />

      {/* Featured Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-royal-gold font-semibold tracking-wider uppercase text-sm">Our Bestsellers</span>
          <h2 className="font-serif text-4xl font-bold text-royal-dark mt-2 mb-4">Royal Selections</h2>
          <div className="w-24 h-1 bg-royal-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop" className="inline-flex items-center text-royal-dark font-medium hover:text-royal-gold transition-colors border-b-2 border-transparent hover:border-royal-gold pb-1">
            View All Products <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-royal-green text-royal-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <h3 className="font-serif text-xl font-bold mb-3 text-royal-gold">100% Natural</h3>
              <p className="text-gray-300">No artificial preservatives or colors. Just pure, nature-derived goodness.</p>
            </div>
            <div className="p-6 border-l-0 md:border-l border-white/10">
              <h3 className="font-serif text-xl font-bold mb-3 text-royal-gold">Handcrafted Recipes</h3>
              <p className="text-gray-300">Traditional family recipes passed down through generations.</p>
            </div>
            <div className="p-6 border-l-0 md:border-l border-white/10">
              <h3 className="font-serif text-xl font-bold mb-3 text-royal-gold">Premium Quality</h3>
              <p className="text-gray-300">Sourced from the finest farms and spices markets across India.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
