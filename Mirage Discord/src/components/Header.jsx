import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { clearLocationPersistence } from "../hooks/useLocationPersistence";

export default function Header({
  cart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  className,
}) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    await logout();
    clearLocationPersistence();
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  const handleCartClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsCartOpen(!isCartOpen);
  };

  return (
    <header
      className={`w-full px-6 py-4 flex items-center justify-between backdrop-blur-lg border-b border-white/10 sticky top-0 z-50 ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
      }}
      data-header
    >
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="/house.png"
          alt="Mirage Store"
          className="w-8 h-8 object-contain select-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <span
          className="text-xl font-extrabold text-white tracking-wider"
          style={{
            fontFamily: "'Josefin Sans', sans-serif",
            textShadow: "0 2px 8px rgba(255, 255, 255, 0.3)",
          }}
        >
          Mirage Store
        </span>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={handleCartClick}
          className="relative p-2 rounded-lg hover:bg-white/10 transition-all"
          aria-label="Shopping Cart"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61l1.38-7.39H6"
            />
          </svg>

          {cart?.items?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cart.items.length}
            </span>
          )}
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full object-cover border border-white/20"
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            />
            <span className="text-white font-semibold hidden sm:inline text-sm">
              {user.username}
            </span>

            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-600 text-white font-semibold transition-all text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-lg bg-[#5865F2]/80 hover:bg-[#5865F2] text-white font-semibold transition-all text-sm"
          >
            Login
          </button>
        )}
      </div>

      {isCartOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsCartOpen(false)}
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        />
      )}

      {isCartOpen && (
        <div
          className="fixed right-0 top-0 h-full w-full max-w-md bg-white/10 backdrop-blur-xl border-l border-white/20 shadow-2xl overflow-y-auto z-50"
          style={{ animation: "slideInRight 0.3s ease-out" }}
        >
          <div className="sticky top-0 bg-white/10 backdrop-blur-xl p-6 border-b border-white/20 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-white">Your Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-white/70 hover:text-white transition-all"
              aria-label="Close Cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-4">
            {cart?.items?.length === 0 ? (
              <p className="text-white/70 text-center py-8">Your cart is empty</p>
            ) : (
              <>
                {cart.items.map((item) => (
                  <div
                    key={item.productId || item.id}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{item.name}</h3>
                        <p className="text-white/60 text-sm">
                          ${Number(item.price).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId || item.id)}
                        className="text-red-400 hover:text-red-600 transition-all"
                        aria-label="Remove from cart"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.productId || item.id,
                            (item.quantity || 1) - 1,
                          )
                        }
                        className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
                      >
                        −
                      </button>

                      <span className="text-white font-semibold flex-1 text-center">
                        {item.quantity || 1}
                      </span>

                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.productId || item.id,
                            (item.quantity || 1) + 1,
                          )
                        }
                        className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}

                <div className="border-t border-white/20 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white/70 text-lg">Total:</span>
                    <span className="text-white text-2xl font-extrabold">
                      ${Number(cart.total || 0).toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/cart", { state: { cart } });
                      setIsCartOpen(false);
                    }}
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[#5865F2] to-[#a78bfa] hover:from-[#a78bfa] hover:to-[#5865F2] text-white font-bold transition-all shadow-lg"
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={() => {
                      clearCart();
                      setIsCartOpen(false);
                    }}
                    className="w-full mt-2 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold transition-all"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setShowLogoutConfirm(false)}
          style={{ background: "rgba(0, 0, 0, 0.7)" }}
        >
          <div
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-extrabold text-white mb-4">Confirm Logout</h3>
            <p className="text-white/70 mb-6">Are you sure you want to logout?</p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2 rounded-lg bg-red-500/80 hover:bg-red-600 text-white font-semibold transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
