import React, { createContext, useState, useContext } from "react";

// Tạo context để quản lý trạng thái đăng nhập
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext); // Hook giúp sử dụng context dễ dàng

export const AuthProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(false); // Trạng thái đăng nhập

  const login = () => setLoginStatus(true);
  const logout = () => setLoginStatus(false);

  return (
    <AuthContext.Provider value={{ loginStatus, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
