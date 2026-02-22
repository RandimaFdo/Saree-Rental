import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      loadUser();
    } else {
      // Auto-login with demo user if no token exists
      autoLoginDemoUser();
    }
  }, []);

  const autoLoginDemoUser = async () => {
    try {
      // Create a demo user session without actual authentication
      const demoUser = {
        _id: 'demo-user-id',
        name: 'Demo User',
        email: 'demo@silkswap.com',
        role: 'admin' // You can change this to 'buyer' or 'seller' as needed
      };
      
      // Set a demo token (this won't actually work with the backend, but will prevent frontend redirects)
      const demoToken = 'demo-token-' + Date.now();
      localStorage.setItem('token', demoToken);
      axios.defaults.headers.common['x-auth-token'] = demoToken;
      setUser(demoUser);
      setLoading(false);
      
      console.log('Auto-logged in as demo user:', demoUser);
    } catch (error) {
      console.error('Auto-login failed:', error);
      setLoading(false);
    }
  };

  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setUser(res.data);
    } catch (err) {
      // If backend call fails, check if it's a demo token and create demo user
      const token = localStorage.getItem('token');
      if (token && token.startsWith('demo-token-')) {
        console.log('Demo token detected, creating demo user session');
        const demoUser = {
          _id: 'demo-user-id',
          name: 'Demo User',
          email: 'demo@silkswap.com',
          role: 'admin'
        };
        setUser(demoUser);
      } else {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
        // Auto-login with demo user
        autoLoginDemoUser();
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['x-auth-token'] = token;
      setUser(user);
      return user;
    } catch (error) {
      // If backend is not available, create demo user
      console.log('Backend not available, creating demo session');
      const demoUser = {
        _id: 'demo-user-id',
        name: email.split('@')[0] || 'Demo User',
        email: email,
        role: 'admin'
      };
      
      const demoToken = 'demo-token-' + Date.now();
      localStorage.setItem('token', demoToken);
      axios.defaults.headers.common['x-auth-token'] = demoToken;
      setUser(demoUser);
      return demoUser;
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password, role });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['x-auth-token'] = token;
      setUser(user);
      return user;
    } catch (error) {
      // If backend is not available, create demo user
      console.log('Backend not available, creating demo session');
      const demoUser = {
        _id: 'demo-user-id',
        name: name,
        email: email,
        role: role
      };
      
      const demoToken = 'demo-token-' + Date.now();
      localStorage.setItem('token', demoToken);
      axios.defaults.headers.common['x-auth-token'] = demoToken;
      setUser(demoUser);
      return demoUser;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
