import React, { useState, useEffect } from 'react';
import SalesOverview from '../components/admin/SalesOverview';
import OrderTable from '../components/admin/OrderTable';
import { DollarSign, ShoppingBag, Package, Users } from 'lucide-react';
import { mockBackend } from '../services/mockBackend';
import AdminLayout from '../components/admin/AdminLayout';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate network delay
        setTimeout(() => {
            const data = mockBackend.getDashboardStats();
            const chartData = mockBackend.getSalesChartData();
            setStats({ ...data, chartData });
            setLoading(false);
        }, 800);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-royal-green"></div>
            </div>
        );
    }

    return (
        <AdminLayout
            title="Welcome back, Owner"
            subtitle="Here is what’s happening with your store today."
        >
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Total Revenue</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-800">₹{stats.totalRevenue}</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <ShoppingBag size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Orders Today</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-800">{stats.ordersToday}</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <Package size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Low Stock</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-800">{stats.lowStockItems.length}</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Customers</p>
                        <p className="text-xl md:text-2xl font-bold text-gray-800">{stats.newCustomers}</p>
                    </div>
                </div>
            </div>

            {/* Analytics & Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart - Takes 2/3 width */}
                <div className="lg:col-span-2">
                    <SalesOverview data={stats.chartData} />
                </div>

                {/* Low Stock Alert - Takes 1/3 width */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-4">Low Stock Alerts</h3>
                    <div className="space-y-4">
                        {stats.lowStockItems.length > 0 ? stats.lowStockItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                                <div>
                                    <p className="font-bold text-gray-700 text-sm">{item.name}</p>
                                    <p className="text-xs text-red-500 font-medium">Only {item.stock} left</p>
                                </div>
                                <button className="text-xs bg-white border border-red-200 text-red-600 px-2 py-1 rounded shadow-sm hover:bg-red-50">Restock</button>
                            </div>
                        )) : (
                            <p className="text-sm text-gray-500">All visible stock is healthy.</p>
                        )}

                    </div>
                </div>
            </div>

            <div className="mt-8">
                <OrderTable orders={stats.recentOrders} />
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
