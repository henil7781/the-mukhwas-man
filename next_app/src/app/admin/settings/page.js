"use client";

import React, { useState, useEffect } from 'react';
import { Save, Bell, Shield, Store, AlertTriangle } from 'lucide-react';

export default function AdminSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState({
        storeName: 'The Mukhwas Man',
        supportEmail: 'support@mukhwasman.com',
        lowStockThreshold: 10,
        enableEmailNotifications: true,
        enableSoundAlerts: false,
        maintenanceMode: false
    });

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        // Load settings from localStorage if available
        const savedSettings = localStorage.getItem('adminSettings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network request
        setTimeout(() => {
            localStorage.setItem('adminSettings', JSON.stringify(settings));
            setIsLoading(false);
            setShowSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);
        }, 800);
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-lg text-gray-600">Manage your store preferences and configurations.</h2>
            </div>

            <form onSubmit={handleSave} className="max-w-4xl mx-auto space-y-6">

                {/* General Store Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Store size={20} />
                        </div>
                        <h3 className="font-bold text-gray-800">General Information</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                            <input
                                type="text"
                                name="storeName"
                                value={settings.storeName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royal-gold outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                            <input
                                type="email"
                                name="supportEmail"
                                value={settings.supportEmail}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royal-gold outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Inventory Configuration */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <AlertTriangle size={20} />
                        </div>
                        <h3 className="font-bold text-gray-800">Inventory Alerts</h3>
                    </div>
                    <div className="p-6">
                        <div className="max-w-md">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Global Low Stock Threshold</label>
                            <div className="flex items-center space-x-4">
                                <input
                                    type="number"
                                    name="lowStockThreshold"
                                    value={settings.lowStockThreshold}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-royal-gold outline-none"
                                />
                                <span className="text-sm text-gray-500 whitespace-nowrap">units</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Products below this quantity will trigger a low stock alert on the dashboard.</p>
                        </div>
                    </div>
                </div>

                {/* Notifications & System */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center space-x-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Bell size={20} />
                        </div>
                        <h3 className="font-bold text-gray-800">Notifications & System</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">Email Notifications</p>
                                <p className="text-sm text-gray-500">Receive alerts for new orders.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="enableEmailNotifications" checked={settings.enableEmailNotifications} onChange={handleChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-royal-green"></div>
                            </label>
                        </div>
                        <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-800">Maintenance Mode</p>
                                <p className="text-sm text-gray-500">Temporarily disable the public shop.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-royal-gold"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-end space-x-4">
                    {showSuccess && (
                        <span className="text-green-600 font-medium animate-fade-in">Settings saved successfully!</span>
                    )}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center space-x-2 bg-royal-dark hover:bg-black text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <Save size={20} />
                                <span>Save Changes</span>
                            </>
                        )}
                    </button>
                </div>

            </form>
        </div>
    );
};
