import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = async (credentials) => {
    // example: POST /login {email,password} => {token,user}
    const res = await api.post("/login", credentials);
    const { token, user: userData } = res.data;
    localStorage.setItem("token", token);
    setUser(userData);
    return userData;
  };

  const register = async (payload) => {
    const res = await api.post("/register", payload);
    const { token, user: userData } = res.data;
    localStorage.setItem("token", token);
    setUser(userData);
    return userData;
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {
      // ignore network errors on logout
    }
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}
