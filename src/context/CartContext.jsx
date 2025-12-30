import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockBackend } from '../services/mockBackend'; // Import backend for live checks

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);

    // Retrieve cart from local storage AND sync with latest inventory
    useEffect(() => {
        const savedCart = localStorage.getItem('mukhwasManCart');
        if (savedCart) {
            let parsedCart = JSON.parse(savedCart);

            // SYNC with Live Inventory (mockBackend)
            // This prevents "Stale Cart" issues where Cart says "3 left" but Inventory says "49"
            const liveInventory = mockBackend.getInventory();

            parsedCart = parsedCart.map(cartItem => {
                const liveProduct = liveInventory.find(p => p.id === cartItem.id);
                if (liveProduct) {
                    // Update vital details that might have changed
                    return {
                        ...cartItem,
                        stock: liveProduct.stock,
                        price: liveProduct.price,
                        name: liveProduct.name // in case name changed
                    };
                }
                return cartItem; // Keep as-is if not found (or remove? safe to keep for now)
            });

            setCartItems(parsedCart);
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('mukhwasManCart', JSON.stringify(cartItems));
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setCartTotal(total);
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        // 1. Fetch LIVE inventory to ensure we have the absolute latest stock value
        const liveInventory = mockBackend.getInventory();
        const liveProduct = liveInventory.find(p => p.id === product.id);

        // If product doesn't exist in backend (rare edge case), fallback to product prop or 0
        const currentStock = liveProduct && liveProduct.stock !== undefined ? liveProduct.stock : (product.stock || 50);

        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                // Calculate potential new quantity
                const newQuantity = existingItem.quantity + quantity;

                // STRICT CHECK: Ensure we don't exceed stock
                if (newQuantity > currentStock) {
                    // Start: return existing items unchanged (or maybe clamp to max? let's prevent for now and show warning in UI if we could)
                    // For now, we will Clamp to Max Stock.
                    return prevItems.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: currentStock }
                            : item
                    );
                }

                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            } else {
                // New Item Check
                if (currentStock === 0) return prevItems; // Safety: Don't add if 0 stock

                if (quantity > currentStock) {
                    return [...prevItems, { ...product, quantity: currentStock }];
                }
                return [...prevItems, { ...product, quantity }];
            }
        });
        setIsCartOpen(true); // Open drawer on add
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, type) => {
        setCartItems(prevItems => prevItems.map(item => {
            if (item.id === itemId) {
                const newQuantity = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }));
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('mukhwasManCart');
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            cartTotal,
            addToCart,
            removeFromCart,
            updateQuantity,
            toggleCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
