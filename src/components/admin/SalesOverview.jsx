import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Data for Demo
const salesData = [
    { date: 'Mon', sales: 4000, orders: 20 },
    { date: 'Tue', sales: 3000, orders: 15 },
    { date: 'Wed', sales: 5000, orders: 25 },
    { date: 'Thu', sales: 2780, orders: 12 },
    { date: 'Fri', sales: 6890, orders: 35 },
    { date: 'Sat', sales: 8390, orders: 45 },
    { date: 'Sun', sales: 9000, orders: 50 },
];

const SalesOverview = ({ data }) => {
    // Use passed data or fallback to demo data if null (e.g. first load)
    const chartData = data || salesData;
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-serif font-bold text-royal-dark">Revenue Trends</h3>
                <select className="bg-gray-50 border-none text-sm rounded-lg p-2 text-gray-500">
                    <option>Last 7 Days</option>
                    <option>Last Month</option>
                    <option>Last Year</option>
                </select>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `₹${value}`} />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ stroke: '#D97706', strokeWidth: 1, strokeDasharray: '3 3' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            stroke="#059669"
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#059669', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, fill: '#D97706' }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SalesOverview;
