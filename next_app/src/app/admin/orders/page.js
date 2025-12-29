"use client";

import React, { useState, useEffect } from 'react';
import OrderTable from '@/components/admin/OrderTable';
import { mockBackend } from '@/services/mockBackend';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetch
        const refreshOrders = () => {
            const allOrders = mockBackend.getOrders();
            setOrders(allOrders);
            setLoading(false);
        };

        refreshOrders();
        // Poll for updates in this specific view
        const interval = setInterval(refreshOrders, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div>Loading Orders...</div>;

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-lg text-gray-600">Track and manage all customer orders.</h2>
            </div>
            <OrderTable orders={orders} />
        </div>
    );
}
