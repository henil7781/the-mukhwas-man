"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Moon, PartyPopper, Coffee, Plane } from 'lucide-react';
import { motion } from 'framer-motion';

const moods = [
    { id: 'Dinner', label: 'Just had Dinner?', sub: 'Digestive Relief', icon: Moon, color: 'bg-indigo-100 text-indigo-700' },
    { id: 'Party', label: 'Hosting a Party?', sub: 'Premium Gifting', icon: PartyPopper, color: 'bg-amber-100 text-amber-700' },
    { id: 'Snack', label: 'Healthy Munching?', sub: 'Superseeds & Nuts', icon: Coffee, color: 'bg-emerald-100 text-emerald-700' },
    { id: 'Travel', label: 'Traveling?', sub: 'Pocket Essentials', icon: Plane, color: 'bg-sky-100 text-sky-700' },
];

const ShopByMood = () => {
    const router = useRouter();

    const handleMoodClick = (moodId) => {
        // Navigate using Next.js router
        router.push(`/shop?mood=${moodId}`);
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl font-bold text-royal-dark">Shop by Mood</h2>
                    <p className="text-gray-500 mt-2">Find the perfect blend for your current vibe.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {moods.map((mood, index) => (
                        <motion.button
                            key={mood.id}
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleMoodClick(mood.id)}
                            className="group p-6 rounded-2xl border border-gray-100 text-left hover:shadow-lg transition-all duration-300 bg-white"
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${mood.color} transition-colors`}>
                                <mood.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-lg text-royal-dark group-hover:text-royal-gold transition-colors">{mood.label}</h3>
                            <p className="text-sm text-gray-400 mt-1">{mood.sub}</p>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ShopByMood;
