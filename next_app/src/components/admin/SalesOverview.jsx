"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data for Demo


const SalesOverview = ({ data }) => {
    const [selectedRange, setSelectedRange] = React.useState('Last 7 Days');

    // Mock Data for "Last 7 Days"
    const salesDataWeek = [
        { date: 'Mon', sales: 4000, orders: 20 },
        { date: 'Tue', sales: 3000, orders: 15 },
        { date: 'Wed', sales: 5000, orders: 25 },
        { date: 'Thu', sales: 2780, orders: 12 },
        { date: 'Fri', sales: 6890, orders: 35 },
        { date: 'Sat', sales: 8390, orders: 45 },
        { date: 'Sun', sales: 9000, orders: 50 },
    ];

    // Mock Data for "Last Month" (intervals: 5, 10, 15, 20, 25, 30)
    const salesDataMonth = [
        { date: '5', sales: 4200, orders: 22 },
        { date: '10', sales: 3800, orders: 18 },
        { date: '15', sales: 5100, orders: 28 },
        { date: '20', sales: 4600, orders: 24 },
        { date: '25', sales: 6300, orders: 32 },
        { date: '30', sales: 7500, orders: 40 },
    ];

    // Mock Data for "Last Year" (Months)
    const salesDataYear = [
        { date: 'Jan', sales: 12000, orders: 80 },
        { date: 'Feb', sales: 15000, orders: 90 },
        { date: 'Mar', sales: 18000, orders: 110 },
        { date: 'Apr', sales: 21000, orders: 130 },
        { date: 'May', sales: 19000, orders: 115 },
        { date: 'Jun', sales: 24000, orders: 150 },
        { date: 'Jul', sales: 26000, orders: 160 },
        { date: 'Aug', sales: 23000, orders: 140 },
        { date: 'Sep', sales: 28000, orders: 175 },
        { date: 'Oct', sales: 31000, orders: 190 },
        { date: 'Nov', sales: 29000, orders: 180 },
        { date: 'Dec', sales: 35000, orders: 220 },
    ];

    // Determine which dataset to use
    const chartData = React.useMemo(() => {
        if (data && selectedRange === 'Last 7 Days') return data; // Use prop data only for default if provided
        switch (selectedRange) {
            case 'Last Month':
                return salesDataMonth;
            case 'Last Year':
                return salesDataYear;
            case 'Last 7 Days':
            default:
                return salesDataWeek;
        }
    }, [selectedRange, data]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-serif font-bold text-royal-dark">Revenue Trends</h3>
                <select
                    className="bg-gray-50 border-none text-sm rounded-lg p-2 text-gray-500 focus:ring-2 focus:ring-royal-gold/20 outline-none cursor-pointer"
                    value={selectedRange}
                    onChange={(e) => setSelectedRange(e.target.value)}
                >
                    <option>Last 7 Days</option>
                    <option>Last Month</option>
                    <option>Last Year</option>
                </select>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%" key={selectedRange}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            tickFormatter={(value) => `₹${value}`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ stroke: '#D97706', strokeWidth: 1, strokeDasharray: '3 3' }}
                            formatter={(value) => [`₹${value}`, 'Revenue']}
                        />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#059669"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#059669', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, fill: '#D97706' }}
                            animationDuration={1000}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesOverview;
