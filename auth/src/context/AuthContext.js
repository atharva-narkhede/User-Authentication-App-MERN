import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser(userInfo);
      setIsAuth(true);
      // Set axios default authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
    }
  }, []);

  const login = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
    setIsAuth(true);
    // Set axios default authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    setIsAuth(false);
    // Remove axios default authorization header
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
