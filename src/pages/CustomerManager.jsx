import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { mockBackend } from '../services/mockBackend';
import { Search, MapPin, Smartphone, Globe, Mail, DollarSign, ShoppingBag } from 'lucide-react';

const CustomerManager = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Simulate fetch
        setTimeout(() => {
            const data = mockBackend.getCustomers();
            setCustomers(data);
            setLoading(false);
        }, 600);
    }, []);

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getPathIcon = (path) => {
        if (path.includes('Instagram') || path.includes('Facebook')) return <Smartphone size={16} className="text-pink-600" />;
        if (path.includes('Google')) return <Globe size={16} className="text-blue-500" />;
        return <MapPin size={16} className="text-gray-400" />;
    };

    return (
        <AdminLayout title="Customer Insights" subtitle="Understand your audience and their journey.">

            {/* SEARCH */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search customers by name or email..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* CUSTOMER GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-10 text-gray-400">Loading customer data...</div>
                ) : filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-full bg-royal-gold/10 text-royal-gold flex items-center justify-center font-bold text-lg">
                                        {customer.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{customer.name}</h3>
                                        <div className="flex items-center text-xs text-gray-500 mt-1">
                                            <Mail size={12} className="mr-1" />
                                            {customer.email}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs font-mono text-gray-300">#{customer.id}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-gray-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-gray-500 mb-1 flex items-center justify-center"><DollarSign size={12} className="mr-1" /> Total Spend</p>
                                    <p className="font-bold text-royal-dark">₹{customer.totalSpend.toLocaleString()}</p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg text-center">
                                    <p className="text-xs text-gray-500 mb-1 flex items-center justify-center"><ShoppingBag size={12} className="mr-1" /> Orders</p>
                                    <p className="font-bold text-royal-dark">{customer.totalOrders}</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 mb-4">
                                <div className="flex items-center justify-between text-sm mb-3">
                                    <span className="text-gray-500">Acquisition Path:</span>
                                    <span className="flex items-center font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-full text-xs">
                                        <span className="mr-1.5">{getPathIcon(customer.acquisitionPath)}</span>
                                        {customer.acquisitionPath}
                                    </span>
                                </div>
                            </div>

                            {/* ACTIVITY FEED */}
                            <div className="bg-gray-50/50 rounded-lg p-4 space-y-3">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Shopping History</p>
                                    <div className="flex flex-wrap gap-2">
                                        {customer.purchasedItems.map((item, i) => (
                                            <span key={i} className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 text-green-700 text-xs border border-green-100">
                                                <ShoppingBag size={10} className="mr-1" /> {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Recent Searches</p>
                                    <div className="flex flex-wrap gap-2">
                                        {customer.recentSearches.map((search, i) => (
                                            <span key={i} className="inline-flex items-center px-2 py-1 rounded-md bg-white text-gray-500 text-xs border border-gray-200">
                                                <Search size={10} className="mr-1" /> {search}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10 text-gray-400">No customers found.</div>
                )}
            </div>
        </AdminLayout>
    );
};

export default CustomerManager;
