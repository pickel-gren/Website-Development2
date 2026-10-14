import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../config/api";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncCurrentUser = () => {
    const savedUser = localStorage.getItem("mirage_user");
    setUser(savedUser ? JSON.parse(savedUser) : null);
  };

  useEffect(() => {
    syncCurrentUser();

    const onStorage = () => {
      syncCurrentUser();
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const fetchMe = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH_ME, {
        credentials: "include",
        method: "GET",
      });

      if (!response.ok) {
        setUser(null);
        localStorage.removeItem("mirage_user");
        return null;
      }

      const { user } = await response.json();
      localStorage.setItem("mirage_user", JSON.stringify(user));
      setUser(user);
      return user;
    } catch (error) {
      console.error("Failed to load user:", error);
      setUser(null);
      localStorage.removeItem("mirage_user");
      return null;
    }
  };

  useEffect(() => {
    fetchMe().finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    try {
      await fetch(API_ENDPOINTS.AUTH_LOGOUT, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("mirage_user");
      setUser(null);
    }
  };

  return { user, setUser, loading, logout, fetchMe };
}
