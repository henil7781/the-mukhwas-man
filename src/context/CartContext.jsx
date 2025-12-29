import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartTotal, setCartTotal] = useState(0);

    // Retrieve cart from local storage on load
    useEffect(() => {
        const savedCart = localStorage.getItem('mukhwasManCart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('mukhwasManCart', JSON.stringify(cartItems));
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setCartTotal(total);
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
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

    return (
        <CartContext.Provider value={{
            cartItems,
            isCartOpen,
            cartTotal,
            addToCart,
            removeFromCart,
            updateQuantity,
            toggleCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
