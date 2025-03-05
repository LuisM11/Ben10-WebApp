import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null,
  );
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));
        if (payload.exp * 1000 > Date.now()) {
          return storedToken;
        }
      } catch (error) {
        console.error("Error validando token almacenado:", error);
      }
    }
    return "";
  });

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
      setUser({ id: data.id, username: data.username });
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

  const isTokenExpired = () => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, token, userType, login, logout, register, isTokenExpired }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
