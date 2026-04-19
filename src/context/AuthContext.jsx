import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password, role = 'admin') => {
        // Simulate login
        const userData = {
            id: 1,
            email,
            name: role === 'admin' ? 'Admin User' : 'Regular User',
            role,
            avatar: `https://ui-avatars.com/api/?name=${role === 'admin' ? 'Admin+User' : 'Regular+User'}&background=6366f1&color=fff`,
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};