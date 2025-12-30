import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sun, Heart, Gift } from 'lucide-react';

const TrustBadges = () => {
    const badges = [
        {
            icon: ShieldCheck,
            title: "Certified Lab Tested",
            description: "Safety meets science. Every batch is rigorously tested for your peace of mind."
        },
        {
            icon: Sun,
            title: "Sun-Dried Perfection",
            description: "Naturally dried under the Rajasthan sun to lock in nutrients and flavor."
        },
        {
            icon: Heart,
            title: "No Added Sugar",
            description: "100% Guilt-free. Sweetened only by nature's finest ingredients."
        },
        {
            icon: Gift,
            title: "Hand-Roasted",
            description: "Crafted in small batches by master artisans for the perfect crunch."
        }
    ];

    return (
        <section className="pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-royal-cream to-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center space-x-2 bg-royal-gold/10 px-4 py-1.5 rounded-full"
                    >
                        <span className="w-2 h-2 rounded-full bg-royal-gold animate-pulse"></span>
                        <span className="text-royal-gold uppercase tracking-widest text-xs font-bold">Our Promise</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-serif font-bold text-royal-dark"
                    >
                        The Royal Standard
                    </motion.h2>
                    <div className="w-24 h-1 bg-royal-green mx-auto rounded-full"></div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {badges.map((badge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col items-center text-center group"
                        >
                            {/* Icon Wrapper */}
                            <div className="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-2xl bg-royal-cream flex items-center justify-center text-royal-gold group-hover:bg-royal-gold group-hover:text-white transition-colors duration-300 shadow-md">
                                <badge.icon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
                            </div>

                            <h3 className="font-serif font-bold text-lg text-royal-dark mb-2 group-hover:text-royal-gold transition-colors">
                                {badge.title}
                            </h3>

                            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                {badge.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
