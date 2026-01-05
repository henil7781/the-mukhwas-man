"use client";
import React, { useState } from 'react';
import { Leaf, Search, ShoppingCart } from 'lucide-react';
import { useCartStore } from "../store/useCartStore"; // Verify this path matches your structure

const ALL_PRODUCTS = [
    { id: 1, category: "Digestive", title: "5-in-1 Royal Mix", benefit: "Digestion", price: "₹299", image: "https://m.media-amazon.com/images/I/61upytlhuQL._AC_SX416_CB1169409_QL70_.jpg" },
    { id: 2, category: "Exotic", title: "Mango Chews", benefit: "Cravings", price: "₹349", image: "https://m.media-amazon.com/images/I/61upytlhuQL._AC_SX416_CB1169409_QL70_.jpg" },
    { id: 3, category: "Sweet", title: "Shahi Gulab", benefit: "Stress Relief", price: "₹249", image: "https://m.media-amazon.com/images/I/61upytlhuQL._AC_SX416_CB1169409_QL70_.jpg" },
    { id: 4, category: "Gifting", title: "Royal Gift Box", benefit: "Impress", price: "₹999", image: "https://m.media-amazon.com/images/I/61upytlhuQL._AC_SX416_CB1169409_QL70_.jpg" },
    { id: 5, category: "Digestive", title: "Jeera Goli", benefit: "Acidity", price: "₹199", image: "https://m.media-amazon.com/images/I/61upytlhuQL._AC_SX416_CB1169409_QL70_.jpg" },
    { id: 6, category: "Digestive", title: "5-in-1 Royal Mix", benefit: "Digestion", price: "₹299", image: "https://m.media-amazon.com/images/I/61upytlhuQL._AC_SX416_CB1169409_QL70_.jpg" },
    { id: 8, category: "Exotic", title: "Mango Chews", benefit: "Cravings", price: "₹349", image: "https://m.media-amazon.com/images/I/61upytlhuQL._AC_SX416_CB1169409_QL70_.jpg" },
    { id: 9, category: "Sweet", title: "Shahi Gulab", benefit: "Stress Relief", price: "₹249", image: "https://m.media-amazon.com/images/I/61upytlhuQL._AC_SX416_CB1169409_QL70_.jpg" },
    { id: 10, category: "Gifting", title: "Royal Gift Box", benefit: "Impress", price: "₹999", image: "https://m.media-amazon.com/images/I/61upytlhuQL._AC_SX416_CB1169409_QL70_.jpg" },
    { id: 7, category: "Digestive", title: "Jeera Goli", benefit: "Acidity", price: "₹199", image: "https://m.media-amazon.com/images/I/61upytlhuQL._AC_SX416_CB1169409_QL70_.jpg" },
];

const CATEGORIES = ["All", "Digestive", "Exotic", "Sweet", "Gifting"];
export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const addItem = useCartStore((state: { addItem: any; }) => state.addItem);

    // Combined Filter Logic
    const filteredProducts = ALL_PRODUCTS.filter(p => {
        const matchesCategory = activeCategory === "All" || p.category === activeCategory;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="bg-[#FFFBF2] min-h-screen pb-20">
            {/* Header stays same */}
            <div className="bg-[#1A332E] py-20 px-6 text-center">
                <h1 className="text-[#D48D3B] text-5xl md:text-6xl font-serif font-bold mb-4">Our Collection</h1>
                <p className="text-[#E2E6D6]/70 max-w-xl mx-auto text-lg italic">HANDCRAFTED ROYAL MUKHWAS</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-10">
                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-[#1A332E]/10 pb-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? "bg-[#1A332E] text-white shadow-md" : "bg-white text-[#1A332E] border border-[#1A332E]/10"}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search blends..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-[#1A332E]/10 focus:outline-none focus:ring-1 focus:ring-[#D48D3B]"
                        />
                    </div>
                </div>

                {/* Grid with Empty State */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                                <div className="relative aspect-square bg-[#F8F8F8] overflow-hidden">
                                    <img src={product.image} alt={product.title} className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow space-y-3">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-[#1A332E] font-serif text-xl font-bold leading-tight">{product.title}</h3>
                                        <span className="text-[#D48D3B] font-bold">{product.price}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#4CAF50] text-xs font-bold uppercase tracking-wider">
                                        <Leaf size={14} fill="currentColor" />
                                        <span>{product.benefit}</span>
                                    </div>
                                    <button onClick={() => addItem(product)} className="w-full mt-auto bg-transparent border border-[#1A332E] text-[#1A332E] py-3 rounded-full font-bold text-sm hover:bg-[#1A332E] hover:text-white transition-all flex items-center justify-center gap-2">
                                        <ShoppingCart size={16} /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500 font-serif italic">No blends found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </main>
    );
}