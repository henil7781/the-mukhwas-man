import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import { mockBackend } from '../services/mockBackend';
import { Search, Filter, AlertCircle, CheckCircle, Package, Edit2, Save, X } from 'lucide-react';

const InventoryManager = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, low, out
    const [searchTerm, setSearchTerm] = useState('');

    // Edit State
    const [editItem, setEditItem] = useState(null); // The item being edited
    const [editFormData, setEditFormData] = useState({ stock: 0, lowStockThreshold: 0 });
    const [notification, setNotification] = useState(null); // { type: 'success', message: '' }

    useEffect(() => {
        loadInventory();
    }, []);

    // Auto-dismiss notification
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const loadInventory = () => {
        // Simulate delay
        setTimeout(() => {
            const data = mockBackend.getInventory();
            setInventory(data);
            setLoading(false);
        }, 500);
    };

    const handleEditClick = (item) => {
        setEditItem(item);
        setEditFormData({ stock: item.stock, lowStockThreshold: item.lowStockThreshold });
    };

    const handleSave = () => {
        const updatedInventory = mockBackend.updateProduct(editItem.id, editFormData);
        setInventory(updatedInventory); // Instant update from backend return
        setEditItem(null);
    };

    const filteredInventory = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        if (!matchesSearch) return false;

        if (filter === 'low') return item.stock <= item.lowStockThreshold && item.stock > 0;
        if (filter === 'out') return item.stock === 0;
        return true;
    });

    const getStockStatus = (item) => {
        if (item.stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700 border-red-200', barColor: 'bg-red-500' };
        if (item.stock <= item.lowStockThreshold) return { label: 'Low Stock', color: 'bg-orange-100 text-orange-700 border-orange-200', barColor: 'bg-orange-500' };
        return { label: 'In Stock', color: 'bg-green-100 text-green-700 border-green-200', barColor: 'bg-green-500' };
    };

    return (
        <AdminLayout title="Inventory Management" subtitle="Track, Restock, and Manage your products.">

            {/* HEADER CONTROLS */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">

                {/* Search */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filters */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    {['all', 'low', 'out'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === f ? 'bg-white text-royal-dark shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {f === 'all' ? 'All Items' : f === 'low' ? 'Low Stock' : 'Out of Stock'}
                        </button>
                    ))}
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Product Name</th>
                                <th className="p-4 text-center">Stock Level</th>
                                <th className="p-4 text-center">Qty</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-400">Loading inventory...</td></tr>
                            ) : filteredInventory.length > 0 ? (
                                filteredInventory.map(item => {
                                    const status = getStockStatus(item);
                                    // Calculate percentage for progress bar (cap at 100 for visuals)
                                    const percentage = Math.min(100, (item.stock / 100) * 100);

                                    return (
                                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-royal-gold">
                                                        <Package size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-800">{item.name}</p>
                                                        <p className="text-xs text-gray-500">ID: #{item.id}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Stock Progress Bar */}
                                            <td className="p-4 w-48">
                                                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                                    <div
                                                        className={`h-2.5 rounded-full ${status.barColor}`}
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                    <span>0</span>
                                                    <span>100+</span>
                                                </div>
                                            </td>

                                            <td className="p-4 text-center font-mono font-bold text-gray-700">
                                                {item.stock}
                                            </td>

                                            <td className="p-4 text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.color}`}>
                                                    {status.label}
                                                </span>
                                            </td>

                                            <td className="p-4 text-center">
                                                <button
                                                    onClick={() => handleEditClick(item)}
                                                    className="p-2 text-gray-400 hover:text-royal-gold hover:bg-royal-gold/10 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-400">No items found matching your filters.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* EDIT MODAL */}
            {editItem && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setEditItem(null)}></div>

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-serif text-lg font-bold text-royal-dark">Update Inventory</h3>
                            <button onClick={() => setEditItem(null)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                            <div className="p-6 space-y-4">
                                <p className="text-gray-500 text-sm">Update stock levels for <strong className="text-gray-800">{editItem.name}</strong>.</p>




                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Current Stock</label>
                                    <input
                                        type="number"
                                        autoFocus
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royal-gold/20 focus:border-royal-gold outline-none transition-all"
                                        value={editFormData.stock}
                                        onChange={(e) => setEditFormData({ ...editFormData, stock: parseInt(e.target.value) || 0 })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royal-gold/20 focus:border-royal-gold outline-none transition-all"
                                        value={editFormData.price}
                                        onChange={(e) => setEditFormData({ ...editFormData, price: parseInt(e.target.value) || 0 })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Low Stock Alert Threshold</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royal-gold/20 focus:border-royal-gold outline-none transition-all"
                                        value={editFormData.lowStockThreshold}
                                        onChange={(e) => setEditFormData({ ...editFormData, lowStockThreshold: parseInt(e.target.value) || 0 })}
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Alerts will trigger when stock drops below this number.</p>
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50/50">
                                <button
                                    type="button"
                                    onClick={() => setEditItem(null)}
                                    className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-royal-dark text-white font-bold rounded-lg hover:bg-royal-green flex items-center shadow-lg shadow-royal-green/20 transition-all active:scale-95 cursor-pointer"
                                >
                                    <Save size={16} className="mr-2" /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </AdminLayout>
    );
};

export default InventoryManager;
