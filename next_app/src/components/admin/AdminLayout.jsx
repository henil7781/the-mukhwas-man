import React, { useState } from 'react';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, Package, Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminLayout = ({ children, title, subtitle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const SidebarContent = () => (
        <>
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <div>
                    <h2 className="font-serif text-xl font-bold text-royal-gold">Mukhwas Man</h2>
                    <span className="text-xs text-gray-400 tracking-wider uppercase">Admin Panel</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white">
                    <X size={24} />
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                <button
                    onClick={() => navigate('/admin')}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg font-medium transition-colors ${isActive('/admin') ? 'bg-royal-green/20 text-royal-gold' : 'text-gray-300 hover:bg-white/5'}`}
                >
                    <LayoutDashboard size={20} /> <span>Dashboard</span>
                </button>
                <button
                    onClick={() => navigate('/admin/orders')}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg font-medium transition-colors ${isActive('/admin/orders') ? 'bg-royal-green/20 text-royal-gold' : 'text-gray-300 hover:bg-white/5'}`}
                >
                    <ShoppingBag size={20} /> <span>Orders</span>
                </button>
                <button
                    onClick={() => navigate('/admin/inventory')}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg font-medium transition-colors ${isActive('/admin/inventory') ? 'bg-royal-green/20 text-royal-gold' : 'text-gray-300 hover:bg-white/5'}`}
                >
                    <Package size={20} /> <span>Inventory</span>
                </button>
                <button
                    onClick={() => navigate('/admin/customers')}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg font-medium transition-colors ${isActive('/admin/customers') ? 'bg-royal-green/20 text-royal-gold' : 'text-gray-300 hover:bg-white/5'}`}
                >
                    <Users size={20} /> <span>Customers</span>
                </button>
                <button
                    onClick={() => navigate('/admin/settings')}
                    className={`flex items-center space-x-3 w-full p-3 rounded-lg font-medium transition-colors ${isActive('/admin/settings') ? 'bg-royal-green/20 text-royal-gold' : 'text-gray-300 hover:bg-white/5'}`}
                >
                    <Settings size={20} /> <span>Settings</span>
                </button>
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => {
                        localStorage.removeItem('isAdmin');
                        navigate('/admin/login');
                    }}
                    className="flex items-center space-x-3 w-full p-3 text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                >
                    <LogOut size={20} /> <span>Logout</span>
                </button>
            </div>
        </>
    );

    return (
        <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

            {/* Desktop Sidebar */}
            <aside className="w-64 bg-royal-dark text-white hidden md:flex flex-col">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div className="fixed inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)}></div>
                    <aside className="relative w-64 bg-royal-dark text-white flex flex-col h-full shadow-2xl animate-in slide-in-from-left duration-300">
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-4 md:p-8">
                    <header className="flex justify-between items-center mb-8">
                        <div className="flex items-center space-x-4">
                            {/* Mobile Menu Button */}
                            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-800 p-1">
                                <Menu size={24} />
                            </button>
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title || 'Welcome'}</h1>
                                {subtitle && <p className="text-gray-500 text-xs md:text-sm hidden sm:block">{subtitle}</p>}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-royal-gold flex items-center justify-center text-white font-bold">OM</div>
                        </div>
                    </header>

                    {children}

                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
