"use client";

import React, { useState } from 'react';
import products from '@/data/products.json';
import { Package, Edit, Trash2, Plus } from 'lucide-react';

export default function Inventory() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg text-gray-600">Manage your product catalog.</h2>
                <button className="flex items-center space-x-2 bg-royal-green text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors">
                    <Plus size={18} />
                    <span>Add Product</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full max-w-md px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                        <tr>
                            <th className="p-4">Product</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredProducts.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50/50">
                                <td className="p-4 flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-md bg-gray-100 overflow-hidden border border-gray-200">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                                    </div>
                                    <span className="font-bold text-gray-800">{product.name}</span>
                                </td>
                                <td className="p-4 text-sm text-gray-600">{product.category}</td>
                                <td className="p-4 font-mono font-medium text-royal-green">₹{product.price}</td>
                                <td className="p-4 flex justify-center space-x-2">
                                    <button className="p-2 text-gray-400 hover:text-royal-gold hover:bg-amber-50 rounded-lg transition-colors">
                                        <Edit size={16} />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
