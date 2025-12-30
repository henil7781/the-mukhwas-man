import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CrunchFactor = () => {
    return (
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden ">
            {/* Background Visual (Placeholder for Video) */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"
                    alt="Premium Mukhwas Texture"
                    className="w-full h-full object-cover brightness-50 hover:scale-105 transition-transform duration-[20s]"
                />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/90 via-royal-dark/50 to-transparent z-10"></div>

            <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block py-1 px-3 border border-royal-gold/50 rounded-full text-royal-gold text-xs tracking-widest uppercase mb-4 backdrop-blur-sm">
                        Sensory Experience
                    </span>
                    <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
                        Hear the <span className="text-royal-gold italic">Crunch</span>.
                    </h2>
                    <p className="text-xl text-gray-200 mb-8 font-light max-w-2xl mx-auto">
                        Every spoonful is a symphony of textures. Roasted fennel, crisp seeds, and cooling rose petals.
                    </p>
                    <Link
                        to="/shop"
                        className="inline-block bg-white text-royal-dark px-8 py-4 rounded-full font-bold hover:bg-royal-gold hover:text-white transition-all transform hover:scale-105 shadow-xl"
                    >
                        Taste the Freshness
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default CrunchFactor;
