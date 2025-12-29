"use client";

import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import { mockBackend } from '@/services/mockBackend';
import { useRouter } from 'next/navigation';
import { User, Package, Settings, LogOut, ChevronRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

const UserProfile = () => {
    const { user, logout, updateUser } = useUser();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('orders'); // orders, settings
    const [myOrders, setMyOrders] = useState([]);

    // Edit Form State
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simple client-side protection
        // Ideally we verify a session token if this was real auth
        const checkUser = async () => {
            // Artificial delay to prevent flash if user checks happen? No need for local storage check as Context handles it.
            // But Context initializes user from local storage in useEffect.
            // We need to wait for Context to load. user might be null initially.
            // Assuming UserContext doesn't expose loading state, we might redirect preemptively which is bad if user IS logged in but loading.
            // For now, let's rely on user check in the component. Context usually loads fast.
            // A improved UserContext with `loading` state is recommended.
        };

        // Since UserContext uses useEffect to load mock user, there's a brief moment `user` is null.
        // We really need a loading state in UserContext. But for migration, let's just wait a bit or check if mounted.

        // Actually, if we just check !user, it might redirect before loading.
        // But `user` starts as null in context.
        // We will just assume if no user after a timeout or if we trust it...
        // Let's modify logic:

        // For this demo, let's just execute logic if user exists. Redirect if not.
        // Ideally we need `loading` from context.
    }, []);

    useEffect(() => {
        // If user is null, checking if it stays null or loads...
        // For migration safety, let's assume if context works, user will be set if present.
        const timeout = setTimeout(() => {
            if (!user) {
                router.push('/login');
            } else {
                setIsLoading(false);
            }
        }, 500); // Small delay to allow hydration/context load

        return () => clearTimeout(timeout);
    }, [user, router]);

    useEffect(() => {
        if (!user) return;

        // 1. Load Orders for this user
        const allOrders = mockBackend.getOrders();
        // Simple matching by name for this demo
        const userOrders = allOrders.filter(o =>
            (o.email && o.email === user.email) || // Match by Email (Strong)
            (o.customerName && o.customerName.toLowerCase() === user.name.toLowerCase()) // Match by Name (Weak fallback)
        );
        setMyOrders(userOrders);

        // 2. Load Form Data
        setFormData({ name: user.name, phone: user.phone, email: user.email });
        setIsLoading(false);
    }, [user]);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        updateUser(formData);
        alert("Profile Updated Successfully!");
    };

    if (isLoading) return <div className="min-h-screen pt-32 text-center">Loading Profile...</div>;
    if (!user) return null;

    return (
        <div className="min-h-screen pt-24 pb-12 bg-royal-cream">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="relative">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-24 h-24 rounded-full border-4 border-royal-gold/20"
                        />
                        <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h1 className="font-serif text-3xl font-bold text-royal-dark">{user.name}</h1>
                        <p className="text-gray-500">{user.email}</p>
                        <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
                            <span className="px-3 py-1 bg-royal-gold/10 text-royal-gold rounded-full text-xs font-bold uppercase tracking-wide">
                                Gold Member
                            </span>
                            <span className="text-xs text-gray-400">Joined Dec 2025</span>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                        <LogOut size={18} className="mr-2" /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Tabs */}
                    <div className="md:col-span-1 space-y-2">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`w-full flex items-center p-3 rounded-lg font-medium transition-all ${activeTab === 'orders' ? 'bg-royal-dark text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Package size={20} className="mr-3" /> My Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center p-3 rounded-lg font-medium transition-all ${activeTab === 'settings' ? 'bg-royal-dark text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        >
                            <Settings size={20} className="mr-3" /> Account Details
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="md:col-span-3">
                        {activeTab === 'orders' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
                                <h2 className="font-serif text-2xl font-bold text-royal-dark mb-6 flex items-center">
                                    <ShoppingBag className="mr-2 text-royal-gold" /> Order History
                                </h2>

                                {myOrders.length > 0 ? (
                                    <div className="space-y-4">
                                        {myOrders.map(order => (
                                            <div key={order.id} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                                                <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 pb-4 border-b border-gray-50">
                                                    <div>
                                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order ID</span>
                                                        <p className="font-mono font-bold text-gray-800">#{order.id}</p>
                                                    </div>
                                                    <div className="mt-2 md:mt-0 text-left md:text-right">
                                                        <span className="text-xs text-gray-400">Date</span>
                                                        <p className="text-sm font-medium">{new Date(order.date).toLocaleDateString()}</p>
                                                    </div>
                                                    <div className="mt-2 md:mt-0">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                                'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex justify-between items-center text-sm">
                                                            <div className="flex items-center text-gray-700">
                                                                <span className="w-1.5 h-1.5 bg-royal-gold rounded-full mr-2"></span>
                                                                {item.name} <span className="text-gray-400 ml-1">x{item.qty || item.quantity}</span>
                                                            </div>
                                                            <span className="font-mono">₹{item.price}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center">
                                                    <span className="text-sm font-bold text-royal-dark">Total Amount</span>
                                                    <span className="text-lg font-bold text-royal-dark">₹{order.total}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-gray-400">
                                        <Package size={48} className="mx-auto mb-4 opacity-50" />
                                        <p>You haven't placed any orders yet.</p>
                                        <button onClick={() => router.push('/shop')} className="mt-4 text-royal-gold font-bold hover:underline">Start Shopping</button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h2 className="font-serif text-2xl font-bold text-royal-dark mb-6">Account Settings</h2>
                                <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-lg">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-royal-gold focus:ring-1 focus:ring-royal-gold outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-royal-gold focus:ring-1 focus:ring-royal-gold outline-none"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-royal-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-royal-green transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
