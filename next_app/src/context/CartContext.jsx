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
            // Default to high stock if not specified (e.g. 50)
            const availableStock = product.stock !== undefined ? product.stock : 50;

            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;
                if (newQuantity > availableStock) {
                    // Clamp to max stock
                    return prevItems.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: availableStock }
                            : item
                    );
                }
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            } else {
                if (quantity > availableStock) {
                    // Clamp to max stock
                    return [...prevItems, { ...product, quantity: availableStock }];
                }
                return [...prevItems, { ...product, quantity }];
            }
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, type) => {
        setCartItems(prevItems => prevItems.map(item => {
            if (item.id === itemId) {
                const availableStock = item.stock !== undefined ? item.stock : 50;

                if (type === 'inc') {
                    if (item.quantity + 1 > availableStock) {
                        return { ...item, quantity: availableStock }; // Clamp
                    }
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item.quantity - 1 > 0 ? { ...item, quantity: item.quantity - 1 } : item;
                }
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
