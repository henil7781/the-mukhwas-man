import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Heart, ShieldCheck, Truck } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-royal-cream min-h-screen">
            {/* HER SECTOIN */}
            <div className="relative h-[60vh] bg-royal-dark overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"
                        alt="Spices Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-serif text-5xl md:text-7xl font-bold mb-6"
                    >
                        Preserving Tradition, <br /> One Spoon at a Time.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-royal-gold/90 font-light tracking-wide"
                    >
                        The Mukhwas Man is a tribute to the timeless Indian art of after-meal digestion.
                    </motion.p>
                </div>
            </div>

            {/* THE STORY */}
            <div className="max-w-5xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2070&auto=format&fit=crop"
                                alt="Making Mukhwas"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-royal-gold font-bold tracking-widest uppercase text-sm">Our Heritage</h4>
                        <h2 className="font-serif text-4xl font-bold text-royal-dark">From Grandma's Kitchen to Your Pocket.</h2>
                        <p className="text-gray-600 leading-relaxed">
                            It started with a simple memory: the jar of homemade <strong>fennel and sesame mix</strong> that was always waiting on our dining table. It wasn't just a seed mix; it was a ritual—a burst of freshness that signaled the satisfying end of a hearty meal.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            <strong>The Mukhwas Man</strong> was born out of a desire to bring that authentic, handcrafted quality back to the modern world. In an era of artificial flavors, we went back to the roots—sourcing premium fennel from Rajasthan, roses from Pushkar, and crafting blends that taste exactly like nostalgia.
                        </p>
                        <div className="pt-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" alt="Signature" className="h-12 opacity-50" />
                            <p className="text-sm text-gray-400 mt-2">- Founder, The Mukhwas Man</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* VALUES */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl font-bold text-royal-dark">Why Choose Us?</h2>
                        <div className="w-24 h-1 bg-royal-gold mx-auto mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow border border-gray-100">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Leaf size={32} />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-royal-dark mb-3">100% Natural</h3>
                            <p className="text-gray-500 text-sm">
                                Zero preservatives. Zero artificial colors. Just pure, sun-dried ingredients sourced directly from farmers.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow border border-gray-100">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart size={32} />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-royal-dark mb-3">Handcrafted with Love</h3>
                            <p className="text-gray-500 text-sm">
                                Made in small batches to ensure the perfect crunch and freshness in every single bottle.
                            </p>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow border border-gray-100">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-royal-dark mb-3">Premium Quality</h3>
                            <p className="text-gray-500 text-sm">
                                We use only the finest grade 'A' spices. No dust, no fillers—just the good stuff.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* FOUNDER NOTE / BOTTOM BANNER */}
            <div className="bg-royal-dark text-white py-20 text-center px-4">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Experience the Royal Taste</h2>
                <p className="text-royal-gold/80 mb-8 max-w-2xl mx-auto">
                    Join thousands of happy customers who have made The Mukhwas Man a part of their daily routine.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <div className="flex items-center justify-center gap-2 text-sm bg-white/10 px-6 py-3 rounded-full">
                        <Truck size={18} /> Pan-India Shipping
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm bg-white/10 px-6 py-3 rounded-full">
                        <ShieldCheck size={18} /> Secure Payments
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
