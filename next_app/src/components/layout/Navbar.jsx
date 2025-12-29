"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, User, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { cartItems, toggleCart } = useCart();
    const { user } = useUser();
    const router = useRouter();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    return (
        <nav className="fixed w-full z-40 glass-nav transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center">
                        <span className="font-serif text-2xl font-bold text-royal-green tracking-wide">
                            The Mukhwas Man
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    {!isSearchOpen && (
                        <div className="hidden md:flex space-x-8 items-center">
                            <Link href="/" className="text-royal-dark hover:text-royal-gold transition-colors font-medium">Home</Link>
                            <Link href="/shop" className="text-royal-dark hover:text-royal-gold transition-colors font-medium">Shop</Link>
                            <Link href="/about" className="text-royal-dark hover:text-royal-gold transition-colors font-medium">Our Story</Link>
                        </div>
                    )}

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="text-royal-dark hover:text-royal-gold transition-colors"
                        >
                            {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={toggleCart}
                            className="text-royal-dark hover:text-royal-gold transition-colors relative"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {cartItems.length > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    key={cartItems.length}
                                    className="absolute -top-2 -right-2 bg-royal-gold text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold"
                                >
                                    {cartItems.length}
                                </motion.span>
                            )}
                        </button>
                        <Link href={user ? "/profile" : "/login"} className="text-royal-dark hover:text-royal-gold transition-colors">
                            {user ? (
                                <div className="w-6 h-6 rounded-full overflow-hidden border border-royal-dark relative">
                                    <Image
                                        src={user.avatar}
                                        alt={user.name}
                                        width={24}
                                        height={24}
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <User className="w-5 h-5" />
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="text-royal-dark hover:text-royal-gold transition-colors"
                        >
                            <Search className="w-6 h-6" />
                        </button>
                        <button
                            onClick={toggleCart}
                            className="text-royal-dark relative"
                        >
                            <ShoppingBag className="w-6 h-6" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-royal-gold text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold"
                                >
                                    {cartItems.length}
                                </span>
                            )}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className="text-royal-dark">
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-4 shadow-lg z-30"
                    >
                        <div className="max-w-3xl mx-auto relative">
                            <form onSubmit={handleSearchSubmit}>
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Search for 'Paan', 'Digestive', 'Mango'..."
                                    className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-full border-none focus:ring-2 focus:ring-royal-gold outline-none text-lg text-royal-dark"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-royal-gold hover:text-royal-dark"
                                >
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </form>
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="absolute -top-10 right-0 text-white md:hidden"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-royal-cream border-t border-royal-green/10"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            <Link href="/" className="block px-3 py-2 text-royal-dark font-medium" onClick={() => setIsOpen(false)}>Home</Link>
                            <Link href="/shop" className="block px-3 py-2 text-royal-dark font-medium" onClick={() => setIsOpen(false)}>Shop</Link>
                            <Link href="/about" className="block px-3 py-2 text-royal-dark font-medium" onClick={() => setIsOpen(false)}>Our Story</Link>
                            <Link href={user ? "/profile" : "/login"} className="block px-3 py-2 text-royal-dark font-medium" onClick={() => setIsOpen(false)}>
                                {user ? "My Profile" : "Login / Sign Up"}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
