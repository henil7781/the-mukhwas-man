"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart, cartItems } = useCart();

    // 1. Stock Logic: calculated from props (or default 50)
    const stock = product.stock !== undefined ? product.stock : 50;

    // 2. Cart Logic: How many does THIS user have?
    const inCart = cartItems.find(item => item.id === product.id)?.quantity || 0;

    // 3. User Availability: What's actually left for them to buy?
    const availableForUser = Math.max(0, stock - inCart);

    const handleAddToCart = (e) => {
        e.preventDefault();
        // Strict check before action
        if (availableForUser > 0) {
            addToCart(product);
        } else if (stock > 0) {
            alert(`Sorry, you have already added the maximum available quantity (${stock}) for this item.`);
        }
    };

    // Helper: Determine Badge Color & Label based on Category (Visual Only)
    const getCategoryColor = (cat) => {
        switch (cat) {
            case 'Digestive': return 'bg-amber-100 text-amber-800';
            case 'Sweet': return 'bg-rose-100 text-rose-800';
            case 'Healthy': return 'bg-emerald-100 text-emerald-800';
            case 'Gifting': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Helper: Render Stock Badge
    const renderStockBadge = () => {
        if (stock === 0) {
            return (
                <span className="text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide bg-gray-800 text-white shadow-sm">
                    Sold Out
                </span>
            );
        }
        if (stock < 10) {
            return (
                <span className="text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide bg-orange-500 text-white shadow-sm animate-pulse">
                    Only {stock} Left
                </span>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full ${stock === 0 ? 'opacity-75 grayscale' : ''}`}
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-white">
                <Link href={`/product/${product.id}`}>
                    <div className="w-full h-full relative">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                    </div>
                </Link>

                {/* Badges Container */}
                <div className="absolute top-3 left-3 flex flex-col items-start space-y-1">
                    {/* Category */}
                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide border border-white/50 backdrop-blur-sm shadow-sm ${getCategoryColor(product.category)}`}>
                        {product.category}
                    </span>
                    {/* Stock Status */}
                    {renderStockBadge()}
                </div>

                {/* Quick Add Button (Hover) */}
                {availableForUser > 0 ? (
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                        <button
                            onClick={handleAddToCart}
                            className="bg-white text-royal-dark p-2.5 rounded-full shadow-lg hover:bg-royal-gold hover:text-white transition-colors border border-gray-100"
                            title="Add to Cart"
                        >
                            <ShoppingBag className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    stock > 0 && (
                        <div className="absolute bottom-3 right-3 opacity-100">
                            <span className="bg-gray-100 text-xs font-bold px-2 py-1 rounded-full text-gray-500 border border-gray-200 shadow-sm cursor-not-allowed">
                                Max Limit
                            </span>
                        </div>
                    )
                )}
            </div>

            {/* Content Section */}
            <div className="p-4 flex-1 flex flex-col">
                <Link href={`/product/${product.id}`}>
                    <h3 className="font-serif text-lg font-bold text-royal-dark mb-1 group-hover:text-royal-gold transition-colors truncate">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center text-xs text-gray-500 mb-3 italic">
                    <Leaf className="w-3 h-3 mr-1 text-green-500" />
                    Good for: {product.benefit}
                </div>

                {/* Texture/Taste Metrics */}
                {product.texture && (
                    <div className="flex space-x-2 mb-3 mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center space-x-1">
                            <span className="text-[10px] text-gray-400">Sweet</span>
                            <div className="flex space-x-0.5">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className={`w-1 h-1 rounded-full ${i < Math.min(3, product.texture.sweetness) ? 'bg-royal-gold' : 'bg-gray-200'}`}></div>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 border-l border-gray-200 pl-2">
                            <span className="text-[10px] text-gray-400">Crunch</span>
                            <div className="flex space-x-0.5">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className={`w-1 h-1 rounded-full ${i < Math.min(3, product.texture.crunch) ? 'bg-royal-green' : 'bg-gray-200'}`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer: Price & Add Button */}
                <div className="mt-auto flex justify-between items-center pt-3 border-t border-gray-50">
                    <span className="font-bold text-lg text-royal-green">₹{product.price}</span>
                    <button
                        onClick={handleAddToCart}
                        disabled={availableForUser === 0}
                        className={`text-xs font-bold uppercase tracking-wider transition-colors ${availableForUser === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-royal-gold hover:underline'}`}
                    >
                        {stock === 0 ? 'Sold Out' : (availableForUser === 0 ? 'Max Added' : 'Add')}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
