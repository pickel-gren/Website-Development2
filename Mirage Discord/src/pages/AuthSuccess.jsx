import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

export default function AuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.AUTH_ME, {
          credentials: "include",
          method: "GET",
        });

        if (!response.ok) {
          navigate("/login?auth_failed=true");
          return;
        }

        const { user } = await response.json();
        localStorage.setItem("mirage_user", JSON.stringify(user));
        navigate("/");
      } catch (error) {
        console.error("Auth failed:", error);
        navigate("/login?auth_failed=true");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <div
          className="mb-6 mx-auto"
          style={{
            width: "60px",
            height: "60px",
            border: "4px solid rgba(255, 255, 255, 0.2)",
            borderTop: "4px solid #a78bfa",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <p className="text-xl font-medium">Logging you in...</p>
      </div>
    </div>
  );
}
