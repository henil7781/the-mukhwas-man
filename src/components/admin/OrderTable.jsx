import React, { useState } from 'react';
import { Truck, CheckCircle, Clock, Printer, FileText, ChevronDown, Save } from 'lucide-react';
import { mockBackend } from '../../services/mockBackend';

const OrderTable = ({ orders: initialOrders }) => {
    const [orders, setOrders] = useState(initialOrders);
    const [editingId, setEditingId] = useState(null);
    const [tempTracking, setTempTracking] = useState('');

    // Sync local state with props when parent re-fetches
    React.useEffect(() => {
        setOrders(initialOrders);
    }, [initialOrders]);

    if (!orders || orders.length === 0) {
        return (
            <div className="text-center py-10 bg-white rounded-xl shadow-sm border border-gray-100">
                <p className="text-gray-500">No recent orders found.</p>
            </div>
        )
    }

    const handleStatusChange = (id, newStatus) => {
        // Optimistic Update & Backend Call
        setOrders(orders.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        ));
        mockBackend.updateOrderStatus(id, newStatus);
    };

    const saveTracking = (id) => {
        mockBackend.updateTrackingId(id, tempTracking);
        setOrders(orders.map(order =>
            order.id === id ? { ...order, trackingId: tempTracking } : order
        ));
        setEditingId(null);
    };

    const handlePrintInvoice = (order) => {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
        <html>
            <head>
                <title>Invoice #${order.id}</title>
                <style>
                    body { font-family: sans-serif; padding: 40px; }
                    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #064e3b; padding-bottom: 20px; }
                    .logo { font-size: 24px; font-weight: bold; color: #064e3b; }
                    .details { margin-top: 40px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                    th { background-color: #f8f9fa; }
                    .total { margin-top: 20px; font-size: 20px; font-weight: bold; text-align: right; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="logo">The Mukhwas Man</div>
                    <div>
                        <p>Invoice #${order.id}</p>
                        <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
                    </div>
                </div>
                <div class="details">
                    <p><strong>Bill To:</strong> ${order.customerName}<br>${order.location}</p>
                </div>
                <table>
                    <thead>
                        <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${item.qty}</td>
                                <td>--</td> 
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div class="total">Total: ₹${order.total}</div>
                <script>window.print();</script>
            </body>
        </html>
    `);
        printWindow.document.close();
    };

    const statusColors = {
        'Pending': 'bg-amber-100 text-amber-800 border-amber-200',
        'Packed': 'bg-purple-100 text-purple-800 border-purple-200',
        'Shipped': 'bg-blue-100 text-blue-800 border-blue-200',
        'Delivered': 'bg-emerald-100 text-emerald-800 border-emerald-200',
        'Cancelled': 'bg-red-100 text-red-800 border-red-200',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-serif font-bold text-royal-dark text-lg">Recent Orders</h3>
                <button className="text-sm text-royal-gold font-bold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-4 font-semibold">Order ID</th>
                            <th className="p-4 font-semibold">Customer</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold">Tracking</th>
                            <th className="p-4 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
                                <td className="p-4 font-mono text-sm text-royal-green font-medium">#{order.id}</td>
                                <td className="p-4">
                                    <div className="font-bold text-gray-800 text-sm">{order.customerName}</div>
                                    <div className="text-xs text-gray-400">{order.location}</div>
                                </td>

                                <td className="p-4">
                                    <div className="relative w-32">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className={`w-full appearance-none pl-3 pr-8 py-1.5 rounded-full text-xs font-bold border cursor-pointer outline-none transition-all ${statusColors[order.status] || 'bg-gray-100'}`}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Packed">Packed</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                        <ChevronDown className={`w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50`} />
                                    </div>
                                </td>

                                <td className="p-4 max-w-xs">
                                    {editingId === order.id ? (
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                value={tempTracking}
                                                onChange={(e) => setTempTracking(e.target.value)}
                                                placeholder="AWB Number"
                                                className="w-24 px-2 py-1 text-xs border rounded bg-white"
                                            />
                                            <button onClick={() => saveTracking(order.id)} className="text-green-600 hover:text-green-800">
                                                <Save size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => { setEditingId(order.id); setTempTracking(order.trackingId || ''); }}
                                            className="text-xs text-gray-500 cursor-pointer hover:text-royal-gold hover:underline flex items-center"
                                        >
                                            {order.trackingId ? (
                                                <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">{order.trackingId}</span>
                                            ) : (
                                                <span>Add Tracking</span>
                                            )}
                                        </div>
                                    )}
                                </td>

                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => handlePrintInvoice(order)}
                                        className="p-2 hover:bg-royal-green/10 rounded-lg text-gray-400 hover:text-royal-green transition-colors"
                                        title="Print Invoice"
                                    >
                                        <Printer size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderTable;
