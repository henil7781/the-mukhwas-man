import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check local storage on load
        const storedUser = localStorage.getItem('mukhwas_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email, name) => {
        const newUser = {
            name: name || 'Guest User',
            email: email,
            phone: '+91 98765 43210',
            avatar: `https://ui-avatars.com/api/?name=${name || 'User'}&background=064e3b&color=fff`
        };
        setUser(newUser);
        localStorage.setItem('mukhwas_user', JSON.stringify(newUser));

        // Simulating Email Sending
        console.log(`
        ----------------------------------------------------
        📧 MOCK BACKEND: Sending Welcome Email to ${email}...
        ----------------------------------------------------
        Subject: Welcome to the Royal Family, ${newUser.name}! 👑
        
        Dear ${newUser.name},
        
        Thank you for joining 'The Mukhwas Man'. We are delighted to have you with us.
        Get ready to explore the finest collection of handcrafted digestive blends.
        
        As a royal member, you have unlocked access to exclusive offers.
        
        Cheers,
        The Mukhwas Man Team.
        ----------------------------------------------------
        `);

        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('mukhwas_user');
    };

    const updateUser = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('mukhwas_user', JSON.stringify(updatedUser));
    };

    return (
        <UserContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
