"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import products from '@/data/products.json';
import { Minus, Plus, ShoppingBag, ArrowLeft, Star, Heart, Leaf, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

const ProductDetails = () => {
    const params = useParams();
    const id = params?.id;
    const router = useRouter(); // For back navigation logic if not using Link

    const product = products.find(p => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1);
    const [selectedWeight, setSelectedWeight] = useState('100g'); // Default weight
    const { addToCart } = useCart();

    if (!product) {
        return (
            <div className="pt-32 text-center min-h-screen">
                <h2 className="text-2xl font-serif">Product Not Found</h2>
                <Link href="/shop" className="text-royal-gold hover:underline mt-4 inline-block">Back to Shop</Link>
            </div>
        );
    }

    // Price Calculation based on Weight
    const getPrice = () => {
        let multiplier = 1;
        if (selectedWeight === '250g') multiplier = 2.2; // Slight discount
        if (selectedWeight === '500g') multiplier = 4;   // Bulk discount
        return Math.round(product.price * multiplier);
    };

    const currentPrice = getPrice();

    const handleQuantity = (type) => {
        if (type === 'inc') setQuantity(q => q + 1);
        if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
    };

    const handleAdd = () => {
        // Create a variation item to add
        const itemToAdd = {
            ...product,
            id: `${product.id}-${selectedWeight}`, // Unique ID for variation
            name: `${product.name} (${selectedWeight})`,
            price: currentPrice
        };
        addToCart(itemToAdd, quantity);
    };

    return (
        <div className="pt-32 pb-20 min-h-screen bg-royal-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/shop" className="inline-flex items-center text-gray-500 hover:text-royal-green mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image */}
                    <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 relative group">
                        <div className="w-full h-full relative">
                            {/* Keep standard img for now to match other usage */}
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
                        </div>
                        <div className="absolute top-4 left-4 flex flex-col space-y-2">
                            {product.badges?.map(badge => (
                                <span key={badge} className="bg-white/90 backdrop-blur text-royal-dark text-xs font-bold px-3 py-1.5 rounded-md shadow-sm uppercase tracking-wide">
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-royal-gold font-medium tracking-wide uppercase text-sm">{product.category} Collection</span>
                            <button className="text-gray-400 hover:text-red-500 transition-colors">
                                <Heart className="w-6 h-6" />
                            </button>
                        </div>

                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-royal-dark mb-4">{product.name}</h1>

                        <div className="flex items-center space-x-4 mb-6">
                            <p className="text-3xl font-bold text-royal-green">₹{currentPrice}</p>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <div className="flex items-center text-yellow-500">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="ml-1 font-bold text-royal-dark">4.9</span>
                            </div>
                        </div>

                        {/* Benefit Highlight */}
                        <div className="bg-green-50 border border-green-100 p-3 rounded-lg flex items-center mb-6 text-green-800 text-sm font-medium w-fit">
                            <Leaf className="w-4 h-4 mr-2" />
                            Good for: {product.benefit}
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                            {product.description}
                        </p>

                        {/* Weight Toggles */}
                        <div className="mb-8">
                            <p className="text-sm font-bold text-gray-700 mb-3 uppercase">Select Quantity</p>
                            <div className="flex space-x-3">
                                {['100g', '250g', '500g'].map(weight => (
                                    <button
                                        key={weight}
                                        onClick={() => setSelectedWeight(weight)}
                                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedWeight === weight
                                            ? 'border-royal-gold bg-royal-gold/10 text-royal-dark ring-1 ring-royal-gold'
                                            : 'border-gray-200 text-gray-500 hover:border-gray-300'
                                            }`}
                                    >
                                        {weight}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ingredients */}
                        {product.ingredients && (
                            <div className="mb-8 p-5 bg-white rounded-xl border border-gray-100">
                                <h3 className="font-serif font-bold text-lg mb-3">Key Ingredients</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.ingredients.map((ing, i) => (
                                        <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-100">
                                            {ing}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Add to Cart Actions */}
                        <div className="flex items-center space-x-6 mt-auto">
                            <div className="flex items-center border border-gray-300 rounded-full bg-white">
                                <button onClick={() => handleQuantity('dec')} className="p-3 hover:text-royal-gold transition-colors">
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button onClick={() => handleQuantity('inc')} className="p-3 hover:text-royal-gold transition-colors">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <button
                                onClick={handleAdd}
                                className="flex-1 bg-royal-green text-white px-8 py-3 rounded-full font-medium hover:bg-royal-dark transition-all transform active:scale-95 shadow-lg shadow-royal-green/30 flex items-center justify-center space-x-2"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                <span>Add Pack - ₹{currentPrice * quantity}</span>
                            </button>
                        </div>

                        <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            Secure Payment • 100% Authentic • Freshly Packed
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
