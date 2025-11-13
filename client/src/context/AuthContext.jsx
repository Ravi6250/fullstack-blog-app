// client/src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // You need to install this package

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // State to hold the authentication token. It's initialized from localStorage.
    const [token, setToken] = useState(localStorage.getItem('token'));
    // State to hold the decoded user data from the token.
    const [user, setUser] = useState(null);
    // State to track if we are still checking the initial token.
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // This effect runs whenever the token changes.
        if (token) {
            try {
                // Decode the token to get user data (userId, username) and expiration
                const decodedUser = jwtDecode(token);
                // Check if the token is expired
                const isExpired = decodedUser.exp * 1000 < Date.now();
                if (isExpired) {
                    logout(); // If expired, log the user out
                } else {
                    setUser(decodedUser);
                    localStorage.setItem('token', token);
                }
            } catch (error) {
                // If token is invalid, logout
                logout();
            }
        } else {
            setUser(null);
            localStorage.removeItem('token');
        }
        setLoading(false);
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
    };

    const logout = () => {
        setToken(null);
    };

    // The value provided to all consuming components
    const contextValue = {
        user,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!token, // A handy boolean to check if logged in
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        // CORRECT
      </AuthContext.Provider>
    );
};

export default AuthContext;