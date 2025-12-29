"use client";

import React from 'react';
import { User, Mail, Phone, Calendar } from 'lucide-react';

export default function Customers() {
    // Mock Data
    const customers = [
        { id: 1, name: 'Henil Patel', email: 'henil@example.com', phone: '+91 98765 43210', joined: '2023-12-01', orders: 5, totalSpent: 2500 },
        { id: 2, name: 'Guest User', email: 'guest@example.com', phone: '+91 91234 56789', joined: '2023-12-05', orders: 1, totalSpent: 450 },
        { id: 3, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 99887 76655', joined: '2023-12-10', orders: 3, totalSpent: 1200 },
    ];

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-lg text-gray-600">View and manage customer details.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map(customer => (
                    <div key={customer.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-royal-gold/10 text-royal-gold rounded-full flex items-center justify-center font-bold text-lg">
                                {customer.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-royal-dark">{customer.name}</h3>
                                <div className="flex items-center text-xs text-gray-400 mt-1">
                                    <Calendar size={12} className="mr-1" /> Joined {customer.joined}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-center">
                                <Mail size={14} className="mr-2 text-gray-400" /> {customer.email}
                            </div>
                            <div className="flex items-center">
                                <Phone size={14} className="mr-2 text-gray-400" /> {customer.phone}
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-50 flex justify-between items-center text-sm font-medium">
                            <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">{customer.orders} Orders</span>
                            <span className="text-royal-green">₹{customer.totalSpent} Spent</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
