import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showAuthError, setShowAuthError] = useState(false);

  useEffect(() => {
    const error = searchParams.get("auth_failed");
    if (error === "true") {
      setShowAuthError(true);

      const timer = setTimeout(() => {
        setShowAuthError(false);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  useEffect(() => {
    const userData = localStorage.getItem("mirage_user");
    if (userData) {
      navigate("/");
    }
  }, [navigate]);

  const handleDiscordLogin = () => {
    window.location.href = API_ENDPOINTS.DISCORD_LOGIN;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="w-full max-w-3xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl border border-[#a78bfa]/30 bg-transparent">
        <div className="flex-1 flex flex-col justify-center px-10 py-12 relative">
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              background:
                "linear-gradient(135deg, rgba(120,180,255,0.45), rgba(255,220,150,0.35)), url(/loginbackground.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="flex flex-col relative z-10">
            <div className="flex items-center justify-center mb-6 gap-3">
              <span
                className="text-2xl md:text-3xl font-extrabold tracking-widest select-none"
                style={{
                  color: "#FAF3E1",
                  textShadow: "0 2px 8px #F5E7C6",
                  letterSpacing: "2px",
                  fontFamily: "Josefin Sans, sans-serif",
                  userSelect: "none",
                }}
              >
                Mirage Store
              </span>
              <img
                src="/house.png"
                alt="Mirage Store Logo"
                className="w-10 h-10 object-contain select-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>

            <h1
              className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg"
              style={{ color: "#111", textShadow: "0 2px 12px rgba(0,0,0,0.07)" }}
            >
              Login To Your Account
            </h1>

            <p className="text-lg mb-8 font-medium" style={{ color: "#111" }}>
              Login with Discord to continue
            </p>

            <button
              onClick={handleDiscordLogin}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#5865F2]/90 to-[#a78bfa]/90 hover:from-[#a78bfa]/90 hover:to-[#5865F2]/90 text-black font-bold py-3 rounded-2xl border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
              aria-label="Login with Discord"
            >
              <img
                src="/discord_logo_black.ico"
                alt="Discord Logo"
                className="h-7 w-7 select-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              Login with Discord
            </button>

            <p className="mt-8 text-sm text-center" style={{ color: "#111" }}>
              By logging in, you agree to our{" "}
              <a href="#" className="custom-link">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="custom-link">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>

      {showAuthError && (
        <div
          style={{
            position: "fixed",
            top: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              animation: "dropAndRise 6s ease-in-out forwards",
              backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(255, 100, 100, 0.3)",
              borderRadius: "16px",
              padding: "24px",
              minWidth: "300px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                minWidth: "50px",
                borderRadius: "50%",
                border: "2.5px solid #ff6464",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                color: "#ff6464",
                fontWeight: "bold",
              }}
            >
              ✕
            </div>

            <p
              style={{
                color: "#ff6464",
                fontSize: "18px",
                fontWeight: "600",
                margin: 0,
                textAlign: "center",
                flex: 1,
              }}
            >
              Authentication Failed!
            </p>
          </div>
        </div>
      )}

      <style>{`
        .custom-link {
          text-decoration: underline;
          color: #111;
          transition: color 0.2s;
        }
        .custom-link:hover, .custom-link:focus {
          color: #888;
        }
      `}</style>
    </div>
  );
}
