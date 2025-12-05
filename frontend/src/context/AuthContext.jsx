import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("ems_user");
      const savedToken = localStorage.getItem("ems_token");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      if (savedToken) {
        setToken(savedToken);
      }
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const login = ({ user, token }) => {
    setUser(user);
    setToken(token);

    localStorage.setItem("ems_user", JSON.stringify(user));
    localStorage.setItem("ems_token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("ems_user");
    localStorage.removeItem("ems_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
