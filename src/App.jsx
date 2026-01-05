import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import UserLayout from './components/layout/UserLayout';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import About from './pages/About';

// Admin imports
import AdminDashboard from './pages/AdminDashboard';
import InventoryManager from './pages/InventoryManager';
import OrderManager from './pages/OrderManager';
import CustomerManager from './pages/CustomerManager';
import ReviewsManager from './pages/ReviewsManager';
import AdminSettings from './pages/AdminSettings';
import AdminLogin from './pages/AdminLogin';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Placeholder components
const Contact = () => <div className="pt-24 text-center min-h-screen"><h1>Contact Us</h1><p>Coming Soon...</p></div>;

function App() {
  return (
    <CartProvider>
      <UserProvider>
        <Router>
          <Analytics />
          <Routes>
            {/* Public User Routes (Wrapped in UserLayout) */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Admin Routes (Standalone - No User Navbar) */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/inventory" element={
              <ProtectedRoute>
                <InventoryManager />
              </ProtectedRoute>
            } />
            <Route path="/admin/orders" element={
              <ProtectedRoute>
                <OrderManager />
              </ProtectedRoute>
            } />
            <Route path="/admin/customers" element={
              <ProtectedRoute>
                <CustomerManager />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            } />
            <Route path="/admin/reviews" element={
              <ProtectedRoute>
                <ReviewsManager />
              </ProtectedRoute>
            } />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </Router>
      </UserProvider>
    </CartProvider>
  );
}

export default App;
