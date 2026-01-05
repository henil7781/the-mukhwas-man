"use client";

import React from 'react';
import { ArrowRight, Leaf, ShoppingCart } from 'lucide-react';
import NextLink from 'next/link'; // Import the actual navigation Link
const products = [
  {
    id: 1,
    category: "DIGESTIVE",
    title: "5-in-1 Royal Mix",
    benefit: "All-in-One Digestion",
    image: "https://m.media-amazon.com/images/I/61upytlhuQL._AC_SX416_CB1169409_QL70_.jpg",
    badgeColor: "bg-[#FFF4E0] text-[#D4A017]",
  },
  {
    id: 2,
    category: "EXOTIC",
    title: "Dehydrated Mango Chews",
    benefit: "Cravings Killer",
    image: "https://m.media-amazon.com/images/I/61upytlhuQL._AC_SX416_CB1169409_QL70_.jpg",
    badgeColor: "bg-gray-100 text-gray-800",
  },
  {
    id: 3,
    category: "SWEET",
    title: "Shahi Gulab (Rose)",
    benefit: "Stress Relief",
    image: "https://m.media-amazon.com/images/I/61upytlhuQL._AC_SX416_CB1169409_QL70_.jpg",
    badgeColor: "bg-[#FFEBEE] text-[#E91E63]",
  },
  {
    id: 4,
    category: "GIFTING",
    title: "Royal Gift Box (Set of 4)",
    benefit: "Impress Guests",
    image: "https://m.media-amazon.com/images/I/61upytlhuQL._AC_SX416_CB1169409_QL70_.jpg",
    badgeColor: "bg-[#F3E5F5] text-[#9C27B0]",
  },
];


import { useCartStore } from "../../store/useCartStore";

export default function RoyalSelection() {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: any) => {
    addItem(product);
    // Optional: open cart immediately on add
  };

  return (
    <section className="bg-[#FFFBF2] py-20 px-6 md:px-20 lg:px-30">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <h3 className="text-[#D48D3B] uppercase tracking-[0.2em] text-sm font-bold">
            Our Bestsellers
          </h3>
          <h2 className="text-[#1A332E] text-4xl md:text-5xl font-serif font-bold">
            Royal Selections
          </h2>
          <div className="w-20 h-1 bg-[#D48D3B] mx-auto mt-4" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">

              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <span className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-md text-[10px] font-bold tracking-wider ${product.badgeColor}`}>
                  {product.category}
                </span>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6 space-y-3">
                <h4 className="text-[#1A332E] text-xl font-serif font-bold leading-tight">
                  {product.title}
                </h4>
                <div className="flex items-center gap-2 text-[#4CAF50] text-sm font-medium">
                  <Leaf size={16} fill="currentColor" className="opacity-80" />
                  <span>Good for: {product.benefit}</span>
                </div>
                {/* --- Add to Cart Button --- */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-[#1A332E] text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#2a4d45] transition-colors mt-2 shadow-sm"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
          <NextLink
            href="/shop"
            className="group flex items-center gap-3 bg-[#1A332E] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#2a4d45] transition-all shadow-md hover:shadow-lg"
          >
            View All Products
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </NextLink>
        </div>

      </div>
    </section>
  );
}