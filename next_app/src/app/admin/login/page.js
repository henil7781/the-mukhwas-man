"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // HARDCODED DEMO CREDENTIALS
        if (email === 'admin@mukhwas.com' && password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            router.push('/admin');
        } else {
            setError('Invalid credentials. Try admin@mukhwas.com / admin123');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 md:p-12">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-royal-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-royal-gold">
                        <Lock size={32} />
                    </div>
                    <h1 className="font-serif text-3xl font-bold text-royal-dark">Admin Access</h1>
                    <p className="text-gray-500 mt-2">The Mukhwas Man Control Center</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-gold focus:ring-1 focus:ring-royal-gold outline-none transition-all"
                            placeholder="admin@mukhwas.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-royal-gold focus:ring-1 focus:ring-royal-gold outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-royal-dark text-white font-bold py-4 rounded-xl hover:bg-royal-gold transition-colors flex items-center justify-center group"
                    >
                        Login to Dashboard <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="text-center mt-8 text-xs text-gray-400">
                    Secure System • Authorized Personnel Only
                </p>
            </div>
        </div>
    );
};
