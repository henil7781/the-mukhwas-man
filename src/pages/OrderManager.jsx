import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { mockBackend } from '../services/mockBackend';
import { Search, Filter, Eye, Printer, Truck, CheckCircle, Clock } from 'lucide-react';

const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, delivered
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {
        setTimeout(() => {
            const data = mockBackend.getOrders();
            setOrders(data);
            setLoading(false);
        }, 500);
    };

    const handleStatusUpdate = (id, newStatus) => {
        mockBackend.updateOrderStatus(id, newStatus);
        // Optimistic UI update
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    };

    const handleTrackingUpdate = (id, trackingId) => {
        mockBackend.updateTrackingId(id, trackingId);
        setOrders(prev => prev.map(o => o.id === id ? { ...o, trackingId } : o));
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;
        if (filter === 'pending') return order.status === 'Pending' || order.status === 'Processing';
        if (filter === 'delivered') return order.status === 'Delivered';
        return true;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Shipped': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
            case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout title="Order Management" subtitle="Manage and fulfill customer orders.">
            {/* HEADER CONTROLS */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Search */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search Order ID or Customer..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    {['all', 'pending', 'delivered'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${filter === f ? 'bg-white text-royal-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* ORDERS TABLE */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Order Details</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">User Path</th>
                                <th className="p-4">Items</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Status & Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="6" className="p-8 text-center text-gray-400">Loading orders...</td></tr>
                            ) : filteredOrders.length > 0 ? (
                                filteredOrders.map(order => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4">
                                            <span className="font-mono font-bold text-royal-dark text-sm">{order.id}</span>
                                            <div className="text-xs text-gray-400 mt-1 flex items-center">
                                                <Clock size={10} className="mr-1" />
                                                {new Date(order.date).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium text-gray-800">{order.customerName}</div>
                                            <div className="text-xs text-gray-400">{order.email}</div>
                                        </td>
                                        <td className="p-4">
                                            {order.userPath ? (
                                                <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-600 font-medium">
                                                    {order.userPath.includes('Ad') ? '📢 ' : order.userPath.includes('Search') ? '🔍 ' : '🔗 '}
                                                    {order.userPath}
                                                </span>
                                            ) : <span className="text-xs text-gray-300">-</span>}
                                        </td>
                                        <td className="p-4 text-sm text-gray-600">
                                            <div className="space-y-1">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex items-center">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-royal-gold mr-2"></span>
                                                        <span>{item.name} <span className="text-gray-400 text-xs">x{item.quantity}</span></span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4 font-bold text-royal-gold">
                                            ₹{order.total}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col space-y-2">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                    className={`text-xs font-bold px-2 py-1 rounded-full border border-opacity-20 outline-none cursor-pointer ${getStatusColor(order.status)}`}
                                                >
                                                    <option>Pending</option>
                                                    <option>Processing</option>
                                                    <option>Shipped</option>
                                                    <option>Delivered</option>
                                                    <option>Cancelled</option>
                                                </select>

                                                {order.status === 'Shipped' && (
                                                    <div className="flex items-center space-x-2">
                                                        <Truck size={14} className="text-gray-400" />
                                                        <input
                                                            type="text"
                                                            placeholder="AWB / Tracking"
                                                            className="text-xs border-b border-gray-300 focus:border-royal-gold outline-none w-24 bg-transparent"
                                                            value={order.trackingId || ''}
                                                            onChange={(e) => handleTrackingUpdate(order.id, e.target.value)}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="6" className="p-8 text-center text-gray-400">No orders found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default OrderManager;
