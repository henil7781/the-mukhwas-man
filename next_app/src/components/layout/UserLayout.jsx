import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import SideCart from '../cart/SideCart';

const UserLayout = () => {
    return (
        <div className="flex flex-col min-h-screen relative">
            <Navbar />
            <SideCart /> {/* Global Side Drawer */}
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default UserLayout;
