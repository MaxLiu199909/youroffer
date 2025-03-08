import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Try to get auth state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true';
  });
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Update localStorage when auth state changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [isAuthenticated, user]);

  // Login function - accepts any username and password
  const login = (email, password) => {
    // Create a user object with the provided email
    const newUser = {
      email,
      name: email.split('@')[0], // Use part of email as name if no name is provided
      avatar: email.charAt(0).toUpperCase(), // First letter as avatar
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.setItem('isAuthenticated', 'false');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};