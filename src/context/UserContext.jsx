import React, { createContext, useContext, useState, useEffect } from 'react';
import { emailService } from '../services/emailService';
import { mockBackend } from '../services/mockBackend';

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



    const login = async (email, name) => {
        const newUser = {
            name: name || 'Guest User',
            email: email,
            phone: '+91 98765 43210',
            avatar: `https://ui-avatars.com/api/?name=${name || 'User'}&background=064e3b&color=fff`
        };
        setUser(newUser);
        localStorage.setItem('mukhwas_user', JSON.stringify(newUser));

        // Use EmailJS service
        await emailService.sendLoginNotification(email, newUser.name);

        return true;
    };

    const signup = async (email, name, password) => {
        try {
            const newUser = {
                name: name,
                email: email,
                password: password, // Storing mock password
                phone: '',
                avatar: `https://ui-avatars.com/api/?name=${name}&background=064e3b&color=fff`
            };

            // Register in DB (Will throw if duplicate)
            mockBackend.registerUser(newUser);

            // Set Session
            setUser(newUser);
            localStorage.setItem('mukhwas_user', JSON.stringify(newUser));

            // Send Welcome Email
            await emailService.sendWelcomeEmail(email, name);

            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
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
        <UserContext.Provider value={{ user, login, signup, logout, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
