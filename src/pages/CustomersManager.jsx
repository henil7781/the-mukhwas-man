import React, { useState, useEffect } from 'react';
import React from 'react';
import { mockBackend } from '../services/mockBackend';
import { Search, Trash2, User, Clock, Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomersManager = () => {
    const [users, setUsers] = useState([]);
    const [analytics, setAnalytics] = useState({ totalUsers: 0, chartData: [] });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const allUsers = mockBackend.getUsers();
        const analyticsData = mockBackend.getUserAnalytics();

        // Add mock "Time Spent" data for demo visualization
        const usersWithMockData = allUsers.map(u => ({
            ...u,
            timeSpent: Math.floor(Math.random() * 60) + ' mins', // Mocking 0-60 mins
            sessions: Math.floor(Math.random() * 10) + 1
        }));

        setUsers(usersWithMockData);
        setAnalytics(analyticsData);
    };

    const handleDelete = (email) => {
        if (window.confirm(`Are you sure you want to delete user ${email}?`)) {
            // In a real app we'd have a deleteUser method. 
            // For mock, we'll just filter and save.
            const updatedUsers = users.filter(u => u.email !== email);
            localStorage.setItem('mukhwas_users_db', JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
            alert("User deleted.");
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-royal-dark">Customer Database</h1>
                    <p className="text-gray-500">Manage your registered users and view analytics.</p>
                </div>
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Total Users</h3>
                        <User className="text-royal-gold w-6 h-6" />
                    </div>
                    <p className="text-3xl font-bold text-royal-dark">{analytics.totalUsers}</p>
                    <p className="text-green-500 text-sm mt-2 flex items-center">
                        <TrendingUp size={14} className="mr-1" /> All time
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
                    <h3 className="text-gray-800 font-bold mb-4">New Users (Last 7 Days)</h3>
                    <div className="h-48 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analytics.chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    cursor={{ fill: 'rgba(234, 179, 8, 0.1)' }}
                                />
                                <Bar dataKey="count" fill="#EAB308" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-bold text-lg text-royal-dark">Registered Users</h2>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-royal-gold text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left bg-white">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Joined At</th>
                                <th className="px-6 py-4">Avg. Time Spent</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                                                    alt=""
                                                    className="w-10 h-10 rounded-full mr-3"
                                                />
                                                <div>
                                                    <p className="font-bold text-gray-800">{user.name}</p>
                                                    <p className="text-xs text-gray-400 font-mono">{user.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600">{user.email}</p>
                                            <p className="text-xs text-gray-400">{user.phone || 'N/A'}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <Calendar size={14} className="mr-2 text-gray-400" />
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <Clock size={14} className="mr-2 text-royal-gold" />
                                                {user.timeSpent}
                                            </div>
                                            <p className="text-xs text-gray-400 pl-6">{user.sessions} sessions</p>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(user.email)}
                                                className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                                title="Delete User"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                        No users found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustomersManager;
