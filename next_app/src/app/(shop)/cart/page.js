"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function Cart() {
    return (
        <div className="pt-32 min-h-screen bg-royal-cream text-center px-4">
            <div className="max-w-md mx-auto">
                <div className="bg-royal-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-10 h-10 text-royal-green" />
                </div>
                <h1 className="font-serif text-3xl font-bold text-royal-dark mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-8">Looks like you haven't added any royal treats yet.</p>
                <Link href="/shop" className="bg-royal-green text-white px-8 py-3 rounded-full font-medium hover:bg-royal-dark transition-colors inline-block">
                    Start Shopping
                </Link>
            </div>
        </div>
    );
}
