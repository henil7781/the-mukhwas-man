import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-royal-green text-royal-cream pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="font-serif text-2xl font-bold mb-4 text-royal-gold">The Mukhwas Man</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Experience the royal tradition of premium mukhwas. Handcrafted with authentic ingredients for a refreshing after-meal delight.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="/shop" className="hover:text-royal-gold transition-colors">Shop All</a></li>
                            <li><a href="/about" className="hover:text-royal-gold transition-colors">Our Story</a></li>
                            <li><a href="/contact" className="hover:text-royal-gold transition-colors">Contact Us</a></li>
                            <li><a href="/faq" className="hover:text-royal-gold transition-colors">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>123 Royal Street, Jaipur, India</li>
                            <li>support@themukhwasco.com</li>
                            <li>+91 98765 43210</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-serif text-lg font-semibold mb-4">Stay Updated</h4>
                        <p className="text-sm text-gray-300 mb-4">Subscribe for exclusive offers and new arrivals.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-royal-dark text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-royal-gold w-full"
                            />
                            <button className="bg-royal-gold text-white px-4 py-2 rounded-r-md hover:bg-yellow-600 transition-colors">
                                <Mail className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-royal-gold/20 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-gray-400">&copy; 2024 The Mukhwas Co. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Facebook className="w-5 h-5 text-gray-400 hover:text-royal-gold cursor-pointer" />
                        <Instagram className="w-5 h-5 text-gray-400 hover:text-royal-gold cursor-pointer" />
                        <Twitter className="w-5 h-5 text-gray-400 hover:text-royal-gold cursor-pointer" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
