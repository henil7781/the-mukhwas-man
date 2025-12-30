"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { mockBackend } from '@/services/mockBackend';
import ProductCard from '@/components/ui/ProductCard';
import { Search } from 'lucide-react';

function ShopContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Sweet', 'Digestive', 'Healthy', 'Gifting'];

    // Load Data from Mock Backend (User's Requirement)
    useEffect(() => {
        // Simulate loading for better UX or just fetch
        const inventory = mockBackend.getInventory();
        setProducts(inventory);
        setLoading(false);
    }, []);

    // Handle URL Search Params
    useEffect(() => {
        const query = searchParams.get('search');

        if (query) {
            setSearchQuery(query);
            setActiveCategory('All');
        } else {
            setSearchQuery('');
        }
    }, [searchParams]);

    const filteredProducts = products.filter(p => {
        const matchesCategory = activeCategory === 'All' || p.category === activeCategory;

        const matchesSearch = searchQuery === '' ||
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.benefit?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.ingredients?.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    const updateSearch = (newQuery) => {
        setSearchQuery(newQuery);
        // Update URL
        const params = new URLSearchParams(searchParams);
        if (newQuery) {
            params.set('search', newQuery);
        } else {
            params.delete('search');
        }
        router.push(`/shop?${params.toString()}`);
    };

    const clearSearch = () => {
        setSearchQuery('');
        router.push('/shop');
    };

    return (
        <div className="pt-24 min-h-screen bg-royal-cream pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-royal-dark mb-4">Our Collection</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our diverse range of mouth fresheners, from traditional favorites to healthy modern blends.
                    </p>
                </div>

                {/* Search Results Message */}
                {searchQuery && (
                    <div className="text-center mb-8">
                        <p className="text-lg text-gray-500">
                            Showing results for "<span className="font-bold text-royal-dark">{searchQuery}</span>"
                            <button
                                onClick={clearSearch}
                                className="ml-2 text-sm text-red-500 underline"
                            >
                                Clear Search
                            </button>
                        </p>
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => {
                                setActiveCategory(cat);
                                if (searchQuery) clearSearch(); // Optional: Clear search on category click logic
                            }}
                            className={`px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border ${activeCategory === cat
                                ? 'bg-royal-green text-white border-royal-green shadow-lg transform scale-105'
                                : 'bg-white text-royal-dark border-gray-200 hover:border-royal-gold hover:text-royal-gold'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="py-20 text-center text-gray-400">Loading products...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}

                {!loading && filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-500 flex flex-col items-center">
                        <Search className="w-12 h-12 mb-4 text-gray-300" />
                        <p className="text-xl">No products found matching your criteria.</p>
                        <button
                            onClick={() => {
                                clearSearch();
                                setActiveCategory('All');
                            }}
                            className="mt-4 text-royal-gold font-bold hover:underline"
                        >
                            View all products
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={<div className="pt-32 text-center">Loading...</div>}>
            <ShopContent />
        </Suspense>
    );
}
