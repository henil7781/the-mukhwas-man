"use client";

import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { User, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
    const { login } = useUser();
    const router = useRouter();
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.email) {
            login(formData.email, formData.name);
            // Simulate 'Nice Email' Notification
            const notification = document.createElement('div');
            notification.className = 'fixed top-4 right-4 bg-royal-green text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-bounce cursor-pointer';
            notification.innerHTML = `
                <div class="flex items-center space-x-3">
                    <span class="text-2xl">📧</span>
                    <div>
                        <p class="font-bold">Welcome Email Sent!</p>
                        <p class="text-xs text-green-200">Check your inbox for a royal surprise.</p>
                    </div>
                </div>
            `;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 4000);

            router.push('/profile');
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-royal-cream flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100">
                <div className="bg-royal-dark p-8 text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                        <User size={32} />
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-white">Welcome Back</h2>
                    <p className="text-royal-gold text-sm mt-1">Sign in to view your orders</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your name"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-royal-gold text-white font-bold py-3 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center shadow-lg shadow-yellow-600/20"
                        >
                            Sign In <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        <p>This is a demo. No password required.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
