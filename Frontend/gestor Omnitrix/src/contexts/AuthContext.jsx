import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null,
  );
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [userType, setUserType] = useState(
    () => localStorage.getItem("userType") || "",
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userType", userType);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
    }
  }, [token, user, userType]);

  const login = async (username, password) => {
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await res.json();
      setToken(data.token);
      setUser({ id: data.id, username: data.username }); // Guarda el userId globalmente
      setUserType(data.userType);
    } catch (error) {
      console.error("Error en login:", error.message);
      throw error;
    }
  };

  const logout = () => {
    setToken("");
    setUser(null);
    setUserType("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
  };

  const register = async (username, password) => {
    try {
      const res = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, userType: "COMMON" }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error en el registro");
      }

      return await res.json();
    } catch (error) {
      console.error("Error en registro:", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, userType, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
