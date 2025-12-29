"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <section className="relative h-screen flex items-center bg-royal-dark overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 rounded-full bg-royal-gold blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 rounded-full bg-royal-green blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <span className="text-royal-gold tracking-[0.2em] text-sm uppercase font-semibold">
                            The Mukhwas Man
                        </span>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold text-royal-cream leading-tight">
                            Rediscover the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-gold to-yellow-300">Mukhwas</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-lg leading-relaxed">
                            Handcrafted digestive blends made from the finest ingredients. A perfect ending to every meal, fit for royalty.
                        </p>

                        <div className="flex space-x-4 pt-4">
                            <Link href="/shop" className="bg-royal-gold hover:bg-yellow-600 text-white px-8 py-4 rounded-full font-medium transition-all transform hover:scale-105 flex items-center shadow-lg hover:shadow-royal-gold/20">
                                Shop Collection <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                            <Link href="/about" className="px-8 py-4 rounded-full border border-royal-cream/20 text-royal-cream hover:bg-royal-cream/10 transition-all font-medium">
                                Our Story
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden md:block relative"
                    >
                        {/* Product Banner */}
                        <div className="relative w-full flex items-center justify-center z-10">
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-royal-gold/20 blur-[80px] rounded-full scale-75"></div>
                            {/* Using img tag here as external image might not be configured in next.config.js yet, can optimize later */}
                            <img
                                src="https://bullionmukhwas.com/cdn/shop/files/xmas_1.png?v=1766566522"
                                alt="Dizzle Premium Collection"
                                className="relative w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 rounded-xl"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
