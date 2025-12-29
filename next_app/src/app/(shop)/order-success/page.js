"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
    return (
        <div className="min-h-screen bg-royal-cream flex items-center justify-center p-4">
            <div className="text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h1 className="font-serif text-4xl font-bold text-royal-dark mb-4">Order Placed Successfully!</h1>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Thank you for choosing The Mukhwas Man. Your royal blend is being prepared and will be shipped soon.
                </p>
                <Link
                    href="/shop"
                    className="bg-royal-gold text-white px-8 py-3 rounded-full font-bold hover:bg-yellow-600 transition-colors inline-block"
                >
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
}
